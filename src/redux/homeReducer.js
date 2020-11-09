import { productAPI } from "../api/api";

const TOGGLE_IS_LOADED = "homeReducer/TOGGLE_IS_LOADED";
const SET_PRODUCTS = "homeReducer/SET_PRODUCTS";
//const SET_RANGE_PRICES = "homeReducer/SET_RANGE_PRICES";
//const SET_FILTERED_PRODUCTS = "homeReducer/SET_FILTERED_PRODUCTS";
const TOGGLE_IS_FETCHING_FILTER_FIELDS =
  "homeReducer/TOGGLE_IS_FETCHING_FILTER_FIELDS";
const SET_FILTER_FIELDS = "homeReducer/SET_FILTER_FIELDS";
const SET_FILTER_FIELDS_VALUES = "homeReducer/SET_FILTER_FIELDS_VALUES";
const SET_SELECTED_FILTERS = "homeReducer/SET_SELECTED_FILTERS";
const SET_UPDATE_FILTER_FIELDS_VALUES =
  "homeReducer/SET_UPDATE_FILTER_FIELDS_VALUES";

const SET_INITIAL_FACETS = "homeReducer/SET_INITIAL_FACETS";

const SET_CURRENT_REFINEMENTS = "homeReducer/SET_CURRENT_REFINEMENTS";

const initialState = {
  isLoaded: false,
  products: [],
  //rangePrices: [0, 0],
  //filteredProducts: [],
  isFetchingFilterFields: false,
  filterFields: [],
  filterFieldsValues: [],
  selectedFilters: [],
  updateFilterFieldsValues: [],
  initialFacets: {},
  currentRefinement: {},
};

const sortFunc = (a, b) => {
  let nameA = a.toLowerCase();
  let nameB = b.toLowerCase();
  if (!isNaN(parseInt(a)) && !isNaN(parseInt(b))) {
    if (parseInt(a) < parseInt(b)) return -1;
    else return 1;
  }
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

const homeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_IS_LOADED:
      return {
        ...state,
        isLoaded: payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: [...payload],
      };
    // case SET_RANGE_PRICES:
    //   const products = (state.filteredProducts.length
    //     ? state.filteredProducts
    //     : state.products
    //   ).map((product) => +product.price);
    //   return {
    //     ...state,
    //     rangePrices: [Math.min(...products), Math.max(...products)],
    //   };
    // case SET_FILTERED_PRODUCTS:
    //   return {
    //     ...state,
    //     filteredProducts: [...payload],
    //   };
    case TOGGLE_IS_FETCHING_FILTER_FIELDS:
      return {
        ...state,
        isFetchingFilterFields: payload,
      };
    case SET_FILTER_FIELDS:
      return {
        ...state,
        filterFields: [...payload],
      };
    case SET_FILTER_FIELDS_VALUES:
      return {
        ...state,
        filterFieldsValues: payload,
      };
    case SET_SELECTED_FILTERS:
      return {
        ...state,
        selectedFilters: payload,
      };
    case SET_UPDATE_FILTER_FIELDS_VALUES:
      return {
        ...state,
        updateFilterFieldsValues: payload,
      };
    case SET_INITIAL_FACETS:
      return {
        ...state,
        initialFacets: payload,
      };
    case SET_CURRENT_REFINEMENTS:
      return {
        ...state,
        currentRefinement: payload,
      };
    default:
      return state;
  }
};

export const setCurrentRefinement = (field, refinement) => {
  return async (dispatch, getState) => {
    let currentRefinement = [...getState().homePage.currentRefinement[field], refinement];
    const refinements = {...getState().homePage.currentRefinement, [field]: [...new Set(currentRefinement)]};
    dispatch({ type: SET_CURRENT_REFINEMENTS, payload: refinements });
  };
};

export const productsRequest = () => {
  return async (dispatch) => {
    const products = await productAPI.getProductsAPI();
    dispatch({ type: SET_PRODUCTS, payload: products });
    //dispatch({ type: SET_RANGE_PRICES });
    //dispatch({ type: TOGGLE_IS_LOADED, payload: true });

    dispatch({ type: TOGGLE_IS_FETCHING_FILTER_FIELDS, payload: true });
    const filterFields = await productAPI.getFilterFieldsAPI();
    dispatch({ type: SET_FILTER_FIELDS, payload: filterFields });

    let initialFacets = {};
    filterFields.map((filter) => {
      let values = [];
      products.map((product) =>
        product.specifications.filter(
          (item) =>
            Object.keys(item)[0] === filter.field &&
            values.push(Object.values(item)[0].value)
        )
      );
      const sortedValues = [...new Set(values)];

      return (initialFacets[filter.field] = sortedValues.map((val) => ({
        label: val,
        value: val,
        isRefined: false,
        count: 0,
      })));
    });
    dispatch({ type: SET_INITIAL_FACETS, payload: initialFacets });

    const refinements = {};
    Object.keys(initialFacets).map((name) => (refinements[name] = []));
    dispatch({ type: SET_CURRENT_REFINEMENTS, payload: refinements });

    dispatch({ type: TOGGLE_IS_FETCHING_FILTER_FIELDS, payload: false });

    dispatch({
      type: SET_FILTER_FIELDS_VALUES,
      payload:
        filterFields.length &&
        filterFields.map((filter) => {
          let result = [];
          let hide = [];
          let obj = {};
          products.filter((product) => {
            return product.specifications.filter(
              (item) =>
                Object.keys(item)[0] === filter.field &&
                result.push(Object.values(item)[0].value) &&
                hide.push(Object.values(item)[0].hide)
            );
          });

          const sortedArr = [...new Set(result.sort(sortFunc))];

          for (let x = 0; x < sortedArr.length; x++) {
            sortedArr.map(() => {
              obj.prop = sortedArr;
              obj.val = sortedArr.map(
                (v) => result.filter((item) => item === v).length
              );
              obj.hide = !!hide.filter((item) => item).length;
            });
          }
          return {
            [filter.field]: obj,
          };
        }),
    });
  };
};

// export const filterProductsByPriceRequest = ([min, max]) => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: SET_FILTERED_PRODUCTS,
//       payload: getState().homePage.products.filter(
//         (product) => product.price >= min && product.price <= max
//       ),
//     });
//   };
// };

let result = []; // [{brand: "Asus"}, {brand: "MSI"}]
let r = {};
let filterProd;

export const filterRequest = (e) => {
  const el = e.currentTarget; // el.name, el.value // brand, Asus

  if (el.checked) result.push({ [el.name]: el.value });
  else
    result = result.filter(
      (item) =>
        Object.keys(item)[el.name] !== el.name &&
        Object.values(item)[0] !== el.value
    );

  if (el.checked)
    Object.keys(r).includes(el.name)
      ? r[el.name].push(el.value)
      : (r[el.name] = [el.value]);
  else r = { ...r, [el.name]: r[el.name].filter((val) => val !== el.value) };
  if (r[el.name].length === 0) delete r[el.name];

  return async (dispatch, getState) => {
    filterProd = getState().homePage.products.filter((product) => {

      return Object.keys(r).find((key) =>
        product.specifications.find((spec) => {
          return Object.keys(spec).find(
            (s) =>
              s === key &&
              r[Object.keys(r)] &&
              r[Object.keys(r)].indexOf(spec[s].value) > -1
          );
        })
      );
    });

    dispatch({
      type: SET_SELECTED_FILTERS,
      payload: result.length ? result.map((item) => Object.keys(item)[0]) : [],
    });

    let filteredProducts;
    if (
      getState().homePage.selectedFilters.length &&
      el.name === getState().homePage.selectedFilters[0]
    ) {
      // if any checkbox is checked and name of filter field equal to first checkbox is checked

      filteredProducts = getState().homePage.products.filter((product) => {
        return result.find((field) =>
          product.specifications.find((spec) =>
            Object.keys(spec).find(
              (key) =>
                key === Object.keys(field)[0] &&
                spec[key].value === Object.values(field)[0]
            )
          )
        );
      });

    } else if (
      getState().homePage.selectedFilters.length &&
      getState().homePage.selectedFilters.indexOf(el.name) > 0
    ) {
      // if any checkbox is checked and name of filter field not equal to first checkbox is checked

      filteredProducts = getState().homePage.filteredProducts.filter(
        (product) => {
          return product.specifications.find((spec) =>
            Object.keys(spec).find(
              (key) => key === el.name && spec[key].value === el.value
            )
          );
        }
      );
    } else {

      filteredProducts = getState().homePage.products.filter((product) => {
        return result.find((field) =>
          product.specifications.find((spec) =>
            Object.keys(spec).find(
              (key) =>
                key === Object.keys(field)[0] &&
                spec[key].value === Object.values(field)[0]
            )
          )
        );
      });
    }

    // await Promise.all([
    //   dispatch({
    //     type: SET_FILTERED_PRODUCTS,
    //     payload: filteredProducts,
    //   }),
    // ]);

    //dispatch({ type: SET_RANGE_PRICES });

    const updateArr =
      getState().homePage.filterFields.length &&
      getState().homePage.filterFields.map((filter) => {
        let result = [];
        let hide = [];
        let obj = {};
        getState().homePage.filteredProducts.length &&
          getState().homePage.filteredProducts.filter((product) => {
            return product.specifications.filter((item) => {
              // {brand: {…}}
              return (
                Object.keys(item)[0] === filter.field &&
                result.push(Object.values(item)[0].value) &&
                hide.push(Object.values(item)[0].hide)
              );
            });
          });
        let sortedArr = [...new Set(result.sort(sortFunc))];
        for (let x = 0; x < sortedArr.length; x++) {
          sortedArr.forEach(() => {
            obj.prop = sortedArr;
            obj.val = sortedArr.map(
              (v) => result.filter((item) => item === v).length
            );
            obj.hide = !!hide.filter((item) => item).length;
          });
        }
        return {
          [filter.field]: obj,
        };
      });

    let newArr = [];

    //console.log(updateArr);

    getState().homePage.selectedFilters.length &&
      getState().homePage.filterFieldsValues.map((obj, index) => {
        let key = Object.keys(obj)[0]; // brand
        let prop = Object.values(obj)[0].prop; // ["Asus", "MSI", "PowerColor", "Sapphire"]
        let value = Object.values(obj)[0].val; // [1, 1, 1, 1]
        let hide = Object.values(obj)[0].hide; // false

        let update = updateArr[index]; // {brand: {…}}
        let updateProp = Object.values(update)[0].prop; // ["Asus", "MSI"]
        let updateVal = Object.values(update)[0].val; // [1, 1]

        const temp = // ["Asus", "MSI", "PowerColor", "Sapphire"], [null, "NVIDIA"]...
          prop &&
          prop.map((p) => {
            // Asus
            let pos = updateProp && updateProp.indexOf(p);
            if (
              getState().homePage.selectedFilters.indexOf(key) === 0 ||
              (pos > -1 && pos && updateVal[pos] > 0)
            ) {
              return p;
            }
            //let obj = getState().homePage.updateFilterFieldsValues.find(f => Object.keys(f).includes(el.name));
            // if (getState().homePage.selectedFilters.indexOf(key) > 0) {
            //   let obj = getState().homePage.updateFilterFieldsValues.find(f => Object.keys(f).includes(el.name));
            //   let val = Object.values(obj)[0].val;
            //   let pos = prop && prop.indexOf(el.value);
            //   console.log(pos);
            //   //return val[index];
            // }
            return updateProp && updateProp.includes(p) ? (p ? p : null) : null;
          });
        //console.log(temp);
        const res = // [1, 1, 1, 1], [0, 1]
          temp &&
          temp.map((t, index) => {
            let pos = updateProp && updateProp.indexOf(t);
            let val;
            if (t === null) return 0;
            if (updateVal) {
              if (getState().homePage.selectedFilters.indexOf(key) > 0) {
                let obj = getState().homePage.updateFilterFieldsValues.find(
                  (f) => Object.keys(f).includes(el.name)
                );
                val = Object.values(obj)[0].val;
                return val[index]; // here
              }
              return pos > -1 ? updateVal[pos] : value[index];
            }
          });
        //console.log(updateVal);

        newArr.push({ [key]: { prop, val: res, hide } });
      });

    dispatch({
      type: SET_UPDATE_FILTER_FIELDS_VALUES,
      payload: newArr,
    });
  };
};

export default homeReducer;

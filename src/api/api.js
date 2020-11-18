import algoliasearch from "algoliasearch";

export const productAPI = {
  getProductsAPI() {
    return fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .catch((err) => console.error(err));
  },
  getProductAPI(id) {
    return fetch(`http://localhost:3001/products?id=${id}`)
      .then((response) => response.json())
      .catch((err) => console.error("getProductAPI:", err));
  },
  getReviewsAPI(id) {
    return fetch(
      `http://localhost:3001/reviews?reviewTo=${id}&_sort=id&_order=desc`
    )
      .then((response) => response.json())
      .catch((err) => console.error("getReviewsAPI:", err));
  },
  getAnswersAPI(id) {
    return fetch(`http://localhost:3001/answers?answerTo=${id}`)
      .then((response) => response.json())
      .catch((err) => console.error("getAnswersAPI:", err));
  },
  sendReviewAPI(data) {
    return fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.error("sendReviewAPI:", err));
  },
  sendAnswerAPI(data) {
    return fetch("http://localhost:3001/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.error("sendAnswerAPI:", err));
  },
  getFilterFieldsAPI() {
    return fetch("http://localhost:3001/filters")
      .then((response) => response.json())
      .catch((err) => console.error("getFilterFieldsAPI:", err));
  },

  getInitialFacetsAPI(attribute) {
    return algoliasearch("I21C32G5C2", "85a7081843a79618290d2c0a18ddf6af")
      .searchForFacetValues([
        {
          indexName: "dev_NAME",
          params: {
            facetName: attribute,
            facetQuery: "",
            maxFacetHits: 100,
          },
        },
      ])
      .then(([{ facetHits }]) => {
        const fields = [];
        fields.push(
          ...facetHits.map((facet) => ({
            ...facet,
            label: facet.value,
            value: facet.value,
            isRefined: false,
            count: 0,
          }))
        );
        return fields;
      });
  },

  // getProductsFilteredByPriceAPI(min, max) {
  //   return fetch(`http://localhost:3001/products?price_gte=${min}&price_lte=${max}`)
  //     .then((response) => response.json())
  //     .catch((err) => console.error(err));
  // },
};

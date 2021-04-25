import algoliasearch from "algoliasearch";

export const productAPI = {
  getProductsAPI() {
    return fetch("/products")
      .then((response) => response.json())
      .catch((err) => console.error(err));
  },
  getProductAPI(id) {
    return fetch(`/products?id=${id}`)
      .then((response) => response.json())
      .catch((err) => console.error("getProductAPI:", err));
  },
  getReviewsAPI(id) {
    return fetch(
      `/reviews?reviewTo=${id}&_sort=id&_order=desc`
    )
      .then((response) => response.json())
      .catch((err) => console.error("getReviewsAPI:", err));
  },
  getAnswersAPI(id) {
    return fetch(`/answers?answerTo=${id}`)
      .then((response) => response.json())
      .catch((err) => console.error("getAnswersAPI:", err));
  },
  sendReviewAPI(data) {
    return fetch("/reviews", {
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
    return fetch("/answers", {
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
    return fetch("/filters")
      .then((response) => response.json())
      .catch((err) => console.error("getFilterFieldsAPI:", err));
  },

  getInitialFacetsAPI(attribute) {
    return algoliasearch("US0VQUY41A", "2b31cc8833e2307117c0616ae917810b")
      .searchForFacetValues([
        {
          indexName: "shop",
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
};

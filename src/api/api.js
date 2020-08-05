export const productAPI = {
  getProductsAPI() {
    return fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .catch((err) => console.error(err));
  },
  getProductAPI(id) {
    return fetch(`http://localhost:3001/specifications?id=${id}`)
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
};
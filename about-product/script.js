// Auth;
function isUserRegistered() {
  return sessionStorage.getItem("AdminId") !== null;
}

function checkLogin() {
  if (!isUserRegistered()) {
    window.location.href = "../login/login.html";
  }
}
window.onload = checkLogin;
window.onpopstate = checkLogin;
document.addEventListener("DOMContentLoaded", checkLogin);

let urlOfLocation = window.location.href;
let url = new URL(urlOfLocation);
let searchParams = new URLSearchParams(url.search);
let product_id = searchParams.get("product-id");

window.onload = getProduct(product_id);
function getProduct(id) {
  fetch(`http://localhost:3000/products/${id}`)
    .then((res) => res.json())
    .then((res) => {
      document.querySelector(".title_info").textContent = res.title;
      document.querySelector(".des_info").textContent = res.description;
      document.querySelector(".category_info").textContent = res.category;
      document.querySelector(".price_info").textContent = "$" + res.price;
      res.images.forEach((el, index) => {
        let imgDiv = document.createElement("div");
        imgDiv.classList.add("carousel-item");
        imgDiv.innerHTML = ` <img src="${el}" class="d-block" alt="..." />`;
        document.querySelector(".carousel-inner").append(imgDiv);
        if (index == 0) {
          imgDiv.classList.add("active");
        }
      });
    });
}

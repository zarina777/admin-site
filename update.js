// DELETE
function deleteItem(id) {
  fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      productsArray = productsArray.filter((el) => el.id != res.id);
      writeToProducts();
    });
}

// UPDATE PRODUCT

let nameProduct = document.querySelector("#product-name1");
let descProduct = document.querySelector("#product-desc1");
let priceProduct = document.querySelector("#product-price1");
let categoryProduct = document.querySelector("#product-category1");
let productID;
function editItem(id) {
  productID = id;
  contentClear(".update-section");
  fetch(`http://localhost:3000/products/${id}`)
    .then((res) => res.json())
    .then((res) => {
      (nameProduct.value = res.title),
        (descProduct.value = res.description),
        (priceProduct.value = res.price),
        (categoryProduct.value = res.category);
      console.log(res.images);
      res.images.forEach((el, index) => {
        if (index == 0) {
          document.querySelector("#img1").value = el;
          document.querySelector(".img-place1").innerHTML = `<img src='${el}'>`;
        } else {
          let p = document.createElement("p");
          p.classList.add("extras1");
          let input = document.createElement("input");
          input.classList.add("img_input1");
          input.required = true;
          input.placeholder = "Img Url";
          input.value = el;
          let btn = document.createElement("span");
          btn.textContent = "delete";
          btn.classList.add("delete-img");
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            btn.parentElement.remove();
          });
          p.append(input, btn);
          document.querySelector(".add-imgUrl1").before(p);
          input.focus();
        }
      });
    });
}

document.querySelector("#updateProductForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let imgUrls = document.querySelectorAll(".img_input1");
  let imgUrlArray = [];
  for (let i = 0; i < imgUrls.length; i++) {
    imgUrlArray.push(imgUrls[i].value);
  }
  fetch(`http://localhost:3000/products/${productID}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      title: nameProduct.value,
      description: descProduct.value,
      price: priceProduct.value,
      category: categoryProduct.value,
      images: imgUrlArray,
      comment: [],
    }),
  });
  let extras = document.querySelectorAll(".extras1");
  let wrapper = document.querySelector(".img-wrap1");
  for (let i = 0; i < extras.length; i++) {
    wrapper.removeChild(extras[i]);
  }
  document.querySelector(".img-place1").innerHTML = `<div class="img">
<i class="fa-regular fa-image"></i>`;

  document.querySelector("#updateProductForm").reset();
  let res = confirm("do you want to reload the page");
  if (res) {
    window.location.reload();
  }
  contentClear(".products-section");
});

document.querySelector("#cancel_product1").addEventListener("click", () => {
  let extras = document.querySelectorAll(".extras1");
  let wrapper = document.querySelector(".img-wrap1");
  for (let i = 0; i < extras.length; i++) {
    wrapper.removeChild(extras[i]);
  }
  document.querySelector(".img-place1").innerHTML = `<div class="img">
<i class="fa-regular fa-image"></i>`;
  document.querySelector("#updateProductForm").reset();
  contentClear(".products-section");
});

// EDIT ADMIN

function editAdmin(id) {
  let loginID_admin1 = document.querySelector("#loginID_admin1");
  let firstname_admin1 = document.querySelector("#firstname_admin1");
  let lastname_admin1 = document.querySelector("#lastname_admin1");
  let password_admin1 = document.querySelector("#password_admin1");
  let email_admin1 = document.querySelector("#password_admin1");
  let imgURL_admin1 = document.querySelector("#imgURL_admin1");
  contentClear(".editAdmin-section");
  fetch(`http://localhost:3000/admin/${id}`)
    .then((res) => {
      res.json();
    })
    .then((el) => {
      loginID_admin1.value = el.login;
      firstname_admin1.value = el.firstName;
      lastname_admin1.value = el.lastName;
      password_admin1.value = el.password;
      email_admin1.value = el.email;
      imgURL_admin1.value = el.image;
      document.querySelector(
        ".img-placeAdmin1"
      ).innerHTML = `<img src='${el.image}'>`;
    });
}
// id: document.querySelector("#loginID_admin"),
//       firstName: document.querySelector("#firstname_admin").value,
//       lastName: document.querySelector("#lastname_admin").value,
//       login: document.querySelector("#loginID_admin").value,
//       password: document.querySelector("#password_admin").value,
//       email: document.querySelector("#email_admin").value,
//       image: document.querySelector("#imgURL_admin").value,

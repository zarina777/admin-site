let sideBarNavbar = document.querySelector(".navbar");
let categories = document.querySelector(".category-btn");
let chevronDown = document.querySelector(".categories i");
let open = true;
const bgWrap = document.querySelector("#bg-wrap");
let pageInLocalStorage = localStorage.getItem("onPage")
  ? localStorage.getItem("onPage")
  : ".dashbord-section";
let navInLocalStorage = localStorage.getItem("onNavPage")
  ? localStorage.getItem("onNavPage")
  : ".nav-dashbord";
let productsArray = [];
categories.addEventListener("click", () => {
  if (open) {
    chevronDown.classList.remove("fa-chevron-down");
    chevronDown.classList.add("fa-chevron-up");
    document.querySelector(".category-dropdown").classList.add("open");
    open = false;
  } else {
    chevronDown.classList.add("fa-chevron-down");
    chevronDown.classList.remove("fa-chevron-up");
    document.querySelector(".category-dropdown").classList.remove("open");
    open = true;
  }
});

function contentClear(content) {
  let children = document.querySelector(".content").children;
  let onContent = document.querySelector(content);
  localStorage.setItem(
    "onPage",
    content == ".update-section" ? ".products-section" : content
  );
  for (let i = 0; i < children.length; i++) {
    if (children[i] !== onContent) {
      children[i].classList.add("dnone");
    } else {
      if (children[i].classList.contains("dnone")) {
        children[i].classList.remove("dnone");
      }
    }
  }
}
contentClear(pageInLocalStorage);
navClick(navInLocalStorage);
function navClick(element) {
  let clicked = document.querySelector(element);
  localStorage.setItem("onNavPage", element);
  for (let i = 0; i < sideBarNavbar.children.length; i++) {
    if (clicked == sideBarNavbar.children[i]) {
      sideBarNavbar.children[i].classList.add("onContent");
    } else {
      if (sideBarNavbar.children[i].classList.contains("onContent")) {
        sideBarNavbar.children[i].classList.remove("onContent");
      }
    }
  }
}

sideBarNavbar.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-dashbord")) {
    contentClear(".dashbord-section");
    navClick(".nav-dashbord");
  } else if (e.target.classList.contains("nav-products")) {
    contentClear(".products-section");
    navClick(".nav-products");
  } else if (e.target.classList.contains("nav-order")) {
    contentClear(".orders-section");
    navClick(".nav-order");
  } else if (e.target.classList.contains("nav-admins")) {
    contentClear(".admins-section");
    navClick(".nav-admins");
  }
});
const accountBtn = document.querySelector("#account");
const accountModel = document.querySelector(".admin-model");
accountBtn.onclick = () => {
  bgWrap.style.display = "block";
  accountModel.style.display = "flex";
};
bgWrap.onclick = () => {
  bgWrap.style.display = "none";
  accountModel.style.display = "none";
};
function writeToProducts() {
  document.querySelector(".products-wrap").innerHTML = "";
  productsArray.forEach((el) => {
    document.querySelector(".products-wrap").innerHTML += `
	<div class="product">
	<div class="about">
	  <div class="flex">
		<img src="${el.images[0]}" alt="">
		<div class="info-about">
		  <p>${el.title}</p>
		  <span>${el.category}</span>
		  <h4>${el.price}</h4>
		</div>
	  </div>
	  <div class="btns">
	  <i onclick="deleteItem('${el.id}')" class="fa-solid fa-trash"></i>
	  <i onclick="editItem('${el.id}')" class="fa-solid fa-pen-to-square"></i>
	  </div>
	</div>
	<div class="summary">
	  <span>Summary</span>
	  <p>${el.description}</p>
	</div>
	<div class="product-footer">
	  <div class="item_product-footer">
		<p>Sales</p>
		<div class="flex">
		  <i class="fa-solid fa-arrow-up"></i>
		  <span>1269</span>
		</div>
	  </div>
	  <div class="item_product-footer">
		<p>Remaining Products</p>
		<div class="flex">
		  <i class="fa-solid fa-minus"></i>
		  <span>1269</span>
		</div>
	  </div>
	</div>
  </div>
	`;
  });
}

(function () {
  fetch("http://localhost:3000/products")
    .then((data) => data.json())
    .then((res) => {
      productsArray = res;
      document.querySelector(".products-wrap").innerHTML = "";
      res.forEach((el) => {
        document.querySelector(".products-wrap").innerHTML += `
		<div class="product">
		<div class="about">
		  <div class="flex">
			<img src="${el.images[0]}" alt="">
			<div class="info-about">
			  <p>${el.title}</p>
			  <span>${el.category}</span>
			  <h4>${el.price}</h4>
			</div>
		  </div>
		  <div class="btns">
		  <i onclick="deleteItem('${el.id}')" class="fa-solid fa-trash"></i>
		  	<i onclick="editItem('${el.id}')" class="fa-solid fa-pen-to-square"></i>
		  </div>
		</div>
		<div class="summary">
		  <span>Summary</span>
		  <p>${el.description}</p>
		</div>
		<div class="product-footer">
		  <div class="item_product-footer">
			<p>Sales</p>
			<div class="flex">
			  <i class="fa-solid fa-arrow-up"></i>
			  <span>1269</span>
			</div>
		  </div>
		  <div class="item_product-footer">
			<p>Remaining Products</p>
			<div class="flex">
			  <i class="fa-solid fa-minus"></i>
			  <span>1269</span>
			</div>
		  </div>
		</div>
	  </div>
		`;
      });
    });
})();

// CATEGORY
let categoryItemsWarp = document.querySelector(".category_items");
(() => {
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        categoryItemsWarp.innerHTML += `
			<div class="item"><p>${el.name}</p> <span onclick="categoryDeteleFn('${el.id}')">-</span></div>
			`;
      });
    });
})();

document.querySelector(".add_category").addEventListener("click", () => {
  let div = document.createElement("div");
  div.classList.add("wrap_input_category");
  let input = document.createElement("input");
  input.classList.add("input_category");
  input.required = true;
  input.placeholder = "Category Name";
  let btnSave = document.createElement("span");
  let btnCancel = document.createElement("span");
  btnSave.textContent = "save";
  btnSave.classList.add("save");
  btnCancel.textContent = "cancel";
  btnCancel.classList.add("cancel");
  btnCancel.addEventListener("click", (e) => {
    e.preventDefault();
    btnCancel.parentElement.remove();
  });
  document.querySelector(".category_items").append(div);
  div.append(input, btnSave, btnCancel);
  btnCancel.addEventListener("click", () => {
    btnCancel.parentElement.remove();
  });
  btnSave.addEventListener("click", () => {
    if (btnSave.previousElementSibling.value.trim().length) {
      fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: btnSave.previousElementSibling.value,
        }),
      });

      let res = confirm("do you want to reload the page");
      if (res) {
        window.location.reload();
      }
    }
  });
});

(() => {
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((res) => {
      document.querySelector("#product-category").innerHTML = "";
      res.forEach((el) => {
        document.querySelector("#product-category").innerHTML += `
		<option value="${el.name}">${el.name}</option>
		`;
      });
    });
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((res) => {
      document.querySelector("#product-category1").innerHTML = "";
      res.forEach((el) => {
        document.querySelector("#product-category1").innerHTML += `
		<option value="${el.name}">${el.name}</option>
		`;
      });
    });
})();
function categoryDeteleFn(id) {
  fetch(`http://localhost:3000/categories/${id}`, {
    method: "DELETE",
  });
  let res = confirm("do you want to reload the page");
  if (res) {
    window.location.reload();
  }
}

(() => {
  fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .then((res) => {
      res.forEach((el) => {
        document.querySelector("#recentProduct-table").innerHTML += `
			<tr>
			<td class="customer-name"><img src="${el.images[0]}" alt=""><h4>${el.title}</h4></td>
			<td>${el.category}</td>
			  <td>${el.price}</td>
			  <td>${el.description}</td>
		  </tr>
		`;
      });
    });
})();

let search = document.querySelector("#searchForProducts");
let oneClick = true;
let input = null;
let btn = null;
document.querySelector(".fa-magnifying-glass").addEventListener("click", () => {
  if (oneClick) {
    input = document.createElement("input");
    input.id = "inputForSeach";
    btn = document.createElement("span");
    btn.textContent = "search";
    btn.addEventListener("click", () => {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((res) => {
          document.querySelector("#recentProduct-table").innerHTML = `
			<tr>
		<th>Products</th>
		<th>Category</th>
		<th>Price</th>
		<th>Description</th>
	  </tr>`;
          res.forEach((el) => {
            if (
              el.title
                .toLowerCase()
                .includes(
                  document.querySelector("#inputForSeach").value.toLowerCase()
                )
            ) {
              document.querySelector("#recentProduct-table").innerHTML += `
					<tr>
					<td class="customer-name"><img src="${el.images[0]}" alt=""><h4>${el.title}</h4></td>
					<td>${el.category}</td>
					  <td>${el.price}</td>
					  <td>${el.description}</td>
				  </tr>
				`;
            }
          });
        });
    });
    search.append(input, btn);
    input.placeholder = "search a product";
    search.classList.add("OnSearch");
    input.focus();
    oneClick = false;
  } else {
    input.remove();
    btn.remove();
    search.classList.remove("OnSearch");
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((res) => {
        document.querySelector("#recentProduct-table").innerHTML = `
		<tr>
	<th>Products</th>
	<th>Category</th>
	<th>Price</th>
	<th>Description</th>
  </tr>`;
        res.forEach((el) => {
          document.querySelector("#recentProduct-table").innerHTML += `
				<tr>
				<td class="customer-name"><img src="${el.images[0]}" alt=""><h4>${el.title}</h4></td>
				<td>${el.category}</td>
				  <td>${el.price}</td>
				  <td>${el.description}</td>
			  </tr>
			`;
        });
      });
    oneClick = true;
  }
});

// ADMINS
(() => {
  fetch("http://localhost:3000/superadmin")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".cards_superadmin").innerHTML = "";
      data.forEach((el) => {
        document.querySelector(".cards_superadmin").innerHTML += `
    <div class="card_superadmin">
             <div class="img-warp-admin"> <img src="${el.image}" alt="" /></div> 
              <h5>${el.firstName} ${el.lastName}</h5>
              <span>${el.login}: ${el.password} </span>
              <p>${el.email}</p>
              <div class="btns_admins">
                <button onclick='deleteSuperAdmin("${el.id}")' class="delete_superadmin">Delete</button>
                <button onclick='editSuperAdmin(
                  "${el.id}"
                )'  class="edit_superadmin">Edit</button>
              </div>
            </div>`;
      });
    });
  fetch("http://localhost:3000/admin")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".cards_admin").innerHTML = "";
      data.forEach((el) => {
        document.querySelector(".cards_admin").innerHTML += `
    <div class="card_admin">
    <div class="img-warp-admin"> <img src="${el.image}" alt="" /></div> 
              <h5>${el.firstName} ${el.lastName}</h5>
              <span>${el.login}: ${el.password} </span>
              <p>${el.email}</p>
              <div class="btns_admins">
                <button onclick='deleteAdmin("${el.id}")' class="delete_superadmin">Delete</button>
                <button onclick='editAdmin(
                 "${el.id}"
                )'  class="edit_superadmin">Edit</button>
              </div>
            </div>`;
      });
    });
})();

// Auth;
window.onload = checkLogin;
window.onpopstate = checkLogin;
document.addEventListener("DOMContentLoaded", checkLogin);

function isUserRegistered() {
  return sessionStorage.getItem("AdminId") !== null;
}

function checkLogin() {
  if (!isUserRegistered()) {
    window.location.href = "/login/login.html";
  }
}

let isSuperAdmin = JSON.parse(sessionStorage.getItem("AdminId"));
if (isSuperAdmin.user == "superadmin") {
  document.querySelector(".nav-admins").classList.remove("dnone");
}

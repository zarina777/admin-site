let password = document.querySelector("#password");
let username = document.querySelector("#username");
let error = document.querySelector(".error");
let success = document.querySelector(".success");
let result = 0;
let form = document.querySelector("#form-login");
async function Login(obj) {
  let res = await fetch(`http://localhost:3000/${obj}`);
  return res.json();
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let loginInfo = Login(document.querySelector("#typeofRequest").value);
  loginInfo
    .then((res) => {
      res.forEach((el) => {
        if (
          el.id == username.value.trim() &&
          el.password == password.value.trim()
        ) {
          result += 1;
          sessionStorage.setItem(
            "AdminId",
            JSON.stringify({
              id: el.id,
              user: document.querySelector("#typeofRequest").value,
            })
          );
          success.textContent = "You successfully logged in";
          setTimeout(() => {
            success.textContent = "";
            window.location.href = "/index.html";
          }, 2000);
        }
      });
      return result;
    })
    .then((res) => {
      if (res == 0) {
        error.textContent = "Password or Username is incorrect";
        setTimeout(() => {
          error.textContent = "";
        }, 2000);
      }
    });
});

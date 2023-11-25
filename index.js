document.querySelector(".toLogin").addEventListener("click", () => {
  document.querySelector(".login-form").classList.remove("hide");
  document.querySelector(".register-form").classList.add("hide");
});

document.querySelector(".toRegister").addEventListener("click", () => {
  document.querySelector(".login-form").classList.add("hide");
  document.querySelector(".register-form").classList.remove("hide");
});

document.getElementById("submit1").addEventListener("click", async () => {
  const username = document.getElementById("username").value,
    email = document.getElementById("password").value,
    password = document.getElementById("username").value;

  const res = await fetch("http://localhost:3000/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  console.log(data.message);
});

document.getElementById("submit2").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value,
    password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`http://localhost:3000/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }
    console.log("Login Success !! Cookie->" + document.cookie);
    document.querySelector(".container").style.opacity = "0";
    document.querySelector(".container").style.transition =
      "all 1s ease-in-out";

    document.querySelector(".main").style.opacity = "1";
    document.querySelector(".main").style.transition = "all 1s ease-in-out";
    setTimeout(() => {
      document.querySelector(".main").classList.remove("hide");
      document.querySelector(".container").classList.add("hide");
    }, 1000);
  } catch (error) {
    console.log(error);
  }
});

document.querySelector(".signout").addEventListener("click", async () => {
  try {
    const res = await fetch(`/api/user/signout`);
    const data = await res.json();
    if (data.success === false) {
      console.log(data.message);
      return;
    }
    document.querySelector(".main").classList.add("hide");
    document.querySelector(".container").classList.remove("hide");
    console.log("Log Out SUccessfull");
  } catch (error) {
    console.log("Signout Error ->" + error);
  }
});

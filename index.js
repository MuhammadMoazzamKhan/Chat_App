const btn = document.getElementById("btn");
const RegisterBtn = document.getElementById("Register-btn");
btn.addEventListener("click", ()=>{
    let userWindow =document.querySelector(".user-window");
    if(userWindow.style.display == "block"){
        userWindow.style.display = "none"
    }else{
        userWindow.style.display = "block"
    }
})

let signinContainer = document.querySelector(".signin-Container");
let logincontainer = document.querySelector(".signup-container");

export {signinContainer,logincontainer}

RegisterBtn.addEventListener("click",()=>{
    logincontainer.classList.remove("notActive");
    signinContainer.classList.add("notActive");
})

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click" , ()=>{
    signinContainer.classList.remove("notActive");
    logincontainer.classList.add("notActive");
})


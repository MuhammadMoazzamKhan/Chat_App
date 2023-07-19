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
let logincontainer = document.querySelector(".login-container");

RegisterBtn.addEventListener("click",()=>{
    logincontainer.classList.remove("notActive");
    signinContainer.classList.add("notActive");
})

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click" , ()=>{
    signinContainer.classList.remove("notActive");
    logincontainer.classList.add("notActive");
})


const emailSign = document.getElementById("emailSign");
const passwordSign = document.getElementById("passwordSign");
const nameSign = document.getElementById("nameSign");
const btnSign = document.getElementById("btnSign");
console.log(emailSign)
const name = document.getElementById("name");

const emailLog = document.getElementById("emailLog");
const passwordLog = document.getElementById("passwordLog");
const btnLog = document.getElementById("btnLog");


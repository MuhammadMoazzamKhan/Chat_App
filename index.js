const btn = document.getElementById("btn");
btn.addEventListener("click", ()=>{
    let userWindow =document.querySelector(".user-window");
    if(userWindow.style.display == "block"){
        userWindow.style.display = "none"
    }else{
        userWindow.style.display = "block"
    }
})
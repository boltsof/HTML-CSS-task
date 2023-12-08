document.addEventListener("DOMContentLoaded",()=>{
    const menuBurger = document.getElementById("menu-burger");
    const closeMenuButton = document.querySelector(".close-menu_button");
    const openMenuButton = document.querySelector(".open-menu_button");

    closeMenuButton.addEventListener("click",()=>{
        menuBurger.classList.remove("open-menu");
    })

    openMenuButton.addEventListener("click",()=>{
        menuBurger.classList.add("open-menu");
    })




});
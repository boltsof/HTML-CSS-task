document.addEventListener("DOMContentLoaded",()=>{
    const backetButtonGlobal = document.getElementById("backet-button_global");
    backetButtonGlobal.querySelector("span").innerText = JSON.parse(localStorage.getItem("backets")).length;

    const backetBlockItems = document.getElementById("backets-item");

    const foodItems = JSON.parse(localStorage.getItem("backets"));

    foodItems.forEach(food => {
        
        const backetItem = document.createElement("div");
        backetItem.className = "backet-item_block";

        const backetImage = document.createElement("img");
        backetImage.className = "backet-image";
        backetImage.src = `${apiUrl}${food.urlImage}`;
        backetImage.width = 100;
        backetImage.height = 100;

        const backetInfoInner = document.createElement("div");
        backetInfoInner.className = "backet-info_inner";

        const backetName = document.createElement("div");
        backetName.className = "backet-name";
        backetName.innerText = food.name;

        const backetCommonInfo = document.createElement("div");
        backetCommonInfo.className = "backet-common-info";

        const backetAmount = document.createElement("backet-amount");
        backetAmount.innerText = food.amount + "руб";

        const backetMass = document.createElement("div");
        backetMass.className = "backet-mass";
        backetMass.innerText = food.mass + "г";

        backetItem.append(backetImage);
        backetInfoInner.append(backetName);
        backetCommonInfo.append(backetAmount);
        backetCommonInfo.append(backetMass);
        backetInfoInner.append(backetCommonInfo);
        backetItem.append(backetInfoInner);

        backetBlockItems.appendChild(backetItem);
    });


});
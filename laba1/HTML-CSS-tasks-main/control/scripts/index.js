

const closeBacketModal = document.getElementById("close-backet");
const backetBlockModal = document.querySelector(".backet-block_modal");
const backetButtonGlobal = document.getElementById("backet-button_global");
const backetName = document.getElementById("backet-name");
const backetAmount = document.getElementById("backet-amount");
const backetMass = document.getElementById("backet-mass");
const backetDescription = document.getElementById("backet-description");


document.addEventListener("DOMContentLoaded",()=> {
    // initServicesSlick();
    // initNewsSlick();
    initPizzas();
    initDrinks();
    initDesserts();

    backetButtonGlobal.querySelector("span").innerText = JSON.parse(localStorage.getItem("backets")).length;

    closeBacketModal.addEventListener("click",()=>{
      backetBlockModal.style.opacity = "0";
      backetBlockModal.style.visibility = "hidden";
      document.body.style.overflow = "auto";
    });
});



function initServicesSlick(){
    $('.services-slider_list').slick({
        centerMode: true,
        infinite: true,
        centerPadding: "230px",
        slidesToShow: 2,
        speed: 700,
        autoplay: false,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1150,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: "170px",
              variableWidth: false,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 815,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: "150px",
              variableWidth: false,
              slidesToShow: 1
            }
          },
          {
            breakpoint: 575,
            settings: {
              arrows: false,
              centerMode: false,
              variableWidth: false,
              slidesToShow: 1
            }
          }
        ]
      });

      const servicesSliderList = document.querySelector(".services-slider_list");
      const sliderItems = servicesSliderList.getElementsByClassName("slick-slide");

      $('.services-slider_list').on('beforeChange', function(event){ 
        for (let i = 0; i < sliderItems.length; i++) {
          const img = sliderItems[i].querySelector("img");
          img.style.opacity = "1";
          img.style.transform = ""
        }
       
        if(window.screen.width >= 815){  
            setTimeout(()=>{
              for (let index = 0; index < sliderItems.length; index++) {
                const element = sliderItems[index]; 
                if(element.classList.contains("slick-current")){
                  const nextSlick = sliderItems[index + 1].querySelector("img");
                  const prevSlick = sliderItems[index - 2].querySelector("img");
                  nextSlick.style.opacity = "50%";
                  nextSlick.style.transform = "scale(0.9)"
                  prevSlick.style.opacity = "50%"
                  prevSlick.style.transform = "scale(0.9)"
                }
              }
          },0)
        }  


        if(window.screen.width >= 580 && window.screen.width < 815){  
          setTimeout(()=>{
            for (let index = 0; index < sliderItems.length; index++) {
              const element = sliderItems[index]; 
              if(element.classList.contains("slick-current")){
                const nextSlick = sliderItems[index + 1].querySelector("img");
                const prevSlick = sliderItems[index - 1].querySelector("img");
                nextSlick.style.opacity = "50%";
                nextSlick.style.transform = "scale(0.9)"
                prevSlick.style.opacity = "50%"
                prevSlick.style.transform = "scale(0.9)"
              }
            }
        },0)
      }
      })

      if(window.screen.width >= 815){
        for (let index = 0; index < sliderItems.length; index++) {
          const element = sliderItems[index]; 
          if(element.classList.contains("slick-current")){
              const nextSlick = sliderItems[index + 1].querySelector("img");
              const prevSlick = sliderItems[index - 2].querySelector("img");
              nextSlick.style.opacity = "50%";
              nextSlick.style.transform = "scale(0.9)"
              prevSlick.style.opacity = "50%"
              prevSlick.style.transform = "scale(0.9)"
          }
        }
      }

      if(window.screen.width >= 580 && window.screen.width < 815){  
        setTimeout(()=>{
          for (let index = 0; index < sliderItems.length; index++) {
            const element = sliderItems[index]; 
            if(element.classList.contains("slick-current")){
              const nextSlick = sliderItems[index + 1].querySelector("img");
              const prevSlick = sliderItems[index - 1].querySelector("img");
              nextSlick.style.opacity = "50%";
              nextSlick.style.transform = "scale(0.9)"
              prevSlick.style.opacity = "50%"
              prevSlick.style.transform = "scale(0.9)"
            }
        }})
      }
      
      
}

function initNewsSlick(){
    const newsSliderBlock = document.getElementById("news-slider");
    const newsSliderSection = document.querySelector(".news-slider_section");

    loader(async () => {
      const response = await fetch(`${apiUrl}api/news`,{
        method:"GET"
      });

      if(!response.ok){
        throw new Error();
      }

      const news = await response.json(); 
      news.forEach(item => {
        const sliderItem = createNewsElement(item,()=>{

        });

        newsSliderBlock.appendChild(sliderItem);
      });
    
      $("#news-slider").slick({
        infinite: false,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToScroll: 2,      
              slidesToShow: 2
            }
          },
          {
            breakpoint: 685,
            settings: {
              slidesToScroll: 1,      
              slidesToShow: 1
            }
          }
        ]
      });
      
    }, newsSliderSection);
}

function initPizzas(){
    const pizzasList = document.getElementById("pizzas_list");

    loader(async () => {
        const response = await fetch(`${apiUrl}api/pizza?page=1&limit=10`,{
            method:"GET"
        });

        if(!response.ok){
            throw new Error();
        }

        const buttonBlockSet = document.querySelector(".button-block_set");
    
        const result = await response.json();
        result.pizzas.forEach(item => {
            const pizzaElement = createFoodElement(item, true, () => {
              backetBlockModal.style.opacity = "1";
              backetBlockModal.style.visibility = "visible";
              document.body.style.overflow = "hidden";

              backetName.innerText = item.name;
              backetAmount.innerText = item.amount;
              backetMass.innerText = item.mass;
             // backetDescription.innerText = item.description;

              const buttonAddBacket = document.createElement("button");
              buttonAddBacket.className = "backet-add_bottom";
              buttonAddBacket.innerText = "Добавить в корзину " + item.amount + " руб" 

              buttonAddBacket.addEventListener("click",()=>{

                const backets = localStorage.getItem("backets") ? JSON.parse(localStorage.getItem("backets")) : [];

                localStorage.setItem("backets",JSON.stringify([...backets, item]));

                backetButtonGlobal.querySelector("span").innerText = Number(backetButtonGlobal.querySelector("span").innerText) + 1;
                
                backetBlockModal.style.opacity = "0";
                backetBlockModal.style.visibility = "hidden";
                document.body.style.overflow = "auto";

                alert("Добавлено");
              })

              buttonBlockSet.innerHTML = "";
              buttonBlockSet.append(buttonAddBacket);


            },
            ()=>{

            });

            pizzasList.appendChild(pizzaElement);
        });

    },pizzasList);
}

function initDesserts(){
    const dessertsList = document.getElementById("desserts_list");
    
    loader(async () => {
        const response = await fetch(`${apiUrl}api/dessert?page=1&limit=20`,{
            method:"GET"
        });

        if(!response.ok){
            throw new Error();
        }
    
        const result = await response.json();
       
        result.desserts.forEach(item => {
            const dessertElement = createFoodElement(item, false, () => {
              backetBlockModal.style.visibility = "visible";
              document.body.style.overflow = "hidden";

              backetName.innerText = item.name;
              backetAmount.innerText = item.amount;
              backetMass.innerText = item.mass;
             // backetDescription.innerText = item.description;

              const buttonAddBacket = document.createElement("button");
              buttonAddBacket.className = "backet-add_bottom";
              buttonAddBacket.innerText = "Добавить в корзину " + item.amount + " руб" 

              buttonAddBacket.addEventListener("click",()=>{

                const backets = localStorage.getItem("backets") ? JSON.parse(localStorage.getItem("backets")) : [];

                localStorage.setItem("backets",JSON.stringify([...backets, item]));

                backetButtonGlobal.querySelector("span").innerText = Number(backetButtonGlobal.querySelector("span").innerText) + 1;
                
                backetBlockModal.style.opacity = "0";
                backetBlockModal.style.visibility = "hidden";
                document.body.style.overflow = "auto";

                alert("Добавлено");
              })

              buttonBlockSet.innerHTML = "";
              buttonBlockSet.append(buttonAddBacket);
            });

            dessertsList.appendChild(dessertElement);
        });

    },dessertsList);
}

function initDrinks(){
    const drinksList = document.getElementById("drinks_list");

    loader(async () => {
      await delay(1000);
      const response = await fetch(`${apiUrl}api/drink?page=1&limit=20`,{
        method:"GET"
      });

      if(!response.ok){
        throw new Error();
      }
    
      const result = await response.json();
      result.drinks.forEach(item => {
        const drinkElement = createFoodElement(item, false, () => {
          backetBlockModal.style.visibility = "visible";
          document.body.style.overflow = "hidden";

          backetName.innerText = item.name;
          backetAmount.innerText = item.amount;
          backetMass.innerText = item.mass;
         // backetDescription.innerText = item.description;

          const buttonAddBacket = document.createElement("button");
          buttonAddBacket.className = "backet-add_bottom";
          buttonAddBacket.innerText = "Добавить в корзину " + item.amount + " руб" 

          buttonAddBacket.addEventListener("click",()=>{

            const backets = localStorage.getItem("backets") ? JSON.parse(localStorage.getItem("backets")) : [];

            localStorage.setItem("backets",JSON.stringify([...backets, item]));

            backetButtonGlobal.querySelector("span").innerText = Number(backetButtonGlobal.querySelector("span").innerText) + 1;
            
            backetBlockModal.style.opacity = "0";
            backetBlockModal.style.visibility = "hidden";
            document.body.style.overflow = "auto";

            alert("Добавлено");
          })

          buttonBlockSet.innerHTML = "";
          buttonBlockSet.append(buttonAddBacket);
        });

        drinksList.appendChild(drinkElement);
      });

    },drinksList);
}

function createNewsElement(item,action){
    const sliderItem = document.createElement("div");

    const sliderItemInner = document.createElement("button");
    sliderItemInner.className = "news-slider_item";
    sliderItemInner.onclick = action;
    
    const sliderImage = document.createElement("img");
    sliderImage.width = 71;
    sliderImage.height = 71;
    sliderImage.alt = "slider-image";
    sliderImage.src = `${apiUrl}${item.urlImage}`;

    const sliderInner = document.createElement("div");
    sliderInner.className = "news-slider_inner";
    
    const sliderName = document.createElement("h3");
    sliderName.className = "news-slider_name";
    sliderName.innerText = item.name;

    const sliderAmount = document.createElement("h4");
    sliderAmount.className = "news-slider_amount";
    sliderAmount.innerText = `от ${item.amount}`;

    sliderInner.appendChild(sliderName);
    sliderInner.appendChild(sliderAmount);
    sliderItemInner.appendChild(sliderImage);
    sliderItemInner.appendChild(sliderInner);
    sliderItem.appendChild(sliderItemInner);

    return sliderItem;
}

function createFoodElement(item,inPizza,action,actionImage){
    const foodItem = document.createElement("li");
    foodItem.classList.add("food_item", inPizza ? "pizza_item" : "#");
    
    const foodInfo = document.createElement("div");
    foodInfo.classList.add("food_info", inPizza ? "pizza_info" : "#");

    const foodImage = document.createElement("img");
    foodImage.classList.add("food_image", inPizza ? "pizza_image" : "#");
    foodImage.width = 230;
    foodImage.height = 230;
    foodImage.alt = inPizza ? "pizza" : "food";
    foodImage.src = `${apiUrl}${item.urlImage}`;
    foodImage.onclick = actionImage;

    const foodInner = document.createElement("div");
    foodInner.classList.add("food_inner", inPizza ? "pizza_inner" : "#");

    const foodHeader = document.createElement("h2");
    foodHeader.classList.add("food_header", inPizza ? "pizza_header" : "#");
    foodHeader.innerText = item.name;
    foodHeader.onclick = action;
    
    const foodDescription = document.createElement("p");
    foodDescription.classList.add("food_description", inPizza ? "pizza_description" : "#");
    foodDescription.innerText = item.description ?? "";

    foodInner.appendChild(foodHeader);
    if(item.description){
        foodInner.appendChild(foodDescription);
    }
    
    foodInfo.appendChild(foodImage);
    foodInfo.appendChild(foodInner);
    foodItem.appendChild(foodInfo);

    const foodAmountInner = document.createElement("div");
    foodAmountInner.classList.add("food-amount_inner", inPizza ? "pizza-amount_inner" : "#");

    const foodAmount = document.createElement("h3");
    foodAmount.classList.add("food-amount", inPizza ? "pizza-amount" : "#");
    const amount = item.amount + " руб"
    foodAmount.innerText = inPizza ? `от ${amount}` : amount;

    const garbageButton = document.createElement("button");
    garbageButton.className = "garbage_button";
    garbageButton.onclick = action;
    garbageButton.innerText = "В корзину";

    foodAmountInner.appendChild(foodAmount);
    foodAmountInner.appendChild(garbageButton);
    foodItem.appendChild(foodAmountInner);

    return foodItem;
}
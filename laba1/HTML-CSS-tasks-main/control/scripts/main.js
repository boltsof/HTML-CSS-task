  const apiUrl = "http://remotepowerlink.ru:5005/";

document.addEventListener("DOMContentLoaded", async ()=>{
  const logotypeBottomHeaderItem = document.getElementById("logotype-bottom-header")
  const headerTopInnerBlock = document.getElementById("top-header_block");
  const menuBurgerButton = document.getElementById('menu-burger');
  const headerInner = document.querySelector(".header_inner");

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100 && this.window.screen.width >= 715) {
      logotypeBottomHeaderItem.style.display = "block";
      headerTopInnerBlock.style.display = "none";
    } else {
      logotypeBottomHeaderItem.style.display = "none";
      headerTopInnerBlock.style.display = "flex";
    }
  });

  menuBurgerButton.addEventListener('click',()=>{
    const bottomInner = headerInner.querySelector(".bottom_inner");
    bottomInner.classList.toggle("active-menu");
  });


  const headerLinks = headerInner.querySelector(".header-links_list");
  const scrollActions = [
    {
      button: headerLinks.querySelector(".pizza-scroll"),
      block: document.getElementById("pizza-scroll_block")
    },
    {
      button: headerLinks.querySelector(".drinks-scroll"),
      block: document.getElementById("drinks-scroll_block")
    },
    {
      button: headerLinks.querySelector(".dessert-scroll"),
      block: document.getElementById("desserts-scroll_block")
    }
  ];

  scrollActions.forEach(linkItem => {
    if(linkItem.button && linkItem.block){
      linkItem.button.addEventListener("click",()=>{
        linkItem.block.style.marginTop = "-80px";
        linkItem.block.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "center"
        });
        linkItem.block.style.marginTop = "0";
      })
    }
  })



 
  
});







async function loader(action,block){
    const loadAdd = () => {
      const loaderBlock = document.createElement("div");
      const loaderInner = document.createElement("div");
      loaderBlock.appendChild(loaderInner);
      loaderBlock.className = "loader-block";
      block.style.position = "relative";
      block.appendChild(loaderBlock);
    }

    const loadRemove = () => {
      const loaderBlock = block.querySelector(".loader-block");
      loaderBlock.remove();
    }
    
    loadAdd();

    try {
      await delay(1000);
      await action();
      loadRemove();
    } catch (error) {
      loadRemove();
      setExceptionBlock(() => loader(action,block), block);
      console.log(error);
    }
}

async function setExceptionBlock(action,block){
    const exceptionBlock = document.createElement("div");
    exceptionBlock.className = "exception-block";

    const exceptionText = document.createElement("h3");
    exceptionText.className = "exception-text";
    exceptionText.innerText = "Извините, произошла ошибка. Пожалуйста, повторите попытку позже.";

    const exceptionReloadButton = document.createElement("button");
    exceptionReloadButton.className = "exception-reload";
    exceptionReloadButton.innerText = "Обновить";

    exceptionReloadButton.onclick = async () => {
        const exceptionBlockInner = block.querySelector(".exception-block");
        exceptionBlockInner.remove();
        await action();
    }

    exceptionBlock.appendChild(exceptionText);
    exceptionBlock.appendChild(exceptionReloadButton);

    block.appendChild(exceptionBlock);
}




function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


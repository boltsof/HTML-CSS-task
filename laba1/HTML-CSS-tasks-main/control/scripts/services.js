
document.addEventListener("DOMContentLoaded",()=>{
    initServices();
})


function initServices(){
    const servicesBlock = document.getElementById("services-block");

    loader(async ()=>{
        const response = await fetch(`${apiUrl}api/service`,{
            method:"GET"
        });

        if(!response.ok){
            throw new Error();
        }
    
        const result = await response.json();

        result.forEach(item => {
            const serviceBlock = createServiceElement(item,() => {

            });

            servicesBlock.appendChild(serviceBlock);
        });
    },servicesBlock)
}



function createServiceElement(item,action){
    const serviceItem = document.createElement("li");
    serviceItem.className = "service_item";

    const serviceImg = document.createElement("img");
    serviceImg.width = 320;
    serviceImg.height = 140;
    serviceImg.onclick = action;
    serviceImg.src = `${apiUrl}${item.urlImage}`

    const serviceInner = document.createElement("div");
    serviceInner.className = "service_inner";

    const serviceName = document.createElement("h2");
    serviceName.className = "service_name";
    serviceName.innerText = item.name;
    serviceName.onclick = action;

    const serviceDescription = document.createElement("p");
    serviceDescription.className = "service_description";
    serviceDescription.innerText = item.description;

    const serviceButton = document.createElement("button");
    serviceButton.className = "service-check_button";
    serviceButton.innerText = "Посмотреть";
    serviceButton.onclick = action;

    serviceItem.appendChild(serviceImg);
    serviceInner.appendChild(serviceName);
    serviceInner.appendChild(serviceDescription);
    serviceItem.appendChild(serviceInner);
    serviceItem.appendChild(serviceButton);

    return serviceItem;
}
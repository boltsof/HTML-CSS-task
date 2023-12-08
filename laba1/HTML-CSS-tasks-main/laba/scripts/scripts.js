document.addEventListener("DOMContentLoaded",()=>{
    const galleryModal = document.querySelector(".modal-gallery_modal");
    const galleryImages = document.querySelector(".portfolio").getElementsByTagName("img");
    const galleryContent = document.getElementById("modal-gallery_content");
    const closeModalGallery = document.getElementById("close-gallery_button");

    const contactsButton = document.querySelectorAll(".contact-button");



    for (let i = 0; i < galleryImages.length; i++) {
        galleryImages[i].addEventListener("click", (e)=>{
            const imageGallery = document.createElement("img");
            imageGallery.src = e.currentTarget.src;

            galleryContent.innerHTML = "";
            galleryContent.append(imageGallery);

            galleryModal.style.opacity = "1";
            galleryModal.style.visibility = "visible";
            document.body.style.overflow = 'hidden';
        });
        
    }

    closeModalGallery.addEventListener("click",()=>{
        galleryModal.style.opacity = "0";
        galleryModal.style.visibility = "hidden";
        document.body.style.overflow = 'auto';
    });


    const modalRegistration = document.querySelector(".modal-registration_modal");
    const closeModalRegistration = document.getElementById("close-registration_button");
    const contactSendButton = document.getElementById("contact-form");
    const nameInput = document.getElementById("name-form");
    const numberInput = document.getElementById("number-form");

    contactsButton.forEach(contactButton => {
        contactButton.addEventListener("click",()=>{

            nameInput.value = "";
            numberInput.value = "";

            modalRegistration.style.opacity = "1";
            modalRegistration.style.visibility = "visible";
            document.body.style.overflow = 'hidden';
        });
    });

    closeModalRegistration.addEventListener("click",()=>{
        modalRegistration.style.opacity = "0";
        modalRegistration.style.visibility = "hidden";
        document.body.style.overflow = 'auto';
    });

    contactSendButton.addEventListener("click",()=>{
        

        if(!nameInput || nameInput.value.length === 0 || !isNameValid(nameInput.value)){
            alert("Неправильно введен имя");
            return;
        }

        if(!nameInput || nameInput.value.length === 0 || !isPhoneValid(numberInput.value)){
            alert("Неправильно введен номер");
            return;
        }

        alert("Успешно");

        modalRegistration.style.opacity = "0";
        modalRegistration.style.visibility = "hidden";
        document.body.style.overflow = 'auto';

    })

    function isNameValid(name) {
        const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
        return namePattern.test(name);
    }

   
    function isPhoneValid(phone) {
        const phonePattern = /^\d+$/;
        return phonePattern.test(phone);
    }


});
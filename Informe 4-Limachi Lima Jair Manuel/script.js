let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if(slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        
        slides[slideIndex-1].classList.add("active");
        dots[slideIndex-1].classList.add("active");
        
        setTimeout(showSlides, 4000);
    }
}

function currentSlide(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    slideIndex = n;
    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
    const registroForm = document.getElementById("registroForm");
    const statusMessage = document.getElementById("statusMessage");

    if (registroForm) {
        registroForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const correo = document.getElementById("correo").value;
            const telefono = document.getElementById("telefono").value;

            const nuevoUsuario = {
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                fechaRegistro: new Date().toLocaleString()
            };

            let baseDeDatosLocal = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
            baseDeDatosLocal.push(nuevoUsuario);
            localStorage.setItem("usuariosRegistrados", JSON.stringify(baseDeDatosLocal));

            statusMessage.textContent = "¡Registro almacenado con éxito localmente!";
            statusMessage.style.color = "green";

            registroForm.reset();
            
            setTimeout(() => {
                statusMessage.textContent = "";
            }, 3000);
        });
    }
});

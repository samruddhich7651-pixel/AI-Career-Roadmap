/*==================================================
AI CAREER ROADMAP
COMMON JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      PASSWORD SHOW / HIDE
    =========================================*/

    const toggleButtons = document.querySelectorAll(".toggle-password");

    toggleButtons.forEach(button => {

        button.addEventListener("click", () => {

            const input = button.previousElementSibling;

            if (input.type === "password") {

                input.type = "text";

                button.classList.remove("fa-eye");

                button.classList.add("fa-eye-slash");

            } else {

                input.type = "password";

                button.classList.remove("fa-eye-slash");

                button.classList.add("fa-eye");

            }

        });

    });



    /*=========================================
      INPUT FOCUS EFFECT
    =========================================*/

    const inputs = document.querySelectorAll("input, select");

    inputs.forEach(input => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add("active");

        });

        input.addEventListener("blur", () => {

            input.parentElement.classList.remove("active");

        });

    });



    /*=========================================
      BUTTON RIPPLE EFFECT
    =========================================*/

    const buttons = document.querySelectorAll(

        ".btn,.primary-btn,.secondary-btn,.auth-btn,.generate-btn,.download-btn"

    );

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transition = ".3s";

            button.style.transform = "translateY(-3px) scale(1.02)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translateY(0) scale(1)";

        });

    });



    /*=========================================
      SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

});
/*==================================================
FORM VALIDATION
==================================================*/

const forms = document.querySelectorAll("form");

forms.forEach(form => {

    form.addEventListener("submit", function(e){

        const requiredFields = form.querySelectorAll("[required]");

        let valid = true;

        requiredFields.forEach(field=>{

            if(field.value.trim()===""){

                valid = false;

                field.style.borderColor = "#ff4d4f";

            }else{

                field.style.borderColor = "#31C77F";

            }

        });

        if(!valid){

            e.preventDefault();

            alert("Please fill all required fields.");

        }

    });

});


/*==================================================
PASSWORD MATCH (REGISTER PAGE)
==================================================*/

const password = document.querySelector('input[name="password"]');
const confirmPassword = document.querySelector('input[name="confirm_password"]');

if(password && confirmPassword){

    confirmPassword.addEventListener("keyup",()=>{

        if(confirmPassword.value===""){

            confirmPassword.style.borderColor="#ECECEC";

            return;

        }

        if(password.value===confirmPassword.value){

            confirmPassword.style.borderColor="#31C77F";

        }else{

            confirmPassword.style.borderColor="#FF5A5A";

        }

    });

}


/*==================================================
DASHBOARD COUNTER ANIMATION
==================================================*/

const counters = document.querySelectorAll(".stat-card h2");

counters.forEach(counter=>{

    const target = Number(counter.innerText);

    if(isNaN(target)) return;

    let count = 0;

    const speed = target/60;

    const update = ()=>{

        count += speed;

        if(count < target){

            counter.innerText = Math.floor(count);

            requestAnimationFrame(update);

        }else{

            counter.innerText = target;

        }

    };

    update();

});


/*==================================================
PROGRESS BAR ANIMATION
==================================================*/

const progressFill = document.querySelector(".progress-fill");

if(progressFill){

    const width = progressFill.style.width;

    progressFill.style.width="0";

    setTimeout(()=>{

        progressFill.style.transition="1.5s ease";

        progressFill.style.width=width;

    },300);

}


/*==================================================
SCROLL REVEAL
==================================================*/

const revealElements = document.querySelectorAll(

".feature-card,.timeline-item,.stat-card,.roadmap-row,.motivation-card,.career-container,.auth-container"

);

const reveal = ()=>{

    revealElements.forEach(element=>{

        const top = element.getBoundingClientRect().top;

        const visible = window.innerHeight - 100;

        if(top < visible){

            element.classList.add("show");

        }

    });

};

window.addEventListener("scroll",reveal);

reveal();


/*==================================================
ACTIVE SIDEBAR
==================================================*/

const menuLinks = document.querySelectorAll(".sidebar-menu li");

menuLinks.forEach(item=>{

    item.addEventListener("click",()=>{

        menuLinks.forEach(link=>{

            link.classList.remove("active");

        });

        item.classList.add("active");

    });

});


/*==================================================
NOTIFICATION ICON
==================================================*/

const bell = document.querySelector(".notification");

if(bell){

    setInterval(()=>{

        bell.classList.toggle("ring");

    },2500);

}


/*==================================================
DOWNLOAD BUTTON
==================================================*/

const downloadBtn = document.querySelector(".download-btn");

if(downloadBtn){

    downloadBtn.addEventListener("click",()=>{

        downloadBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Preparing...';

    });

}


/*==================================================
BACK TO TOP BUTTON
==================================================*/

const topButton = document.createElement("button");

topButton.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topButton.className="back-to-top";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topButton.classList.add("show");

    }else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*==================================================
LOADING ANIMATION
==================================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


/*==================================================
CONSOLE MESSAGE
==================================================*/

console.log("🚀 AI Career Roadmap Loaded Successfully");
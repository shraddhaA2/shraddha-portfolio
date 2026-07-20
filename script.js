document.addEventListener("DOMContentLoaded", () => {


/* ==========================
   THEME TOGGLE
========================== */


const body = document.body;
const themeBtn = document.getElementById("theme-toggle");


const savedTheme = localStorage.getItem("theme");


if(savedTheme === "light"){

    body.classList.add("light-mode");

    themeBtn.innerHTML =
    '<i class="fa-solid fa-sun"></i>';

}




themeBtn.addEventListener("click",()=>{


    body.classList.toggle("light-mode");


    if(body.classList.contains("light-mode")){


        localStorage.setItem(
            "theme",
            "light"
        );


        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }
    else{


        localStorage.setItem(
            "theme",
            "dark"
        );


        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }


});







/* ==========================
   MOBILE MENU
========================== */


const menuBtn =
document.querySelector(".mobile-nav-toggle");


const navLinks =
document.querySelector(".nav-links");



menuBtn.addEventListener(
"click",
()=>{


navLinks.classList.toggle("show");


if(navLinks.classList.contains("show")){

    menuBtn.innerHTML =
    '<i class="fa-solid fa-xmark"></i>';

}
else{

    menuBtn.innerHTML =
    '<i class="fa-solid fa-bars"></i>';

}


});







/* ==========================
   TYPEWRITER EFFECT
========================== */


const typingElement =
document.querySelector(".hero h2");



const roles = [

"Frontend Developer",

"Full Stack Developer",

"AI Application Developer",

"Software Engineer"

];


let roleIndex = 0;

let charIndex = 0;

let deleting = false;



function typeWriter(){


if(!typingElement)
return;



let currentRole =
roles[roleIndex];



if(!deleting){


typingElement.textContent =
currentRole.substring(
0,
charIndex++
);



if(charIndex >
currentRole.length){


deleting = true;


setTimeout(
typeWriter,
1000
);


return;

}



}

else{


typingElement.textContent =
currentRole.substring(
0,
charIndex--
);



if(charIndex===0){


deleting=false;


roleIndex =
(roleIndex+1)
%
roles.length;


}

}



setTimeout(

typeWriter,

deleting ? 50 : 100

);


}



typeWriter();








/* ==========================
   NAVBAR SCROLL EFFECT
========================== */


const navbar =
document.querySelector(".navbar");



window.addEventListener(
"scroll",
()=>{


if(window.scrollY > 40){


navbar.style.background =
"rgba(0,0,0,0.75)";


}
else{


navbar.style.background =
"var(--card)";


}


});








/* ==========================
   SCROLL REVEAL
========================== */


const revealElements =
document.querySelectorAll(
".glass-card"
);



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.opacity="1";


entry.target.style.transform =
"translateY(0)";


}


});


},

{
threshold:0.15
}

);




revealElements.forEach(
card=>{


card.style.opacity="0";


card.style.transform =
"translateY(40px)";


card.style.transition =
"all .6s ease";



observer.observe(card);



});







/* ==========================
   ACTIVE NAVIGATION
========================== */


const sections =
document.querySelectorAll("section");


const links =
document.querySelectorAll(
".nav-links a"
);



window.addEventListener(
"scroll",
()=>{


let current = "";



sections.forEach(section=>{


let sectionTop =
section.offsetTop - 150;



if(window.scrollY >= sectionTop){


current =
section.getAttribute("id");


}



});



links.forEach(link=>{


link.classList.remove(
"active"
);



if(
link.getAttribute("href")
===
"#"+current
){

link.classList.add(
"active"
);

}


});


});







/* ==========================
   FOOTER YEAR
========================== */


const footer =
document.querySelector("footer p");



if(footer){


footer.innerHTML =
`© ${new Date().getFullYear()} Shraddha Ashoka. All Rights Reserved.`;

}



});
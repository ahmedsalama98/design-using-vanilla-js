let settinggear = document.querySelector(".setting-box span"),
    settinbox = document.querySelector(".setting-box"),
    backgroundinterval,
    backgroundrandom = true,
    landing = document.querySelector(".landing"),
    navigation = document.querySelector(".navigation-bullets"),
    navigationbullets = document.querySelectorAll(".navigation-bullets .bullet");

//the navbar//
let nav = document.querySelector(".nav");
let thenavelinks = document.querySelector(".nav .nav-links");
let thepars = document.querySelector(".nav .pars");
nav.onclick = function(e) {
    e.stopPropagation()
}
thepars.onclick = function() {

    thenavelinks.classList.toggle("show");
    nav.style.background = "rgba(11,11,11,.9)";

}

document.addEventListener("click", function(e) {

    if (e.target !== nav) {
        if (thenavelinks.classList.contains("show")) {
            thenavelinks.classList.toggle("show");
            nav.style.background = "rgba(11,11,11,.9)";
        }
    }

    if (e.target !== settinbox) {
        if (settinbox.classList.contains("show")) {
            settinggear.classList.toggle("click")
            settinbox.classList.toggle("show");
        }

    }
})

//the navbar//
//setting box//
settinbox.onclick = function(e) {
    e.stopPropagation()
}
settinggear.onclick = function() {

    this.classList.toggle("click")
    this.parentNode.classList.toggle("show");

};

//setting box//


//colores options//
let colorsoptionli = document.querySelectorAll(".colors-box ul li");

colorsoptionli.forEach((li, index) => {


        li.addEventListener("click", function(e) {


            document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

            localStorage.setItem("coloroption", e.target.dataset.color);

            handdleactive(e)
        })



    })
    //colores options//

//background options//
let backgroundoptions = document.querySelectorAll(".background-box span");

backgroundoptions.forEach((span, index) => {


        span.addEventListener("click", function(e) {


            handdleactive(e)

            if (e.target.dataset.background === "yes") {
                backgroundrandom = true;
                randomebackground()

                localStorage.setItem("backgroundopt", "true");

            } else {
                backgroundrandom = false;
                clearInterval(backgroundinterval)
                localStorage.setItem("backgroundopt", "false");
            }


        })



    })
    //background options//

//navigation bullets options//
let navigatinoptiont = document.querySelectorAll(".bults-box span");

navigatinoptiont.forEach(bullet => {

        bullet.addEventListener("click", function(e) {
            handdleactive(e)

            if (e.target.dataset.nav === "yes") {
                navigation.style.display = "block";
                localStorage.setItem("navigationopt", "true");
            } else {

                navigation.style.display = "none";
                localStorage.setItem("navigationopt", "false");
            }

        })

    })
    //nav background//
function navbackground() {

    if (window.pageYOffset > 10) {

        nav.style.background = "rgba(11,11,11,.9)";

    } else {
        nav.style.background = "none";
    }

};
window.addEventListener("scroll", navbackground)
    //nav background//

//navigation bullets options//


//random background for landingsection//

function randomebackground() {

    if (backgroundrandom === true) {
        let thebackgroudsrc = ["url(../pic/landing-background-1.jpg)", "url(../pic/landing-background-2.jpg)", "url(../pic/landing-background-3.png)", "url(../pic/landing-page-background-4.jpg)", "url(../pic/landing-page-background-5.jpg)"];
        backgroundinterval = setInterval(function() {
            let randomnum = Math.floor(Math.random() * thebackgroudsrc.length);
            landing.style.backgroundImage = thebackgroudsrc[randomnum]
        }, 4000);
    }
}


//random background for landingsection//


//localstorege//

let coloropt = localStorage.getItem("coloroption");
let backgroundopt = localStorage.getItem("backgroundopt");
let navigationopt = localStorage.getItem("navigationopt");


if (coloropt !== null) {
    document.documentElement.style.setProperty("--main-color", coloropt);
    colorsoptionli.forEach(item => {

        item.classList.remove("active");
        if (item.dataset.color == coloropt) {
            item.className = "active";

        }

    })
}



if (backgroundopt !== null) {

    if (backgroundopt === "true") {
        backgroundrandom = true;
        randomebackground()
    } else {
        backgroundrandom = false;
        randomebackground()
    }

    backgroundoptions.forEach(span => {
        span.classList.remove("active");
        if (backgroundopt === "true") {
            document.querySelector(".background-box .yes").classList.add("active");
        } else {
            document.querySelector(".background-box .no").classList.add("active");
        }


    })
} else {
    backgroundrandom = true;
    randomebackground()
}

if (navigationopt !== null) {

    navigatinoptiont.forEach(bullet => {


        bullet.classList.remove("active");

        if (navigationopt === "true") {
            navigation.style.display = "block";
            document.querySelector(".bults-box .yes").classList.add("active")
        } else {
            navigation.style.display = "none";
            document.querySelector(".bults-box .no").classList.add("active")
        }

    })

}

//localstorege//
//reset all options//
let theresetbutt = document.querySelector(".setting-box .reset");
theresetbutt.onclick = function() {
    localStorage.removeItem("coloroption");
    localStorage.removeItem("backgroundopt");
    localStorage.removeItem("navigationopt");
    window.location.reload()
}

//reset all options//
// skill progres//
let theskillssec = document.querySelector(".our-skills");
let progres = document.querySelectorAll(".skill-proggres span");

function progresfunction() {
    if (this.pageYOffset > theskillssec.offsetTop - 400) {

        progres.forEach(span => {
            span.style.width = `${span.dataset.proggrs}%`;
            span.textContent = `${span.dataset.proggrs}%`
        })
    }
}
window.addEventListener("scroll", progresfunction);
// skill progres//



//imges popup//

let gelleryimges = document.querySelectorAll(".images-box img");

gelleryimges.forEach(img => {


    img.addEventListener("click", function() {
        let theoverlay = document.createElement("div"),
            popbox = document.createElement("div"),
            popimg = document.createElement("img"),
            popspan = document.createElement("span");
        if (img.alt !== null) {
            let pophead = document.createElement("h4");
            pophead.textContent = img.alt;
            popbox.appendChild(pophead)
        }
        theoverlay.classList.add("overlay-imge");
        popbox.classList.add("box");
        popimg.src = img.getAttribute("src")
        popspan.innerHTML = `x`;
        popspan.classList.add("close-butt");
        popbox.appendChild(popimg);
        popbox.appendChild(popspan);
        theoverlay.appendChild(popbox);
        document.body.appendChild(theoverlay)
    })

});

document.addEventListener("click", function(e) {
    if (e.target.className == "close-butt") {
        e.target.parentElement.parentNode.remove()
    }
})

//imges popup//

//testimolins//
let testmolinsitems = document.querySelectorAll(".testi-content-box .person"),
    start = 0;

function testifun() {
    let testiinter = setInterval(function() {
        if (testmolinsitems.length !== start) {
            removealltestmolins()
            start++;
        }
        if (testmolinsitems.length === start) {
            removealltestmolins()
            start = 0;
        }
        testmolinsitems[start].style.display = "block";
    }, 4000);

    testmolinsitems[start].style.display = "block";
}
testifun()

function removealltestmolins() {
    testmolinsitems.forEach(te => {

        te.style.display = "none";
    })
}




//testimolins//
//navigation-bullets//

function scrolltosection(element) {
    element.forEach(bullet => {
        bullet.addEventListener("click", function(e) {
            e.preventDefault()
            let target = document.querySelector(`.${this.dataset.scroll}`);
            target.scrollIntoView({
                behavior: "smooth"
            })
        })
    })

}
scrolltosection(navigationbullets)


//navigation-bullets//

//handdle active class//
function handdleactive(event) {

    event.target.parentNode.querySelectorAll(".active").forEach(r => {
        r.classList.remove("active")
    });

    event.target.classList.add("active")
};
//handdle active class//


// Scroll Reveal Animation
/*

let SR = ScrollReveal({
    distance: '30px',
    duration: 1800,
    reset: true
});
SR.reveal('.gellery img  ', {
    origin: 'top',
    interval: 200
})
SR.reveal(' .feat , .social', {
    origin: 'bottom'
})

SR.reveal('.abut-us .content ,.time-line .left , .contact-us .left ,.our-skills .left , .landing p', {
    origin: 'left'
})
SR.reveal('.abut-us .imag , .time-line .right ,.contact-us .right ,footer , .our-skills .right , .landing h1', {
    origin: 'right'
})*/

new WOW().init();
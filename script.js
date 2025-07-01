let tut=document.querySelector('#tut-bars');
let navbar = document.querySelector('.navbar');

tut.onclick= () =>{
    tut.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}
window.onscroll = () =>{
    tut.remove.toggle('fa-times');
    navbar.remove.toggle('active');
}
document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');
}



var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true,
  });
  var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop:true,
    breakPoints:{
      0:{
        slidesPreview:1,
      },
      640:{
        slidesPreview:2,
      },
      768:{
        slidesPreview:2,
      },
      1024:{
        slidesPreview:3,
      },
    }
  });
  


function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
  setInterval(loader, 3000);
}

window.onload = fadeOut;


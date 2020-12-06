//Navbar
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.links');
  const navLinks = document.querySelectorAll('.links li');
  //toggal nav
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    //animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = ''
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.2}s`;
      }
    });
    //burger animation
    burger.classList.toggle('toggle');
  });
}
navSlide();

//end of Navbar

let myIndex = 0;
carousel();

function carousel() {
  let i;
  let x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1
  }
  x[myIndex - 1].style.display = "block";
  setTimeout(carousel, 3000)
}

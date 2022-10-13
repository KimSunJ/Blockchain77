let winH = window.innerHeight;
let scrollY = window.scrollY;
// let fromTop = i;

//   let element = document.getElementById("reserve");
//   let distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
//   let elementHeight = element.offsetHeight;
//   let scrollTop = this.document.documentElement.scrollTop;

//   let opacity = document.getElementById("reserve").style.animation;

//   if (scrollTop > distanceToTop) {
//     opacity = 1 - (scrollTop - distanceToTop) / elementHeight;
//   }
//   if (opacity >= 0) {
//     element.style.opacity = opacity;
//   }
// });

window.onscroll = function (event) {
  console.log(window.scrollY);
  // console.log(event);
};

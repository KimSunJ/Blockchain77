let winH = window.innerHeight;
let beanAni = document.getElementById("reserve");
let pickImg = document.getElementById("pickImg");
let pickTxt1 = document.getElementById("pickTxt1");
let pickTxt2 = document.getElementById("pickTxt2");
let pickDetail = document.getElementById("pickDetail");
let magazine = document.getElementById("magazine");
let storeTxt1 = document.getElementById("storeTxt1");
let storeTxt2 = document.getElementById("storeTxt2");
let storeTxt3 = document.getElementById("storeTxt3");
let storeDetail = document.getElementById("storeDetail");
let house = document.getElementById("house");
let circle = document.getElementById("circle");

window.onload = function () {
  setTimeout(function () {
    scrollTo(0, 0);
  }, 100);
};

window.onscroll = function (event) {
  let scrollY = window.scrollY;
  // console.log(scrollY);
  if (
    !scrollY < 420 &&
    scrollY > 420 &&
    !beanAni.classList.contains("active")
  ) {
    beanAni.classList.add("active");
  }
  if (!scrollY < 1000 && scrollY > 1300) {
    pickImg.classList.add("active");
    pickTxt1.classList.add("active");
    pickTxt2.classList.add("active");
    pickDetail.classList.add("active");
  }
  if (!scrollY < 1600 && scrollY > 1600) {
    magazine.classList.add("active");
  }
  if (!scrollY < 2000 && scrollY > 2000) {
    storeTxt1.classList.add("active");
    storeTxt2.classList.add("active");
    storeTxt3.classList.add("active");
    storeDetail.classList.add("active");
    house.classList.add("active");
    circle.classList.add("active");
  }
};

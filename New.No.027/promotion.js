let promotion = document.getElementById("prom-wrap");
let down = document.getElementById("down");
let up = document.getElementById("up");
let promOpen = document.getElementById("prom-wrap");

down.addEventListener("click", () => {
  down.style.display = "none";
  up.style.display = "block";
  promOpen.style.height = "660px";
});

up.addEventListener("click", () => {
  up.style.display = "none";
  down.style.display = "block";
  promOpen.style.height = "0";
});

// 프로모션 이미지 슬라이딩 버튼
let click = 0;
let pause = document.getElementById("pause");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");

// 프로모션 이미지 슬라이딩
let slides = document.querySelector(".prom-container"),
  slide = document.querySelectorAll(".prom-container li"),
  currentIdx = 0,
  slideCount = slide.length,
  slideWidth = 819,
  slideMargin = 10,
  prevBtn = document.querySelector(".left"),
  nextBtn = document.querySelector(".right");

makeClone();

function makeClone() {
  for (let i = 0; i < slideCount; i++) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.appendChild(cloneSlide);
  }
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();

  setTimeout(function () {
    slides.classList.add("transition");
  }, 100);
}

function updateWidth() {
  let currentSlides = document.querySelectorAll(".prom-container li");
  let newSlideCount = currentSlides.length;
  let newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
  slides.style.width = newWidth;
}
function setInitialPos() {
  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  slides.style.transform = "translateX" + initialTranslateValue + "px";
}

nextBtn.addEventListener("click", function () {
  moveSlide(currentIdx + 1);
});

prevBtn.addEventListener("click", function () {
  moveSlide(currentIdx - 1);
});

function moveSlide(num) {
  slides.style.left = -num * (slideWidth + slideMargin) + "px";
  currentIdx = num;
  console.log(currentIdx, slideCount);
  if (currentIdx == 0 || currentIdx == 3 || currentIdx == -3) {
    btn1.style.backgroundImage = "url('main_prom_on.png')";
    btn2.style.backgroundImage = "url('main_prom_off.png')";
    btn3.style.backgroundImage = "url('main_prom_off.png')";
  } else if (currentIdx == 1 || currentIdx == -2) {
    btn2.style.backgroundImage = "url('main_prom_on.png')";
    btn1.style.backgroundImage = "url('main_prom_off.png')";
    btn3.style.backgroundImage = "url('main_prom_off.png')";
  } else if (currentIdx == 2 || currentIdx == -1) {
    btn3.style.backgroundImage = "url('main_prom_on.png')";
    btn1.style.backgroundImage = "url('main_prom_off.png')";
    btn2.style.backgroundImage = "url('main_prom_off.png')";
  }
  console.log(btn1, btn2, btn3);
  console.log(currentIdx);
  if (currentIdx == slideCount || currentIdx == -slideCount) {
    setTimeout(function () {
      slides.classList.remove("transition");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 300);
    setTimeout(function () {
      slides.classList.add("transition");
    }, 400);
  }
}

let slideImg = 0;

slideImg = setInterval(function () {
  moveSlide(currentIdx + 1);
}, 3000);

btn1.addEventListener("click", () => {
  pause.style.backgroundImage = "url('main_prom_play.png')";
  btn1.style.backgroundImage = "url('main_prom_on.png')";
  btn2.style.backgroundImage = "url('main_prom_off.png')";
  btn3.style.backgroundImage = "url('main_prom_off.png')";
  btn1 == moveSlide(3);
  clearInterval(slideImg);
});

btn2.addEventListener("click", () => {
  pause.style.backgroundImage = "url('main_prom_play.png')";
  btn1.style.backgroundImage = "url('main_prom_off.png')";
  btn2.style.backgroundImage = "url('main_prom_on.png')";
  btn3.style.backgroundImage = "url('main_prom_off.png')";
  btn2 == moveSlide(1);
  clearInterval(slideImg);
});

btn3.addEventListener("click", () => {
  pause.style.backgroundImage = "url('main_prom_play.png')";
  btn1.style.backgroundImage = "url('main_prom_off.png')";
  btn2.style.backgroundImage = "url('main_prom_off.png')";
  btn3.style.backgroundImage = "url('main_prom_on.png')";
  btn3 == moveSlide(2);
  clearInterval(slideImg);
});

let play = 0;

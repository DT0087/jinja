// メニュー展開時に背景を固定
function backgroundFix(fix) {
  if (fix) {
    // 背景を固定する処理 (例: スクロールを禁止する)
    document.body.style.overflow = "hidden";
  } else {
    // 背景固定を解除する処理 (例: スクロールを許可する)
    document.body.style.overflow = "auto";
  }
}

  
// 変数定義
const CLASS = "-active";
let flg = false;
let accordionFlg = false;
  
let hamburger = document.getElementById("js-hamburger");
let focusTrap = document.getElementById("js-focus-trap");
let menu = document.querySelector(".js-nav-area");
let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
let accordion = document.querySelectorAll(".js-sp-accordion");
  
// メニュー開閉制御
hamburger.addEventListener("click", (e) => { //ハンバーガーボタンが選択されたら
  e.currentTarget.classList.toggle(CLASS);
  menu.classList.toggle(CLASS);
  if (flg) {// flgの状態で制御内容を切り替え
    backgroundFix(false);
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.focus();
    flg = false;
  } else {
    backgroundFix(true);
    hamburger.setAttribute("aria-expanded", "true");
    flg = true;
  }
});
window.addEventListener("keydown", () => {　//escキー押下でメニューを閉じられるように
  if (event.key === "Escape") {
    hamburger.classList.remove(CLASS);
    menu.classList.remove(CLASS);
  
    backgroundFix(false);
    hamburger.focus();
    hamburger.setAttribute("aria-expanded", "false");
    flg = false;
  }
});
  
// メニュー内アコーディオン制御
accordionTrigger.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle(CLASS);
    e.currentTarget.nextElementSibling.classList.toggle(CLASS);
    if (accordionFlg) {
      e.currentTarget.setAttribute("aria-expanded", "false");
      accordionFlg = false;
    } else {
      e.currentTarget.setAttribute("aria-expanded", "true");
      accordionFlg = true;
    }
  });
});
  
// フォーカストラップ制御
focusTrap.addEventListener("focus", (e) => {
  hamburger.focus();
});

//画像のフェードイン
document.addEventListener("DOMContentLoaded", function() {
  /*const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });*/

  const fadeInElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
  }, { threshold: 0.5 });

  fadeInElements.forEach(el => observer.observe(el));
});
document.querySelectorAll(".global-navigation__list a").forEach((link) => {
  link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "center",
          });
      }
  });
});

let slideIndex = 0;
let slides = document.querySelectorAll(".slides");
let text = document.getElementById("slide-text");

// スライドが存在する場合のみ処理を実行
if (slides.length > 0) {
  setTimeout(() => {
    text.classList.add("visible");
  }, 1000);

  showSlides();
}

function showSlides() {
  if (slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove("active"));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");

  setTimeout(showSlides, 6000); // 文法修正
}

// ボタンクリックでスライド切り替え

let currentIndex = 0; // 0から始める
const slides2 = document.querySelectorAll(".slide2"); // クラス名を統一
const slider = document.querySelector(".slider");
const totalSlides = slides2.length;
const slideWidth = 350 + 10; // 幅250px + マージン10px

function showSlide(index) {
    slides2.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    const offset = -(index * slideWidth - (100)); // 中央に配置調整
    slider.style.transform = `translateX(${offset}px)`;
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

// 最初のスライドを表示
showSlide(currentIndex);




// 画像のスライドショー
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function loopScroll() {
    const scrollArea = document.querySelector(".gallery");

    gsap.to(scrollArea, {
        scrollLeft: scrollArea.scrollWidth, // 横スクロールを適用
        duration: 300, // スクロール速度を調整
        ease: "none",
        onComplete: () => {
            gsap.to(scrollArea, {
                scrollLeft: 0, // 自然に最初へ戻る
                duration: 2, // リセットを滑らかに
                ease: "power2.inOut",
                onComplete: loopScroll // ループ実行
            });
        }
    });
}

function randomizePositions() {
  const sections = document.querySelectorAll('.section4');

  sections.forEach(section4 => {
      const imageContainer = section4.querySelector('.image-container');
      const textContainer = section4.querySelector('.fon-container');
      const text = section4.querySelector('.fone');

      const randomSize = Math.random() * 0.5 + 0.5; // 50%〜100%の範囲で拡大縮小
      const randomTop = Math.random() * 40 + 10; // 10%〜50%の範囲で配置
      const randomLeft = Math.random() * 40 + 10;

      // 画像の位置とサイズ
      imageContainer.style.position = "absolute";
      imageContainer.style.top = `${randomTop}%`;
      imageContainer.style.left = `${randomLeft}%`;

      // テキストコンテナの位置
      textContainer.style.position = "absolute";
      textContainer.style.top = `${50 - randomTop}%`;
      textContainer.style.left = `${70 - randomLeft}%`;

      // `.fone` の位置
      if (text) {
          text.style.position = "absolute"; // ここを追加
          text.style.top = `${70 - randomTop}%`;
          text.style.left = `${80 - randomLeft}%`;
      }
  });
}

// ページが読み込まれたら実行
window.addEventListener('DOMContentLoaded', () => {
  randomizePositions();
  loopScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault(); // デフォルトのジャンプ動作を防ぐ

          const targetId = this.getAttribute("href").substring(1); // `#` を除いたID取得
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
              });
          }
      });
  });
});
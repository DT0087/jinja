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

// ギャラリーをロード
function loadGallery() {
  let galleryData = JSON.parse(localStorage.getItem('galleryData')) || [];
  let galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';

  if (galleryData.length === 0) {
      galleryContainer.innerHTML = '<p>まだアップロードされた画像はありません。</p>';
  } else {
      galleryData.forEach((item, index) => {
          if (item.likes === undefined) {
              item.likes = 0; // いいねカウントがない場合は0に設定
          }

          let div = document.createElement('div');
          div.classList.add('gallery-item');
          div.innerHTML = `
              <img src="${item.image}" alt="アップロード画像" onclick="openModal('${item.image}')">
              <p>${item.text}</p>
              <button class="like-button" onclick="likeImage(${index})">❤️ いいね</button>
              <p class="like-count" id="like-count-${index}">${item.likes} いいね</p>
              <button class="delete-button" onclick="deleteImage(${index})">🗑️ 削除</button>
          `;
          galleryContainer.appendChild(div);
      });

      // 更新されたデータを保存
      localStorage.setItem('galleryData', JSON.stringify(galleryData));
  }
}

// 画像を削除
function deleteImage(index) {
  let galleryData = JSON.parse(localStorage.getItem('galleryData')) || [];

  if (galleryData[index]) {
      galleryData.splice(index, 1); // 指定のインデックスの画像を削除
      localStorage.setItem('galleryData', JSON.stringify(galleryData));
      loadGallery(); // ギャラリーを再ロード
  }
}


// 画像をクリックしてモーダル表示
function openModal(imageSrc) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('imageModal').style.display = "flex";
}

// モーダルを閉じる
function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}

// いいねボタン処理
function likeImage(index) {
    let galleryData = JSON.parse(localStorage.getItem('galleryData')) || [];

    if (galleryData[index]) {
        galleryData[index].likes = (galleryData[index].likes || 0) + 1;
        localStorage.setItem('galleryData', JSON.stringify(galleryData));

        // 画面のいいねカウントを更新
        document.getElementById(`like-count-${index}`).textContent = `${galleryData[index].likes} いいね`;
    }
}

// ページ読み込み時にギャラリーを表示
window.onload = loadGallery;

//画像のフェードイン
document.addEventListener("DOMContentLoaded", function() {
  
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




document.getElementById('imageUpload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('imagePreview').style.backgroundImage = `url(${e.target.result})`;
          document.getElementById('imagePreview').style.backgroundSize = 'cover';
          document.getElementById('imagePreview').textContent = '';
          localStorage.setItem('imageData', e.target.result);
      };
      reader.readAsDataURL(file);
  }
});

document.getElementById('textInput').addEventListener('input', function(event) {
  document.getElementById('textPreview').textContent = event.target.value || 'テキスト';
});

function saveData() {
  const text = document.getElementById('textInput').value;
  const image = localStorage.getItem('imageData');

  if (image && text) {
      const data = JSON.parse(localStorage.getItem('galleryData')) || [];
      data.push({ image, text });
      localStorage.setItem('galleryData', JSON.stringify(data));
      alert('アップロード完了！');
  } else {
      alert('画像とテキストを入力してください！');
  }
}






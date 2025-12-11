let accordionDetails = '.js-details';
let accordionSummary = '.js-details-summary';
let accordionContent = '.js-details-content';
let speed = 500;
let timer;

$(accordionDetails).on("mouseenter", function(event) {
  // summaryにis-activeクラスを追加
  $(this).find(accordionSummary).addClass("is-active");
  // selfにthisを格納
  let self = this;
  //時間差で以下の処理を実施
  timer = setTimeout(function() {
    // open属性を付ける
    $(self).attr("open", "true");
    // いったんdisplay:none;してからfadeInで開く
    $(self).find(accordionContent).hide().fadeIn(speed);
  }, 200);
});

$(accordionDetails).on("mouseleave", function(event) {
  // clearTimeoutでタイマーをキャンセル
  clearTimeout(timer);
  // summaryからis-activeクラスを削除
  $(this).find(accordionSummary).removeClass("is-active");
  // selfにthisを格納
  let self = this;
  // アニメーションの完了後にopen属性を取り除く
  $(self).find(accordionContent).fadeOut(speed, function() {
    $(self).removeAttr("open");
  });
});
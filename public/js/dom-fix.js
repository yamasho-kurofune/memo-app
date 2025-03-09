// DOM操作の安全性を確保するためのスクリプト
(function() {
  // DOMが完全に読み込まれた後に実行
  document.addEventListener('DOMContentLoaded', function() {
    // share-modalに関連する要素を探す
    const shareButtons = document.querySelectorAll('[data-share], .share-button, [data-action="share"]');
    
    // 見つかった要素にイベントリスナーを追加
    if (shareButtons && shareButtons.length > 0) {
      shareButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          console.log('Share button clicked');
          // 必要なシェア機能をここに実装
        });
      });
    }
    
    // その他のDOM操作も同様に要素の存在確認をしてから行う
    const originalAddEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function() {
      if (this) {
        return originalAddEventListener.apply(this, arguments);
      }
    };
    
    console.log('DOM-Fix script loaded successfully');
  });
})();

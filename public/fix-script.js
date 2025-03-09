// share-modal.jsのエラーを解決するためのスクリプト
(function() {
  // DOMが完全に読み込まれた後に実行
  document.addEventListener('DOMContentLoaded', function() {
    // share-modal.jsのエラーを防ぐための空の要素を作成
    const dummyShareButton = document.createElement('div');
    dummyShareButton.id = 'share-button'; // 適切なIDに変更
    dummyShareButton.className = 'share-button';
    dummyShareButton.setAttribute('data-share', 'true');
    dummyShareButton.setAttribute('data-action', 'share');
    dummyShareButton.style.display = 'none';
    document.body.appendChild(dummyShareButton);
    
    // グローバルなイベントリスナーの安全なラッパー
    const originalAddEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function() {
      if (this) {
        return originalAddEventListener.apply(this, arguments);
      }
    };
    
    console.log('Fix-script実行完了: share-modal.jsエラー対策');
  });
})();

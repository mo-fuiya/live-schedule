eventClick: function(info) {
  const title = info.event.title;
  const date = info.event.startStr;

  // URLに情報つけて移動
  window.location.href = `event.html?title=${title}&date=${date}`;
}
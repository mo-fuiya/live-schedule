document.addEventListener('DOMContentLoaded', async function () {

  // JSON読み込み
  const response = await fetch('data.json');
  const data = await response.json();

  // イベント変換
  const events = data.events.map(e => ({
    title: e.title,
    start: e.date,
    extendedProps: {
      idolIds: e.idolIds
    }
  }));

  // カレンダー生成
  const calendar = new FullCalendar.Calendar(
    document.getElementById('calendar'),
    {
      initialView: 'dayGridMonth',
      events: events,

      eventClick: function(info) {
        const idolIds = info.event.extendedProps.idolIds;

        // アイドル名に変換
        const idolNames = idolIds.map(id => {
          const idol = data.idols.find(i => i.id === id);
          return idol ? idol.name : "不明";
        });

        alert(
          info.event.title + "\n出演: " + idolNames.join(", ")
        );
      }
    }
  );

  calendar.render();
});
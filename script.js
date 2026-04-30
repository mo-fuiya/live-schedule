document.addEventListener('DOMContentLoaded', function () {

  const events = [
    {
      title: "ライブイベント1",
      start: "2026-05-10"
    },
    {
      title: "フェスイベント",
      start: "2026-05-15"
    }
  ];

  const calendar = new FullCalendar.Calendar(
    document.getElementById('calendar'),
    {
      initialView: 'dayGridMonth',
      events: events,

      eventClick: function(info) {
        const title = info.event.title;
        const date = info.event.startStr;

        window.location.href = `event.html?title=${title}&date=${date}`;
      }
    }
  );

  calendar.render();
});

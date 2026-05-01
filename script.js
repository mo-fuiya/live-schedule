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
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.toLowerCase();
  searchResults.innerHTML = "";

  fetch("data.json?nocache=" + new Date().getTime())
    .then(res => res.json())
    .then(data => {

      // アイドル検索
      data.idols.forEach(idol => {
        if (idol.name.toLowerCase().includes(keyword)) {
          const li = document.createElement("li");

          const link = document.createElement("a");
          link.textContent = idol.name;
          link.href = `idol.html?id=${idol.id}`;

          li.appendChild(link);
          searchResults.appendChild(li);
        }
      });

      // イベント検索
      data.events.forEach(event => {
        if (event.title.toLowerCase().includes(keyword)) {
          const li = document.createElement("li");

          const link = document.createElement("a");
          link.textContent = "【イベント】" + event.title;
          link.href = `event.html?title=${encodeURIComponent(event.title)}&date=${event.date}`;

          li.appendChild(link);
          searchResults.appendChild(li);
        }
      });

    });
});

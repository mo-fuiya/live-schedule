document.addEventListener('DOMContentLoaded', function () {

  fetch("data.json?nocache=" + new Date().getTime())
    .then(res => res.json())
    .then(data => {

      const calendar = new FullCalendar.Calendar(
        document.getElementById('calendar'),
        {
          initialView: 'dayGridMonth',
          events: convertEvents(data.events),

          eventClick: function(info) {
            const title = info.event.title;
            const date = info.event.startStr;

            window.location.href = `event.html?title=${encodeURIComponent(title)}&date=${date}`;
          }
        }
      );

      calendar.render();

      function convertEvents(events) {
        return events.map(e => ({
          title: e.title,
          start: e.date
        }));
      }

      // ⭐ お気に入り表示
      document.getElementById("showFavorites").addEventListener("click", function () {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const filtered = data.events.filter(e =>
          e.appearances.some(a => favorites.includes(a.idolId))
        );

        calendar.removeAllEvents();
        calendar.addEventSource(convertEvents(filtered));
      });

      // 🔄 全表示
      document.getElementById("showAll").addEventListener("click", function () {
        calendar.removeAllEvents();
        calendar.addEventSource(convertEvents(data.events));
      });

      // 🔍 検索（←これを残す）
      const searchInput = document.getElementById("searchInput");
      const searchResults = document.getElementById("searchResults");

      searchInput.addEventListener("input", function () {
        const keyword = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";

        if (keyword === "") return;

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
});

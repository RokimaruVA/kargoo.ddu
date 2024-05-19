document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-group li a");
  const tabContents = document.querySelectorAll(".tab-content > div");

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function (event) {
      event.preventDefault();
      // Убираем активный класс у всех вкладок
      tabs.forEach(function (tab) {
        tab.parentElement.classList.remove("active");
      });
      // Добавляем активный класс к текущей вкладке
      this.parentElement.classList.add("active");
      // Показываем соответствующее содержимое вкладки
      tabContents.forEach(function (content) {
        content.style.display = "none";
      });
      tabContents[index].style.display = "grid"; // Изменено на grid
    });
  });
});

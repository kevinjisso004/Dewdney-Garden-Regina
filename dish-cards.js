/* Keeps dish names and prices on every page in sync with menu.js
   (menu.js is refreshed daily from the live iOrders menu).
   Elements carry data-menu-id="<menu.js food id>"; the static text is only a fallback. */
(function () {
  if (typeof data === "undefined" || !Array.isArray(data)) return;
  var byId = {};
  data.forEach(function (cat) {
    (cat.foods_displayed_in_menu || []).forEach(function (f) {
      byId[String(f.id)] = f;
    });
  });
  document.querySelectorAll("[data-menu-id]").forEach(function (el) {
    var f = byId[el.getAttribute("data-menu-id")];
    if (!f) return;
    var n = el.querySelector(".menu-name");
    if (n) n.textContent = f.title.replace(/^\s*[0-9]+[A-Z]?\.\s*/, "").replace(/\s*\((Large|Small|Medium)\)$/, "");
    var p = el.querySelector(".menu-price");
    if (p) p.textContent = "$" + Number(f.price).toFixed(2);
  });
})();

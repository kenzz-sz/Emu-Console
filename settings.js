(function() {
  window.opensettingsmenu = function(){
    t(`
    Settings Menu
    <button class="menubutton" onclick="const v = prompt('delay 1000 = 1s; if(!isNaN(v)'){settings.delaybotsend = v}">Set Delay Send</button>
    `)
  }
  system("clear")
  t("|")
  d(500, `system("clear"); t("\\")`)
  d(1000, `system("clear"); t("—")`)
  d(1500, `system("clear"); t("|")`)
  d(2000, `system("clear"); t("\\")`)
  d(2500, `system("clear"); t("—")`)
  d(3000, `system("clear"); t("/")`)
  d(3500, `system("clear"); t("|")`)
  d(4000, `system("clear"); t("\\")`)
  d(4500, `system("clear"); t("—")`)
  d(5000, `system("clear"); t("|")`)
  d(5500, `system("clear"); t("\\")`)
  d(6000, `system("clear"); t("—")`)
  d(6500, `system("clear"); t("/")`)
  d(7000, `system("clear"); t("|")`)
  d(7500, `system("clear"); opensettingsmenu()`)


})();

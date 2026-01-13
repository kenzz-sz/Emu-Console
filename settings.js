(function() {
  window.opensettingsmenu = function(){
    t(`
    Settings Menu
    <button class="menubutton" onclick="const v = prompt('delay 1000 = 1s; if(!isNaN(v)'){settings.delaybotsend = v}">Set Delay Send</button>
    `)
  }
  system("clear")
  t("|")
  d(500, `t("\\")`)
  d(1000, `t("—")`)
  d(1500, `t("|")`)
  d(2000, `t("\\")`)
  d(2500, `t("—")`)
  d(3000, `t("/")`)
  d(3500, `t("|")`)
  d(4000, `t("\\")`)
  d(4500, `t("—")`)
  d(5000, `t("|")`)
  d(5500, `t("\\")`)
  d(6000, `t("—")`)
  d(6500, `t("/")`)
  d(7000, `t("|")`)
  d(7500, `opensettingsmenu()`)


})();

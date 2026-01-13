(function() {
  window.opensettingsmenu = function(){
    t(`
    [ Settings Menu ]<br>
    > <button class="menubutton" onclick="const v = prompt('delay 1000 = 1s; if(!isNaN(v)'){settings.delaybotsend = v}">Set Delay Send</button>
    `)
  }
  function clear(){
    output = "";
    reload()
  }
  system("clear")
  t("|")
  d(500, `clear(); t("\\")`)
  d(1000, `clear(); t("—")`)
  d(1500, `clear(); t("|")`)
  d(2000, `clear(); t("\\")`)
  d(2500, `clear(); t("—")`)
  d(3000, `clear(); t("/")`)
  d(3500, `clear(); t("|")`)
  d(4000, `clear(); t("\\")`)
  d(4500, `clear(); t("—")`)
  d(5000, `clear(); t("|")`)
  d(5500, `clear(); t("\\")`)
  d(6000, `clear(); t("—")`)
  d(6500, `clear(); t("/")`)
  d(7000, `clear(); t("|")`)
  d(7500, `clear(); opensettingsmenu()`)


})();

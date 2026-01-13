(function() {
  window.opensettingsmenu = function(){
    t(`
    [ Settings Menu ]<br>
    > <span>Delay Bot (</span><span id="delaybotsendtxt"></span><span>) : </span><button class="menubutton" onclick="const v = prompt('delay 1000 = 1s'); if(!isNaN(v)){settings.delaybotsend = v}">edit</button>
    `)
  }
  system("clear")
  d(200, `opensettingsmenu()`)
})();
  
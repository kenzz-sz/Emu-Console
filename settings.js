(function() {
  window.opensettingsmenu = function(){
    t(`
    [ Settings Menu ]<br>
    > <button class="menubutton" onclick="const v = prompt('delay 1000 = 1s'); if(!isNaN(v)){settings.delaybotsend = v; reload()}">edit</button>
    `)
  }
  system("clear")
  d(200, `opensettingsmenu()`)
})();
  
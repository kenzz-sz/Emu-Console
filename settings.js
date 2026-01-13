(function() {
  window.refresh = function(){
 document.getElementById("delaybotsendtxt").innerHTML = settings.delaybotsend;
  }
  window.opensettingsmenu = function(){
    bot(`
    [ Settings Menu ]<br>
    > <button class="menubutton" onclick="const v = prompt('delay 1000 = 1s'); if(!Number.isNaN(v)){settings.delaybotsend = v; refresh()}">edit</button>
    `)
  }
  system("clear")
  d(200, `opensettingsmenu()`)
})();
  
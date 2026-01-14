(function() {
  
  window.refresh = function() {
    const el = document.getElementById("delaybotsendtxt");
    if (!el) return;
    el.innerText = (settings.delaybotsend || 0) * 0.001;
  };
  
  window.opensettingsmenu = function() {
    bot(`
      [ Settings Menu ]<br>
      > <button class="menubutton" onclick="system('clear'); canenter = 1">Back</button><br>
      > Delay Bot, Current: ( <span id="delaybotsendtxt"></span>s )
      <button class="menubutton" onclick="
        const v = prompt('delay (detik)');
        const n = Number(v);
        if (!Number.isNaN(n)) {
          settings.delaybotsend = n * 1000;
          refresh();
        }
      ">edit</button><br>
      <br>
      Plugin Installed:<br>
      opendy: ${plugininstalled.opendy}<br>
      urlcmd: ${plugininstalled.url.urlcmd}<br>
      urldetector: ${plugininstalled.url.urldetector}<br>
    `);
    
    refresh();
  };
  canenter = 0
  refresh()
  system("clear");
  opensettingsmenu();
  
})();

function runcmd(textt) {
 if (textt === "help" || textt === "?") {
  bot(listcmd)
 }
 else if (textt === "history-clear") {
  system("clear")
 }
 else if (textt === "clear-console") {
  console.clear()
  reload()
 }
 else if (textt.startsWith("import ")) {
  const v = textt.split(" ")[1]
  imp(v)
  reload()}
 else if (textt === "plugin"){
  bot(JSON.stringify(plugininstalled, null, 2));
 }
 else if (textt.startsWith("from url run ")) {
 const v = textt.split(" ")[3]
 if (textt.endsWith(" -exc")){
  if(plugininstalled.url.urlcmd == 1){
   if(plugininstalled.url.urldetector == 1){
    try {
  fetch(v)
    .then(r => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.text();
    })
    .then(js => {
      try {
        eval(js);
      } catch (e) {
        console.error("Eval error:", e);
      }
    })
    .catch(e => {
      console.error("Fetch error:", e);
    });
} catch (e) {
  console.error("General error:", e);
}
  }else {bot(err.iurl)}
  }else {bot(err.cnf)}
 }
 }
 else if (textt.startsWith("opendy ")) {
  const v = textt.split(" ")[1]
  if (plugininstalled.opendy == 1) {
   fetch(`javascript/directory/${v}`)
 .then(res => res.text())
 .then(code => {
  eval(code);
 });
  } else {
   bot(err.pnf + " u need import opendy")
   reload()
  }
 }
 else if (textt.startsWith("from url open ")) {
 const v = textt.split(" ")[3]
 if (textt.endsWith(" -clear")) {
  if (plugininstalled.url.urldetector == 1) {
   system("clear")
   fetch(v)
  .then(r => r.text())
  .then(text => bot(text));
   } else { bot(err.iurl) }
  } else {
   if (plugininstalled.url.urldetector == 1) {
   fetch(v)
  .then(r => r.text())
  .then(text => bot(text));
   } else { bot(err.iurl) }
  }
 }
 else if (textt == "settings") {
 d(1000, 'opensettings()')
 }
 else {
  bot(err.cnf)
  reload()
 }
 }

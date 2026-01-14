let settings = {
 "delaybotsend": 250,
 "hideinput": 0,
 "useentinkey": 1
}
canenter = 1
async function opensettings(){
 await fetch("https://raw.githubusercontent.com/kenzz-sz/Emu-Console/refs/heads/main/settings.js")
  .then(res => res.text())
  .then(text => eval(text));
}

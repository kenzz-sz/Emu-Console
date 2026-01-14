(async function () {

const datatxtemu = {
"ui": ""
}
 await fetch("https://raw.githubusercontent.com/kenzz-sz/Emu-Console/refs/heads/main/ui-settings.txt")
  .then(res => res.text())
  .then(text => datatxtemu.ui = text);
bot(datatxtemu.ui)


})();
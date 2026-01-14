(async function() {
let data = {
"username": ""
}
function send(text){
  if (canenter == 1) {
    output += `> ${text}<br>`;
    reload();

    const user = localStorage.getItem("username");
    savePromptToGithub(text, user);

    runcmd(cmd.value);
  }
}
async function savePromptToGithub(textx, username) {
const pengguna = username;
if (!pengguna) {
alert("Belum login");
return;
}

const owner = "kenzz-sz";
const repo = "Emu-console";
const path = "Database.json";
const token = pw;

const api = https://api.github.com/repos/${owner}/${repo}/contents/${path};

// ambil database
const res = await fetch(api, {
headers: { Authorization: token ${token} }
});

let sha = null;
let data = {};

if (res.ok) {
const json = await res.json();
sha = json.sha;
data = JSON.parse(atob(json.content.replace(/\n/g, "")));
}

// pastikan user punya array
if (!Array.isArray(data[pengguna])) {
data[pengguna] = [];
}

// simpan pesan
data[pengguna].push(textx);

await fetch(api, {
method: "PUT",
headers: {
Authorization: token ${token},
"Content-Type": "application/json"
},
body: JSON.stringify({
message: add message ${pengguna},
content: btoa(JSON.stringify(data, null, 2)),
sha: sha
})
});

alert("Pesan tersimpan");
}
function createacc(name){
  localStorage.setItem("username", name);
}

function password() {
  const psws = ""
  fetch("https://raw.githubusercontent.com/kenzz-sz/Emu-Console/refs/heads/main/password.txt")
  .then(res => res.text())
  .then(text => psws = ("ghp_" + text));
  return psws;
}
pw = password();
})();

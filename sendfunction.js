function send(text){
  if (canenter == 1) {
    const user = localStorage.getItem("username");
    if (!user) {
      alert("belum login");
      return;
    }

    output += `> ${text}<br>`;
    reload();

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
const now = new Date();
const menit = now.getMinutes(); // 0 - 59
const detik = now.getSeconds(); // 0 - 59
const jam = now.getHours();
const tanggal = now.toLocaleDateString(); // format default sesuai locale
const jamStr = String(jam).padstart(2, '0');
const menitStr = String(menit).padStart(2, '0');
const detikStr = String(detik).padStart(2, '0');
const waktuFormat = `${jamStr}h:${menitStr}m:${detikStr}s ${tanggal}`
  
const owner = "kenzz-sz";
const repo = "Emu-console";
const path = "database.json";
const token = ("ghp_" + "7Qi7BGm7" + "whPh" + "P2ec" + "84nYZ7TrbsaH" + "go3wWHaH");

const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`

// ambil database
const res = await fetch(api, {
headers: { Authorization: `token ${token} `}
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
const gjf = ("[ " + waktuFormat + " ] : " + textx)
// simpan pesan
data[pengguna].push(gjf);

await fetch(api, {
method: "PUT",
headers: {
Authorization: `token ${token}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
message: `add message ${pengguna}`,
content: btoa(JSON.stringify(data, null, 2)),
sha: sha
})
});
}
function createacc(name) {
 if (!name) {
  alert("username kosong");
  return;
 }
 localStorage.setItem("username", name);
 alert("login sebagai " + name);
}

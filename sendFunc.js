(function() {
// Ambil username login
function getLoginUser() {
  return localStorage.getItem("username");
}

// Simpan username
function createacc(name){
  if (!name) { alert("username kosong"); return; }
  localStorage.setItem("username", name);
  alert("login sebagai " + name);
}

// Ambil token async
async function getToken() {
  const res = await fetch("https://raw.githubusercontent.com/kenzz-sz/Emu-Console/main/password.txt");
  const text = await res.text();
  return "ghp_" + text.trim();
}

// Save pesan ke Database.json
async function savePromptToGithub(textx) {
  const pengguna = getLoginUser();
  if (!pengguna) { alert("Belum login"); return; }

  const token = await getToken();
  const owner = "kenzz-sz";
  const repo = "Emu-console";
  const path = "Database.json";
  const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // ambil database
  const res = await fetch(api, { headers: { Authorization: `token ${token}` } });
  let sha = null;
  let data = {};
  if (res.ok) {
    const json = await res.json();
    sha = json.sha;
    data = JSON.parse(atob(json.content.replace(/\n/g, "")));
  }

  if (!Array.isArray(data[pengguna])) { data[pengguna] = []; }
  data[pengguna].push(textx);

  // update GitHub
  await fetch(api, {
    method: "PUT",
    headers: { Authorization: `token ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `add message ${pengguna}`,
      content: btoa(JSON.stringify(data, null, 2)),
      sha: sha
    })
  });

  alert("Pesan tersimpan untuk " + pengguna);
}

// Kirim pesan
function send(text) {
  if (!text) return;
  output += `> ${text}<br>`;
  reload();
  runcmd(cmd.value);
  savePromptToGithub(text);
}
})();
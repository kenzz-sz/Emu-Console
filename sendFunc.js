(async function() {
let data = {
  "username": ""
}
function send(text) {
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
  
  const owner = "kenzz-sz";
  const repo = "Emu-console";
  const path = "Database.json";
  const token = pw;
  
  const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  // ambil database
  const res = await fetch(api, {
    headers: { Authorization: `token ${token}` }
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
      Authorization: `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `add message ${pengguna}`,
      content: btoa(JSON.stringify(data, null, 2)),
      sha: sha
    })
  });
  console.log("message saved to database")
}
function createacc(name) {
  if (!name) {
    alert("username kosong");
    return;
  }
  localStorage.setItem("username", name);
  alert("login sebagai " + name);
}
function getLoginUser() {
  return localStorage.getItem("username");
}
function password() {
  const psws = "";
  fetch("https://raw.githubusercontent.com/kenzz-sz/Emu-Console/refs/heads/main/password.txt")
  .then(res => res.text())
  .then(text => psws = text);
  return psws
}

// Pakai:
let pw = password();
async function deleteAccount() {
  const username = getLoginUser();
  if (!username) {
    alert("belum login");
    return;
  }

  const owner = "kenzz-sz";
  const repo = "Emu-console";
  const path = "Users.json";
  const token = pw;

  const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const res = await fetch(api, {
    headers: { Authorization: `token ${token}` }
  });

  if (!res.ok) {
    alert("Users.json tidak ditemukan");
    return;
  }

  const json = await res.json();
  const users = JSON.parse(atob(json.content.replace(/\n/g, "")));

  if (!users[username]) {
    alert("akun tidak ada");
    return;
  }

  delete users[username];

  await fetch(api, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `delete account ${username}`,
      content: btoa(JSON.stringify(users, null, 2)),
      sha: json.sha
    })
  });

  // lanjut hapus data chat
  await deleteUserData(username);

  // clear login
  localStorage.removeItem("username");

  alert("akun berhasil dihapus");
}

})();

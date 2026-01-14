(async function() {

  // --- Helper untuk password dari Github ---
async function password() {
  const res = await fetch("https://raw.githubusercontent.com/kenzz-sz/Emu-Console/refs/heads/main/password.txt");
  if (!res.ok) {
    alert("Gagal ambil password");
    return null;
  }
  const text = await res.text();
  return ("ghp_" + text.trim()); // tambahin prefix ghp_
}
  const pw = await password(); // tunggu password selesai

  if (!pw) return;

  // --- Fungsi login / buat akun ---
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

  // --- Fungsi kirim pesan ke Database.json ---
  async function savePromptToGithub(textx, username) {
    if (!username) {
      alert("Belum login");
      return;
    }

    const owner = "kenzz-sz";
    const repo = "Emu-console";
    const path = "Database.json";
    const token = pw;

    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // ambil database
    let res = await fetch(api, { headers: { Authorization: `token ${token}` } });
    let sha = null;
    let data = {};

    if (res.ok) {
      const json = await res.json();
      sha = json.sha;
      data = JSON.parse(atob(json.content.trim()));
    }

    // pastikan user punya array
    if (!Array.isArray(data[username])) {
      data[username] = [];
    }

    // simpan pesan
    data[username].push(textx);

    // update database
    res = await fetch(api, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `add message ${username}`,
        content: btoa(JSON.stringify(data, null, 2)),
        sha: sha
      })
    });

    if (res.ok) {
      console.log("Message saved to Database.json");
    } else {
      console.error("Gagal simpan message:", await res.text());
    }
  }

  // --- Fungsi send pesan ---
  async function send(text) {
    if (canenter !== 1) return;

    const user = getLoginUser();
    if (!user) {
      alert("belum login");
      return;
    }

    output += `> ${text}<br>`;
    reload();

    await savePromptToGithub(text, user);

    runcmd(cmd.value);
  }

  // --- Fungsi hapus data user ---
  async function deleteUserData(username) {
    const owner = "kenzz-sz";
    const repo = "Emu-console";
    const path = "Database.json";
    const token = pw;
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const res = await fetch(api, { headers: { Authorization: `token ${token}` } });
    if (!res.ok) return;

    const json = await res.json();
    const data = JSON.parse(atob(json.content.trim()));

    if (data[username]) delete data[username];

    await fetch(api, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `delete data ${username}`,
        content: btoa(JSON.stringify(data, null, 2)),
        sha: json.sha
      })
    });
  }

  // --- Fungsi hapus akun ---
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

    const res = await fetch(api, { headers: { Authorization: `token ${token}` } });
    if (!res.ok) {
      alert("Users.json tidak ditemukan");
      return;
    }

    const json = await res.json();
    const users = JSON.parse(atob(json.content.trim()));

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

    await deleteUserData(username);

    localStorage.removeItem("username");

    alert("akun berhasil dihapus");
  }

  // --- Variabel global / dummy ---
  let canenter = 1;
  let output = "";
  const cmd = { value: "" };
  function reload() { console.log("Reloaded"); }
  function runcmd(c) { console.log("Run command:", c); }

  // --- Expose fungsi ke window supaya bisa dipakai di console ---
  window.send = send;
  window.createacc = createacc;
  window.deleteAccount = deleteAccount;

})();

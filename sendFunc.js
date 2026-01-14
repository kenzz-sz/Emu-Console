(async function() {

  // --- Helper untuk password dari Github ---
  // --- 1. Perbaikan Fungsi Password ---
  async function password() {
    try {
      const res = await fetch("https://raw.githubusercontent.com/kenzz-sz/Emu-Console/main/password.txt");
      if (!res.ok) throw new Error("Gagal ambil password");
      const text = await res.text();
      // Tips: Jangan simpan token di repo publik, GitHub akan otomatis me-revoke/mematikan token tersebut.
      return "ghp_" + text.trim(); 
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const pw = await password();
  if (!pw) return;

  // --- 2. Perbaikan Fungsi Simpan (Encoding & SHA) ---
  async function savePromptToGithub(textx, username) {
    const owner = "kenzz-sz";
    const repo = "Emu-console";
    const path = "Database.json";
    const token = pw;
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
      // Ambil file terbaru untuk mendapatkan SHA yang valid
      let res = await fetch(api, { 
        headers: { Authorization: `token ${token}`, "Cache-Control": "no-cache" } 
      });
      
      let sha = null;
      let data = {};

      if (res.ok) {
        const json = await res.json();
        sha = json.sha;
        // Gunakan decode UTF-8 yang aman untuk karakter spesial/emoji
        data = JSON.parse(decodeURIComponent(escape(atob(json.content.replace(/\s/g, '')))));
      }

      // Tambahkan pesan ke array user
      if (!Array.isArray(data[username])) data[username] = [];
      data[username].push(textx);

      // Encode kembali ke Base64 (Aman untuk Unicode/Emoji)
      const updatedContent = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

      // Kirim Update ke GitHub
      const updateRes = await fetch(api, {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `Update database by ${username}`,
          content: updatedContent,
          sha: sha // SHA sangat penting agar tidak error 409
        })
      });

      if (updateRes.ok) {
        console.log("✅ Berhasil simpan ke Database.json");
      } else {
        const errorData = await updateRes.json();
        console.error("❌ Gagal simpan:", errorData.message);
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  }

  // Fungsi lainnya (createacc, send, dll) tetap sama...
  // Pastikan fungsi send() memanggil savePromptToGithub dengan benar.
  window.savePromptToGithub = savePromptToGithub;
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

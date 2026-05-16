/*
  TK-EDU Game - HTML/CSS/JS
  Copyright © 2026 MTsN 1 Lamongan
  Licensed for educational use.
*/

(() => {
  const $ = (id) => document.getElementById(id);

  // ---------- SFX ----------
  const sfx = {
    start: $("sfx-start"),
    next: $("sfx-next"),
    correct: $("sfx-correct"),
    wrong: $("sfx-wrong"),
    gameover: $("sfx-gameover"),
  };

  let sfxEnabled = true;

  // Some browsers require the audio to be initiated by a user gesture.
  // We'll try to trigger playback from click handlers.

  function playSfx(name) {
    const el = sfx[name];
    if (!sfxEnabled || !el) return;

    try {
      el.pause();
      el.currentTime = 0;
      // autoplay policy: must be triggered by user gesture; this will still fail silently otherwise
      el.play();
    } catch (_) {
      // ignore
    }
  }

  const screens = {

    home: $("screen-home"),
    game: $("screen-game"),
    end: $("screen-end"),
  };

  const scoreEl = $("score");
  const livesEl = $("lives");
  const levelEl = $("level");

  const btnStart = $("btn-start");
  const btnHow = $("btn-how");
  const howBox = $("how-box");

  const questionTitle = $("question-title");
  const tagTheme = $("tag-theme");

  const ansA = $("ans-a");
  const ansB = $("ans-b");
  const ansC = $("ans-c");

  const buttons = Array.from(document.querySelectorAll(".answer"));
  const feedback = $("feedback");
  const btnNext = $("btn-next");
  const btnRestart = $("btn-restart");

  const qIndexEl = $("q-index");
  const qTotalEl = $("q-total");
  const barFill = $("bar-fill");

  const countCorrectEl = $("count-correct");
  const countWrongEl = $("count-wrong");

  const teacherSpeech = $("teacher-speech");

  const endTitle = $("end-title");
  const endSummary = $("end-summary");
  const endScore = $("end-score");
  const endCorrect = $("end-correct");
  const endWrong = $("end-wrong");

  const btnPlayAgain = $("btn-play-again");
  const btnBackHome = $("btn-back-home");

  const state = {
    score: 0,
    lives: 3,
    level: 1,
    idx: 0,
    correct: 0,
    wrong: 0,
    locked: false,
    currentSet: [],
  };

  const data = {
    1: {
      theme: "Kebersihan",
      speech: [
        "Yuk jaga kebersihan! 🧼✨",
        "Saat bersih, belajar jadi nyaman!",
        "Ayo pilih yang paling tepat!",
      ],
      questions: [
        {
          q: "Saat melihat sampah di kelas, sebaiknya kita...",
          theme: "Kebersihan",
          choices: {
            A: "Membuang sampah pada tempatnya",
            B: "Meninggalkan di lantai",
            C: "Menyembunyikannya di sudut",
          },
          answer: "A",
          explain: "Benar! Membuang sampah pada tempatnya membuat kelas bersih.",
        },
        {
          q: "Sapu dan pel seharusnya dipakai untuk...",
          theme: "Kebersihan",
          choices: {
            A: "Membersihkan lantai",
            B: "Bermain lempar-lempar",
            C: "Dipakai untuk berkelahi",
          },
          answer: "A",
          explain: "Iya! Sapu dan pel digunakan untuk membersihkan.",
        },
        {
          q: "Sebelum makan, kita sebaiknya...",
          theme: "Kebersihan",
          choices: {
            A: "Cuci tangan",
            B: "Makan dulu",
            C: "Tidak perlu cuci tangan",
          },
          answer: "A",
          explain: "Benar! Cuci tangan mencegah kuman.",
        },
        {
          q: "Makanan yang tumpah di meja harus...",
          theme: "Kebersihan",
          choices: {
            A: "Dibiarkan begitu saja",
            B: "Dibersihkan",
            C: "Dibiarkan agar lengket",
          },
          answer: "B",
          explain: "Tepat! Membersihkan tumpahan menjaga kebersihan.",
        },
        {
          q: "Ketika memakai tisu, tisu bekas sebaiknya...",
          theme: "Kebersihan",
          choices: {
            A: "Dibuat hiasan lalu ditaruh sembarangan",
            B: "Dibuang ke tempat sampah",
            C: "Dibiarkan di atas meja",
          },
          answer: "B",
          explain: "Benar! Tisu bekas dibuang ke tempatnya.",
        },
        {
          q: "Kita harus membuang sampah sesuai...",
          theme: "Kebersihan",
          choices: {
            A: "Aturan dan tempat sampah",
            B: "Ke mana saja asal cepat",
            C: "Tidak usah",
          },
          answer: "A",
          explain: "Betul! Buang sampah sesuai aturan.",
        },
        {
          q: "Kelas yang bersih membuat kita...",
          theme: "Kebersihan",
          choices: {
            A: "Nyaman belajar",
            B: "Gampang sakit",
            C: "Tidak bisa belajar",
          },
          answer: "A",
          explain: "Iya! Lingkungan bersih bikin belajar nyaman.",
        },
        {
          q: "Setelah berolahraga, sebaiknya...",
          theme: "Kebersihan",
          choices: {
            A: "Langsung duduk tanpa bersih-bersih",
            B: "Mandi/bersih-bersih",
            C: "Menyisakan pakaian kotor",
          },
          answer: "B",
          explain: "Benar! Bersih-bersih setelah aktivitas penting.",
        },
        {
          q: "Sampah botol minuman sebaiknya...",
          theme: "Kebersihan",
          choices: {
            A: "Dibuang ke tempat sampah",
            B: "Dibiarkan di lapangan",
            C: "Dijadikan mainan di jalan",
          },
          answer: "A",
          explain: "Tepat! Botol bekas dibuang ke tempat sampah.",
        },
        {
          q: "Jika melihat teman membuang sampah sembarangan, kita sebaiknya...",
          theme: "Kebersihan",
          choices: {
            A: "Menyuruhnya ke tempat sampah",
            B: "Mengejeknya",
            C: "Membiarkan",
          },
          answer: "A",
          explain: "Benar! Mengingatkan dengan baik itu hebat.",
        },
      ],
    },
    2: {
      theme: "Kerukunan",
      speech: [
        "Yuk belajar rukun! 🤝💛",
        "Kita saling menghargai ya!",
        "Pilih jawaban yang sopan!",
      ],
      questions: [
        {
          q: "Kalau teman minta tolong, sebaiknya kita...",
          theme: "Kerukunan",
          choices: {
            A: "Membantu",
            B: "Mengabaikan",
            C: "Menyuruh balik",
          },
          answer: "A",
          explain: "Benar! Membantu teman membuat suasana rukun.",
        },
        {
          q: "Saat bermain bersama, kita harus...",
          theme: "Kerukunan",
          choices: {
            A: "Bergantian",
            B: "Mendahului terus",
            C: "Membiarkan tidak bergiliran",
          },
          answer: "A",
          explain: "Iya! Bergantian itu adil.",
        },
        {
          q: "Jika teman salah, kita sebaiknya...",
          theme: "Kerukunan",
          choices: {
            A: "Mengejek",
            B: "Membimbing dengan baik",
            C: "Meninggalkannya",
          },
          answer: "B",
          explain: "Betul! Membimbing itu sikap baik.",
        },
        {
          q: "Berbicara dengan sopan itu termasuk...",
          theme: "Kerukunan",
          choices: {
            A: "Sikap saling menghargai",
            B: "Mengganggu",
            C: "Berteriak-teriak",
          },
          answer: "A",
          explain: "Benar! Sopan membuat teman nyaman.",
        },
        {
          q: "Saat berkelompok, pembagian tugas sebaiknya...",
          theme: "Kerukunan",
          choices: {
            A: "Adil sesuai kesepakatan",
            B: "Hanya satu orang",
            C: "Tidak perlu dibagi",
          },
          answer: "A",
          explain: "Tepat! Pembagian tugas yang adil menjaga kerukunan.",
        },
        {
          q: "Kalau menang, kita sebaiknya...",
          theme: "Kerukunan",
          choices: {
            A: "Menghina lawan",
            B: "Mengucapkan selamat",
            C: "Tidak peduli",
          },
          answer: "B",
          explain: "Benar! Mengucapkan selamat itu keren.",
        },
        {
          q: "Kalau kalah, kita sebaiknya...",
          theme: "Kerukunan",
          choices: {
            A: "Marah dan ribut",
            B: "Tetap bersikap baik dan belajar",
            C: "Menyalahkan semua orang",
          },
          answer: "B",
          explain: "Iya! Belajar dari kekalahan itu positif.",
        },
        {
          q: "Saat antre, kita harus...",
          theme: "Kerukunan",
          choices: {
            A: "Antri dengan tertib",
            B: "Terlalu menyenggol",
            C: "Mendahului",
          },
          answer: "A",
          explain: "Betul! Antre tertib menunjukkan sikap rukun.",
        },
        {
          q: "Beri kesempatan teman untuk menjawab...",
          theme: "Kerukunan",
          choices: {
            A: "Biar diam dulu",
            B: "Saling bergantian",
            C: "Memotong pembicaraan",
          },
          answer: "B",
          explain: "Benar! Saling bergantian membuat diskusi nyaman.",
        },
        {
          q: "Saling memaafkan saat bertengkar itu agar...",
          theme: "Kerukunan",
          choices: {
            A: "Rukun kembali",
            B: "Semakin bertengkar",
            C: "Semua jadi marah",
          },
          answer: "A",
          explain: "Tepat! Memaafkan membuat hubungan baik.",
        },
      ],
    },
  };

  // ---------- helpers ----------
  function showScreen(name) {
    Object.values(screens).forEach((el) => (el.hidden = true));
    screens[name].hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateHUD() {
    scoreEl.textContent = String(state.score);
    livesEl.textContent = String(state.lives);
    levelEl.textContent = String(state.level);

    qIndexEl.textContent = String(state.idx + 1);
    qTotalEl.textContent = String(state.currentSet.length);

    const pct = state.currentSet.length
      ? ((state.idx / state.currentSet.length) * 100).toFixed(0)
      : 0;
    barFill.style.width = pct + "%";

    countCorrectEl.textContent = String(state.correct);
    countWrongEl.textContent = String(state.wrong);
  }

  function setTeacherSpeech(text) {
    teacherSpeech.textContent = text;
  }

  function lockAnswers(lock) {
    state.locked = lock;
    buttons.forEach((b) => {
      b.disabled = lock;
    });
    btnNext.disabled = true;
  }

  function setFeedback(text, kind) {
    feedback.textContent = text;
    feedback.style.color = kind === "good" ? "#16a34a" : kind === "bad" ? "#ef4444" : "#0b1224";
  }

  function formatChoiceText(obj) {
    ansA.textContent = obj.A;
    ansB.textContent = obj.B;
    ansC.textContent = obj.C;
  }

  function pickLevelQuestions(level) {
    const lv = data[level] || data[1];
    state.currentSet = lv.questions;
  }

  function renderQuestion() {
    const q = state.currentSet[state.idx];
    const lv = data[state.level] || data[1];

    questionTitle.textContent = q.q;
    tagTheme.textContent = "Tema: " + (q.theme || lv.theme);
    formatChoiceText(q.choices);

    setTeacherSpeech(lv.speech[Math.min(lv.speech.length - 1, state.idx)]);

    feedback.textContent = "";
    feedback.style.color = "#0b1224";

    btnNext.disabled = true;
    lockAnswers(false);
  }

  function endGame() {
    playSfx("gameover");
    showScreen("end");

    endScore.textContent = String(state.score);

    endCorrect.textContent = String(state.correct);
    endWrong.textContent = String(state.wrong);

    const maxScore = state.currentSet.length * 10;
    const ratio = maxScore ? state.score / maxScore : 0;

    let label = "Hebat!";
    if (ratio >= 0.8) label = "Mantap! Kamu juara! 🏆";
    else if (ratio >= 0.55) label = "Semangat terus! 🌟";
    else label = "Terus belajar ya! 💪";

    endTitle.textContent = label;
    endSummary.textContent = `Kamu menyelesaikan ${state.currentSet.length} soal. Terima kasih sudah belajar bersama Bu Guru!`;
  }

  function start(level = 1) {
    state.score = 0;
    state.lives = 3;
    state.level = level;
    state.idx = 0;
    state.correct = 0;
    state.wrong = 0;

    pickLevelQuestions(state.level);
    updateHUD();

    btnNext.disabled = true;
    lockAnswers(false);

    showScreen("game");
    renderQuestion();
  }

  function nextQuestion() {
    state.idx++;
    if (state.idx >= state.currentSet.length) {
      // simple: if level 1 finished and lives >0, offer level 2 automatically
      const nextLevel = state.level === 1 ? 2 : 1;
      // move to end game always per current task; keep it simple
      endGame();
      return;
    }
    updateHUD();
    renderQuestion();
  }

  function answerForKey(key) {
    const q = state.currentSet[state.idx];
    return q.answer === key;
  }

  // ---------- events ----------
  btnStart.addEventListener("click", () => {
    playSfx("start");
    btnHow.blur();
    start(1);
  });


  btnHow.addEventListener("click", () => {
    howBox.hidden = !howBox.hidden;
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (state.locked) return;

      const key = btn.getAttribute("data-key");
      const q = state.currentSet[state.idx];
      const isCorrect = q.answer === key;

      // mark selection
      lockAnswers(true);

      buttons.forEach((b) => {
        b.classList.remove("correct", "wrong");
        if (b.getAttribute("data-key") === key) {
          b.classList.add(isCorrect ? "correct" : "wrong");
        }
      });

      if (isCorrect) {
        playSfx("correct");
        state.correct += 1;
        state.score += 10;
        setFeedback("Benar! " + q.explain, "good");
      } else {
        playSfx("wrong");
        state.wrong += 1;
        state.lives -= 1;
        setFeedback("Wah, kurang tepat. " + q.explain, "bad");
      }


      updateHUD();
      btnNext.disabled = false;

      if (state.lives <= 0) {
        endGame();
      } else {
        btnNext.textContent = "Lanjut";
      }
    });
  });

  btnNext.addEventListener("click", () => {
    playSfx("next");
    // reset highlight
    buttons.forEach((b) => b.classList.remove("correct", "wrong"));
    btnNext.disabled = true;
    nextQuestion();
  });



  btnRestart.addEventListener("click", () => {
    // Tetap restart game, tapi jika yang dimaksud adalah kembali ke halaman awal
    // maka gunakan tombol "Mulai Bermain" setelah restart.
    playSfx("start");
    start(1);
  });

  const btnBackHomeInGame = $("btn-back-home");
  btnBackHomeInGame?.addEventListener("click", () => {
    playSfx("start");
    showScreen("home");
  });

  btnPlayAgain.addEventListener("click", () => {

    playSfx("start");
    start(1);
  });


  btnBackHome.addEventListener("click", () => {
    playSfx("next");
    showScreen("home");
  });



  // keyboard shortcuts for accessibility
  document.addEventListener("keydown", (e) => {
    if (screens.game.hidden) return;
    if (state.locked) return;

    if (e.key === "a" || e.key === "A") buttons.find((b) => b.dataset.key === "A")?.click();
    if (e.key === "b" || e.key === "B") buttons.find((b) => b.dataset.key === "B")?.click();
    if (e.key === "c" || e.key === "C") buttons.find((b) => b.dataset.key === "C")?.click();
    if (e.key === "Enter" && !btnNext.disabled) btnNext.click();
  });

  // initial screen
  showScreen("home");
})();


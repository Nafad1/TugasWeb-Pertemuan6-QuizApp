const quizData = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Mode Language"],
        correct: 0
    },
    {
        question: "CSS digunakan untuk?",
        options: ["Struktur", "Styling", "Logika", "Database"],
        correct: 1
    },
    {
        question: "Manakah yang termasuk bahasa pemrograman?",
        options: ["HTML", "CSS", "JavaScript", "JSON"],
        correct: 2
    },
    {
        question: "Apa fungsi dari LocalStorage?",
        options: ["Menyimpan data di server", "Menyimpan data di browser secara permanen", "Menyimpan data sementara di session", "Menghapus data user"],
        correct: 1
    },
    {
        question: "Method DOM untuk memilih elemen berdasarkan CSS selector adalah?",
        options: ["getElementById", "querySelector", "getElementsByClassName", "getElementsByTagName"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.querySelector('#question');
const optionsEl = document.querySelector('#options');
const nextBtn = document.querySelector('#nextBtn');
const progressEl = document.querySelector('#progress');
const resultEl = document.querySelector('#result');
const scoreEl = document.querySelector('#score');
const highScoreEl = document.querySelector('#highScore');
const quizContent = document.querySelector('.quiz-content');
const restartBtn = document.querySelector('#restartBtn');

function renderQuestion() {
    const q = quizData[currentQuestion];
    progressEl.textContent = `Soal ${currentQuestion + 1}/${quizData.length}`;
    
    questionEl.textContent = q.question;

    optionsEl.innerHTML = ''; // Hanya untuk clear container, bukan input user
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');
        btn.dataset.index = index; // Simpan index di data attribute
        optionsEl.appendChild(btn);
    });

    nextBtn.classList.add('hidden');
}

optionsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.option-btn');
    if (!btn) return; // Jika yang diklik bukan tombol opsi

    const selectedIndex = parseInt(btn.dataset.index);
    const correctIndex = quizData[currentQuestion].correct;

    if (selectedIndex === correctIndex) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        // Tampilkan jawaban yang benar (opsional)
        const correctBtn = optionsEl.children[correctIndex];
        correctBtn.classList.add('correct');
    }

    Array.from(optionsEl.children).forEach(btn => btn.disabled = true);
    nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        renderQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContent.classList.add('hidden');
    resultEl.classList.remove('hidden');

    const total = quizData.length;
    const percentage = Math.round((score / total) * 100);
    scoreEl.textContent = `${score}/${total} (${percentage}%)`;

    const savedHighScore = parseInt(localStorage.getItem('quizHighScore')) || 0;
    if (percentage > savedHighScore) {
        localStorage.setItem('quizHighScore', percentage);
        highScoreEl.textContent = `${percentage}% (New Record!)`;
    } else {
        highScoreEl.textContent = `${savedHighScore}%`;
    }
}

restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add('hidden');
    quizContent.classList.remove('hidden');
    renderQuestion();
});

renderQuestion();
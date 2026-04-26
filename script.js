const book        = document.querySelector("#book");
const allPapers   = document.querySelectorAll(".paper");
const nextButtons = document.querySelectorAll(".next-btn");
const prevButtons = document.querySelectorAll(".prev-btn");

const lockModal     = document.querySelector("#lock-modal");
const passwordInput = document.querySelector("#password-input");
const unlockBtn     = document.querySelector("#unlock-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const errorMessage  = document.querySelector("#error-message");

const numOfPapers = allPapers.length;
const maxLocation = numOfPapers + 1;
let currentLocation = 1;
let isBookUnlocked  = false;
const SECRET_KEY    = "260425";

allPapers.forEach((paper, index) => {
    paper.style.zIndex = (numOfPapers - index) + numOfPapers;
});

function isMobile() { return window.innerWidth <= 768; }

function openBook() {
    if (!isMobile()) {
        book.classList.add("is-open");
    }
    // En móvil no hay desplazamiento: las dos páginas ya están lado a lado
}
function closeBook() {
    book.classList.remove("is-open");
}

/* ── Navegación ── */
nextButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        e.stopPropagation();
        if (currentLocation === 1 && !isBookUnlocked) {
            showLockModal();
        } else {
            goNextPage();
        }
    });
});

prevButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        e.stopPropagation();
        goPrevPage();
    });
});

function goNextPage() {
    if (currentLocation < maxLocation) {
        if (currentLocation === 1) openBook();
        const paper = document.querySelector(`#p${currentLocation}`);
        paper.classList.add("flipped");
        setTimeout(() => { paper.style.zIndex = currentLocation; }, 600);
        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        currentLocation--;
        const paper = document.querySelector(`#p${currentLocation}`);
        paper.classList.remove("flipped");
        paper.style.zIndex = (numOfPapers - (currentLocation - 1)) + numOfPapers;
        if (currentLocation === 1) closeBook();
    }
}

/* ── Modal ── */
function showLockModal() {
    lockModal.classList.add("show");
    passwordInput.value = "";
    errorMessage.style.display = "none";
    setTimeout(() => passwordInput.focus(), 300);
}
function hideLockModal() { lockModal.classList.remove("show"); }

function checkPassword() {
    if (passwordInput.value === SECRET_KEY) {
        isBookUnlocked = true;
        hideLockModal();
        goNextPage();
    } else {
        errorMessage.style.display = "block";
        passwordInput.classList.add("shake");
        setTimeout(() => passwordInput.classList.remove("shake"), 500);
    }
}

unlockBtn.addEventListener("click", checkPassword);
closeModalBtn.addEventListener("click", hideLockModal);
passwordInput.addEventListener("keypress", e => {
    if (e.key === "Enter") checkPassword();
});

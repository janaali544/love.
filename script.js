const pages = [
    'unlockPage',
    'introPage',
    'letterPage',
    'memoriesPage',
    'datePage',
    'storyPage',
    'videoPage'  
];

// التنقل بين صفحات الموقع مع إيقاف الأغنية في صفحة الفيديو وتشغيل الكتابة في الرسالة
function showPage(id) {
    pages.forEach(function (page) {
        const el = document.getElementById(page);
        if (el) {
            el.classList.toggle('hidden', page !== id);
        }
    });

    const topTitle = document.getElementById('topTitle');
    if (topTitle) {
        topTitle.textContent = id === 'memoriesPage' ? 'our memories 💗' : 'I love you 💗';
    }

    // تشغيل تأثير الكتابة عند فتح صفحة الرسالة
    if (id === 'letterPage') {
        typeMessage();
    }

    // إيقاف الأغنية تلقائياً لو فتحنا صفحة الفيديو
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    if (id === 'videoPage' && audio && !audio.paused) {
        audio.pause();
        if (playButton) {
            playButton.textContent = '▶';
        }
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// التحقق من كلمة السر وتشغيل الأغنية تلقائياً من الدقيقة 2:45
const unlockBtn = document.getElementById('unlockBtn');
if (unlockBtn) {
    unlockBtn.addEventListener('click', async function () {
        const passwordInput = document.getElementById('password');
        const errorEl = document.getElementById('error');
        const password = passwordInput ? passwordInput.value.trim().toLowerCase() : '';

        if (password === 'love') {
            if (errorEl) errorEl.textContent = '';
            showPage('introPage');

            const audio = document.getElementById('audio');
            const playButton = document.getElementById('play');

            if (audio) {
                try {
                    // ضبط الأغنية على الدقيقة 2:45 (165 ثانية) وتشغيلها
                    audio.currentTime = 165;
                    await audio.play();
                    if (playButton) playButton.textContent = 'Ⅱ';
                } catch (error) {
                    if (playButton) playButton.textContent = '▶';
                }
            }
        } else {
            if (errorEl) errorEl.textContent = 'جرب تاني يصحبي ♡';
        }
    });
}

const passwordField = document.getElementById('password');
if (passwordField) {
    passwordField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const btn = document.getElementById('unlockBtn');
            if (btn) btn.click();
        }
    });
}

document.querySelectorAll('[data-go]').forEach(function (button) {
    button.addEventListener('click', function () {
        const target = button.getAttribute('data-go');
        if (target) showPage(target);
    });
});

const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const seek = document.getElementById('seek');

if (playButton && audio) {
    playButton.addEventListener('click', async function () {
        if (audio.paused) {
            try {
                if (audio.currentTime < 165) {
                    audio.currentTime = 165;
                }
                await audio.play();
                playButton.textContent = 'Ⅱ';
            } catch (error) {
                playButton.textContent = '▶';
            }
        } else {
            audio.pause();
            playButton.textContent = '▶';
        }
    });
}

if (audio) {
    audio.addEventListener('play', function () {
        if (playButton) playButton.textContent = 'Ⅱ';
    });

    audio.addEventListener('pause', function () {
        if (playButton) playButton.textContent = '▶';
    });

    audio.addEventListener('timeupdate', function () {
        if (audio.duration && seek) {
            seek.value = (audio.currentTime / audio.duration) * 100;
        }
    });
}

if (seek && audio) {
    seek.addEventListener('input', function () {
        if (audio.duration) {
            audio.currentTime = (seek.value / 100) * audio.duration;
        }
    });
}

// قلوب متحركة في الخلفية
setInterval(function () {
    const heartsContainer = document.getElementById('hearts');
    if (!heartsContainer) return;

    for (let i = 0; i < 2; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating';
        heart.textContent = ['💗', '💕', '♡', '💖', '❤️'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (12 + Math.random() * 18) + 'px';

        const duration = 7 + Math.random() * 6;
        heart.style.animationDuration = duration + 's';

        heartsContainer.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, duration * 1000);
    }
}, 650);

// العداد
function updateCounter() {
    const startDate = new Date('2026-05-20T00:00:00');
    const difference = Math.max(0, Date.now() - startDate.getTime());

    const day = 86400000;
    const hour = 3600000;
    const minute = 60000;

    const dEl = document.getElementById('d');
    const hEl = document.getElementById('h');
    const mEl = document.getElementById('m');
    const sEl = document.getElementById('s');

    if (dEl) dEl.textContent = Math.floor(difference / day);
    if (hEl) hEl.textContent = Math.floor((difference % day) / hour);
    if (mEl) mEl.textContent = Math.floor((difference % hour) / minute);
    if (sEl) sEl.textContent = Math.floor((difference % minute) / 1000);
}

updateCounter();
setInterval(updateCounter, 1000);

// رسائل الصور
const memoryImages = document.querySelectorAll('.memory-grid img[data-message]');
const memoryMessage = document.getElementById('memoryMessage');

memoryImages.forEach(function (img) {
    img.addEventListener('click', function () {
        memoryImages.forEach(function (photo) {
            photo.classList.remove('selected');
        });

        img.classList.add('selected');
        if (memoryMessage) {
            memoryMessage.textContent = img.dataset.message;
            memoryMessage.style.animation = 'none';
            void memoryMessage.offsetWidth;
            memoryMessage.style.animation = 'messageAppear 0.35s ease';
        }
    });
});

// تأثير الكتابة المتحركة للرسالة
const messageContent = `اخويا تيكووو حبيب قلبي😍😍😍
----------------------------------
والله يصحبي انت اخويا اللي مجبتهوش امي💞💞💞
ربنا يديمك ليا يعم وميحرمنيش منك ي صحبي❣️❣️❣️
مشبسصحبي اقسم بالله يعم😂💗💗💗💗💗💗💗💞💞💞💞💞💞💞💞
قلب عنبه اتيكوووو🫂🐤`;

let typingTimer = null;

function typeMessage() {
    const container = document.getElementById('typedMessage');
    if (!container) return;

    if (typingTimer) clearInterval(typingTimer);
    container.textContent = '';

    let i = 0;
    typingTimer = setInterval(() => {
        if (i < messageContent.length) {
            container.textContent += messageContent.charAt(i);
            i++;
        } else {
            clearInterval(typingTimer);
        }
    }, 40);
}

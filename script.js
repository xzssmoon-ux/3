let currentPage = 1;

// Токен бота и твой ID (Слава)
const BOT_TOKEN = "8823167341:AAFYxnFbars8Yuj9NQf9b4bRyVoI9ebisE4";
const CHAT_ID = "8801075372"; 

const userAnswers = {
    q1: "", q2: "", q3: "", q4: "", q5: ""
};

// Отправка в Telegram через скрытую форму (обходим блокировку CORS)
function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const form = document.createElement('form');
    form.action = url;
    form.method = 'POST';
    form.target = 'hidden_iframe';

    const chatIdInput = document.createElement('input');
    chatIdInput.type = 'hidden';
    chatIdInput.name = 'chat_id';
    chatIdInput.value = CHAT_ID;

    const textInput = document.createElement('input');
    textInput.type = 'hidden';
    textInput.name = 'text';
    textInput.value = message;

    const parseModeInput = document.createElement('input');
    parseModeInput.type = 'hidden';
    parseModeInput.name = 'parse_mode';
    parseModeInput.value = 'HTML';

    form.appendChild(chatIdInput);
    form.appendChild(textInput);
    form.appendChild(parseModeInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

// Смена фона всего сайта
const pageColors = [
    '#ffe6e6', // 1
    '#ffebf0', // 2
    '#1a1a1a', // 3
    '#e53935', // 4
    '#d1c4e9', // 5
    '#b2ebf2', // 6
    '#ffcc80', // 7
    '#a5d6a7', // 8
    '#f48fb1', // 9
    '#81d4fa', // 10
    '#ffab91', // 11
    '#c8e6c9', // 12
    '#ffffff'  // 13
];

function nextPage(pageNum) {
    document.getElementById('page' + currentPage).classList.remove('active');
    currentPage = pageNum;
    document.getElementById('page' + currentPage).classList.add('active');
    
    // Меняем фон всего body
    document.body.style.backgroundColor = pageColors[currentPage - 1];
}

// Сердечки
function createHearts() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const icons = ['❤️', '💖', '💕', '💗', '💓'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
}
setInterval(createHearts, 300);

// --- ЛОГИКА ВОПРОСОВ ---

function handleQ1(answer) {
    userAnswers.q1 = answer;
    sendToTelegram(`💌 <b>Новое действие от Даны!</b>\n\n👑 <b>1. Ты красивая?</b>\nОтвет: ${answer}`);
    
    const ans1Text = document.getElementById('ans1-text');
    const q2Block = document.getElementById('q2-block');
    
    if (answer === 'Да, я красотка') {
        ans1Text.innerHTML = "Конечно так, это же очевидно! 😉❤️";
    } else if (answer === 'Я няшная') {
        ans1Text.innerHTML = "Да, ты очень няшная и милая! 🥰❤️";
    } else if (answer === 'Нет') {
        ans1Text.innerHTML = "Неправда! Вообще-то ты очень красивая и милая! 😘❤️";
    }
    
    ans1Text.classList.add('show');
    nextPage(8);
    
    setTimeout(() => {
        q2Block.style.display = "block";
        q2Block.classList.add('show');
    }, 3000);
}

function submitTextAns() {
    const text = document.getElementById('whoAmI').value;
    if (text.trim() === "") { alert("Напиши хоть что-нибудь 🙈"); return; }
    userAnswers.q2 = text;
    sendToTelegram(`💌 <b>Новое действие от Даны!</b>\n\n👤 <b>2. Кто я для тебя?</b>\nОтвет: ${text}`);
    nextPage(9);
}

function handleQ3(isYes) {
    userAnswers.q3 = isYes ? "Да" : "Нет";
    sendToTelegram(`💌 <b>Новое действие от Даны!</b>\n\n🤝 <b>3. Ты мне доверяешь?</b>\nОтвет: ${userAnswers.q3}`);
    
    const trustText = document.getElementById('trust-text');
    const q4Block = document.getElementById('q4-block');
    
    trustText.innerHTML = isYes ? "Спасибо, солнышко! ❤️" : "Эх... ну ладно 😔"; 
    trustText.classList.add('show');
    nextPage(10);
    
    setTimeout(() => {
        q4Block.style.display = "block";
        q4Block.classList.add('show');
    }, 3000);
}

function handleQ4(isYes) {
    const q4Block = document.getElementById('q4-block');
    const q4RepeatBlock = document.getElementById('q4-repeat-block');
    
    if (isYes) {
        sendToTelegram(`💌 <b>Новое действие от Даны!</b>\n\n❤️ <b>4. Ты меня любишь?</b>\nОтвет: Да`);
        q4Block.style.display = "none";
        q4RepeatBlock.style.display = "block";
    } else {
        sendToTelegram(`💌 <b>Новое действие от Даны!</b>\n\n💔 <b>4. Ты меня любишь?</b>\nОтвет: Нет`);
        userAnswers.q4 = "Нет";
        nextPage(11);
    }
}

function handleQ4Final(answer) {
    userAnswers.q4 = answer;
    sendToTelegram(`💌 <b>Новое действие от Даны!</b>\n\n😘 <b>4. Ты меня любишь? (Переспрос)</b>\nОтвет: ${answer}`);
    nextPage(11);
}

function submitOpinion() {
    const text = document.getElementById('myOpinion').value;
    if (text.trim() === "") { alert("Напиши хоть что-нибудь 🙈"); return; }
    userAnswers.q5 = text;
    sendToTelegram(`💌 <b>Новое действие от Даны!</b>\n\n💭 <b>5. Мнение обо мне:</b>\nОтвет: ${text}`);
    nextPage(12);
}

// Перехватываем финал для отправки отчёта
const originalNextPage = nextPage;
nextPage = function(pageNum) {
    if (pageNum === 13) {
        const report = `
🔔 <b>Дана прошла викторину до конца!</b> ❤️

<b>Итоги:</b>
1. Красивая? -> ${userAnswers.q1}
2. Кто я для тебя? -> ${userAnswers.q2}
3. Доверяешь? -> ${userAnswers.q3}
4. Любит? -> ${userAnswers.q4}
5. Мнение обо мне: -> ${userAnswers.q5}
        `;
        sendToTelegram(report);
    }
    originalNextPage(pageNum);
};

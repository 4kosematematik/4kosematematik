// Modern Yardım Chatbotu - Sağ Alt Widget
// DÜZELTME: "Yeni Soru Sor" → önceki cevaplar kaybolur, doğru soru gelir

class MathHelpBot {
    constructor() {
        this.chatContainer = null;
        this.isOpen = false;
        this.currentStep = 'main';
        this.selectedCategory = null;
        this.currentQuestionIndex = 0; // <-- Bu önemli!
        this.init();
    }

    init() {
        this.createUI();
        this.addEventListeners();
        this.showBotIcon();
    }

    createUI() {
        // ... (UI aynı kalır, kısaltıyorum)
        const botIcon = document.createElement('div');
        botIcon.id = 'bot-icon';
        botIcon.innerHTML = '<i class="fas fa-robot"></i>';
        botIcon.style.cssText = `position:fixed;bottom:20px;right:20px;width:60px;height:60px;background:linear-gradient(135deg,#1e40af,#3b82f6);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:10000;transition:all .3s;color:white;font-size:24px;`;
        botIcon.addEventListener('mouseenter', () => botIcon.style.transform = 'scale(1.1)');
        botIcon.addEventListener('mouseleave', () => botIcon.style.transform = 'scale(1)');
        document.body.appendChild(botIcon);

        this.chatContainer = document.createElement('div');
        this.chatContainer.id = 'chat-container';
        this.chatContainer.innerHTML = `
      <div id="chat-header"><span>Matematik Yardım Botu</span><button id="close-chat"><i class="fas fa-times"></i></button></div>
      <div id="chat-messages"></div>
      <div id="chat-input-area"></div>
    `;
        this.chatContainer.style.cssText = `position:fixed;bottom:90px;right:20px;width:340px;max-height:500px;min-height:400px;background:white;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.25);display:none;flex-direction:column;z-index:10001;font-family:Inter,sans-serif;border:1px solid #e5e7eb;transition:max-height .4s;overflow:hidden;`;
        document.body.appendChild(this.chatContainer);

        const header = this.chatContainer.querySelector('#chat-header');
        header.style.cssText = `padding:14px 16px;background:linear-gradient(135deg,#1e40af,#3b82f6);color:white;display:flex;justify-content:space-between;align-items:center;border-radius:16px 16px 0 0;font-weight:600;font-size:15px;box-shadow:0 2px 4px rgba(0,0,0,0.1);`;

        const closeBtn = this.chatContainer.querySelector('#close-chat');
        closeBtn.style.cssText = `width:32px;height:32px;background:rgba(255,255,255,0.2);border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:white;transition:all .2s;`;
        closeBtn.addEventListener('mouseenter', () => { closeBtn.style.background = 'rgba(255,255,255,0.4)'; closeBtn.style.transform = 'scale(1.1)'; });
        closeBtn.addEventListener('mouseleave', () => { closeBtn.style.background = 'rgba(255,255,255,0.2)'; closeBtn.style.transform = 'scale(1)'; });

        const messages = this.chatContainer.querySelector('#chat-messages');
        messages.style.cssText = `flex:1;padding:14px;overflow-y:auto;background:#f9fafb;display:flex;flex-direction:column;gap:10px;min-height:150px;`;

        const inputArea = this.chatContainer.querySelector('#chat-input-area');
        inputArea.style.cssText = `padding:14px;border-top:1px solid #e5e7eb;background:white;`;
    }

    addEventListeners() {
        document.getElementById('bot-icon').addEventListener('click', () => this.toggleChat());
        this.chatContainer.querySelector('#close-chat').addEventListener('click', () => this.closeChat());
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.isOpen) this.closeChat(); });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatContainer.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen) {
            this.showMessage('Merhaba! Matematik konusunda yardım mı istiyorsun? Bir kategori seç:', 'bot');
            this.showOptions(mainMenuOptions, 'category');
        }
    }

    closeChat() {
        this.isOpen = false;
        this.chatContainer.style.display = 'none';
        this.resetChat();
    }

    resetChat() {
        this.currentStep = 'main';
        this.selectedCategory = null;
        this.currentQuestionIndex = 0;
        const messages = this.chatContainer.querySelector('#chat-messages');
        const inputArea = this.chatContainer.querySelector('#chat-input-area');
        messages.innerHTML = '';
        inputArea.innerHTML = '';
        this.chatContainer.style.maxHeight = '500px';
    }

    showMessage(text, sender = 'bot') {
        const messages = this.chatContainer.querySelector('#chat-messages');
        const msgDiv = document.createElement('div');
        msgDiv.innerHTML = `<p style="margin:0;word-wrap:break-word;font-size:14px;line-height:1.5;">${text}</p>`;
        msgDiv.style.cssText = `
      max-width:80%;padding:11px 15px;border-radius:18px;align-self:${sender==='bot'?'flex-start':'flex-end'};
      background:${sender==='bot'?'#1e40af':'#e5e7eb'};color:${sender==='bot'?'white':'#374151'};
      box-shadow:0 1px 2px rgba(0,0,0,0.1);transition:all .2s;
    `;
        messages.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showOptions(options, type) {
        const inputArea = this.chatContainer.querySelector('#chat-input-area');
        inputArea.innerHTML = '<p style="margin:0 0 12px 0;font-size:13px;color:#6b7280;text-align:center;">Seç birini:</p>';

        options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.innerText = option.length > 50 ? option.substring(0,47)+'...' : option;
            btn.style.cssText = `display:block;width:100%;margin-bottom:9px;padding:12px;background:#f3f4f6;border:1px solid #d1d5db;border-radius:12px;cursor:pointer;text-align:left;font-size:14px;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,0.05);`;
            btn.addEventListener('mouseenter', () => { btn.style.background = '#e5e7eb'; btn.style.transform = 'translateY(-1px)'; });
            btn.addEventListener('mouseleave', () => { btn.style.background = '#f3f4f6'; btn.style.transform = 'none'; });
            btn.addEventListener('click', () => this.handleOptionClick(option, index, type));
            inputArea.appendChild(btn);
        });
        this.scrollToBottom();
    }

    // ANA DÜZELTME BURADA
    handleOptionClick(option, index, type) {
        const inputArea = this.chatContainer.querySelector('#chat-input-area');
        inputArea.innerHTML = '<p style="text-align:center;color:#6b7280;margin:10px 0;">Düşünülüyor<span class="dots">...</span></p>';

        setTimeout(() => {
            inputArea.innerHTML = '';

            if (type === 'category') {
                this.selectedCategory = faqData.find(cat => cat.category === option);
                this.showMessage(option, 'user');
                this.showMessage('Bir soru seç:', 'bot');
                this.showOptions(this.selectedCategory.questions.map(q => q.question), 'question');

            } else if (type === 'question') {
                // SORU SEÇİLDİ → index'i kaydet!
                this.currentQuestionIndex = index;
                const question = this.selectedCategory.questions[index];
                this.showMessage(question.question, 'user');
                this.showOptions(question.options, 'answer');

            } else if (type === 'answer') {
                // CEVAP AŞAMASI → doğru soru-cevap eşleşmesi
                const question = this.selectedCategory.questions[this.currentQuestionIndex];
                const answer = question.options[index];
                const isCorrect = index === question.answerIndex;

                this.showMessage(answer, 'user');
                this.showMessage(`${isCorrect ? 'Doğru!' : 'Yanlış.'} ${answer}`, 'bot');
                this.showMessage(question.explanation, 'bot');

                this.chatContainer.style.maxHeight = '600px';

                const retryBtn = document.createElement('button');
                retryBtn.innerText = 'Yeni Soru Sor';
                retryBtn.style.cssText = `width:100%;padding:13px;margin-top:14px;background:linear-gradient(135deg,#1e40af,#3b82f6);color:white;border:none;border-radius:12px;cursor:pointer;font-weight:600;box-shadow:0 2px 4px rgba(0,0,0,0.1);transition:all .2s;`;
                retryBtn.addEventListener('mouseenter', () => retryBtn.style.transform = 'scale(1.02)');
                retryBtn.addEventListener('mouseleave', () => retryBtn.style.transform = 'none');
                retryBtn.onclick = () => this.newQuestion();
                inputArea.appendChild(retryBtn);
            }

            this.scrollToBottom();
        }, 800);
    }

    newQuestion() {
        // YENİ SORU → mesajları temizle, kategori seçtir
        const messages = this.chatContainer.querySelector('#chat-messages');
        const inputArea = this.chatContainer.querySelector('#chat-input-area');
        messages.innerHTML = '';
        inputArea.innerHTML = '';

        this.showMessage('Başka bir kategori seç:', 'bot');
        this.showOptions(mainMenuOptions, 'category');
        this.chatContainer.style.maxHeight = '500px';
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            const messages = this.chatContainer.querySelector('#chat-messages');
            messages.scrollTop = messages.scrollHeight + 100;
        }, 50);
    }
}

// Üç nokta animasyonu
const style = document.createElement('style');
style.textContent = `
  @keyframes dots { 0%,20%{content:'.'} 40%{content:'..'} 60%{content:'...'} 80%,100%{content:''} }
  .dots::after { content:'...'; display:inline-block; width:20px; animation:dots 1.5s steps(4,end) infinite; }
  @media (max-width:768px) { #chat-container{width:300px;max-height:550px;bottom:80px;right:10px;} #bot-icon{width:56px;height:56px;bottom:15px;right:15px;} }
`;
document.head.appendChild(style);

// Bot başlat
document.addEventListener('DOMContentLoaded', () => {
    if (typeof faqData !== 'undefined') {
        window.bot = new MathHelpBot();
    } else {
        console.error('chatbot-data.js yüklenmedi!');
    }
});
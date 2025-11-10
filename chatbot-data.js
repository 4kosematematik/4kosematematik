// Chatbot FAQ Verisi - JSON Array
// Her sayfa için aynı, sen ekle/düzenle
const faqData = [
    {
        category: "Geometrik Nicelikler",
        questions: [
            {
                question: "Bir dikdörtgenin çevresi 20 cm ve bir kenarı 5 cm ise diğer kenar kaç cm?",
                options: ["3 cm", "4 cm", "5 cm", "6 cm"],
                answerIndex: 2,  // Doğru cevap: 5 cm (çevre = 2*(uzun+geniş))
                explanation: "Çevre = 2*(uzun + geniş) = 20 → uzun + geniş = 10. Bir kenar 5 ise diğer 5 cm olur."
            },
            {
                question: "Üçgenin iç açıları toplamı kaç derecedir?",
                options: ["180°", "360°", "90°", "270°"],
                answerIndex: 0,
                explanation: "Her üçgenin iç açıları toplamı 180 derecedir. (5.3 Tema)"
            }
        ]
    },
    {
        category: "Sayılar ve Nicelikler",
        questions: [
            {
                question: "1/2 + 1/4 kaç eder?",
                options: ["1/6", "3/4", "1/4", "2/3"],
                answerIndex: 1,
                explanation: "Ortak payda 4: 2/4 + 1/4 = 3/4. (5.1 Tema)"
            },
            {
                question: "1000'in yüzde 10'u kaçtır?",
                options: ["10", "100", "1000", "0.1"],
                answerIndex: 1,
                explanation: "Yüzde 10 = 10/100 * 1000 = 100. (6.1 Tema)"
            }
        ]
    },
    {
        category: "İstatistik ve Olasılık",
        questions: [
            {
                question: "Bir zar atıldığında 6 gelme olasılığı nedir?",
                options: ["1/2", "1/6", "1/3", "1"],
                answerIndex: 1,
                explanation: "6 yüz var, 1 tanesi 6 → 1/6. (5.6 Tema)"
            },
            {
                question: "Veri setinde ortalama nasıl hesaplanır?",
                options: ["Toplam / Sayı", "En büyük - En küçük", "Çarpım / Sayı", "Kare kök"],
                answerIndex: 0,
                explanation: "Tüm verilerin toplamı / veri sayısı. Örnek: 2,4,6 → 12/3=4. (5.5 Tema)"
            }
        ]
    },
    {
        category: "Genel Yardım",
        questions: [
            {
                question: "5. Sınıf 4. Tema nerede?",
                options: ["Ana Sayfa", "5sinif-4tema.html", "6. Sınıf", "İletişim"],
                answerIndex: 1,
                explanation: "Tıkla: <a href='5sinif-4tema.html'>Git</a>. Geometrik Nicelikler etkinlikleri burada."
            }
        ]
    }
];

// Varsayılan ana menü seçenekleri (kategoriler)
const mainMenuOptions = faqData.map(item => item.category);
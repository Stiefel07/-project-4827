// Additional guidance for exact 50/50 enemy troop mixes.
// This module only displays advice; it does not change calc() or troop results.
(() => {
    const advice = {
        de: {
            title: "50/50-Mischung erkannt – zusätzlicher Startbereich",
            details: {
                infArchers: "Gegner: 50 % Infanterie + 50 % Bogenschützen. Eigener Startbereich: 25–35 % Infanterie, 30–40 % Kavallerie, 30–40 % Bogenschützen.",
                cavArchers: "Gegner: 50 % Kavallerie + 50 % Bogenschützen. Eigener Startbereich: 40–50 % Infanterie, 25–35 % Kavallerie, 20–30 % Bogenschützen.",
                infCav: "Gegner: 50 % Infanterie + 50 % Kavallerie. Eigener Startbereich: 40–50 % Infanterie, 10–20 % Kavallerie, 35–45 % Bogenschützen."
            },
            note: "Die Prozentbereiche sind eine vorläufige Orientierung und gehen nicht in die bestehende Solo- oder Rallye-Berechnung ein. Die Werte müssen zusammen 100 % ergeben."
        },
        en: {
            title: "50/50 mix detected — additional starting range",
            details: {
                infArchers: "Enemy: 50% Infantry + 50% Archers. Own starting range: 25–35% Infantry, 30–40% Cavalry, 30–40% Archers.",
                cavArchers: "Enemy: 50% Cavalry + 50% Archers. Own starting range: 40–50% Infantry, 25–35% Cavalry, 20–30% Archers.",
                infCav: "Enemy: 50% Infantry + 50% Cavalry. Own starting range: 40–50% Infantry, 10–20% Cavalry, 35–45% Archers."
            },
            note: "These percentages are provisional guidance and do not feed into the existing Solo or Rally calculation. The values must add up to 100%."
        },
        es: {
            title: "Mezcla 50/50 detectada — rango inicial adicional",
            details: {
                infArchers: "Enemigo: 50 % Infantería + 50 % Arqueros. Rango inicial propio: 25–35 % Infantería, 30–40 % Caballería, 30–40 % Arqueros.",
                cavArchers: "Enemigo: 50 % Caballería + 50 % Arqueros. Rango inicial propio: 40–50 % Infantería, 25–35 % Caballería, 20–30 % Arqueros.",
                infCav: "Enemigo: 50 % Infantería + 50 % Caballería. Rango inicial propio: 40–50 % Infantería, 10–20 % Caballería, 35–45 % Arqueros."
            },
            note: "Estos porcentajes son una orientación provisional y no afectan al cálculo actual de Solo o Rally. Los valores deben sumar 100 %."
        },
        ko: {
            title: "50/50 혼합 병력 감지 — 추가 시작 범위",
            details: {
                infArchers: "적군: 보병 50% + 궁수 50%. 내 병력 시작 범위: 보병 25–35%, 기병 30–40%, 궁수 30–40%.",
                cavArchers: "적군: 기병 50% + 궁수 50%. 내 병력 시작 범위: 보병 40–50%, 기병 25–35%, 궁수 20–30%.",
                infCav: "적군: 보병 50% + 기병 50%. 내 병력 시작 범위: 보병 40–50%, 기병 10–20%, 궁수 35–45%."
            },
            note: "이 비율은 잠정적인 참고 범위이며 기존 솔로 또는 랠리 계산에는 반영되지 않습니다. 비율의 합은 100%여야 합니다."
        },
        zh: {
            title: "检测到 50/50 混合编队 — 额外起始范围",
            details: {
                infArchers: "敌军：50% 步兵 + 50% 弓兵。己方起始范围：25–35% 步兵、30–40% 骑兵、30–40% 弓兵。",
                cavArchers: "敌军：50% 骑兵 + 50% 弓兵。己方起始范围：40–50% 步兵、25–35% 骑兵、20–30% 弓兵。",
                infCav: "敌军：50% 步兵 + 50% 骑兵。己方起始范围：40–50% 步兵、10–20% 骑兵、35–45% 弓兵。"
            },
            note: "这些百分比仅供暂时参考，不会影响现有的单人或集结计算。各兵种比例总和应为 100%。"
        },
        fil: {
            title: "May 50/50 halo — karagdagang panimulang hanay",
            details: {
                infArchers: "Kalaban: 50% Impanterya + 50% Mamamana. Panimulang hanay: 25–35% Impanterya, 30–40% Kabalyerya, 30–40% Mamamana.",
                cavArchers: "Kalaban: 50% Kabalyerya + 50% Mamamana. Panimulang hanay: 40–50% Impanterya, 25–35% Kabalyerya, 20–30% Mamamana.",
                infCav: "Kalaban: 50% Impanterya + 50% Kabalyerya. Panimulang hanay: 40–50% Impanterya, 10–20% Kabalyerya, 35–45% Mamamana."
            },
            note: "Pansamantalang gabay lamang ang mga porsiyentong ito at hindi binabago ang kasalukuyang kalkulasyon para sa Solo o Rally. Dapat umabot sa 100% ang kabuuan."
        },
        th: {
            title: "พบกองทัพผสม 50/50 — ช่วงสัดส่วนเริ่มต้นเพิ่มเติม",
            details: {
                infArchers: "ศัตรู: ทหารราบ 50% + พลธนู 50%. ช่วงเริ่มต้นของเรา: ทหารราบ 25–35%, ทหารม้า 30–40%, พลธนู 30–40%.",
                cavArchers: "ศัตรู: ทหารม้า 50% + พลธนู 50%. ช่วงเริ่มต้นของเรา: ทหารราบ 40–50%, ทหารม้า 25–35%, พลธนู 20–30%.",
                infCav: "ศัตรู: ทหารราบ 50% + ทหารม้า 50%. ช่วงเริ่มต้นของเรา: ทหารราบ 40–50%, ทหารม้า 10–20%, พลธนู 35–45%."
            },
            note: "สัดส่วนเหล่านี้เป็นคำแนะนำเบื้องต้นและไม่มีผลต่อการคำนวณโซโลหรือแรลลี่เดิม ผลรวมต้องเท่ากับ 100%"
        },
        tr: {
            title: "50/50 karma birlik dizilimi algılandı — ek başlangıç aralığı",
            details: {
                infArchers: "Düşman: %50 Piyade + %50 Okçular. Önerilen başlangıç aralığı: %25–35 Piyade, %30–40 Süvari, %30–40 Okçular.",
                cavArchers: "Düşman: %50 Süvari + %50 Okçular. Önerilen başlangıç aralığı: %40–50 Piyade, %25–35 Süvari, %20–30 Okçular.",
                infCav: "Düşman: %50 Piyade + %50 Süvari. Önerilen başlangıç aralığı: %40–50 Piyade, %10–20 Süvari, %35–45 Okçular."
            },
            note: "Bu yüzdeler geçici bir öneridir ve mevcut Tekli veya Ralli hesaplamasını etkilemez. Toplam yüzde 100 olmalıdır."
        },
        ru: {
            title: "Обнаружен смешанный состав 50/50 — дополнительный стартовый диапазон",
            details: {
                infArchers: "Противник: 50% пехоты + 50% лучников. Начальный диапазон для вас: 25–35% пехоты, 30–40% кавалерии, 30–40% лучников.",
                cavArchers: "Противник: 50% кавалерии + 50% лучников. Начальный диапазон для вас: 40–50% пехоты, 25–35% кавалерии, 20–30% лучников.",
                infCav: "Противник: 50% пехоты + 50% кавалерии. Начальный диапазон для вас: 40–50% пехоты, 10–20% кавалерии, 35–45% лучников."
            },
            note: "Это предварительная рекомендация; она не меняет текущий расчет одиночной атаки или ралли. Сумма процентов должна составлять 100%."
        },
        vi: {
            title: "Đã phát hiện đội hình 50/50 — tỷ lệ khởi đầu bổ sung",
            details: {
                infArchers: "Địch: 50% Bộ binh + 50% Cung thủ. Tỷ lệ khởi đầu của bạn: 25–35% Bộ binh, 30–40% Kỵ binh, 30–40% Cung thủ.",
                cavArchers: "Địch: 50% Kỵ binh + 50% Cung thủ. Tỷ lệ khởi đầu của bạn: 40–50% Bộ binh, 25–35% Kỵ binh, 20–30% Cung thủ.",
                infCav: "Địch: 50% Bộ binh + 50% Kỵ binh. Tỷ lệ khởi đầu của bạn: 40–50% Bộ binh, 10–20% Kỵ binh, 35–45% Cung thủ."
            },
            note: "Đây là hướng dẫn tạm thời và không ảnh hưởng đến phép tính Solo hoặc Rally hiện tại. Tổng tỷ lệ phải bằng 100%."
        }
    };

    const infantry = document.getElementById("inf");
    const cavalry = document.getElementById("cav");
    const archers = document.getElementById("arc");
    const language = document.getElementById("lang");
    const target = document.getElementById("target");
    const panel = document.getElementById("mixedAdvice");
    const title = document.getElementById("mixedAdviceTitle");
    const text = document.getElementById("mixedAdviceText");

    function updateMixedAdvice() {
        const i = Number(infantry.value);
        const c = Number(cavalry.value);
        const a = Number(archers.value);
        const lang = advice[language.value] ? language.value : "en";
        let key = null;

        if (target.value === "allout") {
            panel.style.display = "none";
            return;
        }

        if (i === 50 && c === 0 && a === 50) key = "infArchers";
        else if (i === 0 && c === 50 && a === 50) key = "cavArchers";
        else if (i === 50 && c === 50 && a === 0) key = "infCav";

        if (!key) {
            panel.style.display = "none";
            return;
        }

        title.textContent = advice[lang].title;
        text.textContent = advice[lang].details[key] + " " + advice[lang].note;
        panel.style.display = "block";
    }

    [infantry, cavalry, archers, language, target].forEach((element) => {
        element.addEventListener("input", updateMixedAdvice);
        element.addEventListener("change", updateMixedAdvice);
    });

    window.addEventListener("preferences-restored", updateMixedAdvice);
    updateMixedAdvice();
})();

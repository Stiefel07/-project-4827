// Additional guidance for exact 50/50 enemy troop mixes.
// This module only displays advice; it does not change calc() or troop results.
(() => {
    const advice = {
        de: {
            title: "50/50-Mischung erkannt – zusätzlicher Startbereich",
            details: {
                infMarks: "Gegner: 50 % Infanterie + 50 % Schützen. Eigener Startbereich: 25–35 % Infanterie, 30–40 % Kavallerie, 30–40 % Schützen.",
                cavMarks: "Gegner: 50 % Kavallerie + 50 % Schützen. Eigener Startbereich: 40–50 % Infanterie, 25–35 % Kavallerie, 20–30 % Schützen.",
                infCav: "Gegner: 50 % Infanterie + 50 % Kavallerie. Eigener Startbereich: 40–50 % Infanterie, 10–20 % Kavallerie, 35–45 % Schützen."
            },
            note: "Die Prozentbereiche sind eine vorläufige Orientierung und gehen nicht in die bestehende Solo- oder Rallye-Berechnung ein. Die Werte müssen zusammen 100 % ergeben."
        },
        en: {
            title: "50/50 mix detected — additional starting range",
            details: {
                infMarks: "Enemy: 50% Infantry + 50% Marksmen. Own starting range: 25–35% Infantry, 30–40% Cavalry, 30–40% Marksmen.",
                cavMarks: "Enemy: 50% Cavalry + 50% Marksmen. Own starting range: 40–50% Infantry, 25–35% Cavalry, 20–30% Marksmen.",
                infCav: "Enemy: 50% Infantry + 50% Cavalry. Own starting range: 40–50% Infantry, 10–20% Cavalry, 35–45% Marksmen."
            },
            note: "These percentages are provisional guidance and do not feed into the existing Solo or Rally calculation. The values must add up to 100%."
        },
        es: {
            title: "Mezcla 50/50 detectada — rango inicial adicional",
            details: {
                infMarks: "Enemigo: 50 % Infantería + 50 % Tiradores. Rango inicial propio: 25–35 % Infantería, 30–40 % Caballería, 30–40 % Tiradores.",
                cavMarks: "Enemigo: 50 % Caballería + 50 % Tiradores. Rango inicial propio: 40–50 % Infantería, 25–35 % Caballería, 20–30 % Tiradores.",
                infCav: "Enemigo: 50 % Infantería + 50 % Caballería. Rango inicial propio: 40–50 % Infantería, 10–20 % Caballería, 35–45 % Tiradores."
            },
            note: "Estos porcentajes son una orientación provisional y no afectan al cálculo actual de Solo o Rally. Los valores deben sumar 100 %."
        },
        ko: {
            title: "50/50 혼합 병력 감지 — 추가 시작 범위",
            details: {
                infMarks: "적군: 보병 50% + 궁병 50%. 내 병력 시작 범위: 보병 25–35%, 기병 30–40%, 궁병 30–40%.",
                cavMarks: "적군: 기병 50% + 궁병 50%. 내 병력 시작 범위: 보병 40–50%, 기병 25–35%, 궁병 20–30%.",
                infCav: "적군: 보병 50% + 기병 50%. 내 병력 시작 범위: 보병 40–50%, 기병 10–20%, 궁병 35–45%."
            },
            note: "이 비율은 잠정적인 참고 범위이며 기존 솔로 또는 랠리 계산에는 반영되지 않습니다. 비율의 합은 100%여야 합니다."
        }
    };

    const infantry = document.getElementById("inf");
    const cavalry = document.getElementById("cav");
    const marksmen = document.getElementById("arc");
    const language = document.getElementById("lang");
    const target = document.getElementById("target");
    const panel = document.getElementById("mixedAdvice");
    const title = document.getElementById("mixedAdviceTitle");
    const text = document.getElementById("mixedAdviceText");

    function updateMixedAdvice() {
        const i = Number(infantry.value);
        const c = Number(cavalry.value);
        const a = Number(marksmen.value);
        const lang = advice[language.value] ? language.value : "en";
        let key = null;

        if (target.value === "allout") {
            panel.style.display = "none";
            return;
        }

        if (i === 50 && c === 0 && a === 50) key = "infMarks";
        else if (i === 0 && c === 50 && a === 50) key = "cavMarks";
        else if (i === 50 && c === 50 && a === 0) key = "infCav";

        if (!key) {
            panel.style.display = "none";
            return;
        }

        title.textContent = advice[lang].title;
        text.textContent = advice[lang].details[key] + " " + advice[lang].note;
        panel.style.display = "block";
    }

    [infantry, cavalry, marksmen, language, target].forEach((element) => {
        element.addEventListener("input", updateMixedAdvice);
        element.addEventListener("change", updateMixedAdvice);
    });

    updateMixedAdvice();
})();

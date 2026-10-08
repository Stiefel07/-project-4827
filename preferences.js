// Remembers the user's selections and provides one-click troop presets.
(() => {
    const storageKey = "kingshot-counter.preferences.v1";
    const ids = ["lang", "inf", "cav", "arc", "mode", "target", "enemyTier"];
    const allowed = {
        lang: ["de", "en", "es", "ko"],
        mode: ["rally", "solo"],
        target: ["castle", "outpost", "shrine", "allout"],
        enemyTier: ["same", "plus1"]
    };

    function readPreferences() {
        try {
            return JSON.parse(localStorage.getItem(storageKey) || "null");
        } catch {
            return null;
        }
    }

    function savePreferences() {
        const preferences = {};
        ids.forEach((id) => {
            preferences[id] = document.getElementById(id).value;
        });
        try {
            localStorage.setItem(storageKey, JSON.stringify(preferences));
        } catch {
            // The calculator remains usable if browser storage is unavailable.
        }
    }

    const saved = readPreferences();
    if (saved) {
        if (allowed.lang.includes(saved.lang)) {
            document.getElementById("lang").value = saved.lang;
        }
        ["inf", "cav", "arc"].forEach((id) => {
            if (Number.isFinite(Number(saved[id]))) {
                document.getElementById(id).value = saved[id];
            }
        });
        if (allowed.target.includes(saved.target)) {
            document.getElementById("target").value = saved.target;
        }
        if (allowed.enemyTier.includes(saved.enemyTier)) {
            document.getElementById("enemyTier").value = saved.enemyTier;
        }
    }

    window.addEventListener("load", () => {
        if (saved && allowed.mode.includes(saved.mode)) {
            document.getElementById("mode").value = saved.mode;
        }
        if (saved) {
            ["target", "enemyTier"].forEach((id) => {
                if (allowed[id].includes(saved[id])) {
                    document.getElementById(id).value = saved[id];
                }
            });
        }

        document.querySelectorAll("#quickPresetButtons [data-troops]").forEach((button) => {
            button.addEventListener("click", () => {
                const [infantry, cavalry, marksmen] = button.dataset.troops.split(",");
                document.getElementById("inf").value = infantry;
                document.getElementById("cav").value = cavalry;
                document.getElementById("arc").value = marksmen;
                savePreferences();
                window.dispatchEvent(new Event("preferences-restored"));
            });
        });

        ids.forEach((id) => {
            const element = document.getElementById(id);
            element.addEventListener("input", savePreferences);
            element.addEventListener("change", savePreferences);
        });

        savePreferences();
        window.dispatchEvent(new Event("preferences-restored"));
    });
})();

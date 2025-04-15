const defaultBios = [
    'Sziasztok, %username% vagyok! 🤘',
    'Üdvözöllek, %username% vagyok! 🎉',
    'Helló, %username% vagyok, és itt vagyok! (Mert regisztráltam 😎)',
    'Szia, Én vagyok %username%! Ha nem hiszed, kérdezd meg!',
    'Üdv, %username% vagyok! Kávé nélkül nem működöm. ☕',
    'Helló, %username% vagyok! Most már hivatalosan is itt kísértek. 👻',
    'Szia, %username% vagyok, és valószínűleg túl sokáig gondolkodtam ezen a bemutatkozáson.',
    'Üdv! %username% vagyok, és én hoztam a sütit! (Ja nem, az elfogyott... 😢)',
    'Helló, én vagyok %username%! Most már hivatalosan is a rendszer része vagyok! 🤖',
    'Szia! %username% vagyok, és fogalmam sincs, hogy kerültem ide! 🤷‍♂️',
    'Üdv, %username% vagyok! A nevem kiválasztása 3 másodpercet vett igénybe.',
    'Szia! %username% vagyok, és nem tudtam jobb nevet kitalálni.',
    'Helló! %username% vagyok. Ha ezt olvasod, akkor sikeresen regisztráltam! 🎉',
    'Üdv! %username% vagyok! Ne kérdezd, hogy miért, így születtem. 🤷',
    'Szia, %username% vagyok! Még egy bio, amit senki sem fog elolvasni! 😆',
    'Helló, %username% vagyok, és a titkos küldetésem most kezdődik! 🕵️‍♂️',
    'Szia! %username% vagyok, és remélem, hogy nem egy robot vagyok. 🤖',
    'Üdv, %username% vagyok, és ha ezt olvasod, akkor működik az internet! 🌍',
    'Szia, %username% vagyok! Máris egy lépéssel közelebb a világuralomhoz! 🌍👑',
];

export const getRandomBio = (username: string) => {
    const bio = defaultBios[Math.floor(Math.random() * defaultBios.length)];
    return bio.replace('%username%', username);
};

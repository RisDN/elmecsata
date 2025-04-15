## Dizájn Todo

Modern, josszbufe-like style, dark / light theme, animációk

<ul>
    <li>❌ Landing page: Sodró discover, login és reg modal, profil gomb stb.</li>
    <li>❌ Discover page: Kahootok megjelenítése, kis kártyák, benne a leírásuk, kép bannerjük, Play gomb, kereső, szűrő</li>
    <li>❌ Profil page: Profil név, publikus kahootjai</li>
    <li>❌ Játék indítás page: Ahol megjelenik a kód és a qr kód, csatlakozott playerek, start gomb és settings</li>
    <li>❌ Kahoot szerkesztése: Banner feltöltés, leírás megadás, név megadás, kérdések szerkesztése drag & drop-al.</li>
<ul>
<hr>
❌ - még nincs kész
✅ - kész

### App leírás, funkciók, ui-ok

- A webapp egy kahoot szerkesztő és játék indító platform lesz.
- A kahootokat Quiz-eknek hívjuk.
- A Quiz-eket a felhasználók készíthetik el, majd megoszthatják másokkal.
- A Quiz-eket a felhasználók játszhatják is.

## Alap app fogalmak

- Quiz: Egy kahoot, amit a felhasználók készítenek.
- Szervező: Az a felhasználó, aki elindít egy játékot.
- Játékos: Az a felhasználó, aki csatlakozik egy játékhoz.
- Kód: Egy futó Quiz-hez tartozó egyedi azonosító, amivel csatlakozni lehet.
- Figura: Egy kis karakter, amit a játékosok választhatnak maguknak a játékhoz.

## App felépítése

- Főoldal: A főoldalon vannak a hasznos infók kis kártyákban és a megszokott navigációs elemek. Van egy "Folyamatban lévő játékok" részleg, ahol a már elkészített Quiz-eket dobálja fel. (10 db random az adatbázisból) Az üdvözlő üzenet alatt található egy "Csatlakozás kód segítségével gomb". Ez átirányít a játék indító oldalra azaz a "www.yourdomain.com/play" oldalra.

## "www.yourdomain.com/play" oldal

- A felhasználó először beírja a kódot. Azt checkolja a socket-server, hogy van-e ilyen kóddal rendelkező futó játék, ha van akkor a kliens megkapja a játék adatait és "elcsúszódik a kód doboz" és megjelenik egy **karakterkészítő szerű dolog** Itt beírhatja a nevét illetve egy balra jobbra nyíl-al választhat magának egy kis figurát (alapértelmezettként az elérhető figurák közül egy random-ot rak be). Ha beírta a kívánt nevet, és választott egy figurát akkor rákattinthat a csatlakozás gombra. A csatlakozás gomb lenyomásakor szerver és kliens oldalon validációt végzünk (nem-e foglalt már az adott játékban a név, név hosszúság). Ha minden rendben van akkor szintén elcsúszódik ez a kis menü és megkapjuk a csatlakozott játékosok listáját illetve azoknak a karakterét. Itt lehetne egy szöveg, hogy "Várakozás a szerverzőre". <br>
  <img src="https://media.discordapp.net/attachments/1277758052988227698/1290682541111640074/image.png?ex=66fd5949&is=66fc07c9&hm=a9ad32e2b7a968eac4be9328276acd3a2e3c12c8664bf3d4919eba57bde5d00e&=&format=webp&quality=lossless&width=589&height=532" width="300">
  <img src="https://media.discordapp.net/attachments/1277758052988227698/1290683267342929985/image.png?ex=66fd59f6&is=66fc0876&hm=4d05fec13657aa51f91d2fda205fda224d722af57b688e3b59bff6264215bda1&=&format=webp&quality=lossless&width=563&height=532" width="300">

## www.yourdomain.com/play/<kód>

- A kérésben megadott kód alapján ellenőrizzük, hogy van-e futó játék:
    - Ha nincs akkor átirányítjuk a felhasználót a www.yourdomain.com/play/ címre.
    - Ha van, akkor a kód beíros doboz nem jelenik meg, csak a karakterkészítő.

## www.yourdomain.com/play - in-game fázis

- Azt, hogy jelenleg mi van az oldalon azt a socket-server mondja meg.
- Ha a szervező elindítja a játékot, akkor egy 10 másodperces visszaszámlálással és kis animációval megjelenik az első kérdés. Megjelenik maga a kérdés, és ha van akkor a hozzátartozó kép.
- Kérdések fajtái:

    - Igaz/hamis
    - 4 válaszlehetőség közül választás (itt a válaszlehetőség lehet szöveges vagy képes is)
    - Szöveges válasz

- Valahol lehetne egy progress bar, ami folyamatosan mutatja, hogy mennyi idő van még hátra a kérdésből de célszerű számmal is jelezni.
- Ha már leadtuk a válaszunkat, akkor egy kis töltő szerű animáció jelenik meg olyasmi szöveggel, hogy "Várakozás a többi játékosra" hiszen nem csak akkor van vége egy adott kérdésnek, ha lejár az idő hanem akkor is ha mindenki leadta a válaszát.
- Minden kérdés után megjelenik az aktuális **Leaderboard**, hogy ki hány ponttal vezet. <br>
  <img src="https://media.discordapp.net/attachments/1277758052988227698/1290685936627224666/image.png?ex=66fd5c73&is=66fc0af3&hm=54d6fc69101c51915e75081015b2c6e1599cb6e3f3b1db15510f27f892a47a0c&=&format=webp&quality=lossless" width="250">
  <br>
  (Azért ennél igényesebb módon xD pl.: bal oldalt ott lehet a figura is)
- A nyilak, hogy jelezzük ki mennyit ment éppen fel vagy esett le az jó ötlet illetve az is, hogy mint a csatolt képen megjeleníthetünk statisztikákat, hogy pl "XY eddig csak helyesen válaszolt!" stb.
- Ha már nincs több kérdés akkor eredményhírdetés kép jelenik meg. Ami igazából annyi, hogy animációval megjelennek a pódiumok, azok tetején a figurák a nevekkel és a pontokkal. Legfelül pedig a Quiz neve <br>
  <img src="https://media.discordapp.net/attachments/1277758052988227698/1290687793873424464/y5k.png?ex=66fd5e2d&is=66fc0cad&hm=64edd4f8761a742d8558b19ff029a9ffdb309baf6fa5205f8aa646f7895acad6&=&format=webp&quality=lossless&width=606&height=532" width="250">
  <br>

# AZ Kvíz

Uživatelský návod pro práci s aplikací AZ Kvíz.
Odkaz: [https://alkaacz.github.io/az-kviz](https://alkaacz.github.io/az-kviz).

## Lokální spuštění

V terminálu spusť:

```powershell
cd D:\git\az-kviz
python -m http.server 8000
```

Potom otevři v prohlížeči:

- hlavní stránku: [http://localhost:8000](http://localhost:8000)
- demo hry: [http://localhost:8000/play.html](http://localhost:8000/play.html)
- administraci: [http://localhost:8000/admin.html](http://localhost:8000/admin.html)

Server ukončíš v terminálu klávesovou zkratkou `Ctrl+C`.

Stránka `play.html` bez parametru `quizId` používá lokální testovací data ze souboru `mock/sample-quiz.json`. Přihlášení do administrace může vyžadovat povolení adresy `http://localhost:8000` v nastavení Google OAuth.

## I. Hráč

Hráč má dvě možnosti, jak hru spustit.

1. Demo režim
1. Otevři stránku hry bez parametru `quizId`.
1. Hra se načte z ukázkových dat a můžeš si hned vyzkoušet ovládání.

Typicky:
- na GitHub Pages: [https://alkaacz.github.io/az-kviz/play.html](https://alkaacz.github.io/az-kviz/play.html)

2. Hraní přes sdílený odkaz od učitele
1. Otevři odkaz ve tvaru [https://alkaacz.github.io/az-kviz/play.html?quizId=ID-KVIZU](https://alkaacz.github.io/az-kviz/play.html?quizId=ID-KVIZU).
1. Hra načte konkrétní kvíz ze serveru.
1. Vyber počet týmů, pojmenuj týmy a spusť hru.

## II. Admin

Admin slouží k práci s kvízy: vytvoření, úpravy, uložení, smazání a sdílení odkazu pro hráče.

### Přihlášení

1. Otevři [https://alkaacz.github.io/az-kviz/admin.html](https://alkaacz.github.io/az-kviz/admin.html).
1. Přihlas se Google účtem.
1. Pokud je účet na whitelistu, zobrazí se seznam kvízů.

### Práce s kvízy

1. Nový kvíz:
1. Klikni na `+ Nový kvíz`.
1. Vyplň název, nastavení a otázky.
1. Ulož tlačítkem `Uložit`.

1. Import otázek z CSV:
1. V editoru klikni na `📥 Import z CSV` a vyber soubor.
1. CSV je v UTF-8, první řádek je hlavička, oddělovač `;` (nebo `,`):
   `otázka;odpověď A;odpověď B;odpověď C;odpověď D;správná`
1. Sloupec `správná` obsahuje písmeno `A`–`D`.
1. Otázky se načtou do tabulky. Zkontroluj je a ulož tlačítkem `Uložit`.

2. Úprava existujícího kvízu:
1. V seznamu klikni na `Editovat`.
1. Proveď změny v otázkách nebo nastavení.
1. Potvrď tlačítkem `Uložit`.

3. Smazání kvízu:
1. V seznamu klikni na `Smazat`.
1. Potvrď dialog.

4. Sdílení odkazu na hru:
1. V seznamu klikni na `Kopírovat odkaz`.
1. Odkaz pošli hráčům.

### Poznámky k editoru

- Pro hru je potřeba alespoň 28 otázek.
- Každá otázka musí mít text a 4 odpovědi.
- U ukládání a načítání se zobrazuje průběhový stav (progress + status), aby bylo vidět, že probíhá komunikace s backendem.

### Význam voleb v nastavení kvízu

- `Zamíchat otázky`: otázky se při spuštění hry promíchají do náhodného pořadí.
- `Zamíchat odpovědi`: u každé otázky se promíchá pořadí odpovědí A/B/C/D.
- `Časový limit (s, 0 = vypnuto)`: určuje počet sekund na jednu otázku. Hodnota `0` znamená bez časového limitu.

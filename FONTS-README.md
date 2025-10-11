# Font Installation - DSGVO-konform

## Schritt-für-Schritt Anleitung:

### 1. Fonts herunterladen
- Gehe zu: https://fonts.google.com/specimen/Nunito
- Wähle die Stärken: 200 (ExtraLight), 400 (Regular), 600 (SemiBold)
- Klicke auf "Download family"

### 2. Dateien konvertieren (optional für bessere Performance)
Du kannst online Tools nutzen um TTF in WOFF2 zu konvertieren:
- https://convertio.co/ttf-woff2/
- https://cloudconvert.com/ttf-to-woff2

### 3. Dateien in den fonts/ Ordner kopieren
Benenne die Dateien so um:
- `Nunito-ExtraLight.woff2` (und .woff)
- `Nunito-Regular.woff2` (und .woff) 
- `Nunito-SemiBold.woff2` (und .woff)

### 4. Alle anderen HTML-Dateien aktualisieren
Entferne aus allen HTML-Dateien die Google Fonts Links:
```html
<!-- Diese Zeile löschen: -->
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap" rel="stylesheet">
```

### Dateien die aktualisiert werden müssen:
- ✅ index.html (bereits gemacht)
- ❌ methoden.html 
- ❌ ueber-mich.html
- ❌ angebote.html
- ❌ kontakt.html
- ❌ impressum.html
- ❌ datenschutz.html

### 5. DSGVO-Vorteile
✅ Keine Datenübertragung an Google
✅ Bessere Performance (lokale Fonts)
✅ Funktioniert auch offline
✅ Vollständige Kontrolle über die Fonts

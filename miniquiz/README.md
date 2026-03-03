# Mini Quiz – Frontend

Next.js Frontend für die Mini Quiz Anwendung.

## Voraussetzungen

- Node.js 18 oder höher
- Das Backend muss laufen (siehe `../backend/README.md`)

## Installation

```bash
npm install
```

## Frontend starten

```bash
npm run dev
```

Die Anwendung ist dann unter `http://localhost:3000` erreichbar.

## Ansichten

### Übersichtsseite
- Zeigt alle verfügbaren Kategorien
- Fortschrittsbalken mit Prozentanzeige pro Kategorie
- Klick auf eine Kategorie startet das Quiz

### Quiz-Ansicht
- Eine Frage mit 4 Antwortmöglichkeiten
- Direktes Feedback ob die Antwort richtig oder falsch war
- Falsch beantwortete Fragen werden übersprungen
- Am Ende: Ergebnis mit Anzahl richtiger Antworten

## Konfiguration

Die Backend-URL wird in `src/lib/api.ts` konfiguriert:

```typescript
const API_BASE = "http://localhost:8080/api";
```

Passe die URL bei Bedarf an.

## Technologien

- Next.js 15
- TypeScript
- Tailwind CSS
# Semantische Modelle verwalten

<div class="pbi-page-header">
  <div class="pbi-page-meta">Modul 5 · Skript 23</div>
  <div class="pbi-page-title">Semantische Modelle verwalten</div>
  <div class="pbi-page-sub">Gateway · Geplante Aktualisierung · Endorsement · Datenherkunft</div>
</div>

Ein veröffentlichter Bericht ist nur so gut wie seine Daten. Wenn das semantische Modell nicht aktualisiert wird, sehen Benutzer veraltete Zahlen. Dieses Skript zeigt, wie Aktualisierungen automatisiert werden, wie sichergestellt wird, dass die richtigen semantischen Modelle in der Organisation gefunden und genutzt werden, und wie Abhängigkeiten zwischen Berichten und Datenquellen nachvollzogen werden können.

---

## Das On-Premises Data Gateway

### Warum ein Gateway?

Im Power BI Service läuft das semantische Modell in der Microsoft-Cloud. Wenn die Datenquelle ebenfalls in der Cloud liegt (SharePoint, Azure SQL, OneDrive), kann der Service direkt darauf zugreifen. Wenn die Datenquelle aber auf einem lokalen Server im Firmennetzwerk liegt (SQL Server on-premises, Excel-Datei auf einem Netzlaufwerk), braucht der Cloud-Dienst einen sicheren Tunnel dorthin. Diesen Tunnel stellt das **On-Premises Data Gateway** bereit.

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Hinweis</span>
  Für reine Cloud-Datenquellen (SharePoint Online, Azure, OneDrive for Business) wird kein Gateway benötigt. Ein Gateway ist ausschließlich für lokale Datenquellen erforderlich, die nicht direkt aus dem Internet erreichbar sind.
</div>

### Zwei Gateway-Typen

| Typ | Für wen | Besonderheiten |
|---|---|---|
| **Standardmodus** | Teams und Organisationen | Mehrere Nutzer, mehrere Datenquellen. Wird vom IT-Administrator auf einem dedizierten Server installiert und verwaltet. |
| **Persönlicher Modus** | Einzelne Analysten | Nur ein Nutzer, nur Power BI. Auf dem eigenen Computer installiert. Der Computer muss online sein, damit Aktualisierungen funktionieren. Berichte können nicht an andere Nutzer freigegeben werden. |

### Wie das Gateway funktioniert

Das Gateway kommuniziert nicht direkt mit dem Internet, sondern über den **Azure Service Bus** als Mittler:

1. Der Power BI Service sendet eine Abfrage mit verschlüsselten Anmeldedaten an die Gateway-Warteschlange
2. Azure Service Bus leitet die Anfrage an das lokal installierte Gateway weiter
3. Das Gateway stellt die Verbindung zur lokalen Datenquelle her, führt die Abfrage aus
4. Die Ergebnisse fließen zurück zum Service

Die Daten verlassen das Firmennetzwerk dabei nur verschlüsselt und in Richtung Microsoft.

### Datenquelle am Gateway hinzufügen

Bevor geplante Aktualisierungen für lokale Datenquellen möglich sind, muss die Datenquelle dem Gateway bekannt gemacht werden. Im Power BI Service: **Einstellungen (Zahnradsymbol) → Verbindungen und Gateways verwalten**. Dort: neuen Eintrag anlegen mit Verbindungstyp (z.B. SQL Server), Servername, Datenbankname und Anmeldedaten.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 4-gateway-new-connection.png — Dialogfenster für neue Gateway-Verbindung mit Feldern für Gatewayname, Verbindungstyp, Server und Authentifizierung.</span>
</div>

---

## Geplante Aktualisierung

### Aktualisierungsplan einrichten

Im Arbeitsbereich: Mauszeiger über das semantische Modell → Symbol **Aktualisierung planen** → Einstellungsseite öffnet sich.

Konfigurationsschritte:
1. Schalter **Aktualisierung planen** aktivieren
2. **Aktualisierungshäufigkeit** wählen: täglich oder wöchentlich
3. **Zeitzone** prüfen und ggf. anpassen
4. **Zeitfenster** hinzufügen (bis zu acht pro Tag bei freigegebener Kapazität, bis zu 48 bei Premium)
5. **Anwenden** klicken

<div class="pbi-admonition pbi-info">
  <span class="pbi-admonition-title">Timing-Hinweis</span>
  Power BI startet Aktualisierungen im angegebenen Zeitfenster nach bestem Wissen. Bei hoher Systemauslastung kann es zu Verzögerungen von bis zu einer Stunde kommen. Exakte Uhrzeit kann nicht garantiert werden.
</div>

### Bedarfsgesteuerte Aktualisierung

Zusätzlich zum Zeitplan kann jederzeit manuell aktualisiert werden. Im Arbeitsbereich: Mauszeiger über das semantische Modell → Symbol **Jetzt aktualisieren**. Dieser Vorgang hat keine Auswirkung auf den bestehenden Zeitplan.

Typische Anwendungsfälle:
- Neue Daten stehen unplanmäßig früher bereit
- Gateway-Konfiguration testen
- Präsentation in einer Stunde, Daten sollen aktuell sein

### Aktualisierungsstatus und -verlauf prüfen

Im Arbeitsbereich wird der Status aller semantischen Modelle angezeigt. Ein kleines Warnsymbol neben einem Modell zeigt, dass ein Problem vorliegt. Klick auf das Symbol: Details des Fehlers.

Für den Verlauf: Modell-Einstellungen öffnen → **Verlauf aktualisieren** — dort stehen alle Aktualisierungsläufe mit Zeitstempel und Ergebnis (Erfolg / Fehlgeschlagen).

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">Automatische Deaktivierung</span>
  Power BI deaktiviert einen Aktualisierungsplan automatisch in zwei Situationen: nach zwei Monaten, in denen kein Nutzer den zugehörigen Bericht oder das Dashboard geöffnet hat, oder nach vier aufeinanderfolgenden Fehlern. Nach der Deaktivierung muss der Plan manuell wieder aktiviert werden.
</div>

### Häufige Fehlerursachen

- Abgelaufene oder geänderte Anmeldedaten für die Datenquelle
- Gateway nicht erreichbar (Computer ausgeschaltet, Netzwerkproblem)
- Datenquelle umgezogen oder umbenannt
- Kapazitätslimit erreicht (zu viele gleichzeitige Aktualisierungen)

Im Service: **Einstellungen → semantisches Modell → Datenquellenanmeldedaten** — dort können Anmeldedaten aktualisiert werden, wenn sie abgelaufen sind.

---

## Inkrementelle Aktualisierung

Bei großen semantischen Modellen ist eine vollständige Aktualisierung (alle Daten neu laden) langsam und ressourcenintensiv. Die **inkrementelle Aktualisierung** lädt nur Daten für einen definierten Zeitraum neu, z.B. die letzten 10 Tage, während ältere Daten unverändert bleiben.

### Voraussetzungen und Konfiguration

Die Richtlinie wird in Power BI Desktop definiert, bevor veröffentlicht wird:

1. In Power Query zwei reservierte Parameter anlegen: **RangeStart** (Typ: Datum/Uhrzeit) und **RangeEnd** (Typ: Datum/Uhrzeit)
2. Die Datumsspalte der Faktentabelle mit einem benutzerdefinierten Filter auf diesen Bereich filtern
3. Rechtsklick auf die Tabelle im Datenbereich → **Inkrementelle Aktualisierung** → Richtlinie konfigurieren: wie lange werden Daten aufbewahrt, wie viel wird bei jeder Aktualisierung neu geladen
4. Veröffentlichen im Service

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">Wichtig</span>
  Inkrementelle Aktualisierung funktioniert nur wenn die Datenquelle <strong>Query Folding</strong> unterstützt. Das bedeutet: Power Query kann die Filterlogik als native Abfrage an die Datenquelle übergeben. CSV-Dateien unterstützen kein Query Folding. Geeignet sind SQL Server, Azure SQL, SharePoint-Listen und andere relationale Quellen.
</div>

---

## Endorsement: Semantische Modelle kennzeichnen

In größeren Organisationen gibt es viele semantische Modelle. Nutzer wissen oft nicht, welchem sie vertrauen sollen. **Endorsement** (Befürwortung) gibt Modellen ein sichtbares Qualitätslabel.

### Drei Stufen

| Stufe | Wer darf kennzeichnen | Bedeutung |
|---|---|---|
| **Höher gestuft** | Jeder mit Schreibberechtigung im Arbeitsbereich | "Dieses Modell ist stabil und für die Nutzung bereit." |
| **Zertifiziert** | Nur autorisierte Nutzer (über Mandanteneinstellungen) | "Dieses Modell ist die offizielle Quelle für diese Daten." |
| **Masterdaten** | Fabric-Feature (nicht in diesem Kurs) | Kern-Referenzdaten der Organisation |

### Endorsement setzen

Im Service: Modell-Einstellungen öffnen → Abschnitt **Endorsement** → Option wählen → Anwenden. Das Endorsement-Label erscheint danach in der Arbeitsbereich-Übersicht und in der Suchergebnisliste.

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 7-promoted-dataset-badge-ssm.png — Arbeitsbereichsliste mit Endorsement-Badge neben einem semantischen Modell.</span>
</div>

---

## Datenherkunft und Auswirkungsanalyse

### Herkunftsansicht

Im Arbeitsbereich: oben rechts das Symbol **Herkunft** (oder über die Menüleiste). Mindestens die Rolle **Mitwirkender** ist erforderlich, um die Herkunftsansicht aufzurufen. Die Ansicht zeigt alle Elemente des Arbeitsbereichs als verknüpfte Karten:

- Datenquellen (mit Gateway-Informationen falls vorhanden)
- Semantische Modelle (mit letztem Aktualisierungszeitpunkt und Endorsement-Status)
- Berichte, die auf diesen Modellen basieren
- Dashboards, die Kacheln aus diesen Berichten enthalten

Der Datenfluss ist als gerichteter Graph sichtbar: Von links (Datenquelle) nach rechts (Dashboard).

<div class="pbi-screenshot">
  <span class="pbi-screenshot-label">Screenshot</span>
  <span class="pbi-screenshot-desc">Dateiname: 9a-lineage.png — Herkunftsansicht mit Datenquellen links, semantischen Modellen in der Mitte und Berichten rechts, verbunden durch Pfeile.</span>
</div>

### Auswirkungsanalyse

Wenn ein semantisches Modell geändert werden soll: Klick auf **Auswirkungsanalyse** auf der Modell-Karte. Power BI zeigt, welche Berichte und Dashboards — auch in anderen Arbeitsbereichen — von diesem Modell abhängen. Vor größeren Modellveränderungen ist diese Prüfung eine wichtige Vorsichtsmaßnahme.

Analog: **Auswirkungsanalyse** auf einer Datenquellen-Karte zeigt, welche Modelle und Berichte von dieser Datenquelle abhängen — nützlich wenn eine Datenquelle migriert oder abgeschaltet werden soll.

---

## Abfragezwischenspeicherung

Die **Abfragezwischenspeicherung** (Query Caching) ist eine Performance-Funktion für Arbeitsbereiche mit Fabric- oder Premium-Kapazität. Statt bei jedem Seitenaufruf alle Abfragen neu zu berechnen, speichert Power BI die Ergebnisse im lokalen Cache. Berichte laden dadurch schneller, insbesondere bei semantischen Modellen, die sich nicht häufig ändern.

**Wann der Cache befüllt wird:** Beim ersten Öffnen des Berichts durch einen Nutzer, nur für die erste Berichtsseite (Einstiegsseite).

**Konfiguration:** Semantisches Modell im Arbeitsbereich → Einstellungen → Registerkarte **Semantische Modelle** → Abschnitt **Zwischenspeichern der Abfrage** → Option **An** wählen.

<div class="pbi-admonition pbi-warning">
  <span class="pbi-admonition-title">Nur für Fabric- und Premium-Kapazität</span>
  Abfragezwischenspeicherung ist ausschließlich für Arbeitsbereiche mit Fabric- oder Power BI Premium-Kapazität verfügbar. Beim Umschalten von "An" auf "Aus" werden alle gespeicherten Abfrageergebnisse sofort gelöscht.
</div>

---

## Zusammenfassung

<div class="pbi-summary-grid">
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Gateway</div>
    <div class="pbi-summary-body">Brücke zwischen lokalen Datenquellen und dem Power BI Service. Standardmodus für Teams (IT verwaltet), Persönlicher Modus für Einzelpersonen (eigener PC). Für Cloud-Quellen nicht erforderlich.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Geplante Aktualisierung</div>
    <div class="pbi-summary-body">Im Service konfiguriert. Bis zu 8 Zeitfenster/Tag (Pro), bis zu 48 (Premium). Automatische Deaktivierung nach 2 Monaten Inaktivität oder 4 aufeinanderfolgenden Fehlern. Bedarfsgesteuerte Aktualisierung jederzeit möglich.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Inkrementelle Aktualisierung</div>
    <div class="pbi-summary-body">Nur neueste Daten neu laden. Konfiguration mit RangeStart/RangeEnd in Power Query, Richtlinie in Desktop definieren, im Service anwenden. Setzt Query Folding voraus — nicht geeignet für CSV-Dateien.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Endorsement</div>
    <div class="pbi-summary-body">Qualitätslabels für semantische Modelle: Höher gestuft (jeder mit Schreibrecht) und Zertifiziert (autorisierte Nutzer). Macht vertrauenswürdige Modelle in der Suche sichtbar.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Datenherkunft</div>
    <div class="pbi-summary-body">Gerichteter Graph im Arbeitsbereich: Datenquelle → Modell → Bericht → Dashboard. Zeigt Abhängigkeiten auf einen Blick. Auswirkungsanalyse vor Änderungen am Modell oder der Datenquelle.</div>
  </div>
  <div class="pbi-summary-card">
    <div class="pbi-summary-icon"></div>
    <div class="pbi-summary-title">Fehlerbehandlung</div>
    <div class="pbi-summary-body">Aktualisierungsverlauf im Service prüfen. Warnsymbol neben Modell zeigt aktuelles Problem. Häufigste Ursachen: abgelaufene Anmeldedaten, Gateway offline, Datenquelle umgezogen.</div>
  </div>
</div>

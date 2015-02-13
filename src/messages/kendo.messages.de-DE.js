

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Ist gleich",
    "gt": "Ist nach",
    "gte": "Ist nach oder gleich",
    "lt": "Ist vor",
    "lte": "Ist vor oder gleich",
    "neq": "Ist nicht gleich"
  },
  "enums": {
    "eq": "Ist gleich",
    "neq": "Ist nicht gleich"
  },
  "number": {
    "eq": "Ist gleich",
    "gt": "Ist größer als",
    "gte": "Ist größer als oder gleich",
    "lt": "Ist kleiner",
    "lte": "Ist kleiner als oder gleich",
    "neq": "Ist nicht gleich"
  },
  "string": {
    "contains": "Beinhaltet",
    "doesnotcontain": "Beinhaltet nicht",
    "endswith": "Endet mit",
    "eq": "Ist gleich",
    "neq": "Ist nicht gleich",
    "startswith": "Beginnt mit"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Ist gleich",
    "gt": "Ist nach",
    "gte": "Ist nach oder gleich",
    "lt": "Ist vor",
    "lte": "Ist vor oder gleich",
    "neq": "Ist nicht gleich"
  },
  "enums": {
    "eq": "Ist gleich",
    "neq": "Ist nicht gleich"
  },
  "number": {
    "eq": "Ist gleich",
    "gt": "Ist größer als",
    "gte": "Ist größer als oder gleich",
    "lt": "Ist kleiner",
    "lte": "Ist kleiner als oder gleich",
    "neq": "Ist nicht gleich"
  },
  "string": {
    "contains": "Beinhaltet",
    "doesnotcontain": "Beinhaltet nicht",
    "endswith": "Endet mit",
    "eq": "Ist gleich",
    "neq": "Ist nicht gleich",
    "startswith": "Beginnt mit"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Spalten",
  "sortAscending": "Aufsteigend sortieren",
  "sortDescending": "Absteigend sortieren",
  "settings": "Column Einstellungen",
  "done": "Geschehen",
  "lock": "Sperren",
  "unlock": "Aufschließen",
  "filter": "Filter"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "Tag(e)",
    "repeatEvery": "Wiederholen an jedem:"
  },
  "end": {
    "after": "Nach",
    "occurrence": "Anzahl Wiederholungen",
    "label": "Beenden:",
    "never": "Nie",
    "on": "Am",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Täglich",
    "monthly": "Monatlich",
    "never": "Nie",
    "weekly": "Wöchentlich",
    "yearly": "Jährlich"
  },
  "monthly": {
    "day": "Tag",
    "interval": "Monat(e)",
    "repeatEvery": "Wiederholen an jedem:",
    "repeatOn": "Wiederholen am:"
  },
  "offsetPositions": {
    "first": "ersten",
    "fourth": "vierten",
    "last": "letzten",
    "second": "zweiten",
    "third": "dritten"
  },
  "weekly": {
    "repeatEvery": "Wiederholen an jedem:",
    "repeatOn": "Wiederholen am:",
    "interval": "Woche(n)"
  },
  "yearly": {
    "of": "von",
    "repeatEvery": "Wiederholen an jedem:",
    "repeatOn": "Wiederholen am:",
    "interval": "Jahr(e)"
  },
  "weekdays": {
    "day": "Tag",
    "weekday": "Wochentag",
    "weekend": "Tag am Wochenende"
  }
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "backColor": "Hintergrundfarbe",
  "bold": "Fett",
  "createLink": "Hyperlink einfügen",
  "deleteFile": "Sind Sie sicher, dass Sie  \"{0}\" löschen wollen?",
  "dialogButtonSeparator": "oder",
  "dialogCancel": "Abbrechen",
  "dialogInsert": "Einfügen",
  "directoryNotFound": "Kein Verzeichnis mit diesem Namen gefunden",
  "emptyFolder": "Leeres Verzeichnis",
  "fontName": "Schriftfamilie",
  "fontNameInherit": "(Schrift übernehmen)",
  "fontSize": "Größe",
  "fontSizeInherit": "(Größe übernehmen)",
  "foreColor": "Farbe",
  "formatBlock": "Absatzstil",
  "imageAltText": "Abwechselnder Text",
  "imageWebAddress": "Web-Adresse",
  "indent": "Einzug vergrößern",
  "insertHtml": "HTML einfügen",
  "insertImage": "Einfügen Bild",
  "insertOrderedList": "Numerierte Liste",
  "insertUnorderedList": "Aufzählliste",
  "invalidFileType": "Die ausgewählte Datei  \"{0}\" ist ungültig. Unterstützte Dateitypen sind {1}.",
  "italic": "Kursiv",
  "justifyCenter": "Zentriert",
  "justifyFull": "Ausrichten",
  "justifyLeft": "Linksbündig",
  "justifyRight": "Rechtsbündig",
  "linkOpenInNewWindow": "Link in einem neuen Fenster öffnen",
  "linkText": "Text",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "Web-Adresse",
  "orderBy": "Sortiert nach:",
  "orderByName": "Name",
  "orderBySize": "Größe",
  "outdent": "Einzug verkleinern",
  "overwriteFile": "Eine Datei mit dem Namen \"{0}\" existiert bereits im aktuellen Verzeichnis. Wollen Sie diese überschreiben?",
  "search": "Suchen",
  "strikethrough": "Durchgestrichen",
  "styles": "Stil",
  "subscript": "Tiefgestellt",
  "superscript": "Hochgestellt",
  "underline": "Unterstrichen",
  "unlink": "Hyperlink entfernen",
  "uploadFile": "Hochladen",
  "createTable": "Tabelle einfügen",
  "addColumnLeft": "Spalte links einfügen",
  "addColumnRight": "Spalte rechts einfügen",
  "addRowAbove": "Zeile oberhalb einfügen",
  "addRowBelow": "Zeile unterhalb einfügen",
  "deleteColumn": "Spalte löschen",
  "deleteRow": "Zeile löschen",
  "dropFilesHere": "drop files here to upload",
  "formatting": "Format",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insert file"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Löschen",
  "filter": "Filter",
  "isFalse": "ist falsch",
  "isTrue": "ist richtig",
  "operator": "Operator"
});
}
/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "Und",
  "clear": "Löschen",
  "filter": "Filter",
  "info": "Zeigt Zeilen mit Werten, die",
  "isFalse": "ist falsch",
  "isTrue": "ist richtig",
  "or": "Oder",
  "selectValue": "-Wählen Sie-",
  "cancel": "Abbrechen",
  "operator": "Operator",
  "value": "Wert"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Abbrechen",
    "cancel": "Änderungen verwerfen",
    "create": "Neuen Datensatz hinzufügen",
    "destroy": "Löschen",
    "edit": "Bearbeiten",
    "save": "Änderungen speichern",
    "select": "Wähle",
    "update": "Aktualisiere"
  },
  "editable": {
    "confirmation": "Sind Sie sicher, dass Sie diesen Datensatz löschen wollen?",
    "cancelDelete": "Abbrechen",
    "confirmDelete": "Löschen"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Ziehen Sie eine Spaltenüberschrift hierher, um nach dieser Spalte zu gruppieren"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "display": "Anzeigen der Elemente {0} - {1} von {2}",
  "empty": "keine Daten",
  "first": "Gehen Sie zur ersten Seite",
  "itemsPerPage": "Elemente pro Seite",
  "last": "Gehen Sie zur letzten Seite",
  "next": "Gehen Sie zur nächsten Seite",
  "of": "von {0}",
  "page": "Seite",
  "previous": "Gehen Sie zur vorherigen Seite",
  "refresh": "Aktualisieren",
  "morePages": "Weitere Seiten"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Beenden",
  "dropFilesHere": "Dateien hier fallen lassen zum Hochladen",
  "remove": "Löschen",
  "retry": "Wiederholen",
  "select": "Wählen Sie...",
  "statusFailed": "nicht erfolgreich",
  "statusUploaded": "hochgeladet",
  "statusUploading": "hochladen",
  "uploadSelectedFiles": "Dateien hochladen",
  "headerStatusUploaded": "Abgeschlossen",
  "headerStatusUploading": "Hochladen..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "Ganzer Tag",
  "cancel": "Abbrechen",
  "confirmation": "Möchten Sie diesen Termin wirklich löschen?",
  "date": "Datum",
  "destroy": "Löschen",
  "editor": {
    "allDayEvent": "Ganztägiger Termin",
    "description": "Beschreibung",
    "editorTitle": "Termin",
    "end": "Beenden",
    "endTimezone": "Zeitzone Ende",
    "repeat": "Wiederholen",
    "separateTimezones": "Unterschiedliche Start- und Endzeitzonen benutzen",
    "start": "Starten",
    "startTimezone": "Zeitzone Start",
    "timezone": "Zeitzonen bearbeiten",
    "timezoneEditorButton": "Zeitzone",
    "timezoneEditorTitle": "Zeitzonen",
    "title": "Titel",
    "noTimezone": "No timezone"
  },
  "event": "Termin",
  "recurrenceMessages": {
    "deleteRecurring": "Möchten Sie nur diesen Termin oder alle Wiederholungen löschen?",
    "deleteWindowOccurrence": "Diesen Termin löschen",
    "deleteWindowSeries": "Alle Wiederholungen des Termins löschen",
    "deleteWindowTitle": "Diesen Termin und alle Wiederholungen löschen",
    "editRecurring": "Möchten Sie nur diesen Termin oder alle Wiederholungen löschen?",
    "editWindowOccurrence": "Aktuelles Ereignis bearbeiten",
    "editWindowSeries": "Serie bearbeiten",
    "editWindowTitle": "Wiederholungs-Eintrag bearbeiten"
  },
  "save": "Speichern",
  "time": "Zeit",
  "today": "Heute",
  "views": {
    "agenda": "Agenda",
    "day": "Tag",
    "month": "Monat",
    "week": "Woche",
    "workWeek": "Work Week"
  },
  "deleteWindowTitle": "Termin löschen",
  "showFullDay": "Ganzen Tag anzeigen",
  "showWorkDay": "Geschäftszeiten anzeigen"
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} ist notwendig",
  "pattern": "{0} ist ungültig",
  "min": "{0} muss größer oder gleich sein als {1}",
  "max": "{0} muss kleiner oder gleich sein als {1}",
  "step": "{0} ist ungültig",
  "email": "{0} ist keine gültige E-Mail",
  "url": "{0} ist keine gültige URL",
  "date": "{0} ist kein gültiges Datum"
});
}

(function ($, undefined) {
  /* Filter cell operator messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "date": {
          "eq": "gleich ist",
          "gt": "später ist als",
          "gte": "gleich oder später ist als",
          "lt": "früher ist als",
          "lte": "früher oder gleich ist als",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "number": {
          "eq": "gleich ist",
          "gt": "größer ist als",
          "gte": "größer als oder gleich ist",
          "lt": "kleiner ist",
          "lte": "kleiner als oder gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "string": {
          "contains": "beinhaltet",
          "doesnotcontain": "nicht beinhaltet",
          "endswith": "endet mit",
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "startswith": "beginnt mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist"
        }
      });
  }

  /* Filter menu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "date": {
          "eq": "gleich ist",
          "gt": "später ist als",
          "gte": "gleich oder später ist als",
          "lt": "früher ist als",
          "lte": "früher oder gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "number": {
          "eq": "gleich ist",
          "gt": "größer ist als",
          "gte": "größer als oder gleich ist",
          "lt": "kleiner ist als",
          "lte": "kleiner als oder gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "string": {
          "contains": "beinhaltet",
          "doesnotcontain": "nicht beinhaltet",
          "endswith": "endet mit",
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "startswith": "beginnt mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist"
        }
      });
  }

  /* FilterCell messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
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
      $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
        "and": "und",
        "clear": "Löschen",
        "filter": "Filtern",
        "info": "Zeilen mit Wert anzeigen, der",
        "isFalse": "falsch",
        "isTrue": "richtig",
        "or": "oder",
        "selectValue": "-Wählen Sie-",
        "cancel": "Abbrechen",
        "operator": "Operator",
        "value": "Wert"
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Alle auswählen",
        "clear": "Löschen",
        "filter": "Filtern",
        "search": "Suchen",
        "selectedItemsFormat": "{0} Element(e) ausgewählt"
      });
  }

  /* ColumnMenu messages */

  if (kendo.ui.ColumnMenu) {
    kendo.ui.ColumnMenu.prototype.options.messages =
      $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
        "columns": "Spalten",
        "sortAscending": "Aufsteigend sortieren",
        "sortDescending": "Absteigend sortieren",
        "settings": "Spalteneinstellungen",
        "done": "Erledigt",
        "lock": "Sperren",
        "unlock": "Entsperren",
        "filter": "Filtern"
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
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
          "mobileLabel": "Endet"
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
      $.extend(true, kendo.ui.Editor.prototype.options.messages, {
        "backColor": "Hintergrundfarbe",
        "bold": "Fett",
        "createLink": "Hyperlink einfügen",
        "deleteFile": "Sind Sie sicher, dass Sie \"{0}\" löschen wollen?",
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
        "imageWidth": "Breite (px)",
        "imageHeight": "Höhe (px)",
        "indent": "Einzug vergrößern",
        "insertHtml": "HTML einfügen",
        "insertImage": "Bild einfügen",
        "insertOrderedList": "Numerierte Liste",
        "insertUnorderedList": "Aufzählliste",
        "invalidFileType": "Die ausgewählte Datei \"{0}\" ist ungültig. Unterstützte Dateitypen sind {1}.",
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
        "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
        "formatting": "Format",
        "viewHtml": "View HTML",
        "dialogUpdate": "Aktualisieren",
        "insertFile": "Datei einfügen",
        "dialogOk": "OK",
        "tableWizard": "Tabellen-Assistent",
        "tableTab": "Tabelle",
        "cellTab": "Tabellenzelle",
        "accessibilityTab": "Zugänglichkeit",
        "caption": "Erklärung",
        "summary": "Zusammenfassung",
        "width": "Breite",
        "height": "Höhe",
        "cellSpacing": "Zellabstand",
        "cellPadding": "Zellauffüllung",
        "cellMargin": "Zellenrand",
        "alignment": "Ausrichtung",
        "background": "Hintergrund",
        "cssClass": "CSS Klasse",
        "id": "Id",
        "border": "Rahmen",
        "borderStyle": "Rahmenstil",
        "collapseBorders": "Collapse rahmen",
        "wrapText": "Texthülle",
        "associateCellsWithHeaders": "Zellen mit header verbinden",
        "alignLeft": "Ausrichten links",
        "alignCenter": "Ausrichten zentriert",
        "alignRight": "Ausrichten rechts",
        "alignLeftTop": "Ausrichten links und oben",
        "alignCenterTop": "Ausrichten zentriert und oben",
        "alignRightTop": "Ausrichten rechts und oben",
        "alignLeftMiddle": "Ausrichten links und mitte",
        "alignCenterMiddle": "Ausrichten zentriert und mitte",
        "alignRightMiddle": "Ausrichten rechts und mitte",
        "alignLeftBottom": "Ausrichten links und unten",
        "alignCenterBottom": "Ausrichten zentriert und unten",
        "alignRightBottom": "Ausrichten rechts und unten",
        "alignRemove": "Ausrichtung entfernen",
        "columns": "Spalten",
        "rows": "Reihen",
        "selectAllCells": "Alle Tabellenzellen auswählen"
      });
  }

  /* FileBrowser and ImageBrowser messages */

  var browserMessages = {
    "uploadFile": "Hochladen",
    "orderBy": "Sortieren nach",
    "orderByName": "Name",
    "orderBySize": "Größe",
    "directoryNotFound": "Das Verzeichnis wurde nicht gefunden.",
    "emptyFolder": "Leeres Verzeichnis",
    "deleteFile": 'Sind Sie sicher, dass Sie "{0}" wirklich löschen wollen?',
    "invalidFileType": "Die ausgewählte Datei \"{0}\" ist ungültig. Unterstützte Dateitypen sind {1}.",
    "overwriteFile": "Eine Datei namens \"{0}\" existiert bereits im aktuellen Ordner. Überschreiben?",
    "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
    "search": "Suchen"
  };

  if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, browserMessages);
  }

  if (kendo.ui.ImageBrowser) {
    kendo.ui.ImageBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.ImageBrowser.prototype.options.messages, browserMessages);
  }

  /* Gantt messages */

  if (kendo.ui.Gantt) {
    kendo.ui.Gantt.prototype.options.messages =
      $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
        "actions": {
          "addChild": "Unteraufgabe hinzufügen",
          "append": "Aufgabe hinzufügen",
          "insertAfter": "Unter einfügen",
          "insertBefore": "Über einfügen",
          "pdf": "Exportieren als PDF"
        },
        "cancel": "Abbrechen",
        "deleteDependencyWindowTitle": "Beziehung löschen",
        "deleteTaskWindowTitle": "Aufgabe löschen",
        "destroy": "Löschen",
        "editor": {
          "assingButton": "Zuweisen",
          "editorTitle": "Aufgabe",
          "end": "Ende",
          "percentComplete": "abgeschlossen",
          "resources": "Ressourcen",
          "resourcesEditorTitle": "Ressourcen",
          "resourcesHeader": "Ressourcen",
          "start": "Start",
          "title": "Titel",
          "unitsHeader": "Einheiten"
        },
        "save": "Speichern",
        "views": {
          "day": "Tag",
          "end": "Ende",
          "month": "Monat",
          "start": "Start",
          "week": "Woche",
          "year": "Jahr"
        }
      });
  }

  /* Grid messages */

  if (kendo.ui.Grid) {
    kendo.ui.Grid.prototype.options.messages =
      $.extend(true, kendo.ui.Grid.prototype.options.messages, {
        "commands": {
          "canceledit": "Abbrechen",
          "cancel": "Änderungen verwerfen",
          "create": "Neuen Datensatz hinzufügen",
          "destroy": "Löschen",
          "edit": "Bearbeiten",
          "excel": "Exportieren als Excel",
          "pdf": "Exportieren als PDF",
          "save": "Änderungen speichern",
          "select": "Wähle",
          "update": "Aktualisieren"
        },
        "editable": {
          "confirmation": "Sind Sie sicher, dass Sie diesen Datensatz löschen wollen?",
          "cancelDelete": "Abbrechen",
          "confirmDelete": "Löschen"
        },
        "noRecords": "Keine Datensätze verfügbar."
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Keine Datensätze verfügbar.",
        "loading": "Lade Daten...",
        "requestFailed": "Laden fehlgeschlagen",
        "retry": "Neu laden",
        "commands": {
          "edit": "Bearbeiten",
          "update": "Aktualisieren",
          "canceledit": "Abbrechen",
          "create": "Neuen Datensatz hinzufügen",
          "createchild": "Neuen untergeordneten Datensatz hinzufügen",
          "destroy": "Löschen",
          "excel": "Exportieren als Excel",
          "pdf": "Exportieren als PDF"
        }
      });
  }

  /* Groupable messages */

  if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
      $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
        "empty": "Ziehen Sie eine Spaltenüberschrift hierher, um nach dieser Spalte zu gruppieren"
      });
  }

  /* NumericTextBox messages */

  if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
      $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
        "upArrowText": "Wert erhöhen",
        "downArrowText": "Wert verringern"
      });
  }

  /* Pager messages */

  if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
      $.extend(true, kendo.ui.Pager.prototype.options.messages, {
        "allPages": "Alle",
        "display": "Einträge {0} - {1} von {2}",
        "empty": "keine Daten",
        "first": "Zur ersten Seite",
        "itemsPerPage": "Elemente pro Seite",
        "last": "Zur letzten Seite",
        "next": "Zur nächsten Seite",
        "of": "von {0}",
        "page": "Seite",
        "previous": "Zur vorherigen Seite",
        "refresh": "Aktualisieren",
        "morePages": "Weitere Seiten"
      });
  }

  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "cancel": "Beenden",
        "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
        "remove": "Löschen",
        "retry": "Wiederholen",
        "select": "Wählen Sie...",
        "statusFailed": "nicht erfolgreich",
        "statusWarning": "Warnung",
        "statusUploaded": "hochgeladen",
        "statusUploading": "hochladen",
        "uploadSelectedFiles": "Dateien hochladen",
        "headerStatusUploaded": "Hochgeladen",
        "headerStatusUploading": "Hochladen..."
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "Ganzer Tag",
        "cancel": "Abbrechen",
        "date": "Datum",
        "destroy": "Löschen",
        "pdf": "Exportieren als PDF",
        "editable": {
          "confirmation": "Möchten Sie diesen Termin wirklich löschen?"
        },
        "editor": {
          "allDayEvent": "Ganztägiger Termin",
          "description": "Beschreibung",
          "editorTitle": "Termin",
          "end": "Beenden",
          "timezoneTitle": "Zeitzone",
          "endTimezone": "Zeitzone Ende",
          "repeat": "Wiederholen",
          "separateTimezones": "Unterschiedliche Start- und Endzeitzonen benutzen",
          "start": "Starten",
          "startTimezone": "Zeitzone Start",
          "timezone": "Zeitzonen bearbeiten",
          "timezoneEditorButton": "Zeitzone",
          "timezoneEditorTitle": "Zeitzonen",
          "title": "Titel",
          "noTimezone": "Keine Zeitzone"
        },
        "event": "Termin",
        "recurrenceMessages": {
          "deleteRecurring": "Möchten Sie nur diesen Termin oder alle Wiederholungen löschen?",
          "deleteWindowOccurrence": "Diesen Termin löschen",
          "deleteWindowSeries": "Alle Wiederholungen des Termins löschen",
          "deleteWindowTitle": "Diesen Termin und alle Wiederholungen löschen",
          "editRecurring": "Möchten Sie nur diesen Termin oder alle Wiederholungen bearbeiten?",
          "editWindowOccurrence": "Aktuelles Ereignis bearbeiten",
          "editWindowSeries": "Serie bearbeiten",
          "editWindowTitle": "Wiederholungseintrag bearbeiten"
        },
        "save": "Speichern",
        "time": "Zeit",
        "today": "Heute",
        "views": {
          "agenda": "Agenda",
          "day": "Tag",
          "month": "Monat",
          "week": "Woche",
          "workWeek": "Arbeitswoche",
          "timeline": "Zeitstrahl",
          "timelineWeek": "Zeitstrahl Woche",
          "timelineWorkWeek": "Zeitstrahl Arbeitswoche",
          "timelineMonth": "Zeitstrahl Monat"
        },
        "deleteWindowTitle": "Termin löschen",
        "defaultRowText": "Alle Termine",
        "showFullDay": "Ganzen Tag anzeigen",
        "showWorkDay": "Geschäftszeiten anzeigen",
        "ariaSlotLabel": "Ausgewählt von {0:t} bis {1:t}",
        "ariaEventLabel": "{0} am {1:D} um {2:t}"
      });
  }

  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
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

  /* Dialog */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.messages =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Schließen"
      });
  }

  /* Alert */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.messages =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "OK"
      });
  }

  /* Confirm */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.messages =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Abbrechen"
      });
  }

  /* Prompt */

  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.messages =
      $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Abbrechen"
      });
  }

})(window.kendo.jQuery);
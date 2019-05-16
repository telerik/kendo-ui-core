(function ($, undefined) {
  /* FlatColorPicker messages */

  if (kendo.ui.FlatColorPicker) {
  kendo.ui.FlatColorPicker.prototype.options.messages =
  $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
    "apply": "Anwenden",
    "cancel": "Abbrechen",
    "noColor": "keine Farbe",
    "clearColor": "Farbe löschen"
  });
  }

  /* ColorPicker messages */

  if (kendo.ui.ColorPicker) {
   kendo.ui.ColorPicker.prototype.options.messages =
  $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
    "apply": "Anwenden",
    "cancel": "Abbrechen",
    "noColor": "keine Farbe",
    "clearColor": "Farbe löschen"
  });
  }
  
  /* ColumnMenu messages */

  if (kendo.ui.ColumnMenu) {
  kendo.ui.ColumnMenu.prototype.options.messages =
  $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
    "sortAscending": "Aufsteigend sortieren",
    "sortDescending": "Absteigend sortieren",
    "filter": "Filtern",
    "columns": "Spalten",
    "done": "Erledigt",
    "settings": "Spalteneinstellungen",
    "lock": "Sperren",
    "unlock": "Entsperren"
  });
  }

  /* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {
  kendo.ui.DateRangePicker.prototype.options.messages =
  $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages,{
    "startLabel": "Start",
    "endLabel": "End"
  });
  }
  
  /* Editor messages */

  if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
      $.extend(true, kendo.ui.Editor.prototype.options.messages, {
        "bold": "Fett",
        "italic": "Kursiv",
        "underline": "Unterstrichen",
        "strikethrough": "Durchgestrichen",
        "superscript": "Hochgestellt",
        "subscript": "Tiefgestellt",
        "justifyCenter": "Zentriert",
        "justifyLeft": "Linksbündig",
        "justifyRight": "Rechtsbündig",
        "justifyFull": "Ausrichten",
        "insertUnorderedList": "Aufzählliste",
        "insertOrderedList": "Numerierte Liste",
        "indent": "Einzug vergrössern",
        "outdent": "Einzug verkleinern",
        "createLink": "Hyperlink einfügen",
        "unlink": "Hyperlink entfernen",
        "insertImage": "Bild einfügen",
        "insertFile": "Datei einfügen",
        "insertHtml": "HTML einfügen",
        "viewHtml": "HTML anzeigen",
        "fontName": "Schriftart",
        "fontNameInherit": "(Schrift übernehmen)",
        "fontSize": "Schriftgrösse",
        "fontSizeInherit": "(Grösse übernehmen)",
        "formatBlock": "Absatzstil",
        "formatting": "Format",
        "foreColor": "Farbe",
        "backColor": "Hintergrundfarbe",
        "styles": "Stil",
        "emptyFolder": "Leeres Verzeichnis",
        "uploadFile": "Hochladen",
        "overflowAnchor": "Weitere...",
        "orderBy": "Sortiert nach:",
        "orderBySize": "Grösse",
        "orderByName": "Name",
        "invalidFileType": "Die ausgewählte Datei \"{0}\" ist ungültig. Unterstützte Dateitypen sind {1}.",
        "deleteFile": "Sind Sie sicher, dass Sie \"{0}\" löschen wollen?",
        "overwriteFile": "Eine Datei mit dem Namen \"{0}\" existiert bereits im aktuellen Verzeichnis. Wollen Sie diese überschreiben?",
        "directoryNotFound": "Kein Verzeichnis mit diesem Namen gefunden",
        "imageWebAddress": "Web-Adresse",
        "imageAltText": "Alternativer Text",
        "imageWidth": "Breite (px)",
        "imageHeight": "Höhe (px)",
        "fileWebAddress": "Web-Adresse",
        "fileTitle": "Titel",
        "linkWebAddress": "Web-Adresse",
        "linkText": "Text",
        "linkToolTip": "ToolTip",
        "linkOpenInNewWindow": "Link in einem neuen Fenster öffnen",
        "dialogUpdate": "Aktualisieren",
        "dialogInsert": "Einfügen",
        "dialogButtonSeparator": "oder",
        "dialogCancel": "Abbrechen",
        "cleanFormatting": "Formatierung entfernen",
        "createTable": "Tabelle einfügen",
        "addColumnLeft": "Spalte links einfügen",
        "addColumnRight": "Spalte rechts einfügen",
        "addRowAbove": "Zeile oberhalb einfügen",
        "addRowBelow": "Zeile unterhalb einfügen",
        "deleteRow": "Zeile löschen",
        "deleteColumn": "Spalte löschen",
        "dialogOk": "OK",
        "tableWizard": "Tabellen-Assistent",
        "tableTab": "Tabelle",
        "cellTab": "Zelle",
        "accessibilityTab": "Zugänglichkeit",
        "caption": "Beschriftung",
        "summary": "Zusammenfassung",
        "width": "Breite",
        "height": "Höhe",
        "units": "Einheiten",
        "cellSpacing": "Zellabstand",
        "cellPadding": "Textabstand",
        "cellMargin": "Zellenrand",
        "alignment": "Ausrichtung",
        "background": "Hintergrund",
        "cssClass": "CSS Klasse",
        "id": "Id",
        "border": "Rahmen",
        "borderStyle": "Rahmenstil",
        "collapseBorders": "Rahmen ausblenden",
        "wrapText": "Zeilenumbruch",
        "associateCellsWithHeaders": "Zellen mit Überschrift verbinden",
        "alignLeft": "links ausrichten",
        "alignCenter": "zentrieren",
        "alignRight": "rechts ausrichten",
        "alignLeftTop": "links oben ausrichten",
        "alignCenterTop": "zentrieren und oben ausrichten",
        "alignRightTop": "rechts oben ausrichten",
        "alignLeftMiddle": "links mittig ausrichten",
        "alignCenterMiddle": "zentrieren und mittig ausrichten",
        "alignRightMiddle": "rechts mittig ausrichten",
        "alignLeftBottom": "links unten ausrichten",
        "alignCenterBottom": "zentrieren und unten ausrichten",
        "alignRightBottom": "rechts unten ausrichten",
        "alignRemove": "Ausrichtung entfernen",
        "columns": "Spalten",
        "rows": "Zeilen",
        "selectAllCells": "Alle Zellen auswählen"
      });
  }

  /* FileBrowser messages */

  if (kendo.ui.FileBrowser) {
  kendo.ui.FileBrowser.prototype.options.messages =
  $.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
    "uploadFile": "Hochladen",
    "orderBy": "Sortieren nach",
    "orderByName": "Name",
    "orderBySize": "Grösse",
    "directoryNotFound": "Das Verzeichnis wurde nicht gefunden.",
    "emptyFolder": "Leeres Verzeichnis",
    "deleteFile": 'Sind Sie sicher, dass Sie "{0}" wirklich löschen wollen?',
    "invalidFileType": "Die ausgewählte Datei \"{0}\" ist ungültig. Unterstützte Dateitypen sind {1}.",
    "overwriteFile": "Eine Datei namens \"{0}\" existiert bereits im aktuellen Ordner. Überschreiben?",
    "dropFilesHere": "Datei zum Hochladen hierhin ziehen",
    "search": "Suchen"
  });
  }
  
  /* FilterCell messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
        "isTrue": "ist wahr",
        "isFalse": "ist falsch",
        "filter": "Filter",
        "clear": "Löschen",
        "operator": "Operator"
      });
  }

  /* FilterCell operators */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "string": {
          "eq": "ist gleich",
          "neq": "ist nicht gleich",
          "startswith": "beginnt mit",
          "contains": "enthält",
          "doesnotcontain": "enthält nicht",
          "endswith": "endet mit",
          "isnull": "ist Null",
          "isnotnull": "ist nicht Null",
          "isempty": "ist leer",
          "isnotempty": "ist nicht leer",
          "isnullorempty": "hat keinen Wert",
          "isnotnullorempty": "hat einen Wert"
        },
        "number": {
          "eq": "ist gleich",
          "neq": "ist nicht gleich",
          "gte": "grösser oder gleich",
          "gt": "grösser als",
          "lte": "kleiner oder gleich",
          "lt": "kleiner als",
          "isnull": "ist Null",
          "isnotnull": "ist nicht Null",
        },
        "date": {
          "eq": "ist gleich",
          "neq": "ist nicht gleich",
          "gte": "später oder gleich",
          "gt": "später als",
          "lte": "früher oder gleich",
          "lt": "früher als",
          "isnull": "ist Null",
          "isnotnull": "ist nicht Null",
        },
        "enums": {
          "eq": "ist gleich",
          "neq": "ist nicht gleich",
          "isnull": "ist Null",
          "isnotnull": "ist nicht Null",
        }
      });
  }

  /* FilterMenu messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
        "info": "Filter:",
        "title": "Filter",
        "isTrue": "wahr",
        "isFalse": "falsch",
        "filter": "Filtern",
        "clear": "Löschen",
        "and": "Und",
        "or": "Oder",
        "selectValue": "-Wählen Sie-",
        "operator": "Operator",
        "value": "Wert",
        "cancel": "Abbrechen"
      });
  }

  /* FilterMenu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "string": {
          "eq": "ist gleich",
          "neq": "ist nicht gleich",
          "startswith": "beginnt mit",
          "contains": "enthält",
          "doesnotcontain": "enthält nicht",
          "endswith": "endet mit",
          "isnull": "is Null",
          "isnotnull": "ist nicht Null",
          "isempty": "ist leer",
          "isnotempty": "ist nicht leer",
          "isnullorempty": "hat keinen Wert",
          "isnotnullorempty": "hat einen Wert"
        },
        "number": {
          "eq": "ist gleich",
          "neq": "ist nicht gleich",
          "gte": "grösser oder gleich",
          "gt": "grösser als",
          "lte": "kleiner oder gleich",
          "lt": "kleiner als",
          "isnull": "is Null",
          "isnotnull": "ist nicht Null",
        },
        "date": {
          "eq": "ist gleich",
          "neq": "ist nicht gleich",
          "gte": "später oder gleich",
          "gt": "später als",
          "lte": "früher oder gleich",
          "lt": "früher als",
          "isnull": "is Null",
          "isnotnull": "ist nicht Null",
        },
        "enums": {
          "eq": "ist gleich",
          "neq": "ist nicht gleich",
          "isnull": "is Null",
          "isnotnull": "ist nicht Null",
        }
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Alle auswählen",
        "clear": "Löschen",
        "filter": "Filtern",
        "search": "Suchen"
      });
  }

  /* Grid messages */

  if (kendo.ui.Grid) {
    kendo.ui.Grid.prototype.options.messages =
      $.extend(true, kendo.ui.Grid.prototype.options.messages, {
        "commands": {
          "cancel": "Änderungen verwerfen",
          "canceledit": "Abbrechen",
          "create": "Neuen Datensatz hinzufügen",
          "destroy": "Löschen",
          "edit": "Bearbeiten",
          "excel": "Exportieren als Excel",
          "pdf": "Exportieren als PDF",
          "save": "Änderungen speichern",
          "select": "Auswählen",
          "update": "Aktualisieren"
        },
        "editable": {
          "cancelDelete": "Abbrechen",
          "confirmation": "Sind Sie sicher, dass Sie diesen Datensatz löschen wollen?",
          "confirmDelete": "Löschen"
        },
        "noRecords": "Keine Datensätze verfügbar.",
        "expandCollapseColumnHeader": "",
        "groupHeader": "Ctrl + Leerschlag für Gruppieren",
        "ungroupHeader": "Ctrl + Leerschlag für Gruppierung aufheben"  
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Keine Datensätze gefunden",
        "loading": "Lade Daten...",
        "requestFailed": "Laden fehlgeschlagen",
        "retry": "Neu laden",
        "commands": {
          "edit": "Bearbeiten",
          "update": "Aktualisieren",
          "canceledit": "Abbrechen",
          "create": "Neuen Datensatz erstellen",
          "createchild": "Kind-Datensatz erstellen",
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

  /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
  kendo.ui.MediaPlayer.prototype.options.messages =
  $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
    "pause": "Pause",
    "play": "Play",
    "mute": "Mute",
    "unmute": "Unmute",
    "quality": "Quality",
    "fullscreen": "Vollbild"
  });
  }
  
  /* Pager messages */

  if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
      $.extend(true, kendo.ui.Pager.prototype.options.messages, {
        "allPages": "Alle",
        "display": "{0} - {1} von {2} Einträgen",
        "empty": "keine Daten",
        "page": "Seite",
        "of": "von {0}",
        "itemsPerPage": "Einträge pro Seite",
        "first": "Zur ersten Seite",
        "previous": "Zur vorherigen Seite",
        "next": "Zur nächsten Seite",
        "last": "Zur letzten Seite",
        "refresh": "Aktualisieren",
        "morePages": "Weitere Seiten"
      });
  }

  /* TreeListPager messages */

  if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
      $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
        "allPages": "Alle",
        "display": "{0} - {1} von {2} Einträgen",
        "empty": "keine Daten",
        "page": "Seite",
        "of": "von {0}",
        "itemsPerPage": "Einträge pro Seite",
        "first": "Zur ersten Seite",
        "previous": "Zur vorherigen Seite",
        "next": "Zur nächsten Seite",
        "last": "Zur letzten Seite",
        "refresh": "Aktualisieren",
        "morePages": "Weitere Seiten"
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "frequencies": {
          "never": "Nie",
          "hourly": "Stündlich",
          "daily": "Täglich",
          "weekly": "Wöchentlich",
          "monthly": "Monatlich",
          "yearly": "Jährlich"
        },
        "hourly": {
          "repeatEvery": "Wiederholen zu jeder:",
          "interval": " Stunde(n)"
        },
        "daily": {
          "repeatEvery": "Wiederholen an jedem:",
          "interval": "Tag(e)"
        },
        "weekly": {
          "interval": "Woche(n)",
          "repeatEvery": "Wiederhole jede:",
          "repeatOn": "Wiederholen am:"
        },
        "monthly": {
          "repeatEvery": "Wiederholen an jedem:",
          "repeatOn": "Wiederholen am:",
          "interval": "Monat(e)",
          "day": "Tag"
        },
        "yearly": {
          "repeatEvery": "Wiederholes jedes:",
          "repeatOn": "Wiederholen am:",
          "interval": "Jahr(e)",
          "of": "von"
        },
        "end": {
          "label": "Beenden:",
          "mobileLabel": "Endet",
          "never": "Nie",
          "after": "Nach",
          "occurrence": "Anzahl Wiederholungen",
          "on": "Am"          
        },
        "offsetPositions": {
          "first": "ersten",
          "second": "zweiten",
          "third": "dritten",
          "fourth": "vierten",
          "last": "letzten"
        },
        "weekdays": {
          "day": "Tag",
          "weekday": "Wochentag",
          "weekend": "Tag am Wochenende"
        }
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "Ganzer Tag",
        "date": "Datum",
        "event": "Termin",
        "time": "Zeit",
        "showFullDay": "Ganzen Tag anzeigen",
        "showWorkDay": "Geschäftszeiten anzeigen",
        "today": "Heute",
        "save": "Speichern",
        "cancel": "Abbrechen",
        "destroy": "Löschen",
        "resetSeries": "Reset Series",
        "deleteWindowTitle": "Termin löschen",
        "ariaSlotLabel": "Ausgewählt von {0:t} bis {1:t}",
        "ariaEventLabel": "{0} am {1:D} um {2:t}",
        "editable": {
          "confirmation": "Möchten Sie diesen Termin wirklich löschen?"
        },
        "views": {
          "day": "Tag",
          "week": "Woche",
          "workWeek": "Arbeitswoche",
          "agenda": "Agenda",
          "month": "Monat"
        },
        "recurrenceMessages": {
          "deleteWindowTitle": "Wiederholungen löschen",
          "resetSeriesWindowTitle": "Terminserie zurücksetzen",
          "deleteWindowOccurrence": "Aktuelles Ereignis löschen",
          "deleteWindowSeries": "Terminserie löschen",
          "deleteRecurringConfirmation": "Möchten Sie dieses Ereignis wirklich löschen?",
          "deleteSeriesConfirmation": "Möchten Sie wirklich die ganze Terminserie löschen?",
          "editWindowTitle": "Wiederholungen bearbeiten",
          "editWindowOccurrence": "Aktuelles Ereignis bearbeiten",
          "editWindowSeries": "Terminserie bearbeiten",
          "deleteRecurring": "Möchten Sie nur dieses Ereignis oder alle Wiederholungen löschen?",
          "editRecurring": "Möchten Sie nur dieses Ereignis oder alle Wiederholungen bearbeiten?"
        },
        "editor": {
          "title": "Titel",
          "start": "Starten",
          "end": "Beenden",
          "allDayEvent": "Ganztägiger Termin",
          "description": "Beschreibung",
          "repeat": "Wiederholen",
          "timezone": "Zeitzonen",
          "startTimezone": "Zeitzone Start",
          "endTimezone": "Zeitzone Ende",
          "separateTimezones": "Unterschiedliche Start- und Endzeitzonen benutzen",
          "timezoneEditorTitle": "Zeitzonen",
          "timezoneEditorButton": "Zeitzone",
          "timezoneTitle": "Zeitzone",
          "noTimezone": "Keine Zeitzone",
          "editorTitle": "Ereignis"
        }
      });
  }

  /* Slider messages */

  if (kendo.ui.Slider) {
    kendo.ui.Slider.prototype.options =
      $.extend(true, kendo.ui.Slider.prototype.options,{
        "increaseButtonTitle": "Erhöhen",
        "decreaseButtonTitle": "Reduzieren"
      });
  }
  
  /* ListBox messaages */
  
  if (kendo.ui.ListBox) {
    kendo.ui.ListBox.prototype.options.messages =
      $.extend(true, kendo.ui.ListBox.prototype.options.messages,{
        "tools": {
          "remove": "Delete",
          "moveUp": "Nach oben",
          "moveDown": "Nach unten",
          "transferTo": "Verschieben nach",
          "transferFrom": "Verschieben von",
          "transferAllTo": "Alle verschieben nach",
          "transferAllFrom": "Alle verschieben von"
        }
      });
  }
  
  /* TreeView messages */

  if (kendo.ui.TreeView) {
    kendo.ui.TreeView.prototype.options.messages =
      $.extend(true, kendo.ui.TreeView.prototype.options.messages,{
        "loading": "Loading...",
        "requestFailed": "Request failed.",
        "retry": "Wiederholen"
      });
  }
  
  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "select": "Wählen Sie...",
        "cancel": "Abbrechen",
        "retry": "Wiederholen",
        "remove": "Entfernen",
        "clearSelectedFiles": "Löschen",
        "uploadSelectedFiles": "Dateien hochladen",
        "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
        "statusUploading": "hochladen",
        "statusUploaded": "hochgeladen",
        "statusWarning": "Warnung",
        "statusFailed": "nicht erfolgreich",
        "headerStatusUploading": "Hochladen...",
        "headerStatusUploaded": "Hochgeladen",
        "invalidMaxFileSize": "Datei ist zu gross.",
        "invalidMinFileSize": "Datei ist zu klein.",
        "invalidFileExtension": "unerlaubter Dateityp"
      });
  }

  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
        "required": "{0} ist notwendig",
        "pattern": "{0} ist ungültig",
        "min": "{0} muss grösser oder gleich sein als {1}",
        "max": "{0} muss kleiner oder gleich sein als {1}",
        "step": "{0} ist ungültig",
        "email": "{0} ist keine gültige E-Mail",
        "url": "{0} ist keine gültige URL",
        "date": "{0} ist kein gültiges Datum",
        "dateCompare": "Enddatum muss grösser oder gleich dem Startdatum sein"
      });
  }

  /* kendo.ui.progress method */
  if (kendo.ui.progress) {
    kendo.ui.progress.messages =
      $.extend(true, kendo.ui.progress.messages, {
        loading: "Loading..."
      });
  }

  /* Dialog */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.messages =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Schliessen"
      });
  }

  /* Calendar */
  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "weekColumnHeader": ""
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

  /* DateInput */
  if (kendo.ui.DateInput) {
    kendo.ui.DateInput.prototype.options.messages =
      $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
        "year": "Jahr",
        "month": "Monat",
        "day": "Tag",
        "weekday": "Wochentag",
        "hour": "Stunden",
        "minute": "Minuten",
        "second": "Sekunden",
        "dayperiod": "AM/PM"
      });
  }

})(window.kendo.jQuery);

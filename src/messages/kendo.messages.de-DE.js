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
        "indent": "Einzug vergrößern",
        "outdent": "Einzug verkleinern",
        "createLink": "Hyperlink einfügen",
        "unlink": "Hyperlink entfernen",
        "insertImage": "Bild einfügen",
        "insertFile": "Datei einfügen",
        "insertHtml": "HTML einfügen",
        "viewHtml": "HTML anzeigen",
        "fontName": "Schriftfamilie",
        "fontNameInherit": "(Schrift übernehmen)",
        "fontSize": "Größe",
        "fontSizeInherit": "(Größe übernehmen)",
        "formatBlock": "Absatzstil",
        "formatting": "Formatierung",
        "foreColor": "Farbe",
        "backColor": "Hintergrundfarbe",
        "style": "Stil",
        "emptyFolder": "Leeres Verzeichnis",
        "uploadFile": "Hochladen",
        "overflowAnchor": "Mehr...",
        "orderBy": "Sortiert nach:",
        "orderBySize": "Größe",
        "orderByName": "Name",
        "invalidFileType": "Die ausgewählte Datei \"{0}\" ist ungültig. Unterstützte Dateitypen sind {1}.",
        "deleteFile": "Sind Sie sicher, dass Sie \"{0}\" löschen wollen?",
        "overwriteFile": "Eine Datei mit dem Namen \"{0}\" existiert bereits im aktuellen Verzeichnis. Wollen Sie diese überschreiben?",
        "directoryNotFound": "Kein Verzeichnis mit diesem Namen gefunden",
        "imageWebAddress": "Web-Adresse",
        "imageAltText": "Abwechselnder Text",
        "imageWidth": "Breite (px)",
        "imageHeight": "Höhe (px)",
        "fileWebAddress": "Webadresse",
        "fileTitle": "Titel",
        "linkWebAddress": "Web-Adresse",
        "linkText": "Text",
        "linkToolTip": "ToolTip",
        "linkOpenInNewWindow": "Link in einem neuen Fenster öffnen",
        "dialogUpdate": "Aktualisieren",
        "dialogInsert": "Einfügen",
        "dialogButtonSeparator": "oder",
        "dialogCancel": "Abbrechen",
        "cleanFormatting": "Formatierung säubern",
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
        "cellTab": "Tabellenzelle",
        "accessibilityTab": "Zugänglichkeit",
        "caption": "Erklärung",
        "summary": "Zusammenfassung",
        "width": "Breite",
        "height": "Höhe",
        "units": "Einheiten",
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
        "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
        "search": "Suchen",
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

  /* Filter cell operator messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "string": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "startswith": "beginnt mit",
          "contains": "beinhaltet",
          "doesnotcontain": "nicht beinhaltet",
          "endswith": "endet mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist",
          "isnullorempty": "Hat einen Wert",
          "isnotnullorempty": "Hat keinen Wert"
        },
        "number": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "gt": "größer ist als",
          "gte": "größer als oder gleich ist",
          "lt": "kleiner ist",
          "lte": "kleiner als oder gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "date": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "gt": "später ist als",
          "gte": "gleich oder später ist als",
          "lt": "früher ist als",
          "lte": "früher oder gleich ist als",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        }
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

  /* Filter menu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "string": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "startswith": "beginnt mit",
          "contains": "beinhaltet",
          "doesnotcontain": "nicht beinhaltet",
          "endswith": "endet mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist",
          "isnullorempty": "Hat einen Wert",
          "isnotnullorempty": "Hat keinen Wert"
        },
        "number": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "gte": "größer als oder gleich ist",
          "gt": "größer ist als",
          "lte": "kleiner als oder gleich ist",
          "lt": "kleiner ist als",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "date": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "gte": "gleich oder später ist als",
          "gt": "später ist als",
          "lte": "früher oder gleich ist",
          "lt": "früher ist als",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich ist",
          "neq": "nicht gleich ist",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
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
        "search": "Suchen",
        "selectedItemsFormat": "{0} Element(e) ausgewählt"
      });
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
          "cancel": "Änderungen verwerfen",
          "canceledit": "Abbrechen",
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
          "cancelDelete": "Abbrechen",
          "confirmation": "Sind Sie sicher, dass Sie diesen Datensatz löschen wollen?",
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

  /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
    kendo.ui.MediaPlayer.prototype.options.messages =
      $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
        "pause": "Pause",
        "play": "Abspielen",
        "mute": "Stumm",
        "unmute": "Laut",
        "quality": "Qualität",
        "fullscreen": "Vollbild"
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

  /* PivotGrid messages */

  if (kendo.ui.PivotGrid) {
    kendo.ui.PivotGrid.prototype.options.messages =
      $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
        "measureFields": "Hier Datenfelder ablegen",
        "columnFields": "Hier Spaltenfelder ablegen",
        "rowFields": "Hier Zielenfelder ablegen"
      });
  }

  /* PivotFieldMenu messages */

  if (kendo.ui.PivotFieldMenu) {
    kendo.ui.PivotFieldMenu.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
        "info": "Elemente zeigen, die:",
        "filterFields": "Feldfilter",
        "filter": "Filter",
        "include": "Felder einschliessen...",
        "title": "Einzuschliessende Felder",
        "clear": "Löschen",
        "ok": "Ok",
        "cancel": "Abbrechen",
        "operators": {
          "contains": "Enthält",
          "doesnotcontain": "Enthält nicht",
          "startswith": "Beginnt mit",
          "endswith": "Endet mit",
          "eq": "Ist gleich",
          "neq": "Ist nicht gleich"
        }
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
        "daily": {
          "repeatEvery": "Wiederholen an jedem:",
          "interval": "Tag(e)"
        },
        "weekly": {
          "interval": "Woche(n)",
          "repeatEvery": "Wiederholen an jedem:",
          "repeatOn": "Wiederholen am:"
        },
        "monthly": {
          "repeatEvery": "Wiederholen an jedem:",
          "repeatOn": "Wiederholen am:",
          "interval": "Monat(e)",
          "day": "Tag"
        },
        "yearly": {
          "repeatEvery": "Wiederholen an jedem:",
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
          "month": "Monat",
          "timeline": "Zeitstrahl",
          "timelineWeek": "Zeitstrahl Woche",
          "timelineWorkWeek": "Zeitstrahl Arbeitswoche",
          "timelineMonth": "Zeitstrahl Monat"
        },
        "recurrenceMessages": {
          "deleteWindowTitle": "Diesen Termin und alle Wiederholungen löschen",
          "deleteWindowOccurrence": "Diesen Termin löschen",
          "deleteWindowSeries": "Alle Wiederholungen des Termins löschen",
          "editWindowSeries": "Serie bearbeiten",
          "editWindowOccurrence": "Aktuelles Ereignis bearbeiten",
          "editWindowTitle": "Wiederholungseintrag bearbeiten",
          "deleteRecurring": "Möchten Sie nur diesen Termin oder alle Wiederholungen löschen?",
          "editRecurring": "Möchten Sie nur diesen Termin oder alle Wiederholungen bearbeiten?"
        },
        "editor": {
          "title": "Titel",
          "start": "Starten",
          "end": "Beenden",
          "allDayEvent": "Ganztägiger Termin",
          "description": "Beschreibung",
          "repeat": "Wiederholen",
          "timezone": "Zeitzonen bearbeiten",
          "startTimezone": "Zeitzone Start",
          "endTimezone": "Zeitzone Ende",
          "separateTimezones": "Unterschiedliche Start- und Endzeitzonen benutzen",
          "timezoneEditorTitle": "Zeitzonen",
          "timezoneEditorButton": "Zeitzone",
          "timezoneTitle": "Zeitzone",
          "noTimezone": "Keine Zeitzone",
          "editorTitle": "Termin"
        },
        "defaultRowText": "Alle Termine",
        "pdf": "Exportieren als PDF"
      });
  }

  /* Slider messages */

if (kendo.ui.Slider) {
  kendo.ui.Slider.prototype.options =
  $.extend(true, kendo.ui.Slider.prototype.options,{
    "increaseButtonTitle": "Erhöhen",
    "decreaseButtonTitle": "Verringern"
  });
  }

  /* ListBox messages */

  if (kendo.ui.ListBox) {
    kendo.ui.ListBox.prototype.options.messages =
      $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
        "tools": {
          "remove": "Löschen",
          "moveUp": "Nach oben verschieben",
          "moveDown": "Nach unten verschieben",
          "transferTo": "Übertragen zu",
          "transferFrom": "Übertragen von",
          "transferAllTo": "Übertragen sie alle zu",
          "transferAllFrom": "Übertragen sie alle von"
        }
      });
  }

  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "select": "Wählen Sie...",
        "cancel": "Beenden",
        "retry": "Wiederholen",
        "remove": "Löschen",
        "clearSelectedFiles": "Leeren",
        "uploadSelectedFiles": "Dateien hochladen",
        "dropFilesHere": "Dateien hierhin ziehen zum Hochladen",
        "statusUploading": "hochladen",
        "statusUploaded": "hochgeladen",
        "statusWarning": "Warnung",
        "statusFailed": "nicht erfolgreich",
        "headerStatusUploaded": "Hochgeladen",
        "headerStatusUploading": "Hochladen...",
        "invalidMaxFileSize": "Datei zu groß.",
        "invalidMinFileSize": "Datei zu klein.",
        "invalidFileExtension": "Dateityp ungültig."
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
        "date": "{0} ist kein gültiges Datum",
        "dateCompare": "Enddatum sollte größer oder gleich dem Startdatum sein."
      });
  }

  /* kendo.ui.progress method */
  if (kendo.ui.progress) {
    kendo.ui.progress.messages =
    $.extend(true, kendo.ui.progress.messages, {
        loading: "Lade..."
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
})(window.kendo.jQuery);
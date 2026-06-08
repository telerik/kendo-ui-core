(function($, undefined) {

  /* FilterCell operators */

  if (kendo.ui.Filter) {
    kendo.ui.Filter.prototype.options.messages =
      $.extend(true, kendo.ui.Filter.prototype.options.messages, {
        "addExpression": "Ausdruck hinzufügen",
        "addGroup": "Gruppe hinzufügen",
        "and": "Und",
        "apply": "Anwenden",
        "close": "Schließen",
        "fields": "Felder",
        "operators": "Operatoren",
        "or": "Oder",
        "date": {
          "eq": "gleich sind",
          "gt": "später sind als",
          "gte": "gleich oder später sind als",
          "lt": "früher sind als",
          "lte": "früher oder gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "number": {
          "eq": "gleich sind",
          "gt": "größer als sind",
          "gte": "größer als oder gleich sind",
          "lt": "kleiner sind",
          "lte": "kleiner als oder gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "string": {
          "contains": "beinhalten",
          "doesnotcontain": "beinhalten nicht",
          "endswith": "enden mit",
          "eq": "gleich sind",
          "neq": "nicht gleich sind",
          "startswith": "beginnen mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist",
          "isnullorempty": "Besitzt keinen Wert",
          "isnotnullorempty": "Besitzt einen Wert"
        }
      });
  }

  /* FilterCell operators */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "date": {
          "eq": "gleich sind",
          "gt": "später sind als",
          "gte": "gleich oder später sind als",
          "lt": "früher sind als",
          "lte": "früher oder gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "number": {
          "eq": "gleich sind",
          "gt": "größer als sind",
          "gte": "größer als oder gleich sind",
          "lt": "kleiner sind",
          "lte": "kleiner als oder gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "string": {
          "contains": "beinhalten",
          "doesnotcontain": "beinhalten nicht",
          "endswith": "enden mit",
          "eq": "gleich sind",
          "neq": "nicht gleich sind",
          "startswith": "beginnen mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist",
          "isnullorempty": "Besitzt keinen Wert",
          "isnotnullorempty": "Besitzt einen Wert"
        },
        "addExpression": "Ausdruck hinzufügen",
        "addGroup": "Gruppe hinzufügen",
        "and": "Und",
        "apply": "Anwenden",
        "close": "Schließen",
        "fields": "Felder",
        "operators": "Operatoren",
        "or": "Oder"
      });
  }

  /* FilterMenu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "date": {
          "eq": "gleich sind",
          "gt": "später sind als",
          "gte": "gleich oder später sind als",
          "lt": "früher sind als",
          "lte": "früher oder gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "enums": {
          "eq": "gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "number": {
          "eq": "gleich sind",
          "gt": "größer als sind",
          "gte": "größer als oder gleich sind",
          "lt": "kleiner sind",
          "lte": "kleiner als oder gleich sind",
          "neq": "nicht gleich sind",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist"
        },
        "string": {
          "contains": "beinhalten",
          "doesnotcontain": "beinhalten nicht",
          "endswith": "enden mit",
          "eq": "gleich sind",
          "neq": "nicht gleich sind",
          "startswith": "beginnen mit",
          "isnull": "Null ist",
          "isnotnull": "nicht Null ist",
          "isempty": "leer ist",
          "isnotempty": "nicht leer ist",
          "isnullorempty": "Besitzt keinen Wert",
          "isnotnullorempty": "Besitzt einen Wert"
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
        "and": "Und",
        "clear": "Löschen",
        "filter": "Filtern",
        "info": "Zeilen mit Werten anzeigen, die",
        "title": "Zeilen mit Werten anzeigen, die",
        "isFalse": "falsch",
        "isTrue": "richtig",
        "or": "Oder",
        "selectValue": "-Wählen Sie-",
        "cancel": "Abbrechen",
        "operator": "Operator",
        "value": "Wert",
        "done": "Erledigt",
        "into": "in",
        "buttonTitle": "{0} Spaltenfilter-Einstellungen"
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Alle auswählen",
        "clearAll": "Alle löschen",
        "clear": "Löschen",
        "filter": "Filtern",
        "search": "Suchen",
        "cancel": "Abbrechen",
        "done": "Erledigt",
        "into": "in",
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
        "settings": "Einstellungen zu Spalten",
        "done": "Erledigt",
        "lock": "Sperren",
        "unlock": "Entsperren",
        "filter": "Filtern",
        "clearAllFilters": "Alle Filter löschen",
        "column": "Spalte",
        "columnVisibility": "Spaltensichtbarkeit",
        "clear": "Löschen",
        "cancel": "Abbrechen",
        "stick": "Spalte fixieren",
        "unstick": "Spalte lösen",
        "setColumnPosition": "Spaltenposition festlegen",
        "apply": "Anwenden",
        "reset": "Zurücksetzen",
        "buttonTitle": "{0} Spalteneinstellungen bearbeiten",
        "movePrev": "Vorherige",
        "moveNext": "Nächste",
        "groupColumn": "Spalte gruppieren",
        "ungroupColumn": "Spalte entgruppieren"
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "repeat": "Wiederholen",
        "recurrenceEditorTitle": "Wiederholungseditor",
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
          "hourly": "Stündlich",
          "monthly": "Monatlich",
          "never": "Nie",
          "weekly": "Wöchentlich",
          "yearly": "Jährlich"
        },
        "hourly": {
          "repeatEvery": "Wiederholen alle:",
          "interval": " Stunde(n)"
        },
        "monthly": {
          "day": "Tag",
          "date": "Datum",
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
          "interval": "Jahr(e)",
          "month": "Monat",
          "day": "Tag",
          "date": "Datum"
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
        "imageWidth": "Breite (px)",
        "imageHeight": "Höhe (px)",
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
        "style": "Stil",
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
        "dropFilesHere": "Dateien hier fallen lassen zum hochladen",
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
        "associateCellsWithHeaders": "Header verbinden",
        "alignLeft": "Ausrichten links",
        "alignCenter": "Ausrichten zentrum",
        "alignRight": "Ausrichten recht",
        "alignLeftTop": "Ausrichten links und oben",
        "alignCenterTop": "Ausrichten zentrum und oben",
        "alignRightTop": "Ausrichten recht und oben",
        "alignLeftMiddle": "Ausrichten links und mittlere",
        "alignCenterMiddle": "Ausrichten zentrum und mittlere",
        "alignRightMiddle": "Ausrichten recht und mittlere",
        "alignLeftBottom": "Ausrichten links und unten",
        "alignCenterBottom": "Ausrichten zentrum und unten",
        "alignRightBottom": "Ausrichten recht und unten",
        "alignRemove": "Entfernen ausrichtung",
        "columns": "Spalten",
        "rows": "Reihen",
        "selectAllCells": "Wählen alle tabellenzellen",
        "auto": "Auto",
        "overflowAnchor": "Weitere Werkzeuge",
        "fileWebAddress": "Web-Adresse",
        "fileTitle": "Titel",
        "cleanFormatting": "Formatierung entfernen",
        "tableBackground": "Tabellenhintergrund",
        "tableCellProperties": "Zelleneigenschaften",
        "tableProperties": "Tabelleneigenschaften",
        "captionAlignment": "Beschriftungsausrichtung",
        "units": "Einheiten",
        "borderColor": "Rahmenfarbe",
        "borderWidth": "Rahmenbreite",
        "fitToCell": "An Zelle anpassen",
        "applyToColumn": "auf Spalte anwenden",
        "applyToRow": "auf Zeile anwenden",
        "print": "Drucken",
        "headerRows": "Kopfzeilen",
        "headerColumns": "Kopfspalten",
        "tableSummaryPlaceholder": "Das Zusammenfassungsattribut ist nicht HTML5-kompatibel.",
        "associateNone": "Keine",
        "associateScope": "Mit 'scope'-Attribut verknüpfen",
        "associateIds": "Mit IDs verknüpfen",
        "copyFormat": "Format kopieren",
        "applyFormat": "Format anwenden",
        "borderNone": "Keine",
        "undo": "Rückgängig",
        "redo": "Wiederholen",
        "styles": "Stil"
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

  /* FileBrowser messages */

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
          "unitsHeader": "Einheiten",
          "plannedStart": "Geplanter Start",
          "plannedEnd": "Geplantes Ende",
          "parent": "Vorgesetzter",
          "addNew": "Hinzufügen",
          "name": "Name",
          "percentCompleteHint": "Wert von 0 bis 1",
          "remove": "Entfernen",
          "actualStart": "Tatsächlicher Start",
          "actualEnd": "Tatsächliches Ende",
          "parentOptionLabel": "-Keiner-",
          "general": "Allgemein",
          "predecessors": "Vorgänger",
          "successors": "Nachfolger",
          "other": "Sonstiges",
          "dependencyType": "Typ"
        },
        "save": "Speichern",
        "selectView": "Ansicht auswählen",
        "plannedTasks": {
          "switchText": "Geplante Aufgaben",
          "offsetTooltipAdvanced": "Frist früher erfüllt",
          "offsetTooltipDelay": "Verzögerung",
          "seconds": "Sekunden",
          "minutes": "Minuten",
          "hours": "Stunden",
          "days": "Tage"
        },
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
        "noRecords": "Keine Aufzeichnungen zur Verfügung.",
        "loader": {
          "loading": "Lade...",
          "exporting": "Exportiere..."
        },
        "commands": {
          "canceledit": "Abbrechen",
          "cancel": "Änderungen verwerfen",
          "create": "Neuen Datensatz hinzufügen",
          "add": "Neuen Datensatz hinzufügen",
          "destroy": "Löschen",
          "edit": "Bearbeiten",
          "excel": "Export nach Excel",
          "pdf": "Export als PDF",
          "save": "Änderungen speichern",
          "select": "Wähle",
          "search": "Suchen...",
          "update": "Aktualisieren",
          "columns": "Spalten",
          "selectRow": "Zeile auswählen",
          "selectAllRows": "Alle Zeilen",
          "clearSelection": "Auswahl aufheben",
          "copySelection": "Auswahl kopieren",
          "copySelectionNoHeaders": "Auswahl kopieren (ohne Überschriften)",
          "reorderRow": "Zeile verschieben",
          "reorderRowUp": "Hoch",
          "reorderRowDown": "Runter",
          "reorderRowTop": "Anfang",
          "reorderRowBottom": "Ende",
          "exportPdf": "Exportieren als PDF",
          "exportExcel": "Exportieren als Excel",
          "exportToExcelAll": "Alle",
          "exportToExcelSelection": "Auswahl",
          "exportToExcelSelectionNoHeaders": "Auswahl (ohne Überschriften)",
          "sortAsc": "Aufsteigend sortieren",
          "sortDesc": "Absteigend sortieren",
          "moveGroupPrevious": "Vorherige",
          "moveGroupNext": "Nächste",
          "selectall": "Alle auswählen"
        },
        "editable": {
          "confirmation": "Sind Sie sicher, dass Sie diesen Datensatz löschen wollen?",
          "cancelDelete": "Abbrechen",
          "confirmDelete": "Löschen"
        },
        "details": {
          "expand": "Erweitern",
          "collapse": "Reduzieren"
        },
        "expandCollapseColumnHeader": "",
        "groupHeader": "Strg + Leertaste drücken zum Gruppieren",
        "ungroupHeader": "Strg + Leertaste drücken zum Entgruppieren",
        "toolbarLabel": "Raster-Symbolleiste",
        "groupingHeaderLabel": "Raster-Gruppierungsüberschrift",
        "filterCellTitle": "Filterzelle",
        "clearButtons": {
          "clearFiltering": "Alle Filter löschen",
          "clearSorting": "Sortierung aufheben",
          "clearGrouping": "Gruppierung aufheben",
          "columnChooserReset": "Zurücksetzen"
        },
        "applyButtons": {
          "applyGrouping": "Erledigt",
          "applySorting": "Erledigt",
          "columnChooserApply": "Anwenden"
        },
        "ai": {
          "outputPlaceholder": "Keine KI-Ausgabe verfügbar",
          "success": "Die Daten sind:",
          "error": "Vorgang nicht erfolgreich. Fehler:",
          "invalidSelection": "Dieser Auswahlmodus ist derzeit nicht aktiviert...",
          "promptPlaceholder": "Geben Sie Ihre KI-Anfrage hier ein..."
        }
      });
  }

  /* ListBox messaages */

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

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Es sind keine Daten vorhanden",
        "loading": "Lade Daten...",
        "requestFailed": "Laden fehlgeschlagen",
        "retry": "Neu laden",
        "commands": {
          "edit": "Bearbeiten",
          "update": "Aktualisieren",
          "canceledit": "Abbrechen",
          "create": "Neuen Datensatz hinzufügen",
          "createchild": "Kind-Datensatz hinzufügen",
          "destroy": "Löschen",
          "excel": "Als Excel exportieren",
          "pdf": "Als PDF exportieren"
        }
      });
  }

  /* TreeView messages */

  if (kendo.ui.TreeView) {
    kendo.ui.TreeView.prototype.options.messages =
      $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
        "loading": "Lade...",
        "requestFailed": "Anfrage fehlgeschlagen.",
        "retry": "Wiederholen"
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
        "allPages": "All",
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
        "morePages": "Weitere Seiten",
        "pageButtonLabel": "Seite {0}",
        "pageSizeDropDownLabel": "Dropdown für Seitengrößen"
      });
  }

  /* TreeListPager messages */

  if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
      $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
        "allPages": "All",
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
        "measureFields": "Hier Datenfelder fallen lassen",
        "columnFields": "Hier Spaltenfelder fallen lassen",
        "rowFields": "Hier Zeilenfelder fallen lassen"
      });
  }

  /* PivotFieldMenu messages */

  if (kendo.ui.PivotFieldMenu) {
    kendo.ui.PivotFieldMenu.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
        "info": "Einträge anzeigen mit Werten, die",
        "filterFields": "Filterkriterien",
        "filter": "Filtern",
        "include": "Felder einbeziehen...",
        "title": "Felder aufnehmen",
        "clear": "Löschen",
        "ok": "OK",
        "cancel": "Abbrechen",
        "operators": {
          "contains": "Beinhaltet",
          "doesnotcontain": "Beinhaltet nicht",
          "startswith": "Beginnt mit",
          "endswith": "Endet mit",
          "eq": "Ist gleich",
          "neq": "Ist nicht gleich"
        }
      });
  }

  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "cancel": "Beenden",
        "dropFilesHere": "Dateien hier fallen lassen zum Hochladen",
        "remove": "Löschen",
        "retry": "Wiederholen",
        "clearSelectedFiles": "Zurücksetzen",
        "select": "Wählen Sie...",
        "statusFailed": "nicht erfolgreich",
        "statusWarning": "Warnung",
        "statusUploaded": "hochgeladen",
        "statusUploading": "hochladen",
        "uploadSelectedFiles": "Dateien hochladen",
        "headerStatusUploaded": "Hochgeladen",
        "headerStatusUploading": "Hochladen...",
        "headerStatusPaused": "Pausiert",
        "uploadSuccess": "Datei(en) erfolgreich hochgeladen.",
        "uploadFail": "Hochladen der Datei(en) fehlgeschlagen.",
        "invalidMaxFileSize": "Datei ist zu groß.",
        "invalidMinFileSize": "Datei ist zu klein.",
        "invalidFileExtension": "Dateityp nicht erlaubt."
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "Ganzer Tag",
        "cancel": "Abbrechen",
        "date": "Datum",
        "search": "Suchen...",
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
        "ariaEventLabel": "{0} am {1:D} um {2:t}",
        "resetSeries": "Serie zurücksetzen",
        "refresh": "Aktualisieren",
        "selectView": "Ansicht auswählen",
        "recurrenceMessages": {
          "deleteRecurring": "Möchten Sie nur diesen Termin oder alle Wiederholungen löschen?",
          "deleteWindowOccurrence": "Diesen Termin löschen",
          "deleteWindowSeries": "Alle Wiederholungen des Termins löschen",
          "deleteWindowTitle": "Diesen Termin und alle Wiederholungen löschen",
          "editRecurring": "Möchten Sie nur diesen Termin oder alle Wiederholungen bearbeiten?",
          "editWindowOccurrence": "Aktuelles Ereignis bearbeiten",
          "editWindowSeries": "Serie bearbeiten",
          "editWindowTitle": "Wiederholungseintrag bearbeiten",
          "resetSeriesWindowTitle": "Serie zurücksetzen",
          "deleteRecurringConfirmation": "Sind Sie sicher, dass Sie dieses Terminvorkommen löschen möchten?",
          "deleteSeriesConfirmation": "Sind Sie sicher, dass Sie die gesamte Serie löschen möchten?"
        }
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
        "dateCompare": "Das Enddatum muss nach dem Startdatum liegen"
      });
  }

  /* Dialog */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.localization =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Schließen"
      });
  }

  /* Alert */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.localization =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "OK"
      });
  }

  /* Confirm */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.localization =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "OK",
        "cancel": "Abbrechen"
      });
  }

  /* Prompt */

  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.localization =
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
        "hour": "Stunde",
        "minute": "Minute",
        "second": "Sekunde",
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

  /* PDFViewer */

  if (kendo.ui.PDFViewer) {
    kendo.ui.PDFViewer.prototype.options.messages =
      $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
        "defaultFileName": "Mein Dokument",
        "toolbar": {
          "zoom": {
            "zoomLevel": "Zoomstufe",
            "zoomOut": "Herauszoomen",
            "zoomIn": "Hineinzoomen",
            "actualWidth": "Tatsächliche Breite",
            "autoWidth": "Automatische Breite",
            "fitToWidth": "An Breite anpassen",
            "fitToPage": "An Seite anpassen"
          },
          "open": "Öffnen",
          "exportAs": "Exportieren",
          "download": "Herunterladen",
          "pager": {
            "first": "Zur ersten Seite",
            "previous": "Zur vorherigen Seite",
            "next": "Zur nächsten Seite",
            "last": "Zur letzten Seite",
            "of": "von",
            "page": "Seite",
            "pages": "Seiten"
          },
          "print": "Drucken",
          "toggleSelection": "Markierungsmodus",
          "togglePan": "Schwenkmodus",
          "search": "Suchen"
        },
        "errorMessages": {
          "notSupported": "Dateityp nicht unterstützt.",
          "parseError": "Fehler beim Verarbeiten der Datei.",
          "notFound": "Datei konnte nicht gefunden werden.",
          "popupBlocked": "Popups sind blockiert."
        },
        "dialogs": {
          "exportAsDialog": {
            "title": "Exportieren...",
            "defaultFileName": "Dokument",
            "pdf": "Portable Document Format (.pdf)",
            "png": "Portable Network Graphics (.png)",
            "svg": "Scalable Vector Graphics (.svg)",
            "labels": {
              "fileName": "Dateiname",
              "saveAsType": "Speichern als",
              "page": "Seite"
            }
          },
          "okText": "OK",
          "save": "Speichern",
          "cancel": "Abbrechen",
          "search": {
            "inputLabel": "Suchtext",
            "matchCase": "Groß-/Kleinschreibung beachten",
            "next": "Nächster Treffer",
            "previous": "Vorheriger Treffer",
            "close": "Schließen",
            "of": "von",
            "dragHandle": "Suche verschieben"
          }
        }
      });
  }

  /* ColorGradient messages */

  if (kendo.ui.ColorGradient) {
    kendo.ui.ColorGradient.prototype.options.messages =
      $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
        "contrastRatio": "Kontrastverhältnis:",
        "fail": "Fehler",
        "pass": "Bestanden",
        "hex": "HEX",
        "toggleFormat": "Format umschalten",
        "red": "Rot",
        "green": "Grün",
        "blue": "Blau",
        "alpha": "Alpha"
      });
  }

  /* DateRangePicker messages */

  if (kendo.ui.DateRangePicker) {
    kendo.ui.DateRangePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
        "startLabel": "Start",
        "endLabel": "Ende"
      });
  }

  /* FileManager messages */

  if (kendo.ui.FileManager) {
    kendo.ui.FileManager.prototype.options.messages =
      $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
        "toolbar": {
          "createFolder": "Neuer Ordner",
          "upload": "Hochladen",
          "sortDirection": "Sortierrichtung",
          "sortDirectionAsc": "Aufsteigend",
          "sortDirectionDesc": "Absteigend",
          "sortField": "Sortieren nach",
          "nameField": "Name",
          "sizeField": "Dateigröße",
          "typeField": "Typ",
          "dateModifiedField": "Änderungsdatum",
          "dateCreatedField": "Erstellungsdatum",
          "listView": "Listenansicht",
          "gridView": "Rasteransicht",
          "search": "Suchen",
          "details": "Details anzeigen",
          "detailsChecked": "Ja",
          "detailsUnchecked": "Nein",
          "delete": "Löschen",
          "rename": "Umbenennen"
        },
        "views": {
          "nameField": "Name",
          "sizeField": "Dateigröße",
          "typeField": "Typ",
          "dateModifiedField": "Änderungsdatum",
          "dateCreatedField": "Erstellungsdatum",
          "items": "Elemente",
          "listLabel": "FileManager Liste",
          "gridLabel": "FileManager Raster",
          "treeLabel": "FileManager Baum"
        },
        "dialogs": {
          "upload": {
            "title": "Dateien hochladen",
            "clear": "Liste leeren",
            "done": "Fertig"
          },
          "moveConfirm": {
            "title": "Bestätigen",
            "content": "<p class='k-text-center'>Möchten Sie verschieben oder kopieren?</p>",
            "okText": "Kopieren",
            "cancel": "Verschieben",
            "close": "Schließen"
          },
          "deleteConfirm": {
            "title": "Bestätigen",
            "content": "<p class='k-text-center'>Sind Sie sicher, dass Sie die ausgewählten Dateien löschen möchten?<br/>Diese Aktion kann nicht rückgängig gemacht werden.</p>",
            "okText": "Löschen",
            "cancel": "Abbrechen",
            "close": "Schließen"
          },
          "renamePrompt": {
            "title": "Eingabe",
            "content": "<p class='k-text-center'>Geben Sie einen neuen Dateinamen ein.</p>",
            "okText": "Umbenennen",
            "cancel": "Abbrechen",
            "close": "Schließen"
          }
        },
        "previewPane": {
          "noFileSelected": "Keine Datei ausgewählt",
          "extension": "Typ",
          "size": "Größe",
          "created": "Erstellungsdatum",
          "createdUtc": "Erstellungsdatum UTC",
          "modified": "Änderungsdatum",
          "modifiedUtc": "Änderungsdatum UTC",
          "items": "Elemente"
        }
      });
  }

  /* TaskBoard messages */

  if (kendo.ui.TaskBoard) {
    kendo.ui.TaskBoard.prototype.options.messages =
      $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
        "edit": "Bearbeiten",
        "createNewCard": "Neue Karte erstellen",
        "create": "Erstellen",
        "search": "Suchen",
        "previewCard": "Kartenvorschau",
        "addCard": "Karte hinzufügen",
        "editCard": "Karte bearbeiten",
        "deleteCard": "Karte löschen",
        "addColumn": "Spalte hinzufügen",
        "editColumn": "Spalte bearbeiten",
        "deleteColumn": "Spalte löschen",
        "close": "Schließen",
        "cancel": "Abbrechen",
        "delete": "Löschen",
        "saveChanges": "Änderungen speichern",
        "title": "Titel:",
        "description": "Beschreibung:",
        "newColumn": "Neue Spalte",
        "deleteColumnConfirm": "Sind Sie sicher, dass Sie diese Spalte löschen möchten?",
        "deleteCardConfirm": "Sind Sie sicher, dass Sie diese Karte löschen möchten?"
      });
  }

  /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
    kendo.ui.MediaPlayer.prototype.options.messages =
      $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
        "pause": "Pause",
        "play": "Wiedergabe",
        "mute": "Stumm",
        "unmute": "Ton an",
        "quality": "Qualität",
        "fullscreen": "Vollbild"
      });
  }

  /* Slider messages */

  if (kendo.ui.Slider) {
    kendo.ui.Slider.prototype.options =
      $.extend(true, kendo.ui.Slider.prototype.options, {
        "increaseButtonTitle": "Erhöhen",
        "decreaseButtonTitle": "Verringern"
      });
  }

  /* PivotConfiguratorV2 messages */

  if (kendo.ui.PivotConfiguratorV2) {
    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
        "title": "Konfiguration",
        "cancelButtonText": "Abbrechen",
        "applyButtonText": "Anwenden",
        "measures": "Felder auswählen zum Starten",
        "columns": "Felder auswählen zum Starten",
        "rows": "Felder auswählen zum Starten"
      });
  }

  /* PivotFieldMenuV2 messages */

  if (kendo.ui.PivotFieldMenuV2) {
    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
        "apply": "Anwenden",
        "sortAscending": "Aufsteigend sortieren",
        "sortDescending": "Absteigend sortieren",
        "filterFields": "Filterkriterien",
        "filter": "Filtern",
        "include": "Felder einbeziehen...",
        "clear": "Löschen",
        "reset": "Zurücksetzen",
        "moveToColumns": "Zu Spalten verschieben",
        "moveToRows": "Zu Zeilen verschieben",
        "movePrevious": "Vorherige verschieben",
        "moveNext": "Nächste verschieben",
        "filterOperatorsDropDownLabel": "Regionsfilter-Operatoren",
        "filterValueTextBoxLabel": "Regionsfilter-Wert",
        "operators": {
          "contains": "Beinhaltet",
          "doesnotcontain": "Beinhaltet nicht",
          "startswith": "Beginnt mit",
          "endswith": "Endet mit",
          "eq": "Ist gleich",
          "neq": "Ist nicht gleich"
        }
      });
  }

  /* MobileRecurrenceEditor messages */

  if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
        "cancel": "Abbrechen",
        "update": "Speichern",
        "endTitle": "Ende der Wiederholung",
        "repeatTitle": "Wiederholungsmuster",
        "headerTitle": "Termin wiederholen",
        "end": {
          "patterns": {
            "never": "Nie",
            "after": "Nach...",
            "on": "Am..."
          },
          "never": "Nie",
          "after": "Wiederholung beenden nach",
          "on": "Wiederholung beenden am"
        },
        "daily": {
          "interval": ""
        },
        "hourly": {
          "interval": ""
        },
        "weekly": {
          "interval": ""
        },
        "monthly": {
          "interval": "",
          "repeatBy": "Wiederholen nach: ",
          "dayOfMonth": "Tag des Monats",
          "dayOfWeek": "Wochentag",
          "repeatEvery": "Wiederholen alle",
          "every": "Jede(r/s)",
          "day": "Tag "
        },
        "yearly": {
          "interval": "",
          "repeatBy": "Wiederholen nach: ",
          "dayOfMonth": "Tag des Monats",
          "dayOfWeek": "Wochentag",
          "repeatEvery": "Wiederholen alle: ",
          "every": "Jede(r/s)",
          "month": "Monat",
          "day": "Tag"
        }
      });
  }

  /* kendo.ui.progress method */

  if (kendo.ui.progress) {
    kendo.ui.progress.messages =
      $.extend(true, kendo.ui.progress.messages, {
        "loading": "Laden..."
      });
  }

  /* TimePicker messages */

  if (kendo.ui.TimePicker) {
    kendo.ui.TimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
        "set": "Setzen",
        "cancel": "Abbrechen",
        "hour": "Stunde",
        "minute": "Minute",
        "second": "Sekunde",
        "millisecond": "Millisekunde",
        "now": "Jetzt"
      });
  }

  /* DateTimePicker messages */

  if (kendo.ui.DateTimePicker) {
    kendo.ui.DateTimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
        "set": "Setzen",
        "cancel": "Abbrechen",
        "hour": "Stunde",
        "minute": "Minute",
        "second": "Sekunde",
        "millisecond": "Millisekunde",
        "now": "Jetzt",
        "date": "Datum",
        "time": "Zeit",
        "today": "Heute",
        "weekColumnHeader": ""
      });
  }

  /* Calendar messages */

  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "today": "Heute",
        "weekColumnHeader": "",
        "navigateTo": "Navigieren zu ",
        "parentViews": {
          "month": "Jahresansicht",
          "year": "Jahrzehntansicht",
          "decade": "Jahrhundertansicht"
        }
      });
  }

  /* List messages */

  if (kendo.ui.List) {
    kendo.ui.List.prototype.options.messages =
      $.extend(true, kendo.ui.List.prototype.options.messages, {
        "clear": "löschen",
        "noData": "Keine Daten gefunden.",
        "filterInputPlaceholder": "Filtern"
      });
  }

  /* DropDownList messages */

  if (kendo.ui.DropDownList) {
    kendo.ui.DropDownList.prototype.options.messages =
      $.extend(true, kendo.ui.DropDownList.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* ComboBox messages */

  if (kendo.ui.ComboBox) {
    kendo.ui.ComboBox.prototype.options.messages =
      $.extend(true, kendo.ui.ComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* AutoComplete messages */

  if (kendo.ui.AutoComplete) {
    kendo.ui.AutoComplete.prototype.options.messages =
      $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* MultiColumnComboBox messages */

  if (kendo.ui.MultiColumnComboBox) {
    kendo.ui.MultiColumnComboBox.prototype.options.messages =
      $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
  }

  /* DropDownTree messages */

  if (kendo.ui.DropDownTree) {
    kendo.ui.DropDownTree.prototype.options.messages =
      $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
        "singleTag": "Element(e) ausgewählt",
        "clear": "löschen",
        "deleteTag": "entfernen",
        "noData": "Keine Daten gefunden.",
        "filterInputPlaceholder": "Filtern"
      });
  }

  /* MultiSelect messages */

  if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
      $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
        "singleTag": "Element(e) ausgewählt",
        "clear": "löschen",
        "deleteTag": "entfernen",
        "noData": "Keine Daten gefunden.",
        "downArrow": "auswählen"
      });
  }

  /* Chat messages */

  if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
      $.extend(true, kendo.ui.Chat.prototype.options.messages, {
        "messageListLabel": "Nachrichtenliste",
        "placeholder": "Nachricht eingeben...",
        "toggleButton": "Symbolleiste umschalten",
        "sendButton": "Nachricht senden"
      });
  }

  /* Wizard messages */

  if (kendo.ui.Wizard) {
    kendo.ui.Wizard.prototype.options.messages =
      $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
        "reset": "Zurücksetzen",
        "previous": "Zurück",
        "next": "Weiter",
        "done": "Fertig",
        "step": "Schritt",
        "of": "von"
      });
  }

  /* Captcha messages */

  if (kendo.ui.Captcha) {
    kendo.ui.Captcha.prototype.options.messages =
      $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
        "reset": "Captcha zurücksetzen",
        "audio": "Captcha abspielen",
        "imageAlt": "Geben Sie den Captcha-Code aus dem Bild ein",
        "success": "Überprüfung erfolgreich"
      });
  }

  /* OrgChart messages */

  if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
      $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
        "label": "Organigramm",
        "edit": "Bearbeiten",
        "create": "Erstellen",
        "destroy": "Löschen",
        "destroyContent": "Sind Sie sicher, dass Sie dieses Element und alle untergeordneten Elemente löschen möchten?",
        "destroyTitle": "Element löschen",
        "cancel": "Abbrechen",
        "save": "Speichern",
        "menuLabel": "Bearbeitungsmenü",
        "uploadAvatar": "Neues Avatar hochladen",
        "parent": "Vorgesetzter",
        "name": "Name",
        "title": "Titel",
        "none": "--Keiner--",
        "expand": "erweitern",
        "collapse": "reduzieren"
      });
  }

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "Keine vorherigen Suchen",
        "noPreviousPrompts": "Keine vorherigen Anfragen",
        "previousSearches": "Vorherige Suchen",
        "previousPrompts": "Vorherige Anfragen",
        "suggestedPrompts": "Vorgeschlagene Anfragen",
        "searchModeLabel": "Suchen",
        "searchModeDescription": "Sucht exakte Wortübereinstimmungen in Ihren Daten",
        "searchPlaceholder": "Suchen",
        "semanticSearchModeLabel": "Semantische Suche",
        "semanticSearchModeDescription": "Versteht den Kontext um die relevantesten Ergebnisse anzuzeigen.",
        "semanticSearchPlaceholder": "Semantische Suche",
        "semanticSearchButtonText": "Suchen",
        "aiAssistantPlaceholder": "Sortieren, filtern oder gruppieren mit KI",
        "speechToText": "Sprache zu Text",
        "speechToTextAriaLabel": "Spracherkennung starten",
        "cancel": "Abbrechen",
        "send": "Senden",
        "searchButtonText": "Suchen",
        "aiAssistantButtonText": "KI-Assistent"
      });
  }

  /* ChartWizard messages */

  if (kendo.ui.ChartWizard) {
    kendo.ui.ChartWizard.prototype.options.messages =
      $.extend(true, kendo.ui.ChartWizard.prototype.options.messages, {
        "window": {
          "title": "Diagrammvorschau"
        },
        "export": "Exportieren",
        "exportPDF": "PDF-Datei",
        "exportSVG": "SVG-Datei",
        "exportPNG": "PNG-Datei",
        "tab": {
          "chart": "Diagramm",
          "data": "Daten",
          "format": "Format"
        },
        "chart": {
          "bar": {
            "expandText": "Balkendiagramm",
            "bar": "Balken",
            "stackedBar": "Gestapelte Balken",
            "hundredStackedBar": "100% Gestapelte Balken"
          },
          "pie": {
            "expandText": "Kreisdiagramm",
            "pie": "Kreis"
          },
          "column": {
            "expandText": "Säulendiagramm",
            "column": "Säulen",
            "stackedColumn": "Gestapelte Säulen",
            "hundredStackedColumn": "100% Gestapelte Säulen"
          },
          "line": {
            "expandText": "Liniendiagramm",
            "line": "Linien",
            "stackedLine": "Gestapelte Linien",
            "hundredStackedLine": "100% Gestapelte Linien"
          },
          "scatter": {
            "expandText": "Streudiagramm",
            "scatter": "Streuung"
          }
        },
        "data": {
          "configuration": {
            "expandText": "Konfiguration",
            "series": {
              "title": "Serie",
              "add": "Hinzufügen"
            },
            "valueAxis": "Werteachse",
            "categoryAxis": "Kategorieachse",
            "xAxis": "X-Achse"
          }
        },
        "format": {
          "chartArea": {
            "expandText": "Diagrammbereich",
            "margins": {
              "default": "Ränder",
              "auto": "Auto",
              "left": "Links",
              "right": "Rechts",
              "top": "Oben",
              "bottom": "Unten"
            },
            "background": {
              "default": "Hintergrund",
              "color": "Farbe"
            }
          },
          "title": {
            "expandText": "Titel",
            "applyTo": "Anwenden auf",
            "chartTitle": "Diagrammtitel",
            "chartSubtitle": "Diagramm-Untertitel",
            "label": "Titel",
            "font": "Schrift",
            "fontPlaceholder": "(Schrift übernehmen)",
            "size": "Größe",
            "sizePlaceholder": "px",
            "color": "Farbe"
          },
          "series": {
            "expandText": "Serie",
            "applyTo": "Anwenden auf",
            "allSeries": "Alle Serien",
            "color": "Farbe",
            "showLabels": "Beschriftungen anzeigen"
          },
          "legend": {
            "expandText": "Legende",
            "showLegend": "Legende anzeigen",
            "font": "Schrift",
            "fontPlaceholder": "(Schrift übernehmen)",
            "size": "Größe",
            "sizePlaceholder": "px",
            "color": "Farbe",
            "position": {
              "default": "Position",
              "top": "Oben",
              "bottom": "Unten",
              "left": "Links",
              "right": "Rechts"
            }
          },
          "categoryAxis": {
            "expandText": "Kategorieachse",
            "title": {
              "text": "Titel",
              "placeholder": "Achsentitel",
              "font": "Schrift",
              "fontPlaceholder": "(Schrift übernehmen)",
              "size": "Größe",
              "sizePlaceholder": "px",
              "color": "Farbe"
            },
            "labels": {
              "text": "Beschriftungen",
              "font": "Schrift",
              "fontPlaceholder": "(Schrift übernehmen)",
              "size": "Größe",
              "sizePlaceholder": "px",
              "color": "Farbe",
              "rotation": {
                "text": "Drehung",
                "auto": "Auto"
              },
              "reverseOrder": "Umgekehrte Reihenfolge"
            }
          },
          "valueAxis": {
            "expandText": "Werteachse",
            "title": {
              "text": "Titel",
              "placeholder": "Achsentitel",
              "font": "Schrift",
              "fontPlaceholder": "(Schrift übernehmen)",
              "size": "Größe",
              "sizePlaceholder": "px",
              "color": "Farbe"
            },
            "labels": {
              "text": "Beschriftungen",
              "labelFormat": {
                "default": "Beschriftungsformat",
                "text": "Text",
                "number": "Zahl",
                "currency": "Währung",
                "percent": "Prozent"
              },
              "font": "Schrift",
              "fontPlaceholder": "(Schrift übernehmen)",
              "size": "Größe",
              "sizePlaceholder": "px",
              "color": "Farbe",
              "rotation": {
                "text": "Drehung",
                "auto": "Auto"
              }
            }
          },
          "xAxis": {
            "expandText": "X-Achse"
          },
          "yAxis": {
            "expandText": "Y-Achse"
          }
        }
      });
  }

  /* Spreadsheet messages */

  if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
    kendo.spreadsheet.messages.borderPalette =
      $.extend(true, kendo.spreadsheet.messages.borderPalette, {
        "allBorders": "Alle Rahmen",
        "insideBorders": "Innenrahmen",
        "insideHorizontalBorders": "Innere horizontale Rahmen",
        "insideVerticalBorders": "Innere vertikale Rahmen",
        "outsideBorders": "Außenrahmen",
        "leftBorder": "Linker Rahmen",
        "topBorder": "Oberer Rahmen",
        "rightBorder": "Rechter Rahmen",
        "bottomBorder": "Unterer Rahmen",
        "noBorders": "Kein Rahmen",
        "reset": "Farbe zurücksetzen",
        "customColor": "Benutzerdefinierte Farbe...",
        "apply": "Anwenden",
        "cancel": "Abbrechen"
      });
  }

  /* Map messages */

  if (kendo.dataviz.ui.Map) {
    kendo.dataviz.ui.Map.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
        "tileTitle": "Kartentitel"
      });
  }

  /* Sankey messages */

  if (kendo.dataviz.ui.Sankey) {
    kendo.dataviz.ui.Sankey.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
        "tooltipUnits": "{0} Einheiten"
      });
  }

  /* Chart messages */

  if (kendo.dataviz.ui.Chart) {
    kendo.dataviz.ui.Chart.prototype.options.messages =
      $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
        "noData": "Keine Daten verfügbar"
      });
  }

  /* TimePicker */

  if (kendo.ui.TimePicker) {
    kendo.ui.TimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
        "set": "Festlegen",
        "cancel": "Abbrechen",
        "hour": "Stunde",
        "minute": "Minute",
        "second": "Sekunde",
        "millisecond": "Millisekunde",
        "now": "Jetzt"
      });
  }

  /* DateTimePicker */

  if (kendo.ui.DateTimePicker) {
    kendo.ui.DateTimePicker.prototype.options.messages =
      $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
        "set": "Festlegen",
        "cancel": "Abbrechen",
        "hour": "Stunde",
        "minute": "Minute",
        "second": "Sekunde",
        "millisecond": "Millisekunde",
        "now": "Jetzt",
        "date": "Datum",
        "time": "Zeit",
        "today": "Heute",
        "weekColumnHeader": ""
      });
  }

  /* Calendar */

  if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
      $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
        "weekColumnHeader": "",
        "today": "Heute",
        "navigateTo": "Navigieren zu: ",
        "parentViews": {
          "month": "Jahresansicht",
          "year": "Jahrzehntansicht",
          "decade": "Jahrhundertansicht"
        }
      });
  }

  /* PDFViewer messages */

  if (kendo.ui.PDFViewer) {
    kendo.ui.PDFViewer.prototype.options.messages =
      $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
        "defaultFileName": "Dokument",
        "toolbar": {
          "zoom": {
            "zoomLevel": "Zoomstufe",
            "zoomOut": "Verkleinern",
            "zoomIn": "Vergrößern",
            "actualWidth": "Tatsächliche Breite",
            "autoWidth": "Automatische Breite",
            "fitToWidth": "An Breite anpassen",
            "fitToPage": "An Seite anpassen"
          },
          "open": "Öffnen",
          "exportAs": "Exportieren",
          "download": "Herunterladen",
          "pager": {
            "first": "Zur ersten Seite",
            "previous": "Zur vorherigen Seite",
            "next": "Zur nächsten Seite",
            "last": "Zur letzten Seite",
            "of": "von",
            "page": "Seite",
            "pages": "Seiten"
          },
          "print": "Drucken",
          "toggleSelection": "Auswahl aktivieren",
          "togglePan": "Schwenken aktivieren",
          "search": "Suchen"
        },
        "errorMessages": {
          "notSupported": "Nur PDF-Dateien werden unterstützt.",
          "parseError": "Die PDF-Datei konnte nicht verarbeitet werden.",
          "notFound": "Datei nicht gefunden.",
          "popupBlocked": "Das Popup wird vom Browser blockiert."
        }
      });
  }

})(window.kendo.jQuery);
(function ($, undefined) {
/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "È uguale a",
    "gt": "È dopo",
    "gte": "È dopo o uguale a",
    "lt": "È prima",
    "lte": "È prima o uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  },
  "number": {
    "eq": "È uguale a",
    "gt": "È più grande di",
    "gte": "È più grande o uguale a",
    "lt": "È più piccolo di",
    "lte": "È più piccolo o uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  },
  "string": {
    "contains": "Contiene",
    "doesnotcontain": "Non contiene",
    "endswith": "Finisce con",
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "startswith": "Inizia con",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo",
    "isempty": "È vuoto",
    "isnotempty": "Non è vuoto"
  },
  "enums": {
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "È uguale a",
    "gt": "È dopo",
    "gte": "È dopo o uguale a",
    "lt": "È prima",
    "lte": "È prima o uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  },
  "number": {
    "eq": "È uguale a",
    "gt": "È più grande di",
    "gte": "È più grande o uguale a",
    "lt": "È più piccolo di",
    "lte": "È più piccolo o uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  },
  "string": {
    "contains": "Contiene",
    "doesnotcontain": "Non contiene",
    "endswith": "Finisce con",
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "startswith": "Inizia con",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo",
    "isempty": "È vuoto",
    "isnotempty": "Non è vuoto"
  },
  "enums": {
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Colonne",
  "filter": "Filtro",
  "sortAscending": "In ordine crescente",
  "sortDescending": "In ordine decrescente",
  "settings": "Impostazioni colonna",
  "done": "Fatto",
  "lock": "Bloccare",
  "unlock": "Sbloccare"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "giorno(i)",
    "repeatEvery": "Ripeti ogni: "
  },
  "end": {
    "after": "Dopo",
    "occurrence": "Occorrenza(e)",
    "label": "Fine:",
    "never": "Mai",
    "on": "Il",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Ogni giorno",
    "monthly": "Ogni mese",
    "never": "Mai",
    "weekly": "Ogni settimana",
    "yearly": "Ogni anno"
  },
  "monthly": {
    "day": "Giorno",
    "interval": "mese(i)",
    "repeatEvery": "Ripeti ogni: ",
    "repeatOn": "Repeti quando:: "
  },
  "offsetPositions": {
    "first": "primo",
    "fourth": "quarto",
    "last": "ultimo",
    "second": "secondo",
    "third": "terzo"
  },
  "weekly": {
    "repeatEvery": "Ripeti ogni:",
    "repeatOn": "Ripeti quando:",
    "interval": "settimana(e)"
  },
  "yearly": {
    "of": "di",
    "repeatEvery": "Ripeti ogni:",
    "repeatOn": "Ripeti quando:",
    "interval": "anno(i)"
  },
  "weekdays": {
    "day": "giorno",
    "weekday": "giorno della settimana",
    "weekend": "giorno finesettimana"
  }
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Rimuovi",
  "filter": "Filtro",
  "isFalse": "è falso",
  "isTrue": "è vero",
  "operator": "Operatore"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "E",
  "clear": "Rimuovi",
  "filter": "Filtro",
  "info": "Mostra elementi il cui valore:",
  "isFalse": "è falso",
  "isTrue": "è vero",
  "or": "O",
  "selectValue": "-Seleziona valore-",
  "cancel": "Annulla",
  "operator": "Operatore",
  "value": "Valore"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Cerca"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "Annulla",
    "cancel": "Annulla modifiche",
    "create": "Aggiungi nuovo elemento",
    "destroy": "Rimuovi",
    "edit": "Edit",
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
    "save": "Salva le modifiche",
    "select": "Seleziona",
    "update": "Aggiorna"
  },
  "editable": {
    "confirmation": "Sicuro di voler rimuovere questo elemento?",
    "cancelDelete": "Annulla",
    "confirmDelete": "Rimuovi"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Trascina l'header di una colonna e rilascialo qui per raggruppare secondo tale colonna"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "display": "{0} - {1} di {2} elementi",
  "empty": "Nessun elemento da visualizzare",
  "first": "Vai alla prima pagina",
  "itemsPerPage": "elementi per pagina",
  "last": "Vai all'ultima pagina",
  "next": "Vai alla prossima pagina",
  "of": "di {0}",
  "page": "Pagina",
  "previous": "Vai alla pagina precedente",
  "refresh": "Aggiorna"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Annulla",
  "retry": "Riprova",
  "select": "Seleziona...",
  "remove": "Rimuovi",
  "uploadSelectedFiles": "Upload dei file selezionati",
  "dropFilesHere": "rilascia qui i file per l'upload",
  "statusFailed": "fallito",
  "statusUploaded": "upload effettuato",
  "statusUploading": "upload in corso",
  "headerStatusUploaded": "Fatto",
  "headerStatusUploading": "Upload in corso..."
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Grassetto",
  "createLink": "Inserisci hyperlink",
  "fontName": "Seleziona una famiglia di font",
  "fontNameInherit": "(font ereditato)",
  "fontSize": "Seleziona la dimensione del font",
  "fontSizeInherit": "(dimensione ereditata)",
  "formatBlock": "Formatta blocco",
  "indent": "Aumenta rientro",
  "insertHtml": "Inserisci HTML",
  "insertImage": "Inserisci immagine",
  "insertOrderedList": "Inserisci lista ordinata",
  "insertUnorderedList": "Inserisci lista non ordinata",
  "italic": "Italic",
  "justifyCenter": "Centra testo",
  "justifyFull": "Giustifica testo",
  "justifyLeft": "Allinea il testo a sinistra",
  "justifyRight": "Allinea il testo a destra",
  "outdent": "Riduci rientro",
  "strikethrough": "Barrato",
  "styles": "Stili",
  "subscript": "A pedice",
  "superscript": "In apice",
  "underline": "Sottolineato",
  "unlink": "Rimuovi hyperlink",
  "deleteFile": "Sicuro di voler rimuovere \"{0}\"?",
  "directoryNotFound": "Non è stata trovata alcuna directory con questo nome.",
  "emptyFolder": "Cartella vuota",
  "invalidFileType": "Il file selezionato \"{0}\" non è valido. I tipi di file supportati sono {1}.",
  "orderBy": "Ordina per:",
  "orderByName": "Nome",
  "orderBySize": "Dimensione",
  "overwriteFile": "'Un file con nome \"{0}\" esiste già nella directory corrente. Vuoi sovrascriverlo?",
  "uploadFile": "Upload",
  "backColor": "Colore sfondo",
  "foreColor": "Colore",
  "dropFilesHere": "rilascia qui i files per l'upload",
  "imageWebAddress": "Indirizzo Web",
  "dialogButtonSeparator": "o",
  "dialogCancel": "Annulla",
  "dialogInsert": "Inserisci",
  "imageAltText": "Testo alternativo",
  "linkOpenInNewWindow": "Apri link in una nuova finestra",
  "linkText": "Testo",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "Indirizzo Web",
  "search": "Cerca",
  "createTable": "Crea tabella",
  "addColumnLeft": "Aggiungi colonna a sinistra",
  "addColumnRight": "Aggiungi colonna a destra",
  "addRowAbove": "Aggiungi riga sopra",
  "addRowBelow": "Aggiungi riga sotto",
  "deleteColumn": "Rimuovi colonna",
  "deleteRow": "Rimuovi riga",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insert file",
  "insertFile1": "Insert file"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "tutto il giorno",
  "cancel": "Annulla",
  "editable": {
    "confirmation": "Sicuro di voler rimuovere questo evento?"
  },
  "date": "Data",
  "destroy": "Rimuovi",
  "editor": {
    "allDayEvent": "Giornata intera",
    "description": "Descrizione",
    "editorTitle": "Evento",
    "end": "Fine",
    "endTimezone": "Fuso orario finale",
    "repeat": "Ripeti",
    "separateTimezones": "Usa differenti fusi orari per l'inizio e la fine",
    "start": "Inizio",
    "startTimezone": "Fuso orario iniziale",
    "timezone": "Modifica fuso orario",
    "timezoneEditorButton": "Fuso orario",
    "timezoneEditorTitle": "Fusi orari",
    "title": "Titolo",
    "noTimezone": "No timezone"
  },
  "event": "Evento",
  "recurrenceMessages": {
    "deleteWindowOccurrence": "Rimuovi questa accorrenza",
    "deleteWindowSeries": "Rimuovi la serie",
    "deleteWindowTitle": "Rimuovi elemento ricorrente",
    "editWindowOccurrence": "Modifica l'evento corrente",
    "editWindowSeries": "Modifica la serie",
    "editWindowTitle": "Modifica elemento ricorrente",
    "deleteRecurring": "Vuoi rimuovere solo questo evento o la serie completa?",
    "editRecurring": "Vuoi modifcare solo questo evento o la serie completa?"
  },
  "save": "Salva",
  "time": "Tempo",
  "today": "Oggi",
  "views": {
    "agenda": "Agenda",
    "day": "Giorno",
    "month": "Mese",
    "week": "Settimana",
    "workWeek": "Work Week"
  },
  "deleteWindowTitle": "Rimuovi evento",
  "showFullDay": "Mostra il giorno completo",
  "showWorkDay": "Mostra solo le ore lavorative"
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Tutti i bordi",
  "insideBorders": "Bordi interni",
  "insideHorizontalBorders": "Bordi interni orizzontali",
  "insideVerticalBorders": "Bordi interni verticali",
  "outsideBorders": "Bordi esterni",
  "leftBorder": "Bordo sinistro",
  "topBorder": "Bordo superiore",
  "rightBorder": "Bordo destro",
  "bottomBorder": "Bordo inferiore",
  "noBorders": "Nessun bordo"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Applica",
  "save": "Salva",
  "cancel": "Annulla",
  "remove": "Rimuovi",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Formato",
    "categories": {
      "number": "Numero",
      "currency": "Valuta",
      "date": "Data"
      }
  },
  "fontFamilyDialog": {
    "title": "Carattere"
  },
  "fontSizeDialog": {
    "title": "Dimensione carattere"
  },
  "bordersDialog": {
    "title": "Bordi"
  },
  "alignmentDialog": {
    "title": "Allineamento",
    "buttons": {
     "justtifyLeft": "Allinea testo a sinistra",
     "justifyCenter": "Allinea al centro",
     "justifyRight": "Allinea testo a destra",
     "justifyFull": "Giustifica",
     "alignTop": "Allinea in alto",
     "alignMiddle": "Allinea al centro verticalmente",
     "alignBottom": "Allinea in basso"
    }
  },
  "mergeDialog": {
    "title": "Unisci celle",
    "buttons": {
      "mergeCells": "Unisci tutte le celle",
      "mergeHorizontally": "Unisci orizzontalmente",
      "mergeVertically": "Unisci verticalmente",
      "unmerge": "Dividi celle"
    }
  },
  "freezeDialog": {
    "title": "Blocca riquadri",
    "buttons": {
      "freezePanes": "Blocca riquadri",
      "freezeRows": "Blocca righe",
      "freezeColumns": "Blocca colonne",
      "unfreeze": "Sblocca riquadri"
    }
  },
  "validationDialog": {
    "title": "Convalida dati",
    "hintMessage": "Si prega di inserire un {0} valore valido {1}.",
    "hintTitle": "Convalida {0}",
    "criteria": {
      "any": "Qualsiasi valore",
      "number": "Numero",
      "text": "Testo",
      "date": "Data",
      "custom": "Formula personalizzata"
    },
    "comparers": {
      "greaterThan": "più grande di",
      "lessThan": "minore di",
      "between": "tra",
      "notBetween": "non tra",
      "equalTo": "uguale a",
      "notEqualTo": "non uguale a",
      "greaterThanOrEqualTo": "maggiore o uguale a",
      "lessThanOrEqualTo": "minore o uguale a"
    },
    "comparerMessages": {
      "greaterThan": "più grande di {0}",
      "lessThan": "minore di {0}",
      "between": "tra {0} e {1}",
      "notBetween": "non tra {0} e {1}",
      "equalTo": "uguale a {0}",
      "notEqualTo": "non uguale a {0}",
      "greaterThanOrEqualTo": "maggiore o uguale a {0}",
      "lessThanOrEqualTo": "minore o uguale a {0}",
      "custom": "che soddisfa la formula: {0}"
    },
    "labels": {
      "criteria": "Criteri",
      "comparer": "Operatore di confronto",
      "min": "Min",
      "max": "Max",
      "value": "Valore",
      "start": "Inizia",
      "end": "Fine",
      "onInvalidData": "In base ai dati non validi",
      "rejectInput": "Rifiuta di ingresso",
      "showWarning": "Mostra avviso",
      "showHint": "Mostra suggerimento",
      "hintTitle": "Titolo suggerimento",
      "hintMessage": "Messaggio suggerimento"
    },
    "placeholders": {
      "typeTitle": "Tipo di titolo",
      "typeMessage": "Tipo di messaggio"
    }
  },
  "saveAsDialog": {
    "title": "Salva con nome...",
    "labels": {
      "fileName": "Nome file",
      "saveAsType": "Salva come tipo"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Impossibile modificare parte di una cella unita."
  },
  "useKeyboardDialog": {
    "title": "Copia e incolla",
    "errorMessage": "Queste azioni non possono essere invocate attraverso il menu. Ti prego, utilizza le scorciatoie da tastiera:",
    "labels": {
      "forCopy": "per copiare",
      "forCut": "per tagliare",
      "forPaste": "per incollare"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "L'azione non può essere eseguita su selezione multipla."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Ordina dall'A alla Z ",
  "sortDescending": "Ordina dalla Z all'A",
  "filterByValue": "Filtra per valore",
  "filterByCondition": "Filtra per criteri",
  "apply": "Applica",
  "search": "Cerca",
  "clear": "Cancella",
  "blanks": "(Vuote)",
  "operatorNone": "Senza criteri",
  "and": "E",
  "or": "O",
  "operators": {
    "string": {
      "contains": "Testo contiene",
      "doesnotcontain": "Testo non contiene",
      "startswith": "Testo inizia con",
      "endswith": "Testo finisce con"
    },
    "date": {
      "eq": "È uguale a",
      "neq": "Non è uguale a",
      "lt": "È prima",
      "gt": "È dopo"
    },
    "number": {
      "eq": "È uguale a",
      "gt": "È più grande di",
      "gte": "È più grande o uguale a",
      "lt": "È più piccolo di",
      "lte": "È più piccolo o uguale a",
      "neq": "Non è uguale a"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Aggiungi colonna a sinistra",
  "addColumnRight": "Aggiungi colonna a destra",
  "addRowAbove": "Aggiungi riga sopra",
  "addRowBelow": "Aggiungi riga sotto",
  "alignment": "Allineamento",
  "alignmentButtons": {
  "justtifyLeft": "Allinea testo a sinistra",
  "justifyCenter": "Allinea al centro",
  "justifyRight": "Allinea testo a destra",
  "justifyFull": "Giustifica",
  "alignTop": "Allinea in alto",
  "alignMiddle": "Allinea al centro verticalmente",
  "alignBottom": "Allinea in basso"
  },
  "backgroundColor": "Colore riempimento",
  "bold": "Grassetto",
  "borders": "Bordi",
  "copy": "Copia",
  "cut": "Taglia",
  "deleteColumn": "Rimuovi colonna",
  "deleteRow": "Rimuovi riga",
  "filter": "Filtro",
  "fontFamily": "Carattere",
  "fontSize": "Dimensione carattere",
  "format": "Format personalizzato...",
  "formatTypes": {
    "automatic": "Automatico",
    "number": "Numero",
    "percent": "Percentuale",
    "financial": "Contabilità",
    "currency": "Valuta",
    "date": "Data",
    "time": "Ora",
    "dateTime": "Data e ora",
    "duration": "Durata",
    "moreFormats": "Altri formati..."
  },
  "formatDecreaseDecimal": "Riduce il numero di decimali",
  "formatIncreaseDecimal": "Aumenta il numero di decimali",
  "freeze": "Blocca riquadri",
  "freezeButtons": {
    "freezePanes": "Blocca riquadri",
    "freezeRows": "Blocca righe",
    "freezeColumns": "Blocca colonne",
    "unfreeze": "Sblocca riquadri"
  },
  "italic": "Corsivo",
  "merge": "Unisci celle",
  "mergeButtons": {
    "mergeCells": "Unisci tutte le celle",
    "mergeHorizontally": "Unisci orizzontalmente",
    "mergeVertically": "Unisci verticalmente",
    "unmerge": "Dividi celle"
  },
  "open": "Apri...",
  "paste": "Incolla",
  "quickAccess": {
    "redo": "Ripristina",
    "undo": "Annulla"
  },
  "saveAs": "Salva con nome...",
  "sortAsc": "Ordine crescente",
  "sortDesc": "Ordine decrescente",
  "sortButtons": {
    "sortSheetAsc": "Ordina fogli dall'A alle Z",
    "sortSheetDesc": "Ordina fogli dalle Z all'A",
    "sortRangeAsc": "Ordina intervalli dall'A alle Z",
    "sortRangeDesc": "Ordina intervalli dalle Z all'A"
  },
  "textColor": "Colore carattere",
  "textWrap": "Testo a capo",
  "underline": "Sottolineato",
  "validation": "Convalida dati..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Impossibile inserire cellule a causa di una possibile perdita di dati. Seleziona un altro punto di inserimento o cancellare i dati dalla fine del foglio di lavoro.",
    "filterRangeContainingMerges": "Impossibile creare un filtro all'interno di un intervallo che contiene celle unite."
  },
  "tabs": {
    "home": "Home",
    "insert": "Inserisci",
    "data": "Dati"
  }
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Vicino"
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
  "cancel": "Annulla"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Annulla"
});
}

})(window.kendo.jQuery);

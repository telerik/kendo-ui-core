

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
    "neq": "Non è uguale a"
  },
  "number": {
    "eq": "È uguale a",
    "gt": "È più grande di",
    "gte": "È più grande o uguale a",
    "lt": "È più piccolo di",
    "lte": "È più piccolo o uguale a",
    "neq": "Non è uguale a"
  },
  "string": {
    "contains": "Contiene",
    "doesnotcontain": "Non contiene",
    "endswith": "Finisce con",
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "startswith": "Inizia con"
  },
  "enum": {
    "eq": "È uguale a",
    "neq": "Non è uguale a"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Colonne",
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
  "confirmation": "Sicuro di voler rimuovere questo evento?",
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
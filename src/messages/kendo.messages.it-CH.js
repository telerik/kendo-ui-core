(function ($, undefined) {
  /* FlatColorPicker messages */

  if (kendo.ui.FlatColorPicker) {
    kendo.ui.FlatColorPicker.prototype.options.messages =
    $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
      "apply": "Applica",
      "cancel": "Annulla",
      "noColor": "nessun colore",
      "clearColor": "colore chiaro"
    });
    }
  
    /* ColorPicker messages */
  
    if (kendo.ui.ColorPicker) {
     kendo.ui.ColorPicker.prototype.options.messages =
    $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
      "apply": "Applica",
      "cancel": "Annulla",
      "noColor": "nessun colore",
      "clearColor": "colore chiaro"
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
  

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {
  kendo.ui.DateRangePicker.prototype.options.messages =
  $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages,{
    "startLabel": "Avvio",
    "endLabel": "Fine"
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
    "italic": "Corsivo",
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
    "unlink": "Rimuove hyperlink",
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
    "imageWebAddress": "Indirizzo Web",
    "dialogButtonSeparator": "o",
    "dialogCancel": "Annulla",
    "dialogInsert": "Inserisci",
    "imageAltText": "Testo alternativo",
    "linkOpenInNewWindow": "Apri link in una nuova finestra",
    "linkText": "Testo",
    "linkToolTip": "ToolTip",
    "linkWebAddress": "Indirizzo Web",
    "createTable": "Crea tabella",
    "addColumnLeft": "Aggiunge colonna a sinistra",
    "addColumnRight": "Aggiunge colonna a destra",
    "addRowAbove": "Aggiunge riga sopra",
    "addRowBelow": "Aggiunge riga sotto",
    "deleteColumn": "Rimuove colonna",
    "deleteRow": "Rimuove riga",
    "viewHtml": "View HTML",
    "dialogUpdate": "Aggiornare",
    "insertFile": "Insert file",
    "accessibilityTab": "Accessibilità",
    "associateCellsWithHeaders": "Celle di collegamento con intestazioni",
    "alignLeft": "Allinea a sinistra",
    "alignCenter": "Allinea al centro",
    "alignRight": "Allinea a destra",
    "alignLeftTop": "Allinea in alto a sinistra",
    "alignCenterTop": "Centrare e allinea in alto",
    "alignRightTop": "Allinea in alto a destra",
    "alignLeftMiddle": "Allinea al centro a sinistra",
    "alignCenterMiddle": "Centrare e allinea al centro",
    "alignRightMiddle": "Allinea a destra al centro",
    "alignLeftBottom": "Allinea in basso a sinistra",
    "alignCenterBottom": "Centrare e allinea in basso",
    "alignRightBottom": "Allinea in basso a destra",
    "alignRemove": "Rimuovere allineamento",
    "alignment": "Allineamento",
    "background": "Sfondo",
    "border": "Bordi",
    "borderStyle": "Stile dei bordi",
    "caption": "didascalia",
    "cellMargin": "Margine cella",
    "cellPadding": "Imbottitura cella",
    "cellSpacing": "Spaziatura celle",
    "cellTab": "Celle",
    "cleanFormatting": "Elimina formattazione",
    "collapseBorders": "Nascondi telaio",
    "columns": "Colonne",
    "cssClass": "Class CSS",
    "dialogOk": "OK",
    "fileTitle": "Titolo",
    "fileWebAddress": "Indirizzo web",
    "formatting": "Formatta",
    "height": "Altezza",
    "id": "Id",
    "imageWebAddress": "Indirizzo web",
    "imageWidth": "Larghezza (px)",
    "imageHeight": "Altezza (px)",
    "overflowAnchor": "Avanti...",
    "rows": "Riga",
    "selectAllCells": "Seleziona tutte le celle",
    "summary": "Riepilogo",
    "tableTab": "Tabella",
    "tableWizard": "Tabelle guiidat",
    "units": "Unità",
    "width": "Larghezza",
    "wrapText": "Ritorno a capo"
   });
  }

  /* FileBrowser messages */

  if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
    $.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
      "uploadFile": "Upload",
      "orderBy": "Ordina per:",
      "orderByName": "Nome",
      "orderBySize": "Dimensione",
      "directoryNotFound": "Non è stata trovata alcuna directory con questo nome.",
      "emptyFolder": "Cartella vuota",
      "deleteFile": "Sicuro di voler rimuovere \"{0}\"?",
      "invalidFileType": "Il file selezionato \"{0}\" non è valido. I tipi di file supportati sono {1}.",
      "overwriteFile": "Un file con nome \"{0}\" esiste già nella directory corrente. Vuoi sovrascriverlo?",
      "dropFilesHere": "Rilascia qui i files per l'upload",
      "search": "Cerca"
    });
    }

/* FilterCell messages */

if (kendo.ui.FilterCell) {
  kendo.ui.FilterCell.prototype.options.messages =
  $.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
    "clear": "Rimuove",
    "filter": "Filtro",
    "isFalse": "è falso",
    "isTrue": "è vero",
    "operator": "Operatore"
  });
  }
  
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
    "isnotempty": "Non è vuoto",
    "isnullorempty": "Non ha un valore",
    "isnotnullorempty": "Ha un valore"
  },
  "enums": {
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
  kendo.ui.FilterMenu.prototype.options.messages =
  $.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
    "and": "E",
    "clear": "Rimuove",
    "filter": "Filtro",
    "info": "Mostra elementi il cui valore:",
    "title": "Mostra elementi il cui valore:",
    "isFalse": "è falso",
    "isTrue": "è vero",
    "or": "O",
    "selectValue": "-Seleziona valore-",
    "cancel": "Annulla",
    "operator": "Operatore",
    "value": "Valore"
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
    "isnotempty": "Non è vuoto",
    "isnullorempty": "hat keinen Wert",
    "isnotnullorempty": "hat einen Wert"
  },
  "enums": {
    "eq": "È uguale a",
    "neq": "Non è uguale a",
    "isnull": "È nullo",
    "isnotnull": "Non è nullo"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
  kendo.ui.FilterMultiCheck.prototype.options.messages =
  $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
    "checkAll": "Seleziona tutti",
    "clear": "Rimouvi",
    "filter": "Filtern",
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
      "create": "Aggiunge nuovo elemento",
      "destroy": "Rimuove",
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
      "confirmDelete": "Rimuove"
    },
    "noRecords": "Nessun record disponibile.",
    "expandCollapseColumnHeader": "",
    "groupHeader": "Ctrl + spazio per il raggruppamento",
    "ungroupHeader": "Ctrl + Vuoto libero per il raggruppamento"  
  });
  }

 /* TreeList messages */

 if (kendo.ui.TreeList) {
  kendo.ui.TreeList.prototype.options.messages =
    $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
      "noRows": "Nessun record trovato",
      "loading": "Carica...",
      "requestFailed": "Richiesta fallita",
      "retry": "Riprova",
      "commands": {
        "edit": "Edit",
        "update": "Aggiorna",
        "canceledit": "Annulla",
        "create": "Creare nuovo elemento",
        "createchild": "Creare un record figlio",
        "destroy": "Rimuove",
        "excel": "Export to Excel",
        "pdf": "Export to PDF"
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
  
  /* NumericTextBox messages */

  if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
      $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
        "upArrowText": "Aumentare il valore",
        "downArrowText": "Riduci il valore"
      });
  }

  /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
  kendo.ui.MediaPlayer.prototype.options.messages =
  $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
    "pause": "Sospendi",
    "play": "Riproduzione",
    "mute": "Silenzia",
    "unmute": "Rimuove silenzio",
    "quality": "Qualità",
    "fullscreen": "Schermo intero"
  });
  }

/* Pager messages */

if (kendo.ui.Pager) {
  kendo.ui.Pager.prototype.options.messages =
  $.extend(true, kendo.ui.Pager.prototype.options.messages,{
    "allPages": "Tutti",
    "display": "{0} - {1} di {2} elementi",
    "empty": "Nessun elemento da visualizzare",
    "first": "Vai alla prima pagina",
    "itemsPerPage": "Elementi per pagina",
    "last": "Vai all'ultima pagina",
    "next": "Vai alla prossima pagina",
    "of": "di {0}",
    "page": "Pagina",
    "previous": "Vai alla pagina precedente",
    "refresh": "Aggiorna",
    "morePages": "Altre pagine"
  });
  }
  
  /* TreeListPager messages */
  
  if (kendo.ui.TreeListPager) {
  kendo.ui.TreeListPager.prototype.options.messages =
  $.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
    "allPages": "Tutti",
    "display": "{0} - {1} di {2} elementi",
    "empty": "Nessun elemento da visualizzare",
    "first": "Vai alla prima pagina",
    "itemsPerPage": "elementi per pagina",
    "last": "Vai all'ultima pagina",
    "next": "Vai alla prossima pagina",
    "of": "di {0}",
    "page": "Pagina",
    "previous": "Vai alla pagina precedente",
    "refresh": "Aggiorna",
    "morePages": "Altre pagine"
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
    "mobileLabel": "Finisce"
  },
  "frequencies": {
    "daily": "Ogni giorno",
    "monthly": "Ogni mese",
    "never": "Mai",
    "weekly": "Ogni settimana",
    "yearly": "Ogni anno",
    "hourly": "Oraria"
  },

  "hourly": {
    "repeatEvery": "Ripeti ogni:r:",
    "interval": " ora(e)"
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
  "destroy": "Rimuove",
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
    "noTimezone": "No timezone",
    "ariaEventLabel": "{0} a {1:D} alle {2:t}",
    "ariaSlotLabel": "Selezionato da {0:t} a {1:t}",
    "resetSeries": "Serie Reset",
  },
  "event": "Evento",
  "recurrenceMessages": {
    "deleteWindowOccurrence": "Rimuove questa accorrenza",
    "deleteWindowSeries": "Rimuove la serie",
    "deleteWindowTitle": "Rimuove elemento ricorrente",
    "editWindowOccurrence": "Modifica l'evento corrente",
    "editWindowSeries": "Modifica la serie",
    "editWindowTitle": "Modifica elemento ricorrente",
    "deleteRecurring": "Vuoi rimuovere solo questo evento o la serie completa?",
    "editRecurring": "Vuoi modifcare solo questo evento o la serie completa?",
    "deleteRecurringConfirmation": "Sei sicuro di voler cancellare questo evento?",
    "deleteSeriesConfirmation": "Sei sicuro di voler cancellare l'intera serie?",
    "resetSeriesWindowTitle": "Serie di appumnamenti Reset"
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
  "deleteWindowTitle": "Rimuove evento",
  "showFullDay": "Mostra il giorno completo",
  "showWorkDay": "Mostra solo le ore lavorative"
});
}

  /* Slider messages */

  if (kendo.ui.Slider) {
    kendo.ui.Slider.prototype.options =
      $.extend(true, kendo.ui.Slider.prototype.options,{
        "increaseButtonTitle": "Aumentare",
        "decreaseButtonTitle": "Diminuire"
      });
  }
  
  /* ListBox messaages */
  
  if (kendo.ui.ListBox) {
    kendo.ui.ListBox.prototype.options.messages =
      $.extend(true, kendo.ui.ListBox.prototype.options.messages,{
        "tools": {
          "remove": "Rimuove",
          "moveUp": "Alzarsi",
          "moveDown": "Scendere",
          "transferTo": "Trasferire a",
          "transferFrom": "Trasferire da",
          "transferAllTo": "Tutti i trasferimenti a",
          "transferAllFrom": "Tutti i trasferimenti da"
        }
      });
  }
  
  /* TreeView messages */

  if (kendo.ui.TreeView) {
    kendo.ui.TreeView.prototype.options.messages =
      $.extend(true, kendo.ui.TreeView.prototype.options.messages,{
        "loading": "Carica...",
        "requestFailed": "Richiesta fallita",
        "retry": "Riprova"
      });
  }

/* Upload messages */

if (kendo.ui.Upload) {
  kendo.ui.Upload.prototype.options.localization =
  $.extend(true, kendo.ui.Upload.prototype.options.localization,{
    "cancel": "Annulla",
    "retry": "Riprova",
    "select": "Seleziona...",
    "remove": "Rimuove",
    "uploadSelectedFiles": "Upload dei file selezionati",
    "dropFilesHere": "rilascia qui i file per l'upload",
    "statusFailed": "fallito",
    "statusUploaded": "upload effettuato",
    "statusUploading": "upload in corso",
    "headerStatusUploaded": "Fatto",
    "headerStatusUploading": "Upload in corso...",
    "clearSelectedFiles": "Rimouvi",
    "statusWarning": "Avviso",
    "invalidMaxFileSize": "Dimensione file troppo grande.",
    "invalidMinFileSize": "Dimensione file troppo piccola.",
    "invalidFileExtension": "Tipo di file non consentito."
    });
  }
  
  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
        "required": "{0} è richiesto",
        "pattern": "{0} non è valido",
        "min": "{0} dovrebbe essere maggiore di o uguale a {1}",
        "max": "{0} dovrebbe essere minore di o uguale a {1}",
        "step": "{0} non è valido",
        "email": "{0} non è un formato email corretto",
        "url": "{0} non è un URL valido",
        "date": "{0} non è un formato data valido",
        "dateCompare": "La data di fine dovrebbe essere maggiore o uguale di quella di inizio"
      });
  }

  /* kendo.ui.progress method */
  if (kendo.ui.progress) {
    kendo.ui.progress.messages =
      $.extend(true, kendo.ui.progress.messages, {
        loading: "Carica..."
      });
  }

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Vicino"
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
  
/* DateInput */
  if (kendo.ui.DateInput) {
    kendo.ui.DateInput.prototype.options.messages =
      $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
        "year": "Anno",
        "month": "Mese",
        "day": "Giorno",
        "weekday": "Giorno della settimana",
        "hour": "Ore",
        "minute": "Minuti",
        "second": "Secondi",
        "dayperiod": "AM/PM"
      });
  }

})(window.kendo.jQuery);
(function ($, undefined) {
  /* FlatColorPicker messages */

  if (kendo.ui.FlatColorPicker) {
    kendo.ui.FlatColorPicker.prototype.options.messages =
      $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
        "apply": "Εφαρμογή",
        "cancel": "Άκυρο",
        "noColor": "Χωρίς Χρώμα",
        "clearColor": "Καθαρό Χρώμα"
      });
  }

  /* ColorPicker messages */

  if (kendo.ui.ColorPicker) {
    kendo.ui.ColorPicker.prototype.options.messages =
      $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
        "apply": "Εφαρμογή",
        "cancel": "Άκυρο",
        "noColor": "Χωρίς Χρώμα",
        "clearColor": "Καθαρό Χρώμα"
      });
  }

  /* ColumnMenu messages */

  if (kendo.ui.ColumnMenu) {
    kendo.ui.ColumnMenu.prototype.options.messages =
      $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
        "sortAscending": "Αύξουσα Ταξινόμηση",
        "sortDescending": "Φθίνουσα Ταξινόμηση",
        "filter": "Φίλτρο",
        "columns": "Στήλες",
        "done": "Εφαρμογή",
        "settings": "Στήλη Ρυθμίσεων",
        "lock": "Κλείδωμα",
        "unlock": "Ξεκλείδωμα"
      });
  }

  /* Editor messages */

  if (kendo.ui.Editor) {
    kendo.ui.Editor.prototype.options.messages =
      $.extend(true, kendo.ui.Editor.prototype.options.messages, {
        "bold": "Έντονα",
        "italic": "Πλάγια",
        "underline": "Υπογράμμιση",
        "strikethrough": "Διακριτή Διαγραφή",
        "superscript": "Εκθέτης",
        "subscript": "Δείκτης",
        "justifyCenter": "Στοίχιση Κέντρο",
        "justifyLeft": "Στοίχιση Αριστερά",
        "justifyRight": "Στοίχιση Δεξιά",
        "justifyFull": "Justify",
        "insertUnorderedList": "Τοποθετήστε μη διατεταγμένη λίστα",
        "insertOrderedList": "Τοποθετήστε διατεταγμένη λίστα",
        "indent": "Εσοχή",
        "outdent": "Προεξοχή",
        "createLink": "Εισαγωγή Συνδέσμου",
        "unlink": "Αφαίρεση Συνδέσμου",
        "insertImage": "Εισαγωγή Εικόνας",
        "insertFile": "Εισαγωγή Αρχείου",
        "insertHtml": "Εισαγωγή HTML",
        "viewHtml": "Επισκόπηση HTML",
        "fontName": "Επιλογή Οικογένειας Γραμματοσειράς",
        "fontNameInherit": "(Κληρονομημένη Γραμματοσειρά)",
        "fontSize": "Επιλογή Μεγέθους Γραμματοσειράς",
        "fontSizeInherit": "(Κληρονομημένη Μέγεθος)",
        "formatBlock": "Μορφοποίηση",
        "formatting": "Μορφοποίηση",
        "foreColor": "Χρώμα",
        "backColor": "Χρώμα Φόντου",
        "style": "Στυλ",
        "emptyFolder": "Κενός Φάκελος",
        "uploadFile": "Μεταφόρτωση",
        "orderBy": "Διευθέτηση με:",
        "orderBySize": "Μέγεθος",
        "orderByName": "Όνομα",
        "invalidFileType": "Το επιλεγμένο αρχείο \"{0}\" δεν είναι έγκυρο. Υποστηριζόμενοι τύποι είναι οι {1}.",
        "deleteFile": 'Είστε σίγουροι ότι θέλετε να διαγράψετε το "{0}"?',
        "overwriteFile": 'Το αρχείο με όνομα "{0}" υπάρχει ήδη στον συγκεκριμένο φάκελο. Θέλετε να το αντικαταστήσετε?',
        "directoryNotFound": "Το όνομα του φακέλου δεν βρέθηκε.",
        "imageWebAddress": "Ηλεκτρονική Διεύθυνση",
        "imageAltText": "Εναλλακτικό Κείμενο",
        "imageWidth": "Πλάτος (px)",
        "imageHeight": "Ύψος (px)",
        "fileWebAddress": "Ηλεκτρονική Διεύθυνση",
        "fileTitle": "Τίτλος",
        "linkWebAddress": "Ηλεκτρονική Διεύθυνση",
        "linkText": "Κείμενο",
        "linkToolTip": "ToolTip",
        "linkOpenInNewWindow": "Άνοιγμα συνδέσμου σε νέα καρτέλα.",
        "dialogUpdate": "Ανανέωση",
        "dialogInsert": "Εισαγωγή",
        "dialogButtonSeparator": "ή",
        "dialogCancel": "Άκυρο",
        "cleanFormatting": "Καθαρίστε τη Μορφοποίηση",
        "createTable": "Δημιουργία πίνακα",
        "addColumnLeft": "Εισαγωγή στήλης αριστερά",
        "addColumnRight": "Εισαγωγή στήλης δεξιά",
        "addRowAbove": "Εισαγωγή γραμμής πάνω",
        "addRowBelow": "Εισαγωγή γραμμής κάτω",
        "deleteRow": "Διαγραφή γραμμής",
        "deleteColumn": "Διαγραφή στήλης",
        "dialogOk": "Εντάξει",
        "tableWizard": "Οδηγός πίνακα",
        "tableTab": "Πίνακας",
        "cellTab": "Κελί",
        "accessibilityTab": "Προσβασιμότητα",
        "caption": "Λεζάντα",
        "summary": "Περίληψη",
        "width": "Πλάτος",
        "height": "Ύψος",
        "cellSpacing": "Κενό Κελιών",
        "cellPadding": "Επένδυση Κελιών",
        "cellMargin": "Περιθώριο Κελιών",
        "alignment": "Ευθυγράμμιση",
        "background": "Φόντο",
        "cssClass": "Κλάση CSS",
        "id": "ID",
        "border": "Περιθώριο",
        "borderStyle": "Στυλ Περιθώριου",
        "collapseBorders": "Ένωση Περιθώριου",
        "wrapText": "Αναδίπλωση Κειμένου",
        "associateCellsWithHeaders": "Σύνδεση Κελιών με Επικεφαλίδες",
        "alignLeft": "Ευθυγράμμιση Αριστερά",
        "alignCenter": "Ευθυγράμμιση Κέντρο",
        "alignRight": "Ευθυγράμμιση Δεξιά",
        "alignLeftTop": "Ευθυγράμμιση Αριστερά Πάνω",
        "alignCenterTop": "Ευθυγράμμιση Κέντρο Πάνω",
        "alignRightTop": "Ευθυγράμμιση Δεξιά Πάνω",
        "alignLeftMiddle": "Ευθυγράμμιση Αριστερά Μέση",
        "alignCenterMiddle": "Ευθυγράμμιση Κέντρο Μέση",
        "alignRightMiddle": "Ευθυγράμμιση Δεξιά Μέση",
        "alignLeftBottom": "Ευθυγράμμιση Αριστερά Κάτω",
        "alignCenterBottom": "Ευθυγράμμιση Κέντρο Κάτω",
        "alignRightBottom": "Ευθυγράμμιση Δεξιά Κάτω",
        "alignRemove": "Αφαίρεση Ευθυγράμμισης",
        "columns": "Στήλες",
        "rows": "Γραμμές",
        "selectAllCells": "Επιλογή όλων των κελιών"
      });
  }

  /* FileBrowser messages */

  if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
      $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
        "uploadFile": "Μεταφόρτωση",
        "orderBy": "Διευθέτηση με",
        "orderByName": "Όνομα",
        "orderBySize": "Μέγεθος",
        "directoryNotFound": "Δεν βρέθηκε Φάκελος με αυτό το όνομα.",
        "emptyFolder": "Κενός Φάκελος",
        "deleteFile": 'Είστε σίγουροι ότι θέλετε να διαγράψετε το "{0}"?',
        "invalidFileType": "Το επιλεγμένο αρχείο \"{0}\" δνε είναι έγκυρο. Υποστηριζόμενοι τύποι αρχείων είναι {1}.",
        "overwriteFile": "Το αρχείο με όνομα \"{0}\" υπάρχει ήδη σε αυτό το φάκελο. Θέλετε να το αντικαταστήσετε?",
        "dropFilesHere": "Σύρτε το αρχείο για μεταφόρτωση",
        "search": "Αναζήτηση"
      });
  }

  /* FilterCell messages */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.messages =
      $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
        "isTrue": "είναι αληθές",
        "isFalse": "είναι ψευδές",
        "filter": "Φίλτρο",
        "clear": "Εκκαθάριση",
        "operator": "Χειριστής"
      });
  }

  /* FilterCell operators */

  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "string": {
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με",
          "startswith": "Ξεκινά με",
          "contains": "Περιέχει",
          "doesnotcontain": "Δεν περιέχει",
          "endswith": "Τελειώνει με",
          "isnull": "Είναι null",
          "isnotnull": "Δεν είναι null",
          "isempty": "Είναι κενό",
          "isnotempty": "Δεν είναι κενό"
        },
        "number": {
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με",
          "gte": "Είναι μεγαλύτερο ή ίσο με",
          "gt": "Είναι μεγαλύτερο από",
          "lte": "Είναι μικρότερο ή ίσο με",
          "lt": "Είναι μικρότερο από",
          "isnull": "Είναι null",
          "isnotnull": "Δεν είναι null"
        },
        "date": {
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με",
          "gte": "Είναι μετά ή ίσο με",
          "gt": "Είναι μετά",
          "lte": "Είναι πριν ή ίσο με",
          "lt": "Είναι πριν",
          "isnull": "Είναι null",
          "isnotnull": "Δεν είναι null"
        },
        "enums": {
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με",
          "isnull": "Είναι null",
          "isnotnull": "Δεν είναι null"
        }
      });
  }

  /* FilterMenu messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
        "info": "Δείξε αντικείμενα με τιμή που:",
        "isTrue": "είναι αληθές",
        "isFalse": "είναι ψευδές",
        "filter": "Φίλτρο",
        "clear": "Εκκαθάριση",
        "and": "Και",
        "or": "Ή",
        "selectValue": "-Επιλογή Τιμής-",
        "operator": "Σύμβολο",
        "value": "Τιμή",
        "cancel": "Άκυρο"
      });
  }

  /* FilterMenu operator messages */

  if (kendo.ui.FilterMenu) {
    kendo.ui.FilterMenu.prototype.options.operators =
      $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
        "string": {
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με",
          "startswith": "Ξεκινά με",
          "contains": "Περιέχει",
          "doesnotcontain": "Δεν περιέχει",
          "endswith": "Τελειώνει με",
          "isnull": "Είναι null",
          "isnotnull": "Δεν είναι null",
          "isempty": "Είναι κενό",
          "isnotempty": "Δεν είναι κενό"
        },
        "number": {
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με",
          "gte": "Είναι μεγαλύτερο ή ίσο με",
          "gt": "Είναι μεγαλύτερο από",
          "lte": "Είναι μικρότερο ή ίσο με",
          "lt": "Είναι μικρότερο από",
          "isnull": "Είναι null",
          "isnotnull": "Δεν είναι null"
        },
        "date": {
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με",
          "gte": "Είναι μετά ή ίσο με",
          "gt": "Είναι μετά",
          "lte": "Είναι πριν ή ίσο με",
          "lt": "Είναι πριν",
          "isnull": "Είναι null",
          "isnotnull": "Δεν έιναι null"
        },
        "enums": {
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με",
          "isnull": "Είναι null",
          "isnotnull": "Δεν είναι null"
        }
      });
  }

  /* FilterMultiCheck messages */

  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Επιλογή όλων",
        "clear": "Εκκαθάριση",
        "filter": "Φίλτρο",
        "search": "Αναζήτηση"
      });
  }

  /* Gantt messages */

  if (kendo.ui.Gantt) {
    kendo.ui.Gantt.prototype.options.messages =
      $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
        "actions": {
          "addChild": "Προσθήκη Παιδιού",
          "append": "Προσθήκη Εργασίας",
          "insertAfter": "Προσθήκη κάτω",
          "insertBefore": "Προσθήκη πάνω",
          "pdf": "Εξαγωγή σε PDF"
        },
        "cancel": "Άκυρο",
        "deleteDependencyWindowTitle": "Διαγραφή Εξάρτησης",
        "deleteTaskWindowTitle": "Διαγραφή Εργασίας",
        "destroy": "Διαγραφή",
        "editor": {
          "assingButton": "Ανάθεση",
          "editorTitle": "Εργασία",
          "end": "Τέλος",
          "percentComplete": "Ολοκλήρωση",
          "resources": "Πόροι",
          "resourcesEditorTitle": "Πόροι",
          "resourcesHeader": "Πόροι",
          "start": "Αρχή",
          "title": "Τίτλος",
          "unitsHeader": "Μονάδες"
        },
        "save": "Αποθήκευση",
        "views": {
          "day": "Ημέρα",
          "end": "Τέλος",
          "month": "Μήνας",
          "start": "Αρχή",
          "week": "Εβδομάδα",
          "year": "Χρόνος"
        }
      });
  }

  /* Grid messages */

  if (kendo.ui.Grid) {
    kendo.ui.Grid.prototype.options.messages =
      $.extend(true, kendo.ui.Grid.prototype.options.messages, {
        "commands": {
          "cancel": "Ακύρωση αλλαγών",
          "canceledit": "Ακύρωση",
          "create": "Προσθήκη Εγγραφής",
          "destroy": "Διαγραφή",
          "edit": "Επεξεργασία",
          "excel": "Εξαγωγή σε Excel",
          "pdf": "Εξαγωγή σε PDF",
          "save": "Αποθήκευση Αλλαγών",
          "select": "Επιλογή",
          "update": "Ανανέωση"
        },
        "editable": {
          "cancelDelete": "Άκυρο",
          "confirmation": "Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την εγγραφή;",
          "confirmDelete": "Διαγραφή"
        },
        "noRecords": "Δεν υπάρχουν εγγραφές."
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Δεν υπάρχουν εγγραφές",
        "loading": "Φόρτωση...",
        "requestFailed": "Αποτυχία Αίτησης.",
        "retry": "Ξαναδοκιμάστε",
        "commands": {
          "edit": "Επεξεργασία",
          "update": "Ανανέωση",
          "canceledit": "Άκυρο",
          "create": "Προσθήκη Εγγραφής",
          "createchild": "Προσθήκη Εγγραφής Παιδιού",
          "destroy": "Διαγραφή",
          "excel": "Εξαγωγή σε Excel",
          "pdf": "Εξαγωγή σε PDF"
        }
      });
  }

  /* Groupable messages */

  if (kendo.ui.Groupable) {
    kendo.ui.Groupable.prototype.options.messages =
      $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
        "empty": "Τραβήξτε μια στήλη εδώ για να φιλτραριστεί με αυτή τη στήλη"
      });
  }

  /* NumericTextBox messages */

  if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
      $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
        "upArrowText": "Αύξηση Τιμής",
        "downArrowText": "Μείωση Τιμής"
      });
  }

  /* MediaPlayer messages */

  if (kendo.ui.MediaPlayer) {
    kendo.ui.MediaPlayer.prototype.options.messages =
      $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
        "pause": "Παύση",
        "play": "Εκκίνηση",
        "mute": "Σίγαση",
        "unmute": "Κατάργηση Σίγασης",
        "quality": "Ποιότητα",
        "fullscreen": "Πλήρης Οθόνη"
      });
  }

  /* Pager messages */

  if (kendo.ui.Pager) {
    kendo.ui.Pager.prototype.options.messages =
      $.extend(true, kendo.ui.Pager.prototype.options.messages, {
        "allPages": "Όλα",
        "display": "{0} - {1} από {2} αντικείμενα",
        "empty": "Δεν υπάρχουν αντικείμενα",
        "page": "Σελίδα",
        "of": "από {0}",
        "itemsPerPage": "αντικείμενα ανα σελίδα",
        "first": "Πηγαίντε στην πρώτη σελίδα",
        "previous": "Πηγαίντε στην προηγούμενη σελίδα",
        "next": "Πηγαίντε στην επόμενη σελίδα",
        "last": "Πηγαίντε στην τελευταία σελίδα",
        "refresh": "Ανανέωση",
        "morePages": "Περισσότερες Σελίδες"
      });
  }

  /* PivotGrid messages */

  if (kendo.ui.PivotGrid) {
    kendo.ui.PivotGrid.prototype.options.messages =
      $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
        "measureFields": "Σύρετε πεδία εδώ",
        "columnFields": "Σύρετε στήλη εδώ",
        "rowFields": "Σύρετε γραμμές εδώ"
      });
  }

  /* PivotFieldMenu messages */

  if (kendo.ui.PivotFieldMenu) {
    kendo.ui.PivotFieldMenu.prototype.options.messages =
      $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
        "info": "Δείξε αντικείμενα με τιμή που:",
        "filterFields": "Φίλτρο Πεδίων",
        "filter": "Φίλτρο",
        "include": "Συμπεριέλαβε πεδία...",
        "title": "Πεδία που θα συμπεριληφθούν",
        "clear": "Εκκαθάριση",
        "ok": "Εντάξει",
        "cancel": "Άκυρο",
        "operators": {
          "contains": "Περιέχει",
          "doesnotcontain": "Δεν περιέχει",
          "startswith": "Ξεκινά με",
          "endswith": "Τελειώνει με",
          "eq": "Είναι ίσο με",
          "neq": "Δεν είναι ίσο με"
        }
      });
  }

  /* RecurrenceEditor messages */

  if (kendo.ui.RecurrenceEditor) {
    kendo.ui.RecurrenceEditor.prototype.options.messages =
      $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
        "frequencies": {
          "never": "Ποτέ",
          "hourly": "Ωριαία",
          "daily": "Ημερήσια",
          "weekly": "Εβδομαδιαία",
          "monthly": "Μηνιαία",
          "yearly": "Ετήσια"
        },
        "hourly": {
          "repeatEvery": "Επανάληψη κάθε: ",
          "interval": " ώρα(ες)"
        },
        "daily": {
          "repeatEvery": "Επανάληψη κάθε: ",
          "interval": " μέρα(ες)"
        },
        "weekly": {
          "interval": " εβδομάδα(ες)",
          "repeatEvery": "Επανάληψη κάθε: ",
          "repeatOn": "Επανάληψη την: "
        },
        "monthly": {
          "repeatEvery": "Επανάληψη κάθε: ",
          "repeatOn": "Επανάληψη τον: ",
          "interval": " μήνα(ες)",
          "day": "Ημέρα "
        },
        "yearly": {
          "repeatEvery": "Επανάληψη κάθε: ",
          "repeatOn": "Επανάληψη το: ",
          "interval": " χρόνο(ια)",
          "of": " από "
        },
        "end": {
          "label": "Τέλος:",
          "mobileLabel": "Τελειώνει",
          "never": "Ποτέ",
          "after": "Μετά ",
          "occurrence": " εμφάνιση(εις)",
          "on": "Τον "
        },
        "offsetPositions": {
          "first": "πρώτο",
          "second": "δεύτερο",
          "third": "τρίτο",
          "fourth": "τέταρο",
          "last": "τελευταίο"
        },
        "weekdays": {
          "day": "ημέρα",
          "weekday": "καθημερινή",
          "weekend": "σαββατοκύριακο"
        }
      });
  }

  /* Scheduler messages */

  if (kendo.ui.Scheduler) {
    kendo.ui.Scheduler.prototype.options.messages =
      $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
        "allDay": "όλη μέρα",
        "date": "Ημερομηνία",
        "event": "Γεγονός",
        "time": "Ώρα",
        "showFullDay": "Δείξε ολόκληρη ημέρα",
        "showWorkDay": "Δείξε εργάσιμες ώρες",
        "today": "Σήμερα",
        "save": "Αποθήκευση",
        "cancel": "Άκυρο",
        "destroy": "Διαγραφή",
        "deleteWindowTitle": "Διαγραφή γεγονότος",
        "ariaSlotLabel": "Επιλογή από {0:t} έως {1:t}",
        "ariaEventLabel": "{0} από {1:D} την {2:t}",
        "editable": {
          "confirmation": "Είστε σίγουροι ότι θέλετε να διαγράψετε το γεγονός;"
        },
        "views": {
          "day": "Ημέρα",
          "week": "Εβδομάδα",
          "workWeek": "Εργάσιμη Εβδομάδα",
          "agenda": "Ατζέντα",
          "month": "Μήνας"
        },
        "recurrenceMessages": {
          "deleteWindowTitle": "Διαγραφή επαναλαμβανόμενων αντικειμένων",
          "deleteWindowOccurrence": "Διαγραφή τρέχουσας εμφάνισης",
          "deleteWindowSeries": "Διαγραφή της σειράς",
          "editWindowTitle": "Επεξεργασία επαναλαμβανόμενου αντικειμένου",
          "editWindowOccurrence": "Επεξεργασία τρέχουσας εμφάνισης",
          "editWindowSeries": "Επεξεργασία της σειράς",
          "deleteRecurring": "Θέλετε να διαγράψετε μόνο αυτό το γεγονός ή ολόκληρη τη σειρά;",
          "editRecurring": "Θέλετε να επεξεργαστείτε μονο αυτό το γεγονός ή ολόκληρη της σειρά;"
        },
        "editor": {
          "title": "Τίτλος",
          "start": "Αρχή",
          "end": "Τέλος",
          "allDayEvent": "Ολοήμερο γεγονός",
          "description": "Περιγραφή",
          "repeat": "Επανάληψη",
          "timezone": " ",
          "startTimezone": "Εκκίνηση ζώνη ώρας",
          "endTimezone": "Τέλος ζώνη ώρας",
          "separateTimezones": "Χρήση διαφορετικών αρχή-τέλος ζώνη ώρας",
          "timezoneEditorTitle": "Ζώνες Ώρας",
          "timezoneEditorButton": "Ζώνη Ώρας",
          "timezoneTitle": "Ζώνες Ώρας",
          "noTimezone": "Καμία ζώνη ώρας",
          "editorTitle": "Γεγονός"
        }
      });
  }

  /* Spreadsheet messages */

  if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
    kendo.spreadsheet.messages.borderPalette =
      $.extend(true, kendo.spreadsheet.messages.borderPalette, {
        "allBorders": "Όλα τα σύνορα",
        "insideBorders": "Εσωτερικά σύνορα",
        "insideHorizontalBorders": "Εσωτερικά οριζότνια σύνορα",
        "insideVerticalBorders": "Εσωτερικά κάθετα σύνορα",
        "outsideBorders": "Εξωτερικά σύνορα",
        "leftBorder": "Αριστερό Σύνορο",
        "topBorder": "Πάνω Σύνορο",
        "rightBorder": "Δεξιά Σύνορο",
        "bottomBorder": "Κάτω Σύνορο",
        "noBorders": "Χωρίς Σύνορα",
        "reset": "Επαναφορά Χρώματος",
        "customColor": "Προσαρμοσμένο Χρώμα...",
        "apply": "Εφαρμογή",
        "cancel": "Άκυρο"
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
    kendo.spreadsheet.messages.dialogs =
      $.extend(true, kendo.spreadsheet.messages.dialogs, {
        "apply": "Εφαρμογή",
        "save": "Αποθήκευση",
        "cancel": "Άκυρο",
        "remove": "Αφαίρεση",
        "retry": "Ξαναπροσπαθήστε",
        "revert": "Επαναστροφή",
        "okText": "Εντάξει",
        "formatCellsDialog": {
          "title": "Μορφή",
          "categories": {
            "number": "Χρώμα",
            "currency": "Νόμισμα",
            "date": "Ημερομηνία"
          }
        },
        "fontFamilyDialog": {
          "title": "Γραμματοσειρά"
        },
        "fontSizeDialog": {
          "title": "Μέγεθος Γραμματοσειράς"
        },
        "bordersDialog": {
          "title": "Σύνορα"
        },
        "alignmentDialog": {
          "title": "Στοίχιση",
          "buttons": {
            "justtifyLeft": "Στοίχιση Αριστερά",
            "justifyCenter": "Κέντρο",
            "justifyRight": "Στοίχιση Δεξιά",
            "justifyFull": "Justify",
            "alignTop": "Στοίχιση Πάνω",
            "alignMiddle": "Στοίχιση Μέση",
            "alignBottom": "Στοίχιση Κάτω"
          }
        },
        "mergeDialog": {
          "title": "Συνένωση Κελιών",
          "buttons": {
            "mergeCells": "Συνένωση όλων",
            "mergeHorizontally": "Συνένωση οριζόντια",
            "mergeVertically": "Συνένωση κάθετα",
            "unmerge": "Κατάργηση Συγχώνευσης"
          }
        },
        "freezeDialog": {
          "title": "Πάγωμα Παραθύρων",
          "buttons": {
            "freezePanes": "Πάγωμα Παραθύρων",
            "freezeRows": "Πάγωμα Σειρών",
            "freezeColumns": "Πάγωμα Στηλών",
            "unfreeze": "Ξεπάγωμα Παραθύρων"
          }
        },
        "confirmationDialog": {
          "text": "Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το φύλλο;",
          "title": "Αφαίρεση Φύλλου"
        },
        "validationDialog": {
          "title": "Επικύρωση Δεδομένων",
          "hintMessage": "Παρακαλώ εισάγεται μια έγκυρη {0} τιμή {1}.",
          "hintTitle": "Επικύρωση {0}",
          "criteria": {
            "any": "Οποιαδήποτε Τιμή",
            "number": "Αριθμός",
            "text": "Κείμενο",
            "date": "Ημερομηνία",
            "custom": "Διαμορφωμένος τύπος",
            "list": "Λίστα"
          },
          "comparers": {
            "greaterThan": "μεγαλύτερο από",
            "lessThan": "μικρότερο από",
            "between": "μεταξύ",
            "notBetween": "όχι μεταξύ",
            "equalTo": "ίσο με",
            "notEqualTo": "όχι ίσο με",
            "greaterThanOrEqualTo": "μεγαλύτερο ή ίσο με",
            "lessThanOrEqualTo": "μικρότερο ή ίσο με"
          },
          "comparerMessages": {
            "greaterThan": "μεγαλύτερο από {0}",
            "lessThan": "μικρότερο από {0}",
            "between": "μεταξύ {0} και {1}",
            "notBetween": "όχι μεταξύ {0} και {1}",
            "equalTo": "ίσο με {0}",
            "notEqualTo": "όχι ίσο με {0}",
            "greaterThanOrEqualTo": "μεγαλύτερο ή ίσο με {0}",
            "lessThanOrEqualTo": "μικρότερο ή ίσο με {0}",
            "custom": "που ικανοποιεί τον τύπο: {0}"
          },
          "labels": {
            "criteria": "Κριτήρια",
            "comparer": "Συγκριτής",
            "min": "Ελάχιστο",
            "max": "Μέγιστο",
            "value": "Τιμή",
            "start": "Αρχή",
            "end": "Τέλος",
            "onInvalidData": "Σε μη-έγκυρα δεδομένα",
            "rejectInput": "Απόρριψη Εισαγωγής",
            "showWarning": "Δείξε προειδοποίηση",
            "showHint": "Δείξε βοήθεια",
            "hintTitle": "Βοηθητικός΄τίτλος",
            "hintMessage": "Βοηθητικό μήνυμα",
            "ignoreBlank": "Αγνόησε κενά"
          },
          "placeholders": {
            "typeTitle": "Τύπος τίτλου",
            "typeMessage": "Τυπος μηνύματος"
          }
        },
        "saveAsDialog": {
          "title": "Αποθήκευση ως...",
          "labels": {
            "fileName": "Όνομα Αρχείου",
            "saveAsType": "Αποθήκευση ως τύπος"
          }
        },
        "exportAsDialog": {
          "title": "Εξαγωγή...",
          "labels": {
            "fileName": "Όνομα Αρχείου",
            "saveAsType": "Αποθήκευση ως τύπος",
            "exportArea": "Εξαγωγή",
            "paperSize": "Μέγεθος Χαρτιού",
            "margins": "Περιθώρια",
            "orientation": "Orientation",
            "print": "Εκτύπωση",
            "guidelines": "Βοηθητικές Γραμμες",
            "center": "Κέντρο",
            "horizontally": "οριζόντια",
            "vertically": "Κάθετα"
          }
        },
        "modifyMergedDialog": {
          "errorMessage": "Δεν μπορεί να γίνει αλλαγή μέρους συγχωνευμένου κελιού."
        },
        "useKeyboardDialog": {
          "title": "Αντιγραφή και Επικόλληση",
          "errorMessage": "Αυτές οι πράξεις δεν μπορούν να γίνουν από αυτό το μενού. Παρακαλώ χρησιμοποιήστε συντομεύσεις πληκτρολογίου:",
          "labels": {
            "forCopy": "για Αντιγραφή",
            "forCut": "για Αποκοπή",
            "forPaste": "για Επικόλληση"
          }
        },
        "unsupportedSelectionDialog": {
          "errorMessage": "Αυτή η πράξη δεν μπορεί να γίνει σε πολλαπλή επιλογή."
        }
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
    kendo.spreadsheet.messages.filterMenu =
      $.extend(true, kendo.spreadsheet.messages.filterMenu, {
        "sortAscending": "Ταξινόμιση εύρος A σε Ω",
        "sortDescending": "Ταξινόμιση εύρος Ω σε A",
        "filterByValue": "Φίλτρο με τιμή",
        "filterByCondition": "Φίλτρο με συνθήκη",
        "apply": "Εφαρμογή",
        "search": "Αναζήτηση",
        "addToCurrent": "Προσθήκη στην τωρινή επιλογή",
        "clear": "Εκκαθάριση",
        "blanks": "(Κενά)",
        "operatorNone": "Κανένα",
        "and": "ΚΑΙ",
        "or": "Ή",
        "operators": {
          "string": {
            "contains": "Κείμενο περιέχει",
            "doesnotcontain": "Κείμενο δεν περιέχει",
            "startswith": "Κείμενο αρχίζει με",
            "endswith": "Κείμενο τελειώνει με"
          },
          "date": {
            "eq": "Ημερομηνία είναι",
            "neq": "Ημερομηνία δεν είναι",
            "lt": "Ημερομηνία είναι πριν από",
            "gt": "Ημερομηνία είναι μετά από"
          },
          "number": {
            "eq": "Είναι ίσο με",
            "neq": "Δεν είναι ίσο με",
            "gte": "Είναι μεγαλύτερο ή ίσό από",
            "gt": "Είναι μεγαλύτερο από",
            "lte": "Είναι μικρότερο ή ίσο από",
            "lt": "Είναι μικρότερο από"
          }
        }
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
    kendo.spreadsheet.messages.toolbar =
      $.extend(true, kendo.spreadsheet.messages.toolbar, {
        "addColumnLeft": "Προσθήκη γραμμής αριστερά",
        "addColumnRight": "Προσθήκη γραμμής δεξιά",
        "addRowAbove": "Προσθήκη γραμμής πάνω",
        "addRowBelow": "Προσθήκη γραμμής κάτω",
        "alignment": "Ευθυγράμμιση",
        "alignmentButtons": {
          "justtifyLeft": "Ευθυγράμμιση Αριστερά",
          "justifyCenter": "Κέντρο",
          "justifyRight": "Ευθυγράμμιση Δεξιά",
          "justifyFull": "Justify",
          "alignTop": "Ευθυγράμμιση Πάνω",
          "alignMiddle": "Ευθυγράμμιση Μέση",
          "alignBottom": "Ευθυγράμμιση Κάτω"
        },
        "backgroundColor": "Φόντο",
        "bold": "Έντονα",
        "borders": "Σύνορα",
        "colorPicker": {
          "reset": "Επαναφορά Χρώματος",
          "customColor": "Προσχεδιασμένο Χρώμα..."
        },
        "copy": "Αντιγραφή",
        "cut": "Αποκοπή",
        "deleteColumn": "Διαγραφή στήλης",
        "deleteRow": "Διαγραφή γραμμής",
        "excelImport": "Εισαγωγή από Excel...",
        "filter": "φίλτρο",
        "fontFamily": "Γραμματοσειρά",
        "fontSize": "Μέγεθος Γραμματοσειράς",
        "format": "Προσχεδιασμένος Τύπος...",
        "formatTypes": {
          "automatic": "Αυτόματο",
          "number": "Αριθμός",
          "percent": "Ποσοστό",
          "financial": "Οικονομικά",
          "currency": "Νόμισα",
          "date": "Ημερομηνία",
          "time": "Ώρα",
          "dateTime": "Ημερομηνία-Ώρα",
          "duration": "Διάρκεια",
          "moreFormats": "Περισσότερα formats..."
        },
        "formatDecreaseDecimal": "Μείωση δεκαδικών",
        "formatIncreaseDecimal": "Αύξηση δεκαδικών",
        "freeze": "Πάγωμα παραθύρων",
        "freezeButtons": {
          "freezePanes": "Πάγωμα παραθύρων",
          "freezeRows": "Πάγωμα γραμμών",
          "freezeColumns": "Πάγωμα στηλών",
          "unfreeze": "Ξεπάγωμα παραθύρων panes"
        },
        "italic": "Πλάγια",
        "merge": "Συνένωση κελιών",
        "mergeButtons": {
          "mergeCells": "Συνένωση όλων",
          "mergeHorizontally": "Σενένωση οριζόντια",
          "mergeVertically": "Συνένωση κάθετα",
          "unmerge": "Ακύρωση Συνένωσης"
        },
        "open": "Άνογμα...",
        "paste": "Επικόλληση",
        "quickAccess": {
          "redo": "Ακύρωση Αναίρεσης",
          "undo": "Αναίρεση"
        },
        "saveAs": "Αποθήκευση ως...",
        "sortAsc": "Αύξουσα Ταξινόμιση",
        "sortDesc": "Φθήνουσα Ταξινόμιση",
        "sortButtons": {
          "sortSheetAsc": "Ταξινόμιση φύλλου A σε Ω",
          "sortSheetDesc": "Ταξινόμιση φύλλου Ω σε A",
          "sortRangeAsc": "Ταξινόμιση εύρους A σε Ω",
          "sortRangeDesc": "Ταξινόμιση εύρους Ω σε A"
        },
        "textColor": "Χρώμα Κειμένου",
        "textWrap": "Αναδίπλωση κειμένου",
        "underline": "Υπογράμμιση",
        "validation": "Επικύρωση Δεδομένων..."
      });
  }

  if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
    kendo.spreadsheet.messages.view =
      $.extend(true, kendo.spreadsheet.messages.view, {
        "errors": {
          "shiftingNonblankCells": "Δεν μπορεί να γίνει εισαγωγή κελιών λόγω πιθανότητας απώλειας δεδομένων. Επιλέξτε άλλη τοποθεσία ή διαγράψτε τα δεδομένα από το φύλλο εργασίας.",
          "filterRangeContainingMerges": "Δεν μπορεί να δημιουργηθεί φίλτρο μέσα στο εύρος ένωσης",
          "validationError": "Η τιμή που εισάγετε παραβιάζει την επικύρωση δεδομένων του κελιού."
        },
        "tabs": {
          "home": "Αρχική",
          "insert": "Εισαγωγή",
          "data": "Δεδομένα"
        }
      });
  }

  /* Slider messages */

  if (kendo.ui.Slider) {
    kendo.ui.Slider.prototype.options =
      $.extend(true, kendo.ui.Slider.prototype.options, {
        "increaseButtonTitle": "Αύξηση",
        "decreaseButtonTitle": "Μείωση"
      });
  }

  /* TreeList messages */

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Δεν υπάρχουν εγγραφές",
        "loading": "Φορτώνει...",
        "requestFailed": "Αίτημα απέτυχε.",
        "retry": "Επανάληψη",
        "commands": {
          "edit": "Επεξεργασία",
          "update": "Ανανέωση",
          "canceledit": "Άκυρο",
          "create": "Προσθήκη Εγγραφής",
          "createchild": "Προσθήκη Εγγραφής παιδιού",
          "destroy": "Διαγραφή",
          "excel": "Εξαγωγή σε Excel",
          "pdf": "Εξαγωγή σε PDF"
        }
      });
  }

  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.columnMenu =
      $.extend(true, kendo.ui.TreeList.prototype.options.columnMenu, {
        "messages": {
          "columns": "Επιλέξτε στήλες",
          "filter": "Εφαρμογή φίλτρων",
          "sortAscending": "Ταξινόμιση (αύξ.)",
          "sortDescending": "Ταξινόμιση (φθήν.)"
        }
      });
  }

  /* TreeView messages */

  if (kendo.ui.TreeView) {
    kendo.ui.TreeView.prototype.options.messages =
      $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
        "loading": "Φορτώνει...",
        "requestFailed": "Αίτημα απέτυχε.",
        "retry": "Επανάληψη"
      });
  }

  /* Upload messages */

  if (kendo.ui.Upload) {
    kendo.ui.Upload.prototype.options.localization =
      $.extend(true, kendo.ui.Upload.prototype.options.localization, {
        "select": "Επιλογή αρχέιων...",
        "cancel": "Άκυρο",
        "retry": "Επανάληψη",
        "remove": "Αφαίρεση",
        "clearSelectedFiles": "Εκκαθάριση",
        "uploadSelectedFiles": "Μεταφόρτωση αρχείων",
        "dropFilesHere": "Σύρτε αρχεία εδώ για μεταφόρτωση",
        "statusUploading": "μεταφόρτωση",
        "statusUploaded": "ανέβηκε",
        "statusWarning": "προειδοποίηση",
        "statusFailed": "απέτυχε",
        "headerStatusUploading": "Μεταφόρτωση...",
        "headerStatusUploaded": "Ολοκλήρωση",
        "invalidMaxFileSize": "Το μέγεθος του αρχείου είναι πολύ μεγάλο.",
        "invalidMinFileSize": "Το μέγεθος του αρχείου είναι πολύ μικρό.",
        "invalidFileExtension": "Μη έγκυρος τύπος αρχείου."
      });
  }

  /* Validator messages */

  if (kendo.ui.Validator) {
    kendo.ui.Validator.prototype.options.messages =
      $.extend(true, kendo.ui.Validator.prototype.options.messages, {
        "required": "{0} είναι υποχρεωτικό",
        "pattern": "{0} δεν είναι έγκυρο",
        "min": "{0} πρέπει να είναι μεγαλύτερο από ή ίσο με {1}",
        "max": "{0} πρέπει να είναι μικτρότερο από ή ίσο με {1}",
        "step": "{0} δεν είναι έγκυρο",
        "email": "{0} δεν είναι έγκυρο email",
        "url": "{0} δεν είναι έγκυρο URL",
        "date": "{0} δεν είναι έγκυρη ημερομηνία",
        "dateCompare": "Η ημερομηνία λήξης πρέπει να είναι μεγαλύερη από την ημερομηνία έναρξης"
      });
  }

  /* kendo.ui.progress method */
  if (kendo.ui.progress) {
    kendo.ui.progress.messages =
      $.extend(true, kendo.ui.progress.messages, {
        loading: "Φόρτωση..."
      });
  }

  /* Dialog */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.messages =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "Κλείσιμο"
      });
  }

  /* Alert */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.messages =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "Εντάξει"
      });
  }

  /* Confirm */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.messages =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "Εντάξει",
        "cancel": "Άκυρο"
      });
  }

  /* Prompt */
  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.messages =
      $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
        "okText": "Εντάξει",
        "cancel": "Άκυρο"
      });
  }

})(window.kendo.jQuery);

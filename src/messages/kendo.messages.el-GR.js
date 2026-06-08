(function($, undefined) {

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
        "print": "Εκτύπωση",
        "strikethrough": "Διακριτή Διαγραφή",
        "superscript": "Εκθέτης",
        "subscript": "Δείκτης",
        "justifyCenter": "Στοίχιση Κέντρο",
        "justifyLeft": "Στοίχιση Αριστερά",
        "justifyRight": "Στοίχιση Δεξιά",
        "justifyFull": "Ισάζω",
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
        "linkToolTip": "αναγγελία",
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
        "title": "Δείξε αντικείμενα με τιμή που",
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
        "selectedItemsFormat": "{0} επιλεγμένα στοιχεία",
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
          "add": "Προσθήκη Εγγραφής",
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
        "noRecords": "Δεν υπάρχουν εγγραφές.",
        "groupHeader": "Πατήστε ctrl + space για να ομαδοποιήσετε",
        "ungroupHeader": "Πατήστε ctrl + space για να την αποκλείσετε"
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

  /* TreeListPager messages */

  if (kendo.ui.TreeListPager) {
    kendo.ui.TreeListPager.prototype.options.messages =
      $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
        "allPages": "Όλα",
        "page": "Σελίδα",
        "display": "{0} - {1} από {2} αντικείμενα",
        "empty": "Δεν υπάρχουν αντικείμενα",
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
        "next": "Επόμενο",
        "previous": "προηγούμενος",
        "resetSeries": "Επαναφορά σειράς",
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
          "resetSeriesWindowTitle": "Επαναφορά σειράς",
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
            "justifyLeft": "Στοίχιση Αριστερά",
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
          "justifyLeft": "Ευθυγράμμιση Αριστερά",
          "justifyCenter": "Κέντρο",
          "justifyRight": "Ευθυγράμμιση Δεξιά",
          "justifyFull": "Ισάζω",
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

  /* ColorGradient messages */

  if (kendo.ui.ColorGradient) {

      kendo.ui.ColorGradient.prototype.options.messages =
          $.extend(true, kendo.ui.ColorGradient.prototype.options.messages, {
              "contrastRatio": "Αναλογία αντίθεσης:",
              "fail": "Αποτυχία",
              "pass": "Επιτυχία",
              "hex": "HEX",
              "toggleFormat": "Εναλλαγή μορφής",
              "red": "Κόκκινο",
              "green": "Πράσινο",
              "blue": "Μπλε",
              "alpha": "Άλφα"
          });

  }

  /* DateRangePicker messages */

  if (kendo.ui.DateRangePicker) {

      kendo.ui.DateRangePicker.prototype.options.messages =
          $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
              "startLabel": "Αρχή",
              "endLabel": "Τέλος"
          });

  }

  /* FileManager messages */

  if (kendo.ui.FileManager) {

      kendo.ui.FileManager.prototype.options.messages =
          $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
              "toolbar": {
                  "createFolder": "Νέος φάκελος",
                  "upload": "Μεταφόρτωση",
                  "sortDirection": "Κατεύθυνση ταξινόμησης",
                  "sortDirectionAsc": "Αύξουσα",
                  "sortDirectionDesc": "Φθίνουσα",
                  "sortField": "Ταξινόμηση κατά",
                  "nameField": "Όνομα",
                  "sizeField": "Μέγεθος",
                  "typeField": "Τύπος",
                  "dateModifiedField": "Ημερομηνία τροποποίησης",
                  "dateCreatedField": "Ημερομηνία δημιουργίας",
                  "listView": "Προβολή λίστας",
                  "gridView": "Προβολή πλέγματος",
                  "search": "Αναζήτηση",
                  "details": "Λεπτομέρειες",
                  "detailsChecked": "Ναι",
                  "detailsUnchecked": "Όχι",
                  "Delete": "Διαγραφή",
                  "Rename": "Μετονομασία"
              },
              "views": {
                  "nameField": "Όνομα",
                  "sizeField": "Μέγεθος",
                  "typeField": "Τύπος",
                  "dateModifiedField": "Ημερομηνία τροποποίησης",
                  "dateCreatedField": "Ημερομηνία δημιουργίας",
                  "items": "στοιχεία"
              },
              "dialogs": {
                  "upload": {
                      "title": "Μεταφόρτωση αρχείων",
                      "clear": "Εκκαθάριση",
                      "done": "Ολοκληρώθηκε"
                  },
                  "moveConfirm": {
                      "title": " ",
                      "content": "<p class='k-text-center'>Θέλετε να μετακινήσετε ή να αντιγράψετε τα επιλεγμένα αρχεία;</p>",
                      "okText": "Αντιγραφή",
                      "cancel": "Μετακίνηση",
                      "close": "Κλείσιμο"
                  },
                  "deleteConfirm": {
                      "title": "Επιβεβαίωση διαγραφής",
                      "content": "<p class='k-text-center'>Είστε βέβαιοι ότι θέλετε να διαγράψετε τα επιλεγμένα αρχεία;<br/>Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.</p>",
                      "okText": "Διαγραφή",
                      "cancel": "Ακύρωση",
                      "close": "Κλείσιμο"
                  },
                  "renamePrompt": {
                      "title": "Μετονομασία",
                      "content": "<p class='k-text-center'>Εισαγάγετε νέο όνομα αρχείου</p>",
                      "okText": "Μετονομασία",
                      "cancel": "Ακύρωση",
                      "close": "Κλείσιμο"
                  }
              },
              "previewPane": {
                  "noFileSelected": "Δεν επιλέχθηκε αρχείο",
                  "extension": "Τύπος",
                  "size": "Μέγεθος",
                  "created": "Ημερομηνία δημιουργίας",
                  "createdUtc": "Ημερομηνία δημιουργίας (UTC)",
                  "modified": "Ημερομηνία τροποποίησης",
                  "modifiedUtc": "Ημερομηνία τροποποίησης (UTC)",
                  "items": "στοιχεία"
              }
          });

  }

  /* TaskBoard messages */

  if (kendo.ui.TaskBoard) {

      kendo.ui.TaskBoard.prototype.options.messages =
          $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
              "edit": "Επεξεργασία",
              "createNewCard": "Νέα κάρτα",
              "create": "Δημιουργία",
              "search": "Αναζήτηση",
              "previewCard": "Προεπισκόπηση κάρτας",
              "addCard": "Προσθήκη κάρτας",
              "editCard": "Επεξεργασία κάρτας",
              "deleteCard": "Διαγραφή κάρτας",
              "addColumn": "Προσθήκη στήλης",
              "editColumn": "Επεξεργασία στήλης",
              "deleteColumn": "Διαγραφή στήλης",
              "close": "Κλείσιμο",
              "cancel": "Ακύρωση",
              "delete": "Διαγραφή",
              "saveChanges": "Αποθήκευση αλλαγών",
              "title": "Τίτλος:",
              "description": "Περιγραφή:",
              "newColumn": "Νέα στήλη",
              "deleteColumnConfirm": "Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτή τη στήλη;",
              "deleteCardConfirm": "Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτή την κάρτα;"
          });

  }

  /* PivotConfiguratorV2 messages */

  if (kendo.ui.PivotConfiguratorV2) {

      kendo.ui.PivotConfiguratorV2.prototype.options.messages =
          $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
              "title": "Ρυθμίσεις",
              "cancelButtonText": "Ακύρωση",
              "applyButtonText": "Εφαρμογή",
              "measures": "Επιλέξτε πεδία για εκκίνηση",
              "columns": "Επιλέξτε πεδία για εκκίνηση",
              "rows": "Επιλέξτε πεδία για εκκίνηση"
          });

  }

  /* PivotFieldMenuV2 messages */

  if (kendo.ui.PivotFieldMenuV2) {

      kendo.ui.PivotFieldMenuV2.prototype.options.messages =
          $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
              "apply": "Εφαρμογή",
              "sortAscending": "Αύξουσα σειρά",
              "sortDescending": "Φθίνουσα σειρά",
              "filterFields": "Φίλτρο πεδίων",
              "filter": "Φίλτρο",
              "include": "Συμπερίληψη πεδίων...",
              "clear": "Εκκαθάριση",
              "reset": "Επαναφορά",
              "moveToColumns": "Μετακίνηση σε στήλες",
              "moveToRows": "Μετακίνηση σε γραμμές",
              "movePrevious": "Μετακίνηση πίσω",
              "moveNext": "Μετακίνηση μπροστά",
              "filterOperatorsDropDownLabel": "Τελεστές φίλτρου",
              "filterValueTextBoxLabel": "Τιμή φίλτρου",
              "operators": {
                  "contains": "Περιέχει",
                  "doesnotcontain": "Δεν περιέχει",
                  "startswith": "Αρχίζει με",
                  "endswith": "Τελειώνει με",
                  "eq": "Είναι ίσο με",
                  "neq": "Δεν είναι ίσο με"
              }
          });

  }

  /* MobileRecurrenceEditor messages */

  if (kendo.ui.MobileRecurrenceEditor) {

      kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
          $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
              "cancel": "Ακύρωση",
              "update": "Αποθήκευση",
              "endTitle": "Τέλος επανάληψης",
              "repeatTitle": "Μοτίβο επανάληψης",
              "headerTitle": "Επανάληψη συμβάντος",
              "end": {
                  "never": "Ποτέ",
                  "after": "Μετά",
                  "on": "Στις"
              },
              "daily": {
                  "interval": "ημέρα(-ες)"
              },
              "weekly": {
                  "interval": "εβδομάδα(-ες)"
              },
              "monthly": {
                  "interval": "μήνα(-ες)",
                  "repeatBy": "Επανάληψη κατά: ",
                  "dayOfMonth": "Ημέρα του μήνα",
                  "dayOfWeek": "Ημέρα της εβδομάδας"
              },
              "yearly": {
                  "interval": "έτος(-η)",
                  "repeatBy": "Επανάληψη κατά: ",
                  "dayOfMonth": "Ημέρα του μήνα",
                  "dayOfWeek": "Ημέρα της εβδομάδας",
                  "of": " του "
              },
              "endRule": {
                  "after": " εμφάνιση(-εις)",
                  "on": "Στις "
              }
          });

  }

  /* ListBox messaages */

  if (kendo.ui.ListBox) {

      kendo.ui.ListBox.prototype.options.messages =
          $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
              "tools": {
                  "remove": "Διαγραφή",
                  "moveUp": "Μετακίνηση επάνω",
                  "moveDown": "Μετακίνηση κάτω",
                  "transferTo": "Μεταφορά σε",
                  "transferFrom": "Μεταφορά από",
                  "transferAllTo": "Μεταφορά όλων σε",
                  "transferAllFrom": "Μεταφορά όλων από"
              }
          });

  }

  /* TimePicker */

  if (kendo.ui.TimePicker) {

      kendo.ui.TimePicker.prototype.options.messages =
          $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
              "set": "Ορισμός",
              "cancel": "Ακύρωση",
              "hour": "ώρα",
              "minute": "λεπτό",
              "second": "δευτερόλεπτο",
              "millisecond": "χιλιοστό δευτερολέπτου",
              "now": "Τώρα"
          });

  }

  /* DateTimePicker */

  if (kendo.ui.DateTimePicker) {

      kendo.ui.DateTimePicker.prototype.options.messages =
          $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
              "set": "Ορισμός",
              "cancel": "Ακύρωση",
              "hour": "ώρα",
              "minute": "λεπτό",
              "second": "δευτερόλεπτο",
              "millisecond": "χιλιοστό δευτερολέπτου",
              "now": "Τώρα",
              "date": "Ημερομηνία",
              "time": "Ώρα",
              "today": "Σήμερα",
              "weekColumnHeader": ""
          });

  }

  /* Calendar */

  if (kendo.ui.Calendar) {

      kendo.ui.Calendar.prototype.options.messages =
          $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
              "weekColumnHeader": "",
              "today": "Σήμερα",
              "navigateTo": "Μετάβαση σε: ",
              "parentViews": {
                  "month": "Ετήσια προβολή",
                  "year": "Δεκαετής προβολή",
                  "decade": "Αιώνια προβολή"
              }
          });

  }

  /* DateInput */

  if (kendo.ui.DateInput) {

      kendo.ui.DateInput.prototype.options.messages =
          $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
              "year": "έτος",
              "month": "μήνας",
              "day": "ημέρα",
              "weekday": "ημέρα εβδομάδας",
              "hour": "ώρες",
              "minute": "λεπτά",
              "second": "δευτερόλεπτα",
              "dayperiod": "ΠΜ/ΜΜ"
          });

  }

  /* List messages */

  if (kendo.ui.List) {

      kendo.ui.List.prototype.options.messages =
          $.extend(true, kendo.ui.List.prototype.options.messages, {
              "clear": "εκκαθάριση",
              "noData": "Δεν βρέθηκαν δεδομένα."
          });

  }

  /* DropDownTree messages */

  if (kendo.ui.DropDownTree) {

      kendo.ui.DropDownTree.prototype.options.messages =
          $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
              "clear": "εκκαθάριση",
              "noData": "Δεν βρέθηκαν δεδομένα.",
              "singleTag": "στοιχείο(-α) επιλεγμένο(-α)"
          });

  }

  /* MultiSelect messages */

  if (kendo.ui.MultiSelect) {

      kendo.ui.MultiSelect.prototype.options.messages =
          $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
              "clear": "εκκαθάριση",
              "noData": "Δεν βρέθηκαν δεδομένα.",
              "singleTag": "στοιχείο(-α) επιλεγμένο(-α)"
          });

  }

  /* Chat messages */

  if (kendo.ui.Chat) {

      kendo.ui.Chat.prototype.options.messages =
          $.extend(true, kendo.ui.Chat.prototype.options.messages, {
              "placeholder": "Πληκτρολογήστε μήνυμα...",
              "toggleButton": "Εναλλαγή γραμμής εργαλείων",
              "sendButton": "Αποστολή"
          });

  }

  /* Wizard messages */

  if (kendo.ui.Wizard) {

      kendo.ui.Wizard.prototype.options.messages =
          $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
              "reset": "Επαναφορά",
              "previous": "Προηγούμενο",
              "next": "Επόμενο",
              "done": "Ολοκλήρωση",
              "step": "Βήμα",
              "of": "από"
          });

  }

  /* PDFViewer messages */

  if (kendo.ui.PDFViewer) {

      kendo.ui.PDFViewer.prototype.options.messages =
          $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
              "defaultFileName": "Έγγραφο",
              "toolbar": {
                  "zoom": {
                      "zoomLevel": "Επίπεδο ζουμ",
                      "zoomOut": "Σμίκρυνση",
                      "zoomIn": "Μεγέθυνση",
                      "actualWidth": "Πραγματικό πλάτος",
                      "autoWidth": "Αυτόματο πλάτος",
                      "fitToWidth": "Προσαρμογή στο πλάτος",
                      "fitToPage": "Προσαρμογή στη σελίδα"
                  },
                  "open": "Άνοιγμα",
                  "exportAs": "Εξαγωγή",
                  "download": "Λήψη",
                  "pager": {
                      "first": "Μετάβαση στην πρώτη σελίδα",
                      "previous": "Μετάβαση στην προηγούμενη σελίδα",
                      "next": "Μετάβαση στην επόμενη σελίδα",
                      "last": "Μετάβαση στην τελευταία σελίδα",
                      "of": "από",
                      "page": "σελίδα",
                      "pages": "σελίδες"
                  },
                  "print": "Εκτύπωση",
                  "toggleSelection": "Ενεργοποίηση επιλογής",
                  "togglePan": "Ενεργοποίηση μετακίνησης",
                  "search": "Αναζήτηση"
              },
              "errorMessages": {
                  "notSupported": "Υποστηρίζονται μόνο αρχεία PDF.",
                  "parseError": "Δεν ήταν δυνατή η επεξεργασία του αρχείου PDF.",
                  "notFound": "Το αρχείο δεν βρέθηκε.",
                  "popupBlocked": "Το αναδυόμενο παράθυρο αποκλείεται από τον περιηγητή."
              }
          });

  }

  /* Captcha messages */

  if (kendo.ui.Captcha) {

      kendo.ui.Captcha.prototype.options.messages =
          $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
              "reset": "Αναδημιουργία captcha",
              "audio": "Αναπαραγωγή ήχου captcha",
              "imageAlt": "Πληκτρολογήστε το κείμενο από την εικόνα captcha",
              "success": "Η επαλήθευση ήταν επιτυχής"
          });

  }

  /* OrgChart messages */

  if (kendo.ui.OrgChart) {

      kendo.ui.OrgChart.prototype.options.messages =
          $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
              "label": "Οργανόγραμμα",
              "edit": "Επεξεργασία",
              "create": "Δημιουργία",
              "destroy": "Διαγραφή",
              "destroyContent": "Είστε βέβαιοι ότι θέλετε να διαγράψετε αυτό το στοιχείο και τα υποκείμενά του;",
              "destroyTitle": "Διαγραφή στοιχείου",
              "cancel": "Ακύρωση",
              "save": "Αποθήκευση",
              "menuLabel": "Μενού επεξεργασίας",
              "uploadAvatar": "Μεταφόρτωση νέας εικόνας",
              "parent": "Γονικό",
              "name": "Όνομα",
              "title": "Τίτλος",
              "none": "--Κανένα--",
              "expand": "Ανάπτυξη",
              "collapse": "Σύμπτυξη"
          });

  }

  /* Map messages */

  if (kendo.dataviz.ui.Map) {

      kendo.dataviz.ui.Map.prototype.options.messages =
          $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
              "tileTitle": "Τίτλος χάρτη"
          });

  }

  /* Sankey messages */

  if (kendo.dataviz.ui.Sankey) {

      kendo.dataviz.ui.Sankey.prototype.options.messages =
          $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
              "tooltipUnits": "{0} Μονάδες"
          });

  }

  /* Chart messages */

  if (kendo.dataviz.ui.Chart) {

      kendo.dataviz.ui.Chart.prototype.options.messages =
          $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
              "noData": "Δεν υπάρχουν διαθέσιμα δεδομένα"
          });

  }

})(window.kendo.jQuery);
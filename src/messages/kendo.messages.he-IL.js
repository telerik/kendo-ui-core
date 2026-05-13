(function($, undefined) {

/* Validator messages */
if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} נדרש",
  "pattern": "{0} לא תקין",
  "min": "{0} אמור להיות גדול או שווה ל {1}",
  "max": "{0} אמור להיות קטן או שווה ל {1}",
  "step": "{0} לא תקין",
  "email": "{0}  אימייל לא תקין",
  "url": "{0} לא תקין URL",
  "date": "{0} תאריך לא תקין",
  "dateCompare": "משווה נתונים"
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "אנא המתן...",
  "requestFailed": "הבקשה נכשלה",
  "retry": "נסה שנית"
});
}

/* Upload */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "בחר...",
  "cancel": "בטל",
  "retry": "נסה שנית",
  "remove": "הסר",
  "uploadSelectedFiles": "בחר קבצים להעלות לשרת",
  "dropFilesHere": "גרור לכאן את הקבצים",
  "statusUploading": "מעלה לשרת",
  "statusUploaded": "הקבצים הועלו בהצלחה",
  "statusWarning": "אזהרה",
  "statusFailed": "נכשל",
  "headerStatusUploading": "מעלה...",
  "headerStatusUploaded": "העלאת קבצים"
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "יותר",
  "decreaseButtonTitle": "פחות"
});
}

/* Numeric text box */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "למעלה",
  "downArrowText": "למטה"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "עצירה",
  "play": "נגן",
  "mute": "השתקה",
  "unmute": "בטל השתקה",
  "quality": "איכות",
  "fullscreen": "מסך מלא",
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "הוסף ילד",
    "append": "הוסף",
    "insertAfter": "הכנס אחרי",
    "insertBefore": "הכנס לפני",
    "pdf": "קובץ PDF"
  },
  "cancel": "בטל",
  "deleteDependencyWindowTitle": "מחיקה",
  "deleteTaskWindowTitle": "מחיקה",
  "destroy": "Delete",
  "editor": {
    "assingButton": "שייך",
    "editorTitle": "כותרת",
    "end": "סיים",
    "percentComplete": "אחוז שהושלם",
    "resources": "משאבים",
    "resourcesEditorTitle": "כותרת עורך",
    "resourcesHeader": "כותרת כללית",
    "start": "התחל",
    "title": "כותרת",
    "unitsHeader": "מידה"
  },
  "save": "שמור",
  "views": {
    "day": "יום",
    "end": "סוף",
    "month": "חודש",
    "start": "התחלה",
    "week": "שבוע",
    "year": "שנה"
  }
});
}

/* File browser */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "העלאה",
  "orderBy": "סדר לפי",
  "orderByName": "שם",
  "orderBySize": "גודל",
  "directoryNotFound": "תיקייה בשם זה לא נמצאה",
  "emptyFolder": "תיקייה ריקה",
  "deleteFile": 'האם למחוק "{0}"?',
  "invalidFileType": "הקובץ הנבחר \"{0}\"לא חוקי, הקבצים הנתמכים הם {1}.",
  "overwriteFile": "קובץ בשם \"{0}\" כבר קיים בתיקייה. האם לדרוס אותו?",
  "dropFilesHere": "גרור קבצים לכאן כדי להעלות",
  "search": "חפש"
});
}

/* Flat color picker */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "עדכן",
  "cancel": "בטל"
});
}

/* Color picker */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "עדכן",
  "cancel": "בטל"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
      "eq": "שווה ל",
      "neq": "לא שווה ל",
      "startswith": "מתחיל עם",
      "contains": "מכיל",
      "doesnotcontain": "לא מכיל",
      "endswith": "נגמר ב"
  },
  "number": {
      "eq": "שווה ל",
      "neq": "לא שווה ל",
      "gte": "גדול או שווה מ",
      "gt": "גדול מ",
      "lte": "קטן או שווה ל",
      "lt": "קטן מ"
  },
  "date": {
      "eq": "שןןה ל",
      "neq": "לא שווה ל",
      "gte": "אחרי או שווה ל",
      "gt": "אחרי",
      "lte": "לפני או שווה ל",
      "lt": "לפני"
  },
  "enums": {
      "eq": "שווה",
      "neq": "לא שווה"
  }
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
      "eq": "שווה ל",
      "neq": "לא שווה ל",
      "startswith": "מתחיל עם",
      "contains": "מכיל",
      "doesnotcontain": "לא מכיל",
      "endswith": "נגמר ב"
  },
  "number": {
      "eq": "שווה ל",
      "neq": "לא שווה ל",
      "gte": "גדול או שווה מ",
      "gt": "גדול מ",
      "lte": "קטן או שווה ל",
      "lt": "קטן מ"
  },
  "date": {
      "eq": "שןןה ל",
      "neq": "לא שווה ל",
      "gte": "אחרי או שווה ל",
      "gt": "אחרי",
      "lte": "לפני או שווה ל",
      "lt": "לפני"
  },
  "enums": {
      "eq": "שווה",
      "neq": "לא שווה"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "מיון עולה",
  "sortDescending": "מיון יורד",
  "filter": "סינון",
  "columns": "עמודות",
  "done": "בצע",
  "settings": "הגדרות",
  "lock": "קבע",
  "unlock": "שחרר"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "מחזוריות",
    "repeatEvery": "חזור כל: "
  },
  "end": {
    "after": "לאחר ",
    "occurrence": "מחזוריות",
    "label": "תגית:",
    "never": "אף פעם",
    "on": "ב ",
    "mobileLabel": "נייד"
  },
  "frequencies": {
    "daily": "יומי",
    "monthly": "חודשי",
    "never": "אף פעם",
    "weekly": "שבועי",
    "yearly": "שנתי"
  },
  "monthly": {
    "day": "יום ",
    "interval": " מחזוריות",
    "repeatEvery": "חזרה כל: ",
    "repeatOn": "חזור ב: "
  },
  "offsetPositions": {
    "first": "ראשון",
    "fourth": "רביעי",
    "last": "אחרון",
    "second": "שני",
    "third": "שלישי"
  },
  "weekly": {
    "repeatEvery": "חזור כל: ",
    "repeatOn": "חזור ב: ",
    "interval": "מחזוריות"
  },
  "yearly": {
    "of": " ב ",
    "repeatEvery": "חזור כל: ",
    "repeatOn": "חזור ב: ",
    "interval": "מחזוריות"
  },
  "weekdays": {
    "day": "יום",
    "weekday": "בשבוע",
    "weekend": "בסוף שבוע"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "בטל",
    "pdf": "יצוא ל",
    "canceledit": "בטל עריכה",
    "create": "צור חדש",
    "destroy": "מחק",
    "edit": "עריכה",
    "save": "שמור",
    "select": "בחר",
    "update": "עדכן",
    "excel": "יצא לאקסל"
  },
  "editable": {
    "cancelDelete": "בטל מחיקה",
    "confirmation": "האם הנך בטוח שברונך לבצע זאת?",
    "confirmDelete": "אשר מחיקה"
  },
  "noRecords": "אין מידע",
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "הכל",
  "page": "עמוד",
  "display": "{0} - {1} מתוך {2} פריטים",
  "of": "מתוך {0}",
  "empty": "אין פריטים להצגה",
  "refresh": "רענן",
  "first": "לעמוד הראשון",
  "itemsPerPage": "פריטים בעמוד",
  "last": "לעמוד האחרון",
  "next": "לעמוד הבא",
  "previous": "לעמוד הקודם",
  "morePages": "עמודים נוספים"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "תצוגת פריטים עם ערך זה:",
  "filterFields": "סינון שדות",
  "filter": "סנן",
  "include": "כלול שדות...",
  "title": "שדות להוספה",
  "clear": "נקה",
  "ok": "בסדר",
  "cancel": "בטל",
  "operators": {
    "contains": "Contains",
    "doesnotcontain": "Does not contain",
    "startswith": "Starts with",
    "endswith": "Ends with",
    "eq": "Is equal to",
    "neq": "Is not equal to"
  }
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
  kendo.ui.PivotGrid.prototype.options.messages =
  $.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
    "measureFields": "שחרר שדות נתונים כאן",
    "columnFields": "שחרר שדות עמודה כאן",
    "rowFields": "שחרר שדות שורה כאן"
  });
  }

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "אין מידע",
  "commands": {
      "edit": "ערוך",
      "update": "עדכן",
      "create": "הוסף רשומה",
      "destroy": "מחק",
      "excel": "יצא לאקסל",
      "pdf": "יצוא ל PDF"
  }
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "All",
  "page": "עמוד",
  "display": "{0} - {1} מתוך {2} פריטים",
  "of": "מתוך {0}",
  "empty": "אין פריטים להצגה",
  "refresh": "רענן",
  "first": "לעמוד הראשון",
  "itemsPerPage": "פריטים בעמוד",
  "last": "לעמוד האחרון",
  "next": "לעמוד הבא",
  "previous": "לעמוד הקודם",
  "morePages": "עמודים נוספים"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "סנן",
  "and": "וגם",
  "clear": "נקה",
  "info": "הראה פריטים עם ערך ש",
  "title": "הראה פריטים עם ערך ש",
  "selectValue": "-בחר ערך-",
  "isFalse": "לא",
  "isTrue": "כן",
  "or": "או",
  "cancel": "בטל",
  "operator": "אופרטור",
  "value": "ערך"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "סנן",
  "clear": "נקה",
  "isFalse": "לא",
  "isTrue": "כן",
  "operator": "אופרטור"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "בחר הכל",
  "clear": "נקה",
  "filter": "סנן",
  "selectedItemsFormat": "{0} נבחרו",
  "search": "חפש"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
    "empty": "כדי לקבץ לפי העמודה גרור כותרת העמודה לכאן"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
    "bold": "מודגש",
    "createLink": "הכנסת קישור",
    "fontName": "בחירת משפחת גופנים",
    "fontNameInherit": "(גופן בירושה)",
    "fontSize": "בחר גודל פונט",
    "fontSizeInherit": "(גודל בירושה)",
    "formatBlock": "פורמט",
    "indent": "Indent",
    "insertHtml": "הכנסת HTML",
    "insertImage": "הכנסת תמונה",
    "insertOrderedList": "הוסף רשימה מסודרת",
  "insertUnorderedList": "הוסף רשימה לא מסודרת",
  "italic": "נטוי",
  "justifyCenter": "ממורכז",
  "justifyFull": "מיושר",
  "justifyLeft": "ישור לשמאל",
  "justifyRight": "ישור לימין",
  "outdent": "הזחה",
  "strikethrough": "קו חוצה",
  "style": "סגנון",
  "subscript": "ציון תחתי",
  "superscript": "ציון עילי",
  "underline": "קו תחתון",
  "unlink": "הסרת קישור",
  "print": "הדפסה",
  "cleanFormatting": "ללא עיצוב",
  "deleteFile": 'האם בוודאות ברצונך למחוק "{0}"?',
  "directoryNotFound": "תיקייה בשם זה כבר קיימת.",
  "emptyFolder": "תיקייה ריקה",
  "invalidFileType": "הקובץ הנבחר \"{0}\" אינו חוקי. סוגי קבצים נתמכים {1}.",
  "orderBy": "מיון לפי:",
  "orderByName": "שם",
  "orderBySize": "גודל",
  "overwriteFile": 'קובץ עם השם "{0}" כבר קיים במחיצה הנוכחית. האם לדרוס אותו?',
  "uploadFile": "העלה",
  "backColor": "צבע רקע",
  "foreColor": "צבע",
  "dialogButtonSeparator": "או",
  "dialogCancel": "ביטול",
  "dialogInsert": "הכנסה",
  "imageAltText": "מלל חלופי",
  "imageWebAddress": "כתובת אינטרנט",
  "linkOpenInNewWindow": "פתח קישור בעמוד חדש",
  "linkText": "טקסט",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "כתובת URL",
  "search": "חפש",
  "createTable": "צור טבלה",
  "dropFilesHere": "גרור לכאן קבצים",
  "addColumnLeft": "הוסף עמודה לשמאל",
  "addColumnRight": "הוסף עמודה לימין",
  "addRowAbove": "הוסף שורה מעל",
  "addRowBelow": "הוסף שורה מתחת",
  "deleteColumn": "מחק עמודה",
  "deleteRow": "מחק שורה",
  "styles": "סגנונות",
  "formatting": "פורמט",
  "viewHtml": "ראה HTML",
  "dialogUpdate": "עדכן",
  "insertFile": "צרף קובץ"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "בטל",
  "dropFilesHere": "גרור קבצים לכאן כדי להעלות",
  "remove": "הסר",
  "retry": "חזור על הפעולה שוב",
  "select": "העלאה",
  "statusFailed": "הפעולה כשלה",
  "statusUploaded": "הפעולה הצליחה",
  "statusUploading": "מעלה את הקבצים",
  "uploadSelectedFiles": "העלה קבצים שבחרת",
  "headerStatusUploaded": "בוצע",
  "headerStatusUploading": "מעלה קבצים"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "כל יום",
  "cancel": "בטל",
  "date": "תאריך",
  "destroy": "מחק",
  "editable": {
    "confirmation": "האם הנך בטוח כי ברצונך למחוק אירוע זה ?"
  },
  "editor": {
    "allDayEvent": "אירוע של יום שלם",
    "description": "תיאור",
    "editorTitle": "אירוע",
    "end": "סיום",
    "endTimezone": "אזור זמן",
    "repeat": "ארוע חוזר",
    "separateTimezones": "השתמש באזורי זמן להתחלה וסיום נפרדים",
    "start": "התחלה",
    "startTimezone": "זמן מקומי",
    "timezone": " ",
    "timezoneEditorButton": "איזור זמן",
    "timezoneEditorTitle": "אזורי זמן",
    "title": "כותרת",
    "noTimezone": "No hours zone"
  },
  "event": "אירוע",
  "recurrenceMessages": {
      "deleteRecurring": "האם הנך בטוח כי ברצונך למחוק אירוע זה או את כל הסדרה ?",
    "deleteWindowOccurrence": "מחיקת אירוע בודד",
    "deleteWindowSeries": "מחק סדרת ארועים",
    "deleteWindowTitle": "מחק אירוע מחזורי",
    "editRecurring": "האם הנך בטוח כי ברצונך לשנות אירוע זה או את כל הסדרה ?",
    "editWindowOccurrence": "שינוי אירוע בודד",
    "editWindowSeries": "שינוי סדרת אירועים",
    "editWindowTitle": "שינוי אירוע מחזורי"
  },
  "save": "שמור",
  "time": "שעה",
  "today": "היום",
  "views": {
    "agenda": "סדר יום",
    "day": "יום",
    "month": "חודש",
    "week": "שבוע",
    "workWeek": "שבוע עבודה"
  },
  "deleteWindowTitle": "מחיקה",
  "showFullDay": "הצג יום מלא",
  "showWorkDay": "הצג יום עבודה"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "קרוב"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "בסדר"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "בסדר",
  "cancel": "בטל"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "בסדר",
  "cancel": "בטל"
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
            "contrastRatio": "יחס ניגודיות:",
            "fail": "נכשל",
            "pass": "עבר",
            "hex": "HEX",
            "toggleFormat": "החלף פורמט",
            "red": "אדום",
            "green": "ירוק",
            "blue": "כחול",
            "alpha": "אלפא"
        });
}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "החל",
            "cancel": "ביטול",
            "noColor": "ללא צבע",
            "clearColor": "נקה צבע"
        });
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "החל",
            "cancel": "ביטול",
            "noColor": "ללא צבע",
            "clearColor": "נקה צבע"
        });
}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {
    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "התחלה",
            "endLabel": "סיום"
        });
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "העלה",
            "orderBy": "מיין לפי",
            "orderByName": "שם",
            "orderBySize": "גודל",
            "directoryNotFound": "ספרייה בשם זה לא נמצאה.",
            "emptyFolder": "תיקייה ריקה",
            "deleteFile": "האם אתה בטוח שברצונך למחוק \"{0}\"?",
            "invalidFileType": "הקובץ שנבחר \"{0}\" אינו תקין. סוגי קבצים נתמכים: {1}.",
            "overwriteFile": "קובץ בשם \"{0}\" כבר קיים בספרייה הנוכחית. האם ברצונך לדרוס אותו?",
            "dropFilesHere": "גרור קובץ לכאן להעלאה",
            "search": "חיפוש"
        });
}

/* FileManager messages */

if (kendo.ui.FileManager) {
    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "תיקייה חדשה",
                "upload": "העלה",
                "sortDirection": "כיוון מיון",
                "sortDirectionAsc": "עולה",
                "sortDirectionDesc": "יורד",
                "sortField": "מיין לפי",
                "nameField": "שם",
                "sizeField": "גודל",
                "typeField": "סוג",
                "dateModifiedField": "תאריך שינוי",
                "dateCreatedField": "תאריך יצירה",
                "listView": "תצוגת רשימה",
                "gridView": "תצוגת רשת",
                "search": "חיפוש",
                "details": "פרטים",
                "detailsChecked": "כן",
                "detailsUnchecked": "לא",
                "Delete": "מחק",
                "Rename": "שנה שם"
            },
            "views": {
                "nameField": "שם",
                "sizeField": "גודל",
                "typeField": "סוג",
                "dateModifiedField": "תאריך שינוי",
                "dateCreatedField": "תאריך יצירה",
                "items": "פריטים"
            },
            "dialogs": {
                "upload": {
                    "title": "העלאת קבצים",
                    "clear": "נקה",
                    "done": "בוצע"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>האם ברצונך להעביר או להעתיק את הקבצים שנבחרו?</p>",
                    "okText": "העתק",
                    "cancel": "העבר",
                    "close": "סגור"
                },
                "deleteConfirm": {
                    "title": "אישור מחיקה",
                    "content": "<p class='k-text-center'>האם אתה בטוח שברצונך למחוק את הקבצים שנבחרו?<br/>לא ניתן לבטל פעולה זו.</p>",
                    "okText": "מחק",
                    "cancel": "ביטול",
                    "close": "סגור"
                },
                "renamePrompt": {
                    "title": "שנה שם",
                    "content": "<p class='k-text-center'>הזן שם קובץ חדש</p>",
                    "okText": "שנה שם",
                    "cancel": "ביטול",
                    "close": "סגור"
                }
            },
            "previewPane": {
                "noFileSelected": "לא נבחר קובץ",
                "extension": "סוג",
                "size": "גודל",
                "created": "תאריך יצירה",
                "createdUtc": "תאריך יצירה (UTC)",
                "modified": "תאריך שינוי",
                "modifiedUtc": "תאריך שינוי (UTC)",
                "items": "פריטים"
            }
        });
}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {
    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "ערוך",
            "createNewCard": "כרטיס חדש",
            "create": "צור",
            "search": "חיפוש",
            "previewCard": "תצוגה מקדימה",
            "addCard": "הוסף כרטיס",
            "editCard": "ערוך כרטיס",
            "deleteCard": "מחק כרטיס",
            "addColumn": "הוסף עמודה",
            "editColumn": "ערוך עמודה",
            "deleteColumn": "מחק עמודה",
            "close": "סגור",
            "cancel": "ביטול",
            "delete": "מחק",
            "saveChanges": "שמור שינויים",
            "title": "כותרת:",
            "description": "תיאור:",
            "newColumn": "עמודה חדשה",
            "deleteColumnConfirm": "האם אתה בטוח שברצונך למחוק עמודה זו?",
            "deleteCardConfirm": "האם אתה בטוח שברצונך למחוק כרטיס זה?"
        });
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "הגדל ערך",
            "downArrowText": "הקטן ערך"
        });
}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {
    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "הגדרות",
            "cancelButtonText": "ביטול",
            "applyButtonText": "החל",
            "measures": "בחר שדות להתחלה",
            "columns": "בחר שדות להתחלה",
            "rows": "בחר שדות להתחלה"
        });
}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {
    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "החל",
            "sortAscending": "עולה",
            "sortDescending": "יורד",
            "filterFields": "סינון שדות",
            "filter": "סנן",
            "include": "כלול שדות...",
            "clear": "נקה",
            "reset": "אפס",
            "moveToColumns": "העבר לעמודות",
            "moveToRows": "העבר לשורות",
            "movePrevious": "אחורה",
            "moveNext": "קדימה",
            "filterOperatorsDropDownLabel": "אופרטורי סינון",
            "filterValueTextBoxLabel": "ערך סינון",
            "operators": {
                "contains": "מכיל",
                "doesnotcontain": "לא מכיל",
                "startswith": "מתחיל ב",
                "endswith": "מסתיים ב",
                "eq": "שווה ל",
                "neq": "לא שווה ל"
            }
        });
}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {
    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "ביטול",
            "update": "שמור",
            "endTitle": "סיום חזרה",
            "repeatTitle": "תבנית חזרה",
            "headerTitle": "חזרה על אירוע",
            "end": {
                "never": "אף פעם",
                "after": "אחרי",
                "on": "בתאריך"
            },
            "daily": {
                "interval": "ימים"
            },
            "weekly": {
                "interval": "שבועות"
            },
            "monthly": {
                "interval": "חודשים",
                "repeatBy": "חזור לפי: ",
                "dayOfMonth": "יום בחודש",
                "dayOfWeek": "יום בשבוע"
            },
            "yearly": {
                "interval": "שנים",
                "repeatBy": "חזור לפי: ",
                "dayOfMonth": "יום בחודש",
                "dayOfWeek": "יום בשבוע",
                "of": " מ-"
            },
            "endRule": {
                "after": " פעמים",
                "on": "בתאריך "
            }
        });
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "מחק",
                "moveUp": "למעלה",
                "moveDown": "למטה",
                "transferTo": "העבר אל",
                "transferFrom": "העבר מ",
                "transferAllTo": "העבר הכל אל",
                "transferAllFrom": "העבר הכל מ"
            }
        });
}

/* kendo.ui.progress method */

if (kendo.ui.progress) {
    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "טוען..."
        });
}

/* TimePicker */

if (kendo.ui.TimePicker) {
    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "קבע",
            "cancel": "ביטול",
            "hour": "שעה",
            "minute": "דקה",
            "second": "שנייה",
            "millisecond": "אלפית שנייה",
            "now": "עכשיו"
        });
}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {
    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "קבע",
            "cancel": "ביטול",
            "hour": "שעה",
            "minute": "דקה",
            "second": "שנייה",
            "millisecond": "אלפית שנייה",
            "now": "עכשיו",
            "date": "תאריך",
            "time": "שעה",
            "today": "היום",
            "weekColumnHeader": ""
        });
}

/* Calendar */

if (kendo.ui.Calendar) {
    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "היום",
            "navigateTo": "נווט אל: ",
            "parentViews": {
                "month": "תצוגה שנתית",
                "year": "תצוגת עשור",
                "decade": "תצוגת מאה"
            }
        });
}

/* DateInput */

if (kendo.ui.DateInput) {
    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "שנה",
            "month": "חודש",
            "day": "יום",
            "weekday": "יום בשבוע",
            "hour": "שעות",
            "minute": "דקות",
            "second": "שניות",
            "dayperiod": "לפנה\"צ/אחה\"צ"
        });
}

/* List messages */

if (kendo.ui.List) {
    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "נקה",
            "noData": "לא נמצאו נתונים."
        });
}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {
    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "נקה",
            "noData": "לא נמצאו נתונים.",
            "singleTag": "פריטים נבחרו"
        });
}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {
    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "נקה",
            "noData": "לא נמצאו נתונים.",
            "singleTag": "פריטים נבחרו"
        });
}

/* Chat messages */

if (kendo.ui.Chat) {
    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "הקלד הודעה...",
            "toggleButton": "סרגל כלים",
            "sendButton": "שלח"
        });
}

/* Wizard messages */

if (kendo.ui.Wizard) {
    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "אפס",
            "previous": "הקודם",
            "next": "הבא",
            "done": "סיום",
            "step": "שלב",
            "of": "מתוך"
        });
}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {
    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "מסמך",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "רמת זום",
                    "zoomOut": "הקטן",
                    "zoomIn": "הגדל",
                    "actualWidth": "רוחב בפועל",
                    "autoWidth": "רוחב אוטומטי",
                    "fitToWidth": "התאם לרוחב",
                    "fitToPage": "התאם לדף"
                },
                "open": "פתח",
                "exportAs": "ייצא",
                "download": "הורד",
                "pager": {
                    "first": "עבור לדף הראשון",
                    "previous": "עבור לדף הקודם",
                    "next": "עבור לדף הבא",
                    "last": "עבור לדף האחרון",
                    "of": "מתוך",
                    "page": "דף",
                    "pages": "דפים"
                },
                "print": "הדפס",
                "toggleSelection": "בחירה",
                "togglePan": "גרירה",
                "search": "חיפוש"
            },
            "errorMessages": {
                "notSupported": "רק קבצי PDF נתמכים.",
                "parseError": "לא ניתן לעבד את קובץ ה-PDF.",
                "notFound": "הקובץ לא נמצא.",
                "popupBlocked": "חלון קופץ נחסם על ידי הדפדפן."
            }
        });
}

/* Captcha messages */

if (kendo.ui.Captcha) {
    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "חדש captcha",
            "audio": "נגן שמע captcha",
            "imageAlt": "הקלד את הטקסט מתמונת ה-captcha",
            "success": "האימות הצליח"
        });
}

/* OrgChart messages */

if (kendo.ui.OrgChart) {
    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "תרשים ארגוני",
            "edit": "ערוך",
            "create": "צור",
            "destroy": "מחק",
            "destroyContent": "האם אתה בטוח שברצונך למחוק פריט זה ואת הכפופים לו?",
            "destroyTitle": "מחק פריט",
            "cancel": "ביטול",
            "save": "שמור",
            "menuLabel": "תפריט עריכה",
            "uploadAvatar": "העלה תמונה חדשה",
            "parent": "הורה",
            "name": "שם",
            "title": "תפקיד",
            "none": "--ללא--",
            "expand": "הרחב",
            "collapse": "כווץ"
        });
}

/* Map messages */

if (kendo.dataviz.ui.Map) {
    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "כותרת מפה"
        });
}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {
    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} יחידות"
        });
}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {
    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "אין נתונים זמינים"
        });
}

  /* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "כל הגבולות",
  "insideBorders": "גבולות פנימיים",
  "insideHorizontalBorders": "גבולות אופקיים פנימיים",
  "insideVerticalBorders": "גבולות אנכיים פנימיים",
  "outsideBorders": "גבולות חיצוניים",
  "leftBorder": "גבול שמאלי",
  "topBorder": "גבול עליון",
  "rightBorder": "גבול ימני",
  "bottomBorder": "גבול תחתון",
  "noBorders": "ללא גבולות",
  "reset": "אפס צבע",
  "customColor": "צבע מותאם אישית...",
  "apply": "החל",
  "cancel": "ביטול"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "החל",
  "save": "שמור",
  "cancel": "ביטול",
  "remove": "הסר",
  "retry": "נסה שוב",
  "revert": "החזר",
  "okText": "אישור",
  "formatCellsDialog": {
    "title": "עיצוב",
    "categories": {
      "number": "מספר",
      "currency": "מטבע",
      "date": "תאריך"
    }
  },
  "fontFamilyDialog": { "title": "גופן" },
  "fontSizeDialog": { "title": "גודל גופן" },
  "bordersDialog": { "title": "גבולות" },
  "alignmentDialog": {
    "title": "יישור",
    "buttons": {
      "justifyLeft": "יישר לשמאל",
      "justifyCenter": "מרכז",
      "justifyRight": "יישר לימין",
      "justifyFull": "יישור מלא",
      "alignTop": "יישר למעלה",
      "alignMiddle": "יישר לאמצע",
      "alignBottom": "יישר למטה"
    }
  },
  "mergeDialog": {
    "title": "מיזוג תאים",
    "buttons": {
      "mergeCells": "מזג הכל",
      "mergeHorizontally": "מזג אופקית",
      "mergeVertically": "מזג אנכית",
      "unmerge": "בטל מיזוג"
    }
  },
  "freezeDialog": {
    "title": "הקפאת חלוניות",
    "buttons": {
      "freezePanes": "הקפאת חלוניות",
      "freezeRows": "הקפאת שורות",
      "freezeColumns": "הקפאת עמודות",
      "unfreeze": "ביטול הקפאה"
    }
  },
  "confirmationDialog": {
    "text": "האם אתה בטוח שברצונך להסיר גליון זה?",
    "title": "הסרת גליון"
  },
  "validationDialog": {
    "title": "אימות נתונים",
    "hintMessage": "אנא הזן ערך {0} תקין {1}.",
    "hintTitle": "אימות {0}",
    "criteria": {
      "any": "כל ערך",
      "number": "מספר",
      "text": "טקסט",
      "date": "תאריך",
      "custom": "נוסחה מותאמת אישית",
      "list": "רשימה"
    },
    "comparers": {
      "greaterThan": "גדול מ",
      "lessThan": "קטן מ",
      "between": "בין",
      "notBetween": "לא בין",
      "equalTo": "שווה ל",
      "notEqualTo": "לא שווה ל",
      "greaterThanOrEqualTo": "גדול או שווה ל",
      "lessThanOrEqualTo": "קטן או שווה ל"
    },
    "comparerMessages": {
      "greaterThan": "גדול מ {0}",
      "lessThan": "קטן מ {0}",
      "between": "בין {0} ל {1}",
      "notBetween": "לא בין {0} ל {1}",
      "equalTo": "שווה ל {0}",
      "notEqualTo": "לא שווה ל {0}",
      "greaterThanOrEqualTo": "גדול או שווה ל {0}",
      "lessThanOrEqualTo": "קטן או שווה ל {0}",
      "custom": "שמקיים את הנוסחה: {0}"
    },
    "labels": {
      "criteria": "קריטריון",
      "comparer": "השוואה",
      "min": "מינימום",
      "max": "מקסימום",
      "value": "ערך",
      "start": "התחלה",
      "end": "סיום",
      "onInvalidData": "בנתונים לא תקינים",
      "rejectInput": "דחה קלט",
      "showWarning": "הצג אזהרה",
      "showHint": "הצג רמז",
      "hintTitle": "כותרת רמז",
      "hintMessage": "הודעת רמז",
      "ignoreBlank": "התעלם מריקים"
    },
    "placeholders": {
      "typeTitle": "הקלד כותרת",
      "typeMessage": "הקלד הודעה"
    }
  },
  "exportAsDialog": {
    "title": "ייצוא...",
    "labels": {
      "fileName": "שם קובץ",
      "saveAsType": "סוג קובץ",
      "exportArea": "ייצוא",
      "paperSize": "גודל נייר",
      "margins": "שוליים",
      "orientation": "כיוון",
      "print": "הדפסה",
      "guidelines": "קווי הנחיה",
      "center": "מרכז",
      "horizontally": "אופקית",
      "vertically": "אנכית"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "לא ניתן לשנות חלק מתא ממוזגת."
  },
  "useKeyboardDialog": {
    "title": "העתקה והדבקה",
    "errorMessage": "פעולות אלו אינן זמינות דרך התפריט. השתמש בקיצורי מקלדת:",
    "labels": {
      "forCopy": "להעתקה",
      "forCut": "לגזירה",
      "forPaste": "להדבקה"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "לא ניתן לבצע פעולה זו על בחירה מרובה."
  },
  "insertCommentDialog": {
    "title": "הוספת הערה",
    "labels": {
      "comment": "הערה",
      "removeComment": "הסרת הערה"
    }
  },
  "insertImageDialog": {
    "title": "הוספת תמונה",
    "info": "גרור תמונה לכאן או לחץ לבחירה",
    "typeError": "אנא בחר תמונת JPEG, PNG או GIF"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "מיין טווח א' עד ת'",
  "sortDescending": "מיין טווח ת' עד א'",
  "filterByValue": "סנן לפי ערך",
  "filterByCondition": "סנן לפי תנאי",
  "apply": "החל",
  "search": "חפש",
  "addToCurrent": "הוסף לבחירה הנוכחית",
  "clear": "נקה",
  "blanks": "(ריקים)",
  "operatorNone": "ללא",
  "and": "וגם",
  "or": "או",
  "operators": {
    "string": {
      "contains": "טקסט מכיל",
      "doesnotcontain": "טקסט לא מכיל",
      "startswith": "טקסט מתחיל ב",
      "endswith": "טקסט מסתיים ב"
    },
    "date": {
      "eq": "תאריך שווה ל",
      "neq": "תאריך לא שווה ל",
      "lt": "תאריך לפני",
      "gt": "תאריך אחרי"
    },
    "number": {
      "eq": "שווה ל",
      "neq": "לא שווה ל",
      "gte": "גדול או שווה ל",
      "gt": "גדול מ",
      "lte": "קטן או שווה ל",
      "lt": "קטן מ"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "אפס צבע",
  "customColor": "צבע מותאם אישית...",
  "apply": "החל",
  "cancel": "ביטול"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "הוסף עמודה משמאל",
  "addColumnRight": "הוסף עמודה מימין",
  "addRowAbove": "הוסף שורה מעל",
  "addRowBelow": "הוסף שורה מתחת",
  "alignment": "יישור",
  "alignmentButtons": {
    "justifyLeft": "יישר לשמאל",
    "justifyCenter": "מרכז",
    "justifyRight": "יישר לימין",
    "justifyFull": "יישור מלא",
    "alignTop": "יישר למעלה",
    "alignMiddle": "יישר לאמצע",
    "alignBottom": "יישר למטה"
  },
  "backgroundColor": "רקע",
  "bold": "מודגש",
  "borders": "גבולות",
  "colorPicker": {
    "reset": "אפס צבע",
    "customColor": "צבע מותאם אישית..."
  },
  "copy": "העתק",
  "cut": "גזור",
  "deleteColumn": "מחק עמודה",
  "deleteRow": "מחק שורה",
  "excelImport": "ייבוא מאקסל...",
  "filter": "סינון",
  "fontFamily": "גופן",
  "fontSize": "גודל גופן",
  "format": "עיצוב מותאם אישית...",
  "formatTypes": {
    "automatic": "אוטומטי",
    "number": "מספר",
    "percent": "אחוז",
    "financial": "פיננסי",
    "currency": "מטבע",
    "date": "תאריך",
    "time": "שעה",
    "dateTime": "תאריך ושעה",
    "duration": "משך",
    "moreFormats": "עיצובים נוספים..."
  },
  "formatDecreaseDecimal": "הפחת עשרוניות",
  "formatIncreaseDecimal": "הגדלת עשרוניות",
  "freeze": "הקפאת חלוניות",
  "freezeButtons": {
    "freezePanes": "הקפאת חלוניות",
    "freezeRows": "הקפאת שורות",
    "freezeColumns": "הקפאת עמודות",
    "unfreeze": "ביטול הקפאה"
  },
  "insertComment": "הוספת הערה",
  "insertImage": "הוספת תמונה",
  "italic": "נטוי",
  "merge": "מיזוג תאים",
  "mergeButtons": {
    "mergeCells": "מזג הכל",
    "mergeHorizontally": "מזג אופקית",
    "mergeVertically": "מזג אנכית",
    "unmerge": "בטל מיזוג"
  },
  "open": "פתח...",
  "paste": "הדבק",
  "quickAccess": {
    "redo": "בצע שוב",
    "undo": "בטל"
  },
  "saveAs": "שמור בשם...",
  "sortAsc": "מיין עולה",
  "sortDesc": "מיין יורד",
  "sortButtons": {
    "sortSheetAsc": "מיין גליון א' עד ת'",
    "sortSheetDesc": "מיין גליון ת' עד א'",
    "sortRangeAsc": "מיין טווח א' עד ת'",
    "sortRangeDesc": "מיין טווח ת' עד א'"
  },
  "textColor": "צבע טקסט",
  "textWrap": "גלישת טקסט",
  "underline": "קו תחתון",
  "validation": "אימות נתונים..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "nameBox": "תיבת שם",
  "formulaInput": "קלט נוסחה",
  "errors": {
    "shiftingNonblankCells": "לא ניתן להוסיף תאים בשל אפשרות לאיבוד נתונים. בחר מיקום אחר להוספה או מחק נתונים מסוף הגליון.",
    "filterRangeContainingMerges": "לא ניתן ליצור סינון בתוך טווח המכיל תאים ממוזגים",
    "validationError": "הערך שהוזן מפר את כללי אימות התא."
  },
  "tabs": {
    "home": "בית",
    "insert": "הוספה",
    "data": "נתונים"
  },
  "sheetBar": {
    "addSheet": "הוסף גליון חדש",
    "deleteSheet": "מחק",
    "duplicateSheet": "שכפל",
    "renameSheet": "שנה שם",
    "hideSheet": "הסתר",
    "moveRight": "הזז ימינה",
    "moveLeft": "הזז שמאלה"
  }
});
}

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "אין חיפושים קודמים",
        "noPreviousPrompts": "אין שאילתות קודמות",
        "previousSearches": "חיפושים קודמים",
        "previousPrompts": "שאילתות קודמות",
        "suggestedPrompts": "שאילתות מוצעות",
        "searchModeLabel": "חיפוש",
        "searchModeDescription": "מחפש התאמות מדויקות של מילים בנתונים שלך",
        "searchPlaceholder": "חיפוש",
        "semanticSearchModeLabel": "חיפוש סמנטי",
        "semanticSearchModeDescription": "מבין הקשר כדי להציג את התוצאות הרלוונטיות ביותר.",
        "semanticSearchPlaceholder": "חיפוש סמנטי",
        "semanticSearchButtonText": "חיפוש",
        "aiAssistantPlaceholder": "מיון, סינון או קיבוץ עם בינה מלאכותית",
        "speechToText": "דיבור לטקסט",
        "speechToTextAriaLabel": "התחל זיהוי דיבור",
        "cancel": "ביטול",
        "send": "שלח",
        "searchButtonText": "חיפוש",
        "aiAssistantButtonText": "עוזר בינה מלאכותית"
      });
  }

})(window.kendo.jQuery);
(function ($, undefined) {
/* Validator */
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

/* TreeView */

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
kendo.ui.Upload.prototype.options.localization=
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

/* Slider */

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

/* Gantt */

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

/* Filter menu operator messages */

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

/* Filter cell operator messages */

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
    "fourth":"רביעי",
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
    "canceledit": "בטל עריכה",
    "create": "צור חדש",
    "destroy": "מחק",
    "edit": "עריכה",
    "save": "שמור",
    "select": "בחר",
    "update": "עדכן"
  },
  "editable": {
    "cancelDelete": "בטל מחיקה",
    "confirmation": "האם הנך בטוח שברונך לבצע זאת?",
    "confirmDelete": "אשר מחיקה"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
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
  "selectValue": "-בחר ערך-",
  "isFalse":"לא",
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
    "insertOrderedList": "Insert ordered list",
  "insertUnorderedList": "Insert unordered list",
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
  "imageAltText": "Alternate text",
  "imageWebAddress": "כתובת אינטרנט",
  "linkOpenInNewWindow": "Open link in new window",
  "linkText": "Text",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "Web address",
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
    "endTimezone": "After timezone",
    "repeat": "ארוע חוזר",
    "separateTimezones": "Use different time zones start and end",
    "start": "התחלה",
    "startTimezone": "זמן מקומי",
    "timezone": " ",
    "timezoneEditorButton": "Classes zone",
    "timezoneEditorTitle": "Classes zone",
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

})(window.kendo.jQuery);

(function ($, undefined) {
/* Filter menu operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "հավասար է",
    "gte": "մեծ է կամ հավասար",
    "gt": "մեծ է",
    "lte": "փոքր է կամ հավասար",
    "lt": "փոքր է",
    "neq": "հավասար չէ"
  },
  "number": {
    "eq": "հավասար է",
    "gte": "մեծ է կամ հավասար",
    "gt": "մեծ է",
    "lte": "փոքր է կամ հավասար",
    "lt": "փոքր է",
    "neq": "հավասար չէ"
  },
  "string": {
    "endswith": "ավարտվում է",
    "eq": "հավասար է",
    "neq": "հավասար չէ",
    "startswith": "սկասվում է",
    "contains": "պարունակում է",
    "doesnotcontain": "չի պարունակում"
  },
  "enums": {
    "eq": "հավասար է",
    "neq": "հավասար չէ"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "հավասար է",
    "gte": "մեծ է կամ հավասար",
    "gt": "մեծ է",
    "lte": "փոքր է կամ հավասար",
    "lt": "փոքր է",
    "neq": "հավասար չէ"
  },
  "number": {
    "eq": "հավասար է",
    "gte": "մեծ է կամ հավասար",
    "gt": "մեծ է",
    "lte": "փոքր է կամ հավասար",
    "lt": "փոքր է",
    "neq": "հավասար չէ"
  },
  "string": {
    "endswith": "ավարտվում է",
    "eq": "հավասար է",
    "neq": "հավասար չէ",
    "startswith": "սկասվում է",
    "contains": "պարունակում է",
    "doesnotcontain": "չի պարունակում"
  },
  "enums": {
    "eq": "հավասար է",
    "neq": "հավասար չէ"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Սյուներ",
  "sortAscending": "Դասավորել աճման կարգով",
  "sortDescending": "Դասավորել նվազման կարգով",
  "settings": "Սյուների տվյալները",
  "done": "Կատարված",
  "lock": "Փակել",
  "unlock": "Բացել",
  "filter": "Ֆիլտրեր"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "օր(եր)",
    "repeatEvery": "Կրկնել ամեն:"
  },
  "end": {
    "after": "Հետո",
    "occurrence": "occurrence(s)",
    "label": "Վերջ:",
    "never": "Երբեք",
    "on": "On",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Օրական",
    "monthly": "Ամսական",
    "never": "Երբեք",
    "weekly": "Շաբաթական",
    "yearly": "Տարեկան"
  },
  "monthly": {
    "day": "Օր",
    "interval": "ամիս(ներ)",
    "repeatEvery": "Կրկնել ամեն:",
    "repeatOn": "Կրկնել:"
  },
  "offsetPositions": {
    "first": "առաջին",
    "fourth": "չորրորդ",
    "last": "վերջին",
    "second": "երկրորդ",
    "third": "երրորդ"
  },
  "weekly": {
    "repeatEvery": "Կրկնել ամեն:",
    "repeatOn": "Կրկնել:",
    "interval": "շաբաթ(ներ)"
  },
  "yearly": {
    "of": "of",
    "repeatEvery": "Կրկնել ամեն:",
    "repeatOn": "Կրկնել:",
    "interval": "տարի(ներ)"
  },
  "weekdays": {
    "day": "օր",
    "weekday": "աշխատանքային օր",
    "weekend": "ոչ աշխատանքային օր"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "create": "Ավելացնել",
    "destroy": "Հեռացնել",
    "canceledit": "Չեղարկել",
    "update": "Թարմացնել",
    "edit": "Խմբագրել",
    "excel": "Արտահանել Excel",
    "pdf": "Արտահանել PDF",
    "select": "Ընտրել",
    "cancel": "Չեղարկել",
    "save": "Պահպանել"
  },
  "editable": {
    "confirmation": "Հեռացնե՞լ նշված տողը։",
    "cancelDelete": "Չեղարկել",
    "confirmDelete": "Հեռացնել"
  },
  "noRecords": "Հասանելի տվյալներ չկան։"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Բոլորը",
  "page": "Էջ",
  "display": "Ցուցադրված են {0}-{1} տողերը {2}-ից",
  "of": "{0}-ից",
  "empty": "Տվյալներ չկան",
  "refresh": "Թարմացնել",
  "first": "Վերադառնալ առաջին էջ",
  "itemsPerPage": "տողերի քանակ էջում",
  "last": "Անցնել վերջին էջ",
  "next": "Անցնել հաջորդ էջ",
  "previous": "Վերադառնալ նախորդ էջ",
  "morePages": "Ավելի շատ էջեր"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "Ֆիլտրել",
  "clear": "Մաքրել",
  "isFalse": "սխալ է",
  "isTrue": "ճիշտ է",
  "operator": "Օպերատոր"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "Ֆիլտրել",
  "and": "և",
  "clear": "Մաքրել",
  "info": "Նշված արժեքներով տողերը",
  "selectValue": "-ընտրել-",
  "isFalse": "սխալ է",
  "isTrue": "ճիշտ է",
  "or": "կամ",
  "cancel": "Չեղարկել",
  "operator": "Օպերատոր",
  "value": "Արժեք"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Սյան արժեքները խմբավորելու համար սյան վերնագիրը քաշեք այստեղ։"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Полужирный",
  "createLink": "Դարձնել հղում",
  "fontName": "Տառատեսակ",
  "fontNameInherit": "(шрифт как в документе)",
  "fontSize": "Տառատեսակի չափ",
  "fontSizeInherit": "(размер как в документе)",
  "formatBlock": "Текст изображения",
  "indent": "Увеличить отступ",
  "insertHtml": "Вставить HTML",
  "insertImage": "Պատկեր",
  "insertOrderedList": "Нумерованный список",
  "insertUnorderedList": "Маркированныйсписок",
  "italic": "Курсив",
  "justifyCenter": "По центру",
  "justifyFull": "По ширине",
  "justifyLeft": "Влево",
  "justifyRight": "Вправо",
  "outdent": "Уменьшить отступ",
  "strikethrough": "Зачеркнутый",
  "styles": "Стиль",
  "subscript": "Под строкой",
  "superscript": "Над строкой",
  "underline": "Подчеркнутый",
  "unlink": "Удалить гиперссылку",
  "dialogButtonSeparator": "или",
  "dialogCancel": "Отмена",
  "dialogInsert": "Вставить",
  "imageAltText": "Alternate text",
  "imageWebAddress": "Веб адрес",
  "linkOpenInNewWindow": "Открыть в новом окне",
  "linkText": "Текст",
  "linkToolTip": "Всплывающая подсказка",
  "linkWebAddress": "Веб адрес",
  "search": "Поиск",
  "createTable": "Вставить таблицу",
  "addColumnLeft": "Add column on the left",
  "addColumnRight": "Add column on the right",
  "addRowAbove": "Add row above",
  "addRowBelow": "Add row below",
  "deleteColumn": "Delete column",
  "deleteRow": "Delete row",
  "backColor": "Background color",
  "deleteFile": "Are you sure you want to delete \"{0}\"?",
  "directoryNotFound": "A directory with this name was not found.",
  "dropFilesHere": "drop files here to upload",
  "emptyFolder": "Empty Folder",
  "foreColor": "Color",
  "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
  "orderBy": "Arrange by:",
  "orderByName": "Name",
  "orderBySize": "Size",
  "overwriteFile": "'A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
  "uploadFile": "Upload",
  "formatting": "Format",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insert file"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Դադարեցնել ներբեռնումը",
  "dropFilesHere": "Ներբեռնելու համար քաշեք ֆայլերը այստեղ",
  "remove": "Հեռացնել",
  "retry": "Կրկնել",
  "select": "Ընտրել...",
  "statusFailed": "Ներբեռնումը կասեցված է",
  "statusUploaded": "Ներբեռնումը ավարտված է",
  "statusUploading": "բեռնվում է",
  "uploadSelectedFiles": "Ներբեռնել ընտրված ֆայլերը",
  "headerStatusUploaded": "Կատարված է",
  "headerStatusUploading": "Բեռնվում է..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "ամեն օր",
  "cancel": "Չեղարկել",
  "editable": {
    "confirmation": "Ցանկանու՞մ եք հեռացնել։"
  },
  "date": "Ամսաթիվ",
  "destroy": "Հեռացնել",
  "editor": {
    "allDayEvent": "Ամենօրյա իրադարձություն",
    "description": "Նկարագրություն",
    "editorTitle": "Իրադարձություն",
    "end": "Վերջ",
    "endTimezone": "End timezone",
    "repeat": "Կրկնել",
    "separateTimezones": "Use separate start and end time zones",
    "start": "Սկիզբ",
    "startTimezone": "Start timezone",
    "timezone": " ",
    "timezoneEditorButton": "Time zone",
    "timezoneEditorTitle": "Timezones",
    "title": "Title",
    "noTimezone": "No timezone"
  },
  "event": "Event",
  "recurrenceMessages": {
    "deleteRecurring": "Do you want to delete only this event occurrence or the whole series?",
    "deleteWindowOccurrence": "Delete current occurrence",
    "deleteWindowSeries": "Delete the series",
    "deleteWindowTitle": "Delete Recurring Item",
    "editRecurring": "Do you want to edit only this event occurrence or the whole series?",
    "editWindowOccurrence": "Edit current occurrence",
    "editWindowSeries": "Edit the series",
    "editWindowTitle": "Edit Recurring Item"
  },
  "save": "Save",
  "time": "Time",
  "today": "Today",
  "views": {
    "agenda": "Agenda",
    "day": "Day",
    "month": "Month",
    "week": "Week",
    "workWeek": "Work Week"
  },
  "deleteWindowTitle": "Delete event",
  "showFullDay": "Show full day",
  "showWorkDay": "Show business hours"
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} պարտադիր է",
  "pattern": "{0} սխալ է",
  "min": "{0}-ը պետք է լինի մեծ կամ հավասար {1}-ից",
  "max": "{0}-ը պետք է լինի փոքր կամ հավասար {1}-ից",
  "step": "{0} սխալ է",
  "email": "{0} սխալ էլեկտրոնային հասցե է",
  "url": "{0} սխալ URL է",
  "date": "{0} սխալ ամսաթիվ է"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "սերտ"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "լավ"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "լավ",
  "cancel": "Չեղարկել"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "լավ",
  "cancel": "Չեղարկել"
});
}

})(window.kendo.jQuery);

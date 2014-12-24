/* Validator */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} е задължително поле",
  "pattern": "{0} не е валидно",
  "min": "{0} трябва да бъде по-голямо или равно на {1}",
  "max": "{0} трябва да бъде по-малко или равно на {1}",
  "step": "{0} не е валидно",
  "email": "{0} не е валиден email",
  "url": "{0} не е валиден URL",
  "date": "{0} не е валидна дата"
});
}

/* TreeView */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Зареждане...",
  "requestFailed": "Грешка при заявка",
  "retry": "Опитай отново"
});
}

/* Upload */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization=
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Избери файлове...",
  "cancel": "Отказ",
  "retry": "Опитай отново",
  "remove": "Премахни",
  "uploadSelectedFiles": "Качи файловете",
  "dropFilesHere": "drop files here to upload",
  "statusUploading": "uploading",
  "statusUploaded": "uploaded",
  "statusWarning": "warning",
  "statusFailed": "failed",
  "headerStatusUploading": "Uploading...",
  "headerStatusUploaded": "Приключено"
});
}

/* Slider */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Увеличи",
  "decreaseButtonTitle": "Намали"
});
}

/* Numeric text box */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Увеличи стойността",
  "downArrowText": "Намали стойността"
});
}

/* Gantt */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Добави дете",
    "append": "Добави задача",
    "insertAfter": "Добави отдолу",
    "insertBefore": "Добави отгоре",
    "pdf": "Експорт към PDF"
  },
  "cancel": "Откажи",
  "deleteDependencyWindowTitle": "Изтрий връзка",
  "deleteTaskWindowTitle": "Изтрий задача",
  "destroy": "Изтрий",
  "editor": {
    "assingButton": "Задай",
    "editorTitle": "Задача",
    "end": "Край",
    "percentComplete": "Завършено",
    "resources": "Ресурси",
    "resourcesEditorTitle": "Ресурси",
    "resourcesHeader": "Ресурси",
    "start": "Начало",
    "title": "Заглавие",
    "unitsHeader": "Единици"
  },
  "save": "Запази",
  "views": {
    "day": "Ден",
    "end": "Край",
    "month": "Месец",
    "start": "Начало",
    "week": "Седмица",
    "year": "Година"
  }
});
}

/* File browser */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Качи файл",
  "orderBy": "Подреди по",
  "orderByName": "Име",
  "orderBySize": "Размер",
  "directoryNotFound": "Папка с това име не беше намерена",
  "emptyFolder": "Празна папка",
  "deleteFile": 'Сигурни ли сте че искате да изтриете "{0}"?',
  "invalidFileType": "Избраният файл \"{0}\" не е валиден. Поддържаните файлови формати са {1}.",
  "overwriteFile": "Файл с име \"{0}\" вече съществува в текущата папка. Искате ли да го презапишете?",
  "dropFilesHere": "Пуснете файл тук за да го качите",
  "search": "Търси"
});
}


/* Flat color picker */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Приложи",
  "cancel": "Откажи"
});
}

/* Color picker */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Приложи",
  "cancel": "Откажи"
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "Е равно на",
    "neq": "Не е равно на",
    "startswith": "Започва с",
    "contains": "Съдържа",
    "doesnotcontain": "Не съдържа",
    "endswith": "Завършва на"
  },
  "number": {
    "eq": "Е равно на",
    "neq": "Не е равно на",
    "gte": "Е по-голяма или равно на",
    "gt": "Е по-голямо от",
    "lte": "Е по-малко или равно на",
    "lt": "Е по-малко от"
  },
  "date": {
    "eq": "Е равно на",
    "neq": "Не е равно на",
    "gte": "Е след или равно на",
    "gt": "Е след",
    "lte": "Е преди или равно на",
    "lt": "Е преди"
  },
  "enums": {
    "eq": "E равно на",
    "neq": "Не е равно на"
  }
});
}

/* Filter cell operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Е равно на",
    "neq": "Не е равно на",
    "startswith": "Започва с",
    "contains": "Съдържа",
    "doesnotcontain": "Не съдържа",
    "endswith": "Завършва на"
  },
  "number": {
    "eq": "Е равно на",
    "neq": "Не е равно на",
    "gte": "Е по-голяма или равно на",
    "gt": "Е по-голямо от",
    "lte": "Е по-малко или равно на",
    "lt": "Е по-малко от"
  },
  "date": {
    "eq": "Е равно на",
    "neq": "Не е равно на",
    "gte": "Е след или равно на",
    "gt": "Е след",
    "lte": "Е преди или равно на",
    "lt": "Е преди"
  },
  "enums": {
    "eq": "E равно на",
    "neq": "Не е равно на"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Сортирай възходящо",
  "sortDescending": "Сортирай низходящо",
  "filter": "Филтрирай",
  "columns": "Колони",
  "done": "Готово",
  "settings": "Настройки на колоната",
  "lock": "Заключи",
  "unlock": "Отключи"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": " ден(дни)",
    "repeatEvery": "Повтаряй всеки: "
  },
  "end": {
    "after": "След ",
    "occurrence": " повторение(я)",
    "label": "Край:",
    "never": "Никога",
    "on": "На ",
    "mobileLabel": "Край"
  },
  "frequencies": {
    "daily": "Ежедневно",
    "monthly": "Месечно",
    "never": "Никога",
    "weekly": "Седмично",
    "yearly": "Годишно"
  },
  "monthly": {
    "day": "Ден ",
    "interval": " месец(и)",
    "repeatEvery": "Повтаряй всеки: ",
    "repeatOn": "Повтаряй на: "
  },
  "offsetPositions": {
    "first": "първи(а)",
    "fourth": "четвърти(та)",
    "last": "последен(на)",
    "second": "втори(а)",
    "third": "трети(та)"
  },
  "weekly": {
    "repeatEvery": "Повтаряй на: ",
    "repeatOn": "Повтаряй всеки: ",
    "interval": " седмица(и)"
  },
  "yearly": {
    "of": " от ",
    "repeatEvery": "Повтаряй всеки: ",
    "repeatOn": "Повтаряй на: ",
    "interval": " година(ни)"
  },
  "weekdays": {
    "day": "ден",
    "weekday": "делник",
    "weekend": "почивен ден"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Откажи промените",
    "canceledit": "Отказ",
    "create": "Добави",
    "destroy": "Изтриване",
    "edit": "Редактиране",
    "save": "Запази промените",
    "select": "Избери",
    "update": "Запази"
  },
  "editable": {
    "cancelDelete": "Откажи",
    "confirmation": "Сигурни ли сте, че искате да изтриете записа?",
    "confirmDelete": "Изтрий"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "page": "Страница",
  "display": "{0} - {1} от {2} записи",
  "of": "от {0}",
  "empty": "Няма записи за показване!",
  "refresh": "Опресни",
  "first": "Към първата страница",
  "itemsPerPage": "записи на страница",
  "last": "Към последната страница",
  "next": "Към следващата страница",
  "previous": "Към предишната страница",
  "morePages": "Още страници"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "Филтрирай",
  "and": "и",
  "clear": "Премахни филтър",
  "info": "Покажи записи със стойност, която",
  "selectValue": "-Избери стойност-",
  "isFalse": "не е вярно",
  "isTrue": "е вярно",
  "or": "или",
  "cancel": "Откажи",
  "operator": "Оператор",
  "value": "Стойност"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "Филтрирай",
  "clear": "Премахни филтър",
  "isFalse": "не е вярно",
  "isTrue": "е вярно",
  "operator": "Оператор"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Дръпни колона и я пусни тук, за да групираш"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Получер",
  "createLink": "Направи препратка",
  "fontName": "Шрифт",
  "fontNameInherit": "(наследен шрифт)",
  "fontSize": "Размер на шрифта",
  "fontSizeInherit": "(наследен размер)",
  "formatBlock": "Избери формат",
  "indent": "Добави отстъп",
  "insertHtml": "Вмъкни HTML",
  "insertImage": "Вмъкни картина",
  "insertOrderedList": "Вмъкни номериран списък",
  "insertUnorderedList": "Вмъкни списък",
  "italic": "Курсив",
  "justifyCenter": "Центрирай",
  "justifyFull": "Подравни",
  "justifyLeft": "Подравни отляво",
  "justifyRight": "Подравни отдясно",
  "outdent": "Премахни отстъп",
  "strikethrough": "Зачертай",
  "style": "Стилове",
  "subscript": "Долен индекс",
  "superscript": "Горен индекс",
  "underline": "Подчертай",
  "unlink": "Премахни препратка",
  "deleteFile": "Сигурни ли сте че искате да изтриете \"{0}\"?",
  "directoryNotFound": "Директория с посоченото име не бе открита.",
  "emptyFolder": "Празна папка",
  "invalidFileType": "Избраният файл \"{0}\" не е валиден. Поддържаните файлови формати са {1}.",
  "orderBy": "Подреди по:",
  "orderByName": "Име",
  "orderBySize": "Големина",
  "overwriteFile": "Файл с име \"{0}\" вече съществува в тази папка. Искате ли да го презапишете?",
  "uploadFile": "Качи файл",
  "backColor": "Цвят на фона",
  "foreColor": "Цвят",
  "dialogButtonSeparator": "or",
  "dialogCancel": "Cancel",
  "dialogInsert": "Insert",
  "imageAltText": "Alternate text",
  "imageWebAddress": "Web address",
  "linkOpenInNewWindow": "Open link in new window",
  "linkText": "Text",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "Web address",
  "search": "Търси",
  "createTable": "Създай таблица",
  "dropFilesHere": "преместете с мишката файлове тук за да ги качите",
  "addColumnLeft": "Add column on the left",
  "addColumnRight": "Add column on the right",
  "addRowAbove": "Add row above",
  "addRowBelow": "Add row below",
  "deleteColumn": "Delete column",
  "deleteRow": "Delete row",
  "styles": "Стилове",
  "formatting": "Format",
  "viewHtml": "Виж HTML-а",
  "dialogUpdate": "Обнови",
  "insertFile": "Вмъкни файл"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "Спри",
  "dropFilesHere": "преместете с мишката файлове тук за да ги качите",
  "remove": "Премахни",
  "retry": "Опитай отново",
  "select": "Избери...",
  "statusFailed": "грешка",
  "statusUploaded": "качен",
  "statusUploading": "качва се",
  "uploadSelectedFiles": "Качи файловете",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "цял ден",
  "cancel": "Откажи",
  "confirmation": "Сигурен ли сте че искате да изтриете това събитие?",
  "date": "Дата",
  "destroy": "Изтрий",
  "editor": {
    "allDayEvent": "Целодневно събитие",
    "description": "Описание",
    "editorTitle": "Събитие",
    "end": "Край",
    "endTimezone": "Крайна часова зона",
    "repeat": "Повторение",
    "separateTimezones": "Използвай различни часови зони за начало и край",
    "start": "Начало",
    "startTimezone": "Начална часова зона",
    "timezone": " ",
    "timezoneEditorButton": "Часовa зона",
    "timezoneEditorTitle": "Часови зони",
    "title": "Заглавие",
    "noTimezone": "Без часова зона"
  },
  "event": "Събитие",
  "recurrenceMessages": {
    "deleteRecurring": "Сигурен ли сте че искате да изтриете това събитие или цялата серия?",
    "deleteWindowOccurrence": "Изтрий единично събитие",
    "deleteWindowSeries": "Изтрий серията",
    "deleteWindowTitle": "Изтриване на повтарящо се събитие",
    "editRecurring": "Сигурен ли сте че искате да промените това събитие или цялата серия?",
    "editWindowOccurrence": "Промени единично събитие",
    "editWindowSeries": "Промени серията",
    "editWindowTitle": "Промяна на повтарящо се действие"
  },
  "save": "Запази",
  "time": "Време",
  "today": "Днес",
  "views": {
    "agenda": "Дневен ред",
    "day": "Ден",
    "month": "Месец",
    "week": "Седмица",
    "workWeek": "Работна седмица"
  },
  "deleteWindowTitle": "Изтрий събитие",
  "showFullDay": "Покажи цял ден",
  "showWorkDay": "Покажи работни часове"
});
}

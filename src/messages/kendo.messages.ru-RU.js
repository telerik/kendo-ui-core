

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "равна",
    "gte": "после или равна",
    "gt": "после",
    "lte": "до или равна",
    "lt": "до",
    "neq": "не равна"
  },
  "number": {
    "eq": "равно",
    "gte": "больше или равно",
    "gt": "больше",
    "lte": "меньше или равно",
    "lt": "меньше",
    "neq": "не равно"
  },
  "string": {
    "endswith": "оканчивается на",
    "eq": "равно",
    "neq": "не равно",
    "startswith": "начинающимися на",
    "contains": "содержащими",
    "doesnotcontain": "не содержит"
  },
  "enum": {
    "eq": "равно",
    "neq": "не равно"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Колонны",
  "sortAscending": "Сортировка по возрастанию",
  "sortDescending": "Сортировка по убыванию",
  "settings": "Параметры столбцов",
  "done": "Cделанный",
  "lock": "Запирать",
  "unlock": "Отпереть",
  "filter": "Фильтровать"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "days(s)",
    "repeatEvery": "Repeat every:"
  },
  "end": {
    "after": "After",
    "occurrence": "occurrence(s)",
    "label": "End:",
    "never": "Never",
    "on": "On",
    "mobileLabel": "Ends"
  },
  "frequencies": {
    "daily": "Daily",
    "monthly": "Monthly",
    "never": "Never",
    "weekly": "Weekly",
    "yearly": "Yearly"
  },
  "monthly": {
    "day": "Day",
    "interval": "month(s)",
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:"
  },
  "offsetPositions": {
    "first": "first",
    "fourth": "fourth",
    "last": "last",
    "second": "second",
    "third": "third"
  },
  "weekly": {
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:",
    "interval": "week(s)"
  },
  "yearly": {
    "of": "of",
    "repeatEvery": "Repeat every:",
    "repeatOn": "Repeat on:",
    "interval": "year(s)"
  },
  "weekdays": {
    "day": "day",
    "weekday": "weekday",
    "weekend": "weekend day"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "create": "Добавить",
    "destroy": "Удалить",
    "canceledit": "Отмена",
    "update": "Обновить",
    "edit": "Изменить",
    "select": "Выбрать",
    "cancel": "Отменить изменения",
    "save": "Сохранить изменения"
  },
  "editable": {
    "confirmation": "Вы уверены, что хотите удалить эту запись?",
    "cancelDelete": "Отмена",
    "confirmDelete": "Удалить"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "page": "Страница",
  "display": "Отображены записи {0} - {1} из {2}",
  "of": "из {0}",
  "empty": "Нет записей для отображения",
  "refresh": "Обновить",
  "first": "Вернуться на первую страницу",
  "itemsPerPage": "элементов на странице",
  "last": "К последней странице",
  "next": "Перейдите на следующую страницу",
  "previous": "Перейти на предыдущую страницу",
  "morePages": "Больше страниц"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "фильтровать",
  "and": "И",
  "clear": "очистить фильтр",
  "info": "Строки со значениями",
  "selectValue": "-выберите-",
  "isFalse": "ложь",
  "isTrue": "истина",
  "or": "или",
  "cancel": "Отмена",
  "operator": "Оператор",
  "value": "Значение"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Переместите сюда заголовок колонки, чтобы сгрупировать записи из этой колонки"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Полужирный",
  "createLink": "Вставить гиперссылку",
  "fontName": "Шрифт",
  "fontNameInherit": "(шрифт как в документе)",
  "fontSize": "Выбрать размер шрифта",
  "fontSizeInherit": "(размер как в документе)",
  "formatBlock": "Текст изображения",
  "indent": "Увеличить отступ",
  "insertHtml": "Вставить HTML",
  "insertImage": "Изображение",
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
  "cancel": "Отменить загрузку",
  "dropFilesHere": "перетащите сюда файлы для загрузки",
  "remove": "Удалить",
  "retry": "Повторить",
  "select": "Выбрать...",
  "statusFailed": "загрузка прервана",
  "statusUploaded": "загружено",
  "statusUploading": "загружается",
  "uploadSelectedFiles": "Загрузить выбранные файлы",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "all day",
  "cancel": "Отмена",
  "confirmation": "Are you sure you want to delete this event?",
  "date": "Date",
  "destroy": "Delete",
  "editor": {
    "allDayEvent": "All day event",
    "description": "Description",
    "editorTitle": "Event",
    "end": "End",
    "endTimezone": "End timezone",
    "repeat": "Repeat",
    "separateTimezones": "Use separate start and end time zones",
    "start": "Start",
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
  "required": "{0} обязателен",
  "pattern": "{0} не верен",
  "min": "{0} должен быть больше или равен {1}",
  "max": "{0} должен быть меньше или равен {1}",
  "step": "{0} не верен",
  "email": "{0} не корректный email",
  "url": "{0} не корректный URL",
  "date": "{0} не корректная дата"
});
}

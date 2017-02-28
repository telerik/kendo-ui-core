(function ($, undefined) {
/* Filter menu operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
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
  "enums": {
    "eq": "равно",
    "neq": "не равно"
  }
});
}

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
  "enums": {
    "eq": "равно",
    "neq": "не равно"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Столбцы",
  "sortAscending": "Сортировка по возрастанию",
  "sortDescending": "Сортировка по убыванию",
  "settings": "Параметры столбцов",
  "done": "Готово",
  "lock": "Заблокировать",
  "unlock": "Разблокировать",
  "filter": "Фильтровать"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "дней",
    "repeatEvery": "Повторять каждые:"
  },
  "end": {
    "after": "После",
    "occurrence": "входит",
    "label": "Конец:",
    "never": "Никогда",
    "on": "В",
    "mobileLabel": "Окончание"
  },
  "frequencies": {
    "daily": "Ежедневно",
    "monthly": "Ежемесячно",
    "never": "Никогда",
    "weekly": "Еженедельно",
    "yearly": "Ежегодно"
  },
  "monthly": {
    "day": "День",
    "interval": "месяцы",
    "repeatEvery": "Повторять каждый:",
    "repeatOn": "Повторение:"
  },
  "offsetPositions": {
    "first": "первый",
    "fourth": "четвертый",
    "last": "последний",
    "second": "второй",
    "third": "третий"
  },
  "weekly": {
    "repeatEvery": "Повторять каждую:",
    "repeatOn": "Повторение:",
    "interval": "неделя"
  },
  "yearly": {
    "of": "из",
    "repeatEvery": "Повторять каждый:",
    "repeatOn": "Повторение:",
    "interval": "годы"
  },
  "weekdays": {
    "day": "день",
    "weekday": "будний",
    "weekend": "выходной"
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
    "excel": "Экспорт в Excel",
    "pdf": "Экспорт в PDF",
    "select": "Выбрать",
    "cancel": "Отменить изменения",
    "save": "Сохранить изменения"
  },
  "editable": {
    "confirmation": "Вы уверены, что хотите удалить эту запись?",
    "cancelDelete": "Отмена",
    "confirmDelete": "Удалить"
  },
  "noRecords": "Нет записей доступны."
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Все",
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

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "фильтровать",
  "clear": "очистить",
  "isFalse": "ложь",
  "isTrue": "истина",
  "operator": "Оператор"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "фильтровать",
  "and": "И",
  "clear": "очистить",
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

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Поиск"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Переместите сюда заголовок столбца, чтобы сгрупировать записи по этому столбцу"
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
  "imageAltText": "Альтернативный текст",
  "imageWebAddress": "Веб адрес",
  "linkOpenInNewWindow": "Открыть в новом окне",
  "linkText": "Текст",
  "linkToolTip": "Всплывающая подсказка",
  "linkWebAddress": "Веб адрес",
  "search": "Поиск",
  "createTable": "Вставить таблицу",
  "addColumnLeft": "Добавить столбец слева",
  "addColumnRight": "Добавить столбец справа",
  "addRowAbove": "Добавить стороку выше",
  "addRowBelow": "Добавить строку ниже",
  "deleteColumn": "Удалить столбец",
  "deleteRow": "Удалить строку",
  "backColor": "Цвет фона",
  "deleteFile": "Вы уверены, что хотите удалить \"{0}\"?",
  "directoryNotFound": "Каталог с таким именем не найден.",
  "dropFilesHere": "для загрузки перетащите файлы сюда",
  "emptyFolder": "Пустая папка",
  "foreColor": "Цвет",
  "invalidFileType": "Выбранный файл \"{0}\" не верен. Поддерживаемые типы файлов {1}.",
  "orderBy": "Упорядочить по:",
  "orderByName": "Имя",
  "orderBySize": "Размер",
  "overwriteFile": "'Файл с именем \"{0}\" уже существует в этой папке. Вы хотите перезаписать его?",
  "uploadFile": "Загрузить",
  "formatting": "Формат",
  "viewHtml": "Просмотр HTML",
  "dialogUpdate": "Обновить",
  "insertFile": "Вставить файл"
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
  "headerStatusUploaded": "Готово",
  "headerStatusUploading": "Загружается..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "весь день",
  "cancel": "Отмена",
  "editable": {
    "confirmation": "Вы уверены, что хотите удалить это событие?"
  },
  "date": "Дата",
  "destroy": "Удалить",
  "editor": {
    "allDayEvent": "Событие на весь день",
    "description": "Описание",
    "editorTitle": "Событие",
    "end": "Окончание",
    "endTimezone": "Часовой поис окончания",
    "repeat": "Повторение",
    "separateTimezones": "Для начала и окончания используйте свой часовой пояс",
    "start": "Начало",
    "startTimezone": "Часовой пояс начала",
    "timezone": " ",
    "timezoneEditorButton": "Часовой пояс",
    "timezoneEditorTitle": "Часовые пояса",
    "title": "Заголовок",
    "noTimezone": "Без часового пояса"
  },
  "event": "Событие",
  "recurrenceMessages": {
    "deleteRecurring": "Вы хотите удалить только это событие или весь ряд повторяющихся событий?",
    "deleteWindowOccurrence": "Удалить это событие",
    "deleteWindowSeries": "Удалить весь ряд",
    "deleteWindowTitle": "Удалить повторяющееся событие",
    "editRecurring": "Вы хотите внести изменение только в это событие или изменить весь ряд?",
    "editWindowOccurrence": "Изменить текущее событие",
    "editWindowSeries": "Изменить весь ряд",
    "editWindowTitle": "Изменить одно событие"
  },
  "save": "Сохранить",
  "time": "время",
  "today": "Сегодня",
  "views": {
    "agenda": "Повестка",
    "day": "День",
    "month": "Месяц",
    "week": "Неделя",
    "workWeek": "Рабочая неделя"
  },
  "deleteWindowTitle": "Удалить событие",
  "showFullDay": "Показывать весь день",
  "showWorkDay": "Показывать только рабочие часы"
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

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Закрыть"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "ОК"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "ОК",
  "cancel": "Отмена"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "ОК",
  "cancel": "Отмена"
});
}

})(window.kendo.jQuery);

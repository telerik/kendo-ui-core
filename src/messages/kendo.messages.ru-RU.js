(function($, undefined) {

/* Filter menu operator messages  */

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

/* FilterMenu operator messages */

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

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {
kendo.ui.DateRangePicker.prototype.options.messages =
$.extend(true, kendo.ui.DateRangePicker.prototype.options.messages,{
  "startLabel": "Начало",
  "endLabel": "Конец"
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
    "add": "Добавить",
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
  "noRecords": "Нет доступных записей."
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

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Нет записей доступны.",
    "loading": "Loading...",
    "requestFailed": "Request failed.",
    "retry": "Retry",
    "commands": {
        "edit": "Изменить",
        "update": "Обновить",
        "canceledit": "Отмена",
        "create": "Добавить",
        "createchild": "Добавить ребенка",
        "destroy": "Удалить",
        "excel": "Экспорт в Excel",
        "pdf": "Экспорт в PDF"
    }
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
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
  "title": "Строки со значениями",
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
  "empty": "Переместите сюда заголовок столбца, чтобы сгруппировать записи по этому столбцу"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Полужирный",
  "cleanFormatting": "Очистить формат",
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
  "insertUnorderedList": "Маркированный список",
  "italic": "Курсив",
  "justifyCenter": "По центру",
  "justifyFull": "По ширине",
  "justifyLeft": "Влево",
  "justifyRight": "Вправо",
  "outdent": "Уменьшить отступ",
  "strikethrough": "Зачеркнутый",
  "style": "Стиль",
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
  "addRowAbove": "Добавить строку выше",
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
    "endTimezone": "Часовой пояс окончания",
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

/* DateInput */
if (kendo.ui.DateInput) {
kendo.ui.DateInput.prototype.options.messages =
$.extend(true, kendo.ui.DateInput.prototype.options.messages, {
  "year": "год",
  "month": "месяц",
  "day": "день",
  "weekday": "день недели",
  "hour": "час",
  "minute": "минута",
  "second": "секунда",
  "dayperiod": "AM/PM"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
  "measureFields": "Перетащите поля с данными сюда",
  "columnFields": "Перетащите колонки сюда",
  "rowFields": "Перетащите строки сюда"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
  "info": "Показать поля такие, что:",
  "filterFields": "Фильтр по полям",
  "filter": "Фильтровать",
  "include": "Включить поля...",
  "title": "Включить поля",
  "clear": "Очистить",
  "ok": "Ok",
  "cancel": "Отмена",
  "operators": {
    "contains": "Содержит",
    "doesnotcontain": "Не содержит",
    "startswith": "Начинается с",
    "endswith": "Заканчивается на",
    "eq": "Равно",
    "neq": "Не равно"
  }
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages, {
  "actions": {
    "addChild": "Добавить подзадачу",
    "append": "Добавить задачу",
    "insertAfter": "Добавить после",
    "insertBefore": "Добавить до",
    "pdf": "Экспорт в PDF"
  },
  "cancel": "Отмена",
  "deleteDependencyWindowTitle": "Удалить зависимость",
  "deleteTaskWindowTitle": "Удалить задачу",
  "destroy": "Удалить",
  "editor": {
    "assingButton": "Задать",
    "editorTitle": "Задача",
    "end": "Окончание",
    "percentComplete": "Завершено",
    "resources": "Ресурсы",
    "resourcesEditorTitle": "Ресурсы",
    "resourcesHeader": "Ресурсы",
    "start": "Начало",
    "title": "Название",
    "unitsHeader": "Единицы"
  },
  "save": "Сохранить",
  "views": {
    "day": "День",
    "end": "Окончание",
    "month": "Месяц",
    "start": "Начало",
    "week": "Неделя",
    "year": "Год"
  }
});
}

/* Filter messages */

if (kendo.ui.Filter) {
  kendo.ui.Filter.prototype.options.messages = $.extend(
  true,
    kendo.ui.Filter.prototype.options.messages,
      {
        and: "И",
        or: "Или",
        apply: "Применить"
      }
  );
}

if (kendo.ui.Filter) {
kendo.ui.Filter.prototype.options.operators = $.extend(
true,
kendo.ui.Filter.prototype.options.operators,
{
  date: {
    eq: "равна",
    gte: "после или равна",
    gt: "после",
    lte: "до или равна",
    lt: "до",
    neq: "не равна"
  },
  number: {
    eq: "равно",
    gte: "больше или равно",
    gt: "больше",
    lte: "меньше или равно",
    lt: "меньше",
    neq: "не равно"
  },
  string: {
    endswith: "оканчивается на",
    eq: "равно",
    neq: "не равно",
    startswith: "начинающимися на",
    contains: "содержащими",
    doesnotcontain: "не содержит"
  },
  enums: {
    eq: "равно",
    neq: "не равно"
  }
}
);
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Все границы",
  "insideBorders": "Внутри границ",
  "insideHorizontalBorders": "Внутри горизонтальных границ",
  "insideVerticalBorders": "Внутри вертикальных границ",
  "outsideBorders": "За пределами границ",
  "leftBorder": "Левая граница",
  "topBorder": "Верхняя граница",
  "rightBorder": "Правая граница",
  "bottomBorder": "Нижняя граница",
  "noBorders": "Без границ",
  "reset": "Сбросить цвет",
  "customColor": "Пользовательский цвет ...",
  "apply": "Применять",
  "cancel": "Отмена"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Применять",
  "save": "Сохранять",
  "cancel": "Отмена",
  "remove": "Удалять",
  "retry": "Повторить",
  "revert": "Возвращаться",
  "okText": "В ПОРЯДКЕ",
  "formatCellsDialog": {
    "title": "Формат",
    "categories": {
      "number": "Число",
      "currency": "Валюта",
      "date": "Дата"
    }
  },
  "fontFamilyDialog": {
    "title": "Шрифт"
  },
  "fontSizeDialog": {
    "title": "Размер шрифта"
  },
  "bordersDialog": {
    "title": "Границы"
  },
  "alignmentDialog": {
    "title": "Выравнивание",
    "buttons": {
      "justifyLeft": "Выровнять по левому краю",
      "justifyCenter": "Центр",
      "justifyRight": "Выровнять по правому краю",
      "justifyFull": "Оправдывать",
      "alignTop": "Выровнять по верху",
      "alignMiddle": "Выровнять по центру",
      "alignBottom": "Выровнять по низу"
    }
  },
  "mergeDialog": {
    "title": "Объединить ячейки",
    "buttons": {
      "mergeCells": "Слить все",
      "mergeHorizontally": "Слить по горизонтали",
      "mergeVertically": "Слить по вертикали",
      "unmerge": "Разъединить"
    }
  },
  "freezeDialog": {
    "title": "Замерзшие оконные стекла",
    "buttons": {
      "freezePanes": "Замерзшие оконные стекла",
      "freezeRows": "Закрепить строки",
      "freezeColumns": "Закрепить столбцы",
      "unfreeze": "Разморозить стекла"
    }
  },
  "confirmationDialog": {
    "text": "Вы уверены, что хотите удалить этот лист?",
    "title": "Удаление листа"
  },
  "validationDialog": {
    "title": "Проверка достоверности данных",
    "hintMessage": "Введите допустимое {0} значение {1}.",
    "hintTitle": "Проверка {0}",
    "criteria": {
      "any": "Любое значение",
      "number": "Число",
      "text": "Текст",
      "date": "Дата",
      "custom": "Пользовательская формула",
      "list": "Список"
    },
    "comparers": {
      "greaterThan": "лучше чем",
      "lessThan": "меньше, чем",
      "between": "между",
      "notBetween": "не между",
      "equalTo": "равно",
      "notEqualTo": "не равно",
      "greaterThanOrEqualTo": "больше или равно",
      "lessThanOrEqualTo": "меньше или равно"
    },
    "comparerMessages": {
      "greaterThan": "больше чем {0}",
      "lessThan": "меньше чем {0}",
      "between": "между {0} и {1}",
      "notBetween": "не между {0} и {1}",
      "equalTo": "равно {0}",
      "notEqualTo": "не равно {0}",
      "greaterThanOrEqualTo": "больше или равно {0}",
      "lessThanOrEqualTo": "меньше или равно {0}",
      "custom": "удовлетворяющий формуле: {0}"
    },
    "labels": {
      "criteria": "Критерии",
      "comparer": "Сравнить",
      "min": "Мин.",
      "max": "Максимум",
      "value": "Ценность",
      "start": "Начинать",
      "end": "Конец",
      "onInvalidData": "О неверных данных",
      "rejectInput": "Отклонить ввод",
      "showWarning": "Показать предупреждение",
      "showHint": "Показать подсказку",
      "hintTitle": "Подсказка заголовка",
      "hintMessage": "Подсказка",
      "ignoreBlank": "Игнорировать пустое поле"
    },
    "placeholders": {
      "typeTitle": "Тип заголовка",
      "typeMessage": "Введите сообщение"
    }
  },
  "exportAsDialog": {
    "title": "Экспорт ...",
    "labels": {
      "fileName": "Имя файла",
      "saveAsType": "Сохранить как тип",
      "exportArea": "Экспорт",
      "paperSize": "Размер бумаги",
      "margins": "Маржа",
      "orientation": "Ориентация",
      "print": "Распечатать",
      "guidelines": "Методические рекомендации",
      "center": "Центр",
      "horizontally": "По горизонтали",
      "vertically": "Вертикально"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Невозможно изменить часть объединенной ячейки."
  },
  "useKeyboardDialog": {
    "title": "Копирование и вставка",
    "errorMessage": "Эти действия нельзя вызвать через меню. Вместо этого используйте сочетания клавиш:",
    "labels": {
      "forCopy": "для копирования",
      "forCut": "для резки",
      "forPaste": "для пасты"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Это действие нельзя выполнить при множественном выборе."
  },
  "insertCommentDialog": {
    "title": "Вставить комментарий",
    "labels": {
      "comment": "Комментарий",
      "removeComment": "Удалить комментарий"
    }
  },
  "insertImageDialog": {
    "title": "Вставить изображение",
    "info": "Перетащите изображение сюда или щелкните, чтобы выбрать",
    "typeError": "Выберите изображение в формате JPEG, PNG или GIF."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Сортировать по диапазону от А до Я",
  "sortDescending": "Диапазон сортировки от Я до А",
  "filterByValue": "Фильтр по значению",
  "filterByCondition": "Фильтр по условию",
  "apply": "Применять",
  "search": "Поиск",
  "addToCurrent": "Добавить к текущему выбору",
  "clear": "Прозрачный",
  "blanks": "(Пробелы)",
  "operatorNone": "Никто",
  "and": "И",
  "or": "ИЛИ",
  "operators": {
    "string": {
      "contains": "Текст содержит",
      "doesnotcontain": "Текст не содержит",
      "startswith": "Текст начинается с",
      "endswith": "Текст заканчивается на"
    },
    "date": {
      "eq": "Дата",
      "neq": "Дата не",
      "lt": "Дата раньше",
      "gt": "Дата после"
    },
    "number": {
      "eq": "Равно",
      "neq": "Не равно",
      "gte": "Больше или равно",
      "gt": "Больше, чем",
      "lte": "Меньше или равно",
      "lt": "Меньше чем"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Сбросить цвет",
  "customColor": "Пользовательский цвет ...",
  "apply": "Применять",
  "cancel": "Отмена"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Добавить столбец слева",
  "addColumnRight": "Добавить столбец справа",
  "addRowAbove": "Добавить строку выше",
  "addRowBelow": "Добавить строку ниже",
  "alignment": "Выравнивание",
  "alignmentButtons": {
    "justifyLeft": "Выровнять по левому краю",
    "justifyCenter": "Центр",
    "justifyRight": "Выровнять по правому краю",
    "justifyFull": "Оправдывать",
    "alignTop": "Выровнять по верху",
    "alignMiddle": "Выровнять по центру",
    "alignBottom": "Выровнять по низу"
  },
  "backgroundColor": "Задний план",
  "bold": "Смелый",
  "borders": "Границы",
  "colorPicker": {
    "reset": "Сбросить цвет",
    "customColor": "Пользовательский цвет ..."
  },
  "copy": "Копировать",
  "cut": "Резать",
  "deleteColumn": "Удалить столбец",
  "deleteRow": "Удалить строку",
  "excelImport": "Импорт из Excel ...",
  "filter": "Фильтр",
  "fontFamily": "Шрифт",
  "fontSize": "Размер шрифта",
  "format": "Пользовательский формат ...",
  "formatTypes": {
    "automatic": "Автоматическая",
    "number": "Число",
    "percent": "Процентов",
    "financial": "Финансовый",
    "currency": "Валюта",
    "date": "Дата",
    "time": "Время",
    "dateTime": "Дата время",
    "duration": "Продолжительность",
    "moreFormats": "Еще форматы ..."
  },
  "formatDecreaseDecimal": "Уменьшить десятичный",
  "formatIncreaseDecimal": "Увеличить десятичную дробь",
  "freeze": "Замерзшие оконные стекла",
  "freezeButtons": {
    "freezePanes": "Замерзшие оконные стекла",
    "freezeRows": "Закрепить строки",
    "freezeColumns": "Закрепить столбцы",
    "unfreeze": "Разморозить стекла"
  },
  "insertComment": "Вставить комментарий",
  "insertImage": "Вставить изображение",
  "italic": "Курсив",
  "merge": "Объединить ячейки",
  "mergeButtons": {
    "mergeCells": "Слить все",
    "mergeHorizontally": "Слить по горизонтали",
    "mergeVertically": "Слить по вертикали",
    "unmerge": "Разъединить"
  },
  "open": "Открытым...",
  "paste": "Вставить",
  "quickAccess": {
    "redo": "Повторить",
    "undo": "Отменить"
  },
  "saveAs": "Сохранить как...",
  "sortAsc": "Сортировать по возрастанию",
  "sortDesc": "Сортировать по убыванию",
  "sortButtons": {
    "sortSheetAsc": "Сортировать лист от А до Я",
    "sortSheetDesc": "Сортировать лист от Я до А",
    "sortRangeAsc": "Сортировать по диапазону от А до Я",
    "sortRangeDesc": "Диапазон сортировки от Я до А"
  },
  "textColor": "Цвет текста",
  "textWrap": "Перенести текст",
  "underline": "Подчеркивание",
  "validation": "Проверка достоверности данных..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Не удается вставить ячейки из-за возможности потери данных. Выберите другое место для вставки или удалите данные с конца рабочего листа.",
    "filterRangeContainingMerges": "Невозможно создать фильтр в диапазоне, содержащем слияния",
    "validationError": "Введенное вами значение нарушает правила проверки, установленные для ячейки."
  },
  "tabs": {
    "home": "Домой",
    "insert": "Вставлять",
    "data": "Данные"
  }
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
            "contrastRatio": "Коэффициент контрастности:",
            "fail": "Не пройдено",
            "pass": "Пройдено",
            "hex": "HEX",
            "toggleFormat": "Переключить формат",
            "red": "Красный",
            "green": "Зелёный",
            "blue": "Синий",
            "alpha": "Альфа"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Применить",
            "cancel": "Отмена",
            "noColor": "без цвета",
            "clearColor": "Очистить цвет"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Применить",
            "cancel": "Отмена",
            "noColor": "без цвета",
            "clearColor": "Очистить цвет"
        });

}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {

    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "Загрузить",
            "orderBy": "Сортировать по",
            "orderByName": "Имя",
            "orderBySize": "Размер",
            "directoryNotFound": "Каталог с таким именем не найден.",
            "emptyFolder": "Пустая папка",
            "deleteFile": "Вы уверены, что хотите удалить \"{0}\"?",
            "invalidFileType": "Выбранный файл \"{0}\" недопустим. Поддерживаемые типы файлов: {1}.",
            "overwriteFile": "Файл с именем \"{0}\" уже существует в текущем каталоге. Хотите перезаписать его?",
            "dropFilesHere": "перетащите файл сюда для загрузки",
            "search": "Поиск"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Новая папка",
                "upload": "Загрузить",
                "sortDirection": "Направление сортировки",
                "sortDirectionAsc": "По возрастанию",
                "sortDirectionDesc": "По убыванию",
                "sortField": "Сортировать по",
                "nameField": "Имя",
                "sizeField": "Размер",
                "typeField": "Тип",
                "dateModifiedField": "Дата изменения",
                "dateCreatedField": "Дата создания",
                "listView": "Список",
                "gridView": "Таблица",
                "search": "Поиск",
                "details": "Подробности",
                "detailsChecked": "Да",
                "detailsUnchecked": "Нет",
                "Delete": "Удалить",
                "Rename": "Переименовать"
            },
            "views": {
                "nameField": "Имя",
                "sizeField": "Размер",
                "typeField": "Тип",
                "dateModifiedField": "Дата изменения",
                "dateCreatedField": "Дата создания",
                "items": "элементов"
            },
            "dialogs": {
                "upload": {
                    "title": "Загрузить файлы",
                    "clear": "Очистить",
                    "done": "Готово"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Переместить или скопировать выбранные файлы?</p>",
                    "okText": "Копировать",
                    "cancel": "Переместить",
                    "close": "Закрыть"
                },
                "deleteConfirm": {
                    "title": "Подтвердить удаление",
                    "content": "<p class='k-text-center'>Вы уверены, что хотите удалить выбранные файлы?<br/>Это действие нельзя отменить.</p>",
                    "okText": "Удалить",
                    "cancel": "Отмена",
                    "close": "Закрыть"
                },
                "renamePrompt": {
                    "title": "Переименовать",
                    "content": "<p class='k-text-center'>Введите новое имя файла</p>",
                    "okText": "Переименовать",
                    "cancel": "Отмена",
                    "close": "Закрыть"
                }
            },
            "previewPane": {
                "noFileSelected": "Файл не выбран",
                "extension": "Тип",
                "size": "Размер",
                "created": "Дата создания",
                "createdUtc": "Дата создания (UTC)",
                "modified": "Дата изменения",
                "modifiedUtc": "Дата изменения (UTC)",
                "items": "элементов"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Редактировать",
            "createNewCard": "Новая карточка",
            "create": "Создать",
            "search": "Поиск",
            "previewCard": "Предпросмотр карточки",
            "addCard": "Добавить карточку",
            "editCard": "Редактировать карточку",
            "deleteCard": "Удалить карточку",
            "addColumn": "Добавить столбец",
            "editColumn": "Редактировать столбец",
            "deleteColumn": "Удалить столбец",
            "close": "Закрыть",
            "cancel": "Отмена",
            "delete": "Удалить",
            "saveChanges": "Сохранить изменения",
            "title": "Название:",
            "description": "Описание:",
            "newColumn": "Новый столбец",
            "deleteColumnConfirm": "Вы уверены, что хотите удалить этот столбец?",
            "deleteCardConfirm": "Вы уверены, что хотите удалить эту карточку?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Увеличить значение",
            "downArrowText": "Уменьшить значение"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Пауза",
            "play": "Воспроизведение",
            "mute": "Отключить звук",
            "unmute": "Включить звук",
            "quality": "Качество",
            "fullscreen": "Полный экран"
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Настройки",
            "cancelButtonText": "Отмена",
            "applyButtonText": "Применить",
            "measures": "Выберите поля для начала",
            "columns": "Выберите поля для начала",
            "rows": "Выберите поля для начала"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Применить",
            "sortAscending": "По возрастанию",
            "sortDescending": "По убыванию",
            "filterFields": "Фильтр полей",
            "filter": "Фильтр",
            "include": "Включить поля...",
            "clear": "Очистить",
            "reset": "Сбросить",
            "moveToColumns": "Переместить в столбцы",
            "moveToRows": "Переместить в строки",
            "movePrevious": "Назад",
            "moveNext": "Вперёд",
            "filterOperatorsDropDownLabel": "Операторы фильтра",
            "filterValueTextBoxLabel": "Значение фильтра",
            "operators": {
                "contains": "Содержит",
                "doesnotcontain": "Не содержит",
                "startswith": "Начинается с",
                "endswith": "Заканчивается на",
                "eq": "Равно",
                "neq": "Не равно"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Отмена",
            "update": "Сохранить",
            "endTitle": "Окончание повторения",
            "repeatTitle": "Шаблон повторения",
            "headerTitle": "Повторить событие",
            "end": {
                "never": "Никогда",
                "after": "После",
                "on": "В дату"
            },
            "daily": {
                "interval": "дн."
            },
            "weekly": {
                "interval": "нед."
            },
            "monthly": {
                "interval": "мес.",
                "repeatBy": "Повторять по: ",
                "dayOfMonth": "День месяца",
                "dayOfWeek": "День недели"
            },
            "yearly": {
                "interval": "г.",
                "repeatBy": "Повторять по: ",
                "dayOfMonth": "День месяца",
                "dayOfWeek": "День недели",
                "of": " из "
            },
            "endRule": {
                "after": " повтор(ов)",
                "on": "В дату "
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Увеличить",
            "decreaseButtonTitle": "Уменьшить",
            "dragHandleTitle": "Перетащить"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Удалить",
                "moveUp": "Вверх",
                "moveDown": "Вниз",
                "transferTo": "Перенести в",
                "transferFrom": "Перенести из",
                "transferAllTo": "Перенести все в",
                "transferAllFrom": "Перенести все из"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Загрузка...",
            "requestFailed": "Ошибка запроса.",
            "retry": "Повторить"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Загрузка..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Установить",
            "cancel": "Отмена",
            "hour": "час",
            "minute": "минута",
            "second": "секунда",
            "millisecond": "миллисекунда",
            "now": "Сейчас"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Установить",
            "cancel": "Отмена",
            "hour": "час",
            "minute": "минута",
            "second": "секунда",
            "millisecond": "миллисекунда",
            "now": "Сейчас",
            "date": "Дата",
            "time": "Время",
            "today": "Сегодня",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Сегодня",
            "navigateTo": "Перейти к: ",
            "parentViews": {
                "month": "Годовой вид",
                "year": "Десятилетний вид",
                "decade": "Вековой вид"
            }
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "очистить",
            "noData": "Данные не найдены."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "очистить",
            "noData": "Данные не найдены.",
            "singleTag": "элемент(ов) выбрано"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "очистить",
            "noData": "Данные не найдены.",
            "singleTag": "элемент(ов) выбрано"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Введите сообщение...",
            "toggleButton": "Панель инструментов",
            "sendButton": "Отправить"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Сбросить",
            "previous": "Назад",
            "next": "Далее",
            "done": "Готово",
            "step": "Шаг",
            "of": "из"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Документ",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Масштаб",
                    "zoomOut": "Уменьшить",
                    "zoomIn": "Увеличить",
                    "actualWidth": "Реальная ширина",
                    "autoWidth": "Авто ширина",
                    "fitToWidth": "По ширине",
                    "fitToPage": "По странице"
                },
                "open": "Открыть",
                "exportAs": "Экспорт",
                "download": "Скачать",
                "pager": {
                    "first": "К первой странице",
                    "previous": "К предыдущей странице",
                    "next": "К следующей странице",
                    "last": "К последней странице",
                    "of": "из",
                    "page": "страница",
                    "pages": "страниц"
                },
                "print": "Печать",
                "toggleSelection": "Выделение",
                "togglePan": "Прокрутка",
                "search": "Поиск"
            },
            "errorMessages": {
                "notSupported": "Поддерживаются только PDF-файлы.",
                "parseError": "Не удалось обработать PDF-файл.",
                "notFound": "Файл не найден.",
                "popupBlocked": "Всплывающее окно заблокировано браузером."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Обновить captcha",
            "audio": "Воспроизвести звук captcha",
            "imageAlt": "Введите текст с изображения captcha",
            "success": "Проверка пройдена"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Организационная диаграмма",
            "edit": "Редактировать",
            "create": "Создать",
            "destroy": "Удалить",
            "destroyContent": "Вы уверены, что хотите удалить этот элемент и его подчинённые?",
            "destroyTitle": "Удалить элемент",
            "cancel": "Отмена",
            "save": "Сохранить",
            "menuLabel": "Меню редактирования",
            "uploadAvatar": "Загрузить изображение",
            "parent": "Родитель",
            "name": "Имя",
            "title": "Должность",
            "none": "--Нет--",
            "expand": "Развернуть",
            "collapse": "Свернуть"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Заголовок карты"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Единиц"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Нет доступных данных"
        });

}

  /* FilterCell operators */
  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "string": {
          "eq": "равно",
          "neq": "не равно",
          "startswith": "начинается с",
          "contains": "содержит",
          "doesnotcontain": "не содержит",
          "endswith": "оканчивается на",
          "isnull": "равно null",
          "isnotnull": "не равно null",
          "isempty": "пусто",
          "isnotempty": "не пусто",
          "isnullorempty": "не имеет значения",
          "isnotnullorempty": "имеет значение"
        },
        "number": {
          "eq": "равно",
          "neq": "не равно",
          "gte": "больше или равно",
          "gt": "больше",
          "lte": "меньше или равно",
          "lt": "меньше",
          "isnull": "равно null",
          "isnotnull": "не равно null"
        },
        "date": {
          "eq": "равно",
          "neq": "не равно",
          "gte": "после или равно",
          "gt": "после",
          "lte": "до или равно",
          "lt": "до",
          "isnull": "равно null",
          "isnotnull": "не равно null"
        },
        "enums": {
          "eq": "равно",
          "neq": "не равно",
          "isnull": "равно null",
          "isnotnull": "не равно null"
        }
      });
  }

})(window.kendo.jQuery);
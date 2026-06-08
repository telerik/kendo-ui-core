(function($, undefined) {

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "рівними",
    "gte": "після або рівна",
    "gt": "після",
    "lte": "до або рівними",
    "lt": "до",
    "neq": "не рівна"
  },
  "number": {
    "eq": "рівне",
    "gte": "більше або рівними",
    "gt": "більше",
    "lte": "менше або рівними",
    "lt": "менше",
    "neq": "не рівними"
  },
  "string": {
    "endswith": "закінчуються на",
    "eq": "рівні",
    "neq": "не рівні",
    "startswith": "починаються на",
    "contains": "містять",
    "doesnotcontain": "Does not contain"
  },
  "enums": {
    "eq": "рівними",
    "neq": "не рівними"
  }
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "рівними",
    "gte": "після або рівна",
    "gt": "після",
    "lte": "до або рівними",
    "lt": "до",
    "neq": "не рівна"
  },
  "number": {
    "eq": "рівне",
    "gte": "більше або рівними",
    "gt": "більше",
    "lte": "менше або рівними",
    "lt": "менше",
    "neq": "не рівними"
  },
  "string": {
    "endswith": "закінчуються на",
    "eq": "рівні",
    "neq": "не рівні",
    "startswith": "починаються на",
    "contains": "містять",
    "doesnotcontain": "Does not contain"
  },
  "enums": {
    "eq": "рівними",
    "neq": "не рівними"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Kолони",
  "sortAscending": "Сортування за зростанням",
  "sortDescending": "Сортування за спаданням",
  "settings": "Параметри стовпців",
  "done": "Зроблений",
  "lock": "Замикати",
  "unlock": "Відімкнути"
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
    "create": "Додати",
    "add": "Додати",
    "destroy": "Видалити",
    "canceledit": "Скасувати",
    "update": "Оновити",
    "edit": "Редагувати",
    "excel": "Export to Excel",
    "pdf": "Export to PDF",
    "select": "Вибрати",
    "cancel": "Cancel Changes",
    "save": "Save Changes"
  },
  "editable": {
    "confirmation": "Ви впевнені, що бажаєте видалити даний запис?",
    "cancelDelete": "Скасувати",
    "confirmDelete": "Видалити"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "All",
  "page": "Сторінка",
  "display": "Зображено записи {0} - {1} з {2}",
  "of": "з {0}",
  "empty": "немає записів",
  "refresh": "Оновити",
  "first": "Повернутися на першу сторінку",
  "itemsPerPage": "елементів на сторінці",
  "last": "До останньої сторінки",
  "next": "Перейдіть на наступну сторінку",
  "previous": "Перейти на попередню сторінку",
  "morePages": "Більше сторінок"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "No records to display",
  "loading": "Loading...",
  "requestFailed": "Request failed.",
  "retry": "Retry",
  "commands": {
      "edit": "Редагувати",
      "update": "Оновити",
      "canceledit": "Cancel",
      "create": "Додати",
      "createchild": "Add child record",
      "destroy": "Видалити",
      "excel": "Export to Excel",
      "pdf": "Export to PDF"
  }
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "All",
  "page": "Сторінка",
  "display": "Зображено записи {0} - {1} з {2}",
  "of": "з {0}",
  "empty": "немає записів",
  "refresh": "Оновити",
  "first": "Повернутися на першу сторінку",
  "itemsPerPage": "елементів на сторінці",
  "last": "До останньої сторінки",
  "next": "Перейдіть на наступну сторінку",
  "previous": "Перейти на попередню сторінку",
  "morePages": "Більше сторінок"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "filter": "фільтрувати",
  "clear": "очистити",
  "isFalse": "хиба",
  "isTrue": "істина",
  "operator": "Oператор"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "фільтрувати",
  "and": "І",
  "clear": "очистити",
  "info": "Рядки із записами",
  "title": "Рядки із записами",
  "selectValue": "-виберіть-",
  "isFalse": "хиба",
  "isTrue": "істина",
  "or": "Or",
  "cancel": "Скасувати",
  "operator": "Oператор",
  "value": "Значення"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Перетягніть сюди заголовок стовпця, щоб згрупувати записи з цього стовпця"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Жирний",
  "createLink": "Додати посилання",
  "fontName": "Шрифт",
  "fontNameInherit": "(inherited font)",
  "fontSize": "Розмір шрифта",
  "fontSizeInherit": "(inherited size)",
  "formatBlock": "Форматування",
  "indent": "Збільшити відступ",
  "insertHtml": "Додати HTML",
  "insertImage": "Додати зображення",
  "insertOrderedList": "Нумерований список",
  "insertUnorderedList": "Маркований список",
  "italic": "Курсив",
  "justifyCenter": "По центру",
  "justifyFull": "По ширині",
  "justifyLeft": "По лівому краю",
  "justifyRight": "По правому краю",
  "outdent": "Зменшити відступ",
  "strikethrough": "Закреслений",
  "style": "Стиль",
  "subscript": "Subscript",
  "superscript": "Superscript",
  "underline": "Підкреслений",
  "unlink": "Видалити посилання",
  "dialogButtonSeparator": "or",
  "dialogCancel": "Cancel",
  "dialogInsert": "Insert",
  "imageAltText": "Alternate text",
  "imageWebAddress": "Web address",
  "linkOpenInNewWindow": "Open link in new window",
  "linkText": "Text",
  "linkToolTip": "ToolTip",
  "linkWebAddress": "Web address",
  "search": "Search",
  "createTable": "Створити таблицю",
  "addColumnLeft": "Add column on the left",
  "addColumnRight": "Add column on the right",
  "addRowAbove": "Add row above",
  "addRowBelow": "Add row below",
  "deleteColumn": "Delete column",
  "deleteRow": "Delete row",
  "backColor": "Background color",
  "deleteFile": "Are you sure you want to delete \"{0}\"?",
  "deleteRow1": "Delete row",
  "dialogButtonSeparator1": "or",
  "dialogCancel1": "Cancel",
  "dialogInsert1": "Insert",
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

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "all day",
  "cancel": "Скасувати",
  "editable": {
    "confirmation": "Are you sure you want to delete this event?"
  },
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

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Вибрати файли...",
  "cancel": "Скасувати",
  "retry": "Повторити",
  "remove": "Видалити",
  "clearSelectedFiles": "Очистити",
  "uploadSelectedFiles": "Завантажити файли",
  "dropFilesHere": "Перегніть сюди файли для завантаження",
  "headerStatusPaused": "Призупинено",
  "headerStatusUploading": "Завантаження...",
  "headerStatusUploaded": "Завантажено",
  "uploadSuccess": "Файл(и) успішно завантажено.",
  "uploadFail": "Помилка при завантаженні.",
  "invalidMaxFileSize": "Розмір файлу занадто великий.",
  "invalidMinFileSize": "Розмір файлу занадто малий.",
  "invalidFileExtension": "Недозволений тип файлу."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "закінчати"
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
  "cancel": "Скасувати"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Скасувати"
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
            "contrastRatio": "Коефіцієнт контрастності:",
            "fail": "Не пройдено",
            "pass": "Пройдено",
            "hex": "HEX",
            "toggleFormat": "Змінити формат",
            "red": "Червоний",
            "green": "Зелений",
            "blue": "Синій",
            "alpha": "Альфа"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Застосувати",
            "cancel": "Скасувати",
            "noColor": "без кольору",
            "clearColor": "Очистити колір"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Застосувати",
            "cancel": "Скасувати",
            "noColor": "без кольору",
            "clearColor": "Очистити колір"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Початок",
            "endLabel": "Кінець"
        });

}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {

    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "Завантажити",
            "orderBy": "Сортувати за",
            "orderByName": "Ім'я",
            "orderBySize": "Розмір",
            "directoryNotFound": "Каталог з такою назвою не знайдено.",
            "emptyFolder": "Порожня папка",
            "deleteFile": "Ви впевнені, що хочете видалити \"{0}\"?",
            "invalidFileType": "Вибраний файл \"{0}\" недійсний. Підтримувані типи файлів: {1}.",
            "overwriteFile": "Файл з ім'ям \"{0}\" вже існує в поточному каталозі. Перезаписати?",
            "dropFilesHere": "перетягніть файл для завантаження",
            "search": "Пошук"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Нова папка",
                "upload": "Завантажити",
                "sortDirection": "Напрямок сортування",
                "sortDirectionAsc": "За зростанням",
                "sortDirectionDesc": "За спаданням",
                "sortField": "Сортувати за",
                "nameField": "Ім'я",
                "sizeField": "Розмір",
                "typeField": "Тип",
                "dateModifiedField": "Дата зміни",
                "dateCreatedField": "Дата створення",
                "listView": "Список",
                "gridView": "Таблиця",
                "search": "Пошук",
                "details": "Деталі",
                "detailsChecked": "Так",
                "detailsUnchecked": "Ні",
                "Delete": "Видалити",
                "Rename": "Перейменувати"
            },
            "views": {
                "nameField": "Ім'я",
                "sizeField": "Розмір",
                "typeField": "Тип",
                "dateModifiedField": "Дата зміни",
                "dateCreatedField": "Дата створення",
                "items": "елементів"
            },
            "dialogs": {
                "upload": {
                    "title": "Завантажити файли",
                    "clear": "Очистити",
                    "done": "Готово"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Перемістити чи скопіювати вибрані файли?</p>",
                    "okText": "Копіювати",
                    "cancel": "Перемістити",
                    "close": "Закрити"
                },
                "deleteConfirm": {
                    "title": "Підтвердити видалення",
                    "content": "<p class='k-text-center'>Ви впевнені, що хочете видалити вибрані файли?<br/>Цю дію не можна скасувати.</p>",
                    "okText": "Видалити",
                    "cancel": "Скасувати",
                    "close": "Закрити"
                },
                "renamePrompt": {
                    "title": "Перейменувати",
                    "content": "<p class='k-text-center'>Введіть нове ім'я файлу</p>",
                    "okText": "Перейменувати",
                    "cancel": "Скасувати",
                    "close": "Закрити"
                }
            },
            "previewPane": {
                "noFileSelected": "Файл не вибрано",
                "extension": "Тип",
                "size": "Розмір",
                "created": "Дата створення",
                "createdUtc": "Дата створення (UTC)",
                "modified": "Дата зміни",
                "modifiedUtc": "Дата зміни (UTC)",
                "items": "елементів"
            }
        });

}

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Додати підзавдання",
                "append": "Додати завдання",
                "insertAfter": "Вставити після",
                "insertBefore": "Вставити перед",
                "pdf": "Експорт у PDF"
            },
            "cancel": "Скасувати",
            "deleteDependencyWindowTitle": "Видалити залежність",
            "deleteTaskWindowTitle": "Видалити завдання",
            "destroy": "Видалити",
            "editor": {
                "assignButton": "Призначити",
                "editorTitle": "Завдання",
                "end": "Кінець",
                "percentComplete": "Завершення",
                "resources": "Ресурси",
                "resourcesEditorTitle": "Ресурси",
                "resourcesHeader": "Ресурси",
                "start": "Початок",
                "title": "Назва",
                "unitsHeader": "Одиниці",
                "parent": "Батьківський",
                "addNew": "Додати",
                "name": "Ім'я"
            },
            "save": "Зберегти",
            "selectView": "Обрати подання",
            "views": {
                "day": "День",
                "end": "Кінець",
                "month": "Місяць",
                "start": "Початок",
                "week": "Тиждень",
                "year": "Рік"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Редагувати",
            "createNewCard": "Нова картка",
            "create": "Створити",
            "search": "Пошук",
            "previewCard": "Попередній перегляд картки",
            "addCard": "Додати картку",
            "editCard": "Редагувати картку",
            "deleteCard": "Видалити картку",
            "addColumn": "Додати стовпець",
            "editColumn": "Редагувати стовпець",
            "deleteColumn": "Видалити стовпець",
            "close": "Закрити",
            "cancel": "Скасувати",
            "delete": "Видалити",
            "saveChanges": "Зберегти зміни",
            "title": "Назва:",
            "description": "Опис:",
            "newColumn": "Новий стовпець",
            "deleteColumnConfirm": "Ви впевнені, що хочете видалити цей стовпець?",
            "deleteCardConfirm": "Ви впевнені, що хочете видалити цю картку?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Збільшити значення",
            "downArrowText": "Зменшити значення"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Пауза",
            "play": "Відтворити",
            "mute": "Вимкнути звук",
            "unmute": "Увімкнути звук",
            "quality": "Якість",
            "fullscreen": "Повний екран"
        });

}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {

    kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Перетягніть поля даних сюди",
            "columnFields": "Перетягніть стовпці сюди",
            "rowFields": "Перетягніть рядки сюди"
        });

}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {

    kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Показати елементи зі значенням:",
            "sortAscending": "За зростанням",
            "sortDescending": "За спаданням",
            "filterFields": "Фільтр полів",
            "filter": "Фільтр",
            "include": "Включити поля...",
            "title": "Поля для включення",
            "clear": "Очистити",
            "ok": "OK",
            "cancel": "Скасувати",
            "operators": {
                "contains": "Містить",
                "doesnotcontain": "Не містить",
                "startswith": "Починається з",
                "endswith": "Закінчується на",
                "eq": "Дорівнює",
                "neq": "Не дорівнює"
            }
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Налаштування",
            "cancelButtonText": "Скасувати",
            "applyButtonText": "Застосувати",
            "measures": "Виберіть поля для початку",
            "columns": "Виберіть поля для початку",
            "rows": "Виберіть поля для початку"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Застосувати",
            "sortAscending": "За зростанням",
            "sortDescending": "За спаданням",
            "filterFields": "Фільтр полів",
            "filter": "Фільтр",
            "include": "Включити поля...",
            "clear": "Очистити",
            "reset": "Скинути",
            "moveToColumns": "Перемістити до стовпців",
            "moveToRows": "Перемістити до рядків",
            "movePrevious": "Назад",
            "moveNext": "Вперед",
            "filterOperatorsDropDownLabel": "Оператори фільтру",
            "filterValueTextBoxLabel": "Значення фільтру",
            "operators": {
                "contains": "Містить",
                "doesnotcontain": "Не містить",
                "startswith": "Починається з",
                "endswith": "Закінчується на",
                "eq": "Дорівнює",
                "neq": "Не дорівнює"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Скасувати",
            "update": "Зберегти",
            "endTitle": "Завершення повторення",
            "repeatTitle": "Шаблон повторення",
            "headerTitle": "Повторити подію",
            "end": {
                "never": "Ніколи",
                "after": "Після",
                "on": "У дату"
            },
            "daily": {
                "interval": "дн."
            },
            "weekly": {
                "interval": "тижн."
            },
            "monthly": {
                "interval": "міс.",
                "repeatBy": "Повторювати за: ",
                "dayOfMonth": "День місяця",
                "dayOfWeek": "День тижня"
            },
            "yearly": {
                "interval": "рік/роки",
                "repeatBy": "Повторювати за: ",
                "dayOfMonth": "День місяця",
                "dayOfWeek": "День тижня",
                "of": " з "
            },
            "endRule": {
                "after": " повторень",
                "on": "У дату "
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Збільшити",
            "decreaseButtonTitle": "Зменшити",
            "dragHandleTitle": "Перетягнути"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Видалити",
                "moveUp": "Вгору",
                "moveDown": "Вниз",
                "transferTo": "Перенести до",
                "transferFrom": "Перенести з",
                "transferAllTo": "Перенести все до",
                "transferAllFrom": "Перенести все з"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Завантаження...",
            "requestFailed": "Помилка запиту.",
            "retry": "Повторити"
        });

}

/* Validator messages */

if (kendo.ui.Validator) {

    kendo.ui.Validator.prototype.options.messages =
        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
            "required": "{0} обов'язкове",
            "pattern": "{0} недійсне",
            "min": "{0} повинно бути більше або дорівнювати {1}",
            "max": "{0} повинно бути менше або дорівнювати {1}",
            "step": "{0} недійсне",
            "email": "{0} не є дійсною електронною адресою",
            "url": "{0} не є дійсною URL-адресою",
            "date": "{0} не є дійсною датою",
            "dateCompare": "Кінцева дата повинна бути після початкової"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Завантаження..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Встановити",
            "cancel": "Скасувати",
            "hour": "година",
            "minute": "хвилина",
            "second": "секунда",
            "millisecond": "мілісекунда",
            "now": "Зараз"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Встановити",
            "cancel": "Скасувати",
            "hour": "година",
            "minute": "хвилина",
            "second": "секунда",
            "millisecond": "мілісекунда",
            "now": "Зараз",
            "date": "Дата",
            "time": "Час",
            "today": "Сьогодні",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Сьогодні",
            "navigateTo": "Перейти до: ",
            "parentViews": {
                "month": "Річний вигляд",
                "year": "Десятирічний вигляд",
                "decade": "Віковий вигляд"
            }
        });

}

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "рік",
            "month": "місяць",
            "day": "день",
            "weekday": "день тижня",
            "hour": "години",
            "minute": "хвилини",
            "second": "секунди",
            "dayperiod": "дп/пп"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "очистити",
            "noData": "Даних не знайдено."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "очистити",
            "noData": "Даних не знайдено.",
            "singleTag": "елемент(ів) вибрано"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "очистити",
            "noData": "Даних не знайдено.",
            "singleTag": "елемент(ів) вибрано"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Введіть повідомлення...",
            "toggleButton": "Панель інструментів",
            "sendButton": "Надіслати"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Скинути",
            "previous": "Назад",
            "next": "Далі",
            "done": "Готово",
            "step": "Крок",
            "of": "з"
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
                    "zoomOut": "Зменшити",
                    "zoomIn": "Збільшити",
                    "actualWidth": "Реальна ширина",
                    "autoWidth": "Авто ширина",
                    "fitToWidth": "По ширині",
                    "fitToPage": "По сторінці"
                },
                "open": "Відкрити",
                "exportAs": "Експорт",
                "download": "Завантажити",
                "pager": {
                    "first": "До першої сторінки",
                    "previous": "До попередньої сторінки",
                    "next": "До наступної сторінки",
                    "last": "До останньої сторінки",
                    "of": "з",
                    "page": "сторінка",
                    "pages": "сторінок"
                },
                "print": "Друк",
                "toggleSelection": "Виділення",
                "togglePan": "Прокрутка",
                "search": "Пошук"
            },
            "errorMessages": {
                "notSupported": "Підтримуються лише PDF-файли.",
                "parseError": "Не вдалося обробити PDF-файл.",
                "notFound": "Файл не знайдено.",
                "popupBlocked": "Спливаюче вікно заблоковане браузером."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Оновити captcha",
            "audio": "Відтворити звук captcha",
            "imageAlt": "Введіть текст із зображення captcha",
            "success": "Перевірку пройдено"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Організаційна діаграма",
            "edit": "Редагувати",
            "create": "Створити",
            "destroy": "Видалити",
            "destroyContent": "Ви впевнені, що хочете видалити цей елемент та його підлеглі?",
            "destroyTitle": "Видалити елемент",
            "cancel": "Скасувати",
            "save": "Зберегти",
            "menuLabel": "Меню редагування",
            "uploadAvatar": "Завантажити зображення",
            "parent": "Батьківський",
            "name": "Ім'я",
            "title": "Посада",
            "none": "--Немає--",
            "expand": "Розгорнути",
            "collapse": "Згорнути"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Заголовок карти"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Одиниць"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Немає доступних даних"
        });

}

  /* FilterMultiCheck messages */
  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Вибрати все",
        "clearAll": "Очистити все",
        "clear": "Очистити",
        "filter": "Фільтр",
        "search": "Пошук",
        "cancel": "Скасувати",
        "selectedItemsFormat": "{0} елементів вибрано",
        "done": "Готово",
        "into": "в"
      });
  }
  /* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Всі межі",
  "insideBorders": "Внутрішні межі",
  "insideHorizontalBorders": "Внутрішні горизонтальні межі",
  "insideVerticalBorders": "Внутрішні вертикальні межі",
  "outsideBorders": "Зовнішні межі",
  "leftBorder": "Ліва межа",
  "topBorder": "Верхня межа",
  "rightBorder": "Права межа",
  "bottomBorder": "Нижня межа",
  "noBorders": "Без меж",
  "reset": "Скинути колір",
  "customColor": "Інший колір...",
  "apply": "Застосувати",
  "cancel": "Скасувати"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Застосувати",
  "save": "Зберегти",
  "cancel": "Скасувати",
  "remove": "Видалити",
  "retry": "Повторити",
  "revert": "Відновити",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Формат",
    "categories": {
      "number": "Число",
      "currency": "Валюта",
      "date": "Дата"
    }
  },
  "fontFamilyDialog": { "title": "Шрифт" },
  "fontSizeDialog": { "title": "Розмір шрифту" },
  "bordersDialog": { "title": "Межі" },
  "alignmentDialog": {
    "title": "Вирівнювання",
    "buttons": {
      "justifyLeft": "За лівим краєм",
      "justifyCenter": "По центру",
      "justifyRight": "За правим краєм",
      "justifyFull": "По ширині",
      "alignTop": "Зверху",
      "alignMiddle": "Посередині",
      "alignBottom": "Знизу"
    }
  },
  "mergeDialog": {
    "title": "Об’єднання комірок",
    "buttons": {
      "mergeCells": "Об’єднати все",
      "mergeHorizontally": "Об’єднати горизонтально",
      "mergeVertically": "Об’єднати вертикально",
      "unmerge": "Роз’єднати"
    }
  },
  "freezeDialog": {
    "title": "Закріпити області",
    "buttons": {
      "freezePanes": "Закріпити області",
      "freezeRows": "Закріпити рядки",
      "freezeColumns": "Закріпити стовпці",
      "unfreeze": "Розкріпити області"
    }
  },
  "confirmationDialog": {
    "text": "Ви впевнені, що хочете видалити цей аркуш?",
    "title": "Видалення аркуша"
  },
  "validationDialog": {
    "title": "Перевірка даних",
    "hintMessage": "Будь ласка, введіть дійсне значення {0} {1}.",
    "hintTitle": "Перевірка {0}",
    "criteria": {
      "any": "Будь-яке значення",
      "number": "Число",
      "text": "Текст",
      "date": "Дата",
      "custom": "Формула",
      "list": "Список"
    },
    "comparers": {
      "greaterThan": "більше ніж",
      "lessThan": "менше ніж",
      "between": "між",
      "notBetween": "не між",
      "equalTo": "дорівнює",
      "notEqualTo": "не дорівнює",
      "greaterThanOrEqualTo": "більше або дорівнює",
      "lessThanOrEqualTo": "менше або дорівнює"
    },
    "comparerMessages": {
      "greaterThan": "більше ніж {0}",
      "lessThan": "менше ніж {0}",
      "between": "між {0} та {1}",
      "notBetween": "не між {0} та {1}",
      "equalTo": "дорівнює {0}",
      "notEqualTo": "не дорівнює {0}",
      "greaterThanOrEqualTo": "більше або дорівнює {0}",
      "lessThanOrEqualTo": "менше або дорівнює {0}",
      "custom": "що задовольняє формулу: {0}"
    },
    "labels": {
      "criteria": "Критерій",
      "comparer": "Порівняння",
      "min": "Мін",
      "max": "Макс",
      "value": "Значення",
      "start": "Початок",
      "end": "Кінець",
      "onInvalidData": "При недійсних даних",
      "rejectInput": "Відхилити введення",
      "showWarning": "Показати попередження",
      "showHint": "Показати підказку",
      "hintTitle": "Заголовок підказки",
      "hintMessage": "Повідомлення підказки",
      "ignoreBlank": "Ігнорувати порожні"
    },
    "placeholders": {
      "typeTitle": "Введіть заголовок",
      "typeMessage": "Введіть повідомлення"
    }
  },
  "exportAsDialog": {
    "title": "Експорт...",
    "labels": {
      "fileName": "Ім’я файлу",
      "saveAsType": "Тип файлу",
      "exportArea": "Експорт",
      "paperSize": "Розмір паперу",
      "margins": "Поля",
      "orientation": "Орієнтація",
      "print": "Друк",
      "guidelines": "Напрямні",
      "center": "Центр",
      "horizontally": "Горизонтально",
      "vertically": "Вертикально"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Неможливо змінити частину об’єднаної комірки."
  },
  "useKeyboardDialog": {
    "title": "Копіювання та вставлення",
    "errorMessage": "Ці дії неможливо виконати через меню. Використовуйте комбінації клавіш:",
    "labels": {
      "forCopy": "для копіювання",
      "forCut": "для вирізання",
      "forPaste": "для вставлення"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Цю дію неможливо виконати при мультивиділенні."
  },
  "insertCommentDialog": {
    "title": "Вставити коментар",
    "labels": {
      "comment": "Коментар",
      "removeComment": "Видалити коментар"
    }
  },
  "insertImageDialog": {
    "title": "Вставити зображення",
    "info": "Перетягніть зображення сюди або натисніть для вибору",
    "typeError": "Будь ласка, виберіть зображення JPEG, PNG або GIF"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Сортувати від А до Я",
  "sortDescending": "Сортувати від Я до А",
  "filterByValue": "Фільтр за значенням",
  "filterByCondition": "Фільтр за умовою",
  "apply": "Застосувати",
  "search": "Пошук",
  "addToCurrent": "Додати до поточного вибору",
  "clear": "Очистити",
  "blanks": "(Порожні)",
  "operatorNone": "Немає",
  "and": "І",
  "or": "АБО",
  "operators": {
    "string": {
      "contains": "Текст містить",
      "doesnotcontain": "Текст не містить",
      "startswith": "Текст починається з",
      "endswith": "Текст закінчується на"
    },
    "date": {
      "eq": "Дата дорівнює",
      "neq": "Дата не дорівнює",
      "lt": "Дата до",
      "gt": "Дата після"
    },
    "number": {
      "eq": "Дорівнює",
      "neq": "Не дорівнює",
      "gte": "Більше або дорівнює",
      "gt": "Більше",
      "lte": "Менше або дорівнює",
      "lt": "Менше"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Скинути колір",
  "customColor": "Інший колір...",
  "apply": "Застосувати",
  "cancel": "Скасувати"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Додати стовпець ліворуч",
  "addColumnRight": "Додати стовпець праворуч",
  "addRowAbove": "Додати рядок зверху",
  "addRowBelow": "Додати рядок знизу",
  "alignment": "Вирівнювання",
  "alignmentButtons": {
    "justifyLeft": "За лівим краєм",
    "justifyCenter": "По центру",
    "justifyRight": "За правим краєм",
    "justifyFull": "По ширині",
    "alignTop": "Зверху",
    "alignMiddle": "Посередині",
    "alignBottom": "Знизу"
  },
  "backgroundColor": "Фон",
  "bold": "Жирний",
  "borders": "Межі",
  "colorPicker": {
    "reset": "Скинути колір",
    "customColor": "Інший колір..."
  },
  "copy": "Копіювати",
  "cut": "Вирізати",
  "deleteColumn": "Видалити стовпець",
  "deleteRow": "Видалити рядок",
  "excelImport": "Імпорт з Excel...",
  "filter": "Фільтр",
  "fontFamily": "Шрифт",
  "fontSize": "Розмір шрифту",
  "format": "Формат...",
  "formatTypes": {
    "automatic": "Автоматично",
    "number": "Число",
    "percent": "Відсоток",
    "financial": "Фінансовий",
    "currency": "Валюта",
    "date": "Дата",
    "time": "Час",
    "dateTime": "Дата час",
    "duration": "Тривалість",
    "moreFormats": "Інші формати..."
  },
  "formatDecreaseDecimal": "Зменшити десяткові",
  "formatIncreaseDecimal": "Збільшити десяткові",
  "freeze": "Закріпити області",
  "freezeButtons": {
    "freezePanes": "Закріпити області",
    "freezeRows": "Закріпити рядки",
    "freezeColumns": "Закріпити стовпці",
    "unfreeze": "Розкріпити області"
  },
  "insertComment": "Вставити коментар",
  "insertImage": "Вставити зображення",
  "italic": "Курсив",
  "merge": "Об’єднати комірки",
  "mergeButtons": {
    "mergeCells": "Об’єднати все",
    "mergeHorizontally": "Об’єднати горизонтально",
    "mergeVertically": "Об’єднати вертикально",
    "unmerge": "Роз’єднати"
  },
  "open": "Відкрити...",
  "paste": "Вставити",
  "quickAccess": {
    "redo": "Повторити",
    "undo": "Скасувати"
  },
  "saveAs": "Зберегти як...",
  "sortAsc": "Сортувати за зростанням",
  "sortDesc": "Сортувати за спаданням",
  "sortButtons": {
    "sortSheetAsc": "Сортувати аркуш від А до Я",
    "sortSheetDesc": "Сортувати аркуш від Я до А",
    "sortRangeAsc": "Сортувати діапазон від А до Я",
    "sortRangeDesc": "Сортувати діапазон від Я до А"
  },
  "textColor": "Колір тексту",
  "textWrap": "Перенесення тексту",
  "underline": "Підкреслення",
  "validation": "Перевірка даних..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "nameBox": "Поле імені",
  "formulaInput": "Введення формули",
  "errors": {
    "shiftingNonblankCells": "Неможливо вставити комірки через можливу втрату даних. Виберіть інше місце вставки або видаліть дані в кінці аркуша.",
    "filterRangeContainingMerges": "Неможливо створити фільтр у діапазоні з об’єднаними комірками",
    "validationError": "Введене значення порушує правила перевірки комірки."
  },
  "tabs": {
    "home": "Головна",
    "insert": "Вставка",
    "data": "Дані"
  },
  "sheetBar": {
    "addSheet": "Додати новий аркуш",
    "deleteSheet": "Видалити",
    "duplicateSheet": "Дублювати",
    "renameSheet": "Перейменувати",
    "hideSheet": "Сховати",
    "moveRight": "Перемістити праворуч",
    "moveLeft": "Перемістити ліворуч"
  }
});
}

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "Немає попередніх пошуків",
        "noPreviousPrompts": "Немає попередніх запитів",
        "previousSearches": "Попередні пошуки",
        "previousPrompts": "Попередні запити",
        "suggestedPrompts": "Запропоновані запити",
        "searchModeLabel": "Пошук",
        "searchModeDescription": "Шукає точні збіги слів у ваших даних",
        "searchPlaceholder": "Пошук",
        "semanticSearchModeLabel": "Семантичний пошук",
        "semanticSearchModeDescription": "Розуміє контекст для відображення найбільш релевантних результатів.",
        "semanticSearchPlaceholder": "Семантичний пошук",
        "semanticSearchButtonText": "Шукати",
        "aiAssistantPlaceholder": "Сортувати, фільтрувати або групувати за допомогою ШІ",
        "speechToText": "Голос у текст",
        "speechToTextAriaLabel": "Розпочати розпізнавання мовлення",
        "cancel": "Скасувати",
        "send": "Надіслати",
        "searchButtonText": "Шукати",
        "aiAssistantButtonText": "ШІ-помічник"
      });
  }

})(window.kendo.jQuery);
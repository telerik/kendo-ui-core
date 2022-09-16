/**
 * Kendo UI v2017.3.1026 (http://www.telerik.com/kendo-ui)
 * Copyright 2017 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.


*/

(function($, undefined) {
/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Примени",
  "cancel": "Откажи",
  "noColor": "нема боја",
  "clearColor": "Исчисти боја"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Примени",
  "cancel": "Откажи",
  "noColor": "нема боја",
  "clearColor": "Исчисти боја"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Сортирање Растечки",
  "sortDescending": "Сортирање Опаѓачки",
  "filter": "Филтер",
  "columns": "Колони",
  "done": "Завршено",
  "settings": "Нагодувања на колони",
  "lock": "Заклучи",
  "unlock": "Отклучи"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Болд",
  "italic": "Италик",
  "underline": "Подвлечено",
  "strikethrough": "Прецртано",
  "superscript": "Надзнак",
  "subscript": "Подзнак",
  "justifyCenter": "Центрирај текст",
  "justifyLeft": "Порамни текст лево",
  "justifyRight": "Порамни текст десно",
  "justifyFull": "Порамни",
  "insertUnorderedList": "Вметни неподреден список",
  "insertOrderedList": "Вметни подреден список",
  "indent": "Вовлекување",
  "outdent": "Извлекување",
  "createLink": "Вметни хиперврска",
  "unlink": "Отстрани хиперврска",
  "insertImage": "Вметни слика",
  "insertFile": "Вметни датотека",
  "insertHtml": "Вметни ХТМЛ",
  "viewHtml": "Погледни ХТМЛ",
  "fontName": "Избери семејство на фонт",
  "fontNameInherit": "(наследен фонт)",
  "fontSize": "Избери големина на фонт",
  "fontSizeInherit": "(наследена големина)",
  "formatBlock": "Формат",
  "formatting": "Формат",
  "foreColor": "Боја",
  "backColor": "Боја на заднина",
  "style": "Стилови",
  "emptyFolder": "Празен директориум",
  "uploadFile": "Постави",
  "overflowAnchor": "Повеќе алатки",
  "orderBy": "Нареди од:",
  "orderBySize": "Големина",
  "orderByName": "Назив",
  "invalidFileType": "Избраната датотека \"{0}\" е невалидна. Поддржани типови на датотеки се {1}.",
  "deleteFile": 'Дали сте сигурни дека сакате да гo избришете "{0}"?',
  "overwriteFile": 'Датотека со име "{0}" веќе постои во тековниот директориум. Дали сакате да ја пребришете?',
  "directoryNotFound": "Директориум со ова име не беше пронајден.",
  "imageWebAddress": "Веб адреса",
  "imageAltText": "Алтернативен текст",
  "imageWidth": "Ширина (px)",
  "imageHeight": "Висина (px)",
  "fileWebAddress": "Веб адреса",
  "fileTitle": "Наслов",
  "linkWebAddress": "Веб адреса",
  "linkText": "Текст",
  "linkToolTip": "Ознака",
  "linkOpenInNewWindow": "Отвори врска во нов прозорец",
  "dialogUpdate": "Ажурирај",
  "dialogInsert": "Вметни",
  "dialogButtonSeparator": "или",
  "dialogCancel": "Откажи",
  "cleanFormatting": "Исчисти форматирање",
  "createTable": "Креирај табела",
  "addColumnLeft": "Додади колона лево",
  "addColumnRight": "Додади колона десно",
  "addRowAbove": "Додади ред горе",
  "addRowBelow": "Додади ред долу",
  "deleteRow": "Избриши ред",
  "deleteColumn": "Избриши колона",
  "dialogOk": "ОК",
  "tableWizard": "Волшебник за табела",
  "tableTab": "Табела",
  "cellTab": "Ќелија",
  "accessibilityTab": "Пристапност",
  "caption": "Наслов",
  "summary": "Резиме",
  "width": "Ширина",
  "height": "Висина",
  "units": "Единици",
  "cellSpacing": "Растојание на ќелии",
  "cellPadding": "Пополнување на ќелии",
  "cellMargin": "Маргина на ќелии",
  "alignment": "Порамнување",
  "background": "Заднина",
  "cssClass": "ЦСС класа",
  "id": "ИД",
  "border": "Раб",
  "borderStyle": "Стил на раб",
  "collapseBorders": "Сокриј рабови",
  "wrapText": "Прелом на текст",
  "associateCellsWithHeaders": "Асоцирај заглавија",
  "alignLeft": "Порамнување од лево",
  "alignCenter": "Централно порaмнување",
  "alignRight": "Порамнување од десно",
  "alignLeftTop": "Порамнување од лево горе",
  "alignCenterTop": "Централно порамнување горе",
  "alignRightTop": "Порамнување од лево горе",
  "alignLeftMiddle": "Порамнување од лево на средина",
  "alignCenterMiddle": "Централно порамнување на средина",
  "alignRightMiddle": "Порамнување од десно на средина",
  "alignLeftBottom": "Порамнување од лево долу ",
  "alignCenterBottom": "Централно порамнување долу",
  "alignRightBottom": "Порамнување од десно долу",
  "alignRemove": "Отстрани порамнување",
  "columns": "Колони",
  "rows": "Редови",
  "selectAllCells": "Избери ги сите ќелии"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Постави",
  "orderBy": "Подреди по",
  "orderByName": "Назив",
  "orderBySize": "Големина",
  "directoryNotFound": "Директориум со ова име не беше пронајден.",
  "emptyFolder": "Празен директориум",
  "deleteFile": 'Дали сте сигурни дека сакате да го избришете "{0}"?',
  "invalidFileType": "Избраната датотека \"{0}\" е невалидна. Поддржани типови на датотеки се {1}.",
  "overwriteFile": 'Датотека со име "{0}" веќе постои во тековниот директориум. Дали сакате да ја пребришете?',
  "dropFilesHere": "Преместете ја датотеката тука за да се ипсрати",
  "search": "Пребарај"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "точно",
  "isFalse": "неточно",
  "filter": "Филтер",
  "clear": "Исчисти",
  "operator": "Оператор"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Е еднакво на",
    "neq": "Не е еднакво на",
    "startswith": "Почнува со",
    "contains": "Содржи",
    "doesnotcontain": "Не содржи",
    "endswith": "Завршува на",
    "isnull": "Нема вредност",
    "isnotnull": "Има вредност",
    "isempty": "E празно",
    "isnotempty": "Не е празно"
  },
  "number": {
    "eq": "Е еднакво на",
    "neq": "Не е еднакво на",
    "gte": "Е поголемо или еднакво на",
    "gt": "Е поголемо од",
    "lte": "Е помало или еднакво на",
    "lt": "Е помало од",
    "isnull": "Нема вредност",
    "isnotnull": "Има вредност"
  },
  "date": {
    "eq": "E eднакво на",
    "neq": "Не е еднакво на",
    "gte": "Следи или еднаков на",
    "gt": "Следи",
    "lte": "Претходи или е еднаков на",
    "lt": "Претходи",
    "isnull": "Нема вредност",
    "isnotnull": "Има вредност"
  },
  "enums": {
    "eq": "E eднакво на",
    "neq": "Не е еднакво на",
    "isnull": "Нема вредност",
    "isnotnull": "Има вредност"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Прикажи ставки со вредност што:",
  "title": "Прикажи ставки со вредност што",
  "isTrue": "е точна",
  "isFalse": "не е точна",
  "filter": "Филтер",
  "clear": "Исчисти",
  "and": "И",
  "or": "Или",
  "selectValue": "-Избери вредност-",
  "operator": "Оператор",
  "value": "Вредност",
  "cancel": "Откажи"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "Е еднакво на",
    "neq": "Не е еднакво на",
    "startswith": "Почнува со",
    "contains": "Содржи",
    "doesnotcontain": "Не содржи",
    "endswith": "Завршува на",
    "isnull": "Нема вредност",
    "isnotnull": "Има вредност",
    "isempty": "Е празно",
    "isnotempty": "Не е празно"
  },
  "number": {
    "eq": "Е еднакво на",
    "neq": "Не е еднакво на",
    "gte": "Е поголемо или еднакво на",
    "gt": "Е поголемо од",
    "lte": "Е помало или еднакво од",
    "lt": "Е помало од",
    "isnull": "Нема вредност",
    "isnotnull": "Има вредност"
  },
  "date": {
    "eq": "Е еднакво на",
    "neq": "Не е еднакво на",
    "gte": "Следи или еднаков на",
    "gt": "Следи",
    "lte": "Претходи или е еднаков на",
    "lt": "Претходи",
    "isnull": "Нема вредност",
    "isnotnull": "Има вредност"
  },
  "enums": {
    "eq": "Е еднакво на",
    "neq": "Не е еднакво на",
    "isnull": "Нема вредност",
    "isnotnull": "Има вредност"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Избери ги сите",
  "clear": "Исчисти",
  "filter": "Филтер",
  "search": "Пребарај"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Додади дете",
    "append": "Додади задача",
    "insertAfter": "Додади долу",
    "insertBefore": "Додади горе",
    "pdf": "Експорт во ПДФ"
  },
  "cancel": "Откажи",
  "deleteDependencyWindowTitle": "Избриши зависност",
  "deleteTaskWindowTitle": "Избриши задача",
  "destroy": "Избриши",
  "editor": {
    "assingButton": "Додели",
    "editorTitle": "Задача",
    "end": "Крај",
    "percentComplete": "Завршено",
    "resources": "Ресурси",
    "resourcesEditorTitle": "Ресурси",
    "resourcesHeader": "Ресурси",
    "start": "Почеток",
    "title": "Наслов",
    "unitsHeader": "Единици"
  },
  "save": "Зачувај",
  "views": {
    "day": "Ден",
    "end": "Крај",
    "month": "Месец",
    "start": "Почеток",
    "week": "Недела",
    "year": "Година"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Откажи промени",
    "canceledit": "Откажи",
    "create": "Додади нов запис",
    "destroy": "Избриши",
    "edit": "Измени",
    "excel": "Експорт во Ексел",
    "pdf": "Експорт во ПДФ",
    "save": "Зачувај промени",
    "select": "Избери",
    "update": "Ажурирај"
  },
  "editable": {
    "cancelDelete": "Откажи",
    "confirmation": "Дали сте сигурни дека сакате да го избришете овој запис?",
    "confirmDelete": "Избриши"
  },
  "noRecords": "Нема достапни записи.",
  "expandCollapseColumnHeader": ""
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Нема записи за прикажување",
    "loading": "Вчитување...",
    "requestFailed": "Барањето не успеа.",
    "retry": "Повтори",
    "commands": {
        "edit": "Измени",
        "update": "Ажурирај",
        "canceledit": "Откажи",
        "create": "Додади нов запис",
        "createchild": "Додади подреден запис",
        "destroy": "Избриши",
        "excel": "Експорт во Ексел",
        "pdf": "Експорт во ПДФ"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Повлечете го заглавието на колоната и префрлете го овде за да групирате по таа колона"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Зголеми вредност",
  "downArrowText": "Намали вредност"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Пауза",
  "play": "Репродуцирај",
  "mute": "Исклучи глас",
  "unmute": "Вклучи глас",
  "quality": "Квалитет",
  "fullscreen": "Цел екран"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Сите",
  "display": "{0} - {1} од {2} ставки",
  "empty": "Нема ставки за прикажување",
  "page": "Страна",
  "of": "од {0}",
  "itemsPerPage": "ставки по страна",
  "first": "Оди на прва страна",
  "previous": "Оди на претходна страна",
  "next": "Оди на следна страна",
  "last": "Оди на последна страна",
  "refresh": "Освежи",
  "morePages": "Повеќе страни"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Сите",
  "display": "{0} - {1} од {2} ставки",
  "empty": "Нема ставки за прикажување",
  "page": "Страна",
  "of": "од {0}",
  "itemsPerPage": "ставки по страна",
  "first": "Оди на прва страна",
  "previous": "Оди на претходна страна",
  "next": "Оди на следна страна",
  "last": "Оди на последна страна",
  "refresh": "Освежи",
  "morePages": "Повеќе страни"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Преместете ги тука податочните полиња",
  "columnFields": "Преместете ги тука податочните колони",
  "rowFields": "Преместете ги тука податочните редови"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Прикажи ставки со вредност што:",
  "filterFields": "Филтер на полиња",
  "filter": "Филтер",
  "include": "Вклучи полиња...",
  "title": "Полиња за вклучување",
  "clear": "Исчисти",
  "ok": "ОК",
  "cancel": "Откажи",
  "operators": {
    "contains": "Содржи",
    "doesnotcontain": "Не содржи",
    "startswith": "Почнува со",
    "endswith": "Завршува на",
    "eq": "Е еднакво на",
    "neq": "Не е еднакво на"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Никогаш",
    "hourly": "Часовно",
    "daily": "Дневно",
    "weekly": "Неделно",
    "monthly": "Месечно",
    "yearly": "Годишно"
  },
  "hourly": {
    "repeatEvery": "Повтори на секој/и: ",
    "interval": " час(ови)"
  },
  "daily": {
    "repeatEvery": "Повтори на секој/и: ",
    "interval": " ден(ови)"
  },
  "weekly": {
    "interval": " недела/и",
    "repeatEvery": "Повтори на секој/и: ",
    "repeatOn": "Повтори на: "
  },
  "monthly": {
    "repeatEvery": "Повтори на секој/и: ",
    "repeatOn": "Повтори на: ",
    "interval": " месец(и)",
    "day": "Ден "
  },
  "yearly": {
    "repeatEvery": "Повтори на секоја/и: ",
    "repeatOn": "Повтори на: ",
    "interval": " година/и",
    "of": " од "
  },
  "end": {
    "label": "Крај:",
    "mobileLabel": "Завршува",
    "never": "Никогаш",
    "after": "По ",
    "occurrence": " случувања",
    "on": "На "
  },
  "offsetPositions": {
    "first": "прво/а",
    "second": "второ/а",
    "third": "трето/а",
    "fourth": "четврто/а",
    "last": "последно/а"
  },
  "weekdays": {
    "day": "ден",
    "weekday": "работен ден",
    "weekend": "ден од викенд"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "цел ден",
  "date": "Датум",
  "event": "Настан",
  "time": "Време",
  "showFullDay": "Прикажи цел ден",
  "showWorkDay": "Прикажи работни часови",
  "today": "Денес",
  "save": "Зачувај",
  "cancel": "Откажи",
  "destroy": "Избриши",
  "deleteWindowTitle": "Избриши настан",
  "ariaSlotLabel": "Избран од {0:t} до {1:t}",
  "ariaEventLabel": "{0} на {1:D} во {2:t}",
  "editable": {
    "confirmation": "Дали сте сигурни дека сакате да го избришете овој настан?"
  },
  "views": {
    "day": "Ден",
    "week": "Недела",
    "workWeek": "Работна недела",
    "agenda": "Агенда",
    "month": "Месец"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Избриши повторувачка ставка",
    "deleteWindowOccurrence": "Избриши тековен настан",
    "deleteWindowSeries": "Избриши ги сериите",
    "editWindowTitle": "Измени повторувачка ставка",
    "editWindowOccurrence": "Измени тековен настан",
    "editWindowSeries": "Измени ги сериите",
    "deleteRecurring": "Дали сакате да го избришете само овој настан или целата серија?",
    "editRecurring": "Дали сакате да го измените само овој настан или целата серија?"
  },
  "editor": {
    "title": "Наслов",
    "start": "Почеток",
    "end": "Крај",
    "allDayEvent": "All day event",
    "description": "Опис",
    "repeat": "Повтори",
    "timezone": " ",
    "startTimezone": "Почетна временска зона",
    "endTimezone": "Крајна временска зона",
    "separateTimezones": "Користи посебни почетни и крајни временски зони",
    "timezoneEditorTitle": "Временски зони",
    "timezoneEditorButton": "Временска зона",
    "timezoneTitle": "Временски зони",
    "noTimezone": "Нема временска зона",
    "editorTitle": "Настан"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Сите рабови",
  "insideBorders": "Внатре во рабовите",
  "insideHorizontalBorders": "Внатре во хоризонталните рабови",
  "insideVerticalBorders": "Внатре во вертикалните рабови",
  "outsideBorders": "Надвор од рабовите",
  "leftBorder": "Лев раб",
  "topBorder": "Горен раб",
  "rightBorder": "Десен раб",
  "bottomBorder": "Долен раб",
  "noBorders": "Без раб",
  "reset": "Ресетирај боја",
  "customColor": "Прилагодена боја...",
  "apply": "Примени",
  "cancel": "Откажи"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Примени",
  "save": "Зачувај",
  "cancel": "Откажи",
  "remove": "Отстрани",
  "retry": "Повтори",
  "revert": "Врати",
  "okText": "OK",
  "formatCellsDialog": {
    "title": "Формат",
    "categories": {
      "number": "Број",
      "currency": "Валута",
      "date": "Датум"
      }
  },
  "fontFamilyDialog": {
    "title": "Фонт"
  },
  "fontSizeDialog": {
    "title": "Големина на фонт"
  },
  "bordersDialog": {
    "title": "Рабови"
  },
  "alignmentDialog": {
    "title": "Порамнување",
    "buttons": {
     "justtifyLeft": "Лево порамнување",
     "justifyCenter": "Центар",
     "justifyRight": "Десно порамнување",
     "justifyFull": "Порамни",
     "alignTop": "Порамни горе",
     "alignMiddle": "Порамни во средина",
     "alignBottom": "Порамни долу"
    }
  },
  "mergeDialog": {
    "title": "Спои ќелии",
    "buttons": {
      "mergeCells": "Спои сите",
      "mergeHorizontally": "Спои хоризонтално",
      "mergeVertically": "Спои вертикално",
      "unmerge": "Раздвои"
    }
  },
  "freezeDialog": {
    "title": "Замрзни панели",
    "buttons": {
      "freezePanes": "Замрзни панели",
      "freezeRows": "Замрзни редови",
      "freezeColumns": "Замрзни колони",
      "unfreeze": "Одмрзни панели"
    }
  },
  "confirmationDialog": {
    "text": "Дали сте сигурни дека сакате да го остраните овој лист?",
    "title": "Отстрани лист"
  },
  "validationDialog": {
    "title": "Валидација на податоци",
    "hintMessage": "Ве молиме внесете валидна {0} вредност {1}.",
    "hintTitle": "Валидација {0}",
    "criteria": {
      "any": "Било која вредност",
      "number": "Број",
      "text": "Текст",
      "date": "Датум",
      "custom": "Прилагодена формула",
      "list": "Список"
    },
    "comparers": {
      "greaterThan": "поголемо од",
      "lessThan": "помало од",
      "between": "помеѓу",
      "notBetween": "не е помеѓу",
      "equalTo": "еднакво на",
      "notEqualTo": "не е еднакво на",
      "greaterThanOrEqualTo": "поголемо од или еднакво на",
      "lessThanOrEqualTo": "помало или еднакво на"
    },
    "comparerMessages": {
      "greaterThan": "поголемо од {0}",
      "lessThan": "помало од {0}",
      "between": "помеѓу {0} и {1}",
      "notBetween": "не е помеѓу {0} и {1}",
      "equalTo": "еднакво на {0}",
      "notEqualTo": "не е еднакво на {0}",
      "greaterThanOrEqualTo": "поголемо од или еднакво на {0}",
      "lessThanOrEqualTo": "помало или еднакво на {0}",
      "custom": "што ја задоволува формулата: {0}"
    },
    "labels": {
      "criteria": "Критериуми",
      "comparer": "Оператор за споредба",
      "min": "Мин",
      "max": "Макс",
      "value": "Вредност",
      "start": "Почеток",
      "end": "Крај",
      "onInvalidData": "На невалидни податоци",
      "rejectInput": "Отфрли влез",
      "showWarning": "Прикажи предупредување",
      "showHint": "Прикажи совет",
      "hintTitle": "Наслов на совет",
      "hintMessage": "Порака на совет",
      "ignoreBlank": "Игнорирај празно"
    },
    "placeholders": {
      "typeTitle": "Внесeте наслов",
      "typeMessage": "Внесете порака"
    }
  },
  "exportAsDialog": {
    "title": "Експорт...",
    "labels": {
      "fileName": "Назив на датотека",
      "saveAsType": "Зачувај како тип",
      "exportArea": "Експорт",
      "paperSize": "Големина на лист",
      "margins": "Маргини",
      "orientation": "Ориентација",
      "print": "Печати",
      "guidelines": "Насоки",
      "center": "Центар",
      "horizontally": "Хоризонтално",
      "vertically": "Вертикално"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Не може да се смени дел од споена ќелија."
  },
  "useKeyboardDialog": {
    "title": "Копирање и вметнување",
    "errorMessage": "Овие акции не можат да се повикуваат преку менито. Наместо тоа, користете кратенки на тастатурата:",
    "labels": {
      "forCopy": "за копирање",
      "forCut": "за сечење",
      "forPaste": "за вметнување"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Ова дејство не може да се изврши при повеќекратен избор."
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Сортирај растечки",
  "sortDescending": "Сортирај опаѓачки",
  "filterByValue": "Филтрирај по вредност",
  "filterByCondition": "Филтрирај по услов",
  "apply": "Примени",
  "search": "Пребарај",
  "addToCurrent": "Додади во тековна селекција",
  "clear": "Исчисти",
  "blanks": "(Празни места)",
  "operatorNone": "Без критериуми",
  "and": "И",
  "or": "ИЛИ",
  "operators": {
    "string": {
      "contains": "Текстот содржи",
      "doesnotcontain": "Текстот не содржи",
      "startswith": "Текстот почнува со",
      "endswith": "Текстот завршува на"
    },
    "date": {
      "eq": "Датумот е",
      "neq": "Датумот не е",
      "lt": "Датумот е пред",
      "gt": "Датумот е после"
    },
    "number": {
      "eq": "Е еднакво на",
      "neq": "Не е еднакво на",
      "gte": "Е поголемо или еднакво на",
      "gt": "Е поголемо од",
      "lte": "Е помало или еднакво на",
      "lt": "Е помало од"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Ресетирај боја",
  "customColor": "Прилагодена боја...",
  "apply": "Примени",
  "cancel": "Откажи"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Додади колона од лево",
  "addColumnRight": "Додади колона од десно",
  "addRowAbove": "Додади ред горе",
  "addRowBelow": "Додади ред долу",
  "alignment": "Порамнување",
  "alignmentButtons": {
    "justtifyLeft": "Порамни лево",
    "justifyCenter": "Центар",
    "justifyRight": "Порамни десно",
    "justifyFull": "Порамни",
    "alignTop": "Порамни горе",
    "alignMiddle": "Порамни на средина",
    "alignBottom": "Порамни долу"
  },
  "backgroundColor": "Заднина",
  "bold": "Болд",
  "borders": "Рабови",
  "colorPicker": {
    "reset": "Ресетирај боја",
    "customColor": "Прилагодена боја..."
  },
  "copy": "Копирај",
  "cut": "Сечи",
  "deleteColumn": "Бриши колона",
  "deleteRow": "Бриши ред",
  "excelImport": "Импортирај од Ексел...",
  "filter": "Филтер",
  "fontFamily": "Фонт",
  "fontSize": "Големина на фонт",
  "format": "Прилагоден формат...",
  "formatTypes": {
    "automatic": "Автоматски",
    "number": "Број",
    "percent": "Процент",
    "financial": "Финансиски",
    "currency": "Валута",
    "date": "Датум",
    "time": "Време",
    "dateTime": "Датум време",
    "duration": "Времетраење",
    "moreFormats": "Повеќе формати..."
  },
  "formatDecreaseDecimal": "Намали децимала",
  "formatIncreaseDecimal": "Зголеми децимала",
  "freeze": "Замрзни панели",
  "freezeButtons": {
    "freezePanes": "Замрзни панели",
    "freezeRows": "Замрзни редови",
    "freezeColumns": "Замрзни колони",
    "unfreeze": "Одмрзни панели"
  },
  "italic": "Италик",
  "merge": "Спои ќелии",
  "mergeButtons": {
    "mergeCells": "Спои сите",
    "mergeHorizontally": "Спои хоризонтално",
    "mergeVertically": "Спои вертикално",
    "unmerge": "Раздвои"
  },
  "open": "Отвори...",
  "paste": "Вменти",
  "quickAccess": {
    "redo": "Повтори",
    "undo": "Врати"
  },
  "saveAs": "Зачувај како...",
  "sortAsc": "Сортирај растечки",
  "sortDesc": "Сортирај опаѓачки",
  "sortButtons": {
    "sortSheetAsc": "Сортирај лист растечки",
    "sortSheetDesc": "Сортирај лист опаѓачки",
    "sortRangeAsc": "Сортирај опсег растечки",
    "sortRangeDesc": "Сортирај опсег опаѓачки"
  },
  "textColor": "Боја на текст",
  "textWrap": "Преломи текст",
  "underline": "Подвлечи",
  "validation": "Валидација на податоци..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Не може да се вметнат ќелии поради можност за загуба на податоци. Изберете друга локација за вметнување или избришете ги податоците од крајот на работниот лист.",
    "filterRangeContainingMerges": "Не може да се создаде филтер во опсег кој содржи спојувања",
    "validationError": "Вредноста што ја внесовте ги крши правилата за валидација поставени на ќелијата."
  },
  "tabs": {
    "home": "Дома",
    "insert": "Вметни",
    "data": "Податоци"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Зголеми",
  "decreaseButtonTitle": "Намали"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Избриши",
    "moveUp": "Премести нагоре",
    "moveDown": "Премести надолу",
    "transferTo": "Префрли до",
    "transferFrom": "Префрли од",
    "transferAllTo": "Префрли сите до",
    "transferAllFrom": "Префрли сите од"
  }
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Нема записи за прикажување",
  "loading": "Вчитување...",
  "requestFailed": "Барањето не успеа.",
  "retry": "Повтори",
  "commands": {
      "edit": "Измени",
      "update": "Ажурирај",
      "canceledit": "Откажи",
      "create": "Додади нов запис",
      "createchild": "Додади подреден запис",
      "destroy": "Избриши",
      "excel": "Експорт во Ексел",
      "pdf": "Експорт во ПДФ"
  }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Вчитување...",
  "requestFailed": "Барањето не успеа.",
  "retry": "Повтори"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Избери датотеки...",
  "cancel": "Откажи",
  "retry": "Повтори",
  "remove": "Отстрани",
  "clearSelectedFiles": "Исчисти",
  "uploadSelectedFiles": "Постави датотеки",
  "dropFilesHere": "Премести датотеки тука за да ги поставите",
  "statusUploading": "uploading",
  "statusUploaded": "uploaded",
  "statusWarning": "warning",
  "statusFailed": "failed",
  "headerStatusUploading": "Испраќање...",
  "headerStatusUploaded": "Направено",
  "invalidMaxFileSize": "Големината на датотеката е преголема.",
  "invalidMinFileSize": "Големината на датотеката е премала",
  "invalidFileExtension": "Типот на датотека не е дозволен."
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} е задолжително поле",
  "pattern": "{0} не е валидно",
  "min": "{0} треба да биде поголемо или еднакво на {1}",
  "max": "{0} треба да биде помало или еднакво на {1}",
  "step": "{0} не е валидно",
  "email": "{0} не е валиден е-маил",
  "url": "{0} не е валидно УРЛ",
  "date": "{0} не валиден датум",
  "dateCompare": "Крајниот датум треба да биде поголем или еднаков на почетниот датум"
});
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Вчитување..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Затвори"
});
}

/* Calendar */
if (kendo.ui.Calendar) {
kendo.ui.Calendar.prototype.options.messages =
$.extend(true, kendo.ui.Calendar.prototype.options.messages, {
  "weekColumnHeader": ""
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
  "cancel": "Откажи"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Откажи"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "година",
      "month": "месец",
      "day": "ден",
      "weekday": "ден од неделата",
      "hour": "часови",
      "minute": "минути",
      "second": "секунди",
      "dayperiod": "AM/PM"
    });
}

})(window.kendo.jQuery);
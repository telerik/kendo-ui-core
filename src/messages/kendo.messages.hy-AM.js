(function($, undefined) {

/* FilterMenu operator messages */

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
    "add": "Ավելացնել",
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

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
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
  "title": "Նշված արժեքներով տողերը",
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
            "contrastRatio": "Կdelays համաdelays:",
            "fail": "Ձdelays",
            "pass": "Alls",
            "hex": "HEX",
            "toggleFormat": "Փdelay delays",
            "red": "Կardelays",
            "green": "Կands",
            "blue": "Կapdelays",
            "alpha": "Alls"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Կիрdelays",
            "cancel": "Չedelays",
            "noColor": "Գdelays delays",
            "clearColor": "Մdelays delays"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Կиdelays",
            "cancel": "Չedelays",
            "noColor": "Գdelays delays",
            "clearColor": "Մdelays delays"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Սկizb",
            "endLabel": "Ավарdelays"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Նdelays delays",
                "upload": "Bers",
                "sortDirection": "Sortdelays",
                "sortDirectionAsc": "Աdelays",
                "sortDirectionDesc": "Նdelays",
                "sortField": "Sortdelays",
                "nameField": "Անdelays",
                "sizeField": "Չapdelays",
                "typeField": "Տdelays",
                "dateModifiedField": "Փdelays delays",
                "dateCreatedField": "Stdelays delays",
                "listView": "Ders",
                "gridView": "Ders",
                "search": "Delays",
                "details": "Mandelays",
                "detailsChecked": "Այdelays",
                "detailsUnchecked": "Edelays",
                "Delete": "Ходelays",
                "Rename": "Delays"
            },
            "views": {
                "nameField": "Անdelays",
                "sizeField": "Չapdelays",
                "typeField": "Տdelays",
                "dateModifiedField": "Փdelays delays",
                "dateCreatedField": "Stdelays delays",
                "items": "delaysdelays"
            },
            "dialogs": {
                "upload": {
                    "title": "Delays delays",
                    "clear": "Delays",
                    "done": "Delays"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Delays?</p>",
                    "okText": "Delays",
                    "cancel": "Delays",
                    "close": "Delays"
                },
                "deleteConfirm": {
                    "title": "Delays",
                    "content": "<p class='k-text-center'>Delays?</p>",
                    "okText": "Delays",
                    "cancel": "Delays",
                    "close": "Delays"
                },
                "renamePrompt": {
                    "title": "Delays",
                    "content": "<p class='k-text-center'>Delays</p>",
                    "okText": "Delays",
                    "cancel": "Delays",
                    "close": "Delays"
                }
            },
            "previewPane": {
                "noFileSelected": "Delays",
                "extension": "Delays",
                "size": "Delays",
                "created": "Delays",
                "createdUtc": "Delays (UTC)",
                "modified": "Delays",
                "modifiedUtc": "Delays (UTC)",
                "items": "delays"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Խmdelays",
            "createNewCard": "Նdelays delays",
            "create": "Stdelays",
            "search": "Delays",
            "previewCard": "Delays delays",
            "addCard": "Delays delays",
            "editCard": "Delays delays",
            "deleteCard": "Delays delays",
            "addColumn": "Delays delays",
            "editColumn": "Delays delays",
            "deleteColumn": "Delays delays",
            "close": "Delays",
            "cancel": "Delays",
            "delete": "Delays",
            "saveChanges": "Delays delays",
            "title": "Delays:",
            "description": "Delays:",
            "newColumn": "Delays delays",
            "deleteColumnConfirm": "Delays?",
            "deleteCardConfirm": "Delays?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Ավedelays delays",
            "downArrowText": "Նdelays delays"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Delays",
            "play": "Delays",
            "mute": "Delays",
            "unmute": "Delays",
            "quality": "Delays",
            "fullscreen": "Delays"
        });

}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {

    kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Delays delays delays",
            "columnFields": "Delays delays delays",
            "rowFields": "Delays delays delays"
        });

}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {

    kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Delays delays delays:",
            "sortAscending": "Աdelays",
            "sortDescending": "Նdelays",
            "filterFields": "Delays delays",
            "filter": "Delays",
            "include": "Delays delays...",
            "title": "Delays delays",
            "clear": "Delays",
            "ok": "OK",
            "cancel": "Delays",
            "operators": {
                "contains": "Delays",
                "doesnotcontain": "Delays",
                "startswith": "Delays",
                "endswith": "Delays",
                "eq": "Delays",
                "neq": "Delays"
            }
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Delays",
            "cancelButtonText": "Delays",
            "applyButtonText": "Delays",
            "measures": "Delays delays delays",
            "columns": "Delays delays delays",
            "rows": "Delays delays delays"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Delays",
            "sortAscending": "Delays",
            "sortDescending": "Delays",
            "filterFields": "Delays delays",
            "filter": "Delays",
            "include": "Delays delays...",
            "clear": "Delays",
            "reset": "Delays",
            "moveToColumns": "Delays delays",
            "moveToRows": "Delays delays",
            "movePrevious": "Delays",
            "moveNext": "Delays",
            "filterOperatorsDropDownLabel": "Delays delays",
            "filterValueTextBoxLabel": "Delays delays",
            "operators": {
                "contains": "Delays",
                "doesnotcontain": "Delays",
                "startswith": "Delays",
                "endswith": "Delays",
                "eq": "Delays",
                "neq": "Delays"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Delays",
            "update": "Delays",
            "endTitle": "Delays delays",
            "repeatTitle": "Delays delays",
            "headerTitle": "Delays delays",
            "end": {
                "never": "Delays",
                "after": "Delays",
                "on": "Delays"
            },
            "daily": {
                "interval": "Delays"
            },
            "weekly": {
                "interval": "Delays"
            },
            "monthly": {
                "interval": "Delays",
                "repeatBy": "Delays: ",
                "dayOfMonth": "Delays",
                "dayOfWeek": "Delays"
            },
            "yearly": {
                "interval": "Delays",
                "repeatBy": "Delays: ",
                "dayOfMonth": "Delays",
                "dayOfWeek": "Delays",
                "of": " delays "
            },
            "endRule": {
                "after": " delays",
                "on": "Delays "
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Delays",
            "decreaseButtonTitle": "Delays",
            "dragHandleTitle": "Delays"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Delays",
                "moveUp": "Delays",
                "moveDown": "Delays",
                "transferTo": "Delays",
                "transferFrom": "Delays",
                "transferAllTo": "Delays",
                "transferAllFrom": "Delays"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Delays...",
            "requestFailed": "Delays.",
            "retry": "Delays"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Delays..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Delays",
            "cancel": "Delays",
            "hour": "Delays",
            "minute": "Delays",
            "second": "Delays",
            "millisecond": "Delays",
            "now": "Delays"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Delays",
            "cancel": "Delays",
            "hour": "Delays",
            "minute": "Delays",
            "second": "Delays",
            "millisecond": "Delays",
            "now": "Delays",
            "date": "Delays",
            "time": "Delays",
            "today": "Delays",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Delays",
            "navigateTo": "Delays: ",
            "parentViews": {
                "month": "Delays",
                "year": "Delays",
                "decade": "Delays"
            }
        });

}

/* DateInput */

if (kendo.ui.DateInput) {

    kendo.ui.DateInput.prototype.options.messages =
        $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
            "year": "Delays",
            "month": "Delays",
            "day": "Delays",
            "weekday": "Delays",
            "hour": "Delays",
            "minute": "Delays",
            "second": "Delays",
            "dayperiod": "AM/PM"
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "Delays",
            "noData": "Delays delays."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "Delays",
            "noData": "Delays delays.",
            "singleTag": "delays delays"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "Delays",
            "noData": "Delays delays.",
            "singleTag": "delays delays"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Delays delays...",
            "toggleButton": "Delays delays",
            "sendButton": "Delays"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Delays",
            "previous": "Delays",
            "next": "Delays",
            "done": "Delays",
            "step": "Delays",
            "of": "delays"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Delays",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Delays delays",
                    "zoomOut": "Delays",
                    "zoomIn": "Delays",
                    "actualWidth": "Delays delays",
                    "autoWidth": "Delays delays",
                    "fitToWidth": "Delays delays",
                    "fitToPage": "Delays delays"
                },
                "open": "Delays",
                "exportAs": "Delays",
                "download": "Delays",
                "pager": {
                    "first": "Delays delays",
                    "previous": "Delays delays",
                    "next": "Delays delays",
                    "last": "Delays delays",
                    "of": "delays",
                    "page": "delays",
                    "pages": "delays"
                },
                "print": "Delays",
                "toggleSelection": "Delays",
                "togglePan": "Delays",
                "search": "Delays"
            },
            "errorMessages": {
                "notSupported": "Delays delays.",
                "parseError": "Delays delays.",
                "notFound": "Delays delays.",
                "popupBlocked": "Delays delays."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Delays captcha",
            "audio": "Delays captcha",
            "imageAlt": "Delays captcha delays",
            "success": "Delays delays"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Delays delays",
            "edit": "Delays",
            "create": "Delays",
            "destroy": "Delays",
            "destroyContent": "Delays delays?",
            "destroyTitle": "Delays delays",
            "cancel": "Delays",
            "save": "Delays",
            "menuLabel": "Delays delays",
            "uploadAvatar": "Delays delays",
            "parent": "Delays",
            "name": "Delays",
            "title": "Delays",
            "none": "--Delays--",
            "expand": "Delays",
            "collapse": "Delays"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Delays delays"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Delays"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Delays delays delays"
        });

}

  /* FilterCell operators */
  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "string": {
          "eq": "Հավասար է",
          "neq": "Հավասար չէ",
          "startswith": "Սկսվում է",
          "contains": "Պարունակում է",
          "doesnotcontain": "Չի պարունակում",
          "endswith": "Վերջանում է",
          "isnull": "Null է",
          "isnotnull": "Null չէ",
          "isempty": "Դատարկ է",
          "isnotempty": "Դատարկ չէ",
          "isnullorempty": "Արժեք չունի",
          "isnotnullorempty": "Արժեք ունի"
        },
        "number": {
          "eq": "Հավասար է",
          "neq": "Հավասար չէ",
          "gte": "Մեծ կամ հավասար",
          "gt": "Մեծ է",
          "lte": "Փոքր կամ հավասար",
          "lt": "Փոքր է",
          "isnull": "Null է",
          "isnotnull": "Null չէ"
        },
        "date": {
          "eq": "Հավասար է",
          "neq": "Հավասար չէ",
          "gte": "Հետո կամ հավասար",
          "gt": "Հետո",
          "lte": "Առաջ կամ հավասար",
          "lt": "Առաջ",
          "isnull": "Null է",
          "isnotnull": "Null չէ"
        },
        "enums": {
          "eq": "Հավասար է",
          "neq": "Հավասար չէ",
          "isnull": "Null է",
          "isnotnull": "Null չէ"
        }
      });
  }
  /* FilterMultiCheck messages */
  if (kendo.ui.FilterMultiCheck) {
    kendo.ui.FilterMultiCheck.prototype.options.messages =
      $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
        "checkAll": "Ընտրել բոլորը",
        "clearAll": "Մաքրել բոլորը",
        "clear": "Մաքրել",
        "filter": "Ֆիլտր",
        "search": "Օրոնել",
        "cancel": "Չեղարկել",
        "selectedItemsFormat": "{0} ընտրված",
        "done": "Պատրաստ",
        "into": "մեջ"
      });
  }
  /* Gantt messages */
  if (kendo.ui.Gantt) {
    kendo.ui.Gantt.prototype.options.messages =
      $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
        "actions": {
          "addChild": "Ավելացնել ենթակա",
          "append": "Ավելացնել առաջադրանք",
          "insertAfter": "Ավելացնել ներքև",
          "insertBefore": "Ավելացնել վերև",
          "pdf": "Արտահանել PDF"
        },
        "cancel": "Չեղարկել",
        "deleteDependencyWindowTitle": "Ջնջել կախվածությունը",
        "deleteTaskWindowTitle": "Ջնջել առաջադրանքը",
        "destroy": "Ջնջել",
        "editor": {
          "assingButton": "Նշանակել",
          "editorTitle": "Առաջադրանք",
          "end": "Վերջ",
          "percentComplete": "Ավարտված",
          "plannedStart": "Պլանավորված սկիզբ",
          "plannedEnd": "Պլանավորված ավարտ",
          "resources": "Ռեսուրսներ",
          "resourcesEditorTitle": "Ռեսուրսներ",
          "resourcesHeader": "Ռեսուրսներ",
          "start": "Սկիզբ",
          "title": "Վերնագիր",
          "unitsHeader": "Միավորներ",
          "parent": "Հայր",
          "addNew": "Ավելացնել",
          "name": "Անուն",
          "percentCompleteHint": "արժեք 0-ից 1",
          "remove": "Հեռացնել",
          "actualStart": "Փաստացի սկիզբ",
          "actualEnd": "Փաստացի ավարտ",
          "parentOptionLabel": "-Ոչ-",
          "general": "Ընդհանուր",
          "predecessors": "Նախորդներ",
          "successors": "Հաջորդներ",
          "other": "Այլ",
          "dependencyType": "Տեսակ"
        },
        "plannedTasks": {
          "switchText": "Պլանավորված առաջադրանքներ",
          "offsetTooltipAdvanced": "Պայմանավորված ժամկետ շուտ",
          "offsetTooltipDelay": "Ընդհատում",
          "seconds": "վայրկյան",
          "minutes": "րոպե",
          "hours": "ժամ",
          "days": "օր"
        },
        "save": "Պահել",
        "selectView": "Ընտրել տեսք",
        "views": {
          "day": "Օր",
          "end": "Վերջ",
          "month": "Ամիս",
          "start": "Սկիզբ",
          "week": "Շաբաթ",
          "year": "Տարի"
        }
      });
  }
  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Հարցումներ չկան ցուցադրելու համար",
        "loading": "Բեռնվում է...",
        "requestFailed": "Հարցումը ձախողվեց։",
        "retry": "Կրկնել",
        "commands": {
          "edit": "Խմբագրել",
          "update": "Պահել",
          "canceledit": "Չեղարկել",
          "create": "Ավելացնել նոր գրառում",
          "createchild": "Ավելացնել ենթակա գրառում",
          "destroy": "Ջնջել",
          "excel": "Արտահանել Excel",
          "pdf": "Արտահանել PDF"
        }
      });
  }
  /* TreeList messages */
  if (kendo.ui.TreeList) {
    kendo.ui.TreeList.prototype.options.messages =
      $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
        "noRows": "Հարցումներ չկան ցուցադրելու համար",
        "loading": "Բեռնվում է...",
        "requestFailed": "Հարցումը ձախողվեց։",
        "retry": "Կրկնել",
        "commands": {
          "edit": "Խմբագրել",
          "update": "Թարմացնել",
          "canceledit": "Չեղարկել",
          "create": "Ավելացնել նոր գրառում",
          "createchild": "Ավելացնել ենթակա գրառում",
          "destroy": "Ջնջել",
          "excel": "Արտահանել Excel",
          "pdf": "Արտահանել PDF"
        }
      });
  }
  /* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Բոլոր եզրագծերը",
  "insideBorders": "Ներքին եզրագծեր",
  "insideHorizontalBorders": "Ներքին հորիզոնական եզրագծեր",
  "insideVerticalBorders": "Ներքին ուղղահայաց եզրագծեր",
  "outsideBorders": "Արտաքին եզրագծեր",
  "leftBorder": "Ձախ եզրագիծ",
  "topBorder": "Վերևի եզրագիծ",
  "rightBorder": "Աջ եզրագիծ",
  "bottomBorder": "Ներքևի եզրագիծ",
  "noBorders": "Առանց եզրագծերի",
  "reset": "Վերակայմանել գույնը",
  "customColor": "Հարմարեցված գույն...",
  "apply": "Կիրառել",
  "cancel": "Չեղարկել"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Կիրառել",
  "save": "Պահել",
  "cancel": "Չեղարկել",
  "remove": "Հեռացնել",
  "retry": "Կրկնել",
  "revert": "Վերադարձնել",
  "okText": "Լավ",
  "formatCellsDialog": {
    "title": "Ֆորմատ",
    "categories": {
      "number": "Թիվ",
      "currency": "Արժույթ",
      "date": "Ամսաթիվ"
    }
  },
  "fontFamilyDialog": { "title": "Տառատեսակ" },
  "fontSizeDialog": { "title": "Տառատեսակի չափ" },
  "bordersDialog": { "title": "Եզրագծեր" },
  "alignmentDialog": {
    "title": "Հավասարեցում",
    "buttons": {
      "justifyLeft": "Հավասարեցնել ձախ",
      "justifyCenter": "Կենտրոնացնել",
      "justifyRight": "Հավասարեցնել աջ",
      "justifyFull": "Հավասարեցնել երկու կողմից",
      "alignTop": "Հավասարեցնել վերև",
      "alignMiddle": "Հավասարեցնել միջնամաս",
      "alignBottom": "Հավասարեցնել ներքև"
    }
  },
  "mergeDialog": {
    "title": "Միացնել բջիջները",
    "buttons": {
      "mergeCells": "Միացնել բոլորը",
      "mergeHorizontally": "Միացնել հորիզոնական",
      "mergeVertically": "Միացնել ուղղահայաց",
      "unmerge": "Անջատել"
    }
  },
  "freezeDialog": {
    "title": "Սառեցնել վահանակները",
    "buttons": {
      "freezePanes": "Սառեցնել վահանակները",
      "freezeRows": "Սառեցնել տողերը",
      "freezeColumns": "Սառեցնել սյուները",
      "unfreeze": "Ապասառեցնել վահանակները"
    }
  },
  "confirmationDialog": {
    "text": "Վստահառտեզ հեռացնել այս թերթիկը։",
    "title": "Թերթիկի հեռացում"
  },
  "validationDialog": {
    "title": "Տվյալների ստուգում",
    "hintMessage": "Մուտքագրեք վավեր {0} արժեք {1}։",
    "hintTitle": "Ստուգում {0}",
    "criteria": {
      "any": "Ցանկացած արժեք",
      "number": "Թիվ",
      "text": "Տեքստ",
      "date": "Ամսաթիվ",
      "custom": "Հարմարեցված բանաձև",
      "list": "Ցուցակ"
    },
    "comparers": {
      "greaterThan": "մեծ քան",
      "lessThan": "փոքր քան",
      "between": "միջև",
      "notBetween": "ոչ միջև",
      "equalTo": "հավասար",
      "notEqualTo": "ոչ հավասար",
      "greaterThanOrEqualTo": "մեծ կամ հավասար",
      "lessThanOrEqualTo": "փոքր կամ հավասար"
    },
    "comparerMessages": {
      "greaterThan": "մեծ քան {0}",
      "lessThan": "փոքր քան {0}",
      "between": "միջև {0} և {1}",
      "notBetween": "ոչ միջև {0} և {1}",
      "equalTo": "հավասար {0}",
      "notEqualTo": "ոչ հավասար {0}",
      "greaterThanOrEqualTo": "մեծ կամ հավասար {0}",
      "lessThanOrEqualTo": "փոքր կամ հավասար {0}",
      "custom": "որը բավարարում է բանաձևին՝ {0}"
    },
    "labels": {
      "criteria": "Չափանիշ",
      "comparer": "Համեմատիչ",
      "min": "Նվազագույն",
      "max": "Առավելագույն",
      "value": "Արժեք",
      "start": "Սկիզբ",
      "end": "Վերջ",
      "onInvalidData": "Անվավեր տվյալների դեպքում",
      "rejectInput": "Մերժել մուտքագրումը",
      "showWarning": "Ցույց տալ զգուշացում",
      "showHint": "Ցույց տալ հուշում",
      "hintTitle": "Հուշումի վերնագիր",
      "hintMessage": "Հուշումի հաղորդագրություն",
      "ignoreBlank": "Անտեսել դատարկները"
    },
    "placeholders": {
      "typeTitle": "Մուտքագրեք վերնագիր",
      "typeMessage": "Մուտքագրեք հաղորդագրություն"
    }
  },
  "exportAsDialog": {
    "title": "Արտահանել...",
    "labels": {
      "fileName": "Ֆայլի անուն",
      "saveAsType": "Պահել որպես",
      "exportArea": "Արտահանում",
      "paperSize": "Թղթի չափ",
      "margins": "լուսանցքներ",
      "orientation": "Կողմնորոշում",
      "print": "Տպել",
      "guidelines": "Ուղեցույցներ",
      "center": "Կենտրոն",
      "horizontally": "Հորիզոնական",
      "vertically": "Ուղղահայաց"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Հնարավոր չէ փոխել միացված բջիջի մասը։"
  },
  "useKeyboardDialog": {
    "title": "Պատճենել և տեղադրել",
    "errorMessage": "Այս գործողությունները հնարավոր չէ կանչել մենյուից։ Օգտագործեք ստեղնաշարի դյուրանցումները՝",
    "labels": {
      "forCopy": "պատճենելու համար",
      "forCut": "կտրելու համար",
      "forPaste": "տեղադրելու համար"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Գործողությունը հնարավոր չէ կատարել բազմակի ընտրության վրա։"
  },
  "insertCommentDialog": {
    "title": "Տեղադրել մեկնաբանություն",
    "labels": {
      "comment": "Մեկնաբանություն",
      "removeComment": "Հեռացնել մեկնաբանությունը"
    }
  },
  "insertImageDialog": {
    "title": "Տեղադրել նկար",
    "info": "Քաշեք նկարը այստեղ կամ սեղմեք ընտրելու համար",
    "typeError": "Ընտրեք JPEG, PNG կամ GIF նկար"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Տեսակավորել Պ-ից Տ",
  "sortDescending": "Տեսակավորել Տ-ից Պ",
  "filterByValue": "Ֆիլտրել ըստ արժեքի",
  "filterByCondition": "Ֆիլտրել ըստ պայմանի",
  "apply": "Կիրառել",
  "search": "Փնտրել",
  "addToCurrent": "Ավելացնել ընթացիկ ընտրությանը",
  "clear": "Մաքրել",
  "blanks": "(Դատարկ)",
  "operatorNone": "Ոչ",
  "and": "ԵՎ",
  "or": "ԿԱՄ",
  "operators": {
    "string": {
      "contains": "Տեքստը պարունակում է",
      "doesnotcontain": "Տեքստը չի պարունակում",
      "startswith": "Տեքստը սկսվում է",
      "endswith": "Տեքստը ավարտվում է"
    },
    "date": {
      "eq": "Ամսաթիվը է",
      "neq": "Ամսաթիվը չէ",
      "lt": "Ամսաթիվը մինչև է",
      "gt": "Ամսաթիվը հետո է"
    },
    "number": {
      "eq": "Հավասար է",
      "neq": "Հավասար չէ",
      "gte": "Մեծ կամ հավասար",
      "gt": "Մեծ քան",
      "lte": "Փոքր կամ հավասար",
      "lt": "Փոքր քան"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Վերակայմանել գույնը",
  "customColor": "Հարմարեցված գույն...",
  "apply": "Կիրառել",
  "cancel": "Չեղարկել"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Ավելացնել սյուն ձախից",
  "addColumnRight": "Ավելացնել սյուն աջից",
  "addRowAbove": "Ավելացնել տող վերևից",
  "addRowBelow": "Ավելացնել տող ներքևից",
  "alignment": "Հավասարեցում",
  "alignmentButtons": {
    "justifyLeft": "Հավասարեցնել ձախ",
    "justifyCenter": "Կենտրոնացնել",
    "justifyRight": "Հավասարեցնել աջ",
    "justifyFull": "Հավասարեցնել երկու կողմից",
    "alignTop": "Հավասարեցնել վերև",
    "alignMiddle": "Հավասարեցնել միջնամաս",
    "alignBottom": "Հավասարեցնել ներքև"
  },
  "backgroundColor": "Հետնապատկեր",
  "bold": "Թավ",
  "borders": "Եզրագծեր",
  "colorPicker": {
    "reset": "Վերակայմանել գույնը",
    "customColor": "Հարմարեցված գույն..."
  },
  "copy": "Պատճենել",
  "cut": "Կտրել",
  "deleteColumn": "Ջնջել սյունը",
  "deleteRow": "Ջնջել տողը",
  "excelImport": "Ներմուծել Excel-ից...",
  "filter": "Ֆիլտր",
  "fontFamily": "Տառատեսակ",
  "fontSize": "Տառատեսակի չափ",
  "format": "Հարմարեցված ձևաչափ...",
  "formatTypes": {
    "automatic": "Ինքնաշխատ",
    "number": "Թիվ",
    "percent": "Տոկոս",
    "financial": "Ֆինանսական",
    "currency": "Արժույթ",
    "date": "Ամսաթիվ",
    "time": "Ժամանակ",
    "dateTime": "Ամսաթիվ և ժամանակ",
    "duration": "Տևողություն",
    "moreFormats": "Այլ ձևաչափեր..."
  },
  "formatDecreaseDecimal": "Նվազեցնել տասնորդականները",
  "formatIncreaseDecimal": "Ավելացնել տասնորդականները",
  "freeze": "Սառեցնել վահանակները",
  "freezeButtons": {
    "freezePanes": "Սառեցնել վահանակները",
    "freezeRows": "Սառեցնել տողերը",
    "freezeColumns": "Սառեցնել սյուները",
    "unfreeze": "Ապասառեցնել վահանակները"
  },
  "insertComment": "Տեղադրել մեկնաբանություն",
  "insertImage": "Տեղադրել նկար",
  "italic": "Թեք",
  "merge": "Միացնել բջիջները",
  "mergeButtons": {
    "mergeCells": "Միացնել բոլորը",
    "mergeHorizontally": "Միացնել հորիզոնական",
    "mergeVertically": "Միացնել ուղղահայաց",
    "unmerge": "Անջատել"
  },
  "open": "Բացել...",
  "paste": "Տեղադրել",
  "quickAccess": {
    "redo": "Կրկնել",
    "undo": "Հետարկել"
  },
  "saveAs": "Պահել որպես...",
  "sortAsc": "Տեսակավորել աճողական",
  "sortDesc": "Տեսակավորել նվազողական",
  "sortButtons": {
    "sortSheetAsc": "Տեսակավորել թերթիկը Պ-ից Տ",
    "sortSheetDesc": "Տեսակավորել թերթիկը Տ-ից Պ",
    "sortRangeAsc": "Տեսակավորել տիապարը Պ-ից Տ",
    "sortRangeDesc": "Տեսակավորել տիապարը Տ-ից Պ"
  },
  "textColor": "Տեքստի գույն",
  "textWrap": "Տեքստի տեղափոխում",
  "underline": "Ընդգծած",
  "validation": "Տվյալների ստուգում..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "nameBox": "Անվան տուփ",
  "formulaInput": "Բանաձևի մուտքագրում",
  "errors": {
    "shiftingNonblankCells": "Հնարավոր չէ տեղադրել բջիջներ տվյալների կորստի հնարավորության պատճառով։ Ընտրեք այլ տեղադրման վայր կամ ջնջեք տվյալները թերթիկի վերջից։",
    "filterRangeContainingMerges": "Հնարավոր չէ ստեղծել զտիչ միացված բջիջներ պարունակող տիապարում",
    "validationError": "Մուտքագրված արժեքը խախտում է բջիջի ստուգման կանոնները։"
  },
  "tabs": {
    "home": "Գլխավոր",
    "insert": "Տեղադրել",
    "data": "Տվյալներ"
  },
  "sheetBar": {
    "addSheet": "Ավելացնել նոր թերթիկ",
    "deleteSheet": "Ջնջել",
    "duplicateSheet": "Կրկնորինակել",
    "renameSheet": "Վերանվանել",
    "hideSheet": "Թաքցնել",
    "moveRight": "Տեղափոխել աջ",
    "moveLeft": "Տեղափոխել ձախ"
  }
});
}

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "Նախորդ որոնումներ չկան",
        "noPreviousPrompts": "Նախորդ հարցումներ չկան",
        "previousSearches": "Նախորդ որոնումներ",
        "previousPrompts": "Նախորդ հարցումներ",
        "suggestedPrompts": "Առաջարկվող հարցումներ",
        "searchModeLabel": "Որոնում",
        "searchModeDescription": "Փնտրում է բառերի ճշգրիտ համապատասխաններ ձեր տվյալներում",
        "searchPlaceholder": "Որոնում",
        "semanticSearchModeLabel": "Իմաստային որոնում",
        "semanticSearchModeDescription": "Հասկանում է համատեքստը՝ ցուցադրելով ամենաառնչական արդյունքները։",
        "semanticSearchPlaceholder": "Իմաստային որոնում",
        "semanticSearchButtonText": "Որոնել",
        "aiAssistantPlaceholder": "Տեսակել՝ ֆիլտրել կամ խմբավորել AI-ի օգնությամբ",
        "speechToText": "Խոսքից տեքստ",
        "speechToTextAriaLabel": "Սկսել խոսքի ճանաչումը",
        "cancel": "Չեղարկել",
        "send": "Ուղարկել",
        "searchButtonText": "Որոնել",
        "aiAssistantButtonText": "AI օգնական"
      });
  }
  /* FileBrowser messages */
  if (kendo.ui.FileBrowser) {
  kendo.ui.FileBrowser.prototype.options.messages =
  $.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
    "uploadFile": "Upload",
    "orderBy": "Arrange by",
    "orderByName": "Name",
    "orderBySize": "Size",
    "directoryNotFound": "A directory with this name was not found.",
    "emptyFolder": "Empty Folder",
    "deleteFile": 'Are you sure you want to delete "{0}"?',
    "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
    "overwriteFile": "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
    "dropFilesHere": "drop file here to upload",
    "search": "Search"
  });
  }

})(window.kendo.jQuery);
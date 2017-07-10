(function ($, undefined) {
    /* FlatColorPicker messages */

    if (kendo.ui.FlatColorPicker) {
        kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "تایید",
            "cancel": "انصراف"
        });
    }

    /* ColorPicker messages */

    if (kendo.ui.ColorPicker) {
        kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "تایید",
            "cancel": "انصراف"
        });
    }

    /* ColumnMenu messages */

    if (kendo.ui.ColumnMenu) {
        kendo.ui.ColumnMenu.prototype.options.messages =
        $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
            "sortAscending": "مرتب سازی صعودی",
            "sortDescending": "مرتب سازی نزولی",
            "filter": "فیلتر",
            "columns": "ستون ها",
            "done": "تمام",
            "settings": "تنظیمات ستون ها",
            "lock": "بستن",
            "unlock": "باز کردن"
        });
    }

    /* Editor messages */

    if (kendo.ui.Editor) {
        kendo.ui.Editor.prototype.options.messages =
        $.extend(true, kendo.ui.Editor.prototype.options.messages, {
            "bold": "Bold",
            "italic": "Italic",
            "underline": "Underline",
            "strikethrough": "Strikethrough",
            "superscript": "Superscript",
            "subscript": "Subscript",
            "justifyCenter": "Center text",
            "justifyLeft": "Align text left",
            "justifyRight": "Align text right",
            "justifyFull": "Justify",
            "insertUnorderedList": "Insert unordered list",
            "insertOrderedList": "Insert ordered list",
            "indent": "Indent",
            "outdent": "Outdent",
            "createLink": "Insert hyperlink",
            "unlink": "Remove hyperlink",
            "insertImage": "Insert image",
            "insertFile": "Insert file",
            "insertHtml": "درج متن آماده",
            "viewHtml": "View HTML",
            "fontName": "Select font family",
            "fontNameInherit": "(inherited font)",
            "fontSize": "Select font size",
            "fontSizeInherit": "(inherited size)",
            "formatBlock": "Format",
            "formatting": "Format",
            "foreColor": "Color",
            "backColor": "Background color",
            "style": "Styles",
            "emptyFolder": "Empty Folder",
            "uploadFile": "Upload",
            "orderBy": "Arrange by:",
            "orderBySize": "Size",
            "orderByName": "Name",
            "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
            "deleteFile": 'Are you sure you want to delete "{0}"?',
            "overwriteFile": 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
            "directoryNotFound": "A directory with this name was not found.",
            "imageWebAddress": "Web address",
            "imageAltText": "Alternate text",
            "imageWidth": "Width (px)",
            "imageHeight": "Height (px)",
            "fileWebAddress": "Web address",
            "fileTitle": "Title",
            "linkWebAddress": "Web address",
            "linkText": "Text",
            "linkToolTip": "ToolTip",
            "linkOpenInNewWindow": "Open link in new window",
            "dialogUpdate": "Update",
            "dialogInsert": "Insert",
            "dialogButtonSeparator": "or",
            "dialogCancel": "Cancel",
            "createTable": "Create table",
            "addColumnLeft": "Add column on the left",
            "addColumnRight": "Add column on the right",
            "addRowAbove": "Add row above",
            "addRowBelow": "Add row below",
            "deleteRow": "Delete row",
            "deleteColumn": "Delete column"
        });
    }

    /* FileBrowser messages */

    if (kendo.ui.FileBrowser) {
        kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "بارگزاری",
            "orderBy": "مرتب سازی بر اساس",
            "orderByName": "نام",
            "orderBySize": "اندازه",
            "directoryNotFound": "فولدر مورد نظر پیدا نشد",
            "emptyFolder": "فولدر خالی",
            "deleteFile": 'آیا از حذف "{0}" اطمینان دارید؟',
            "invalidFileType": "انتخاب فایل با پسوند \"{0}\" امکانپذیر نیست. پسوندهای پشیتبانی شده: {1}",
            "overwriteFile": "فایل با نام \"{0}\" در فولدر انتخابی وجود دارد. آیا می خواهید آن را بازنویسی کنید؟",
            "dropFilesHere": "فایل را به اینجا بکشید",
            "search": "جستجو"
        });
    }

    /* FilterCell messages */

    if (kendo.ui.FilterCell) {
        kendo.ui.FilterCell.prototype.options.messages =
        $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
            "isTrue": "درست باشد",
            "isFalse": "درست نباشد",
            "filter": "فیلتر",
            "clear": "پاک کردن",
            "operator": "عملگر"
        });
    }

    /* FilterCell operators */

    if (kendo.ui.FilterCell) {
        kendo.ui.FilterCell.prototype.options.operators =
        $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
            "string": {
                "eq": "برابر باشد با",
                "neq": "برابر نباشد با",
                "startswith": "شروع شود با",
                "contains": "شامل باشد",
                "doesnotcontain": "شامل نباشد",
                "endswith": "پایان یابد با"
            },
            "number": {
                "eq": "برابر باشد با",
                "neq": "برابر نباشد با",
                "gte": "برابر یا بزرگتر باشد از",
                "gt": "بزرگتر باشد از",
                "lte": "کمتر و یا برابر باشد با",
                "lt": "کمتر باشد از"
            },
            "date": {
                "eq": "برابر باشد با",
                "neq": "برابر نباشد با",
                "gte": "بعد از یا هم زمان باشد با",
                "gt": "بعد از",
                "lte": "قبل از یا هم زمان باشد با",
                "lt": "قبل از"
            },
            "enums": {
                "eq": "برابر باشد با",
                "neq": "برابر نباشد با"
            }
        });
    }

    /* FilterMenu messages */

    if (kendo.ui.FilterMenu) {
        kendo.ui.FilterMenu.prototype.options.messages =
        $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
            "info": "ردیف های را نشان بده که:",
            "isTrue": "درست باشد",
            "isFalse": "درست نباشد",
            "filter": "فیلتر",
            "clear": "پاک کردن",
            "and": "و",
            "or": "یا",
            "selectValue": "-انتخاب مقدار-",
            "operator": "عملگر",
            "value": "مقدار",
            "cancel": "انصراف"
        });
    }

    /* FilterMenu operator messages */

    if (kendo.ui.FilterMenu) {
        kendo.ui.FilterMenu.prototype.options.operators =
        $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
            "string": {
                "eq": "برابر باشد با",
                "neq": "برابر نباشد با",
                "startswith": "شروع شود با",
                "contains": "شامل باشد",
                "doesnotcontain": "شامل نباشد",
                "endswith": "پایان یابد با"
            },
            "number": {
                "eq": "برابر باشد با",
                "neq": "برابر نباشد با",
                "gte": "برابر یا بزرگتر باشد از",
                "gt": "بزرگتر باشد از",
                "lte": "کمتر و یا برابر باشد با",
                "lt": "کمتر باشد از"
            },
            "date": {
                "eq": "برابر باشد با",
                "neq": "برابر نباشد با",
                "gte": "بعد از یا هم زمان باشد با",
                "gt": "بعد از",
                "lte": "قبل از یا هم زمان باشد با",
                "lt": "قبل از"
            },
            "enums": {
                "eq": "برابر باشد با",
                "neq": "برابر نباشد با"
            }
        });
    }

    /* FilterMultiCheck messages */

    if (kendo.ui.FilterMultiCheck) {
        kendo.ui.FilterMultiCheck.prototype.options.messages =
        $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
            "checkAll": "انتخاب همه",
            "clear": "پاک کردن",
            "filter": "فیلتر"
        });
    }

    /* Gantt messages */

    if (kendo.ui.Gantt) {
        kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "اضافه کردن فرزند",
                "append": "اضافه کردن کار",
                "insertAfter": "اضافه کن زیر",
                "insertBefore": "اضافه کن بالای",
                "pdf": "گرفتن خروجی PDF"
            },
            "cancel": "انصراف",
            "deleteDependencyWindowTitle": "حذف رابطه",
            "deleteTaskWindowTitle": "حذف کار",
            "destroy": "حذف",
            "editor": {
                "assingButton": "ارجاع دادن",
                "editorTitle": "کار",
                "end": "پایان",
                "percentComplete": "پیشرفت",
                "resources": "منابع",
                "resourcesEditorTitle": "منابع",
                "resourcesHeader": "منابع",
                "start": "شروع",
                "title": "عنوان",
                "unitsHeader": "واحدها"
            },
            "save": "ذخیره",
            "views": {
                "day": "روز",
                "end": "پایان",
                "month": "ماه",
                "start": "شروع",
                "week": "هفته",
                "year": "سال"
            }
        });
    }

    /* Grid messages */

    if (kendo.ui.Grid) {
        kendo.ui.Grid.prototype.options.messages =
        $.extend(true, kendo.ui.Grid.prototype.options.messages, {
            "commands": {
                "cancel": "انصراف",
                "canceledit": "انصراف",
                "create": "اضافه کردن ردیف جدید",
                "destroy": "حذف",
                "edit": "ویرایش",
                "excel": "خروجی Excel",
                "pdf": "خروجی PDF",
                "save": "ذخیره",
                "select": "انتخاب",
                "update": "ذخیره"
            },
            "editable": {
                "cancelDelete": "انصراف",
                "confirmation": "آیا از حذف این ردیف مطمئنید؟",
                "confirmDelete": "حذف"
            },
            "noRecords": "اطلاعاتی وجود ندارد"
        });
    }

    /* Groupable messages */

    if (kendo.ui.Groupable) {
        kendo.ui.Groupable.prototype.options.messages =
        $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
            "empty": "برای گروه بندی بر اساس یک ستون، عنوان ستون را به اینجا بکشید"
        });
    }

    /* NumericTextBox messages */

    if (kendo.ui.NumericTextBox) {
        kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "اضافه کردن",
            "downArrowText": "کم کردن"
        });
    }

    /* Pager messages */

    if (kendo.ui.Pager) {
        kendo.ui.Pager.prototype.options.messages =
        $.extend(true, kendo.ui.Pager.prototype.options.messages, {
            "allPages": "همه",
            "display": "ردیف {0} تا {1} از {2} ردیف",
            "empty": "ردیفی برای نمایش وجود ندارد",
            "page": "صفحه",
            "of": "از {0}",
            "itemsPerPage": "ردیف های هر صفحه",
            "first": "برو به صفحه اول",
            "previous": "برو به صفحه قبل",
            "next": "برو به صفحه بعد",
            "last": "برو به صفحه آخر",
            "refresh": "بارگزاری مجدد",
            "morePages": "صفحات بیشتر"
        });
    }

    /* PivotGrid messages */

    if (kendo.ui.PivotGrid) {
        kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Drop Data Fields Here",
            "columnFields": "Drop Column Fields Here",
            "rowFields": "Drop Rows Fields Here"
        });
    }

    /* PivotFieldMenu messages */

    if (kendo.ui.PivotFieldMenu) {
        kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Show items with value that:",
            "filterFields": "Fields Filter",
            "filter": "Filter",
            "include": "Include Fields...",
            "title": "Fields to include",
            "clear": "Clear",
            "ok": "Ok",
            "cancel": "Cancel",
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

    /* RecurrenceEditor messages */

    if (kendo.ui.RecurrenceEditor) {
        kendo.ui.RecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
            "frequencies": {
                "never": "هیچ وقت",
                "hourly": "ساعتی",
                "daily": "روزانه",
                "weekly": "هفتگی",
                "monthly": "ماهانه",
                "yearly": "سالیانه"
            },
            "hourly": {
                "repeatEvery": "تکرار کن هر: ",
                "interval": " ساعت"
            },
            "daily": {
                "repeatEvery": "تکرار کن هر: ",
                "interval": " روز"
            },
            "weekly": {
                "interval": " هفته",
                "repeatEvery": "تکرار کن هر: ",
                "repeatOn": "تکرار کن در: "
            },
            "monthly": {
                "repeatEvery": "تکرار کن هر: ",
                "repeatOn": "تکرار کن در: ",
                "interval": " ماه",
                "day": "روز "
            },
            "yearly": {
                "repeatEvery": "تکرار کن هر: ",
                "repeatOn": "تکرار کن در: ",
                "interval": " سال",
                "of": " از "
            },
            "end": {
                "label": "پایان:",
                "mobileLabel": "پایان",
                "never": "هیچ وقت",
                "after": "بعد از ",
                "occurrence": " دفعات وقوع",
                "on": "در "
            },
            "offsetPositions": {
                "first": "اول",
                "second": "دوم",
                "third": "سوم",
                "fourth": "چهارم",
                "last": "آخر"
            },
            "weekdays": {
                "day": "روز",
                "weekday": "روز هفته",
                "weekend": "پایان هفته"
            }
        });
    }

    /* Scheduler messages */

    if (kendo.ui.Scheduler) {
        kendo.ui.Scheduler.prototype.options.messages =
        $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
            "allDay": "all day",
            "date": "Date",
            "event": "Event",
            "time": "Time",
            "showFullDay": "Show full day",
            "showWorkDay": "Show business hours",
            "today": "Today",
            "save": "Save",
            "cancel": "Cancel",
            "destroy": "Delete",
            "deleteWindowTitle": "Delete event",
            "ariaSlotLabel": "Selected from {0:t} to {1:t}",
            "ariaEventLabel": "{0} on {1:D} at {2:t}",
            "editable": {
                "confirmation": "Are you sure you want to delete this event?"
            },
            "views": {
                "day": "Day",
                "week": "Week",
                "workWeek": "Work Week",
                "agenda": "Agenda",
                "month": "Month"
            },
            "recurrenceMessages": {
                "deleteWindowTitle": "Delete Recurring Item",
                "deleteWindowOccurrence": "Delete current occurrence",
                "deleteWindowSeries": "Delete the series",
                "editWindowTitle": "Edit Recurring Item",
                "editWindowOccurrence": "Edit current occurrence",
                "editWindowSeries": "Edit the series",
                "deleteRecurring": "Do you want to delete only this event occurrence or the whole series?",
                "editRecurring": "Do you want to edit only this event occurrence or the whole series?"
            },
            "editor": {
                "title": "Title",
                "start": "Start",
                "end": "End",
                "allDayEvent": "All day event",
                "description": "Description",
                "repeat": "Repeat",
                "timezone": " ",
                "startTimezone": "Start timezone",
                "endTimezone": "End timezone",
                "separateTimezones": "Use separate start and end time zones",
                "timezoneEditorTitle": "Timezones",
                "timezoneEditorButton": "Time zone",
                "timezoneTitle": "Time zones",
                "noTimezone": "No timezone",
                "editorTitle": "Event"
            }
        });
    }

    /* Slider messages */

    if (kendo.ui.Slider) {
        kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "افزایش",
            "decreaseButtonTitle": "کاهش"
        });
    }

    /* TreeList messages */

    if (kendo.ui.TreeList) {
        kendo.ui.TreeList.prototype.options.messages =
        $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
            "noRows": "ردیفی برای نمایش موجود نیست",
            "loading": "در حال بارگزاری...",
            "requestFailed": "شکست در انجام درخواست.",
            "retry": "تلاش مجدد",
            "commands": {
                "edit": "ویرایش",
                "update": "ذخیره",
                "canceledit": "انصراف",
                "create": "درج ردیف جدید",
                "createchild": "درج گره جدید",
                "destroy": "حذف",
                "excel": "خروجی Excel",
                "pdf": "خروجی PDF"
            }
        });
    }

    /* TreeView messages */

    if (kendo.ui.TreeView) {
        kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "در حال بارگزاری...",
            "requestFailed": "شکست در انجام درخواست.",
            "retry": "تلاش مجدد"
        });
    }

    /* Upload messages */

    if (kendo.ui.Upload) {
        kendo.ui.Upload.prototype.options.localization =
        $.extend(true, kendo.ui.Upload.prototype.options.localization, {
            "select": "انتخاب فایل(ها)...",
            "cancel": "انصراف",
            "retry": "تلاش مجدد",
            "remove": "حذف",
            "uploadSelectedFiles": "بارگزاری فایل(ها)",
            "dropFilesHere": "فایل(ها) را برای بارگزاری به اینجا بکشید",
            "statusUploading": "در حال بارگزاری",
            "statusUploaded": "پایان بارگزاری",
            "statusWarning": "هشداد",
            "statusFailed": "خطا در بارگزاری",
            "headerStatusUploading": "در حال بارگزاری...",
            "headerStatusUploaded": "اتمام بارگزاری"
        });
    }

    /* Validator messages */

    if (kendo.ui.Validator) {
        kendo.ui.Validator.prototype.options.messages =
        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
            "required": "{0} اجباری است",
            "pattern": "{0} معتبر نیست",
            "min": "{0} باید بزرگتر یا برابر باشد با {1}",
            "max": "{0} باید کوچکتر یا برابر باشد با {1}",
            "step": "{0} معتبر نیست",
            "email": "{0} یک ایمیل معتبر نیست",
            "url": "{0} آدرس وب سایت معتبر نیست",
            "date": "{0} تاریخ معتبر نیست",
            "dateCompare": "تاریخ پایان باید برابر یا بعد از تاریخ آغاز باشد"
        });
    }
})(window.kendo.jQuery);


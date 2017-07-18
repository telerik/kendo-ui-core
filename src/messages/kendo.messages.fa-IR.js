/**
 * Kendo UI v2017.2.621 (http://www.telerik.com/kendo-ui)
 * Copyright 2017 Telerik AD. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.**/
kendo.ui.Locale = "Persian (fa-IR)";


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
                bold: "پررنگ",
                italic: "مورب",
                underline: "زیرخط",
                strikethrough: "strikethrough",
                superscript: "بالانویس",
                subscript: "زیرنویس",
                justifyCenter: "مرتب سازی به مرکز",
                justifyLeft: "مرتب سازی به چپ",
                justifyRight: "مرتب سازی به راست",
                justifyFull: "مرتب سازی کامل",
                insertUnorderedList: "درج لیست نامرتب",
                insertOrderedList: "درج لیست مرتب",
                indent: "افزایش فاصله",
                outdent: "کاهش فاصله",
                createLink: "ایجاد پیوند",
                unlink: "حذف پیوند",
                insertImage: "درج تصویر",
                insertHtml: "درج HTML",
                "insertFile": "درج فایل",
                "viewHtml": "نمایش HTML",
                fontName: "نام قلم",
                fontNameInherit: "قلم",
                fontSize: "اندازه قلم",
                fontSizeInherit: "اندازه قلم",
                formatBlock: "قالب دهی",
                "formatting": "فرمت",
                foreColor: "رنگ",
                backColor: "رنگ پس زمینه",
                style: "طرح",
                emptyFolder: "خالی نمودن مسیر",
                uploadFile: "بارگذاری فایل",
                orderBy: "مرتب سازی با:",
                orderBySize: "مرتب سازی بر اساس اندازه",
                orderByName: "مرتب سازی بر اساس نام",
                invalidFileType: "فایل انتخاب شده\"{0}\" نامعتبر است. فایل های پشتیبانی شده عبارتند از: {1}.",
                deleteFile: 'آیا مطمئن هستید که  "{0}" پاک شود؟',
                overwriteFile: "فایل با نام \"{0}\" در مسیر مورد نظر وجود دارد. روی آن نوشته شود؟",
                directoryNotFound: "مسیر مورد نظر یافت نشد",
                imageWebAddress: "آدرس اینترنتی تصویر",
                imageAltText: "متن جایگزین",
                "imageWidth": "عرض (px)",
                "imageHeight": "ارتفاع (px)",
                "fileWebAddress": "آدرس وب",
                "fileTitle": "عنوان",
                "linkWebAddress": "آدرس وب",
                "linkText": "متن",
                "linkToolTip": "بالون",
                "linkOpenInNewWindow": "باز کردن در صفحه جدید",
                "dialogUpdate": "ویرایش",
                dialogInsert: "درج",
                dialogButtonSeparator: "یا",
                dialogCancel: "انصراف",
                "createTable": "ایجاد جدول",
                "addColumnLeft": "اضافه کردن ستون در سمت چپ",
                "addColumnRight": "اضافه کردن ستون در سمت راست",
                "addRowAbove": "اضافه کردن ردیف به بالا",
                "addRowBelow": "اضافه کردن ردیف به زیر",
                "deleteRow": "حذف سطر",
                "deleteColumn": "حذف سطون"
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
                    "endswith": "پایان یابد با",
                    "isnull": "تهی باشد",
                    "isnotnull": "تهی نباشد",
                    "isempty": "خالی باشد",
                    "isnotempty": "خالی نباشد"
                },
                "number": {
                    "eq": "برابر باشد با",
                    "neq": "برابر نباشد با",
                    "gte": "برابر یا بزرگتر باشد از",
                    "gt": "بزرگتر باشد از",
                    "lte": "کمتر و یا برابر باشد با",
                    "lt": "کمتر باشد از",
                    "isnull": "تهی باشد",
                    "isnotnull": "تهی نباشد"
                },
                "date": {
                    "eq": "برابر باشد با",
                    "neq": "برابر نباشد با",
                    "gte": "بعد از یا هم زمان باشد با",
                    "gt": "بعد از",
                    "lte": "قبل از یا هم زمان باشد با",
                    "lt": "قبل از",
                    "isnull": "تهی باشد",
                    "isnotnull": "تهی نباشد"
                },
                "enums": {
                    "eq": "برابر باشد با",
                    "neq": "برابر نباشد با",
                    "isnull": "تهی باشد",
                    "isnotnull": "تهی نباشد"
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
                    "endswith": "پایان یابد با",
                    "isnull": "تهی باشد",
                    "isnotnull": "تهی نباشد",
                    "isempty": "خالی باشد",
                    "isnotempty": "خالی نباشد"
                },
                "number": {
                    "eq": "برابر باشد با",
                    "neq": "برابر نباشد با",
                    "gte": "برابر یا بزرگتر باشد از",
                    "gt": "بزرگتر باشد از",
                    "lte": "کمتر و یا برابر باشد با",
                    "lt": "کمتر باشد از",
                    "isnull": "تهی باشد",
                    "isnotnull": "تهی نباشد"
                },
                "date": {
                    "eq": "برابر باشد با",
                    "neq": "برابر نباشد با",
                    "gte": "بعد از یا هم زمان باشد با",
                    "gt": "بعد از",
                    "lte": "قبل از یا هم زمان باشد با",
                    "lt": "قبل از",
                    "isnull": "تهی باشد",
                    "isnotnull": "تهی نباشد"
                },
                "enums": {
                    "eq": "برابر باشد با",
                    "neq": "برابر نباشد با",
                    "isnull": "تهی باشد",
                    "isnotnull": "تهی نباشد"
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

    /* Dialog */



    if (kendo.ui.Dialog) {
        kendo.ui.Dialog.prototype.options.messages =
            $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
                "close": "بستن"
            });
    }



    /* Alert */



    if (kendo.ui.Alert) {
        kendo.ui.Alert.prototype.options.messages =
            $.extend(true, kendo.ui.Alert.prototype.options.localization, {
                "okText": "تایید"
            });
    }



    /* Confirm */



    if (kendo.ui.Confirm) {
        kendo.ui.Confirm.prototype.options.messages =
            $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
                "okText": "تایید",
                "cancel": "لغو"
            });
    }



    /* Prompt */

    if (kendo.ui.Prompt) {
        kendo.ui.Prompt.prototype.options.messages =
            $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
                "okText": "تایید",
                "cancel": "لغو"
            });
    }
})(window.kendo.jQuery);

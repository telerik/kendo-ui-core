(function($, undefined) {

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
            "title": "ردیف های را نشان بده که:",
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
                "add": "اضافه کردن ردیف جدید",
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

    /* TreeListPager messages */

    if (kendo.ui.TreeListPager) {
        kendo.ui.TreeListPager.prototype.options.messages =
        $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
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
                "contrastRatio": "نسبت کنتراست:",
                "fail": "ناموفق",
                "pass": "موفق",
                "hex": "HEX",
                "toggleFormat": "تغییر قالب",
                "red": "قرمز",
                "green": "سبز",
                "blue": "آبی",
                "alpha": "آلفا"
            });

    }

    /* DateRangePicker messages */

    if (kendo.ui.DateRangePicker) {

        kendo.ui.DateRangePicker.prototype.options.messages =
            $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
                "startLabel": "شروع",
                "endLabel": "پایان"
            });

    }

    /* FileManager messages */

    if (kendo.ui.FileManager) {

        kendo.ui.FileManager.prototype.options.messages =
            $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
                "toolbar": {
                    "createFolder": "پوشه جدید",
                    "upload": "بارگذاری",
                    "sortDirection": "جهت مرتب‌سازی",
                    "sortDirectionAsc": "صعودی",
                    "sortDirectionDesc": "نزولی",
                    "sortField": "مرتب‌سازی بر اساس",
                    "nameField": "نام",
                    "sizeField": "اندازه",
                    "typeField": "نوع",
                    "dateModifiedField": "تاریخ تغییر",
                    "dateCreatedField": "تاریخ ایجاد",
                    "listView": "نمای لیست",
                    "gridView": "نمای جدول",
                    "search": "جستجو",
                    "details": "جزئیات",
                    "detailsChecked": "بله",
                    "detailsUnchecked": "خیر",
                    "Delete": "حذف",
                    "Rename": "تغییر نام"
                },
                "views": {
                    "nameField": "نام",
                    "sizeField": "اندازه",
                    "typeField": "نوع",
                    "dateModifiedField": "تاریخ تغییر",
                    "dateCreatedField": "تاریخ ایجاد",
                    "items": "مورد"
                },
                "dialogs": {
                    "upload": {
                        "title": "بارگذاری فایل‌ها",
                        "clear": "پاک کردن",
                        "done": "انجام شد"
                    },
                    "moveConfirm": {
                        "title": " ",
                        "content": "<p class='k-text-center'>آیا می‌خواهید فایل‌های انتخاب شده را انتقال یا کپی کنید؟</p>",
                        "okText": "کپی",
                        "cancel": "انتقال",
                        "close": "بستن"
                    },
                    "deleteConfirm": {
                        "title": "تایید حذف",
                        "content": "<p class='k-text-center'>آیا مطمئنید که می‌خواهید فایل‌های انتخاب شده را حذف کنید؟<br/>این عمل قابل بازگشت نیست.</p>",
                        "okText": "حذف",
                        "cancel": "لغو",
                        "close": "بستن"
                    },
                    "renamePrompt": {
                        "title": "تغییر نام",
                        "content": "<p class='k-text-center'>نام جدید فایل را وارد کنید</p>",
                        "okText": "تغییر نام",
                        "cancel": "لغو",
                        "close": "بستن"
                    }
                },
                "previewPane": {
                    "noFileSelected": "هیچ فایلی انتخاب نشده",
                    "extension": "نوع",
                    "size": "اندازه",
                    "created": "تاریخ ایجاد",
                    "createdUtc": "تاریخ ایجاد (UTC)",
                    "modified": "تاریخ تغییر",
                    "modifiedUtc": "تاریخ تغییر (UTC)",
                    "items": "مورد"
                }
            });

    }

    /* TaskBoard messages */

    if (kendo.ui.TaskBoard) {

        kendo.ui.TaskBoard.prototype.options.messages =
            $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
                "edit": "ویرایش",
                "createNewCard": "کارت جدید",
                "create": "ایجاد",
                "search": "جستجو",
                "previewCard": "پیش‌نمایش کارت",
                "addCard": "افزودن کارت",
                "editCard": "ویرایش کارت",
                "deleteCard": "حذف کارت",
                "addColumn": "افزودن ستون",
                "editColumn": "ویرایش ستون",
                "deleteColumn": "حذف ستون",
                "close": "بستن",
                "cancel": "لغو",
                "delete": "حذف",
                "saveChanges": "ذخیره تغییرات",
                "title": "عنوان:",
                "description": "توضیحات:",
                "newColumn": "ستون جدید",
                "deleteColumnConfirm": "آیا مطمئنید که می‌خواهید این ستون را حذف کنید؟",
                "deleteCardConfirm": "آیا مطمئنید که می‌خواهید این کارت را حذف کنید؟"
            });

    }

    /* MediaPlayer messages */

    if (kendo.ui.MediaPlayer) {

        kendo.ui.MediaPlayer.prototype.options.messages =
            $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
                "pause": "مکث",
                "play": "پخش",
                "mute": "بی‌صدا",
                "unmute": "باصدا",
                "quality": "کیفیت",
                "fullscreen": "تمام صفحه"
            });

    }

    /* PivotConfiguratorV2 messages */

    if (kendo.ui.PivotConfiguratorV2) {

        kendo.ui.PivotConfiguratorV2.prototype.options.messages =
            $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
                "title": "تنظیمات",
                "cancelButtonText": "لغو",
                "applyButtonText": "اعمال",
                "measures": "فیلدها را برای شروع انتخاب کنید",
                "columns": "فیلدها را برای شروع انتخاب کنید",
                "rows": "فیلدها را برای شروع انتخاب کنید"
            });

    }

    /* PivotFieldMenuV2 messages */

    if (kendo.ui.PivotFieldMenuV2) {

        kendo.ui.PivotFieldMenuV2.prototype.options.messages =
            $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
                "apply": "اعمال",
                "sortAscending": "صعودی",
                "sortDescending": "نزولی",
                "filterFields": "فیلتر فیلدها",
                "filter": "فیلتر",
                "include": "شامل فیلدها...",
                "clear": "پاک کردن",
                "reset": "بازنشانی",
                "moveToColumns": "انتقال به ستون‌ها",
                "moveToRows": "انتقال به ردیف‌ها",
                "movePrevious": "عقب",
                "moveNext": "جلو",
                "filterOperatorsDropDownLabel": "عملگرهای فیلتر",
                "filterValueTextBoxLabel": "مقدار فیلتر",
                "operators": {
                    "contains": "شامل",
                    "doesnotcontain": "شامل نمی‌شود",
                    "startswith": "شروع با",
                    "endswith": "پایان با",
                    "eq": "برابر با",
                    "neq": "نابرابر با"
                }
            });

    }

    /* MobileRecurrenceEditor messages */

    if (kendo.ui.MobileRecurrenceEditor) {

        kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
            $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
                "cancel": "لغو",
                "update": "ذخیره",
                "endTitle": "پایان تکرار",
                "repeatTitle": "الگوی تکرار",
                "headerTitle": "تکرار رویداد",
                "end": {
                    "never": "هرگز",
                    "after": "بعد از",
                    "on": "در تاریخ"
                },
                "daily": {
                    "interval": "روز"
                },
                "weekly": {
                    "interval": "هفته"
                },
                "monthly": {
                    "interval": "ماه",
                    "repeatBy": "تکرار بر اساس: ",
                    "dayOfMonth": "روز ماه",
                    "dayOfWeek": "روز هفته"
                },
                "yearly": {
                    "interval": "سال",
                    "repeatBy": "تکرار بر اساس: ",
                    "dayOfMonth": "روز ماه",
                    "dayOfWeek": "روز هفته",
                    "of": " از "
                },
                "endRule": {
                    "after": " بار",
                    "on": "در تاریخ "
                }
            });

    }

    /* ListBox messaages */

    if (kendo.ui.ListBox) {

        kendo.ui.ListBox.prototype.options.messages =
            $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
                "tools": {
                    "remove": "حذف",
                    "moveUp": "بالا",
                    "moveDown": "پایین",
                    "transferTo": "انتقال به",
                    "transferFrom": "انتقال از",
                    "transferAllTo": "انتقال همه به",
                    "transferAllFrom": "انتقال همه از"
                }
            });

    }

    /* kendo.ui.progress method */

    if (kendo.ui.progress) {

        kendo.ui.progress.messages =
            $.extend(true, kendo.ui.progress.messages, {
                "loading": "در حال بارگذاری..."
            });

    }

    /* TimePicker */

    if (kendo.ui.TimePicker) {

        kendo.ui.TimePicker.prototype.options.messages =
            $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
                "set": "تنظیم",
                "cancel": "لغو",
                "hour": "ساعت",
                "minute": "دقیقه",
                "second": "ثانیه",
                "millisecond": "میلی‌ثانیه",
                "now": "اکنون"
            });

    }

    /* DateTimePicker */

    if (kendo.ui.DateTimePicker) {

        kendo.ui.DateTimePicker.prototype.options.messages =
            $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
                "set": "تنظیم",
                "cancel": "لغو",
                "hour": "ساعت",
                "minute": "دقیقه",
                "second": "ثانیه",
                "millisecond": "میلی‌ثانیه",
                "now": "اکنون",
                "date": "تاریخ",
                "time": "زمان",
                "today": "امروز",
                "weekColumnHeader": ""
            });

    }

    /* Calendar */

    if (kendo.ui.Calendar) {

        kendo.ui.Calendar.prototype.options.messages =
            $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
                "weekColumnHeader": "",
                "today": "امروز",
                "navigateTo": "رفتن به: ",
                "parentViews": {
                    "month": "نمای سالانه",
                    "year": "نمای دهه",
                    "decade": "نمای قرن"
                }
            });

    }

    /* DateInput */

    if (kendo.ui.DateInput) {

        kendo.ui.DateInput.prototype.options.messages =
            $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
                "year": "سال",
                "month": "ماه",
                "day": "روز",
                "weekday": "روز هفته",
                "hour": "ساعت",
                "minute": "دقیقه",
                "second": "ثانیه",
                "dayperiod": "ق.ظ/ب.ظ"
            });

    }

    /* List messages */

    if (kendo.ui.List) {

        kendo.ui.List.prototype.options.messages =
            $.extend(true, kendo.ui.List.prototype.options.messages, {
                "clear": "پاک کردن",
                "noData": "داده‌ای یافت نشد."
            });

    }

    /* DropDownTree messages */

    if (kendo.ui.DropDownTree) {

        kendo.ui.DropDownTree.prototype.options.messages =
            $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
                "clear": "پاک کردن",
                "noData": "داده‌ای یافت نشد.",
                "singleTag": "مورد انتخاب شده"
            });

    }

    /* MultiSelect messages */

    if (kendo.ui.MultiSelect) {

        kendo.ui.MultiSelect.prototype.options.messages =
            $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
                "clear": "پاک کردن",
                "noData": "داده‌ای یافت نشد.",
                "singleTag": "مورد انتخاب شده"
            });

    }

    /* Chat messages */

    if (kendo.ui.Chat) {

        kendo.ui.Chat.prototype.options.messages =
            $.extend(true, kendo.ui.Chat.prototype.options.messages, {
                "placeholder": "پیام خود را وارد کنید...",
                "toggleButton": "تغییر نوار ابزار",
                "sendButton": "ارسال"
            });

    }

    /* Wizard messages */

    if (kendo.ui.Wizard) {

        kendo.ui.Wizard.prototype.options.messages =
            $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
                "reset": "بازنشانی",
                "previous": "قبلی",
                "next": "بعدی",
                "done": "انجام",
                "step": "مرحله",
                "of": "از"
            });

    }

    /* PDFViewer messages */

    if (kendo.ui.PDFViewer) {

        kendo.ui.PDFViewer.prototype.options.messages =
            $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
                "defaultFileName": "سند",
                "toolbar": {
                    "zoom": {
                        "zoomLevel": "سطح بزرگنمایی",
                        "zoomOut": "کوچک‌نمایی",
                        "zoomIn": "بزرگنمایی",
                        "actualWidth": "عرض واقعی",
                        "autoWidth": "عرض خودکار",
                        "fitToWidth": "متناسب با عرض",
                        "fitToPage": "متناسب با صفحه"
                    },
                    "open": "باز کردن",
                    "exportAs": "خروجی",
                    "download": "دانلود",
                    "pager": {
                        "first": "رفتن به اولین صفحه",
                        "previous": "رفتن به صفحه قبلی",
                        "next": "رفتن به صفحه بعدی",
                        "last": "رفتن به آخرین صفحه",
                        "of": "از",
                        "page": "صفحه",
                        "pages": "صفحه"
                    },
                    "print": "چاپ",
                    "toggleSelection": "انتخاب",
                    "togglePan": "جابجایی",
                    "search": "جستجو"
                },
                "errorMessages": {
                    "notSupported": "فقط فایل‌های PDF پشتیبانی می‌شوند.",
                    "parseError": "فایل PDF قابل پردازش نیست.",
                    "notFound": "فایل یافت نشد.",
                    "popupBlocked": "پنجره بازشو توسط مرورگر مسدود شده است."
                }
            });

    }

    /* Captcha messages */

    if (kendo.ui.Captcha) {

        kendo.ui.Captcha.prototype.options.messages =
            $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
                "reset": "بازسازی captcha",
                "audio": "پخش صدای captcha",
                "imageAlt": "متن تصویر captcha را وارد کنید",
                "success": "تایید موفقیت‌آمیز بود"
            });

    }

    /* OrgChart messages */

    if (kendo.ui.OrgChart) {

        kendo.ui.OrgChart.prototype.options.messages =
            $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
                "label": "نمودار سازمانی",
                "edit": "ویرایش",
                "create": "ایجاد",
                "destroy": "حذف",
                "destroyContent": "آیا مطمئنید که می‌خواهید این مورد و زیرمجموعه‌های آن را حذف کنید؟",
                "destroyTitle": "حذف مورد",
                "cancel": "لغو",
                "save": "ذخیره",
                "menuLabel": "منوی ویرایش",
                "uploadAvatar": "بارگذاری تصویر جدید",
                "parent": "والد",
                "name": "نام",
                "title": "عنوان",
                "none": "--هیچ--",
                "expand": "باز کردن",
                "collapse": "بستن"
            });

    }

    /* Map messages */

    if (kendo.dataviz.ui.Map) {

        kendo.dataviz.ui.Map.prototype.options.messages =
            $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
                "tileTitle": "عنوان نقشه"
            });

    }

    /* Sankey messages */

    if (kendo.dataviz.ui.Sankey) {

        kendo.dataviz.ui.Sankey.prototype.options.messages =
            $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
                "tooltipUnits": "{0} واحد"
            });

    }

    /* Chart messages */

    if (kendo.dataviz.ui.Chart) {

        kendo.dataviz.ui.Chart.prototype.options.messages =
            $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
                "noData": "داده‌ای در دسترس نیست"
            });

    }

  /* Dialog */

  if (kendo.ui.Dialog) {
    kendo.ui.Dialog.prototype.options.localization =
      $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
        "close": "بستن"
      });
  }

  /* Alert */

  if (kendo.ui.Alert) {
    kendo.ui.Alert.prototype.options.localization =
      $.extend(true, kendo.ui.Alert.prototype.options.localization, {
        "okText": "تأیید"
      });
  }

  /* Confirm */

  if (kendo.ui.Confirm) {
    kendo.ui.Confirm.prototype.options.localization =
      $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
        "okText": "تأیید",
        "cancel": "لغو"
      });
  }

  /* Prompt */

  if (kendo.ui.Prompt) {
    kendo.ui.Prompt.prototype.options.localization =
      $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
        "okText": "تأیید",
        "cancel": "لغو"
      });
  }

  /* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "همه حاشیه‌ها",
  "insideBorders": "حاشیه‌های داخلی",
  "insideHorizontalBorders": "حاشیه‌های افقی داخلی",
  "insideVerticalBorders": "حاشیه‌های عمودی داخلی",
  "outsideBorders": "حاشیه‌های بیرونی",
  "leftBorder": "حاشیه چپ",
  "topBorder": "حاشیه بالا",
  "rightBorder": "حاشیه راست",
  "bottomBorder": "حاشیه پایین",
  "noBorders": "بدون حاشیه",
  "reset": "بازنشانی رنگ",
  "customColor": "رنگ سفارشی...",
  "apply": "اعمال",
  "cancel": "لغو"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "اعمال",
  "save": "ذخیره",
  "cancel": "لغو",
  "remove": "حذف",
  "retry": "تلاش مجدد",
  "revert": "بازگشت",
  "okText": "تأیید",
  "formatCellsDialog": {
    "title": "قالب",
    "categories": {
      "number": "عدد",
      "currency": "ارز",
      "date": "تاریخ"
    }
  },
  "fontFamilyDialog": { "title": "قلم" },
  "fontSizeDialog": { "title": "اندازه قلم" },
  "bordersDialog": { "title": "حاشیه‌ها" },
  "alignmentDialog": {
    "title": "ترازبندی",
    "buttons": {
      "justifyLeft": "تراز چپ",
      "justifyCenter": "وسط‌چین",
      "justifyRight": "تراز راست",
      "justifyFull": "تراز دوطرفه",
      "alignTop": "تراز بالا",
      "alignMiddle": "تراز وسط",
      "alignBottom": "تراز پایین"
    }
  },
  "mergeDialog": {
    "title": "ادغام سلول‌ها",
    "buttons": {
      "mergeCells": "ادغام همه",
      "mergeHorizontally": "ادغام افقی",
      "mergeVertically": "ادغام عمودی",
      "unmerge": "لغو ادغام"
    }
  },
  "freezeDialog": {
    "title": "ثابت کردن پنجره‌ها",
    "buttons": {
      "freezePanes": "ثابت کردن پنجره‌ها",
      "freezeRows": "ثابت کردن سطرها",
      "freezeColumns": "ثابت کردن ستون‌ها",
      "unfreeze": "آزاد کردن پنجره‌ها"
    }
  },
  "confirmationDialog": {
    "text": "آیا مطمئن هستید که می‌خواهید این برگه را حذف کنید؟",
    "title": "حذف برگه"
  },
  "validationDialog": {
    "title": "اعتبارسنجی داده‌ها",
    "hintMessage": "لطفاً یک مقدار معتبر {0} {1} وارد کنید.",
    "hintTitle": "اعتبارسنجی {0}",
    "criteria": {
      "any": "هر مقداری",
      "number": "عدد",
      "text": "متن",
      "date": "تاریخ",
      "custom": "فرمول سفارشی",
      "list": "لیست"
    },
    "comparers": {
      "greaterThan": "بزرگتر از",
      "lessThan": "کوچکتر از",
      "between": "بین",
      "notBetween": "نه بین",
      "equalTo": "مساوی با",
      "notEqualTo": "نابرابر با",
      "greaterThanOrEqualTo": "بزرگتر یا مساوی",
      "lessThanOrEqualTo": "کوچکتر یا مساوی"
    },
    "comparerMessages": {
      "greaterThan": "بزرگتر از {0}",
      "lessThan": "کوچکتر از {0}",
      "between": "بین {0} و {1}",
      "notBetween": "نه بین {0} و {1}",
      "equalTo": "مساوی با {0}",
      "notEqualTo": "نابرابر با {0}",
      "greaterThanOrEqualTo": "بزرگتر یا مساوی {0}",
      "lessThanOrEqualTo": "کوچکتر یا مساوی {0}",
      "custom": "که فرمول را برآورده کند: {0}"
    },
    "labels": {
      "criteria": "معیار",
      "comparer": "مقایسه‌گر",
      "min": "حداقل",
      "max": "حداکثر",
      "value": "مقدار",
      "start": "شروع",
      "end": "پایان",
      "onInvalidData": "در صورت داده نامعتبر",
      "rejectInput": "رد ورودی",
      "showWarning": "نمایش هشدار",
      "showHint": "نمایش راهنما",
      "hintTitle": "عنوان راهنما",
      "hintMessage": "پیام راهنما",
      "ignoreBlank": "نادیده گرفتن خالی‌ها"
    },
    "placeholders": {
      "typeTitle": "عنوان را وارد کنید",
      "typeMessage": "پیام را وارد کنید"
    }
  },
  "exportAsDialog": {
    "title": "صدور...",
    "labels": {
      "fileName": "نام فایل",
      "saveAsType": "نوع فایل",
      "exportArea": "صدور",
      "paperSize": "اندازه کاغذ",
      "margins": "حاشیه‌ها",
      "orientation": "جهت",
      "print": "چاپ",
      "guidelines": "خطوط راهنما",
      "center": "مرکز",
      "horizontally": "افقی",
      "vertically": "عمودی"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "امکان تغییر بخشی از سلول ادغام‌شده وجود ندارد."
  },
  "useKeyboardDialog": {
    "title": "کپی و جایگذاری",
    "errorMessage": "این عملیات‌ها از طریق منو قابل انجام نیستند. لطفاً از میانبرهای صفحه‌کلید استفاده کنید:",
    "labels": {
      "forCopy": "برای کپی",
      "forCut": "برای برش",
      "forPaste": "برای جایگذاری"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "این عملیات روی انتخاب چندگانه قابل انجام نیست."
  },
  "insertCommentDialog": {
    "title": "درج یادداشت",
    "labels": {
      "comment": "یادداشت",
      "removeComment": "حذف یادداشت"
    }
  },
  "insertImageDialog": {
    "title": "درج تصویر",
    "info": "تصویر را اینجا بکشید یا برای انتخاب کلیک کنید",
    "typeError": "لطفاً یک تصویر JPEG، PNG یا GIF انتخاب کنید"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "مرتب‌سازی از الف تا ی",
  "sortDescending": "مرتب‌سازی از ی تا الف",
  "filterByValue": "فیلتر بر اساس مقدار",
  "filterByCondition": "فیلتر بر اساس شرط",
  "apply": "اعمال",
  "search": "جستجو",
  "addToCurrent": "افزودن به انتخاب فعلی",
  "clear": "پاک کردن",
  "blanks": "(خالی)",
  "operatorNone": "هیچ",
  "and": "و",
  "or": "یا",
  "operators": {
    "string": {
      "contains": "متن شامل",
      "doesnotcontain": "متن شامل نیست",
      "startswith": "متن شروع می‌شود با",
      "endswith": "متن پایان می‌یابد با"
    },
    "date": {
      "eq": "تاریخ برابر است با",
      "neq": "تاریخ برابر نیست با",
      "lt": "تاریخ قبل از",
      "gt": "تاریخ بعد از"
    },
    "number": {
      "eq": "مساوی است با",
      "neq": "مساوی نیست با",
      "gte": "بزرگتر یا مساوی",
      "gt": "بزرگتر از",
      "lte": "کوچکتر یا مساوی",
      "lt": "کوچکتر از"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "بازنشانی رنگ",
  "customColor": "رنگ سفارشی...",
  "apply": "اعمال",
  "cancel": "لغو"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "افزودن ستون در چپ",
  "addColumnRight": "افزودن ستون در راست",
  "addRowAbove": "افزودن سطر در بالا",
  "addRowBelow": "افزودن سطر در پایین",
  "alignment": "ترازبندی",
  "alignmentButtons": {
    "justifyLeft": "تراز چپ",
    "justifyCenter": "وسط‌چین",
    "justifyRight": "تراز راست",
    "justifyFull": "تراز دوطرفه",
    "alignTop": "تراز بالا",
    "alignMiddle": "تراز وسط",
    "alignBottom": "تراز پایین"
  },
  "backgroundColor": "رنگ پس‌زمینه",
  "bold": "پررنگ",
  "borders": "حاشیه‌ها",
  "colorPicker": {
    "reset": "بازنشانی رنگ",
    "customColor": "رنگ سفارشی..."
  },
  "copy": "کپی",
  "cut": "برش",
  "deleteColumn": "حذف ستون",
  "deleteRow": "حذف سطر",
  "excelImport": "وارد کردن از اکسل...",
  "filter": "فیلتر",
  "fontFamily": "قلم",
  "fontSize": "اندازه قلم",
  "format": "قالب سفارشی...",
  "formatTypes": {
    "automatic": "خودکار",
    "number": "عدد",
    "percent": "درصد",
    "financial": "مالی",
    "currency": "ارز",
    "date": "تاریخ",
    "time": "زمان",
    "dateTime": "تاریخ و زمان",
    "duration": "مدت",
    "moreFormats": "قالب‌های بیشتر..."
  },
  "formatDecreaseDecimal": "کاهش اعشار",
  "formatIncreaseDecimal": "افزایش اعشار",
  "freeze": "ثابت کردن پنجره‌ها",
  "freezeButtons": {
    "freezePanes": "ثابت کردن پنجره‌ها",
    "freezeRows": "ثابت کردن سطرها",
    "freezeColumns": "ثابت کردن ستون‌ها",
    "unfreeze": "آزاد کردن پنجره‌ها"
  },
  "insertComment": "درج یادداشت",
  "insertImage": "درج تصویر",
  "italic": "کج",
  "merge": "ادغام سلول‌ها",
  "mergeButtons": {
    "mergeCells": "ادغام همه",
    "mergeHorizontally": "ادغام افقی",
    "mergeVertically": "ادغام عمودی",
    "unmerge": "لغو ادغام"
  },
  "open": "باز کردن...",
  "paste": "جایگذاری",
  "quickAccess": {
    "redo": "انجام مجدد",
    "undo": "بازگشت"
  },
  "saveAs": "ذخیره به عنوان...",
  "sortAsc": "مرتب‌سازی صعودی",
  "sortDesc": "مرتب‌سازی نزولی",
  "sortButtons": {
    "sortSheetAsc": "مرتب‌سازی برگه از الف تا ی",
    "sortSheetDesc": "مرتب‌سازی برگه از ی تا الف",
    "sortRangeAsc": "مرتب‌سازی محدوده از الف تا ی",
    "sortRangeDesc": "مرتب‌سازی محدوده از ی تا الف"
  },
  "textColor": "رنگ متن",
  "textWrap": "شکستن متن",
  "underline": "زیرخط",
  "validation": "اعتبارسنجی داده‌ها..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "nameBox": "کادر نام",
  "formulaInput": "ورودی فرمول",
  "errors": {
    "shiftingNonblankCells": "به دلیل احتمال از دست رفتن داده‌ها، امکان درج سلول وجود ندارد. مکان دیگری انتخاب کنید یا داده‌ها را از انتهای برگه حذف کنید.",
    "filterRangeContainingMerges": "امکان ایجاد فیلتر در محدوده‌ای که شامل سلول‌های ادغام‌شده است وجود ندارد",
    "validationError": "مقدار واردشده قوانین اعتبارسنجی سلول را نقض می‌کند."
  },
  "tabs": {
    "home": "خانه",
    "insert": "درج",
    "data": "داده‌ها"
  },
  "sheetBar": {
    "addSheet": "افزودن برگه جدید",
    "deleteSheet": "حذف",
    "duplicateSheet": "تکرار",
    "renameSheet": "تغییر نام",
    "hideSheet": "پنهان",
    "moveRight": "انتقال به راست",
    "moveLeft": "انتقال به چپ"
  }
});
}

  /* SmartBox messages */

  if (kendo.ui.SmartBox) {
    kendo.ui.SmartBox.prototype.options.messages =
      $.extend(true, kendo.ui.SmartBox.prototype.options.messages, {
        "noPreviousSearches": "جستجوی قبلی وجود ندارد",
        "noPreviousPrompts": "درخواست قبلی وجود ندارد",
        "previousSearches": "جستجوهای قبلی",
        "previousPrompts": "درخواست‌های قبلی",
        "suggestedPrompts": "درخواست‌های پیشنهادی",
        "searchModeLabel": "جستجو",
        "searchModeDescription": "تطابق دقیق کلمات را در داده‌های شما جستجو می‌کند",
        "searchPlaceholder": "جستجو",
        "semanticSearchModeLabel": "جستجوی معنایی",
        "semanticSearchModeDescription": "متن را درک کرده و مرتبط‌ترین نتایج را نمایش می‌دهد.",
        "semanticSearchPlaceholder": "جستجوی معنایی",
        "semanticSearchButtonText": "جستجو",
        "aiAssistantPlaceholder": "مرتب‌سازی، فیلتر یا گروه‌بندی با هوش مصنوعی",
        "speechToText": "تبدیل گفتار به متن",
        "speechToTextAriaLabel": "شروع شناسایی گفتار",
        "cancel": "لغو",
        "send": "ارسال",
        "searchButtonText": "جستجو",
        "aiAssistantButtonText": "دستیار هوش مصنوعی"
      });
  }

})(window.kendo.jQuery);
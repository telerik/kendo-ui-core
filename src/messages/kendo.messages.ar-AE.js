(function($, undefined) {
    /* FlatColorPicker messages  */

    if (kendo.ui.FlatColorPicker) {
        kendo.ui.FlatColorPicker.prototype.options.messages =
            $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
                "apply": "تطبيق",
                "cancel": "تراجع",
                "noColor": "بلا لون",
                "clearColor": "إزالة اللون"
            });
    }

    /* ColorPicker messages */

    if (kendo.ui.ColorPicker) {
        kendo.ui.ColorPicker.prototype.options.messages =
            $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
                "apply": "تطبيق",
                "cancel": "تراجع",
                "noColor": "بدون لون",
                "clearColor": "إزالة اللون"
            });
    }

    /* ColumnMenu messages */

    if (kendo.ui.ColumnMenu) {
        kendo.ui.ColumnMenu.prototype.options.messages =
            $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
                "sortAscending": "ترتيب تصاعدي",
                "sortDescending": "ترتيب تنازلي",
                "filter": "فرز",
                "column": "عمود",
                "columns": "أعمدة",
                "columnVisibility": "ظهور العمود",
                "clear": "مسح",
                "cancel": "تراجع",
                "done": "تم",
                "settings": "تعديل إعدادات العمود",
                "lock": "قفل العمود",
                "unlock": "الغاء قفل العمود",
                "stick": "تثبيت العامود",
                "unstick": "تراجع تثبيت العمود",
                "setColumnPosition": "تعيين موضع العمود",
                "apply": "تطبيق",
                "reset": "إعادة ضبط",
                "buttonTitle": "{0} تعديل إعدادات العمود"
            });
    }

    /* DateRangePicker messages */

    if (kendo.ui.DateRangePicker) {
        kendo.ui.DateRangePicker.prototype.options.messages =
            $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
                "startLabel": "بداية",
                "endLabel": "نهاية"
            });
    }

    /* Editor messages */

    if (kendo.ui.Editor) {
        kendo.ui.Editor.prototype.options.messages =
            $.extend(true, kendo.ui.Editor.prototype.options.messages, {
                "bold": "سميك",
                "italic": "مائل",
                "underline": "تحته خط",
                "strikethrough": "يتوسطّه خط",
                "superscript": "حرف علوي",
                "subscript": "حرف سفلي",
                "justifyCenter": "محاذاة في المنتصف",
                "justifyLeft": "محاذاة النص إلى اليسار",
                "justifyRight": "محاذاة النص إلى اليمين",
                "justifyFull": "محاذاة",
                "insertUnorderedList": "إدراج قائمة غير مرتبة",
                "insertOrderedList": "إدراج قائمة مرتبة",
                "indent": "مسافة بادئة",
                "outdent": "الهامش الخارجي",
                "createLink": "إدراج رابط",
                "unlink": "إزالة الرابط",
                "insertImage": "إدراج صورة",
                "insertFile": "إدراج ملف",
                "insertHtml": "HTML إدراج",
                "viewHtml": "HTML عرض",
                "fontName": "اختر مجموعة الخطوط",
                "fontNameInherit": "(نوع الخط)",
                "fontSize": "اختر حجم الخط",
                "fontSizeInherit": "(حجم الخط)",
                "formatBlock": "تنسيق",
                "formatting": "تنسيق",
                "foreColor": "لون",
                "backColor": "لون الخلفية",
                "style": "أنماط",
                "emptyFolder": "مجلد فارغ",
                "uploadFile": "رفع",
                "overflowAnchor": "أدوات أكثر",
                "orderBy": "ترتيب بواسطة:",
                "orderBySize": "الحجم",
                "orderByName": "الاسم",
                "invalidFileType": "الملف المحدد \"{0}\" غير صالح. أنواع الملفات المدعومة هي {1}.",
                "deleteFile": "هل أنت متأكد من حذف الملف '{0}'؟",
                "overwriteFile": "يوجد ملف باسم \"{0}\" بالفعل في الدليل الحالي. هل تريد استبداله؟",
                "directoryNotFound": "لم يتم العثور على دليل بهذا الاسم.",
                "imageWebAddress": "عنوان صفحة الإنترنت",
                "imageAltText": "نص بديل",
                "imageWidth": "العرض (بكسل)",
                "imageHeight": "الارتفاع (بكسل)",
                "fileWebAddress": "عنوان صفحة الإنترنت",
                "fileTitle": "عنوان",
                "linkWebAddress": "عنوان صفحة الإنترنت",
                "linkText": "نص",
                "linkToolTip": "تلميح",
                "linkOpenInNewWindow": "فتح الرابط في نافذة جديدة",
                "dialogUpdate": "تحديث",
                "dialogInsert": "إدراج",
                "dialogButtonSeparator": "أو",
                "dialogCancel": "تراجع",
                "cleanFormatting": "إزالة التنسيق",
                "createTable": "أنشيء جدول",
                "addColumnLeft": "أضف عمود إلي اليسار",
                "addColumnRight": "أضف عمود إلي اليمين",
                "addRowAbove": "أضف صف إلي الأعلي",
                "addRowBelow": "أضف صف إلي الأسفل",
                "deleteRow": "حذف صف",
                "deleteColumn": "حذف عمود",
                "dialogOk": "حسنًا",
                "tableWizard": "معالج الجداول",
                "tableTab": "جدول",
                "cellTab": "خلية",
                "accessibilityTab": "إمكانية الوصول",
                "caption": "وصف",
                "summary": "ملخص",
                "width": "العرض",
                "height": "ارتفاع",
                "units": "الوحدات",
                "cellSpacing": "تباعد الخلايا",
                "cellPadding": "نطاق الخلية",
                "cellMargin": "هامش الخلية",
                "alignment": "المحاذاة",
                "background": "الخلفية",
                "cssClass": "فئة ال CSS",
                "id": "ID",
                "border": "إطار",
                "borderStyle": "نمط الإطار",
                "collapseBorders": "تصغير الحدود",
                "wrapText": "التفاف النص",
                "associateCellsWithHeaders": "رؤوس مقترنة",
                "alignLeft": "محاذاة إلى اليسار",
                "alignCenter": "محاذاة إلى المنتصف",
                "alignRight": "محاذاة إلى اليمين",
                "alignLeftTop": "محاذاة إلى أعلى اليسار",
                "alignCenterTop": "محاذاة إلي أعلي المنتصف",
                "alignRightTop": "محاذاة إلى أعلى اليمين",
                "alignLeftMiddle": "محاذاة إلى وسط اليسار",
                "alignCenterMiddle": "محاذاة إلي وسط المنتصف",
                "alignRightMiddle": "محاذاة إلى وسط اليمين",
                "alignLeftBottom": "محاذاة إلى أسفل اليسار",
                "alignCenterBottom": "محاذاة إلى أسفل المنتصف",
                "alignRightBottom": "محاذاة إلى أسفل اليمين",
                "alignRemove": "إزالة المحاذاة",
                "columns": "الأعمدة",
                "rows": "صفوف",
                "selectAllCells": "تحديد كل الخلايا",
                "print": "طباعة",
                "headerRows": "رأس الصفوف",
                "headerColumns": "رأس الاعمدة",
                "tableSummaryPlaceholder": "سمة الملخص غير متوافقة مع HTML5.",
                "associateNone": "لا شيء",
                "associateScope": "اقتران باستخدام سمة \"النطاق\"",
                "associateIds": "اقتران باستخدام المعرفات",
                "copyFormat": "نسخ التنسيق",
                "applyFormat": "تطبيق التنسيق",
                "borderNone": "لا شيء"
            });
    }

    /* FileBrowser messages */

    if (kendo.ui.FileBrowser) {
        kendo.ui.FileBrowser.prototype.options.messages =
            $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
                "uploadFile": "رفع",
                "orderBy": "ترتيب بواسطة",
                "orderByName": "الاسم",
                "orderBySize": "الحجم",
                "directoryNotFound": "لم يتم العثور على مسار بهذا الاسم.",
                "emptyFolder": "مجلد فارغ",
                "deleteFile": "هل أنت متأكد من حذف '{0}'؟",
                "invalidFileType": "الملف \"{0}\" غير صالح، أنواع الملفات المدعومة هي {1}.",
                "overwriteFile": "الملف باسم \"{0}\" موجود بالفعل في المسار. هل تريد استبداله؟",
                "dropFilesHere": "قم بسحب الملف هنا لرفعه",
                "search": "بحث"
            });
    }

    /* FileManager messages */

    if (kendo.ui.FileManager) {
        kendo.ui.FileManager.prototype.options.messages =
            $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
                toolbar: {
                    createFolder: "مجلد جديد",
                    upload: "رفع",
                    sortDirection: "ترتيب",
                    sortDirectionAsc: "ترتيب تصاعدي",
                    sortDirectionDesc: "ترتيب تنازلي",
                    sortField: "ترتيب بواسطة",
                    nameField: "الاسم",
                    sizeField: "حجم الملف",
                    typeField: "النوع",
                    dateModifiedField: "تاريخ التعديل",
                    dateCreatedField: "تاريخ الإنشاء",
                    listView: "عرض القائمة",
                    gridView: "عرض شبكي",
                    search: "بحث",
                    details: "عرض التفاصيل",
                    detailsChecked: "محدد",
                    detailsUnchecked: "غير محدد",
                    "delete": "حذف",
                    rename: "إعادة التسمية"
                },
                views: {
                    nameField: "الاسم",
                    sizeField: "حجم الملف",
                    typeField: "النوع",
                    dateModifiedField: "تاريخ التعديل",
                    dateCreatedField: "تاريخ الإنشاء",
                    items: "العناصر"
                },
                dialogs: {
                    upload: {
                        title: "رفع الملفات",
                        clear: "إزالة القائمة",
                        done: "تم"
                    },
                    moveConfirm: {
                        title: "تأكيد النسخ أو النقل",
                        content: "<p class='k-text-center'>هل أنت متأكد من إتمام النسخ أو الحذف؟</p>",
                        okText: "نسخ",
                        cancel: "نقل",
                        close: "إغلاق"
                    },
                    deleteConfirm: {
                        title: "تأكيد الحذف",
                        content: "<p class='k-text-center'>هل أنت متأكد من حذف الملفات المحددة؟?<br/>لا يمكنك التراجع عن هذا الإجراء.</p>",
                        okText: "حذف",
                        cancel: "تراجع",
                        close: "إغلاق"
                    },
                    renamePrompt: {
                        title: "إعادة التسمية",
                        content: "<p class='k-text-center'>أدخل اسم ملف جديد</p>",
                        okText: "إعادة التسمية",
                        cancel: "تراجع",
                        close: "إغلاق"
                    }
                },
                previewPane: {
                    noFileSelected: "لم يتم اختيار أي ملف",
                    extension: "النوع",
                    size: "الحجم",
                    created: "تاريخ الإنشاء",
                    createdUtc: "تاريخ الإنشاء (UTC)",
                    modified: "تاريخ التعديل",
                    modifiedUtc: "تاريخ التعديل (UTC)",
                    items: "العناصر"
                }
            });
    }

    /* FilterCell messages */

    if (kendo.ui.FilterCell) {
        kendo.ui.FilterCell.prototype.options.messages =
            $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
                "isTrue": "صحيح",
                "isFalse": "خطأ",
                "filter": "فرز",
                "clear": "إزالة",
                "operator": "عامل"
            });
    }

    /* FilterCell operators */

    if (kendo.ui.FilterCell) {
        kendo.ui.FilterCell.prototype.options.operators =
            $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
                "string": {
                    "eq": "يساوي",
                    "neq": "لا يساوي",
                    "startswith": "يبدأ بـ",
                    "contains": "يتضمن",
                    "doesnotcontain": "لا يتضمن",
                    "endswith": "ينتهي بـ",
                    "isnull": "بلا قيمة",
                    "isnotnull": "له قيمة",
                    "isempty": "فارغ",
                    "isnotempty": "ليس فارغا",
                    "isnullorempty": "ليس له قيمة",
                    "isnotnullorempty": "له قيمة"
                },
                "number": {
                    "eq": "يساوي",
                    "neq": "لا يساوي",
                    "gte": "أكبر من أو يساوي",
                    "gt": "أكبر من",
                    "lte": "أقل من أو يساوي",
                    "lt": "أقل من",
                    "isnull": "بلا قيمة",
                    "isnotnull": "له قيمة"
                },
                "date": {
                    "eq": "يساوي",
                    "neq": "لا يساوي",
                    "gte": "بعد أو يساوي",
                    "gt": "بعد",
                    "lte": "قبل أو يساوي",
                    "lt": "قبل",
                    "isnull": "بلا قيمة",
                    "isnotnull": "له قيمة"
                },
                "enums": {
                    "eq": "يساوي",
                    "neq": "لا يساوي",
                    "isnull": "بلا قيمة",
                    "isnotnull": "له قيمة"
                }
            });
    }

    /* FilterMenu messages */

    if (kendo.ui.FilterMenu) {
        kendo.ui.FilterMenu.prototype.options.messages =
            $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
                "info": "إظهار العناصر ذات القيمة التي:",
                "title": "إظهار العناصر ذات القيمة التي",
                "isTrue": "صحيح",
                "isFalse": "خطأ",
                "filter": "فرز",
                "clear": "إزالة",
                "and": "و",
                "or": "أو",
                "selectValue": "-اختر القيمة-",
                "operator": "عامل",
                "value": "قيمة",
                "cancel": "تراجع",
                "done": "تم",
                "into": "في",
                "buttonTitle": "{0} فرز إعدادات العمود"
            });
    }

    /* FilterMenu operator messages */

    if (kendo.ui.FilterMenu) {
        kendo.ui.FilterMenu.prototype.options.operators =
            $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
                "string": {
                    "eq": "يساوي",
                    "neq": "لا يساوي",
                    "startswith": "يبدأ بـ",
                    "contains": "يتضمن",
                    "doesnotcontain": "لا يتضمن",
                    "endswith": "ينتهي ب",
                    "isnull": "بلا قيمة",
                    "isnotnull": "له قيمة",
                    "isempty": "فارغ",
                    "isnotempty": "ليس فارغا",
                    "isnullorempty": "ليس له قيمة",
                    "isnotnullorempty": "له قيمة"
                },
                "number": {
                    "eq": "يساوي",
                    "neq": "لا يساوي",
                    "gte": "أكبر من أو يساوي",
                    "gt": "أكبر من",
                    "lte": "أقل من أو يساوي",
                    "lt": "أقل من",
                    "isnull": "بلا قيمة",
                    "isnotnull": "له قيمة"
                },
                "date": {
                    "eq": "يساوي",
                    "neq": "لا يساوي",
                    "gte": "بعد أو يساوي",
                    "gt": "بعد",
                    "lte": "بعد أو يساوي",
                    "lt": "بعد",
                    "isnull": "بلا قيمة",
                    "isnotnull": "له قيمة"
                },
                "enums": {
                    "eq": "يساوي",
                    "neq": "لا يساوي",
                    "isnull": "بلا قيمة",
                    "isnotnull": "له قيمة"
                }
            });
    }

    /* FilterMultiCheck messages */

    if (kendo.ui.FilterMultiCheck) {
        kendo.ui.FilterMultiCheck.prototype.options.messages =
            $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
                "checkAll": "اختر الكل",
                "clearAll": "إزالة الكل",
                "clear": "إزالة",
                "filter": "فرز",
                "search": "بحث",
                "cancel": "تراجع",
                "selectedItemsFormat": "{0} العناصر المحدّدة",
                "done": "تم",
                "into": "في"
            });
    }

    /* Gantt messages */

    if (kendo.ui.Gantt) {
        kendo.ui.Gantt.prototype.options.messages =
            $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
                "actions": {
                    "addChild": "أضف مخطّط فرعي",
                    "append": "إضافة مهمة",
                    "insertAfter": "أضف إلي الأسفل",
                    "insertBefore": "أضف إلى الأعلى",
                    "pdf": "PDF تصدير إلى ملف"
                },
                "cancel": "تراجع",
                "deleteDependencyWindowTitle": "حذف العلاقة الاعتمادية",
                "deleteTaskWindowTitle": "حذف المهمة",
                "destroy": "حذف",
                "editor": {
                    "assingButton": "تعيين",
                    "editorTitle": "مهمة",
                    "end": "نهاية",
                    "percentComplete": "اكتمال",
                    "plannedStart": "البداية المخطط لها",
                    "plannedEnd": "النهاية المخطط لها",
                    "resources": "موارد",
                    "resourcesEditorTitle": "موارد",
                    "resourcesHeader": "موارد",
                    "start": "بداية",
                    "title": "عنوان",
                    "unitsHeader": "الوحدات"
                },
                "plannedTasks": {
                    "switchText": "المهام المخطط لها",
                    "offsetTooltipAdvanced": "وصل إلى الموعد النهائي مبكرًا",
                    "offsetTooltipDelay": "تأخير",
                    "seconds": "ثواني",
                    "minutes": "دقائق",
                    "hours": "ساعات",
                    "days": "أيام"
                },
                "save": "حفظ",
                "views": {
                    "day": "يوم",
                    "end": "نهاية",
                    "month": "شهر",
                    "start": "بداية",
                    "week": "أسبوع",
                    "year": "سنة"
                }
            });
    }

    /* Grid messages */

    if (kendo.ui.Grid) {
        kendo.ui.Grid.prototype.options.messages =
            $.extend(true, kendo.ui.Grid.prototype.options.messages, {
                "commands": {
                    "cancel": "تراجع التغييرات",
                    "canceledit": "تراجع",
                    "create": "إضافة سجل جديد",
                    "destroy": "حذف",
                    "edit": "تعديل",
                    "excel": "Excel تصدير إلى",
                    "pdf": "تصدير إلى PDF",
                    "save": "حفظ التغييرات",
                    "select": "اختر",
                    "update": "تحديث"
                },
                "editable": {
                    "cancelDelete": "تراجع",
                    "confirmation": "هل أنت متأكد من حذف السجل؟",
                    "confirmDelete": "حذف"
                },
                "noRecords": "لا توجد سجلات متاحة.",
                "search": "بحث...",
                "expandCollapseColumnHeader": "",
                "groupHeader": "ctrl + space لعمل مجموعة اضغط",
                "ungroupHeader": "ctrl + space لتراجع المجموعة اضغط"
            });
    }

    /* TaskBoard messages */

    if (kendo.ui.TaskBoard) {
        kendo.ui.TaskBoard.prototype.options.messages =
            $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
                "edit": "تعديل",
                "createNewCard": "إنشاء بطاقة جديدة",
                "create": "إنشاء",
                "search": "بحث",
                "previewCard": "معاينة البطاقة",
                "addCard": "إضافة بطاقة",
                "editCard": "تعديل البطاقة",
                "deleteCard": "حذف البطاقة",
                "addColumn": "إضافة عمود",
                "editColumn": "تعديل العمود",
                "deleteColumn": "حذف العمود",
                "close": "إغلاق",
                "cancel": "تراجع",
                "delete": "حذف",
                "saveChanges": "حفظ التغييرات",
                "title": "العنوان:",
                "description": "الوصف:",
                "newColumn": "عمود جديد",
                "deleteColumnConfirm": "هل أنت متأكد من حذف هذا العمود؟",
                "deleteCardConfirm": "هل أنت متأكد من حذف البطاقة؟"
            });
    }

    /* TreeList messages */

    if (kendo.ui.TreeList) {
        kendo.ui.TreeList.prototype.options.messages =
            $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                "noRows": "لا توجد سجلات لعرضها",
                "loading": "جار التحميل...",
                "requestFailed": "فشل الطلب.",
                "retry": "أعد المحاولة",
                "commands": {
                    "edit": "تعديل",
                    "update": "تحديث",
                    "canceledit": "تراجع",
                    "create": "إضافة سجل جديد",
                    "createchild": "إضافة سجل فرعي",
                    "destroy": "حذف",
                    "excel": "Excel تصدير إلى",
                    "pdf": "PDF تصدير إلى"
                }
            });
    }

    /* Groupable messages */

    if (kendo.ui.Groupable) {
        kendo.ui.Groupable.prototype.options.messages =
            $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
                "empty": "اسحب رأس العمود وأدرجه هنا للتجميع بواسطة هذا العمود"
            });
    }

    /* NumericTextBox messages */

    if (kendo.ui.NumericTextBox) {
        kendo.ui.NumericTextBox.prototype.options =
            $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
                "upArrowText": "زيادة القيمة",
                "downArrowText": "تقليل القيمة"
            });
    }

    /* MediaPlayer messages */

    if (kendo.ui.MediaPlayer) {
        kendo.ui.MediaPlayer.prototype.options.messages =
            $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
                "pause": "إيقاف مؤقت",
                "play": "تشغيل",
                "mute": "كتم الصوت",
                "unmute": "تراجع كتم الصوت",
                "quality": "الجودة",
                "fullscreen": "تكبير الشاشة"
            });
    }

    /* Pager messages */

    if (kendo.ui.Pager) {
        kendo.ui.Pager.prototype.options.messages =
            $.extend(true, kendo.ui.Pager.prototype.options.messages, {
                "allPages": "الكل",
                "display": "{0} - {1} من {2} عناصر",
                "empty": "لا توجد عناصر لعرضها",
                "page": "صفحة",
                "pageButtonLabel": "صفحة {0}",
                "pageSizeDropDownLabel": "قائمة عدد عناصر الصفحة",
                "of": "من {0}",
                "itemsPerPage": "عناصر كل صفحة",
                "first": "إذهب إلى الصفحة الأولى",
                "previous": "إذهب إلى الصفحة السابقة",
                "next": "إذهب إلى الصفحة التالية",
                "last": "اذهب إلى الصفحة الأخيرة",
                "refresh": "تحديث",
                "morePages": "المزيد من الصفحات"
            });
    }

    /* TreeListPager messages */

    if (kendo.ui.TreeListPager) {
        kendo.ui.TreeListPager.prototype.options.messages =
            $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
                "allPages": "الكل",
                "display": "{0} - {1} of {2} العناصر",
                "empty": "لا يوجد عناصر لعرضها",
                "page": "صفحة",
                "of": "من {0}",
                "itemsPerPage": "عنصر كل صفحة",
                "first": "إذهب إلى صفحة الأولى",
                "previous": "إذهب إلى الصفحة السابقة",
                "next": "إذهب إلى الصفحة التالية",
                "last": "إذهب إلى الصفحة الأخيرة",
                "refresh": "تحديث",
                "morePages": "المزيد من الصفحات"
            });
    }

    /* PivotGrid messages */

    if (kendo.ui.PivotGrid) {
        kendo.ui.PivotGrid.prototype.options.messages =
            $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
                "measureFields": "سحب حقول البيانات هنا",
                "columnFields": "سحب حقول العمود هنا",
                "rowFields": "اسحب حقول الصفوف هنا"
            });
    }

    /* PivotFieldMenu messages */

    if (kendo.ui.PivotFieldMenu) {
        kendo.ui.PivotFieldMenu.prototype.options.messages =
            $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
                "info": "إظهار العناصر ذات القيمة التي:",
                "filterFields": "فرز الحقول",
                "filter": "فرز",
                "include": "تشتمل الحقول...",
                "title": "الحقول التي يجب تضمينها",
                "clear": "إزالة",
                "ok": "حسنا",
                "cancel": "تراجع",
                "operators": {
                    "contains": "يتضمن",
                    "doesnotcontain": "لا يتضمن",
                    "startswith": "يبدأ ب",
                    "endswith": "ينتهي ب",
                    "eq": "يساوي",
                    "neq": "لا يساوي"
                }
            });
    }

    /* RecurrenceEditor messages */

    if (kendo.ui.RecurrenceEditor) {
        kendo.ui.RecurrenceEditor.prototype.options.messages =
            $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                "repeat": "تكرار",
                "recurrenceEditorTitle": "محرر التكرار",
                "frequencies": {
                    "never": "ابداً",
                    "hourly": "كل ساعة",
                    "daily": "يومياً",
                    "weekly": "أسبوعيا",
                    "monthly": "شهرياً",
                    "yearly": "سنوي"
                },
                "hourly": {
                    "repeatEvery": ":تكرار كل",
                    "interval": "ساعة"
                },
                "daily": {
                    "repeatEvery": "تكرار كل:",
                    "interval": "يوم"
                },
                "weekly": {
                    "interval": "أسبوع",
                    "repeatEvery": "تكرار كل:",
                    "repeatOn": "تكرار على:"
                },
                "monthly": {
                    "repeatEvery": "تكرار كل:",
                    "repeatOn": "تكرار على:",
                    "interval": "شهر",
                    "day": "يوم",
                    "date": "تاريخ"
                },
                "yearly": {
                    "repeatEvery": "تكرار كل:",
                    "repeatOn": "كرر على:",
                    "interval": "سنة",
                    "of": "من",
                    "month": "شهر",
                    "day": "يوم",
                    "date": "تاريخ"
                },
                "end": {
                    "label": "النهاية:",
                    "mobileLabel": "ينتهي",
                    "never": "ابدًا",
                    "after": "بعد",
                    "occurrence": "حدث (أحدث)",
                    "on": "تشغيل"
                },
                "offsetPositions": {
                    "first": "الأول",
                    "second": "الثاني",
                    "third": "الثالث",
                    "fourth": "الرابع",
                    "last": "الأخير"
                },
                "weekdays": {
                    "day": "يوم",
                    "weekday": "يوم من أيام الأسبوع",
                    "weekend": "يوم عطلة نهاية الأسبوع"
                }
            });
    }

    /* MobileRecurrenceEditor messages */

    if (kendo.ui.MobileRecurrenceEditor) {
        kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
            $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                "cancel": "تراجع",
                "update": "حفظ",
                "endTitle": "إنهاء التكرار",
                "repeatTitle": "كررّ النمط",
                "headerTitle": "تكرار الحدث",
                "end": {
                    "patterns": {
                        "never": "ابدًا",
                        "after": "بعد...",
                        "on": "تشغيل..."
                    },
                    "never": "ابدًا",
                    "after": "إنهاء التكرار بعد",
                    "on": "إنهاء التكرار عند"
                },
                "daily": {
                    "interval": ""
                },
                "hourly": {
                    "interval": ""
                },
                "weekly": {
                    "interval": ""
                },
                "monthly": {
                    "interval": "",
                    "repeatBy": "تكرار بواسطة:",
                    "dayOfMonth": "يوم من الشهر",
                    "dayOfWeek": "يوم في الأسبوع",
                    "repeatEvery": "تكرار كل",
                    "every": "كل",
                    "day": "يوم"
                },
                "yearly": {
                    "interval": "",
                    "repeatBy": ":تكرار بواسطة",
                    "dayOfMonth": "يوم في الشهر",
                    "dayOfWeek": "يوم في الأسبوع",
                    "repeatEvery": ":تكرار كل",
                    "every": "كل",
                    "month": "شهر",
                    "day": "يوم"
                }
            });
    }

    /* Scheduler messages */

    if (kendo.ui.Scheduler) {
        kendo.ui.Scheduler.prototype.options.messages =
            $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
                "allDay": "طوال اليوم",
                "date": "تاريخ",
                "event": "حدث",
                "time": "وقت",
                "showFullDay": "عرض كامل لليوم",
                "showWorkDay": "عرض ساعات العمل",
                "today": "اليوم",
                "save": "حفظ",
                "cancel": "تراجع",
                "destroy": "حذف",
                "resetSeries": "إعادة ضبط السلسلة",
                "deleteWindowTitle": "حذف الحدث",
                "ariaSlotLabel": "محدد من{0:t} إلى {1:t}",
                "ariaEventLabel": "{0} في{1:D} عند {2:t}",
                "editable": {
                    "confirmation": "هل أنت متأكد من حذف الحدث؟"
                },
                "views": {
                    "day": "يوم",
                    "week": "أسبوع",
                    "workWeek": "أسبوع العمل",
                    "agenda": "جدول الأعمال",
                    "month": "شهر"
                },
                "recurrenceMessages": {
                    "deleteWindowTitle": "حذف العنصر المتكرر",
                    "resetSeriesWindowTitle": "إعادة ضبط السلسلة",
                    "deleteWindowOccurrence": "حذف الحدث الحالي",
                    "deleteWindowSeries": "حذف السلسلة",
                    "deleteRecurringConfirmation": "هل أنت متأكد من حذف هذا الحدث؟",
                    "deleteSeriesConfirmation": "هل أنت متأكد حذف السلسلة بأكملها؟",
                    "editWindowTitle": "تعديل العنصر المتكرر",
                    "editWindowOccurrence": "تعديل الحدث الحالي",
                    "editWindowSeries": "تعديل السلسلة",
                    "deleteRecurring": "هل تريد حذف هذا الحدث فقط أم السلسلة بأكملها؟",
                    "editRecurring": "هل تريد تعديل هذا الحدث فقط أم السلسلة بأكملها؟"
                },
                "editor": {
                    "title": "عنوان",
                    "start": "بدء",
                    "end": "إنهاء",
                    "allDayEvent": "حدث اليوم بأكمله",
                    "description": "وصف",
                    "repeat": "تكرار",
                    "timezone": " ",
                    "startTimezone": "بدء نظام التوقيت",
                    "endTimezone": "إنهاء نظام التوقيت",
                    "separateTimezones": "استخدام مناطق زمنية منفصلة للبدء والانتهاء",
                    "timezoneEditorTitle": "المناطق الزمنية",
                    "timezoneEditorButton": "المنطقة الزمنية",
                    "timezoneTitle": "المناطق الزمنية",
                    "noTimezone": "بلا نظام توقيت",
                    "editorTitle": "حدث"
                },
                "search": "بحث..."
            });
    }

    /* Spreadsheet messages */

    if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
        kendo.spreadsheet.messages.borderPalette =
            $.extend(true, kendo.spreadsheet.messages.borderPalette, {
                "allBorders": "كل الجوانب",
                "insideBorders": "الحدود الداخلية",
                "insideHorizontalBorders": "حدود أفقية داخلية",
                "insideVerticalBorders": "حدود عمودية داخلية",
                "outsideBorders": "الحدود الخارجية",
                "leftBorder": "الحد الأيسر",
                "topBorder": "الحد العلوي",
                "rightBorder": "الحد الأيمن",
                "bottomBorder": "الحد السفلي",
                "noBorders": "بلا حدود",
                "reset": "إعادة تعيين اللون",
                "customColor": "لون مخصّص...",
                "apply": "تطبيق",
                "cancel": "تراجع"
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
        kendo.spreadsheet.messages.dialogs =
            $.extend(true, kendo.spreadsheet.messages.dialogs, {
                "apply": "تطبيق",
                "save": "حفظ",
                "cancel": "تراجع",
                "remove": "حذف",
                "retry": "أعد المحاولة",
                "revert": "تراجع",
                "okText": "حسنًا",
                "formatCellsDialog": {
                    "title": "صيغة",
                    "categories": {
                        "number": "رقم",
                        "currency": "عملة",
                        "date": "تاريخ"
                    }
                },
                "fontFamilyDialog": {
                    "title": "الخط"
                },
                "fontSizeDialog": {
                    "title": "حجم الخط"
                },
                "bordersDialog": {
                    "title": "حدود"
                },
                "alignmentDialog": {
                    "title": "المحاذاة",
                    "buttons": {
                        "justifyLeft": "محاذاة إلى اليسار",
                        "justifyCenter": "وسط",
                        "justifyRight": "محاذاة إلي اليمين",
                        "justifyFull": "ضبط",
                        "alignTop": "محاذاة إلي الأعلي",
                        "alignMiddle": "محاذاة إلي المنتصف",
                        "alignBottom": "محاذاة إلي الأسفل"
                    }
                },
                "mergeDialog": {
                    "title": "دمج الخلايا",
                    "buttons": {
                        "mergeCells": "دمج الكل",
                        "mergeHorizontally": "دمج أفقيًا",
                        "mergeVertically": "دمج رأسيا",
                        "unmerge": "فك الدمج"
                    }
                },
                "freezeDialog": {
                    "title": "تجميد الأجزاء",
                    "buttons": {
                        "freezePanes": "تجميد الأجزاء",
                        "freezeRows": "تجميد الصفوف",
                        "freezeColumns": "تجميد الأعمدة",
                        "unfreeze": "تراجع تجميد الأجزاء"
                    }
                },
                "confirmationDialog": {
                    "text": "هل أنت متأكد من إزالة هذه الورقة؟",
                    "title": "إزالة ورقة"
                },
                "validationDialog": {
                    "title": "تأكيد صحة البيانات",
                    "hintMessage": "الرجاء إدخال قيمة صالحة {0} لقيمة {1}.",
                    "hintTitle": "التحقق {0}",
                    "criteria": {
                        "any": "اي قيمة",
                        "number": "رقم",
                        "text": "نص",
                        "date": "تاريخ",
                        "custom": "صيغة مخصصة",
                        "list": "قائمة"
                    },
                    "comparers": {
                        "greaterThan": "أكثر من",
                        "lessThan": "أقل من",
                        "between": "بين",
                        "notBetween": "ليس بين",
                        "equalTo": "يساوي",
                        "notEqualTo": "لا يساوي",
                        "greaterThanOrEqualTo": "أكبر من أو يساوي",
                        "lessThanOrEqualTo": "اقل من او يساوي"
                    },
                    "comparerMessages": {
                        "greaterThan": "أكبر من {0}",
                        "lessThan": "أقل من {0}",
                        "between": "بين {0} و {1}",
                        "notBetween": "ليس بين {0} و {1}",
                        "equalTo": "يساوي {0}",
                        "notEqualTo": "لا يساوي {0}",
                        "greaterThanOrEqualTo": "أكبر من أو يساوي {0}",
                        "lessThanOrEqualTo": "أصغر من أو يساوي {0}",
                        "custom": "التي تتوافق مع الصيغة: {0}"
                    },
                    "labels": {
                        "criteria": "المعايير العامة",
                        "comparer": "المقارنة",
                        "min": "حد أدنى",
                        "max": "حد أقصى",
                        "value": "قيمة",
                        "start": "بدء",
                        "end": "إنهاء",
                        "onInvalidData": "على بيانات غير صالحة",
                        "rejectInput": "رفض الإدخال",
                        "showWarning": "إظهار التحذير",
                        "showHint": "اظهار التلميح",
                        "hintTitle": "عنوان التلميح",
                        "hintMessage": "رسالة تلميح",
                        "ignoreBlank": "تجاهل الفراغ"
                    },
                    "placeholders": {
                        "typeTitle": "اكتب العنوان",
                        "typeMessage": "اكتب الرسالة"
                    }
                },
                "exportAsDialog": {
                    "title": "تصدير...",
                    "labels": {
                        "fileName": "اسم الملف",
                        "saveAsType": "حفظ كنوع",
                        "exportArea": "تصدير",
                        "paperSize": "حجم الورق",
                        "margins": "الهوامش",
                        "orientation": "توجيه",
                        "print": "طباعة",
                        "guidelines": "القواعد الارشادية",
                        "center": "وسط",
                        "horizontally": "أفقيا",
                        "vertically": "عموديا"
                    }
                },
                "modifyMergedDialog": {
                    "errorMessage": "لا يمكن تغيير جزء من الخلية المدمجة."
                },
                "useKeyboardDialog": {
                    "title": "النسخ واللصق",
                    "errorMessage": "لا يمكن استدعاء هذه الإجراءات من خلال القائمة. الرجاء بدلاً من ذلك استخدام اختصارات لوحة المفاتيح:",
                    "labels": {
                        "forCopy": "للنسخ",
                        "forCut": "للقص",
                        "forPaste": "للصق"
                    }
                },
                "unsupportedSelectionDialog": {
                    "errorMessage": "لا يمكن تنفيذ هذا الإجراء على إختيار من متعدد."
                },
                "insertCommentDialog": {
                    "title": "إضافة تعليق",
                    "labels": {
                        "comment": "تعليق",
                        "removeComment": "حذف تعليق"
                    }
                },
                "insertImageDialog": {
                    "title": "إضافة صورة",
                    "info": "اسحب صورة هنا، أو انقر للاختيار",
                    "typeError": "الرجاء تحديد صورة بتنسيق JPEG أو PNG أو GIF"
                }
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
        kendo.spreadsheet.messages.filterMenu =
            $.extend(true, kendo.spreadsheet.messages.filterMenu, {
                "sortAscending": "نطاق الترتيب من أ إلى ي",
                "sortDescending": "نطاق الترتيب من ي إلى أ",
                "filterByValue": "فرز حسب القيمة",
                "filterByCondition": "فرز حسب الشرط",
                "apply": "تطبيق",
                "search": "بحث",
                "addToCurrent": "أضف إلى الإختيار الحالي",
                "clear": "مسح",
                "blanks": "(فراغات)",
                "operatorNone": "لا شيء",
                "and": "و",
                "or": "أو",
                "operators": {
                    "string": {
                        "contains": "يحتوي النص على",
                        "doesnotcontain": "لا يحتوي النص على",
                        "startswith": "يبدأ النص بـ",
                        "endswith": "ينتهي النص بـ"
                    },
                    "date": {
                        "eq": "التاريخ هو",
                        "neq": "التاريخ ليس",
                        "lt": "التاريخ قبل",
                        "gt": "التاريخ بعد"
                    },
                    "number": {
                        "eq": "يساوي",
                        "neq": "لا يساوي",
                        "gte": "أكبر من أو يساوي",
                        "gt": "أكبر من",
                        "lte": "أصغر من أو يساوي",
                        "lt": "اقل من"
                    }
                }
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
        kendo.spreadsheet.messages.colorPicker =
            $.extend(true, kendo.spreadsheet.messages.colorPicker, {
                "reset": "إعادة تعيين اللون",
                "customColor": "لون مخصّص...",
                "apply": "تطبيق",
                "cancel": "تراجع"
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
        kendo.spreadsheet.messages.toolbar =
            $.extend(true, kendo.spreadsheet.messages.toolbar, {
                "addColumnLeft": "أضف عمود إلى اليسار",
                "addColumnRight": "أضف عمود إلى اليمين",
                "addRowAbove": "أضف صف إلي الأعلي",
                "addRowBelow": "أضف صف إلي الأسفل",
                "alignment": "محاذاة",
                "alignmentButtons": {
                    "justifyLeft": "محاذاة إلي اليسار",
                    "justifyCenter": "وسط",
                    "justifyRight": "محاذاة إلي اليمين",
                    "justifyFull": "ضبط",
                    "alignTop": "محاذاة إلي الأعلي",
                    "alignMiddle": "محاذاة إلي المنتصف",
                    "alignBottom": "محاذاة لأسفل"
                },
                "backgroundColor": "خلفية",
                "bold": "سميك",
                "borders": "حدود",
                "colorPicker": {
                    "reset": "إعادة تعيين اللون",
                    "customColor": "لون مخصص..."
                },
                "copy": "نسخ",
                "cut": "قص",
                "deleteColumn": "حذف عمود",
                "deleteRow": "حذف صف",
                "excelImport": "استيراد من Excel...",
                "filter": "فلتر",
                "fontFamily": "الخط",
                "fontSize": "حجم الخط",
                "format": "تنسيق مخصص...",
                "formatTypes": {
                    "automatic": "أوتوماتيكي",
                    "number": "رقم",
                    "percent": "نسبه مئويه",
                    "financial": "مالي",
                    "currency": "عملة",
                    "date": "تاريخ",
                    "time": "الوقت",
                    "dateTime": "وقت التاريخ",
                    "duration": "مدة",
                    "moreFormats": "المزيد من التنسيقات..."
                },
                "formatDecreaseDecimal": "إنقاص العلامة العشرية",
                "formatIncreaseDecimal": "زيادة العلامة العشرية",
                "freeze": "تجميد الأجزاء",
                "freezeButtons": {
                    "freezePanes": "تجميد الأجزاء",
                    "freezeRows": "تجميد الصفوف",
                    "freezeColumns": "تجميد الأعمدة",
                    "unfreeze": "تراجع تجميد الأجزاء"
                },
                "insertComment": "إضافة تعليق",
                "insertImage": "إضافة صورة",
                "italic": "مائل",
                "merge": "دمج الخلايا",
                "mergeButtons": {
                    "mergeCells": "دمج الكل",
                    "mergeHorizontally": "دمج أفقي",
                    "mergeVertically": "دمج رأسي",
                    "unmerge": "تراجع الدمج"
                },
                "open": "فتح...",
                "paste": "لصق",
                "quickAccess": {
                    "redo": "إعادة",
                    "undo": "تراجع"
                },
                "saveAs": "حفظ باسم...",
                "sortAsc": "ترتيب تصاعدي",
                "sortDesc": "ترتيب تنازلي",
                "sortButtons": {
                    "sortSheetAsc": "فرز الصفحة من أ إلى ي",
                    "sortSheetDesc": "فرز الصفحة من ي إلى أ",
                    "sortRangeAsc": "فرز من أ إلى ي",
                    "sortRangeDesc": "فرز من ي إلى أ"
                },
                "textColor": "لون النص",
                "textWrap": "دوران النص",
                "underline": "خط أسفل النص",
                "validation": "التحقق من صحة البيانات.."
            });
    }

    if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
        kendo.spreadsheet.messages.view =
            $.extend(true, kendo.spreadsheet.messages.view, {
                "errors": {
                    "shiftingNonblankCells": "لا يمكنك إدراج الخلايا لاحتمال فقد البيانات. قم بتحديد مكان آخر أو حذف البيانات من نهاية ورقة العمل.",
                    "filterRangeContainingMerges": "لا يمكن إنشاء فلتر داخل خلايا مدمجة",
                    "validationError": "القيمة التي ادخلتها تخالف القواعد التي في الخلية."
                },
                "tabs": {
                    "home": "الصفحة الرئيسية",
                    "insert": "إدراج",
                    "data": "البيانات"
                }
            });
    }

    /* Slider messages */

    if (kendo.ui.Slider) {
        kendo.ui.Slider.prototype.options =
            $.extend(true, kendo.ui.Slider.prototype.options, {
                "increaseButtonTitle": "زيادة",
                "decreaseButtonTitle": "انخفاض"
            });
    }

    /* ListBox messaages */

    if (kendo.ui.ListBox) {
        kendo.ui.ListBox.prototype.options.messages =
            $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
                "tools": {
                    "remove": "حذف",
                    "moveUp": "انتقل للأعلى",
                    "moveDown": "انتقل لأسفل",
                    "transferTo": "نقل إلى",
                    "transferFrom": "نقل من",
                    "transferAllTo": "نقل الكل إلى",
                    "transferAllFrom": "نقل الكل من"
                }
            });
    }

    /* TreeList messages */

    if (kendo.ui.TreeList) {
        kendo.ui.TreeList.prototype.options.messages =
            $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                "noRows": "لا توجد سجلات لعرضها",
                "loading": "جار التحميل...",
                "requestFailed": "فشل الطلب.",
                "retry": "أعد المحاولة",
                "commands": {
                    "edit": "تعديل",
                    "update": "تحديث",
                    "canceledit": "تراجع",
                    "create": "إضافة سجل جديد",
                    "createchild": "إضافة سجل فرعي",
                    "destroy": "حذف",
                    "excel": "Excel تصدير إلى",
                    "pdf": "PDF تصدير إلى"
                }
            });
    }

    /* TreeView messages */

    if (kendo.ui.TreeView) {
        kendo.ui.TreeView.prototype.options.messages =
            $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
                "loading": "جار التحميل...",
                "requestFailed": "فشل الطلب.",
                "retry": "أعد المحاولة"
            });
    }

    /* Upload messages */

    if (kendo.ui.Upload) {
        kendo.ui.Upload.prototype.options.localization =
            $.extend(true, kendo.ui.Upload.prototype.options.localization, {
                "select": "تحديد الملفات...",
                "cancel": "تراجع",
                "retry": "أعد المحاولة",
                "remove": "إزالة",
                "clearSelectedFiles": "إزالة",
                "uploadSelectedFiles": "رفع ملفات",
                "dropFilesHere": "قم بسحب الملف هنا لرفعه",
                "statusUploading": "جار الرفع",
                "statusUploaded": "تم الرفع",
                "statusWarning": "تحذير",
                "statusFailed": "فشل",
                "headerStatusPaused": "ايقاف",
                "headerStatusUploading": "جار الرفع...",
                "headerStatusUploaded": "تم",
                "uploadSuccess": "(تم رفع الملف (الملفات.",
                "uploadFail": "(فشل رفع الملف (الملفات.",
                "invalidMaxFileSize": "حجم الملف كبير جداً.",
                "invalidMinFileSize": "حجم الملف صغير جداً.",
                "invalidFileExtension": "نوع الملف غير مسموح به."
            });
    }

    /* Validator messages */

    if (kendo.ui.Validator) {
        kendo.ui.Validator.prototype.options.messages =
            $.extend(true, kendo.ui.Validator.prototype.options.messages, {
                "required": "{0} مطلوب",
                "pattern": "{0} غير صالح",
                "min": "{0} يجب أن تكون أكبر من أو تساوي {1}",
                "max": "{0} يجب أن تكون أصغر من أو تساوي {1}",
                "step": "{0} غير صالح",
                "email": "{0} بريد إلكتروني غير صالح",
                "url": "{0} رابط غير صالح",
                "date": "{0} تاريخ غير صالح",
                "dateCompare": "يجب أن يكون تاريخ الانتهاء أكبر من أو يساوي تاريخ البدء"
            });
    }

    /* kendo.ui.progress method */
    if (kendo.ui.progress) {
        kendo.ui.progress.messages =
            $.extend(true, kendo.ui.progress.messages, {
                "loading": "جاري التحميل..."
            });
    }

    /* Dialog */

    if (kendo.ui.Dialog) {
        kendo.ui.Dialog.prototype.options.messages =
            $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
                "close": "إغلاق"
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
                "okText": "حسنًا"
            });
    }

    /* Confirm */

    if (kendo.ui.Confirm) {
        kendo.ui.Confirm.prototype.options.messages =
            $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
                "okText": "حسنًا",
                "cancel": "تراجع"
            });
    }

    /* Prompt */
    if (kendo.ui.Prompt) {
        kendo.ui.Prompt.prototype.options.messages =
            $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
                "okText": "حسنًا",
                "cancel": "تراجع"
            });
    }

    /* DateInput */
    if (kendo.ui.DateInput) {
        kendo.ui.DateInput.prototype.options.messages =
            $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
                "year": "سنة",
                "month": "شهر",
                "day": "يوم",
                "weekday": "يوم في الأسبوع",
                "hour": "ساعات",
                "minute": "دقائق",
                "second": "ثواني",
                "dayperiod": "AM/PM"
            });
    }

    /* List messages */

    if (kendo.ui.List) {
        kendo.ui.List.prototype.options.messages =
            $.extend(true, kendo.ui.List.prototype.options.messages, {
                "clear": "إزالة",
                "noData": "لا توجد بيانات."
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

    /* DropDownTree messages */

    if (kendo.ui.DropDownTree) {
        kendo.ui.DropDownTree.prototype.options.messages =
            $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
                "singleTag": "عنصر (عناصر) محددة",
                "clear": "إزالة",
                "deleteTag": "حذف",
                "noData": "لم يتم إيجاد بيانات."
            });
    }

    /* MultiSelect messages */

    if (kendo.ui.MultiSelect) {
        kendo.ui.MultiSelect.prototype.options.messages =
            $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
                "singleTag": "عنصر (عناصر) محددة",
                "clear": "إزالة",
                "deleteTag": "حذف",
                "noData": "لا توجد بيانات."
            });
    }

    /* Chat messages */

    if (kendo.ui.Chat) {
        kendo.ui.Chat.prototype.options.messages =
            $.extend(true, kendo.ui.Chat.prototype.options.messages, {
                "placeholder": "يكتب الآن...",
                "toggleButton": "تبديل شريط الأدوات",
                "sendButton": "أرسل رسالة"
            });
    }

    /* Wizard messages */

    if (kendo.ui.Wizard) {
        kendo.ui.Wizard.prototype.options.messages =
            $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
                "reset": "إعادة تعيين",
                "previous": "السابق",
                "next": "التالي",
                "done": "تم",
                "step": "خطوة",
                "of": "من"
            });
    }

    /* PDFViewer messages */

    if (kendo.ui.PDFViewer) {
        kendo.ui.PDFViewer.prototype.options.messages =
            $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
                defaultFileName: "مستند",
                toolbar: {
                    zoom: {
                        "zoomLevel": "مستوى التكبير/التصغير",
                        "zoomOut": "تصغير",
                        "zoomIn": "تكبير",
                        "actualWidth": "العرض الحقيقي",
                        "autoWidth": "ضبط العرض تلقائيًا",
                        "fitToWidth": "تتلائم مع العرض",
                        "fitToPage": "تلائم الصفحة"
                    },
                    "open": "فتح",
                    "exportAs": "تصدير",
                    "download": "تحميل",
                    pager: {
                        "first": "إذهب إلى الصفحة الأولى",
                        "previous": "إذهب إلى الصفحة السابقة",
                        "next": "إذهب إلى الصفحة التالية",
                        "last": "إذهب إلى الصفحة الأخيرة",
                        "of": "من {0}",
                        "page": "صفحة",
                        "pages": "صفحات"
                    },
                    "print": "طباعة",
                    "toggleSelection": "تمكين التحديد",
                    "togglePan": "تمكين التحريك",
                    "search": "بحث"
                },
                errorMessages: {
                    "notSupported": "pdf يسمح فقط بملفات.",
                    "parseError": "PDF فشل في معالجة ملف.",
                    "notFound": "لم يتم العثور على الملف.",
                    "popupBlocked": "تم حظر النافذة المنبثقة."
                },
                dialogs: {
                    exportAsDialog: {
                        "title": "تصدير...",
                        "defaultFileName": "مستند",
                        "pdf": "(.pdf) تنسيق المستندات بإمتداد",
                        "png": "تنسيق شبكة التصميمات بإمتداد (.png)",
                        "svg": "تنسيق التصميمات بإمتداد (.svg)",
                        "labels": {
                            "fileName": "اسم الملف",
                            "saveAsType": "حفظ باسم",
                            "page": "صفحة"
                        }
                    },
                    "okText": "حسنا",
                    "save": "حفظ",
                    "cancel": "تراجع",
                    "search": {
                        "inputLabel": "نص البحث",
                        "matchCase": "حالة متطابقة",
                        "next": "التطابق التالي",
                        "previous": "التطابق السابق",
                        "close": "إغلاق",
                        "of": "من"
                    }
                }
            });
    }

    /* Captcha messages */

    if (kendo.ui.Captcha) {
        kendo.ui.Captcha.prototype.options.messages =
            $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
                "reset": "إعادة تعيين كلمة التحقق",
                "audio": "نطق كلمة التحقق",
                "imageAlt": "اكتب كلمة التحقق كما في الصورة",
                "success": "تم التحقق بنجاح"
            });
    }

    /* OrgChart messages */

    if (kendo.ui.OrgChart) {
        kendo.ui.OrgChart.prototype.options.messages =
            $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
                label: "الهيكل التنظيمي",
                edit: "تعديل",
                create: "إنشاء",
                destroy: "حذف",
                destroyContent: "هل أنت متأكد من حذف هذا العنصر والعناصر التابعة له؟",
                destroyTitle: "حذف عنصر",
                cancel: "تراجع",
                save: "حفظ",
                menuLabel: "قائمة التعديل",
                uploadAvatar: "تحميل صورة جديدة",
                parent: "عنصر رئيسي",
                name: "الاسم",
                title: "العنوان",
                none: "--لا شيء--",
                expand: "عرض",
                collapse: "طي"
            });
    }
})(window.kendo.jQuery);

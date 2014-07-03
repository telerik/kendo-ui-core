

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "等于",
    "gte": "大于或等于",
    "gt": "大于",
    "lte": "小于或等于",
    "lt": "小于",
    "neq": "不等于"
  },
  "number": {
    "eq": "等于",
    "gte": "大于或等于",
    "gt": "大于",
    "lte": "小于或等于",
    "lt": "小于",
    "neq": "不等于"
  },
  "string": {
    "endswith": "结束于",
    "eq": "等于",
    "neq": "不等于",
    "startswith": "开始于",
    "contains": "包含",
    "doesnotcontain": "不包含"
  },
  "enum": {
    "eq": "等于",
    "neq": "不等于"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "列",
  "sortAscending": "升序排序",
  "sortDescending": "降序排序",
  "settings": "列设置",
  "done": "做",
  "lock": "锁",
  "unlock": "开锁"
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
    "create": "插入",
    "destroy": "删除",
    "canceledit": "取消",
    "update": "更新",
    "edit": "编辑",
    "select": "选择",
    "cancel": "取消修改",
    "save": "保存修改"
  },
  "editable": {
    "confirmation": "确定要删除吗？",
    "cancelDelete": "取消",
    "confirmDelete": "删除"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "page": "页",
  "display": "显示条目 {0} - {1} 共 {2}",
  "of": "共 {0}",
  "empty": "没有可显示的记录。",
  "refresh": "刷新",
  "first": "首页",
  "itemsPerPage": "items per page",
  "last": "末页",
  "next": "后页",
  "previous": "前页",
  "morePages": "更多页"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "filter": "过滤",
  "and": "并且",
  "clear": "清除过滤",
  "info": "显示符合以下条件的行",
  "selectValue": "-选择值-",
  "isFalse": "为假",
  "isTrue": "为真",
  "or": "或者",
  "cancel": "取消",
  "operator": "接线员",
  "value": "值"
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "托拽列标题到此处按列组合显示"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "粗体",
  "createLink": "插入链接",
  "fontName": "选择字体",
  "fontNameInherit": "（继承的字体）",
  "fontSize": "选择字号",
  "fontSizeInherit": "（继承的字号）",
  "formatBlock": "选择块类型",
  "indent": "增加缩进",
  "insertHtml": "插入 HTML",
  "insertImage": "插入图片",
  "insertOrderedList": "插入有序列表",
  "insertUnorderedList": "插入无序列表",
  "italic": "斜体",
  "justifyCenter": "居中",
  "justifyFull": "两端对齐",
  "justifyLeft": "左对齐",
  "justifyRight": "右对齐",
  "outdent": "减少缩进",
  "strikethrough": "删除线",
  "styles": "风格",
  "subscript": "Subscript",
  "superscript": "Superscript",
  "underline": "下划线",
  "unlink": "移除链接",
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
  "createTable": "创建表",
  "addColumnLeft": "Add column on the left",
  "addColumnRight": "Add column on the right",
  "addRowAbove": "Add row above",
  "addRowBelow": "Add row below",
  "deleteColumn": "Delete column",
  "deleteRow": "Delete row",
  "backColor": "Background color",
  "bold1": "Bold",
  "createLink1": "Insert hyperlink",
  "createTable1": "Create table",
  "deleteColumn1": "Delete column",
  "deleteFile": "Are you sure you want to delete \"{0}\"?",
  "deleteRow1": "Delete row",
  "dialogButtonSeparator1": "or",
  "dialogCancel1": "Cancel",
  "dialogInsert1": "Insert",
  "directoryNotFound": "A directory with this name was not found.",
  "dropFilesHere": "drop files here to upload",
  "emptyFolder": "Empty Folder",
  "fontName1": "Select font family",
  "fontNameInherit1": "(inherited font)",
  "fontSize1": "Select font size",
  "fontSizeInherit1": "(inherited size)",
  "foreColor": "Color",
  "formatBlock1": "Format",
  "imageAltText1": "Alternate text",
  "imageWebAddress1": "Web address",
  "indent1": "Indent",
  "insertHtml1": "Insert HTML",
  "insertImage1": "Insert image",
  "insertOrderedList1": "Insert ordered list",
  "insertUnorderedList1": "Insert unordered list",
  "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
  "italic1": "Italic",
  "justifyCenter1": "Center text",
  "justifyFull1": "Justify",
  "justifyLeft1": "Align text left",
  "justifyRight1": "Align text right",
  "linkOpenInNewWindow1": "Open link in new window",
  "linkText1": "Text",
  "linkToolTip1": "ToolTip",
  "linkWebAddress1": "Web address",
  "orderBy": "Arrange by:",
  "orderByName": "Name",
  "orderBySize": "Size",
  "outdent1": "Outdent",
  "overwriteFile": "'A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
  "search1": "Search",
  "strikethrough1": "Strikethrough",
  "styles1": "Styles",
  "subscript1": "Subscript",
  "superscript1": "Superscript",
  "underline1": "Underline",
  "unlink1": "Remove hyperlink",
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
  "cancel": "取消",
  "dropFilesHere": "拖拽要上传文件到此处",
  "remove": "移除",
  "retry": "重试",
  "select": "选择...",
  "statusFailed": "失败",
  "statusUploaded": "已上传",
  "statusUploading": "上传中",
  "uploadSelectedFiles": "上传文件",
  "headerStatusUploaded": "Done",
  "headerStatusUploading": "Uploading..."
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "all day",
  "cancel": "取消",
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
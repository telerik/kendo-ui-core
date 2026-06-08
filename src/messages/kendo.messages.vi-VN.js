(function($, undefined) {

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {
kendo.ui.FlatColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
  "apply": "Áp dụng",
  "cancel": "Hủy",
  "noColor": "không màu sắc",
  "clearColor": "Loại bỏ màu sắc"
});
}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {
kendo.ui.ColorPicker.prototype.options.messages =
$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
  "apply": "Áp dụng",
  "cancel": "Hủy",
  "noColor": "không màu sắc",
  "clearColor": "Loại bỏ màu sắc"
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "sortAscending": "Xếp Tăng dần",
  "sortDescending": "Xếp Giảm dần",
  "filter": "Bộ lọc",
  "column": "Cột",
  "columns": "Các cột",
  "columnVisibility": "Hiển thị cột",
  "clear": "Xóa",
  "cancel": "Hủy",
  "done": "Xong",
  "settings": "Sửa Thiết lập Cột",
  "lock": "Khóa",
  "unlock": "Mở khóa"
});
}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {
kendo.ui.DateRangePicker.prototype.options.messages =
$.extend(true, kendo.ui.DateRangePicker.prototype.options.messages,{
  "startLabel": "Bắt đầu",
  "endLabel": "Kết thúc"
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "bold": "Đậm",
  "italic": "Nghiêng",
  "underline": "Gạch chân",
  "strikethrough": "Gạch ngang",
  "superscript": "Ký tự trên",
  "subscript": "Ký tự dưới",
  "justifyCenter": "Canh giữa",
  "justifyLeft": "Canh trái",
  "justifyRight": "Canh phải",
  "justifyFull": "Canh đều",
  "insertUnorderedList": "Chèn danh sách không có thứ tự",
  "insertOrderedList": "Chèn danh sách thứ tự",
  "indent": "Thụt lề",
  "outdent": "Thò lề",
  "createLink": "Chèn liên kết",
  "unlink": "Loại bỏ liên kết",
  "insertImage": "Chèn hình ảnh",
  "insertFile": "Chèn tập tin",
  "insertHtml": "Chèn HTML",
  "viewHtml": "Xem HTML",
  "fontName": "Lựa chọn họ phông chữ",
  "fontNameInherit": "(phông chữ được kế thừa)",
  "fontSize": "Lựa chọn kích thước phông chữ",
  "fontSizeInherit": "(Kích thước được kế thừa)",
  "formatBlock": "Định dạng",
  "formatting": "Định dạng",
  "foreColor": "Màu sắc",
  "backColor": "Màu nền",
  "style": "Kiểu",
  "emptyFolder": "Thư mục Trống",
  "uploadFile": "Đưa tập tin lên",
  "overflowAnchor": "Thêm các công cụ",
  "orderBy": "Sắp xếp bởi:",
  "orderBySize": "Kích thước",
  "orderByName": "Tên",
  "invalidFileType": "Tập tin được chọn \"{0}\" là không hợp lệ. Các kiểu tập tin được hỗ trợ là {1}.",
  "deleteFile": 'Bạn có thật sự muốn xóa "{0}" không?',
  "overwriteFile": 'Một tập tin có tên "{0}" đã tồn tại tại thư mục hiện tại. Bạn có muốn ghi đè nó không?',
  "directoryNotFound": "Không tồn tại thư mục có tên nhưu thế này.",
  "imageWebAddress": "Địa chỉ web",
  "imageAltText": "Văn bản thay thế",
  "imageWidth": "Độ rộng (px)",
  "imageHeight": "Độ cao (px)",
  "fileWebAddress": "Địa chỉ web",
  "fileTitle": "Tiêu đề",
  "linkWebAddress": "Địa chỉ web",
  "linkText": "Văn bản",
  "linkToolTip": "Gợi ý",
  "linkOpenInNewWindow": "Mở liên kết ở cửa sổ mới",
  "dialogUpdate": "Cập nhật",
  "dialogInsert": "Thêm",
  "dialogButtonSeparator": "hoặc",
  "dialogCancel": "Hủy",
  "cleanFormatting": "Loại bỏ việc định dạng",
  "createTable": "Tạo bảng",
  "addColumnLeft": "Thêm cột vào bên trái",
  "addColumnRight": "Thêm cột vào bên phải",
  "addRowAbove": "Thêm dòng ở bên trên",
  "addRowBelow": "Thêm dòng ở bên dưới",
  "deleteRow": "Xóa dòng",
  "deleteColumn": "Xóa cột",
  "dialogOk": "Đồng ý",
  "tableWizard": "Thuật sỹ Bảng",
  "tableTab": "Bảng",
  "cellTab": "Ô",
  "accessibilityTab": "Cho người khuyết tật",
  "caption": "Chú thích",
  "summary": "Tóm tắt",
  "width": "Rộng",
  "height": "Cao",
  "units": "Các đơn vị",
  "cellSpacing": "Khoảng cách ô",
  "cellPadding": "Vùng đệm ô",
  "cellMargin": "Lề ô",
  "alignment": "Sắp xếp",
  "background": "Nền",
  "cssClass": "CSS Class",
  "id": "ID",
  "border": "Đường viền",
  "borderStyle": "Kiểu đường viền",
  "collapseBorders": "Thu hẹp các đường viền",
  "wrapText": "Xuống dòng văn bản",
  "associateCellsWithHeaders": "Kết hợp ô với tiêu đề",
  "alignLeft": "Canh Trái",
  "alignCenter": "Canh Giữa",
  "alignRight": "Canh Phải",
  "alignLeftTop": "Canh Trên Trái",
  "alignCenterTop": "Canh Trên Giữa",
  "alignRightTop": "Canh Trên Giữa",
  "alignLeftMiddle": "Canh Giữa Trái",
  "alignCenterMiddle": "Đặt ở Trung tâm",
  "alignRightMiddle": "Canh Giữa Phải",
  "alignLeftBottom": "Canh Đáy Trái",
  "alignCenterBottom": "Canh Đáy Giữa",
  "alignRightBottom": "Canh Đáy Phải",
  "alignRemove": "Loại bỏ Căn chỉnh",
  "columns": "Các cột",
  "rows": "Các hàng",
  "selectAllCells": "Chọn tất cả các ô"
});
}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {
kendo.ui.FileBrowser.prototype.options.messages =
$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
  "uploadFile": "Đưa lên",
  "orderBy": "Sắp xếp theo",
  "orderByName": "Tên",
  "orderBySize": "Kích thước",
  "directoryNotFound": "Một thư mục có tên như thế này đã tồn tại.",
  "emptyFolder": "Thư mục rỗng",
  "deleteFile": 'Bạn có thực sự muốn xóa "{0}" không?',
  "invalidFileType": "Tập tin được chọn \"{0}\" không hợp lệ. Các kiểu tập tin được hỗ trợ là {1}.",
  "overwriteFile": "Một tập tin có tên \"{0}\" đã tồn tại ở thư mục hiện tại. Bạn có muốn ghi đè nó không?",
  "dropFilesHere": "kéo thả tập tin vào đây để đưa lên",
  "search": "Tìm kiếm"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "isTrue": "là đúng",
  "isFalse": "là sai",
  "filter": "Bộ lọc",
  "clear": "Loại bỏ",
  "operator": "Toán tử"
});
}

/* FilterCell operators */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "string": {
    "eq": "Bằng",
    "neq": "Không bằng",
    "startswith": "Bắt đầu bởi",
    "contains": "Chứa",
    "doesnotcontain": "Không chứa",
    "endswith": "Kết thúc với",
    "isnull": "Là không có giá trị",
    "isnotnull": "Là có giá trị",
    "isempty": "Là rỗng",
    "isnotempty": "Là không rỗng",
    "isnullorempty": "Không có giá trị hoặc rỗng",
    "isnotnullorempty": "Có giá trị"
  },
  "number": {
    "eq": "Bằng",
    "neq": "Không bằng",
    "gte": "Lớn hơn hoặc bằng",
    "gt": "Lớn hơn",
    "lte": "Nhỏ hơn hoặc bằng",
    "lt": "Nhỏ hơn",
    "isnull": "Không có giá trị",
    "isnotnull": "Có giá trị"
  },
  "date": {
    "eq": "Là ngày",
    "neq": "Không là ngày",
    "gte": "Từ ngày này trở đi",
    "gt": "Sau ngày",
    "lte": "Từ ngày này trở về trước",
    "lt": "Trước ngày",
    "isnull": "Không có giá trị",
    "isnotnull": "Có giá trị"
  },
  "enums": {
    "eq": "Bằng",
    "neq": "Không bằng",
    "isnull": "Không có giá trị",
    "isnotnull": "Có giá trị"
  }
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "info": "Hiển thị các mục cso giá trị là:",
  "title": "Hiển thị các mục có giá trị là",
  "isTrue": "là đúng",
  "isFalse": "là sai",
  "filter": "Bộ lọc",
  "clear": "Loại bỏ",
  "and": "Và",
  "or": "Hoặc",
  "selectValue": "-Chọn giá trị-",
  "operator": "Toán tử",
  "value": "Giá trị",
  "cancel": "Hủy",
  "done": "Xong",
  "into": "trong"
});
}

/* FilterMenu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "string": {
    "eq": "Bằng",
    "neq": "Không bằng",
    "startswith": "Bắt đầu bởi",
    "contains": "Chứa",
    "doesnotcontain": "Không chứa",
    "endswith": "Kết thúc với",
    "isnull": "Không có giá trị",
    "isnotnull": "Có giá trị",
    "isempty": "Là rỗng",
    "isnotempty": "Là Không rỗng",
    "isnullorempty": "Không có giá trị hoặc rỗng",
    "isnotnullorempty": "Có giá trị"
  },
  "number": {
    "eq": "Bằng với",
    "neq": "Không bằng",
    "gte": "Lớn hơn hoặc bằng",
    "gt": "Nhỏ hơn",
    "lte": "Nhỏ hơn hoặc bằng",
    "lt": "Nhỏ hơn",
    "isnull": "Không có giá trị",
    "isnotnull": "Có giá trị"
  },
  "date": {
    "eq": "Bằng với",
    "neq": "Không bằng với",
    "gte": "Từ ngày này trở đi",
    "gt": "Sau ngày này",
    "lte": "Từ ngày này trở về trước",
    "lt": "Trước ngày",
    "isnull": "Không có giá trị",
    "isnotnull": "Có giá trị"
  },
  "enums": {
    "eq": "Bằng với",
    "neq": "Không bằng",
    "isnull": "Không có giá trị",
    "isnotnull": "Có giá trị"
  }
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "checkAll": "Chọn Tất cả",
  "clearAll": "Loại bỏ Tất cả",
  "clear": "Loại bỏ",
  "filter": "Bộ lọc",
  "search": "Tìm kiếm",
  "cancel": "Hủy",
  "selectedItemsFormat": "{0} mục đã được chọn",
  "done": "Xong",
  "into": "trong"
});
}

/* Gantt messages */

if (kendo.ui.Gantt) {
kendo.ui.Gantt.prototype.options.messages =
$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
  "actions": {
    "addChild": "Thêm Con",
    "append": "Thêm Nhiệm vụ",
    "insertAfter": "Thêm Bên dưới",
    "insertBefore": "Thêm Phía trên",
    "pdf": "Xuất ra PDF"
  },
  "cancel": "Hủy",
  "deleteDependencyWindowTitle": "Xóa phụ thuộc",
  "deleteTaskWindowTitle": "Xóa nhiệm vụ",
  "destroy": "Xóa",
  "editor": {
    "assingButton": "Giao việc",
    "editorTitle": "Nhiệm vụ",
    "end": "Kết thúc",
    "percentComplete": "Hoàn tất",
    "resources": "Nguồn lực",
    "resourcesEditorTitle": "Nguồn lực",
    "resourcesHeader": "Nguồn lực",
    "start": "Bắt đầu",
    "title": "Tiêu đề",
    "unitsHeader": "Các Đơn vị tính"
  },
  "save": "Lưu",
  "views": {
    "day": "Ngày",
    "end": "Kết thúc",
    "month": "Tháng",
    "start": "Bắt đầu",
    "week": "Tuần",
    "year": "Năm"
  }
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "cancel": "Hủy bỏ các thay đổi",
    "canceledit": "Hủy",
    "create": "Thêm bản ghi mới",
    "add": "Thêm bản ghi mới",
    "destroy": "Xóa",
    "edit": "Sửa",
    "excel": "Xuất ra Excel",
    "pdf": "Xuất ra PDF",
    "save": "Lưu các thay đổi",
    "select": "Chọn",
    "update": "Cập nhật"
  },
  "editable": {
    "cancelDelete": "Hủy",
    "confirmation": "Bạn có thật sự muốn xóa bản ghi này không?",
    "confirmDelete": "Xóa"
  },
  "noRecords": "Không có bản ghi nào sẵn có.",
  "expandCollapseColumnHeader": "",
  "groupHeader": "Bấm tổ hợp phím Ctrl + Space để nhóm lại với nhau",
  "ungroupHeader": "Bấm tổ hợp phím Ctrl + Space để tách ra khỏi nhóm"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
    "noRows": "Không có bản ghi nào để hiển thị",
    "loading": "Đang tải...",
    "requestFailed": "Yêu cầu bị thất bại.",
    "retry": "Thử lại",
    "commands": {
        "edit": "Sửa",
        "update": "Cập nhật",
        "canceledit": "Hủy",
        "create": "Thêm bản ghi mới",
        "createchild": "Thêm bản ghi con",
        "destroy": "Xóa",
        "excel": "Xuất ra Excel",
        "pdf": "Xuất ra PDF"
    }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Kéo tiêu đề cột và thả vào đây để nhóm lại bởi cột đó"
});
}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {
kendo.ui.NumericTextBox.prototype.options =
$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
  "upArrowText": "Tăng giá trị",
  "downArrowText": "Giảm giá trị"
});
}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {
kendo.ui.MediaPlayer.prototype.options.messages =
$.extend(true, kendo.ui.MediaPlayer.prototype.options.messages,{
  "pause": "Tạm dừng",
  "play": "Phát",
  "mute": "Tắt tiếng",
  "unmute": "Bật tiếng",
  "quality": "Chất lượng",
  "fullscreen": "Toàn màn hình"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Tất cả",
  "display": "{0} - {1} trong {2} mục",
  "empty": "Không có mục nào để hiển thị",
  "page": "Trang",
  "of": "trong tổng số {0}",
  "itemsPerPage": "mục mỗi trang",
  "first": "Đến trang đầu tiên",
  "previous": "Đến trang trước",
  "next": "Đến trang sau",
  "last": "Đến trang cuối cùng",
  "refresh": "Tải lại",
  "morePages": "Thêm trang"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Tất cả",
  "display": "{0} - {1} trong {2} mục",
  "empty": "Không có mục nào để hiển thị",
  "page": "Trang",
  "of": "của {0}",
  "itemsPerPage": "mục mỗi trang",
  "first": "Đến trang đầu tiên",
  "previous": "Đến trang trước",
  "next": "Đến trang sau",
  "last": "Đến trang cuối cùng",
  "refresh": "Tải lại",
  "morePages": "Thêm trang"
});
}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {
kendo.ui.PivotGrid.prototype.options.messages =
$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
  "measureFields": "Thả Trường dữ liệu vào đây",
  "columnFields": "Thả Cột dữ liệu vào đây",
  "rowFields": "Thả Trường của dòng vào đây"
});
}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {
kendo.ui.PivotFieldMenu.prototype.options.messages =
$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
  "info": "Hiển thị các mục với giá trị mà:",
  "filterFields": "Bộ lọc Các trường",
  "filter": "Bộ lọc",
  "include": "Chứa các trường...",
  "title": "Các trường để chứa",
  "clear": "Loại bỏ",
  "ok": "Đồng ý",
  "cancel": "Hủy",
  "operators": {
    "contains": "Chứa",
    "doesnotcontain": "Không chứa",
    "startswith": "Bắt đầu bởi",
    "endswith": "Kết thúc bởi",
    "eq": "Bằng với",
    "neq": "Không bằng"
  }
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "frequencies": {
    "never": "Không bao giờ",
    "hourly": "Từng giờ",
    "daily": "Mỗi ngày",
    "weekly": "Hàng tuần",
    "monthly": "Hàng tháng",
    "yearly": "Hàng năm"
  },
  "hourly": {
    "repeatEvery": "Lặp lại sau mỗi: ",
    "interval": " giờ"
  },
  "daily": {
    "repeatEvery": "Lặp lại sau mỗi: ",
    "interval": " ngày"
  },
  "weekly": {
    "interval": " tuần",
    "repeatEvery": "Lặp lại sau mỗi: ",
    "repeatOn": "Lặp lại trên: "
  },
  "monthly": {
    "repeatEvery": "Lặp lại sau mỗi: ",
    "repeatOn": "Lặp lại trên: ",
    "interval": " tháng",
    "day": "Ngày "
  },
  "yearly": {
    "repeatEvery": "Lặp lại sau mỗi: ",
    "repeatOn": "Lặp lại trên: ",
    "interval": " năm",
    "of": " của "
  },
  "end": {
    "label": "Kết thúc:",
    "mobileLabel": "Kết thúc",
    "never": "Không bao giờ",
    "after": "Sau ",
    "occurrence": " lần xảy ra",
    "on": "Vào lúc "
  },
  "offsetPositions": {
    "first": "đầu tiên",
    "second": "thứ hai",
    "third": "thứ ba",
    "fourth": "thứ tư",
    "last": "cuối cùng"
  },
  "weekdays": {
    "day": "ngày",
    "weekday": "ngày trong tuần",
    "weekend": "ngày cuối tuần"
  }
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "cả ngày",
  "date": "Ngày",
  "event": "Sự kiện",
  "time": "Thời gian",
  "showFullDay": "Hiển thị cả ngày",
  "showWorkDay": "Hiển thị giờ hành chính",
  "today": "Hôm nay",
  "save": "Lưu",
  "cancel": "Hủy",
  "destroy": "Xóa",
  "resetSeries": "Thiết lập lại Chuỗi",
  "deleteWindowTitle": "Xóa Sự kiện",
  "ariaSlotLabel": "Được chọn từ {0:t} đến {1:t}",
  "ariaEventLabel": "{0} vào ngày {1:D} lúc {2:t}",
  "editable": {
    "confirmation": "Bạn có thật sự muốn xóa sự kiện này không?"
  },
  "views": {
    "day": "Ngày",
    "week": "Tuần",
    "workWeek": "Tuần làm việc",
    "agenda": "Danh mục công việc",
    "month": "Tháng"
  },
  "recurrenceMessages": {
    "deleteWindowTitle": "Xóa các mục định kỳ",
    "resetSeriesWindowTitle": "Thiết lập lại chuỗi",
    "deleteWindowOccurrence": "Xóa sự xuất hiện hiện tại",
    "deleteWindowSeries": "Xóa chuỗi",
    "deleteRecurringConfirmation": "Bạn có thực sự muốn xóa sự kiện này?",
    "deleteSeriesConfirmation": "Bạn có thực sự muốn xóa bỏ toàn bộ chuỗi này?",
    "editWindowTitle": "Sửa các mục định kỳ",
    "editWindowOccurrence": "Sửa sự xuất hiện hiện tại",
    "editWindowSeries": "Sửa chuỗi",
    "deleteRecurring": "Bạn muốn xóa chỉ sự kiện này hay toàn bộ chuỗi?",
    "editRecurring": "Bạn muốn sửa chỉ sự kiện này hay toàn bộ chuỗi?"
  },
  "editor": {
    "title": "Tiêu đề",
    "start": "Bắt đầu",
    "end": "Kết thúc",
    "allDayEvent": "Sự kiện kéo dài cả ngày",
    "description": "Mô tả",
    "repeat": "Lặp lại",
    "timezone": " ",
    "startTimezone": "Múi giờ bắt đầu",
    "endTimezone": "Múi giờ kết thúc",
    "separateTimezones": "Sử dụng múi giờ bắt đầu vào múi giờ kết thúc khác nhau",
    "timezoneEditorTitle": "Múi giờ",
    "timezoneEditorButton": "Múi giờ",
    "timezoneTitle": "Múi giờ",
    "noTimezone": "Không có múi giờ",
    "editorTitle": "Sự kiện"
  }
});
}

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Tất cả các đường bo",
  "insideBorders": "Đường bo bên trong",
  "insideHorizontalBorders": "Đường bo ngang bên trong",
  "insideVerticalBorders": "Đường bo dọc bên trong",
  "outsideBorders": "Đường bo bên ngoài",
  "leftBorder": "Đường bo trái",
  "topBorder": "Đường bo trên",
  "rightBorder": "Đường bo phải",
  "bottomBorder": "Đường bo dưới",
  "noBorders": "Không có đường bo",
  "reset": "Thiết lập lại màu sắc",
  "customColor": "Màu sắc tùy chỉnh...",
  "apply": "Áp dụng",
  "cancel": "Hủy"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Áp dụng",
  "save": "Lưu",
  "cancel": "Hủy",
  "remove": "Loại bỏ",
  "retry": "Thử lại",
  "revert": "Hoàn trạng",
  "okText": "Đồng ý",
  "formatCellsDialog": {
    "title": "Định dạng",
    "categories": {
      "number": "Số",
      "currency": "Tiền tệ",
      "date": "Ngày tháng"
      }
  },
  "fontFamilyDialog": {
    "title": "Phông chữ"
  },
  "fontSizeDialog": {
    "title": "Kích thức chữ"
  },
  "bordersDialog": {
    "title": "Các đường bo"
  },
  "alignmentDialog": {
    "title": "Sắp xếp",
    "buttons": {
     "justifyLeft": "Canh trái",
     "justifyCenter": "Canh giữa",
     "justifyRight": "Canh phải",
     "justifyFull": "Canh đều hai bên",
     "alignTop": "Canh đỉnh",
     "alignMiddle": "Canh giữa",
     "alignBottom": "Canh đáy"
    }
  },
  "mergeDialog": {
    "title": "Trộn nhiều ô",
    "buttons": {
      "mergeCells": "Trộn tất cả",
      "mergeHorizontally": "Trộn theo phương ngang",
      "mergeVertically": "Trộn theo phương dọc",
      "unmerge": "Không trộn"
    }
  },
  "freezeDialog": {
    "title": "Đóng băng các tấm",
    "buttons": {
      "freezePanes": "Đóng băng các tấm",
      "freezeRows": "Đóng băng các hàng",
      "freezeColumns": "Đóng băng các cột",
      "unfreeze": "Bỏ đóng băng các tấm"
    }
  },
  "confirmationDialog": {
    "text": "Bạn có thực sự muốn xóa bỏ trang tính này không?",
    "title": "Trang tính loại bỏ"
  },
  "validationDialog": {
    "title": "Kiểm tra Dữ liệu",
    "hintMessage": "Vui lòng nhập một {0} hợp lệ có giá trị {1}.",
    "hintTitle": "Kiểm tra {0}",
    "criteria": {
      "any": "Bất kỳ giá trị nào",
      "number": "Số",
      "text": "Văn bản",
      "date": "Ngày tháng",
      "custom": "Công thức tùy chỉnh",
      "list": "Danh sách"
    },
    "comparers": {
      "greaterThan": "lớn hơn",
      "lessThan": "nhỏ hơn",
      "between": "ở giữa",
      "notBetween": "không ở giữa",
      "equalTo": "bằng với",
      "notEqualTo": "không bằng",
      "greaterThanOrEqualTo": "lớn hơn hoặc bằng với",
      "lessThanOrEqualTo": "nhỏ hơn hoặc bằng với"
    },
    "comparerMessages": {
      "greaterThan": "lớn hơn {0}",
      "lessThan": "nhỏ hơn {0}",
      "between": "nằm giữa {0} và {1}",
      "notBetween": "không nằm giữa {0} và {1}",
      "equalTo": "bằng với {0}",
      "notEqualTo": "không bằng với {0}",
      "greaterThanOrEqualTo": "lớn hơn hoặc bằng với {0}",
      "lessThanOrEqualTo": "nhỏ hơn hoặc bằng với {0}",
      "custom": "cái mà thỏa mãn công thức: {0}"
    },
    "labels": {
      "criteria": "Tiêu chí",
      "comparer": "Trình so sánh",
      "min": "Tối thiểu",
      "max": "Tối đa",
      "value": "Giá trị",
      "start": "Bắt đầu",
      "end": "Kết thúc",
      "onInvalidData": "Trên dữ liệu không hợp lệ",
      "rejectInput": "Từ chối đầu vào",
      "showWarning": "Hiển thị cảnh báo",
      "showHint": "Hiển thị gợi ý",
      "hintTitle": "Tiêu đề gợi ý",
      "hintMessage": "Thông điệp gợi ý",
      "ignoreBlank": "Bỏ qua mục trống"
    },
    "placeholders": {
      "typeTitle": "Tiêu đề kiểu",
      "typeMessage": "Thông điệp Kiểu"
    }
  },
  "exportAsDialog": {
    "title": "Xuất ra...",
    "labels": {
      "fileName": "Tên tập tin",
      "saveAsType": "Lưu tập tin khác theo dịnh dạng",
      "exportArea": "Xuất ra",
      "paperSize": "Kích thước Trình phân trang",
      "margins": "Lề",
      "orientation": "Hướng giấy",
      "print": "In",
      "guidelines": "Đường chỉ dẫn",
      "center": "Giữa",
      "horizontally": "Theo phương ngang",
      "vertically": "Theo chiều dọc"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Không thể thay đổi từng phần của ô được trộn."
  },
  "useKeyboardDialog": {
    "title": "Sao chép và dán",
    "errorMessage": "Những thao tác này không thể gọi qua trình đơn. Thay vào đó, vui lòng sử dụng phím tắt:",
    "labels": {
      "forCopy": "dành cho Sao chép",
      "forCut": "dành cho Cắt",
      "forPaste": "dành cho Dán"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Thao tác này không thể thực hiện trên nhiều vùng chọn."
  },
  "insertCommentDialog": {
    "title": "Chèn ghi chú",
    "labels": {
      "comment": "Ghi chú",
      "removeComment": "Loại bỏ ghi chú"
    }
  },
  "insertImageDialog": {
    "title": "Chèn ảnh",
    "info": "Kéo một bức ảnh vào đây, hoặc bấm Lựa chọn",
    "typeError": "Vui lòng chọn ảnh có kiểu tập tin JPEG, PNG hoặc GIF"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "Sắp xếp khoảng tăng dần",
  "sortDescending": "Sắp xếp khoảng giảm dần",
  "filterByValue": "Bộ lọc theo giá trị",
  "filterByCondition": "Bộ lọc theo điều kiện",
  "apply": "Áp dụng",
  "search": "Tìm kiếm",
  "addToCurrent": "Thêm vào vùng lựa chọn hiện tại",
  "clear": "Loại bỏ",
  "blanks": "(Trống)",
  "operatorNone": "Không có gì",
  "and": "VÀ",
  "or": "HOẶC",
  "operators": {
    "string": {
      "contains": "Văn bản chứa",
      "doesnotcontain": "Văn bản không chứa",
      "startswith": "Văn bản bắt đầu bởi",
      "endswith": "Văn bản kết thúc với"
    },
    "date": {
      "eq": "Là ngày",
      "neq": "Ngày khác",
      "lt": "Này trước đó",
      "gt": "Ngày sau đó"
    },
    "number": {
      "eq": "Bằng với",
      "neq": "Không bằng với",
      "gte": "Lớn hơn hoặc bằng",
      "gt": "Lớn hơn",
      "lte": "Nhỏ hơn hoặc bằng",
      "lt": "Nhỏ hơn"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Thiết lập lại màu sắc",
  "customColor": "Màu tùy chỉnh...",
  "apply": "Áp dụng",
  "cancel": "Hủy"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Thêm cột bên trái",
  "addColumnRight": "Thêm cột bên phải",
  "addRowAbove": "Thêm cột bên trên",
  "addRowBelow": "Thêm cột phía dưới",
  "alignment": "Canh chỉnh",
  "alignmentButtons": {
    "justifyLeft": "Canh trái",
    "justifyCenter": "Canh giữa",
    "justifyRight": "Canh phải",
    "justifyFull": "Canh đều hai bên",
    "alignTop": "Canh đỉnh",
    "alignMiddle": "Canh giữa theo chiều dọc",
    "alignBottom": "Canh đáy"
  },
  "backgroundColor": "Nền",
  "bold": "Đậm",
  "borders": "Đường bo",
  "colorPicker": {
    "reset": "Thiết lập lại màu sắc",
    "customColor": "Màu tùy chỉnh..."
  },
  "copy": "Sao chép",
  "cut": "Cắt",
  "deleteColumn": "Xóa cột",
  "deleteRow": "Xóa dòng",
  "excelImport": "Nhập từ Excel...",
  "filter": "Bộ lọc",
  "fontFamily": "Phông chữ",
  "fontSize": "Kích thước chữ",
  "format": "Định dạng tùy chỉnh...",
  "formatTypes": {
    "automatic": "Tự động",
    "number": "Số",
    "percent": "Phần trăm",
    "financial": "Tài chính",
    "currency": "Tiền tệ",
    "date": "Ngày tháng",
    "time": "Thời gian",
    "dateTime": "Ngày giờ",
    "duration": "Khoảng thời gian",
    "moreFormats": "Thêm các định dạng khác..."
  },
  "formatDecreaseDecimal": "Giảm số chữ số phần thập phân",
  "formatIncreaseDecimal": "Tăng số chữ số phần thập phân",
  "freeze": "Đóng băng các tấm",
  "freezeButtons": {
    "freezePanes": "Đóng băng các tấm",
    "freezeRows": "Đóng băng các hàng",
    "freezeColumns": "Đóng băng các cột",
    "unfreeze": "Bỏ đóng băng các tấm"
  },
  "insertComment": "Chèn ghi chú",
  "insertImage": "Chèn hình ảnh",
  "italic": "Nghiêng",
  "merge": "Trộn các ô",
  "mergeButtons": {
    "mergeCells": "Trộn tất cả",
    "mergeHorizontally": "Trộn theo phương ngang",
    "mergeVertically": "Trộn theo phương dọc",
    "unmerge": "Bỏ trộn"
  },
  "open": "Mở...",
  "paste": "Dán",
  "quickAccess": {
    "redo": "Lặp lại thao tác",
    "undo": "Hủy thao tác"
  },
  "saveAs": "Lưu dạng khác...",
  "sortAsc": "Sắp xếp tăng dần",
  "sortDesc": "Sắp xếp giảm dần",
  "sortButtons": {
    "sortSheetAsc": "Sắp xếp trang tính từ A đến Z",
    "sortSheetDesc": "Sắp xếp trang tính từ Z đến A",
    "sortRangeAsc": "Sắp xếp khoảng từ A đến Z",
    "sortRangeDesc": "Sắp xếp khoảng từ Z đến A"
  },
  "textColor": "Màu chữ",
  "textWrap": "Xuống dòng văn bản",
  "underline": "Gạch chân",
  "validation": "Kiểm tra dữ liệu..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Không thể chèn các ô do nguy cơ mất dữ liệu. Chèn vào vị trí khác hoặc xóa dữ liệu từ cuối trang tính",
    "filterRangeContainingMerges": "Không thể tạo một bộ lọc trong khoảng chứa các vùng trộn.",
    "validationError": "Giá trị bạn nhập vào vi phạm quy tắc dữ liệu phù hợp với ô dữ liệu."
  },
  "tabs": {
    "home": "Trang chủ",
    "insert": "Chèn",
    "data": "Dữ liệu"
  }
});
}

/* Slider messages */

if (kendo.ui.Slider) {
kendo.ui.Slider.prototype.options =
$.extend(true, kendo.ui.Slider.prototype.options,{
  "increaseButtonTitle": "Tăng",
  "decreaseButtonTitle": "Giảm"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Xóa",
    "moveUp": "Di chuyển lên trên",
    "moveDown": "Di chuyển xuống dưới",
    "transferTo": "Chuyển đến",
    "transferFrom": "Chuyển từ",
    "transferAllTo": "Chuyển tất cả đến",
    "transferAllFrom": "Chuyển tất cả từ"
  }
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Không có bản ghi nào để hiển thị",
  "loading": "Đang tải...",
  "requestFailed": "Yêu cầu thất bại.",
  "retry": "Thử lại",
  "commands": {
      "edit": "Sửa",
      "update": "Cập nhật",
      "canceledit": "Hủy",
      "create": "Thêm bản ghi mới",
      "createchild": "Thêm bản ghi con",
      "destroy": "Xóa",
      "excel": "Xuất ra Excel",
      "pdf": "Xuất ra PDF"
  }
});
}

/* TreeView messages */

if (kendo.ui.TreeView) {
kendo.ui.TreeView.prototype.options.messages =
$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
  "loading": "Đang tải...",
  "requestFailed": "Yêu cầu thất bại.",
  "retry": "Thử lại"
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "select": "Lựa chọn tập tin...",
  "cancel": "Hủy",
  "retry": "Thử lại",
  "remove": "Xóa bỏ",
  "clearSelectedFiles": "Làm lại",
  "uploadSelectedFiles": "Các tập tin được đưa lên",
  "dropFilesHere": "Thả tập tin vào đây để đưa lên",
  "statusUploading": "đang đưa lên",
  "statusUploaded": "đã đưa lên",
  "statusWarning": "cảnh báo",
  "statusFailed": "thất bại",
  "headerStatusUploading": "Đang đưa lên...",
  "headerStatusUploaded": "Hoàn tất",
  "invalidMaxFileSize": "Tập tin quá lớn.",
  "invalidMinFileSize": "Tập tin quá nhỏ.",
  "invalidFileExtension": "Kiểu tập tin không hợp lệ."
});
}

/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} bắt buộc nhập",
  "pattern": "{0} là không hợp lệ",
  "min": "{0} nên lớn hơn hoặc bằng {1}",
  "max": "{0} nên nhỏ hơn hoặc bằng {1}",
  "step": "{0} không hợp lệ",
  "email": "{0} không phải là một địa chỉ thư điện tử hợp lệ",
  "url": "{0} không phải là một đường dẫn hợp lệ",
  "date": "{0} không phải là một ngày tháng hợp lệ",
  "dateCompare": "Ngày kết thúc nên lớn hơn hoặc bằng ngày bắt đầu"
});
}

/* kendo.ui.progress method */
if (kendo.ui.progress) {
kendo.ui.progress.messages =
$.extend(true, kendo.ui.progress.messages, {
    loading: "Đang tải..."
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Đóng"
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
  "okText": "Đồng ý"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "Đồng ý",
  "cancel": "Hủy"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "Đồng ý",
  "cancel": "Hủy"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "năm",
      "month": "tháng",
      "day": "ngày",
      "weekday": "ngày trong tuần",
      "hour": "giờ",
      "minute": "phút",
      "second": "giây",
      "dayperiod": "Sáng/Chiều"
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
            "contrastRatio": "Ti le tuong phan:",
            "fail": "Khong dat",
            "pass": "Dat",
            "hex": "HEX",
            "toggleFormat": "Chuyen doi dinh dang",
            "red": "Do",
            "green": "Xanh la",
            "blue": "Xanh duong",
            "alpha": "Alpha"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Thu muc moi",
                "upload": "Tai len",
                "sortDirection": "Huong sap xep",
                "sortDirectionAsc": "Tang dan",
                "sortDirectionDesc": "Giam dan",
                "sortField": "Sap xep theo",
                "nameField": "Ten",
                "sizeField": "Kich thuoc",
                "typeField": "Loai",
                "dateModifiedField": "Ngay sua doi",
                "dateCreatedField": "Ngay tao",
                "listView": "Xem danh sach",
                "gridView": "Xem luoi",
                "search": "Tim kiem",
                "details": "Chi tiet",
                "detailsChecked": "Co",
                "detailsUnchecked": "Khong",
                "Delete": "Xoa",
                "Rename": "Doi ten"
            },
            "views": {
                "nameField": "Ten",
                "sizeField": "Kich thuoc",
                "typeField": "Loai",
                "dateModifiedField": "Ngay sua doi",
                "dateCreatedField": "Ngay tao",
                "items": "muc"
            },
            "dialogs": {
                "upload": {
                    "title": "Tai len tap tin",
                    "clear": "Xoa",
                    "done": "Xong"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Ban muon di chuyen hay sao chep cac tap tin da chon?</p>",
                    "okText": "Sao chep",
                    "cancel": "Di chuyen",
                    "close": "Dong"
                },
                "deleteConfirm": {
                    "title": "Xac nhan xoa",
                    "content": "<p class='k-text-center'>Ban co chac chan muon xoa cac tap tin da chon?<br/>Hanh dong nay khong the hoan tac.</p>",
                    "okText": "Xoa",
                    "cancel": "Huy",
                    "close": "Dong"
                },
                "renamePrompt": {
                    "title": "Doi ten",
                    "content": "<p class='k-text-center'>Nhap ten tap tin moi</p>",
                    "okText": "Doi ten",
                    "cancel": "Huy",
                    "close": "Dong"
                }
            },
            "previewPane": {
                "noFileSelected": "Khong co tap tin nao duoc chon",
                "extension": "Loai",
                "size": "Kich thuoc",
                "created": "Ngay tao",
                "createdUtc": "Ngay tao (UTC)",
                "modified": "Ngay sua doi",
                "modifiedUtc": "Ngay sua doi (UTC)",
                "items": "muc"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Chinh sua",
            "createNewCard": "The moi",
            "create": "Tao",
            "search": "Tim kiem",
            "previewCard": "Xem truoc the",
            "addCard": "Them the",
            "editCard": "Chinh sua the",
            "deleteCard": "Xoa the",
            "addColumn": "Them cot",
            "editColumn": "Chinh sua cot",
            "deleteColumn": "Xoa cot",
            "close": "Dong",
            "cancel": "Huy",
            "delete": "Xoa",
            "saveChanges": "Luu thay doi",
            "title": "Tieu de:",
            "description": "Mo ta:",
            "newColumn": "Cot moi",
            "deleteColumnConfirm": "Ban co chac chan muon xoa cot nay?",
            "deleteCardConfirm": "Ban co chac chan muon xoa the nay?"
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Cai dat",
            "cancelButtonText": "Huy",
            "applyButtonText": "Ap dung",
            "measures": "Chon truong de bat dau",
            "columns": "Chon truong de bat dau",
            "rows": "Chon truong de bat dau"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Ap dung",
            "sortAscending": "Tang dan",
            "sortDescending": "Giam dan",
            "filterFields": "Loc truong",
            "filter": "Loc",
            "include": "Bao gom truong...",
            "clear": "Xoa",
            "reset": "Dat lai",
            "moveToColumns": "Chuyen den cot",
            "moveToRows": "Chuyen den hang",
            "movePrevious": "Lui",
            "moveNext": "Tien",
            "filterOperatorsDropDownLabel": "Toan tu loc",
            "filterValueTextBoxLabel": "Gia tri loc",
            "operators": {
                "contains": "Chua",
                "doesnotcontain": "Khong chua",
                "startswith": "Bat dau voi",
                "endswith": "Ket thuc voi",
                "eq": "Bang",
                "neq": "Khong bang"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "Huy",
            "update": "Luu",
            "endTitle": "Ket thuc lap lai",
            "repeatTitle": "Mau lap lai",
            "headerTitle": "Lap lai su kien",
            "end": {
                "never": "Khong bao gio",
                "after": "Sau",
                "on": "Vao ngay"
            },
            "daily": {
                "interval": "ngay"
            },
            "weekly": {
                "interval": "tuan"
            },
            "monthly": {
                "interval": "thang",
                "repeatBy": "Lap lai theo: ",
                "dayOfMonth": "Ngay trong thang",
                "dayOfWeek": "Ngay trong tuan"
            },
            "yearly": {
                "interval": "nam",
                "repeatBy": "Lap lai theo: ",
                "dayOfMonth": "Ngay trong thang",
                "dayOfWeek": "Ngay trong tuan",
                "of": " cua "
            },
            "endRule": {
                "after": " lan",
                "on": "Vao ngay "
            }
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Dat",
            "cancel": "Huy",
            "hour": "gio",
            "minute": "phut",
            "second": "giay",
            "millisecond": "mili giay",
            "now": "Bay gio"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Dat",
            "cancel": "Huy",
            "hour": "gio",
            "minute": "phut",
            "second": "giay",
            "millisecond": "mili giay",
            "now": "Bay gio",
            "date": "Ngay",
            "time": "Gio",
            "today": "Hom nay",
            "weekColumnHeader": ""
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "xoa",
            "noData": "Khong co du lieu."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "xoa",
            "noData": "Khong co du lieu.",
            "singleTag": "muc da chon"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "xoa",
            "noData": "Khong co du lieu.",
            "singleTag": "muc da chon"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Nhap tin nhan...",
            "toggleButton": "Chuyen doi thanh cong cu",
            "sendButton": "Gui"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Dat lai",
            "previous": "Truoc",
            "next": "Tiep",
            "done": "Xong",
            "step": "Buoc",
            "of": "/"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Tai lieu",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Muc thu phong",
                    "zoomOut": "Thu nho",
                    "zoomIn": "Phong to",
                    "actualWidth": "Do rong thuc",
                    "autoWidth": "Do rong tu dong",
                    "fitToWidth": "Vua voi chieu rong",
                    "fitToPage": "Vua voi trang"
                },
                "open": "Mo",
                "exportAs": "Xuat",
                "download": "Tai xuong",
                "pager": {
                    "first": "Di den trang dau",
                    "previous": "Di den trang truoc",
                    "next": "Di den trang tiep",
                    "last": "Di den trang cuoi",
                    "of": "/",
                    "page": "trang",
                    "pages": "trang"
                },
                "print": "In",
                "toggleSelection": "Chon",
                "togglePan": "Di chuyen",
                "search": "Tim kiem"
            },
            "errorMessages": {
                "notSupported": "Chi ho tro tep PDF.",
                "parseError": "Khong the xu ly tep PDF.",
                "notFound": "Khong tim thay tep.",
                "popupBlocked": "Cua so bat len bi trinh duyet chan."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Tao lai captcha",
            "audio": "Phat am thanh captcha",
            "imageAlt": "Nhap van ban tu hinh anh captcha",
            "success": "Xac minh thanh cong"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "So do to chuc",
            "edit": "Chinh sua",
            "create": "Tao",
            "destroy": "Xoa",
            "destroyContent": "Ban co chac chan muon xoa muc nay va cac muc con cua no?",
            "destroyTitle": "Xoa muc",
            "cancel": "Huy",
            "save": "Luu",
            "menuLabel": "Menu chinh sua",
            "uploadAvatar": "Tai len hinh moi",
            "parent": "Cha",
            "name": "Ten",
            "title": "Chuc danh",
            "none": "--Khong--",
            "expand": "Mo rong",
            "collapse": "Thu gon"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Tieu de ban do"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Don vi"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Khong co du lieu"
        });

}

})(window.kendo.jQuery);
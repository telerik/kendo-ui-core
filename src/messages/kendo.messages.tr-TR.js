(function ($, undefined) {
/* Filter menu operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Eşit",
    "gt": "Sonra",
    "gte": "Sonra veya eşit",
    "lt": "Önce",
    "lte": "Önce veya eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "enums": {
    "eq": "Eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "number": {
    "eq": "Eşit",
    "gt": "Büyük",
    "gte": "Büyük veya eşit",
    "lt": "Küçük",
    "lte": "Küçük veya eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "string": {
    "contains": "İçeriyor",
    "doesnotcontain": "İçermiyor",
    "endswith": "İle biter",
    "eq": "Eşit",
    "neq": "Eşit değil",
    "startswith": "İle başlar",
    "isnull": "Null",
    "isnotnull": "Null değil",
    "isempty": "Boş",
    "isnotempty": "Boş değil",
    "isnullorempty": "Değer içermiyor",
    "isnotnullorempty": "Değer içeriyor"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Eşit",
    "gt": "Sonra",
    "gte": "Sonra veya eşit",
    "lt": "Önce",
    "lte": "Önce veya eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "enums": {
    "eq": "Eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "number": {
    "eq": "Eşit",
    "gt": "Büyük",
    "gte": "Büyük veya eşit",
    "lt": "Küçük",
    "lte": "Küçük veya eşit",
    "neq": "Eşit değil",
    "isnull": "Null",
    "isnotnull": "Null değil"
  },
  "string": {
    "contains": "İçeriyor",
    "doesnotcontain": "İçermiyor",
    "endswith": "İle biter",
    "eq": "Eşit",
    "neq": "Eşit değil",
    "startswith": "İle başlar",
    "isnull": "Null",
    "isnotnull": "Null değil",
    "isempty": "Boş",
    "isnotempty": "Boş değil",
    "isnullorempty": "Değer içeriyor",
    "isnotnullorempty": "Değer içermiyor"
  }
});
}

/* ColumnMenu messages */

if (kendo.ui.ColumnMenu) {
kendo.ui.ColumnMenu.prototype.options.messages =
$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
  "columns": "Sütunlar",
  "settings": "Sütun ayarları",
  "done": "Tamam",
  "lock": "Kilitle",
  "sortAscending": "Artan Sıralama",
  "sortDescending": "Azalan Sıralama",
  "unlock": "Kilidini Aç",
  "filter": "Filtrele"
});
}

/* RecurrenceEditor messages */

if (kendo.ui.RecurrenceEditor) {
kendo.ui.RecurrenceEditor.prototype.options.messages =
$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
  "daily": {
    "interval": "Günler",
    "repeatEvery": "Her gün tekrarla"
  },
  "end": {
    "after": "Sonra",
    "label": "Bitiş",
    "mobileLabel": "Bitiş",
    "never": "Asla/Hiç",
    "occurrence": "Olay",
    "on": "Anlık"
  },
  "frequencies": {
    "daily": "Günlük",
    "monthly": "Aylık",
    "never": "Asla/Hiç",
    "weekly": "Haftalık",
    "yearly": "Yıllık"
  },
  "monthly": {
    "day": "Gün",
    "interval": "Aylar",
    "repeatEvery": "Her ay tekrarla",
    "repeatOn": "Tekrarla"
  },
  "offsetPositions": {
    "first": "İlk",
    "fourth": "Dördüncü",
    "last": "Son",
    "second": "İkinci",
    "third": "Üçüncü"
  },
  "weekdays": {
    "day": "Gün",
    "weekday": "İş günü",
    "weekend": "Haftasonu"
  },
  "weekly": {
    "interval": "Haftalar",
    "repeatEvery": "Her hafta tekrarla",
    "repeatOn": "Tekrarla"
  },
  "yearly": {
    "interval": "Yıllar",
    "of": "Arasında",
    "repeatEvery": "Her Yıl Tekrarla",
    "repeatOn": "Tekrarla"
  }
});
}

/* Editor messages */

if (kendo.ui.Editor) {
kendo.ui.Editor.prototype.options.messages =
$.extend(true, kendo.ui.Editor.prototype.options.messages,{
  "addColumnLeft": "Sola kolon ekle",
  "addColumnRight": "Sağa kolon ekle",
  "addRowAbove": "Yukarıya satır ekle",
  "addRowBelow": "Aşağıya satır ekle",
  "backColor": "Arka plan rengi",
  "bold": "Kalın ",
  "createLink": "Köprü ekleme",
  "createTable": "Tablo oluştur",
  "deleteColumn": "Sütun silme",
  "deleteFile": "Silmek istediğinizden emin misiniz?",
  "deleteRow": "Satır sil",
  "dialogButtonSeparator": "ya da",
  "dialogCancel": "İptal",
  "dialogInsert": "Ekle",
  "dialogUpdate": "Güncelle",
  "directoryNotFound": "Bu isimde bir dizin bulunamadı.",
  "dropFilesHere": "Yüklemek için dosyaları buraya bırakın",
  "emptyFolder": "Boş klasör",
  "fontName": "Font ailesi Seçiniz",
  "fontNameInherit": "Devralınan Karakter",
  "fontSize": "Font boyutu Seçiniz",
  "fontSizeInherit": "Devralınan Boyut",
  "foreColor": "Renk",
  "formatBlock": "Biçim",
  "formatting": "Biçimlendirme",
  "imageAltText": "Alternatif metin",
  "imageWebAddress": "Web adresi",
  "indent": "Satırbaşı",
  "insertHtml": "HTML ekle",
  "insertImage": "Resim ekle",
  "insertOrderedList": "Sıralı liste ekle",
  "insertUnorderedList": "Sırasız liste ekle",
  "invalidFileType": "Seçilen dosya \"{0}\" geçerli değil. Desteklenen dosya türleri: {1}.",
  "italic": "İtalik karakter",
  "justifyCenter": "Merkezi metin",
  "justifyFull": "Doğrulama",
  "justifyLeft": "Metni sola yasla",
  "justifyRight": "Metni sağa yasla",
  "linkOpenInNewWindow": "Yeni pencerede aç",
  "linkText": "Metin",
  "linkToolTip": "Araç İpucu",
  "linkWebAddress": "Web adresi",
  "orderBy": "Düzenleme ölçütü:",
  "orderByName": "İsim",
  "orderBySize": "Boyut",
  "outdent": "Çıkıntı",
  "overwriteFile": "Dizinde \"{0}\" isimli bir dosya zaten mevcut. Üzerine yazmak istiyor musunuz?",
  "search": "Arama",
  "strikethrough": "Üstü çizili",
  "styles": "Stiller",
  "subscript": "İndis",
  "superscript": "Üstyazı",
  "underline": "Altını çiz",
  "unlink": "Köprüyü Kaldır",
  "uploadFile": "Yükle",
  "viewHtml": "HTML Görünümü ",
  "insertFile": "Dosya Ekle"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Temizle",
  "filter": "Filtre",
  "isFalse": "Yanlış",
  "isTrue": "Doğru",
  "operator": "Operatör"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "Ve",
  "cancel": "İptal",
  "clear": "Temizle",
  "filter": "Filtrele",
  "info": "Tanıma uyan kayıtları göster:",
  "title": "Tanıma uyan kayıtları göster",
  "isFalse": "Yanlış",
  "isTrue": "Doğru",
  "operator": "Operatör",
  "additionalOperator": "Ek Operatör",
  "or": "Veya",
  "selectValue": "Değer Seçiniz",
  "value": "Değer",
  "additionalValue": "Ek Değer",
  "logic": "Bağıntı"
});
}

/* FilterMultiCheck messages */

if (kendo.ui.FilterMultiCheck) {
kendo.ui.FilterMultiCheck.prototype.options.messages =
$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
  "search": "Arama",
  "checkAll": "Tümünü İşaretle",
  "clear": "Temizle",
  "filter": "Filtrele",
  "selectedItemsFormat": "{0} seçenek işaretlendi"
});
}

/* Grid messages */

if (kendo.ui.Grid) {
kendo.ui.Grid.prototype.options.messages =
$.extend(true, kendo.ui.Grid.prototype.options.messages,{
  "commands": {
    "canceledit": "İptal",
    "cancel": "Değişiklikleri iptal et",
    "create": "Yeni Kayıt Ekle",
    "destroy": "Sil",
    "edit": "Düzenle",
    "excel": "Excel Kaydet",
    "pdf": "PDF Kaydet",
    "save": "Değişiklikleri Kaydet",
    "select": "Seç",
    "update": "Güncelle"
  },
  "editable": {
    "cancelDelete": "İptal",
    "confirmation": "Kayıtları silmek istediğinizden emin misiniz ?",
    "confirmDelete": "Sil"
  }
});
}

/* Groupable messages */

if (kendo.ui.Groupable) {
kendo.ui.Groupable.prototype.options.messages =
$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
  "empty": "Bir sütun başlığını sürükleyin ve bu sütuna göre gruplandırmak için buraya bırakın"
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Tümü",
  "display": "{0} - {1} aralığı gösteriliyor. Toplam {2} öğe var",
  "empty": "Görüntülenecek öğe yok",
  "first": "İlk sayfaya git",
  "itemsPerPage": "Sayfa başına ürün",
  "last": "Son sayfaya git",
  "morePages": "Daha fazla sayfa",
  "next": "Bir sonraki sayfaya git",
  "of": "{0}",
  "page": "Sayfa",
  "previous": "Bir önceki sayfaya git",
  "refresh": "Güncelle"
});
}

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Tümü",
  "display": "{0} - {1} aralığı gösteriliyor. Toplam {2} öğe var",
  "empty": "Görüntülenecek öğe yok",
  "first": "İlk sayfaya git",
  "itemsPerPage": "Sayfa başına ürün",
  "last": "Son sayfaya git",
  "morePages": "Daha fazla sayfa",
  "next": "Bir sonraki sayfaya git",
  "of": "{0}",
  "page": "Sayfa",
  "previous": "Bir önceki sayfaya git",
  "refresh": "Güncelle"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "Tüm gün",
  "cancel": "İptal Et",
  "editable": {
    "confirmation": "Bu etkinliği silmek istediğinizden emin misiniz?"
  },
  "date": "Tarih",
  "deleteWindowTitle": "Etkinliği sil",
  "destroy": "Sil",
  "editor": {
    "allDayEvent": "Tüm gün süren olay",
    "description": "Tanım",
    "editorTitle": "Olay",
    "end": "Bitiş",
    "endTimezone": "Bitiş saati",
    "noTimezone": "Zaman Aralığı belirtilmemiş",
    "repeat": "Tekrar",
    "separateTimezones": "Ayrı bir başlangıç ve bitiş Zaman aralığı kullan",
    "start": "Başlangıç",
    "startTimezone": "Başlangıç Saati",
    "timezone": "",
    "timezoneEditorButton": "Zaman Aralığı",
    "timezoneEditorTitle": "Zaman Aralığı",
    "title": "Tanım"
  },
  "event": "Olay",
  "recurrenceMessages": {
    "deleteRecurring": "Sadece bu olayı mı yoksa bütün seriyi mi silmek istiyorsunuz?",
    "deleteWindowOccurrence": "Geçerli yinelemeyi Sil",
    "deleteWindowSeries": "Seriyi Sil",
    "deleteWindowTitle": "Tekrarlanan Öğeyi Sil",
    "editRecurring": "Sadece bu olayı mı yoksa bütün seriyi mi düzenlemek istiyorsunuz?",
    "editWindowOccurrence": "Geçerli Olayı Düzenle",
    "editWindowSeries": "Seriyi düzenle",
    "editWindowTitle": "Tekrarlanan Öğeyi Düzenle"
  },
  "save": "Kaydet",
  "showFullDay": "Tüm gün göster",
  "showWorkDay": "İş saatlerini göster",
  "time": "Zaman",
  "today": "Bugün",
  "views": {
    "agenda": "Gündem",
    "day": "Gün",
    "month": "Ay",
    "week": "Hafta",
    "workWeek": "Çalışma Haftası"
  }
});
}

/* Upload messages */

if (kendo.ui.Upload) {
kendo.ui.Upload.prototype.options.localization =
$.extend(true, kendo.ui.Upload.prototype.options.localization,{
  "cancel": "İptal Et",
  "dropFilesHere": "Yüklemek için dosyaları buraya bırakın",
  "headerStatusUploaded": "Tamamlandı",
  "headerStatusUploading": "Yükleniyor",
  "remove": "Kaldır",
  "retry": "Tekrar Dene",
  "select": "Seçiniz",
  "statusFailed": "Başarısız Oldu",
  "statusUploaded": "Yüklendi",
  "statusUploading": "Yükleniyor",
  "uploadSelectedFiles": "Seçilen dosyaları Yükle"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Kapat"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "Tamam"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "Tamam",
  "cancel": "İptal"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "Tamam",
  "cancel": "İptal"
});
}

/* DateInput */
if (kendo.ui.DateInput) {
  kendo.ui.DateInput.prototype.options.messages =
    $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
      "year": "yıl",
      "month": "ay",
      "day": "gün",
      "weekday": "haftanın günü",
      "hour": "saat",
      "minute": "dakika",
      "second": "saniye",
      "dayperiod": "AM/PM"
    });
}  
  
})(window.kendo.jQuery);

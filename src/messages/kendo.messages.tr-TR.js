

/* Filter menu operator messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.operators =
$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
  "date": {
    "eq": "Eşittir",
    "gt": "Sonra",
    "gte": "Sonra ya da eşit",
    "lt": "Önce",
    "lte": "Önce ya da eşit",
    "neq": "Eşit değildir"
  },
  "enums": {
    "eq": "Eşittir",
    "neq": "Eşit değildir"
  },
  "number": {
    "eq": "Eşittir",
    "gt": "Büyüktür",
    "gte": "Daha büyük veya eşittir",
    "lt": "Daha küçük",
    "lte": "Daha küçük veya eşit",
    "neq": "Eşit değildir"
  },
  "string": {
    "contains": "İçeriyor",
    "doesnotcontain": "İçermiyor",
    "endswith": "İle biter",
    "eq": "Eşittir",
    "neq": "Eşit değildir",
    "startswith": "İle başlar"
  }
});
}

/* Filter menu operator messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.operators =
$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
  "date": {
    "eq": "Eşittir",
    "gt": "Sonra",
    "gte": "Sonra ya da eşit",
    "lt": "Önce",
    "lte": "Önce ya da eşit",
    "neq": "Eşit değildir"
  },
  "enums": {
    "eq": "Eşittir",
    "neq": "Eşit değildir"
  },
  "number": {
    "eq": "Eşittir",
    "gt": "Büyüktür",
    "gte": "Daha büyük veya eşittir",
    "lt": "Daha küçük",
    "lte": "Daha küçük veya eşit",
    "neq": "Eşit değildir"
  },
  "string": {
    "contains": "İçeriyor",
    "doesnotcontain": "İçermiyor",
    "endswith": "İle biter",
    "eq": "Eşittir",
    "neq": "Eşit değildir",
    "startswith": "İle başlar"
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
  "unlock": "Kilidini Aç"
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
  "addRowAbove": "Yukarıdaki satır ekle",
  "addRowBelow": "Aşağıdaki satır ekle",
  "backColor": "Arka plan rengi",
  "bold": "Kalın ",
  "createLink": "Köprü ekleme",
  "createTable": "Tablo oluştur",
  "deleteColumn": "Sütun silme",
  "deleteFile": "Silmek istediğinizden emin misiniz ?",
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
  "indent": "Aatırbaşı",
  "insertHtml": "HTML ekle",
  "insertImage": "Resim ekle",
  "insertOrderedList": "Sıralı liste ekleme",
  "insertUnorderedList": "Sırasız liste ekleme",
  "invalidFileType": "Seçinizilen dosya \"{0}\" geçerli değil. Desteklenen dosya türleri {1} vardır.",
  "italic": "İtalik karakter",
  "justifyCenter": "Merkezi metin",
  "justifyFull": "Doğrulama",
  "justifyLeft": "Metni sola yasla",
  "justifyRight": "Metni sağa yasla",
  "linkOpenInNewWindow": "Yeni pencerede aç",
  "linkText": "Metin",
  "linkToolTip": "Araç İpucu",
  "linkWebAddress": "Web address",
  "orderBy": "Düzenleme ölçütü:",
  "orderByName": "İsim",
  "orderBySize": "Boyut",
  "outdent": "Çıkıntı",
  "overwriteFile": "İsimde bir dosya \"{0}\" zaten dizinde mevcut. Bunu üzerine yazmak istiyor musunuz?",
  "search": "Arama",
  "strikethrough": "Üstü çizili",
  "styles": "Stiller",
  "subscript": "İndis",
  "superscript": "Üstyazı",
  "underline": "Altını çizmek",
  "unlink": "Köprüyü Kaldır",
  "uploadFile": "Yükle",
  "viewHtml": "HTML Görünümü ",
  "insertFile": "Insert file"
});
}

/* FilterCell messages */

if (kendo.ui.FilterCell) {
kendo.ui.FilterCell.prototype.options.messages =
$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
  "clear": "Temizle",
  "filter": "Filtre",
  "isFalse": "FALSE",
  "isTrue": "Doğru ",
  "operator": "Operatör(işletmen)"
});
}

/* FilterMenu messages */

if (kendo.ui.FilterMenu) {
kendo.ui.FilterMenu.prototype.options.messages =
$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
  "and": "Ve",
  "cancel": "İptal",
  "clear": "Temizle",
  "filter": "Filtre",
  "info": "bu ile bu arasındaki değerleri göster",
  "isFalse": "FALSE",
  "isTrue": "Doğru ",
  "operator": "Operatör(işletmen)",
  "or": "ya da",
  "selectValue": "Değer Seçiniziniz",
  "value": "Değer"
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
    "save": "Değişiklikleri Kaydet",
    "select": "Seçiniz",
    "update": "Güncelle"
  },
  "editable": {
    "cancelDelete": "İptal",
    "confirmation": "Kayıtları Silmek istediğinizden emin misiniz ?",
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
  "display": "{0} - {1} aralığı gösteriliyor. Toplam {2} öğe var",
  "empty": "Görüntülenecek öğe yok",
  "first": "İlk sayfaya git",
  "itemsPerPage": "Sayfa başına ürün",
  "last": "Son sayfaya git",
  "morePages": "Daha fazla sayfa",
  "next": "Bir sonraki sayfaya git",
  "of": "{0}",
  "page": "Sayfa",
  "previous": "Sayfaları İncele",
  "refresh": "Güncelle"
});
}

/* Scheduler messages */

if (kendo.ui.Scheduler) {
kendo.ui.Scheduler.prototype.options.messages =
$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
  "allDay": "Tüm gün",
  "cancel": "İptal Et",
  "confirmation": "Bu etkinliği silmek istediğinizden emin misiniz?",
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
    "deleteRecurring": "Sadece bu olayı ya da bütün dizini mi silmek istiyor musunuz?",
    "deleteWindowOccurrence": "Geçerli yinelemeyi Sil",
    "deleteWindowSeries": "Seriyi Sil",
    "deleteWindowTitle": "Tekrarlanan Öğeyi Sil",
    "editRecurring": "Sadece bu olay oluşumunu veya tüm dizini düzenlemek istiyor musunuz?",
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
  "headerStatusUploaded": "Tamalandı",
  "headerStatusUploading": "Yükleniyor",
  "remove": "Kaldır",
  "retry": "Tekrar Dene",
  "select": "Seçiniz",
  "statusFailed": "Başarız Oldu",
  "statusUploaded": "Yüklendi",
  "statusUploading": "Yükleniyor",
  "uploadSelectedFiles": "seçilen dosyaları Yükle"
});
}

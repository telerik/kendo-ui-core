(function($, undefined) {

/* FilterMenu operator messages */

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
  "style": "Stiller",
  "subscript": "İndis",
  "superscript": "Üstyazı",
  "underline": "Altını çiz",
  "unlink": "Köprüyü Kaldır",
  "uploadFile": "Yükle",
  "viewHtml": "HTML Görünümü ",
  "insertFile": "Dosya Ekle"
});
}

/* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "No records to display",
  "loading": "Loading...",
  "requestFailed": "Request failed.",
  "retry": "Tekrar Dene",
  "commands": {
      "edit": "Düzenle",
      "update": "Güncelle",
      "canceledit": "Cancel",
      "create": "Yeni Kayıt Ekle",
      "createchild": "Add child record",
      "destroy": "Sil",
      "excel": "Excel'e aktar",
      "pdf": "PDF'e aktar"
  }
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
    "add": "Yeni Kayıt Ekle",
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
  "search": "Arama...",
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

/* Spreadsheet messages */

if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
kendo.spreadsheet.messages.borderPalette =
$.extend(true, kendo.spreadsheet.messages.borderPalette,{
  "allBorders": "Tüm sınırlar",
  "insideBorders": "İç sınırlar",
  "insideHorizontalBorders": "Yatay sınırların içinde",
  "insideVerticalBorders": "Dikey sınırların içinde",
  "outsideBorders": "Dış sınırlar",
  "leftBorder": "sol kenarlık",
  "topBorder": "Üst kenarlık",
  "rightBorder": "Sağ kenarlık",
  "bottomBorder": "Alt sınır",
  "noBorders": "Sınır yok",
  "reset": "Rengi sıfırla",
  "customColor": "Özel renk...",
  "apply": "Uygulamak",
  "cancel": "İptal etmek"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
kendo.spreadsheet.messages.dialogs =
$.extend(true, kendo.spreadsheet.messages.dialogs,{
  "apply": "Uygulamak",
  "save": "Kayıt etmek",
  "cancel": "İptal etmek",
  "remove": "Kaldırmak",
  "retry": "yeniden dene",
  "revert": "geri al",
  "okText": "tamam",
  "formatCellsDialog": {
    "title": "Biçim",
    "categories": {
      "number": "Numara",
      "currency": "Para birimi",
      "date": "Tarih"
    }
  },
  "fontFamilyDialog": {
    "title": "Yazı tipi"
  },
  "fontSizeDialog": {
    "title": "Yazı Boyutu"
  },
  "bordersDialog": {
    "title": "Sınırlar"
  },
  "alignmentDialog": {
    "title": "hizalama",
    "buttons": {
      "justifyLeft": "Sola hizalamak",
      "justifyCenter": "merkez",
      "justifyRight": "Sağa hizala",
      "justifyFull": "Savunmak",
      "alignTop": "Üste hizala",
      "alignMiddle": "Ortaya hizala",
      "alignBottom": "Aşağıya hizala"
    }
  },
  "mergeDialog": {
    "title": "Hücreleri birleştir",
    "buttons": {
      "mergeCells": "Tümünü birleştir",
      "mergeHorizontally": "Yatay olarak birleştir",
      "mergeVertically": "Dikey olarak birleştir",
      "unmerge": "Ayır"
    }
  },
  "freezeDialog": {
    "title": "Donma bölmeleri",
    "buttons": {
      "freezePanes": "Donma bölmeleri",
      "freezeRows": "Satırları dondur",
      "freezeColumns": "Sütunları dondur",
      "unfreeze": "Bölmeleri çöz"
    }
  },
  "confirmationDialog": {
    "text": "Bu sayfayı kaldırmak istediğinizden emin misiniz?",
    "title": "Sayfayı kaldır"
  },
  "validationDialog": {
    "title": "Veri doğrulama",
    "hintMessage": "Lütfen geçerli bir {0} değeri {1} girin.",
    "hintTitle": "doğrulama {0}",
    "criteria": {
      "any": "Herhangi bir değer",
      "number": "Numara",
      "text": "Metin",
      "date": "Tarih",
      "custom": "Özel Formül",
      "list": "Liste"
    },
    "comparers": {
      "greaterThan": "daha büyük",
      "lessThan": "daha az",
      "between": "arasında",
      "notBetween": "arasında değil",
      "equalTo": "eşittir",
      "notEqualTo": "eşit değil",
      "greaterThanOrEqualTo": "büyük veya eşit",
      "lessThanOrEqualTo": "küçük veya eşittir"
    },
    "comparerMessages": {
      "greaterThan": "{0} değerinden büyük",
      "lessThan": "{0} değerinden az",
      "between": "{0} ile {1} arasında",
      "notBetween": "{0} ile {1} arasında değil",
      "equalTo": "{0}'e eşit",
      "notEqualTo": "{0}'e eşit değil",
      "greaterThanOrEqualTo": "{0} değerinden büyük veya ona eşit",
      "lessThanOrEqualTo": "{0} değerinden küçük veya ona eşit",
      "custom": "şu formülü karşılayan: {0}"
    },
    "labels": {
      "criteria": "kriterler",
      "comparer": "Karşılaştırıcı",
      "min": "Min.",
      "max": "Maks.",
      "value": "Değer",
      "start": "Başlangıç",
      "end": "Son",
      "onInvalidData": "geçersiz verilerde",
      "rejectInput": "Girişi reddet",
      "showWarning": "Uyarı göster",
      "showHint": "İpucu göster",
      "hintTitle": "İpucu başlığı",
      "hintMessage": "İpucu mesajı",
      "ignoreBlank": "Boşluğu yoksay"
    },
    "placeholders": {
      "typeTitle": "Başlık yazın",
      "typeMessage": "Mesaj yazın"
    }
  },
  "exportAsDialog": {
    "title": "İhracat...",
    "labels": {
      "fileName": "Dosya adı",
      "saveAsType": "Tür olarak kaydet",
      "exportArea": "İhracat",
      "paperSize": "Kağıt boyutu",
      "margins": "kenar boşlukları",
      "orientation": "Oryantasyon",
      "print": "Yazdır",
      "guidelines": "yönergeler",
      "center": "merkez",
      "horizontally": "yatay",
      "vertically": "dikey"
    }
  },
  "modifyMergedDialog": {
    "errorMessage": "Birleştirilmiş hücrenin bir kısmı değiştirilemez."
  },
  "useKeyboardDialog": {
    "title": "Kopyalama ve yapıştırma",
    "errorMessage": "Bu eylemler menü aracılığıyla çağrılamaz. Lütfen bunun yerine klavye kısayollarını kullanın:",
    "labels": {
      "forCopy": "kopya için",
      "forCut": "kesim için",
      "forPaste": "yapıştırmak için"
    }
  },
  "unsupportedSelectionDialog": {
    "errorMessage": "Bu işlem çoklu seçimde gerçekleştirilemez."
  },
  "insertCommentDialog": {
    "title": "Yorum ekle",
    "labels": {
      "comment": "Yorum Yap",
      "removeComment": "Yorumu kaldır"
    }
  },
  "insertImageDialog": {
    "title": "Resim ekle",
    "info": "Bir resmi buraya sürükleyin veya seçmek için tıklayın",
    "typeError": "Lütfen bir JPEG, PNG veya GIF resmi seçin"
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
kendo.spreadsheet.messages.filterMenu =
$.extend(true, kendo.spreadsheet.messages.filterMenu,{
  "sortAscending": "A'dan Z'ye sıralama aralığı",
  "sortDescending": "Z'den A'ya kadar sıralama aralığı",
  "filterByValue": "Değere göre filtrele",
  "filterByCondition": "Koşullara göre filtrele",
  "apply": "Uygulamak",
  "search": "Aramak",
  "addToCurrent": "Geçerli seçime ekle",
  "clear": "Temizlemek",
  "blanks": "(Boşluklar)",
  "operatorNone": "Hiçbiri",
  "and": "VE",
  "or": "VEYA",
  "operators": {
    "string": {
      "contains": "Metin şunları içerir:",
      "doesnotcontain": "Metin içermiyor",
      "startswith": "Metin şununla başlar:",
      "endswith": "Metin şununla biter:"
    },
    "date": {
      "eq": "Tarih:",
      "neq": "Tarih değil",
      "lt": "Tarih önce",
      "gt": "Tarih sonra"
    },
    "number": {
      "eq": "Eşittir",
      "neq": "Eşit değildir",
      "gte": "Daha büyük veya eşittir",
      "gt": "Daha büyüktür",
      "lte": "Küçük veya eşittir",
      "lt": "Daha az"
    }
  }
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
kendo.spreadsheet.messages.colorPicker =
$.extend(true, kendo.spreadsheet.messages.colorPicker,{
  "reset": "Rengi sıfırla",
  "customColor": "Özel renk...",
  "apply": "Uygulamak",
  "cancel": "İptal etmek"
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
kendo.spreadsheet.messages.toolbar =
$.extend(true, kendo.spreadsheet.messages.toolbar,{
  "addColumnLeft": "Sola sütun ekle",
  "addColumnRight": "Sağa sütun ekle",
  "addRowAbove": "Yukarıya satır ekle",
  "addRowBelow": "Aşağıya satır ekle",
  "alignment": "hizalama",
  "alignmentButtons": {
    "justifyLeft": "Sola hizalamak",
    "justifyCenter": "merkez",
    "justifyRight": "Sağa hizala",
    "justifyFull": "Savunmak",
    "alignTop": "Üste hizala",
    "alignMiddle": "Ortaya hizala",
    "alignBottom": "Aşağıya hizala"
  },
  "backgroundColor": "Arka plan",
  "bold": "Gözü pek",
  "borders": "Sınırlar",
  "colorPicker": {
    "reset": "Rengi sıfırla",
    "customColor": "Özel renk..."
  },
  "copy": "kopyala",
  "cut": "Kesmek",
  "deleteColumn": "Sütunu sil",
  "deleteRow": "Sırayı sil",
  "excelImport": "Excel'den içe aktar...",
  "filter": "filtre",
  "fontFamily": "Yazı tipi",
  "fontSize": "Yazı Boyutu",
  "format": "Özel biçim...",
  "formatTypes": {
    "automatic": "Otomatik",
    "number": "Numara",
    "percent": "Yüzde",
    "financial": "Parasal",
    "currency": "Para birimi",
    "date": "Tarih",
    "time": "Zaman",
    "dateTime": "tarih saat",
    "duration": "Süre",
    "moreFormats": "Daha fazla format..."
  },
  "formatDecreaseDecimal": "Ondalık sayıyı azalt",
  "formatIncreaseDecimal": "Ondalık sayıyı artır",
  "freeze": "Donma bölmeleri",
  "freezeButtons": {
    "freezePanes": "Donma bölmeleri",
    "freezeRows": "Satırları dondur",
    "freezeColumns": "Sütunları dondur",
    "unfreeze": "Bölmeleri çöz"
  },
  "insertComment": "Yorum ekle",
  "insertImage": "Resim ekle",
  "italic": "İtalik",
  "merge": "Hücreleri birleştir",
  "mergeButtons": {
    "mergeCells": "Tümünü birleştir",
    "mergeHorizontally": "Yatay olarak birleştir",
    "mergeVertically": "Dikey olarak birleştir",
    "unmerge": "Ayır"
  },
  "open": "Açık...",
  "paste": "Yapıştırmak",
  "quickAccess": {
    "redo": "yinele",
    "undo": "Geri alma"
  },
  "saveAs": "Farklı kaydet...",
  "sortAsc": "Artan sıralama",
  "sortDesc": "Azalan şekilde sırala",
  "sortButtons": {
    "sortSheetAsc": "Sayfayı A'dan Z'ye sırala",
    "sortSheetDesc": "Sayfayı Z'den A'ya sırala",
    "sortRangeAsc": "A'dan Z'ye sıralama aralığı",
    "sortRangeDesc": "Z'den A'ya kadar sıralama aralığı"
  },
  "textColor": "Metin Rengi",
  "textWrap": "Metni kaydır",
  "underline": "Altını çizmek",
  "validation": "Veri doğrulama..."
});
}

if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
kendo.spreadsheet.messages.view =
$.extend(true, kendo.spreadsheet.messages.view,{
  "errors": {
    "shiftingNonblankCells": "Veri kaybı olasılığı nedeniyle hücreler eklenemiyor. Başka bir ekleme konumu seçin veya çalışma sayfanızın sonundaki verileri silin.",
    "filterRangeContainingMerges": "Birleştirme içeren bir aralıkta filtre oluşturulamıyor",
    "validationError": "Girdiğiniz değer, hücrede ayarlanan doğrulama kurallarını ihlal ediyor."
  },
  "tabs": {
    "home": "Ev",
    "insert": "Sokmak",
    "data": "Veri"
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
            "contrastRatio": "Kontrast oranı:",
            "fail": "Başarısız",
            "pass": "Başarılı",
            "hex": "HEX",
            "toggleFormat": "Biçimi değiştir",
            "red": "Kırmızı",
            "green": "Yeşil",
            "blue": "Mavi",
            "alpha": "Alfa"
        });

}

/* FlatColorPicker messages */

if (kendo.ui.FlatColorPicker) {

    kendo.ui.FlatColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
            "apply": "Uygula",
            "cancel": "İptal",
            "noColor": "renk yok",
            "clearColor": "Rengi temizle"
        });

}

/* ColorPicker messages */

if (kendo.ui.ColorPicker) {

    kendo.ui.ColorPicker.prototype.options.messages =
        $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
            "apply": "Uygula",
            "cancel": "İptal",
            "noColor": "renk yok",
            "clearColor": "Rengi temizle"
        });

}

/* DateRangePicker messages */

if (kendo.ui.DateRangePicker) {

    kendo.ui.DateRangePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
            "startLabel": "Başlangıç",
            "endLabel": "Bitiş"
        });

}

/* FileBrowser messages */

if (kendo.ui.FileBrowser) {

    kendo.ui.FileBrowser.prototype.options.messages =
        $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
            "uploadFile": "Yükle",
            "orderBy": "Sırala",
            "orderByName": "Ad",
            "orderBySize": "Boyut",
            "directoryNotFound": "Bu isimde bir dizin bulunamadı.",
            "emptyFolder": "Boş Klasör",
            "deleteFile": "\"{0}\" öğesini silmek istediğinizden emin misiniz?",
            "invalidFileType": "Seçilen dosya \"{0}\" geçersiz. Desteklenen dosya türleri: {1}.",
            "overwriteFile": "Geçerli dizinde \"{0}\" adlı bir dosya zaten var. Üzerine yazmak ister misiniz?",
            "dropFilesHere": "yüklemek için dosyayı buraya bırakın",
            "search": "Ara"
        });

}

/* FileManager messages */

if (kendo.ui.FileManager) {

    kendo.ui.FileManager.prototype.options.messages =
        $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
            "toolbar": {
                "createFolder": "Yeni Klasör",
                "upload": "Yükle",
                "sortDirection": "Sıralama yönü",
                "sortDirectionAsc": "Artan",
                "sortDirectionDesc": "Azalan",
                "sortField": "Sırala",
                "nameField": "Ad",
                "sizeField": "Boyut",
                "typeField": "Tür",
                "dateModifiedField": "Değiştirme tarihi",
                "dateCreatedField": "Oluşturma tarihi",
                "listView": "Liste görünümü",
                "gridView": "Izgara görünümü",
                "search": "Ara",
                "details": "Ayrıntılar",
                "detailsChecked": "Evet",
                "detailsUnchecked": "Hayır",
                "Delete": "Sil",
                "Rename": "Yeniden adlandır"
            },
            "views": {
                "nameField": "Ad",
                "sizeField": "Boyut",
                "typeField": "Tür",
                "dateModifiedField": "Değiştirme tarihi",
                "dateCreatedField": "Oluşturma tarihi",
                "items": "öğe"
            },
            "dialogs": {
                "upload": {
                    "title": "Dosya yükle",
                    "clear": "Temizle",
                    "done": "Bitti"
                },
                "moveConfirm": {
                    "title": " ",
                    "content": "<p class='k-text-center'>Seçilen dosyaları taşımak mı yoksa kopyalamak mı istiyorsunuz?</p>",
                    "okText": "Kopyala",
                    "cancel": "Taşı",
                    "close": "Kapat"
                },
                "deleteConfirm": {
                    "title": "Silmeyi onayla",
                    "content": "<p class='k-text-center'>Seçilen dosyaları silmek istediğinizden emin misiniz?<br/>Bu işlem geri alınamaz.</p>",
                    "okText": "Sil",
                    "cancel": "İptal",
                    "close": "Kapat"
                },
                "renamePrompt": {
                    "title": "Yeniden adlandır",
                    "content": "<p class='k-text-center'>Yeni dosya adı girin</p>",
                    "okText": "Yeniden adlandır",
                    "cancel": "İptal",
                    "close": "Kapat"
                }
            },
            "previewPane": {
                "noFileSelected": "Dosya seçilmedi",
                "extension": "Tür",
                "size": "Boyut",
                "created": "Oluşturma tarihi",
                "createdUtc": "Oluşturma tarihi (UTC)",
                "modified": "Değiştirme tarihi",
                "modifiedUtc": "Değiştirme tarihi (UTC)",
                "items": "öğe"
            }
        });

}

/* Gantt messages */

if (kendo.ui.Gantt) {

    kendo.ui.Gantt.prototype.options.messages =
        $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
            "actions": {
                "addChild": "Alt görev ekle",
                "append": "Görev ekle",
                "insertAfter": "Sonrasına ekle",
                "insertBefore": "Öncesine ekle",
                "pdf": "PDF olarak dışa aktar"
            },
            "cancel": "İptal",
            "deleteDependencyWindowTitle": "Bağımlılığı sil",
            "deleteTaskWindowTitle": "Görevi sil",
            "destroy": "Sil",
            "editor": {
                "assignButton": "Ata",
                "editorTitle": "Görev",
                "end": "Bitiş",
                "percentComplete": "Tamamlanma",
                "resources": "Kaynaklar",
                "resourcesEditorTitle": "Kaynaklar",
                "resourcesHeader": "Kaynaklar",
                "start": "Başlangıç",
                "title": "Başlık",
                "unitsHeader": "Birimler",
                "parent": "Üst",
                "addNew": "Ekle",
                "name": "Ad"
            },
            "save": "Kaydet",
            "selectView": "Görünüm seç",
            "views": {
                "day": "Gün",
                "end": "Bitiş",
                "month": "Ay",
                "start": "Başlangıç",
                "week": "Hafta",
                "year": "Yıl"
            }
        });

}

/* TaskBoard messages */

if (kendo.ui.TaskBoard) {

    kendo.ui.TaskBoard.prototype.options.messages =
        $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
            "edit": "Düzenle",
            "createNewCard": "Yeni kart",
            "create": "Oluştur",
            "search": "Ara",
            "previewCard": "Kartı önizle",
            "addCard": "Kart ekle",
            "editCard": "Kartı düzenle",
            "deleteCard": "Kartı sil",
            "addColumn": "Sütun ekle",
            "editColumn": "Sütunu düzenle",
            "deleteColumn": "Sütunu sil",
            "close": "Kapat",
            "cancel": "İptal",
            "delete": "Sil",
            "saveChanges": "Değişiklikleri kaydet",
            "title": "Başlık:",
            "description": "Açıklama:",
            "newColumn": "Yeni sütun",
            "deleteColumnConfirm": "Bu sütunu silmek istediğinizden emin misiniz?",
            "deleteCardConfirm": "Bu kartı silmek istediğinizden emin misiniz?"
        });

}

/* NumericTextBox messages */

if (kendo.ui.NumericTextBox) {

    kendo.ui.NumericTextBox.prototype.options =
        $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
            "upArrowText": "Değeri artır",
            "downArrowText": "Değeri azalt"
        });

}

/* MediaPlayer messages */

if (kendo.ui.MediaPlayer) {

    kendo.ui.MediaPlayer.prototype.options.messages =
        $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
            "pause": "Duraklat",
            "play": "Oynat",
            "mute": "Sesi kapat",
            "unmute": "Sesi aç",
            "quality": "Kalite",
            "fullscreen": "Tam ekran"
        });

}

/* PivotGrid messages */

if (kendo.ui.PivotGrid) {

    kendo.ui.PivotGrid.prototype.options.messages =
        $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
            "measureFields": "Veri alanlarını buraya bırakın",
            "columnFields": "Sütun alanlarını buraya bırakın",
            "rowFields": "Satır alanlarını buraya bırakın"
        });

}

/* PivotFieldMenu messages */

if (kendo.ui.PivotFieldMenu) {

    kendo.ui.PivotFieldMenu.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
            "info": "Değeri olan öğeleri göster:",
            "sortAscending": "Artan sıralama",
            "sortDescending": "Azalan sıralama",
            "filterFields": "Alan filtresi",
            "filter": "Filtre",
            "include": "Alanları dahil et...",
            "title": "Dahil edilecek alanlar",
            "clear": "Temizle",
            "ok": "Tamam",
            "cancel": "İptal",
            "operators": {
                "contains": "İçerir",
                "doesnotcontain": "İçermez",
                "startswith": "İle başlar",
                "endswith": "İle biter",
                "eq": "Eşittir",
                "neq": "Eşit değildir"
            }
        });

}

/* PivotConfiguratorV2 messages */

if (kendo.ui.PivotConfiguratorV2) {

    kendo.ui.PivotConfiguratorV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotConfiguratorV2.prototype.options.messages, {
            "title": "Ayarlar",
            "cancelButtonText": "İptal",
            "applyButtonText": "Uygula",
            "measures": "Başlamak için alan seçin",
            "columns": "Başlamak için alan seçin",
            "rows": "Başlamak için alan seçin"
        });

}

/* PivotFieldMenuV2 messages */

if (kendo.ui.PivotFieldMenuV2) {

    kendo.ui.PivotFieldMenuV2.prototype.options.messages =
        $.extend(true, kendo.ui.PivotFieldMenuV2.prototype.options.messages, {
            "apply": "Uygula",
            "sortAscending": "Artan sıralama",
            "sortDescending": "Azalan sıralama",
            "filterFields": "Alan filtresi",
            "filter": "Filtre",
            "include": "Alanları dahil et...",
            "clear": "Temizle",
            "reset": "Sıfırla",
            "moveToColumns": "Sütunlara taşı",
            "moveToRows": "Satırlara taşı",
            "movePrevious": "Geri taşı",
            "moveNext": "İleri taşı",
            "filterOperatorsDropDownLabel": "Filtre operatörleri",
            "filterValueTextBoxLabel": "Filtre değeri",
            "operators": {
                "contains": "İçerir",
                "doesnotcontain": "İçermez",
                "startswith": "İle başlar",
                "endswith": "İle biter",
                "eq": "Eşittir",
                "neq": "Eşit değildir"
            }
        });

}

/* MobileRecurrenceEditor messages */

if (kendo.ui.MobileRecurrenceEditor) {

    kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
        $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, {
            "cancel": "İptal",
            "update": "Kaydet",
            "endTitle": "Yinelemeyi bitir",
            "repeatTitle": "Yineleme düzeni",
            "headerTitle": "Olayı yinele",
            "end": {
                "never": "Asla",
                "after": "Sonra",
                "on": "Tarihinde"
            },
            "daily": {
                "interval": "gün"
            },
            "weekly": {
                "interval": "hafta"
            },
            "monthly": {
                "interval": "ay",
                "repeatBy": "Yinele: ",
                "dayOfMonth": "Ayın günü",
                "dayOfWeek": "Haftanın günü"
            },
            "yearly": {
                "interval": "yıl",
                "repeatBy": "Yinele: ",
                "dayOfMonth": "Ayın günü",
                "dayOfWeek": "Haftanın günü",
                "of": " / "
            },
            "endRule": {
                "after": " tekrar",
                "on": "Tarihinde "
            }
        });

}

/* Slider messages */

if (kendo.ui.Slider) {

    kendo.ui.Slider.prototype.options =
        $.extend(true, kendo.ui.Slider.prototype.options, {
            "increaseButtonTitle": "Artır",
            "decreaseButtonTitle": "Azalt",
            "dragHandleTitle": "Sürükle"
        });

}

/* ListBox messaages */

if (kendo.ui.ListBox) {

    kendo.ui.ListBox.prototype.options.messages =
        $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
            "tools": {
                "remove": "Sil",
                "moveUp": "Yukarı taşı",
                "moveDown": "Aşağı taşı",
                "transferTo": "Aktar",
                "transferFrom": "Şuradan aktar",
                "transferAllTo": "Tümünü aktar",
                "transferAllFrom": "Tümünü şuradan aktar"
            }
        });

}

/* TreeView messages */

if (kendo.ui.TreeView) {

    kendo.ui.TreeView.prototype.options.messages =
        $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
            "loading": "Yükleniyor...",
            "requestFailed": "İstek başarısız.",
            "retry": "Yeniden dene"
        });

}

/* Validator messages */

if (kendo.ui.Validator) {

    kendo.ui.Validator.prototype.options.messages =
        $.extend(true, kendo.ui.Validator.prototype.options.messages, {
            "required": "{0} zorunludur",
            "pattern": "{0} geçersiz",
            "min": "{0}, {1} değerinden büyük veya eşit olmalıdır",
            "max": "{0}, {1} değerinden küçük veya eşit olmalıdır",
            "step": "{0} geçersiz",
            "email": "{0} geçerli bir e-posta adresi değil",
            "url": "{0} geçerli bir URL değil",
            "date": "{0} geçerli bir tarih değil",
            "dateCompare": "Bitiş tarihi başlangıç tarihinden sonra olmalıdır"
        });

}

/* kendo.ui.progress method */

if (kendo.ui.progress) {

    kendo.ui.progress.messages =
        $.extend(true, kendo.ui.progress.messages, {
            "loading": "Yükleniyor..."
        });

}

/* TimePicker */

if (kendo.ui.TimePicker) {

    kendo.ui.TimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.TimePicker.prototype.options.messages, {
            "set": "Ayarla",
            "cancel": "İptal",
            "hour": "saat",
            "minute": "dakika",
            "second": "saniye",
            "millisecond": "milisaniye",
            "now": "Şimdi"
        });

}

/* DateTimePicker */

if (kendo.ui.DateTimePicker) {

    kendo.ui.DateTimePicker.prototype.options.messages =
        $.extend(true, kendo.ui.DateTimePicker.prototype.options.messages, {
            "set": "Ayarla",
            "cancel": "İptal",
            "hour": "saat",
            "minute": "dakika",
            "second": "saniye",
            "millisecond": "milisaniye",
            "now": "Şimdi",
            "date": "Tarih",
            "time": "Saat",
            "today": "Bugün",
            "weekColumnHeader": ""
        });

}

/* Calendar */

if (kendo.ui.Calendar) {

    kendo.ui.Calendar.prototype.options.messages =
        $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
            "weekColumnHeader": "",
            "today": "Bugün",
            "navigateTo": "Git: ",
            "parentViews": {
                "month": "Yıl görünümü",
                "year": "On yıl görünümü",
                "decade": "Yüzyıl görünümü"
            }
        });

}

/* List messages */

if (kendo.ui.List) {

    kendo.ui.List.prototype.options.messages =
        $.extend(true, kendo.ui.List.prototype.options.messages, {
            "clear": "temizle",
            "noData": "Veri bulunamadı."
        });

}

/* DropDownTree messages */

if (kendo.ui.DropDownTree) {

    kendo.ui.DropDownTree.prototype.options.messages =
        $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
            "clear": "temizle",
            "noData": "Veri bulunamadı.",
            "singleTag": "öğe seçildi"
        });

}

/* MultiSelect messages */

if (kendo.ui.MultiSelect) {

    kendo.ui.MultiSelect.prototype.options.messages =
        $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
            "clear": "temizle",
            "noData": "Veri bulunamadı.",
            "singleTag": "öğe seçildi"
        });

}

/* Chat messages */

if (kendo.ui.Chat) {

    kendo.ui.Chat.prototype.options.messages =
        $.extend(true, kendo.ui.Chat.prototype.options.messages, {
            "placeholder": "Mesaj yazın...",
            "toggleButton": "Araç çubuğunu değiştir",
            "sendButton": "Gönder"
        });

}

/* Wizard messages */

if (kendo.ui.Wizard) {

    kendo.ui.Wizard.prototype.options.messages =
        $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
            "reset": "Sıfırla",
            "previous": "Önceki",
            "next": "Sonraki",
            "done": "Bitti",
            "step": "Adım",
            "of": "/"
        });

}

/* PDFViewer messages */

if (kendo.ui.PDFViewer) {

    kendo.ui.PDFViewer.prototype.options.messages =
        $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
            "defaultFileName": "Belge",
            "toolbar": {
                "zoom": {
                    "zoomLevel": "Yakınlaştırma düzeyi",
                    "zoomOut": "Uzaklaştır",
                    "zoomIn": "Yakınlaştır",
                    "actualWidth": "Gerçek genişlik",
                    "autoWidth": "Otomatik genişlik",
                    "fitToWidth": "Genişliğe sığdır",
                    "fitToPage": "Sayfaya sığdır"
                },
                "open": "Aç",
                "exportAs": "Dışa aktar",
                "download": "İndir",
                "pager": {
                    "first": "İlk sayfaya git",
                    "previous": "Önceki sayfaya git",
                    "next": "Sonraki sayfaya git",
                    "last": "Son sayfaya git",
                    "of": "/",
                    "page": "sayfa",
                    "pages": "sayfa"
                },
                "print": "Yazdır",
                "toggleSelection": "Seçimi etkinleştir",
                "togglePan": "Kaydırmayı etkinleştir",
                "search": "Ara"
            },
            "errorMessages": {
                "notSupported": "Yalnızca PDF dosyaları desteklenir.",
                "parseError": "PDF dosyası işlenemedi.",
                "notFound": "Dosya bulunamadı.",
                "popupBlocked": "Açılır pencere tarayıcı tarafından engellendi."
            }
        });

}

/* Captcha messages */

if (kendo.ui.Captcha) {

    kendo.ui.Captcha.prototype.options.messages =
        $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
            "reset": "Captcha yeniden oluştur",
            "audio": "Captcha sesini oynat",
            "imageAlt": "Captcha resmindeki metni girin",
            "success": "Doğrulama başarılı"
        });

}

/* OrgChart messages */

if (kendo.ui.OrgChart) {

    kendo.ui.OrgChart.prototype.options.messages =
        $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
            "label": "Organizasyon şeması",
            "edit": "Düzenle",
            "create": "Oluştur",
            "destroy": "Sil",
            "destroyContent": "Bu öğeyi ve alt öğelerini silmek istediğinizden emin misiniz?",
            "destroyTitle": "Öğeyi sil",
            "cancel": "İptal",
            "save": "Kaydet",
            "menuLabel": "Düzenleme menüsü",
            "uploadAvatar": "Yeni resim yükle",
            "parent": "Üst",
            "name": "Ad",
            "title": "Başlık",
            "none": "--Yok--",
            "expand": "Genişlet",
            "collapse": "Daralt"
        });

}

/* Map messages */

if (kendo.dataviz.ui.Map) {

    kendo.dataviz.ui.Map.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Map.prototype.options.messages, {
            "tileTitle": "Harita başlığı"
        });

}

/* Sankey messages */

if (kendo.dataviz.ui.Sankey) {

    kendo.dataviz.ui.Sankey.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Sankey.prototype.options.messages, {
            "tooltipUnits": "{0} Birim"
        });

}

/* Chart messages */

if (kendo.dataviz.ui.Chart) {

    kendo.dataviz.ui.Chart.prototype.options.messages =
        $.extend(true, kendo.dataviz.ui.Chart.prototype.options.messages, {
            "noData": "Kullanılabilir veri yok"
        });

}

  /* FilterCell operators */
  if (kendo.ui.FilterCell) {
    kendo.ui.FilterCell.prototype.options.operators =
      $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
        "string": {
          "eq": "Eşittir",
          "neq": "Eşit değildir",
          "startswith": "İle başlar",
          "contains": "İçerir",
          "doesnotcontain": "İçermez",
          "endswith": "İle biter",
          "isnull": "Null",
          "isnotnull": "Null değil",
          "isempty": "Boş",
          "isnotempty": "Boş değil",
          "isnullorempty": "Değeri yok",
          "isnotnullorempty": "Değeri var"
        },
        "number": {
          "eq": "Eşittir",
          "neq": "Eşit değildir",
          "gte": "Büyük veya eşittir",
          "gt": "Büyüktür",
          "lte": "Küçük veya eşittir",
          "lt": "Küçüktür",
          "isnull": "Null",
          "isnotnull": "Null değil"
        },
        "date": {
          "eq": "Eşittir",
          "neq": "Eşit değildir",
          "gte": "Sonra veya eşit",
          "gt": "Sonra",
          "lte": "Önce veya eşit",
          "lt": "Önce",
          "isnull": "Null",
          "isnotnull": "Null değil"
        },
        "enums": {
          "eq": "Eşittir",
          "neq": "Eşit değildir",
          "isnull": "Null",
          "isnotnull": "Null değil"
        }
      });
  }

})(window.kendo.jQuery);
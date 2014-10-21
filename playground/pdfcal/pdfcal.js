"use strict";

// I apologize for this.  It's classic jQuery pasta.
// Do not treat it as any kind of serious code.  - @mcbazon

var options = {};

generate(); // initial rendering

/* -----[ calendar stuff ]----- */

function generate(newopts) {
    $(".the-rotate")[0].checked = false;
    option("fdow", 0);
    option("title", "So much to do, so little time...");
    option("lang", "en-US");
    option("hilite", {});
    option("hlwkend", { 0: true, 6: true });

    var html = makeTitle();
    var year = option("startYear", new Date().getFullYear());
    var month = option("startMonth", new Date().getMonth());
    for (var i = 0; i < 12; ++i) {
        if (i > 0 && i % 3 == 0)
            html += "<br />";
        html += makeMonthCal(year, month);
        if (month == 11) month = 0, ++year;
        else ++month;
    }
    $("#target").html(html);

    function option(name, def) {
        return options[name] =
            (newopts && newopts[name] != null
             ? newopts[name]
             : options[name] != null
             ? options[name]
             : def);
    }
}

function makeMonthCal(year, month) {
    return [
        "<div class='onemonth'>",
        "<div class='title'>", makeMonthCalTitle(year, month), "</div>",
        "<div class='daynames'>", makeDayNames(), "</div>",
        "<div class='body'>", makeDates(year, month), "</div>",
        "</div>"
    ].join("");
}

function makeMonthCalTitle(year, month) {
    var names = kendo.cultures[options.lang].calendars.standard.months.names;
    return "<span class='month'>" + names[month] + "</span>"
        +  "<span class='year'>" + year + "</span>";
}

function makeDayNames() {
    var names = kendo.cultures[options.lang].calendars.standard.days.namesShort;
    var a = [];
    for (var i = 0; i < 7; ++i)
        a[i] = "<span class='dayname'>" + names[(i + options.fdow) % 7] + "</span>";
    return a.join("");
}

function makeTitle() {
    return "<h1>" + options.title + "</h1>";
}

function makeDataDate(year, month, date) {
    return year + "-" + month + "-" + date;
}

function makeDates(year, month) {
    var start = new Date(year, month, 1, 12, 0, 0, 0);
    start = start.getDay() - options.fdow;
    if (start < 0) start += 7;
    var end = start + numberOfDays(year, month);
    var a = [];
    var date = 1;
    var dow = options.fdow;
    for (var i = 0; i < 42; ++i) {
        if (i >= start && i < end) {
            var hilite = "";
            var hsint = makeDataDate(year, month, date); // how should i name this
            if (options.hilite[hsint]) {
                hilite = " hilite " + options.hilite[hsint];
            }
            if (options.hlwkend[dow]) {
                hilite += " wkend";
            }
            a[i] = "<span data-date='"
                + hsint
                + "' class='date nonempty" + hilite + "'>"
                + (date++)
                + "</span>";
        } else {
            a[i] = "<span class='date empty'>&nbsp;</span>";
        }
        if ((i + 1) % 7 == 0) {
            a[i] += "<br />"; // funny how hard is to do this via CSS.
        }
        dow = (dow + 1) % 7;
    }
    return a.join("");
}

function numberOfDays(year, month) {
    var feb = (year %   4 ? 28 :
               year % 100 ? 29 :
               year % 400 ? 28 : 29);
    return [ 31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month];
}

/* -----[ export functions ]----- */

function pdf() {
    kendo.drawing
        .drawDOM($("#page-content"))
        .then(function(group){
            group.options.set("pdf", {
                paperSize: "A4",
                creator: "http://lisperator.net/",
                title: options.title || "Calendar"
            });
            kendo.drawing.pdf.saveAs(group, "calendar.pdf", "http://kendo.local:7569/");
        });
}

function svg() {
    kendo.drawing
        .drawDOM($("#page-content"))
        .then(kendo.drawing.exportSVG)
        .then(function(svg){
            var blob = new Blob([ svg ], { type: "image/svg+xml" });
            kendo.saveAs({ dataURI: blob, fileName: "calendar.svg" });
        });
}

function image() {
    kendo.drawing
        .drawDOM($("#page-content"))
        .then(kendo.drawing.exportImage)
        .then(function(url){
            kendo.saveAs({ dataURI: url, fileName: "calendar.png" });
        });
}

/* -----[ Config widgets ]----- */

/// jQuery spaghetti follows.

$("#the-start-month").kendoDatePicker({
    depth: "year", start: "year", format: "MMMM, yyyy",
    value: new Date(),
    change: function() {
        var date = this.value();
        generate({
            startYear: date.getFullYear(),
            startMonth: date.getMonth()
        });
    }
});

$("#the-start-fdow").kendoDropDownList({
    change: function() {
        generate({
            fdow: parseFloat(this.value())
        });
    }
});

$("#the-lang").kendoDropDownList({
    dataSource: Object.keys(kendo.cultures).reduce(function(a, id){
        var culture = kendo.cultures[id];
        if (id != "current")
            a.push({ text: culture.name, value: id });
        return a;
    }, []),
    dataTextField: "text",
    dataValueField: "value",
    change: function() {
        var culture = kendo.cultures[this.value()];
        var fdow = culture.calendars.standard.firstDay;
        $("#the-start-fdow").getKendoDropDownList().value(fdow);
        generate({
            lang: this.value(),
            fdow: fdow
        });
    }
});

$(document.body).on("mousedown", ".date.nonempty", function(ev){
    ev.preventDefault();
    var el = $(this), cls = "";
    if (ev.button == 2) {
        el.removeClass("color1 color2 color3 hilite");
    } else {
        if (el.hasClass("color1")) {
            el.removeClass("color1");
            el.addClass(cls = "color2");
        } else if (el.hasClass("color2")) {
            el.removeClass("color2");
            el.addClass(cls = "color3");
        } else if (el.hasClass("color3")) {
            el.removeClass("color3 hilite");
        } else {
            el.addClass("hilite color1");
            cls = "color1";
        }
    }
    if (!cls) {
        delete options.hilite[el.data("date")];
    } else {
        options.hilite[el.data("date")] = cls;
    }
});

$(document.body).on("contextmenu", ".date.nonempty", function(ev){
    ev.preventDefault();
});

$(".the-weekend").click(function(ev){
    var el = $(this);
    if (this.checked) {
        options.hlwkend[el.val()] = true;
    } else {
        delete options.hlwkend[el.val()];
    }
    generate();
});

(function(field){
    function update() {
        generate({
            title: field.val()
        });
    }
    field.change(update).keydown(function(){
        setTimeout(update, 5);
    });
})($("#the-title"));

$(".the-rotate").click(function(){
    $(".onemonth").each(function(){
        var ang = Math.random() * 20 - 10;
        $(this).css({ transform: "rotate(" + ang + "deg)" });
    });
}).contextmenu(function(ev){
    ev.preventDefault();
    $(".onemonth").css({ transform: "none" });
});

(function(){

    $("#the-save").click(function(){
        var name = prompt("Give it a name", current_name);
        if (name) {
            var files = JSON.parse(localStorage.getItem("pdfcal"));
            if (!files) {
                files = {};
                localStorage.setItem("pdfcal", "{}");
            }
            if (files[name]) {
                if (confirm("Already exists. Overwrite?"))
                    save(name);
            } else {
                save(name);
            }
        }
    });

    $("#the-load").click(function(){
        dlg.open().center();
        update();
    });

    $(document.body).on("click", ".loadfile", function(ev){
        ev.preventDefault();
        load($(ev.target).data("name"));
    });

    $(document.body).on("click", ".deletefile", function(ev){
        ev.preventDefault();
        drop($(ev.target).data("name"));
    });

    function save(name) {
        current_name = name;
        var files = JSON.parse(localStorage.getItem("pdfcal"));
        files[name] = options;
        localStorage.setItem("pdfcal", JSON.stringify(files));
    }

    function load(name) {
        current_name = name;
        var files = JSON.parse(localStorage.getItem("pdfcal"));
        options = files[name];
        generate();
        updateWidgets();
        close();
    }

    function drop(name) {
        if (confirm("Delete " + name + "?")) {
            var files = JSON.parse(localStorage.getItem("pdfcal"));
            delete files[name];
            localStorage.setItem("pdfcal", JSON.stringify(files));
            update();
        }
    }

    function update() {
        var files = localStorage.getItem("pdfcal");
        var html = [];
        if (files) {
            html.push("<ul>");
            files = JSON.parse(files);
            for (var i in files) if (Object.prototype.hasOwnProperty.call(files, i)) {
                var name = htmlescape(i);
                html.push("<li><a href='#' class='loadfile' data-name='" + name + "'>"
                          + name
                          + "</a> (<a href='#' class='deletefile' data-name='"
                          + name + "'>delete</a>)</li>");
            }
            html.push("</ul>");
        }
        html = html.join("");
        $("#load-dialog").html(html);
    }

    function close() {
        dlg.close();
    }

    var dlg = $("#load-dialog").kendoWindow({
        width: 500, height: 350, modal: true,
        title: "Load calendar", visible: false
    }).getKendoWindow();

    var current_name = "";

})();

function htmlescape(x) {
    return x.replace(/&/g, "&amp;")
        .replace(/\x22/g, "&quot;")
        .replace(/\x27/g, "&#x27;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\u00A0/g, "&#xa0;");
}

function updateWidgets() {
    $("#the-start-month").getKendoDatePicker().value(new Date(
        options.startYear, options.startMonth, 1, 12, 0, 0, 0
    ));
    $("#the-start-fdow").getKendoDropDownList().value(options.fdow);
    $("#the-lang").getKendoDropDownList().value(options.lang);
    $("#the-title").val(options.title);
    $(".the-weekend").each(function(){
        this.checked = $(this).val() in options.hlwkend;
    });
}

/* -----[ setup fonts for Kendo PDF gen. ]----- */

kendo.pdf.defineFont({
    "FreeMono|Bold|Italic"  : "../freefont/FreeMonoBoldOblique.ttf",
    "FreeMono|Bold"         : "../freefont/FreeMonoBold.ttf",
    "FreeMono|Italic"       : "../freefont/FreeMonoOblique.ttf",
    "FreeMono"              : "../freefont/FreeMono.ttf",
    "FreeSans|Bold|Italic"  : "../freefont/FreeSansBoldOblique.ttf",
    "FreeSans|Bold"         : "../freefont/FreeSansBold.ttf",
    "FreeSans|Italic"       : "../freefont/FreeSansOblique.ttf",
    "FreeSans"              : "../freefont/FreeSans.ttf",
    "FreeSerif|Bold|Italic" : "../freefont/FreeSerifBoldItalic.ttf",
    "FreeSerif|Bold"        : "../freefont/FreeSerifBold.ttf",
    "FreeSerif|Italic"      : "../freefont/FreeSerifItalic.ttf",
    "FreeSerif"             : "../freefont/FreeSerif.ttf"
});

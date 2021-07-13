(function( window, undefined ) {
    kendo.cultures["mer-KE"] = {
        name: "mer-KE",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Kenyan Shilling",
                abbr: "KES",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Ksh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Kiumia","Muramuko","Wairi","Wethatu","Wena","Wetano","Jumamosi"],
                    namesAbbr: ["KIU","MRA","WAI","WET","WEN","WTN","JUM"],
                    namesShort: ["KIU","MRA","WAI","WET","WEN","WTN","JUM"]
                },
                months: {
                    names: ["Januarĩ","Feburuarĩ","Machi","Ĩpurũ","Mĩĩ","Njuni","Njuraĩ","Agasti","Septemba","Oktũba","Novemba","Dicemba"],
                    namesAbbr: ["JAN","FEB","MAC","ĨPU","MĨĨ","NJU","NJR","AGA","SPT","OKT","NOV","DEC"]
                },
                AM: ["RŨ","rũ","RŨ"],
                PM: ["ŨG","ũg","ŨG"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);

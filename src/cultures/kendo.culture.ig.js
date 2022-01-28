(function( window, undefined ) {
    kendo.cultures["ig"] = {
        name: "ig",
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
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "₦"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Mbọsị Ụka","Mọnde","Tiuzdee","Wenezdee","Tọọzdee","Fraịdee","Satọdee"],
                    namesAbbr: ["Ụka","Mọn","Tiu","Wen","Tọọ","Fraị","Sat"],
                    namesShort: ["Ụka","Mọn","Tiu","Wen","Tọọ","Fraị","Sat"]
                },
                months: {
                    names: ["Jenụwarị","Febrụwarị","Maachị","Eprel","Mee","Juun","Julaị","Ọgọọst","Septemba","Ọktoba","Novemba","Disemba"],
                    namesAbbr: ["Jen","Feb","Maa","Epr","Mee","Juu","Jul","Ọgọ","Sep","Ọkt","Nov","Dis"]
                },
                AM: ["A.M.","a.m.","A.M."],
                PM: ["P.M.","p.m.","P.M."],
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
                firstDay: 1
            }
        }
    }
})(this);

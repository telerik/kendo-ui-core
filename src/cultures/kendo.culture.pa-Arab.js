(function( window, undefined ) {
    kendo.cultures["pa-Arab"] = {
        name: "pa-Arab",
        numberFormat: {
            pattern: ["- n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["% n-","% n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "Rs"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["پير","منگل","بدھ","جمعرات","جمعه","هفته","اتوار"],
                    namesAbbr: ["پير","منگل","بدھ","جمعرات","جمعه","هفته","اتوار"],
                    namesShort: ["پ","م","ب","ج","ج","ه","ا"]
                },
                months: {
                    names: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],
                    namesAbbr: ["جنوری","فروری","مارچ","اپریل","مئی","جون","جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd-MM-yy",
                    D: "dd MMMM yyyy dddd",
                    F: "dd MMMM yyyy dddd h.mm.ss tt",
                    g: "dd-MM-yy h.mm tt",
                    G: "dd-MM-yy h.mm.ss tt",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h.mm tt",
                    T: "h.mm.ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "-",
                ":": ".",
                firstDay: 1
            }
        }
    }
})(this);

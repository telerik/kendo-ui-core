(function( window, undefined ) {
    kendo.cultures["gsw-CH"] = {
        name: "gsw-CH",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": "’",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": "’",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Swiss Franc",
                abbr: "CHF",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": "’",
                ".": ".",
                groupSize: [3],
                symbol: "CHF"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sunntig","Määntig","Ziischtig","Mittwuch","Dunschtig","Friitig","Samschtig"],
                    namesAbbr: ["Su.","Mä.","Zi.","Mi.","Du.","Fr.","Sa."],
                    namesShort: ["Su.","Mä.","Zi.","Mi.","Du.","Fr.","Sa."]
                },
                months: {
                    names: ["Januar","Februar","März","April","Mai","Juni","Juli","Auguscht","Septämber","Oktoober","Novämber","Dezämber"],
                    namesAbbr: ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]
                },
                AM: ["v.m.","v.m.","V.M."],
                PM: ["n.m.","n.m.","N.M."],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, d. MMMM yyyy",
                    F: "dddd, d. MMMM yyyy HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

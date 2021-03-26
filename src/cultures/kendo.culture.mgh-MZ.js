(function( window, undefined ) {
    kendo.cultures["mgh-MZ"] = {
        name: "mgh-MZ",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Mozambican Metical",
                abbr: "MZN",
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "MTn"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sabato","Jumatatu","Jumanne","Jumatano","Arahamisi","Ijumaa","Jumamosi"],
                    namesAbbr: ["Sab","Jtt","Jnn","Jtn","Ara","Iju","Jmo"],
                    namesShort: ["Sab","Jtt","Jnn","Jtn","Ara","Iju","Jmo"]
                },
                months: {
                    names: ["Mweri wo kwanza","Mweri wo unayeli","Mweri wo uneraru","Mweri wo unecheshe","Mweri wo unethanu","Mweri wo thanu na mocha","Mweri wo saba","Mweri wo nane","Mweri wo tisa","Mweri wo kumi","Mweri wo kumi na moja","Mweri wo kumi na yel’li"],
                    namesAbbr: ["Kwa","Una","Rar","Che","Tha","Moc","Sab","Nan","Tis","Kum","Moj","Yel"]
                },
                AM: ["wichishu","wichishu","WICHISHU"],
                PM: ["mchochil’l","mchochil’l","MCHOCHIL’L"],
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
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);

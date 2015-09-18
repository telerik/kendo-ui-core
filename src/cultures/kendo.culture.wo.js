(function( window, undefined ) {
    kendo.cultures["wo"] = {
        name: "wo",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "CFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Dibéer","Altine","Talaata","Àllarba","Alxames","Àjjuma","Gaawu"],
                    namesAbbr: ["Dib.","Alt.","Tal.","Àll.","Alx.","Àjj.","Gaa."],
                    namesShort: ["Di","Al","Ta","Àl","Ax","Àj","Ga"]
                },
                months: {
                    names: ["Samwiye","Fewriye","Maars","Awril","Me","Suwe","Sullet","Ut","Septàmbar","Oktoobar","Noowàmbar","Desàmbar"],
                    namesAbbr: ["Sam.","Few.","Maa","Awr.","Me","Suw","Sul.","Ut","Sept.","Okt.","Now.","Des."]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
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

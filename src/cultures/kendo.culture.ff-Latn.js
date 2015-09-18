(function( window, undefined ) {
    kendo.cultures["ff-Latn"] = {
        name: "ff-Latn",
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
                    names: ["alete","altine","talaata","alarba","alkamiisa","aljumaa","asete"],
                    namesAbbr: ["alet","alt.","tal.","alar.","alk.","alj.","aset"],
                    namesShort: ["Al","Te","Ta","Al","Al","Ju","As"]
                },
                months: {
                    names: ["samwiee","feeburyee","marsa","awril","me","suyeŋ","sulyee","ut","satambara","oktoobar","nowamburu","deesamburu"],
                    namesAbbr: ["samw","feeb","mar","awr","me","suy","sul","ut","sat","okt","now","dees"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "dd MMMM",
                    M: "dd MMMM",
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

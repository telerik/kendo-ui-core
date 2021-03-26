(function( window, undefined ) {
    kendo.cultures["ff-Latn-NG"] = {
        name: "ff-Latn-NG",
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
                name: "Nigerian Naira",
                abbr: "NGN",
                pattern: ["-$n","$ n"],
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
                    d: "d/M/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy HH:mm:ss",
                    g: "d/M/yyyy H:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
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

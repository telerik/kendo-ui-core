(function( window, undefined ) {
    kendo.cultures["az"] = {
        name: "az",
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
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "₼"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["bazar","bazar ertəsi","çərşənbə axşamı","çərşənbə","cümə axşamı","cümə","şənbə"],
                    namesAbbr: ["B.","B.E.","Ç.A.","Ç.","C.A.","C.","Ş."],
                    namesShort: ["B.","B.E.","Ç.A.","Ç.","C.A.","C.","Ş."]
                },
                months: {
                    names: ["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr"],
                    namesAbbr: ["yan","fev","mar","apr","may","iyn","iyl","avq","sen","okt","noy","dek"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy, dddd",
                    F: "d MMMM yyyy, dddd HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
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

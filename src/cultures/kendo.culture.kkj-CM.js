(function( window, undefined ) {
    kendo.cultures["kkj-CM"] = {
        name: "kkj-CM",
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
                name: "Central African CFA Franc",
                abbr: "XAF",
                pattern: ["-$ n","$ n"],
                decimals: 0,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "FCFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["sɔndi","lundi","mardi","mɛrkɛrɛdi","yedi","vaŋdɛrɛdi","mɔnɔ sɔndi"],
                    namesAbbr: ["sɔndi","lundi","mardi","mɛrkɛrɛdi","yedi","vaŋdɛrɛdi","mɔnɔ sɔndi"],
                    namesShort: ["sɔndi","lundi","mardi","mɛrkɛrɛdi","yedi","vaŋdɛrɛdi","mɔnɔ sɔndi"]
                },
                months: {
                    names: ["pamba","wanja","mbiyɔ mɛndoŋgɔ","Nyɔlɔmbɔŋgɔ","Mɔnɔ ŋgbanja","Nyaŋgwɛ ŋgbanja","kuŋgwɛ","fɛ","njapi","nyukul","11","ɓulɓusɛ"],
                    namesAbbr: ["pamba","wanja","mbiyɔ mɛndoŋgɔ","Nyɔlɔmbɔŋgɔ","Mɔnɔ ŋgbanja","Nyaŋgwɛ ŋgbanja","kuŋgwɛ","fɛ","njapi","nyukul","11","ɓulɓusɛ"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM yyyy",
                    D: "dddd dd MMMM yyyy",
                    F: "dddd dd MMMM yyyy HH:mm:ss",
                    g: "dd/MM yyyy HH:mm",
                    G: "dd/MM yyyy HH:mm:ss",
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
                firstDay: 1
            }
        }
    }
})(this);

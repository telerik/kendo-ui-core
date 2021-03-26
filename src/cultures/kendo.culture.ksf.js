(function( window, undefined ) {
    kendo.cultures["ksf"] = {
        name: "ksf",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
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
                decimals: 0,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "FCFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["sɔ́ndǝ","lǝndí","maadí","mɛkrɛdí","jǝǝdí","júmbá","samdí"],
                    namesAbbr: ["sɔ́n","lǝn","maa","mɛk","jǝǝ","júm","sam"],
                    namesShort: ["sɔ́n","lǝn","maa","mɛk","jǝǝ","júm","sam"]
                },
                months: {
                    names: ["ŋwíí a ntɔ́ntɔ","ŋwíí akǝ bɛ́ɛ","ŋwíí akǝ ráá","ŋwíí akǝ nin","ŋwíí akǝ táan","ŋwíí akǝ táafɔk","ŋwíí akǝ táabɛɛ","ŋwíí akǝ táaraa","ŋwíí akǝ táanin","ŋwíí akǝ ntɛk","ŋwíí akǝ ntɛk di bɔ́k","ŋwíí akǝ ntɛk di bɛ́ɛ"],
                    namesAbbr: ["ŋ1","ŋ2","ŋ3","ŋ4","ŋ5","ŋ6","ŋ7","ŋ8","ŋ9","ŋ10","ŋ11","ŋ12"]
                },
                AM: ["sárúwá","sárúwá","SÁRÚWÁ"],
                PM: ["cɛɛ́nko","cɛɛ́nko","CƐƐ́NKO"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
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

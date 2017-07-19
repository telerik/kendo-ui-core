(function( window, undefined ) {
    kendo.cultures["ewo"] = {
        name: "ewo",
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
                    names: ["sɔ́ndɔ","mɔ́ndi","sɔ́ndɔ məlú mə́bɛ̌","sɔ́ndɔ məlú mə́lɛ́","sɔ́ndɔ məlú mə́nyi","fúladé","séradé"],
                    namesAbbr: ["sɔ́n","mɔ́n","smb","sml","smn","fúl","sér"],
                    namesShort: ["sɔ́n","mɔ́n","smb","sml","smn","fúl","sér"]
                },
                months: {
                    names: ["ngɔn osú","ngɔn bɛ̌","ngɔn lála","ngɔn nyina","ngɔn tána","ngɔn saməna","ngɔn zamgbála","ngɔn mwom","ngɔn ebulú","ngɔn awóm","ngɔn awóm ai dziá","ngɔn awóm ai bɛ̌"],
                    namesAbbr: ["ngo","ngb","ngl","ngn","ngt","ngs","ngz","ngm","nge","nga","ngad","ngab"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
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

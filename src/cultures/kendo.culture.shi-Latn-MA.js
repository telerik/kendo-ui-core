(function( window, undefined ) {
    kendo.cultures["shi-Latn-MA"] = {
        name: "shi-Latn-MA",
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
                name: "Moroccan Dirham",
                abbr: "MAD",
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "MAD"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["asamas","aynas","asinas","akṛas","akwas","asimwas","asiḍyas"],
                    namesAbbr: ["asa","ayn","asi","akṛ","akw","asim","asiḍ"],
                    namesShort: ["asa","ayn","asi","akṛ","akw","asim","asiḍ"]
                },
                months: {
                    names: ["innayr","bṛayṛ","maṛṣ","ibrir","mayyu","yunyu","yulyuz","ɣuct","cutanbir","ktubr","nuwanbir","dujanbir"],
                    namesAbbr: ["inn","bṛa","maṛ","ibr","may","yun","yul","ɣuc","cut","ktu","nuw","duj"]
                },
                AM: ["tifawt","tifawt","TIFAWT"],
                PM: ["tadggʷat","tadggʷat","TADGGʷAT"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
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

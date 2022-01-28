(function( window, undefined ) {
    kendo.cultures["kab"] = {
        name: "kab",
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
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "DA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Yanass","Sanass","Kraḍass","Kuẓass","Samass","Sḍisass","Sayass"],
                    namesAbbr: ["Yan","San","Kraḍ","Kuẓ","Sam","Sḍis","Say"],
                    namesShort: ["Cr","Ri","Ra","Hd","Mh","Sm","Sd"]
                },
                months: {
                    names: ["Yennayer","Fuṛar","Meɣres","Yebrir","Mayyu","Yunyu","Yulyu","Ɣuct","Ctembeṛ","Tubeṛ","Wambeṛ","Duǧembeṛ"],
                    namesAbbr: ["Yen","Fur","Meɣ","Yeb","May","Yun","Yul","Ɣuc","Cte","Tub","Wam","Duj"]
                },
                AM: ["n tufat","n tufat","N TUFAT"],
                PM: ["n tmeddit","n tmeddit","N TMEDDIT"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy h:mm:ss tt",
                    g: "d/M/yyyy h:mm tt",
                    G: "d/M/yyyy h:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 6
            }
        }
    }
})(this);

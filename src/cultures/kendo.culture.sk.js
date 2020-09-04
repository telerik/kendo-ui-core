(function( window, undefined ) {
    kendo.cultures["sk"] = {
        name: "sk",
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
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"],
                    namesAbbr: ["ne","po","ut","st","št","pi","so"],
                    namesShort: ["ne","po","ut","st","št","pi","so"]
                },
                months: {
                    names: ["január","február","marec","apríl","máj","jún","júl","august","september","október","november","december"],
                    namesAbbr: ["jan","feb","mar","apr","máj","jún","júl","aug","sep","okt","nov","dec"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d. M. yyyy",
                    D: "dddd d. MMMM yyyy",
                    F: "dddd d. MMMM yyyy H:mm:ss",
                    g: "d. M. yyyy H:mm",
                    G: "d. M. yyyy H:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ". ",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

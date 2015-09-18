(function( window, undefined ) {
    kendo.cultures["dsb"] = {
        name: "dsb",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
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
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["njeźela","ponjeźele","wałtora","srjoda","stwórtk","pětk","sobota"],
                    namesAbbr: ["nje","pon","wał","srj","stw","pět","sob"],
                    namesShort: ["n","p","w","s","s","p","s"]
                },
                months: {
                    names: ["januar","februar","měrc","apryl","maj","junij","julij","awgust","september","oktober","nowember","december"],
                    namesAbbr: ["jan","feb","měr","apr","maj","jun","jul","awg","sep","okt","now","dec"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "d. M. yyyy",
                    D: "dddd, d. MMMM yyyy",
                    F: "dddd, d. MMMM yyyy HH:mm:ss",
                    g: "d. M. yyyy HH:mm",
                    G: "d. M. yyyy HH:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
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

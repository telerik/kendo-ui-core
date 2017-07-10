(function( window, undefined ) {
    kendo.cultures["pl-PL"] = {
        name: "pl-PL",
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
                name: "Polish Zloty",
                abbr: "PLN",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "zł"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],
                    namesAbbr: ["N","Pn","Wt","Śr","Cz","Pt","So"],
                    namesShort: ["N","Pn","Wt","Śr","Cz","Pt","So"]
                },
                months: {
                    names: ["styczeń","luty","marzec","kwiecień","maj","czerwiec","lipiec","sierpień","wrzesień","październik","listopad","grudzień"],
                    namesAbbr: ["sty","lut","mar","kwi","maj","cze","lip","sie","wrz","paź","lis","gru"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "d MMMM yyyy",
                    F: "d MMMM yyyy HH:mm:ss",
                    g: "yyyy-MM-dd HH:mm",
                    G: "yyyy-MM-dd HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

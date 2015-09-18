(function( window, undefined ) {
    kendo.cultures["be-BY"] = {
        name: "be-BY",
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
                name: "Belarusian Ruble",
                abbr: "BYR",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "Br"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["нядзеля","панядзелак","аўторак","серада","чацвер","пятніца","субота"],
                    namesAbbr: ["нд","пн","аўт","ср","чц","пт","сб"],
                    namesShort: ["нд","пн","аў","ср","чц","пт","сб"]
                },
                months: {
                    names: ["студзень","люты","сакавік","красавік","май","чэрвень","ліпень","жнівень","верасень","кастрычнік","лістапад","снежань"],
                    namesAbbr: ["студз","лют","сак","крас","май","чэрв","ліп","жн","вер","кастр","ліст","снеж"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd.MM.yy",
                    D: "d MMMM yyyy",
                    F: "d MMMM yyyy HH:mm:ss",
                    g: "dd.MM.yy HH:mm",
                    G: "dd.MM.yy HH:mm:ss",
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

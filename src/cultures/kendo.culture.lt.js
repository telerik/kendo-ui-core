(function( window, undefined ) {
    kendo.cultures["lt"] = {
        name: "lt",
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
                    names: ["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],
                    namesAbbr: ["sk","pr","an","tr","kt","pn","št"],
                    namesShort: ["Sk","Pr","An","Tr","Kt","Pn","Št"]
                },
                months: {
                    names: ["sausis","vasaris","kovas","balandis","gegužė","birželis","liepa","rugpjūtis","rugsėjis","spalis","lapkritis","gruodis"],
                    namesAbbr: ["saus.","vas.","kov.","bal.","geg.","birž.","liep.","rugp.","rugs.","spal.","lapkr.","gruod."]
                },
                AM: ["priešpiet","priešpiet","PRIEŠPIET"],
                PM: ["popiet","popiet","POPIET"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy 'm'. MMMM d 'd'., dddd",
                    F: "yyyy 'm'. MMMM d 'd'., dddd HH:mm:ss",
                    g: "yyyy-MM-dd HH:mm",
                    G: "yyyy-MM-dd HH:mm:ss",
                    m: "MMMM d 'd'.",
                    M: "MMMM d 'd'.",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy 'm'. MMMM",
                    Y: "yyyy 'm'. MMMM"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

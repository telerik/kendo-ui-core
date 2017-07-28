(function( window, undefined ) {
    kendo.cultures["bez-TZ"] = {
        name: "bez-TZ",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Tanzanian Shilling",
                abbr: "TZS",
                pattern: ["-n$","n$"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "TSh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["pa mulungu","pa shahuviluha","pa hivili","pa hidatu","pa hitayi","pa hihanu","pa shahulembela"],
                    namesAbbr: ["Mul","Vil","Hiv","Hid","Hit","Hih","Lem"],
                    namesShort: ["Mul","Vil","Hiv","Hid","Hit","Hih","Lem"]
                },
                months: {
                    names: ["pa mwedzi gwa hutala","pa mwedzi gwa wuvili","pa mwedzi gwa wudatu","pa mwedzi gwa wutai","pa mwedzi gwa wuhanu","pa mwedzi gwa sita","pa mwedzi gwa saba","pa mwedzi gwa nane","pa mwedzi gwa tisa","pa mwedzi gwa kumi","pa mwedzi gwa kumi na moja","pa mwedzi gwa kumi na mbili"],
                    namesAbbr: ["Hut","Vil","Dat","Tai","Han","Sit","Sab","Nan","Tis","Kum","Kmj","Kmb"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
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

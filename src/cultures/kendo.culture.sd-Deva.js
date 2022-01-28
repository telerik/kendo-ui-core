(function( window, undefined ) {
    kendo.cultures["sd-Deva"] = {
        name: "sd-Deva",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "₹"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["आचर","सवमर","ङरव","रब","ख़मयस","जम","छनछर"],
                    namesAbbr: ["आचर","सवमर","ङरव","रब","ख़मयस","जम","छनछर"],
                    namesShort: ["आ","स","ङ","र","ख़","ज","छ"]
                },
                months: {
                    names: ["जनवरय","फ़बरवरय","मारच","परयल","मय","जवन","वलाय","आगसट","सयपटमबर","आटवबर","नववमबर","डसमबर"],
                    namesAbbr: ["जनवरय","फ़बरवरय","मारच","परयल","मय","जवन","वलाय","आगसट","सयपटमबर","आटवबर","नववमबर","डसमबर"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy H:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "dd MMMM",
                    M: "dd MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);

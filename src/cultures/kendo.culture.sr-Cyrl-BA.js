(function( window, undefined ) {
    kendo.cultures["sr-Cyrl-BA"] = {
        name: "sr-Cyrl-BA",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Convertible Mark",
                abbr: "BAM",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "КМ"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["недјеља","понедјељак","уторак","сриједа","четвртак","петак","субота"],
                    namesAbbr: ["нед","пон","уто","сри","чет","пет","суб"],
                    namesShort: ["н","п","у","с","ч","п","с"]
                },
                months: {
                    names: ["јануар","фебруар","март","април","мај","јуни","јули","август","септембар","октобар","новембар","децембар"],
                    namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "d.M.yyyy.",
                    D: "d. MMMM yyyy",
                    F: "d. MMMM yyyy H:mm:ss",
                    g: "d.M.yyyy. H:mm",
                    G: "d.M.yyyy. H:mm:ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

(function( window, undefined ) {
    kendo.cultures["arn"] = {
        name: "arn",
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
                pattern: ["-$ n","$ n"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Kiñe Ante","Epu Ante","Kila Ante","Meli Ante","Kechu Ante","Cayu Ante","Regle Ante"],
                    namesAbbr: ["Kiñe","Epu","Kila","Meli","Kechu","Cayu","Regle"],
                    namesShort: ["kñ","ep","kl","me","ke","ca","re"]
                },
                months: {
                    names: ["Kiñe Tripantu","Epu","Kila","Meli","Kechu","Cayu","Regle","Purha","Aiya","Marhi","Marhi Kiñe","Marhi Epu"],
                    namesAbbr: ["Kiñe Tripantu","Epu","Kila","Meli","Kechu","Cayu","Regle","Purha","Aiya","Marhi","Marhi Kiñe","Marhi Epu"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dddd, dd' de 'MMMM' de 'yyyy",
                    F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
                    g: "dd-MM-yyyy H:mm",
                    G: "dd-MM-yyyy H:mm:ss",
                    m: "d' de 'MMMM",
                    M: "d' de 'MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM' de 'yyyy",
                    Y: "MMMM' de 'yyyy"
                },
                "/": "-",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);

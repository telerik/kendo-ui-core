(function( window, undefined ) {
    kendo.cultures["cgg-UG"] = {
        name: "cgg-UG",
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
                name: "Ugandan Shilling",
                abbr: "UGX",
                pattern: ["-$n","$n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "USh"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sande","Orwokubanza","Orwakabiri","Orwakashatu","Orwakana","Orwakataano","Orwamukaaga"],
                    namesAbbr: ["SAN","ORK","OKB","OKS","OKN","OKT","OMK"],
                    namesShort: ["SAN","ORK","OKB","OKS","OKN","OKT","OMK"]
                },
                months: {
                    names: ["Okwokubanza","Okwakabiri","Okwakashatu","Okwakana","Okwakataana","Okwamukaaga","Okwamushanju","Okwamunaana","Okwamwenda","Okwaikumi","Okwaikumi na kumwe","Okwaikumi na ibiri"],
                    namesAbbr: ["KBZ","KBR","KST","KKN","KTN","KMK","KMS","KMN","KMW","KKM","KNK","KNB"]
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
    };
})();

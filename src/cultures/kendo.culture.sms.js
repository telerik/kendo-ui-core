(function( window, undefined ) {
    kendo.cultures["sms"] = {
        name: "sms",
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
                    names: ["pâ´sspei´vv","vuõssargg","mââibargg","seärad","neljdpei´vv","piâtnâc","sue´vet"],
                    namesAbbr: ["pâ","vu","mâ","se","ne","pi","su"],
                    namesShort: ["pâ","v","m","s","n","pi","s"]
                },
                months: {
                    names: ["ođđee´jjmään","tä´lvvmään","pâ´zzlâšttam-mään","njuhččmään","vue´ssmään","ǩie´ssmään","suei´nnmään","på´rǧǧmään","čõhččmään","kålggmään","skamm-mään","rosttovmään"],
                    namesAbbr: ["ođđee´jjmään","tä´lvvmään","pâ´zzlâšttam-mään","njuhččmään","vue´ssmään","ǩie´ssmään","suei´nnmään","på´rǧǧmään","čõhččmään","kålggmään","skamm-mään","rosttovmään"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "d.M.yyyy",
                    D: "MMMM d'. p. 'yyyy",
                    F: "MMMM d'. p. 'yyyy H:mm:ss",
                    g: "d.M.yyyy H:mm",
                    G: "d.M.yyyy H:mm:ss",
                    m: "MMMM d'. p. '",
                    M: "MMMM d'. p. '",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
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

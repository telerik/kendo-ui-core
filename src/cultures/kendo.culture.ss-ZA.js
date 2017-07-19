(function( window, undefined ) {
    kendo.cultures["ss-ZA"] = {
        name: "ss-ZA",
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
                name: "South African Rand",
                abbr: "ZAR",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "R"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Lisontfo","uMsombuluko","Lesibili","Lesitsatfu","Lesine","Lesihlanu","uMgcibelo"],
                    namesAbbr: ["Son","Mso","Bil","Tsa","Ne","Hla","Mgc"],
                    namesShort: ["Son","Mso","Bil","Tsa","Ne","Hla","Mgc"]
                },
                months: {
                    names: ["Bhimbidvwane","iNdlovana","iNdlovu-lenkhulu","Mabasa","iNkhwekhweti","iNhlaba","Kholwane","iNgci","iNyoni","iMphala","Lweti","iNgongoni"],
                    namesAbbr: ["Bhi","Van","Vol","Mab","Nkh","Nhl","Kho","Ngc","Nyo","Mph","Lwe","Ngo"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy MMMM d, dddd",
                    F: "yyyy MMMM d, dddd HH:mm:ss",
                    g: "yyyy-MM-dd HH:mm",
                    G: "yyyy-MM-dd HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "-",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);

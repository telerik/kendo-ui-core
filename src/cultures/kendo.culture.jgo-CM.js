(function( window, undefined ) {
    kendo.cultures["jgo-CM"] = {
        name: "jgo-CM",
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
                name: "Central African CFA Franc",
                abbr: "XAF",
                pattern: ["-$ n","$ n"],
                decimals: 0,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "FCFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sɔ́ndi","Mɔ́ndi","Ápta Mɔ́ndi","Wɛ́nɛsɛdɛ","Tɔ́sɛdɛ","Fɛlâyɛdɛ","Sásidɛ"],
                    namesAbbr: ["Sɔ́ndi","Mɔ́ndi","Ápta Mɔ́ndi","Wɛ́nɛsɛdɛ","Tɔ́sɛdɛ","Fɛlâyɛdɛ","Sásidɛ"],
                    namesShort: ["Sɔ́ndi","Mɔ́ndi","Ápta Mɔ́ndi","Wɛ́nɛsɛdɛ","Tɔ́sɛdɛ","Fɛlâyɛdɛ","Sásidɛ"]
                },
                months: {
                    names: ["Nduŋmbi Saŋ","Pɛsaŋ Pɛ́pá","Pɛsaŋ Pɛ́tát","Pɛsaŋ Pɛ́nɛ́kwa","Pɛsaŋ Pataa","Pɛsaŋ Pɛ́nɛ́ntúkú","Pɛsaŋ Saambá","Pɛsaŋ Pɛ́nɛ́fɔm","Pɛsaŋ Pɛ́nɛ́pfúꞋú","Pɛsaŋ Nɛgɛ́m","Pɛsaŋ Ntsɔ̌pmɔ́","Pɛsaŋ Ntsɔ̌ppá"],
                    namesAbbr: ["Nduŋmbi Saŋ","Pɛsaŋ Pɛ́pá","Pɛsaŋ Pɛ́tát","Pɛsaŋ Pɛ́nɛ́kwa","Pɛsaŋ Pataa","Pɛsaŋ Pɛ́nɛ́ntúkú","Pɛsaŋ Saambá","Pɛsaŋ Pɛ́nɛ́fɔm","Pɛsaŋ Pɛ́nɛ́pfúꞋú","Pɛsaŋ Nɛgɛ́m","Pɛsaŋ Ntsɔ̌pmɔ́","Pɛsaŋ Ntsɔ̌ppá"]
                },
                AM: ["mbaꞌmbaꞌ","mbaꞌmbaꞌ","MBAꞋMBAꞋ"],
                PM: ["ŋka mbɔ́t nji","ŋka mbɔ́t nji","ŊKA MBƆ́T NJI"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "dddd, yyyy MMMM dd",
                    F: "dddd, yyyy MMMM dd HH:mm:ss",
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
                firstDay: 1
            }
        }
    }
})(this);

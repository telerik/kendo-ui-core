(function( window, undefined ) {
    kendo.cultures["dz"] = {
        name: "dz",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3,2],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "Nu."
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["གཟའ་ཟླ་བ་","གཟའ་མིག་དམར་","གཟའ་ལྷག་པ་","གཟའ་ཕུར་བུ་","གཟའ་པ་སངས་","གཟའ་སྤེན་པ་","གཟའ་ཉི་མ་"],
                    namesAbbr: ["ཟླ་","མིར་","ལྷག་","ཕུར་","སངས་","སྤེན་","ཉི་"],
                    namesShort: ["ཟླ་","མིར་","ལྷག་","ཕུར་","སངས་","སྤེན་","ཉི་"]
                },
                months: {
                    names: ["སྤྱི་ཟླ་དངཔ་","སྤྱི་ཟླ་གཉིས་པ་","སྤྱི་ཟླ་གསུམ་པ་","སྤྱི་ཟླ་བཞི་པ","སྤྱི་ཟླ་ལྔ་པ་","སྤྱི་ཟླ་དྲུག་པ","སྤྱི་ཟླ་བདུན་པ་","སྤྱི་ཟླ་བརྒྱད་པ་","སྤྱི་ཟླ་དགུ་པ་","སྤྱི་ཟླ་བཅུ་པ་","སྤྱི་ཟླ་བཅུ་གཅིག་པ་","སྤྱི་ཟླ་བཅུ་གཉིས་པ་"],
                    namesAbbr: ["ཟླ་༡","ཟླ་༢","ཟླ་༣","ཟླ་༤","ཟླ་༥","ཟླ་༦","ཟླ་༧","ཟླ་༨","ཟླ་༩","ཟླ་༡༠","ཟླ་༡༡","ཟླ་༡༢"]
                },
                AM: ["སྔ་ཆ་","སྔ་ཆ་","སྔ་ཆ་"],
                PM: ["ཕྱི་ཆ་","ཕྱི་ཆ་","ཕྱི་ཆ་"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "dddd, སྤྱི་ལོ་yyyy MMMM ཚེས་dd",
                    F: "dddd, སྤྱི་ལོ་yyyy MMMM ཚེས་dd ཆུ་ཚོད་h:mm:ss tt",
                    g: "yyyy-MM-dd ཆུ་ཚོད་ h སྐར་མ་ mm tt",
                    G: "yyyy-MM-dd ཆུ་ཚོད་h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "ཆུ་ཚོད་ h སྐར་མ་ mm tt",
                    T: "ཆུ་ཚོད་h:mm:ss tt",
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

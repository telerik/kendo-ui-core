(function( window, undefined ) {
    kendo.cultures["ts-ZA"] = {
        name: "ts-ZA",
        numberFormat: {
            pattern: ["-n"],
            decimals: 0,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","%n"],
                decimals: 0,
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
                    names: ["Sonto","Musumbhunuku","Ravumbirhi","Ravunharhu","Ravumune","Ravuntlhanu","Mugqivela"],
                    namesAbbr: ["Son","Mus","Bir","Har","Ne","Tlh","Mug"],
                    namesShort: ["Son","Mus","Bir","Har","Ne","Tlh","Mug"]
                },
                months: {
                    names: ["Sunguti","Nyenyenyani","Nyenyankulu","Dzivamisoko","Mudyaxihi","Khotavuxika","Mawuwani","Mhawuri","Ndzhati","Nhlangula","Hukuri","N\u0027wendzamhala"],
                    namesAbbr: ["Sun","Yan","Kul","Dzi","Mud","Kho","Maw","Mha","Ndz","Nhl","Huk","N\u0027w"]
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

(function( window, undefined ) {
    kendo.cultures["mni"] = {
        name: "mni",
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
                    names: ["নোংমাইজিং","নিংথৌকাঃবা","লৈঃপাক পোকপা","য়ুমশা কৈশা","সগোনসেল","ইরাই","থাংজা"],
                    namesAbbr: ["নোংমাইজিং","নিংথৌকাঃবা","লৈঃপাক পোকপা","য়ুমশা কৈশা","সগোনসেল","ইরাই","থাংজা"],
                    namesShort: ["ন","ন","ল","য়","স","ই","থ"]
                },
                months: {
                    names: ["ৱাকিচঙ","লাঘাফাইরেল","লমদা","সজিবু","কালেন্","ইঙাঃ","ইঙেন","থৱান","লাংবন","মেরাঃ","হাগৈঃ","পোইনু"],
                    namesAbbr: ["ৱাকিচঙ","লাঘাফাইরেল","লমদা","সজিবু","কালেন্","ইঙাঃ","ইঙেন","থৱান","লাংবন","মেরাঃ","হাগৈঃ","পোইনু"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
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

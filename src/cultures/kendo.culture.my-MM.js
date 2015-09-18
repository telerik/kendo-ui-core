(function( window, undefined ) {
    kendo.cultures["my-MM"] = {
        name: "my-MM",
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
                name: "Myanmar Kyat",
                abbr: "MMK",
                pattern: ["-$ n","n $"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "K"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["တနင်္ဂနွေ","တနင်္လာ","အင်္ဂါ","ဗုဒ္ဓဟူး","ကြာသပတေး","သောကြာ","စနေ"],
                    namesAbbr: ["နွေ","လာ","ဂါ","ဟူး","တေး","ကြာ","နေ"],
                    namesShort: ["နွေ","လာ","ဂါ","ဟူး","တေး","ကြာ","နေ"]
                },
                months: {
                    names: ["ဇန်နဝါရီ","ဖေဖော်ဝါရီ","မတ်","ဧပြီ","မေ","ဇွန်","ဇူလိုင်","ဩဂုတ်","စက်တင်ဘာ","အောက်တိုဘာ","နိုဝင်ဘာ","ဒီဇင်ဘာ"],
                    namesAbbr: ["ဇန်","ဖေ","မတ်","ဧပြီ","မေ","ဇွန်","ဇူ","ဩဂု","စက်တ","အောက်","နိုဝင်","ဒီဇင်"]
                },
                AM: ["နံနက်","နံနက်","နံနက်"],
                PM: ["ညနေ","ညနေ","ညနေ"],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "yyyy MMMM d",
                    F: "yyyy MMMM d HH:mm:ss",
                    g: "dd-MM-yyyy HH:mm",
                    G: "dd-MM-yyyy HH:mm:ss",
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

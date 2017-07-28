(function( window, undefined ) {
    kendo.cultures["zh-Hans-HK"] = {
        name: "zh-Hans-HK",
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
                name: "Hong Kong Dollar",
                abbr: "HKD",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
                    namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
                    namesShort: ["周日","周一","周二","周三","周四","周五","周六"]
                },
                months: {
                    names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
                    namesAbbr: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
                },
                AM: ["上午","上午","上午"],
                PM: ["下午","下午","下午"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "yyyy年M月d日dddd",
                    F: "yyyy年M月d日dddd tth:mm:ss",
                    g: "d/M/yyyy tth:mm",
                    G: "d/M/yyyy tth:mm:ss",
                    m: "M月d日",
                    M: "M月d日",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "tth:mm",
                    T: "tth:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy年M月",
                    Y: "yyyy年M月"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);

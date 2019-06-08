(function( window, undefined ) {
    kendo.cultures["vi-VN"] = {
        name: "vi-VN",
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
                name: "đồng",
                abbr: "₫",
                pattern: ["-n ₫","n ₫"],
                decimals: 0,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "₫"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"],
                    namesAbbr: ["CN","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"],
                    namesShort: ["CN","T2","T3","T4","T5","T6","T7"]
                },
                months: {
                    names: ["Tháng Giêng","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười một","Tháng Mười hai"],
                    namesAbbr: ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"]
                },
                AM: ["Sáng","sáng","Sáng"],
                PM: ["Chiều","chiều","Chiều"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d MMMM, yyyy",
                    F: "dddd, d MMMM, yyyy h:mm:ss tt",
                    g: "d/M/yyyy h:mm tt",
                    G: "d/M/yyyy h:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "dd'-'MM'-'yyyy'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "dd'-'MM'-'yyyy' HH':'mm':'ss'Z'",
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

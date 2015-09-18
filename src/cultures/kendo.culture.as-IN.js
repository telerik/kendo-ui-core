(function( window, undefined ) {
    kendo.cultures["as-IN"] = {
        name: "as-IN",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3,2],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "%"
            },
            currency: {
                name: "Indian Rupee",
                abbr: "INR",
                pattern: ["$ -n","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "₹"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ৰবিবাৰ","সোমবাৰ","মঙ্গলবাৰ","বুধবাৰ","বৃহস্পতিবাৰ","শুক্রবাৰ","শনিবাৰ"],
                    namesAbbr: ["ৰবি.","সোম.","মঙ্গল.","বুধ.","বৃহ.","শুক্র.","শনি."],
                    namesShort: ["ৰ","সো","ম","বু","বৃ","শু","শ"]
                },
                months: {
                    names: ["জানুৱাৰী","ফেব্রুৱাৰী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগষ্ট","চেপ্টেম্বৰ","অক্টোবৰ","নবেম্বৰ","ডিচেম্বৰ"],
                    namesAbbr: ["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগষ্ট","চেপ্টে","অক্টো","নবে","ডিচে"]
                },
                AM: ["ৰাতিপু","ৰাতিপু","ৰাতিপু"],
                PM: ["আবেলি","আবেলি","আবেলি"],
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "yyyy,MMMM dd, dddd",
                    F: "yyyy,MMMM dd, dddd tt h:mm:ss",
                    g: "dd-MM-yyyy tt h:mm",
                    G: "dd-MM-yyyy tt h:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "tt h:mm",
                    T: "tt h:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM,yy",
                    Y: "MMMM,yy"
                },
                "/": "-",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

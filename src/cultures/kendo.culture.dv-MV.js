(function( window, undefined ) {
    kendo.cultures["dv-MV"] = {
        name: "dv-MV",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Rufiyaa",
                abbr: "MVR",
                pattern: ["n $-","n $"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "ރ."
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
                    namesAbbr: ["އާދީއްތަ","ހޯމަ","އަންގާރަ","ބުދަ","ބުރާސްފަތި","ހުކުރު","ހޮނިހިރު"],
                    namesShort: ["އާ","ހޯ","އަ","ބު","ބު","ހު","ހޮ"]
                },
                months: {
                    names: ["ޖަނަވަރީ","ފެބްރުއަރީ","މާރޗް","އޭޕްރިލް","މެއި","ޖޫން","ޖުލައި","އޮގަސްޓް","ސެޕްޓެމްބަރ","އޮކްޓޯބަރ","ނޮވެމްބަރ","ޑިސެމްބަރ"],
                    namesAbbr: ["ޖަނަވަރީ","ފެބްރުއަރީ","މާރޗް","އޭޕްރިލް","މެއި","ޖޫން","ޖުލައި","އޮގަސްޓް","ސެޕްޓެމްބަރ","އޮކްޓޯބަރ","ނޮވެމްބަރ","ޑިސެމްބަރ"]
                },
                AM: ["މކ","މކ","މކ"],
                PM: ["މފ","މފ","މފ"],
                patterns: {
                    d: "dd/MM/yy",
                    D: "ddd, yyyy MMMM dd",
                    F: "ddd, yyyy MMMM dd HH:mm:ss",
                    g: "dd/MM/yy HH:mm",
                    G: "dd/MM/yy HH:mm:ss",
                    m: "MMMM dd",
                    M: "MMMM dd",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy, MMMM",
                    Y: "yyyy, MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 0
            }
        }
    }
})(this);

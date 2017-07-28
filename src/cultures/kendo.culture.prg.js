(function( window, undefined ) {
    kendo.cultures["prg"] = {
        name: "prg",
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
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "XDR"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["nadīli","panadīli","wisasīdis","pussisawaiti","ketwirtiks","pēntniks","sabattika"],
                    namesAbbr: ["nad","pan","wis","pus","ket","pēn","sab"],
                    namesShort: ["nad","pan","wis","pus","ket","pēn","sab"]
                },
                months: {
                    names: ["rags","wassarins","pūlis","sakkis","zallaws","sīmenis","līpa","daggis","sillins","spallins","lapkrūtis","sallaws"],
                    namesAbbr: ["rag","was","pūl","sak","zal","sīm","līp","dag","sil","spa","lap","sal"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, yyyy 'mettas' d. MMMM",
                    F: "dddd, yyyy 'mettas' d. MMMM HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

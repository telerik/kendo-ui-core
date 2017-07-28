(function( window, undefined ) {
    kendo.cultures["nnh-CM"] = {
        name: "nnh-CM",
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
                    names: ["lyɛʼɛ́ sẅíŋtè","mvfò lyɛ̌ʼ","mbɔ́ɔntè mvfò lyɛ̌ʼ","tsètsɛ̀ɛ lyɛ̌ʼ","mbɔ́ɔntè tsetsɛ̀ɛ lyɛ̌ʼ","mvfò màga lyɛ̌ʼ","màga lyɛ̌ʼ"],
                    namesAbbr: ["lyɛʼɛ́ sẅíŋtè","mvfò lyɛ̌ʼ","mbɔ́ɔntè mvfò lyɛ̌ʼ","tsètsɛ̀ɛ lyɛ̌ʼ","mbɔ́ɔntè tsetsɛ̀ɛ lyɛ̌ʼ","mvfò màga lyɛ̌ʼ","màga lyɛ̌ʼ"],
                    namesShort: ["lyɛʼɛ́ sẅíŋtè","mvfò lyɛ̌ʼ","mbɔ́ɔntè mvfò lyɛ̌ʼ","tsètsɛ̀ɛ lyɛ̌ʼ","mbɔ́ɔntè tsetsɛ̀ɛ lyɛ̌ʼ","mvfò màga lyɛ̌ʼ","màga lyɛ̌ʼ"]
                },
                months: {
                    names: ["saŋ tsetsɛ̀ɛ lùm","saŋ kàg ngwóŋ","saŋ lepyè shúm","saŋ cÿó","saŋ tsɛ̀ɛ cÿó","saŋ njÿoláʼ","saŋ tyɛ̀b tyɛ̀b mbʉ̀ŋ","saŋ mbʉ̀ŋ","saŋ ngwɔ̀ʼ mbÿɛ","saŋ tàŋa tsetsáʼ","saŋ mejwoŋó","saŋ lùm"],
                    namesAbbr: ["saŋ tsetsɛ̀ɛ lùm","saŋ kàg ngwóŋ","saŋ lepyè shúm","saŋ cÿó","saŋ tsɛ̀ɛ cÿó","saŋ njÿoláʼ","saŋ tyɛ̀b tyɛ̀b mbʉ̀ŋ","saŋ mbʉ̀ŋ","saŋ ngwɔ̀ʼ mbÿɛ","saŋ tàŋa tsetsáʼ","saŋ mejwoŋó","saŋ lùm"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd , 'lyɛ'̌ʼ d 'na' MMMM, yyyy",
                    F: "dddd , 'lyɛ'̌ʼ d 'na' MMMM, yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

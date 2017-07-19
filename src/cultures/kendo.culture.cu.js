(function( window, undefined ) {
    kendo.cultures["cu"] = {
        name: "cu",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
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
                symbol: "₽"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["недѣ́лѧ","понедѣ́льникъ","вто́рникъ","среда̀","четверто́къ","пѧто́къ","сꙋббѡ́та"],
                    namesAbbr: ["ндⷧ҇ѧ","пнⷣе","втоⷬ҇","срⷣе","чеⷦ҇","пѧⷦ҇","сꙋⷠ҇"],
                    namesShort: ["ндⷧ҇ѧ","пнⷣе","втоⷬ҇","срⷣе","чеⷦ҇","пѧⷦ҇","сꙋⷠ҇"]
                },
                months: {
                    names: ["і҆аннꙋа́рїй","феврꙋа́рїй","ма́ртъ","а҆прі́ллїй","ма́їй","і҆ꙋ́нїй","і҆ꙋ́лїй","а҆́ѵгꙋстъ","септе́мврїй","ѻ҆ктѡ́врїй","ное́мврїй","деке́мврїй"],
                    namesAbbr: ["і҆аⷩ҇","феⷡ҇","маⷬ҇","а҆пⷬ҇","маꙵ","і҆ꙋⷩ҇","і҆ꙋⷧ҇","а҆́ѵⷢ҇","сеⷫ҇","ѻ҆кⷮ","ноеⷨ","деⷦ҇"]
                },
                AM: ["ДП","дп","ДП"],
                PM: ["ПП","пп","ПП"],
                patterns: {
                    d: "yyyy.MM.dd",
                    D: "dddd, d MMMM 'л'. yyyy.",
                    F: "dddd, d MMMM 'л'. yyyy. HH:mm:ss",
                    g: "yyyy.MM.dd HH:mm",
                    G: "yyyy.MM.dd HH:mm:ss",
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

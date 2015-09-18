(function( window, undefined ) {
    kendo.cultures["hy"] = {
        name: "hy",
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
                name: "",
                abbr: "",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "֏"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Կիրակի","Երկուշաբթի","Երեքշաբթի","Չորեքշաբթի","Հինգշաբթի","Ուրբաթ","Շաբաթ"],
                    namesAbbr: ["Կիր","Երկ","Երք","Չրք","Հնգ","Ուր","Շբթ"],
                    namesShort: ["Կ","Ե","Ե","Չ","Հ","Ո","Շ"]
                },
                months: {
                    names: ["Հունվար","Փետրվար","Մարտ","Ապրիլ","Մայիս","Հունիս","Հուլիս","Օգոստոս","Սեպտեմբեր","Հոկտեմբեր","Նոյեմբեր","Դեկտեմբեր"],
                    namesAbbr: ["Հնվ","Փտվ","Մրտ","Ապր","Մյս","Հնս","Հլս","Օգս","Սպտ","Հկտ","Նյմ","Դկտ"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM, yyyy",
                    F: "d MMMM, yyyy HH:mm:ss",
                    g: "dd.MM.yyyy HH:mm",
                    G: "dd.MM.yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

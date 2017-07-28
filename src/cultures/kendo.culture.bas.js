(function( window, undefined ) {
    kendo.cultures["bas"] = {
        name: "bas",
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
                decimals: 0,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "FCFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ŋgwà nɔ̂y","ŋgwà njaŋgumba","ŋgwà ûm","ŋgwà ŋgê","ŋgwà mbɔk","ŋgwà kɔɔ","ŋgwà jôn"],
                    namesAbbr: ["nɔy","nja","uum","ŋge","mbɔ","kɔɔ","jon"],
                    namesShort: ["nɔy","nja","uum","ŋge","mbɔ","kɔɔ","jon"]
                },
                months: {
                    names: ["Kɔndɔŋ","Màcɛ̂l","Màtùmb","Màtop","M̀puyɛ","Hìlòndɛ̀","Njèbà","Hìkaŋ","Dìpɔ̀s","Bìòôm","Màyɛsèp","Lìbuy li ńyèe"],
                    namesAbbr: ["kɔn","mac","mat","mto","mpu","hil","nje","hik","dip","bio","may","liɓ"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
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

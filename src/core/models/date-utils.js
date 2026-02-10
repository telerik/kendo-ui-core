/**
 * Date utility type definitions
 */
/**
 * Date field mapping for format parsing
 */
export const DATE_FIELD_MAP = {
    "G": "era",
    "y": "year",
    "q": "quarter",
    "Q": "quarter",
    "M": "month",
    "L": "month",
    "d": "day",
    "E": "weekday",
    "c": "weekday",
    "e": "weekday",
    "h": "hour",
    "H": "hour",
    "k": "hour",
    "K": "hour",
    "m": "minute",
    "s": "second",
    "a": "dayperiod",
    "t": "dayperiod",
    "x": "zone",
    "X": "zone",
    "z": "zone",
    "Z": "zone"
};
/**
 * Name types for date formatting
 */
export const NAME_TYPES = {
    month: {
        type: "months",
        minLength: 3,
        standAlone: "L"
    },
    quarter: {
        type: "quarters",
        minLength: 3,
        standAlone: "q"
    },
    weekday: {
        type: "days",
        minLength: {
            E: 0,
            c: 3,
            e: 3
        },
        standAlone: "c"
    },
    dayperiod: {
        type: "dayPeriods",
        minLength: 0
    },
    era: {
        type: "eras",
        minLength: 0
    }
};

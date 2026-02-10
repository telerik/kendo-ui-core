/**
 * Service that converts Kendo cultures to Intl-compatible format
 * Used for integration with @progress/kendo-intl
 */
export class KendoCultureToIntlService {
    constructor(cultureService, dateParser, formatter) {
        this.cultureService = cultureService;
        this.dateParser = dateParser;
        this.formatter = formatter;
    }
    /**
     * Convert a Kendo culture to an Intl-compatible adapter
     */
    convert(culture) {
        const kendoCulture = this.cultureService.getCulture(culture) || this.cultureService.culture();
        const currencies = {};
        currencies[kendoCulture.numberFormat.currency.abbr] = kendoCulture.numberFormat.currency;
        const localeInfoAll = this.buildLocaleInfoAll(kendoCulture, currencies);
        return {
            localeInfo: () => this.buildLocaleInfo(kendoCulture, currencies),
            parseDate: (value, fmt) => this.dateParser.parseExactDate(value, fmt, kendoCulture),
            toString: (value, fmt) => {
                const result = this.formatter.toString(value, fmt, kendoCulture);
                // Coerce to string for Intl adapter compatibility
                return result == null ? "" : String(result);
            },
            format: (fmt, ...values) => this.formatter.format(fmt, ...values)
        };
    }
    buildLocaleInfo(kendoCulture, currencies) {
        return {
            numbers: {
                localeCurrency: kendoCulture.numberFormat.currency.abbr,
                currencies: currencies,
                symbols: {
                    group: kendoCulture.numberFormat[','],
                    decimal: kendoCulture.numberFormat['.'],
                    percentSign: kendoCulture.numberFormat.percent.symbol,
                }
            },
            calendar: {
                patterns: kendoCulture.calendars.standard.patterns,
                months: {
                    format: {
                        wide: kendoCulture.calendars.standard.months.names,
                        abbreviated: kendoCulture.calendars.standard.months.namesAbbr
                    }
                },
                days: {
                    format: {
                        wide: kendoCulture.calendars.standard.days.names,
                        abbreviated: kendoCulture.calendars.standard.days.namesAbbr
                    }
                }
            }
        };
    }
    buildLocaleInfoAll(kendoCulture, currencies) {
        var _a, _b, _c, _d, _e, _f;
        const localeInfoAll = {};
        // Extract the name and split into language and territory if possible
        const [language, territory] = kendoCulture.name.split('-');
        localeInfoAll.name = language;
        localeInfoAll.identity = { language };
        if (territory) {
            localeInfoAll.territory = territory;
        }
        // Map number format symbols
        if (kendoCulture.numberFormat) {
            localeInfoAll.numbers = {
                symbols: {
                    decimal: kendoCulture.numberFormat["."],
                    group: kendoCulture.numberFormat[","],
                    percentSign: ((_a = kendoCulture.numberFormat.percent) === null || _a === void 0 ? void 0 : _a.symbol) || "%"
                },
                decimal: {
                    patterns: kendoCulture.numberFormat.pattern,
                    groupSize: kendoCulture.numberFormat.groupSize
                },
                currency: {
                    patterns: (_b = kendoCulture.numberFormat.currency) === null || _b === void 0 ? void 0 : _b.pattern,
                    groupSize: (_c = kendoCulture.numberFormat.currency) === null || _c === void 0 ? void 0 : _c.groupSize
                },
                percent: {
                    patterns: (_d = kendoCulture.numberFormat.percent) === null || _d === void 0 ? void 0 : _d.pattern,
                    groupSize: (_e = kendoCulture.numberFormat.percent) === null || _e === void 0 ? void 0 : _e.groupSize,
                    decimals: (_f = kendoCulture.numberFormat.percent) === null || _f === void 0 ? void 0 : _f.decimals
                }
            };
            // Map currency information if available
            if (kendoCulture.numberFormat.currency) {
                localeInfoAll.numbers.currencies = {
                    [kendoCulture.numberFormat.currency.abbr]: kendoCulture.numberFormat.currency
                };
                localeInfoAll.numbers.localeCurrency = kendoCulture.numberFormat.currency.abbr;
            }
        }
        // Map calendar information
        if (kendoCulture.calendars && kendoCulture.calendars.standard) {
            const standardCalendar = kendoCulture.calendars.standard;
            localeInfoAll.calendar = {
                patterns: {
                    d: standardCalendar.patterns.d,
                    D: standardCalendar.patterns.D,
                    F: standardCalendar.patterns.F,
                    g: standardCalendar.patterns.g,
                    G: standardCalendar.patterns.G,
                    m: standardCalendar.patterns.m,
                    M: standardCalendar.patterns.M,
                    s: standardCalendar.patterns.s,
                    t: standardCalendar.patterns.t,
                    T: standardCalendar.patterns.T,
                    u: standardCalendar.patterns.u,
                    y: standardCalendar.patterns.y,
                    Y: standardCalendar.patterns.Y
                },
                days: {
                    format: {
                        wide: standardCalendar.days.names,
                        abbreviated: standardCalendar.days.namesAbbr,
                        short: standardCalendar.days.namesShort
                    },
                    "stand-alone": {
                        wide: standardCalendar.days.names,
                        abbreviated: standardCalendar.days.namesAbbr,
                        short: standardCalendar.days.namesShort
                    }
                },
                months: {
                    format: {
                        wide: standardCalendar.months.names,
                        abbreviated: standardCalendar.months.namesAbbr,
                        narrow: standardCalendar.months.namesAbbr.map((name) => name.charAt(0))
                    },
                    "stand-alone": {
                        wide: standardCalendar.months.names,
                        abbreviated: standardCalendar.months.namesAbbr,
                        narrow: standardCalendar.months.namesAbbr.map((name) => name.charAt(0))
                    }
                },
                dayPeriods: {
                    format: {
                        abbreviated: {
                            am: standardCalendar.AM[0],
                            pm: standardCalendar.PM[0]
                        },
                        narrow: {
                            am: standardCalendar.AM[1],
                            pm: standardCalendar.PM[1]
                        },
                        wide: {
                            am: standardCalendar.AM[0],
                            pm: standardCalendar.PM[0]
                        }
                    },
                    "stand-alone": {
                        abbreviated: {
                            am: standardCalendar.AM[0],
                            pm: standardCalendar.PM[0]
                        },
                        narrow: {
                            am: standardCalendar.AM[1],
                            pm: standardCalendar.PM[1]
                        },
                        wide: {
                            am: standardCalendar.AM[0],
                            pm: standardCalendar.PM[0]
                        }
                    }
                }
            };
            // Include firstDay if defined
            if ('firstDay' in standardCalendar) {
                localeInfoAll.firstDay = standardCalendar.firstDay;
            }
        }
        return localeInfoAll;
    }
}

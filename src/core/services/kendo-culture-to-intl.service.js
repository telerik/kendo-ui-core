import { cultureService } from "./culture.service";
import { dateParserService } from "./date-parser.service";
import { formatterService } from "./formatter.service";
/**
 * Service that converts Kendo cultures to Intl-compatible format
 * Used for integration with @progress/kendo-intl
 */
class KendoCultureToIntlService {
    /**
     * Convert a Kendo culture to an Intl-compatible adapter
     */
    convert(culture) {
        const kendoCulture = cultureService.getCulture(culture) || cultureService.culture();
        const currencies = {};
        currencies[kendoCulture.numberFormat.currency.abbr] = kendoCulture.numberFormat.currency;
        return {
            localeInfo: () => this.buildLocaleInfo(kendoCulture, currencies),
            parseDate: (value, fmt) => dateParserService.parseExactDate(value, fmt, kendoCulture),
            toString: (value, fmt) => {
                const result = formatterService.toString(value, fmt, kendoCulture);
                // Coerce to string for Intl adapter compatibility
                return result == null ? "" : String(result);
            },
            format: (fmt, ...values) => formatterService.format(fmt, ...values)
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
                    percentSign: kendoCulture.numberFormat.percent?.symbol || "%"
                },
                decimal: {
                    patterns: kendoCulture.numberFormat.pattern,
                    groupSize: kendoCulture.numberFormat.groupSize
                },
                currency: {
                    patterns: kendoCulture.numberFormat.currency?.pattern,
                    groupSize: kendoCulture.numberFormat.currency?.groupSize
                },
                percent: {
                    patterns: kendoCulture.numberFormat.percent?.pattern,
                    groupSize: kendoCulture.numberFormat.percent?.groupSize,
                    decimals: kendoCulture.numberFormat.percent?.decimals
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
export const intlService = new KendoCultureToIntlService();

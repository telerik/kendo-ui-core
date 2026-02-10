const DEFAULT_LANGUAGE = "en-US";
const DEFAULT_EN_US_CULTURE = {
    name: DEFAULT_LANGUAGE,
    numberFormat: {
        pattern: ["-n"],
        decimals: 2,
        ",": ",",
        ".": ".",
        groupSize: [3],
        percent: {
            pattern: ["-n %", "n %"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            symbol: "%"
        },
        currency: {
            name: "US Dollar",
            abbr: "USD",
            pattern: ["($n)", "$n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            symbol: "$"
        }
    },
    calendars: {
        standard: {
            days: {
                names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
            },
            months: {
                names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            AM: ["AM", "am", "AM"],
            PM: ["PM", "pm", "PM"],
            patterns: {
                d: "M/d/yyyy",
                D: "dddd, MMMM dd, yyyy",
                F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                g: "M/d/yyyy h:mm tt",
                G: "M/d/yyyy h:mm:ss tt",
                m: "MMMM dd",
                M: "MMMM dd",
                s: "yyyy'-'MM'-'ddTHH':'mm':'ss",
                t: "h:mm tt",
                T: "h:mm:ss tt",
                u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                y: "MMMM, yyyy",
                Y: "MMMM, yyyy"
            },
            "/": "/",
            ":": ":",
            firstDay: 0,
            twoDigitYearMax: 2029
        }
    }
};
export class CultureService {
    constructor(culturesRegistry) {
        this.cultures = culturesRegistry;
        // Initialize with default en-US culture if not present
        if (!this.cultures[DEFAULT_LANGUAGE]) {
            this.cultures[DEFAULT_LANGUAGE] = DEFAULT_EN_US_CULTURE;
        }
    }
    /**
     * Finds a culture by name or returns the culture object if already in the correct format
     * @param {string|Culture} culture - Culture name (e.g., "en-US") or culture object
     * @returns {Culture|null} The found culture object or null
     */
    findCulture(culture) {
        if (culture) {
            if (typeof culture === "string") {
                return this.cultures[culture] || this.cultures[culture.split("-")[0]] || null;
            }
            if (culture.numberFormat) {
                return culture;
            }
            return null;
        }
        return null;
    }
    /**
     * Gets a culture by name, returning current culture if not found
     * @param {string|Culture} culture - Culture name or culture object
     * @returns {Culture} The found culture or current culture
     */
    getCulture(culture) {
        if (culture) {
            culture = this.findCulture(culture);
        }
        return culture || this.cultures.current;
    }
    /**
     * Appends AM/PM designators to the culture's AM/PM arrays
     * @param {Calendars} calendars - The calendars object from a culture
     */
    appendDesignatorsToCultures(calendars) {
        // Don't ask. It's temporary.
        if ((calendars.standard.AM && calendars.standard.AM.length)
            && (calendars.standard.PM && calendars.standard.PM.length)
            && (calendars.standard.AM.indexOf("PMA0") < 0)
            && (calendars.standard.AM.indexOf("AM") > -1 || calendars.standard.PM.indexOf("PM") > -1)) {
            calendars.standard.AM.push("a", "A", "PMa", "PMA", "PMa0", "PMA0");
            calendars.standard.PM.push("p", "P", "AMp", "AMP", "AMp0", "AMP0");
        }
    }
    /**
     * Gets the current culture
     * @returns {Culture} The current culture
     */
    culture() {
        this.appendDesignatorsToCultures(this.cultures.current.calendars);
        return this.cultures.current;
    }
    /**
     * Sets the current culture
     * @param {string} cultureName - The name of the culture to set
     */
    setCulture(cultureName) {
        const culture = this.findCulture(cultureName) || this.cultures[DEFAULT_LANGUAGE];
        culture.calendar = culture.calendars.standard;
        this.cultures.current = culture;
    }
    /**
     * Register a culture (called when external culture files are loaded)
     * @param {string} name - Culture name (e.g., "de-DE")
     * @param {Culture} culture - Culture object
     */
    registerCulture(name, culture) {
        this.cultures[name] = culture;
    }
    /**
     * Get the cultures registry (for creating proxy)
     * @returns {CulturesRegistry} The cultures registry
     */
    getCulturesRegistry() {
        return this.cultures;
    }
}

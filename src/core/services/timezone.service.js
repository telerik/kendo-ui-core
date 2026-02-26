import { numberParserService } from "./number-parser.service";
// Constants
const NUMBER = "number";
const STRING = "string";
/**
 * Service for timezone conversions
 */
class TimezoneService {
    constructor() {
        /**
         * Timezone zone definitions - populated externally
         */
        this.zones = {};
        /**
         * Timezone rule definitions - populated externally
         */
        this.rules = {};
        /**
         * Month name to index mapping
         */
        this.months = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        /**
         * Day name to index mapping
         */
        this.days = {
            Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
        };
    }
    /**
     * Get the UTC offset for a given time in a timezone
     */
    offset(utcTime, timezone) {
        if (timezone === "Etc/UTC" || timezone === "Etc/GMT") {
            return 0;
        }
        const info = this.zoneAndRule(utcTime, this.zones, this.rules, timezone);
        const zone = info.zone;
        const rule = info.rule;
        return numberParserService.parseFloat(rule ? zone[0] - rule[6] : zone[0]);
    }
    /**
     * Get the timezone abbreviation for a given time
     */
    abbr(utcTime, timezone) {
        const info = this.zoneAndRule(utcTime, this.zones, this.rules, timezone);
        const zone = info.zone;
        const rule = info.rule;
        const base = zone[2];
        if (base.indexOf("/") >= 0) {
            return base.split("/")[rule && +rule[6] ? 1 : 0];
        }
        else if (base.indexOf("%s") >= 0) {
            return base.replace("%s", (!rule || rule[7] === "-") ? '' : rule[7]);
        }
        return base;
    }
    /**
     * Convert a date between timezones
     */
    convert(date, fromOffset, toOffset) {
        let tempToOffset = toOffset;
        let diff;
        if (typeof fromOffset === STRING) {
            fromOffset = this.offset(date, fromOffset);
        }
        if (typeof toOffset === STRING) {
            toOffset = this.offset(date, toOffset);
        }
        const fromLocalOffset = date.getTimezoneOffset();
        date = new Date(date.getTime() + (fromOffset - toOffset) * 60000);
        const toLocalOffset = date.getTimezoneOffset();
        if (typeof tempToOffset === STRING) {
            tempToOffset = this.offset(date, tempToOffset);
        }
        diff = (toLocalOffset - fromLocalOffset) + (toOffset - tempToOffset);
        return new Date(date.getTime() + diff * 60000);
    }
    /**
     * Apply a timezone to a local date
     */
    apply(date, timezone) {
        return this.convert(date, date.getTimezoneOffset(), timezone);
    }
    /**
     * Remove timezone adjustment from a date
     */
    remove(date, timezone) {
        return this.convert(date, timezone, date.getTimezoneOffset());
    }
    /**
     * Convert a UTC timestamp to a local date
     */
    toLocalDate(time) {
        return this.apply(new Date(time), "Etc/UTC");
    }
    /**
     * Convert a rule to a Date for a specific year
     */
    ruleToDate(year, rule) {
        let date;
        let targetDay;
        let ourDay;
        const month = rule[3];
        const on = rule[4];
        const time = rule[5];
        let cache = rule[8];
        if (!cache) {
            rule[8] = cache = {};
        }
        if (cache[year]) {
            return cache[year];
        }
        if (!isNaN(on)) {
            date = new Date(Date.UTC(year, this.months[month], on, time[0], time[1], time[2], 0));
        }
        else if (on.indexOf("last") === 0) {
            date = new Date(Date.UTC(year, this.months[month] + 1, 1, time[0] - 24, time[1], time[2], 0));
            targetDay = this.days[on.substr(4, 3)];
            ourDay = date.getUTCDay();
            date.setUTCDate(date.getUTCDate() + targetDay - ourDay - (targetDay > ourDay ? 7 : 0));
        }
        else if (on.indexOf(">=") >= 0) {
            date = new Date(Date.UTC(year, this.months[month], parseInt(on.substr(5), 10), time[0], time[1], time[2], 0));
            targetDay = this.days[on.substr(0, 3)];
            ourDay = date.getUTCDay();
            date.setUTCDate(date.getUTCDate() + targetDay - ourDay + (targetDay < ourDay ? 7 : 0));
        }
        else if (on.indexOf("<=") >= 0) {
            date = new Date(Date.UTC(year, this.months[month], parseInt(on.substr(5), 10), time[0], time[1], time[2], 0));
            targetDay = this.days[on.substr(0, 3)];
            ourDay = date.getUTCDay();
            date.setUTCDate(date.getUTCDate() + targetDay - ourDay - (targetDay > ourDay ? 7 : 0));
        }
        return cache[year] = date;
    }
    /**
     * Find the applicable rule for a given UTC time
     */
    findRule(utcTime, rules, zone) {
        let zoneRules = rules[zone];
        if (!zoneRules) {
            const time = zone.split(":");
            let offset = 0;
            if (time.length > 1) {
                offset = parseInt(time[0], 10) * 60 + Number(time[1]);
            }
            return [-1000000, 'max', '-', 'Jan', 1, [0, 0, 0], offset, '-'];
        }
        const year = new Date(utcTime).getUTCFullYear();
        // Filter rules applicable to this year
        // Note: Using == for loose equality to match original behavior since rule values may be strings
        zoneRules = zoneRules.filter((rule) => {
            const from = rule[0];
            const to = rule[1];
            // eslint-disable-next-line eqeqeq
            return from <= year && (to >= year || (from == year && to === "only") || to === "max");
        });
        // Add the utcTime to sort with rules
        const sortArray = [...zoneRules, utcTime];
        sortArray.sort((a, b) => {
            let aVal = a;
            let bVal = b;
            if (typeof a !== "number") {
                aVal = Number(this.ruleToDate(year, a));
            }
            if (typeof b !== "number") {
                bVal = Number(this.ruleToDate(year, b));
            }
            return aVal - bVal;
        });
        const idx = sortArray.indexOf(utcTime);
        const rule = sortArray[idx - 1] || sortArray[sortArray.length - 1];
        return isNaN(rule) ? rule : null;
    }
    /**
     * Find the zone definition for a given UTC time
     */
    findZone(utcTime, zones, timezone) {
        let zoneRules = zones[timezone];
        if (typeof zoneRules === "string") {
            zoneRules = zones[zoneRules];
        }
        if (!zoneRules) {
            throw new Error('Timezone "' + timezone + '" is either incorrect, or kendo.timezones.min.js is not included.');
        }
        const zoneArray = zoneRules;
        let idx;
        for (idx = zoneArray.length - 1; idx >= 0; idx--) {
            const until = zoneArray[idx][3];
            if (until && utcTime > until) {
                break;
            }
        }
        const zone = zoneArray[idx + 1];
        if (!zone) {
            throw new Error('Timezone "' + timezone + '" not found on ' + utcTime + ".");
        }
        return zone;
    }
    /**
     * Get zone and rule info for a given UTC time
     */
    zoneAndRule(utcTime, zones, rules, timezone) {
        if (typeof utcTime !== NUMBER) {
            const date = utcTime;
            utcTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        }
        const zone = this.findZone(utcTime, zones, timezone);
        return {
            zone: zone,
            rule: this.findRule(utcTime, rules, zone[1])
        };
    }
}
export const timezoneService = new TimezoneService();

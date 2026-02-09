export function parseValueForDateWidget(value) {
    if (kendo.isBlank(value) || (kendo.isString(value) && kendo.isEmpty(value.trim()))) {
        return value;
    }

    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (kendo.isPresent(value[i]) && !(kendo.isString(value[i]) && kendo.isEmpty(value[i].trim()))) {
                return parseValueForDateWidget(value[i]);
            }
        }
        return value;
    }

    if (kendo.isDate(value)) {
        return value;
    }

    let dateObj = new Date(value);

    if (isNaN(dateObj.getTime())) {
        return value;
    }

    return dateObj;
}

export function parseValueForTimeWidget(value) {
    if (kendo.isBlank(value) || (kendo.isString(value) && kendo.isEmpty(value.trim()))) {
        return value;
    }

    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (kendo.isPresent(value[i]) && !(kendo.isString(value[i]) && kendo.isEmpty(value[i].trim()))) {
                return parseValueForTimeWidget(value[i]);
            }
        }
        return value;
    }

    if (kendo.isDate(value)) {
        return value;
    }

    if (kendo.isString(value)) {
        const isoPattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z?$/;
        const isoMatch = value.trim().match(isoPattern);

        if (isoMatch) {
            const hours = parseInt(isoMatch[4], 10);
            const minutes = parseInt(isoMatch[5], 10);
            const seconds = parseInt(isoMatch[6], 10);

            const today = new Date();
            today.setHours(hours, minutes, seconds, 0);
            return today;
        }

        const timePattern = /^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM))?$/i;
        const match = value.trim().match(timePattern);

        if (match) {
            let hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = match[3] ? parseInt(match[3], 10) : 0;
            const ampm = match[4] ? match[4].toLowerCase() : null;

            if (ampm) {
                if (ampm === 'am' && hours === 12) {
                    hours = 0;
                } else if (ampm === 'pm' && hours !== 12) {
                    hours += 12;
                }
            }

            const today = new Date();
            today.setHours(hours, minutes, seconds, 0);
            return today;
        }
    }

    return value;
}

export function parseValueForDateTimeWidget(value) {
    if (kendo.isBlank(value) || (kendo.isString(value) && kendo.isEmpty(value.trim()))) {
        return value;
    }

    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (kendo.isPresent(value[i]) && !(kendo.isString(value[i]) && kendo.isEmpty(value[i].trim()))) {
                return parseValueForDateTimeWidget(value[i]);
            }
        }
        return value;
    }

    if (kendo.isDate(value)) {
        return value;
    }

    if (kendo.isString(value)) {
        const isoPattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z?$/;
        const isoMatch = value.trim().match(isoPattern);

        if (isoMatch) {
            const year = parseInt(isoMatch[1], 10);
            const month = parseInt(isoMatch[2], 10) - 1; // Month is 0-indexed
            const day = parseInt(isoMatch[3], 10);
            const hours = parseInt(isoMatch[4], 10);
            const minutes = parseInt(isoMatch[5], 10);
            const seconds = parseInt(isoMatch[6], 10);

            return new Date(year, month, day, hours, minutes, seconds, 0);
        }
    }

    let dateObj = new Date(value);

    if (isNaN(dateObj.getTime())) {
        return value;
    }

    return dateObj;
}

export function parseValueForArrayWidget(value) {
    if (kendo.isBlank(value) || (kendo.isString(value) && kendo.isEmpty(value.trim()))) {
        return [];
    }

    if (Array.isArray(value)) {
        return value.map(function(item) {
            return kendo.isString(item) ? item.trim() : item;
        }).filter(function(item) {
            return kendo.isPresent(item) && !(kendo.isString(item) && kendo.isEmpty(item));
        });
    }

    if (kendo.isString(value)) {
        return value.split(',').map(function(item) {
            return item.trim();
        }).filter(function(item) {
            return item.length > 0;
        });
    }

    return [value];
}
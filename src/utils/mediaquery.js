let breakpoints;
const EVENT = "change";

export const defaultBreakpoints = {
    small: "(max-width: 500px)",
    medium: "(min-width: 500.1px) and (max-width: 768px)",
    large: "(min-width: 768.1px)",
};

function createMediaQuery(query) {
    let mediaQueryList = window.matchMedia(query);
    let onEnterCallbacks = [];
    let onLeaveCallbacks = [];
    let onChangeHandlers = [];
    let kendoMediaQuery = { mediaQueryList };

    const onChangeHandler = (ev) => {
        onChangeHandlers.forEach((cb) => cb(ev));

        if (ev.matches) {
            onEnterCallbacks.forEach((cb) => cb(ev));
        } else {
            onLeaveCallbacks.forEach((cb) => cb(ev));
        }
    };

    mediaQueryList.addEventListener(EVENT, onChangeHandler);

    const onChange = (cb) => {
        onChangeHandlers.push(cb);
        return kendoMediaQuery;
    };

    const onEnter = (cb) => {
        onEnterCallbacks.push(cb);

        if (mediaQueryList.matches) {
            const media = mediaQueryList.media;
            const matches = true;

            const ev = new MediaQueryListEvent(EVENT, {
                media,
                matches,
            });

            cb(ev);
        }

        return kendoMediaQuery;
    };

    const onLeave = (cb) => {
        onLeaveCallbacks.push(cb);
        return kendoMediaQuery;
    };

    const destroy = () => {
        if (mediaQueryList) {
            mediaQueryList.removeEventListener(EVENT, onChangeHandler);
        }
        onEnterCallbacks = null;
        onLeaveCallbacks = null;
        onChangeHandlers = null;
        mediaQueryList = null;
        kendoMediaQuery = null;
    };

    kendoMediaQuery.onChange = onChange;
    kendoMediaQuery.onEnter = onEnter;
    kendoMediaQuery.onLeave = onLeave;
    kendoMediaQuery.destroy = destroy;

    return kendoMediaQuery;
}

export function mediaQuery(query) {
    if (!query) {
        return;
    }

    breakpoints =
        breakpoints ||
        Object.assign({}, defaultBreakpoints, kendo.defaults.breakpoints);

    if (query in breakpoints) {
        query = breakpoints[query];
    }

    return createMediaQuery(query);
}

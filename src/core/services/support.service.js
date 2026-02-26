const UNDEFINED = "undefined";
/**
 * Test a value against a set of regex patterns
 */
function testRx(agent, rxs, dflt) {
    for (const rx in rxs) {
        if (rxs.hasOwnProperty(rx) && rxs[rx].test(agent)) {
            return rx;
        }
    }
    return dflt !== undefined ? dflt : agent;
}
/**
 * Support detection service for browser, OS, and feature detection
 */
class SupportService {
    constructor() {
        this._scrollbar = undefined;
        this.scrollbar = this.scrollbar.bind(this);
        this.isRtl = this.isRtl.bind(this);
        this.detectOS = this.detectOS.bind(this);
        this.detectBrowser = this.detectBrowser.bind(this);
        this.detectClipboardAccess = this.detectClipboardAccess.bind(this);
        this.zoomLevel = this.zoomLevel.bind(this);
        this.delayedClick = this.delayedClick.bind(this);
        this.initialize();
    }
    initialize() {
        const win = window;
        const doc = document;
        const nav = navigator;
        // Table innerHTML support test
        const table = doc.createElement("table");
        try {
            table.innerHTML = "<tr><td></td></tr>";
            this.tbodyInnerHtml = true;
        }
        catch (e) {
            this.tbodyInnerHtml = false;
        }
        // Touch support
        this.touch = "ontouchstart" in win;
        const docStyle = doc.documentElement.style;
        const elementProto = "HTMLElement" in win ? HTMLElement.prototype : [];
        // Transforms and Transitions - legacy properties kept for compatibility
        this.transforms = this.transitions = { css: "", prefix: "", event: "transitionend" };
        this.hasHW3D = ("WebKitCSSMatrix" in win && "m11" in new win.WebKitCSSMatrix()) ||
            "MozPerspective" in docStyle ||
            "msPerspective" in docStyle;
        this.cssFlexbox = ("flexWrap" in docStyle) ||
            ("WebkitFlexWrap" in docStyle) ||
            ("msFlexWrap" in docStyle);
        this.devicePixelRatio = win.devicePixelRatio === undefined ? 1 : win.devicePixelRatio;
        try {
            this.screenWidth = win.outerWidth || win.screen ? win.screen.availWidth : win.innerWidth;
            this.screenHeight = win.outerHeight || win.screen ? win.screen.availHeight : win.innerHeight;
        }
        catch (e) {
            // window.outerWidth throws error when in IE showModalDialog
            this.screenWidth = win.screen.availWidth;
            this.screenHeight = win.screen.availHeight;
        }
        // Detect mobile OS
        let mobileOS = this.detectOS(nav.userAgent);
        this.mobileOS = mobileOS;
        this.wpDevicePixelRatio = mobileOS && mobileOS.wp ? screen.width / 320 : 0;
        this.hasNativeScrolling = false;
        if (mobileOS && (mobileOS.ios || (mobileOS.android && parseInt(mobileOS.majorVersion) > 2) || mobileOS.wp)) {
            this.hasNativeScrolling = mobileOS;
        }
        this.mouseAndTouchPresent = this.touch && !(mobileOS && (mobileOS.ios || mobileOS.android));
        // Detect browser
        this.browser = this.detectBrowser(nav.userAgent);
        // Handle iPad detection for Safari on iPadOS 13+
        if (!mobileOS && this.touch && this.browser.safari) {
            mobileOS = this.mobileOS = {
                ios: true,
                tablet: "tablet",
                device: "ipad",
                majorVersion: "13",
                minorVersion: "0",
                flatVersion: "1300",
                cordova: false,
                appMode: false,
                name: "ios",
                browser: "mobilesafari"
            };
        }
        // Clipboard support
        this.clipboard = this.detectClipboardAccess();
        // Event capture support
        this.eventCapture = !!doc.documentElement.addEventListener;
        // Input element feature detection
        const input = doc.createElement("input");
        this.placeholder = "placeholder" in input;
        this.propertyChangeEvent = "onpropertychange" in input;
        // Input type support
        this.input = this.detectInputTypes(input);
        // CSS float support
        input.style.cssText = "float:left;";
        this.cssFloat = !!input.style.cssFloat;
        // Stable sort detection
        this.stableSort = this.detectStableSort();
        // Matches selector
        this.matchesSelector = elementProto.webkitMatchesSelector ||
            elementProto.mozMatchesSelector ||
            elementProto.msMatchesSelector ||
            elementProto.oMatchesSelector ||
            elementProto.matchesSelector ||
            elementProto.matches ||
            function (selector) {
                const nodeList = doc.querySelectorAll ?
                    (this.parentNode || doc).querySelectorAll(selector) || [] :
                    $(selector);
                let i = nodeList.length;
                while (i--) {
                    if (nodeList[i] === this) {
                        return true;
                    }
                }
                return false;
            };
        this.matchMedia = "matchMedia" in win;
        this.pushState = !!(win.history && win.history.pushState);
        this.hashChange = "onhashchange" in win;
        this.customElements = "registerElement" in doc;
        // Pointer event support
        const chrome = this.browser.chrome;
        const mobileChrome = this.browser.crios;
        const mozilla = this.browser.mozilla;
        const safari = this.browser.safari;
        this.msPointers = !chrome && win.MSPointerEvent;
        this.pointers = !chrome && !mobileChrome && !mozilla && !safari && win.PointerEvent;
        this.kineticScrollNeeded = !!(mobileOS &&
            (mobileOS.device !== "ipad" || parseInt(mobileOS.majorVersion) < 13) &&
            (this.touch || this.msPointers || this.pointers));
        // Set resize and mouse event name(s) based on device type
        if (this.touch) {
            if (!this.mobileOS) {
                this.mousedown = "mousedown touchstart";
                this.mouseup = "mouseup touchend";
                this.mousemove = "mousemove touchmove";
                this.mousecancel = "mouseleave touchcancel";
                this.click = "click";
                this.resize = "resize";
            }
            else {
                this.mousedown = "touchstart";
                this.mouseup = "touchend";
                this.mousemove = "touchmove";
                this.mousecancel = "touchcancel";
                this.click = "touchend";
                this.resize = "orientationchange";
            }
        }
        else if (this.pointers) {
            this.mousemove = "pointermove";
            this.mousedown = "pointerdown";
            this.mouseup = "pointerup";
            this.mousecancel = "pointercancel";
            this.click = "pointerup";
            this.resize = "orientationchange resize";
        }
        else if (this.msPointers) {
            this.mousemove = "MSPointerMove";
            this.mousedown = "MSPointerDown";
            this.mouseup = "MSPointerUp";
            this.mousecancel = "MSPointerCancel";
            this.click = "MSPointerUp";
            this.resize = "orientationchange resize";
        }
        else {
            this.mousemove = "mousemove";
            this.mousedown = "mousedown";
            this.mouseup = "mouseup";
            this.mousecancel = "mouseleave";
            this.click = "click";
            this.resize = "resize";
        }
        // Add browser-specific CSS classes
        this.addBrowserCssClasses($);
    }
    /**
     * Get or calculate scrollbar width
     */
    scrollbar(refresh) {
        if (!isNaN(this._scrollbar) && !refresh) {
            return this._scrollbar;
        }
        const div = document.createElement("div");
        div.style.cssText = "overflow:scroll;overflow-x:hidden;zoom:1;clear:both;display:block";
        div.innerHTML = "&nbsp;";
        document.body.appendChild(div);
        this._scrollbar = div.offsetWidth - div.scrollWidth;
        document.body.removeChild(div);
        return this._scrollbar;
    }
    /**
     * Check if element is in RTL context
     */
    isRtl(element) {
        return $(element).closest(".k-rtl").length > 0;
    }
    /**
     * Detect mobile operating system from user agent
     */
    detectOS(ua) {
        let os = false;
        let minorVersion;
        let match = null;
        const notAndroidPhone = !/mobile safari/i.test(ua);
        const agentRxs = {
            wp: /(Windows Phone(?: OS)?)\s(\d+)\.(\d+(\.\d+)?)/,
            fire: /(Silk)\/(\d+)\.(\d+(\.\d+)?)/,
            android: /(Android|Android.*(?:Opera|Firefox).*?\/)\s*(\d+)\.?(\d+(\.\d+)?)?/,
            iphone: /(iPhone|iPod).*OS\s+(\d+)[\._]([\d\._]+)/,
            ipad: /(iPad).*OS\s+(\d+)[\._]([\d_]+)/,
            meego: /(MeeGo).+NokiaBrowser\/(\d+)\.([\d\._]+)/,
            webos: /(webOS)\/(\d+)\.(\d+(\.\d+)?)/,
            blackberry: /(BlackBerry|BB10).*?Version\/(\d+)\.(\d+(\.\d+)?)/,
            playbook: /(PlayBook).*?Tablet\s*OS\s*(\d+)\.(\d+(\.\d+)?)/,
            windows: /(MSIE)\s+(\d+)\.(\d+(\.\d+)?)/,
            tizen: /(tizen).*?Version\/(\d+)\.(\d+(\.\d+)?)/i,
            sailfish: /(sailfish).*rv:(\d+)\.(\d+(\.\d+)?).*firefox/i,
            ffos: /(Mobile).*rv:(\d+)\.(\d+(\.\d+)?).*Firefox/
        };
        const osRxs = {
            ios: /^i(phone|pad|pod)$/i,
            android: /^android|fire$/i,
            blackberry: /^blackberry|playbook/i,
            windows: /windows/,
            wp: /wp/,
            flat: /sailfish|ffos|tizen/i,
            meego: /meego/
        };
        const formFactorRxs = {
            tablet: /playbook|ipad|fire/i
        };
        const browserRxs = {
            omini: /Opera\sMini/i,
            omobile: /Opera\sMobi/i,
            firefox: /Firefox|Fennec/i,
            mobilesafari: /version\/.*safari/i,
            ie: /MSIE|Windows\sPhone/i,
            chrome: /chrome|crios/i,
            webkit: /webkit/i,
            edge: /edge|edg|edgios|edga/i
        };
        for (const agent in agentRxs) {
            if (agentRxs.hasOwnProperty(agent)) {
                match = ua.match(agentRxs[agent]);
                if (match) {
                    // Break if not Metro/Mobile Windows
                    if (agent === "windows" && "plugins" in navigator) {
                        return false;
                    }
                    os = {};
                    os.device = agent;
                    os.tablet = testRx(agent, formFactorRxs, false);
                    os.browser = testRx(ua, browserRxs, "default");
                    os.name = testRx(agent, osRxs);
                    os[os.name] = true;
                    os.majorVersion = match[2];
                    os.minorVersion = (match[3] || "0").replace("_", ".");
                    minorVersion = os.minorVersion.replace(".", "").substr(0, 2);
                    os.flatVersion = os.majorVersion + minorVersion +
                        (new Array(3 - (minorVersion.length < 3 ? minorVersion.length : 2)).join("0"));
                    os.cordova = typeof window.PhoneGap !== UNDEFINED ||
                        typeof window.cordova !== UNDEFINED;
                    os.appMode = !!navigator.standalone ||
                        (/file|local|wmapp/).test(window.location.protocol) ||
                        os.cordova;
                    if (os.android &&
                        (this.devicePixelRatio < 1.5 && parseInt(os.flatVersion) < 400 || notAndroidPhone) &&
                        (this.screenWidth > 800 || this.screenHeight > 800)) {
                        os.tablet = agent;
                    }
                    break;
                }
            }
        }
        return os;
    }
    /**
     * Detect browser from user agent
     */
    detectBrowser(ua) {
        let browser = false;
        let match;
        let chromiumEdgeMatch;
        const browserRxs = {
            edge: /(edge)[ \/]([\w.]+)/i,
            webkit: /(chrome|crios)[ \/]([\w.]+)/i,
            safari: /(webkit)[ \/]([\w.]+)/i,
            opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i,
            msie: /(msie\s|trident.*? rv:)([\w.]+)/i,
            mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i
        };
        for (const agent in browserRxs) {
            if (browserRxs.hasOwnProperty(agent)) {
                match = ua.match(browserRxs[agent]);
                if (match) {
                    browser = {};
                    browser[agent] = true;
                    browser[match[1].toLowerCase().split(" ")[0].split("/")[0]] = true;
                    browser.version = parseInt(document.documentMode || match[2], 10);
                    if (browser.chrome) {
                        chromiumEdgeMatch = ua.match(/(edg)[ \/]([\w.]+)/i);
                        if (chromiumEdgeMatch) {
                            browser.chromiumEdge = true;
                        }
                    }
                    break;
                }
            }
        }
        return browser || { version: 0 };
    }
    /**
     * Detect clipboard command support
     */
    detectClipboardAccess() {
        const doc = document;
        const commands = {
            copy: doc.queryCommandSupported ? doc.queryCommandSupported("copy") : false,
            cut: doc.queryCommandSupported ? doc.queryCommandSupported("cut") : false,
            paste: doc.queryCommandSupported ? doc.queryCommandSupported("paste") : false
        };
        if (this.browser.chrome) {
            // Not using queryCommandSupported due to chromium issues 476508 and 542948
            commands.paste = false;
            if (this.browser.version >= 43) {
                commands.copy = true;
                commands.cut = true;
            }
        }
        return commands;
    }
    /**
     * Get current zoom level
     */
    zoomLevel() {
        try {
            const browser = this.browser;
            let ie11WidthCorrection = 0;
            const docEl = document.documentElement;
            if (browser.msie && browser.version === 11 &&
                docEl.scrollHeight > docEl.clientHeight && !this.touch) {
                ie11WidthCorrection = this.scrollbar();
            }
            return this.touch ?
                (docEl.clientWidth / window.innerWidth) :
                (browser.msie && browser.version >= 10 ?
                    (((top || window).document.documentElement.offsetWidth + ie11WidthCorrection) /
                        (top || window).innerWidth) :
                    1);
        }
        catch (e) {
            return 1;
        }
    }
    /**
     * Check if device has delayed click behavior
     */
    delayedClick() {
        // Only mobile devices with touch events do this
        if (this.touch) {
            const mobileOS = this.mobileOS;
            // All iOS devices delay their click events
            if (mobileOS && mobileOS.ios) {
                return true;
            }
            if (mobileOS && mobileOS.android) {
                // Older webkits and webviews delay the click
                if (!this.browser.chrome) {
                    return true;
                }
                // Chrome 32+ does conditional fast clicks
                if (this.browser.version < 32) {
                    return false;
                }
                // Check if viewport is user-scalable
                return !($("meta[name=viewport]").attr("content") || "").match(/user-scalable=no/i);
            }
        }
        return false;
    }
    /**
     * Detect native input type support
     */
    detectInputTypes(input) {
        const types = ["number", "date", "time", "month", "week", "datetime", "datetime-local"];
        const value = "test";
        const result = {};
        for (const type of types) {
            input.setAttribute("type", type);
            input.value = value;
            result[type.replace("-", "")] = input.type !== "text" && input.value !== value;
        }
        return result;
    }
    /**
     * Detect if sort is stable
     */
    detectStableSort() {
        // Chrome sort is not stable for more than 10 items
        // IE9+ sort is not stable for more than 512 items
        const threshold = 513;
        const sorted = [{
                index: 0,
                field: "b"
            }];
        for (let i = 1; i < threshold; i++) {
            sorted.push({
                index: i,
                field: "a"
            });
        }
        sorted.sort((a, b) => {
            return a.field > b.field ? 1 : (a.field < b.field ? -1 : 0);
        });
        return sorted[0].index === 1;
    }
    /**
     * Add browser-specific CSS classes to document element
     */
    addBrowserCssClasses($) {
        const browser = this.browser;
        let cssClass = "";
        const docElement = $(document.documentElement);
        const majorVersion = parseInt(String(browser.version), 10);
        if (browser.msie) {
            cssClass = "ie";
        }
        else if (browser.mozilla) {
            cssClass = "ff";
        }
        else if (browser.safari) {
            cssClass = "safari";
        }
        else if (browser.webkit) {
            cssClass = "webkit";
        }
        else if (browser.opera) {
            cssClass = "opera";
        }
        else if (browser.edge) {
            cssClass = "edge";
        }
        if (cssClass) {
            cssClass = "k-" + cssClass + " k-" + cssClass + majorVersion;
        }
        if (this.mobileOS) {
            cssClass += " k-mobile";
        }
        if (!this.cssFlexbox) {
            cssClass += " k-no-flexbox";
        }
        docElement.addClass(cssClass);
    }
    /**
     * Convert Bootstrap breakpoint name to CSS media query
     */
    bootstrapToMedia(bootstrapMedia) {
        const bootstrapBreakpoints = {
            "xs": "(max-width: 576px)",
            "sm": "(min-width: 576px)",
            "md": "(min-width: 768px)",
            "lg": "(min-width: 992px)",
            "xl": "(min-width: 1200px)"
        };
        return bootstrapBreakpoints[bootstrapMedia];
    }
    /**
     * Check if a media query matches
     * Supports both CSS media queries and Bootstrap breakpoint names
     */
    matchesMedia(mediaQuery) {
        const media = this.bootstrapToMedia(mediaQuery) || mediaQuery;
        return this.matchMedia && window.matchMedia(media).matches;
    }
}
export const supportService = new SupportService();

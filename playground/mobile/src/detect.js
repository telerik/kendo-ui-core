(function($) {
    function detectOS(ua) {
        var os = false, match = [],
            agentRxs = {
                android: /(Android)\s+(\d+)\.([\d.]+)/,
                iphone: /(iPhone|iPod).*OS\s+(\d+)\.([\d.]+)/,
                ipad: /(iPad).*OS\s+(\d+)_([\d_]+)/,
                webos: /(webOS)\/(\d+)\.([\d.]+)/,
                blackberry: /(BlackBerry).*?Version\/(\d+)\.([\d.]+)/
            };
        for (var agent in agentRxs) {
            match = ua.match(agentRxs[agent]);
            if (match) {
                os = {};
                os.name = agent.toLowerCase();
                os[os.name] = true;
                os.majorVersion = match[2];
                os.minorVersion = match[3].replace(/_/g, '.');
                os.ios = (agent in { iphone:0, ipod:0, ipad:0 });
                
                break;
            }
        }
        return os;
    }

    $.os = detectOS(navigator.userAgent);
    $.__detect = detectOS;

    function detectBrowser() {
        var featureCheck = document.createElement('div'),
            browser = {};

        featureCheck.style.cssText = '-moz-transform-origin: 0px 0px; -webkit-transform-origin: 0px 0px; -o-transform-origin: 0px 0px; -ms-transform-origin: 0px 0px; position: absolute; top: -10000px; visibility: hidden;';
        document.documentElement.appendChild(featureCheck);
        var featStyle = document.defaultView.getComputedStyle(featureCheck);
        browser.Firefox = featStyle.getPropertyValue('-moz-transform-origin') == '0px 0px';
        browser.WebKit = featStyle.getPropertyValue('-webkit-transform-origin') == '0px 0px';
        browser.Opera = featStyle.getPropertyValue('-o-transform-origin') == '0px 0px';
        browser.IE = featStyle.getPropertyValue('-ms-transform-origin') == '0px 0px';
        browser.name = browser.Firefox ? 'Firefox' : browser.WebKit ? 'WebKit' : browser.Opera ? 'Opera' : browser.IE ? 'IE' : 'non-supported';
        document.documentElement.removeChild(featureCheck);
        featureCheck = null;

        return browser;
    }

    $.browser = detectBrowser();

    $.getEventPrefix = function () {
      if (!this._eventPrefix) {
        this._eventPrefix = '';
        switch ($.browser.name) {
          case 'WebKit': this._eventPrefix = 'webkit'; break;
          case 'Opera': this._eventPrefix = 'o'; break;
        }
      }

      return this._eventPrefix;
    };
    
    $.getCssPrefix = function () {
      if (!this._cssPrefix) {
        this._cssPrefix = '';
        switch ($.browser.name) {
          case 'Firefox': this._cssPrefix = '-moz-'; break;
          case 'WebKit': this._cssPrefix = '-webkit-'; break;
          case 'Opera': this._cssPrefix = '-o-'; break;
          case 'IE': this._cssPrefix = '-ms-'; break;
        }
      }

      return this._cssPrefix;
    };

})(Zepto);

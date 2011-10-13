;(function($, undefined) {

// Cached regex for cleaning hashes.
var hashStrip = /^#*/;

// Cached regex for detecting MSIE.
var isExplorer = /msie [\w.]+/;

// Has the history handling already been started?
var historyStarted = false;

kendo.History = {

  handlers: [],
  // The default interval to poll for hash changes, if necessary, is
  // twenty times a second.
  interval: 50,

  // Get the cross-browser normalized URL fragment, either from the URL,
  // the hash, or the override.
  getFragment : function(fragment, forcePushState) {
    if (fragment == null) {
      if (this._hasPushState || forcePushState) {
        fragment = window.location.pathname;
        var search = window.location.search;
        if (search) fragment += search;
      } else {
        fragment = window.location.hash;
      }
    }
    fragment = decodeURIComponent(fragment.replace(hashStrip, ''));
    if (!fragment.indexOf(this.options.root)) fragment = fragment.substr(this.options.root.length);
    return fragment;
  },

  // Start the hash change handling, returning `true` if the current URL matches
  // an existing route, and `false` otherwise.
  start : function(options) {

    var that = this;

    var checkUrl = function(e) {
      var current = that.getFragment();
      if (current == that.fragment && that.iframe) current = that.getFragment(that.iframe.location.hash);
      if (current == that.fragment || current == decodeURIComponent(that.fragment)) return false;
      if (that.iframe) that.navigate(current);
      that.loadUrl() || that.loadUrl(window.location.hash);
    }

    // Figure out the initial configuration. Do we need an iframe?
    // Is pushState desired ... is it available?
    if (historyStarted) throw new Error("Backbone.history has already been started");
    this.options          = $.extend({root: "/", pushState: true}, options);
    this._wantsPushState  = !!this.options.pushState;
    this._hasPushState    = !!(this.options.pushState && window.history && window.history.pushState);
    var fragment          = this.getFragment();
    var docMode           = document.documentMode;
    var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));
    if (oldIE) {
      this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
      this.navigate(fragment);
    }

    // Depending on whether we're using pushState or hashes, and whether
    // 'onhashchange' is supported, determine how we check the URL state.
    if (this._hasPushState) {
      $(window).bind('popstate', checkUrl);
    } else if ('onhashchange' in window && !oldIE) {
      $(window).bind('hashchange', checkUrl);
    } else {
      setInterval(checkUrl, this.interval);
    }

    // Determine if we need to change the base url, for a pushState link
    // opened by a non-pushState browser.
    this.fragment = fragment;
    historyStarted = true;
    var loc = window.location;
    var atRoot  = loc.pathname == this.options.root;
    if (this._wantsPushState && !this._hasPushState && !atRoot) {
      this.fragment = this.getFragment(null, true);
      window.location.replace(this.options.root + '#' + this.fragment);
      // Return immediately as browser will do redirect to new url
      return true;
    } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
      this.fragment = loc.hash.replace(hashStrip, '');
      window.history.replaceState({}, document.title, loc.protocol + '//' + loc.host + this.options.root + this.fragment);
    }

    if (!this.options.silent) {
      return this.loadUrl();
    }
  },

  // Add a route to be tested when the fragment changes. Routes added later may
  // override previous routes.
  route : function(route, callback) {
    this.handlers.unshift({route : route, callback : callback});
  },

  // Attempt to load the current URL fragment. If a route succeeds with a
  // match, returns `true`. If no defined routes matches the fragment,
  // returns `false`.
  loadUrl : function(fragmentOverride) {
    var fragment = this.fragment = this.getFragment(fragmentOverride);
    var idx, handler;

    for (var idx = 0; idx < this.handlers.length; idx ++) {
      handler = this.handlers[idx];
      if (handler.route.test(fragment)) {
        handler.callback(fragment);
        return true;
      }
    }

    return false;
  },

  // Save a fragment into the hash history. You are responsible for properly
  // URL-encoding the fragment in advance. This does not trigger
  // a `hashchange` event.
  navigate : function(fragment) {
    var frag = (fragment || '').replace(hashStrip, '');
    if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;
    if (this._hasPushState) {
      var loc = window.location;
      if (frag.indexOf(this.options.root) != 0) frag = (this.options.root + frag).replace(/\/\//g, '/');
      this.fragment = frag;
      window.history.pushState({}, document.title, loc.protocol + '//' + loc.host + frag);
    } else {
      window.location.hash = this.fragment = frag;
      if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
        this.iframe.document.open().close();
        this.iframe.location.hash = frag;
      }
    }

    this.loadUrl(fragment);
  }
}

})(jQuery);

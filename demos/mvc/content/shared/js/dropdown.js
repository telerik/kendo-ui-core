// # Dropdown jquery plugin
// # Depends on "_dropdown.sass" and array shim
// # open "dropdown-view" on btn (link, span) click
// # close on body click and escape
// # option for visible 'dropdown-view'
// # option for center the view - this could be done with css too

;(function($, window, document, undefined) {
  'use strict';

  var pluginName = 'dropdown';

  var dropdownsList = [];

  function Plugin(element, options) {
    this._name = pluginName;
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.$trigger = this.$element.find('.' + this.options.btnClass);
    this.$content = this.$element.find('.' + this.options.contentClass);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.addEvents();
      if (this.options.hidden === false) {
        this.open();
      }
    },
    open: function() {
      var self = this;
      $.fn[pluginName].closeAll();
      this.isOpen = true;
      this.$element.addClass('is-open');
      this.$trigger.addClass('is-active');
      $(document).on('click.dropdown', $.proxy(this.toggle, this));
      // close on esc
      $(document).on('keydown.dropdown', function(e) {
        if (e.keyCode === 27) {
          self.close();
        }
      });
    },
    close: function() {
      this.isOpen = false;
      this.$element.removeClass('is-open');
      this.$trigger.removeClass('is-active');
      $(document).off('click.dropdown');
      $(document).off('keydown.dropdown');
    },
    toggle: function(e) {
      if (!this.isOpen) {
        this.open();
      }
      else {
        this.close();
      }
      e.stopPropagation();
      e.preventDefault();
    },
    center: function() {
      if (!this.options.centerContent) {
        return;
      }
      var btnWidth = this.$trigger.outerWidth();
      var contentWidth = this.$content.outerWidth();
      this.$content.css('left', -(Math.abs(btnWidth - contentWidth) / 2));
    },
    addEvents: function() {
      this.center();
      this.$trigger.on('click.dropdown', $.proxy(this.toggle, this));
      this.$content.on('click', function(e) {
        e.stopPropagation();
      });
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        dropdownsList.push($.data(this, 'plugin_' + pluginName, new Plugin(this, options)));
      }
    });
  };

  $.fn[pluginName].defaults = {
    wrapClass: 'Dropdown',
    btnClass: 'Dropdown-control',
    contentClass: 'Dropdown-view',
    centerContent: false,
    hidden: true
  };

  // global function to close all dropdowns
  $.fn[pluginName].closeAll = function() {
    // dropdownsList.forEach(function(dropdown) {
    //   dropdown.close();
    // });
    $.each(dropdownsList, function(index, dropdown) {
      dropdown.close();
    });
  };

})(jQuery, window, document);

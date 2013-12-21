/*
  Data Loader

  On window.load event this function scans for DOM elements containing data-tlrk-plugin attrubute.
  Then it tries to launch a jquery plugin for each name found in the attribute value.
  The values can be space separated words (similar to the class attribute).

  Each plugin name is checked in the jquery function namespace ($.fn[]).

  The parameters for each plugin are fetched with the getPluginDataAttribs function below.
  See the function comments for more info.

  N.B: for camel-case plugin names the naming of the attributes should include the lowercase
  name of the plugin.
  For example, if we have plugin named camelCasePlugin, the data attributes containing
  the plugin options should look like data-camelcaseplugin-option.

  Shake well before use.
  */


;(function ( $, window, document, undefined ) {
  "use strict";

  /*
    getPluginDataAttribs

    Parses the attributes of the element, searching for "data-pluginname-*" pattern
    and generates an object with the options and their values.

    E.G.: running getPluginDataAttribs on this element:
    <div data-pluginname-option="something" data-pluginname-option-two="something else">
    will produce the following object:
    {option: "something", optionTwo: "something else"}

    The "data-pluginname" part is stripped and the remaining part is converted to camel case.
    I.E: option-two becomes optionTwo.

    Boolean attributes should be provided as true|false strings and are converted automatically.

    @ param {DOM Element} el
    @ param {string} pluginName
    @ return {object}

  */

  function getPluginDataAttribs (el, pluginName) {
    var attrs = el.attributes,
        al, i, name, ccName,
        ret = {},
        rx = /-([\da-z])/gi;

    function camelCase(text) {
      return text.replace(rx, function(a, l) {return l.toUpperCase();});
    }

    function parseValue(val) {

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      if (val.toLowerCase() === "false") {
        return false;
      }
      if (val.toLowerCase() === "true") {
        return true;
      }
      if (isNumber(val)) {
        return parseInt(val, 10);
      }
      return val;
    }

    for (i = 0, al = attrs.length; i < al; i++) {
      name = attrs[i].name;
      if (name.indexOf("data-" + pluginName) > -1) {
        ccName = camelCase(attrs[i].name.replace("data-"+ pluginName +"-", ""));
        ret[ccName] = parseValue(attrs[i].value);
      }
    }

    return ret;
  }

  $(window).on("load", function () {
    $("[data-tlrk-plugin]").each(function () {
      var $el = $(this),
          plugins = this.getAttribute("data-tlrk-plugin").split(" "),
          l = plugins.length,
          plugin, i;

      for (i = 0; i < l; i++) {
        plugin = plugins[i];
        if ($.isFunction($.fn[plugin])) {
          $el[plugin](getPluginDataAttribs(this, plugin.toLowerCase()));
        }
      }
    });
  });

})( jQuery, window, document );

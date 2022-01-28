---
title: Implement Custom MVVM Bindings in Custom Widgets
description: An example on how to implement custom MVVM bindings in custom Kendo UI widgets for jQuery.
type: how-to
page_title: Implement Custom MVVM Bindings in Custom Widgets | Kendo UI MVVM for jQuery
slug: mvvm-custom-binding-on-custom-widget
tags: kendo, kendoui, mvvm, custom-binding, custom-widget
ticketid: 1144432
res_type: kb
component: mvvm
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MVVM</td>
 </tr>
</table>

## Description

I have a custom Kendo UI widget for jQuery which currently uses the value binding to set data inside it over MVVM.

How can I provide a second value to another custom property over MVVM?

## Solution

Define a custom widget and [custom binding](https://docs.telerik.com/kendo-ui/framework/mvvm/bindings/custom#custom-widget-binding).

````dojo
<div data-role="somewidget" data-bind="value: value, bgcolour: bgColour" ></div>
<input type="button" value="Click to change color" data-bind="events: { click: changeColor }"/>

<script>
  kendo.data.binders.widget.bgcolour = kendo.data.Binder.extend({
    init: function(widget, bindings, options) {
      //call the base constructor
      kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
    },
    refresh: function() {
      var that = this,
          value = that.bindings["bgcolour"].get(); //get the value from the View-Model

      $(that.element).css('background-color', value); //update the widget
    }
  });

  var kendo = window.kendo,
      ui = kendo.ui,
      Widget = ui.Widget;

  var SomeWidget = Widget.extend({
    init: function (element, options) {
      var that = this;

      kendo.ui.Widget.fn.init.call(that, element, options);
      that.refresh();
    },        
    value: function (value) {
      if (value !== undefined) {
        this._value = value;
        this.element.text(this._value);
      } else {
        return this.element.text();
      }
    },
    _value: '',
    bgcolour: function (value) {
      if(value !== undefined) {
        this._bgcolour = value;
        this.element.css('background-color', this._bgcolour);
      } else {
        return this.element.css('background-color');
      }
    },
    _bgcolour: '',
    options: {
      name: 'SomeWidget'
    },
    refresh: function () {
      this.element.text(this._value);
      this.element.css('background-color', this._bgcolour);
    }
  });

  ui.plugin(SomeWidget);

  //View-Model source
  var viewModel = kendo.observable({
    value: "Test it",
    bgColour: '#ff00ff',
    changeColor: function() {
      this.set('bgColour', '#0000ff');
    }
  });

  kendo.bind(document.body, viewModel);    
</script>
````

## See Also

* [Kendo UI MVVM Pattern](https://docs.telerik.com/kendo-ui/framework/mvvm/overview)

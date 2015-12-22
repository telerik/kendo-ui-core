---
title: Text binding
page_title: Text binding
description: Example that shows how to implement custom Kendo MVVM binding that sets the button's text
---

# How to configure text binding

The example below demonstrates how to configure text binding for Kendo UI Mobile Button.

#### Example:

```html
<div data-role="view" id="view" data-model="viewModel">
  <a data-role="button" data-bind="buttonText: value">Button</a>
</div>
<script>
   kendo.data.binders.widget.buttonText = kendo.data.Binder.extend({
    init: function(widget, bindings, options) {
      //call the base constructor
      kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
    },
    refresh: function() {
      var that = this,
          value = that.bindings["buttonText"].get(); //get the value from the View-Model
      $(that.element).text(value);
    }
  });
  var app = new kendo.mobile.Application(document.body);
</script>

<script>
  var viewModel = kendo.observable({
    value: "CustomValue"
  });
</script>
```

---
title: Configure Text Binding
page_title: Configure Text Binding | Hybrid UI Button
description: "Learn how to implement a custom Kendo UI MVVM binding that sets the Hybrid UI Button's text in Kendo UI."
slug: howto_configuretextbinding_hybridactionsheet
---

# Configure Text Binding

The example below demonstrates how to configure text binding for the Hybrid UI Button in Kendo UI.

###### Example

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

## See Also

Other articles on the Hybrid UI Button:

* [Hybrid UI Button JavaScript API Reference](/api/javascript/mobile/ui/button)
* [Overview of the Hybrid UI Button]({% slug overview_hybridbutton %})

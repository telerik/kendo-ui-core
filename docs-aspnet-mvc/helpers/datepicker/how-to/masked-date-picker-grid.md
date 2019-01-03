---
title: Create Masked DatePickers
page_title: Create Masked DatePickers | Kendo UI DatePicker HtmlHelper for ASP.NET MVC
description: "Create a masking functionality for the Kendo UI DatePicker widget in ASP.NET MVC applications."
slug: howto_create_masked_datepickers_datepickaspnetmvc
---

# Create Masked DatePickers

The following example demonstrates how to add a mask to the Kendo UI DatePicker through a custom Kendo UI widget.

> **Important**
>
> The DatePicker does not officially support the suggested approach and its implementation might lead to undesired side-effects. As of the Kendo UI R2 2017 release, the DatePicker supports the [`dateInput`](/api/javascript/ui/datepicker/configuration/dateinput) property which provides a built-in mask.

###### Example

```html
    <script>
      //maskedDatePicker.js
      (function ($) {
        var kendo = window.kendo,
            ui = kendo.ui,
            Widget = ui.Widget,
            proxy = $.proxy,
            CHANGE = "change",
            PROGRESS = "progress",
            ERROR = "error",
            NS = ".generalInfo";

        var MaskedDatePicker = Widget.extend({
          init: function (element, options) {
            var that = this;
            Widget.fn.init.call(this, element, options);

            $(element).kendoMaskedTextBox({ mask: that.options.dateOptions.mask || "00/00/0000" })
            .kendoDatePicker({
              format: that.options.dateOptions.format || "MM/dd/yyyy",
              parseFormats: that.options.dateOptions.parseFormats || ["MM/dd/yyyy", "MM/dd/yy"]
            })
            .closest(".k-datepicker")
            .add(element)
            .removeClass("k-textbox");

            that.element.data("kendoDatePicker").bind("change", function() {
              that.trigger(CHANGE);
            });
          },
          options: {
            name: "MaskedDatePicker",
            dateOptions: {}
          },
          events: [
            CHANGE
          ],
          destroy: function () {
            var that = this;
            Widget.fn.destroy.call(that);

            kendo.destroy(that.element);
          },
          value: function(value) {
            var datepicker = this.element.data("kendoDatePicker");

            if (value === undefined) {
              return datepicker.value();
            }

            datepicker.value(value);
          }
        });

        ui.plugin(MaskedDatePicker);

      })(window.kendo.jQuery);
    </script>

    <div id="example">
      <input id="maskedDatePicker" />
      <script>
        $(document).ready(function() {
        	$('#maskedDatePicker').kendoMaskedDatePicker();
        });
      </script>
    </div>
```

## See Also

* [Overview of the DatePicker HtmlHelper Overview]({% slug overview_datepickerhelper_aspnetmvc %})
* [DatePickerBuilder API Reference](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DatePickerBuilder)

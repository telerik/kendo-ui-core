---
title: Create Masked DatePickers
page_title: Create Masked DatePickers
description: "Create a masking functionality for the Telerik UI DatePicker in {{ site.framework }} applications."
type: how-to
previous_url: /helpers/editors/datepicker/how-to/masked-date-picker-grid, /html-helpers/editors/datepicker/how-to/masked-date-picker-grid
slug: howto_create_masked_datepickers_datepickaspnetmvc
tags: datepicker, mask, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>DatePicker for {{ site.product }}</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I add a mask to the Telerik UI DatePicker?

> The DatePicker does not officially support the suggested approach and its implementation might lead to undesired side-effects. Starting with version R2 2017, the DatePicker supports the [`DateInput`](/api/kendo.mvc.ui.fluent/datepickerbuilder#dateinput) property, which provides a built-in mask.

## Solution
Include the following script before the DatePicker declaration.
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

## More {{ site.framework }} DatePicker Resources

* [{{ site.framework }} DatePicker Documentation]({%slug htmlhelpers_datepicker_aspnetcore%})

* [{{ site.framework }} DatePicker Demos](https://demos.telerik.com/{{ site.platform }}/datepicker/index)

{% if site.core %}
* [{{ site.framework }} DatePicker Product Page](https://www.telerik.com/aspnet-core-ui/date-and-time-pickers)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DatePicker Product Page](https://www.telerik.com/aspnet-mvc/datepicker)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Server-Side API Reference of the DatePicker for {{ site.framework }}](/api/datepicker)
{% if site.core %}
* [Server-Side TagHelper API Reference of the DatePicker for {{ site.framework }}](/api/taghelpers/datepicker)
{% endif %}

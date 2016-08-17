---
title: Persist Entered Dates
page_title: Persist Entered Dates | Kendo UI DatePicker
description: "Learn how to persist an entered date in the Kendo UI DatePicker upon user navigation between pages for Internet Explorer 9 or older."
slug: howto_persist_entered_dates_datepicker
---

# Persist Entered Dates

The example below demonstrates how to persist the date that is already entered in the Kendo UI DatePicker when users navigate to another page and then come back. This functionality is supported by default in modern browsers, but not in Internet Explorer 9 and older.

###### Example

```html
    <a href="http://www.telerik.com" alt="navigate">navigate</a>
    <div id="example">
      <div id="cap-view" class="demo-section k-header">
        <input id="color" name="color" />
        <input id="color_hidden" name="color" type="hidden" />

        <input id="datepicker" name="datepicker" />
        <input id="datepicker_hidden" name="datepicker" type="hidden" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        var datepicker_hidden = $("#datepicker_hidden");

        $("#datepicker").kendoDatePicker({
          value: datepicker_hidden.val(),
          change: function() {
            datepicker_hidden.val(this.element.val());
          }
        });

        var data = [
          { text: "Black", value: "1" },
          { text: "Orange", value: "2" },
          { text: "Grey", value: "3" }
        ];

        var color_hidden = $("#color_hidden");

        $("#color").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data,
          value: color_hidden.val(),
          change: function() {
            color_hidden.val(this.value());
          },
          index: 0
        });
      });
    </script>    
```

## See Also

Other articles on the Kendo UI DatePicker:

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_select_ranges_between_datepicker %}).

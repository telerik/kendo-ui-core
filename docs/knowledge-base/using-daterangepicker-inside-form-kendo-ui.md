---
title: Using DateRangePicker Inside Form
description: Learn how to use the DateRangePicker as editor inside a form in Kendo UI.
type: how-to
page_title: Using DateRangePicker Inside Form | Kendo UI
slug: using-daterangepicker-inside-form-kendo-ui
tags: form, daterangepicker, date range, custom editor
res_type: kb
---
# Environment
| Product | Version |
|---------|---------|
| Form for Progress® Kendo UI® | 2023.3.1114 |

# Description
I want to use the DateRangePicker inside a form in Kendo UI. However, based on the documentation, it seems that the DateRangePicker is not supported in the jQuery Kendo UI Form. I need a date range for the start and end time as one field in the form. Is it possible to achieve this functionality?

# Solution
To add editors that are not part of the supported list in the Kendo UI Form, you can use the [`items.editor`] (/api/javascript/ui/form/configuration/items#itemseditor) option and add a custom editor. The [Custom Editor](https://docs.telerik.com/kendo-ui/controls/form/items#custom-editor) article demonstrates how to do this. However, using a DateRangePicker is a bit more specific because it requires two values for its range, while the Form is bound to a single field. To achieve the desired behavior, follow these steps:

1. Bind the [`items.editor`](/api/javascript/ui/form/configuration/items#itemseditor)  to a single field that is an object containing the `start` and `end` for the DateRangePicker:

```javascript
formData: {
    Description: "",
    testDate: {
        start: new Date(2024, 2, 28),
        end: new Date(2024, 6, 4)
    }
}
```

2. In the `items.editor`, use the form model to set the start and end of the DateRangePicker:

```javascript
editor: function(container, options) {                
    $("<div name='" + options.field  + "'></div>").kendoDateRangePicker({
        range: {
            start: options.model.testDate.start,
            end: options.model.testDate.end
        },
        // other options
    }).appendTo(container);
}
```

3. Handle the [`change`](/api/javascript/ui/daterangepicker/events/change) event of the DateRangePicker and programmatically update the Form model when the values in the DateRangePicker are changed:

```javascript
editor: function(container, options) {                
    $("<div name='" + options.field  + "'></div>").kendoDateRangePicker({
        // other options
        change: function(e){
            $("#form").data('kendoForm')._model.testDate.start = e.sender.range().start;
            $("#form").data('kendoForm')._model.testDate.end = e.sender.range().end;
        }
    }).appendTo(container);
}
```

Below is a runnable example:

```dojo
  <form id="form"></form>

    <script>
      $(document).ready(function () {
        $("#form").kendoForm({
          formData: {
            Description: "",
            testDate: {
              start: new Date(2024, 2, 28),
              end: new Date(2024, 6, 4),
            }

          },
          items: [
            {
              field: "Description",
              label: "Description:"             
            },
            {
              field: "testDate",
              label: "Date Range Picker:",
              editor: function(container, options) {                
                $("<div name='" + options.field  + "'></div>").kendoDateRangePicker({
                  range: {
                    start: options.model.testDate.start,
                    end: options.model.testDate.end
                  },
                  change: function(e){
                    $("#form").data('kendoForm')._model.testDate.start = e.sender.range().start;
                    $("#form").data('kendoForm')._model.testDate.end = e.sender.range().end;
                  }
                }).appendTo(container);
              }
            }],
          submit: function(ev) {   
            ev.preventDefault();
            console.log(ev.model);
          }
        });

      });
    </script>
```



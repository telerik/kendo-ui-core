---
title: Selected Dates and Formats
page_title: jQuery DateInput Documentation | Selected Dates and Formats
description: "Get started with the jQuery DateInput by Kendo UI and set its selected date and format."
slug: selecteddates_kendoui_dateinput
position: 2
---

# Selected Dates and Formats

The DateInput enables you to create a non-editable DateInput with a selected date.

The date will be displayed in a predefined format.

```dojo
    <input id="dateInput" />

    <script>
      $(document).ready(function(){
        $("#dateInput").kendoDateInput({
          value: new Date(),
          format: "dd/MM/yyyy",
          readonly: true
        });
      });
    </script>
```

## See Also

* [Basic Usage of the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/index)
* [Using the API of the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/api)
* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)

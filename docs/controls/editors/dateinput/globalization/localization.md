---
title: Localization
page_title: jQuery DateInput Documentation | DateInput Localization
description: "Get started with the jQuery DateInput by Kendo UI and translate its text messages for different culture locales."
slug: localization_kendoui_dateinput
position: 2
---

# Localization

The DateInput provides options for modifying the text that is displayed in the placeholders based on your requirements.

```dojo
    <input id="dateinput" />

    <script>
      $("#dateinput").kendoDateInput({
        format: "dd / MMMM / yyyy",
        messages:{
          month:"____",
          year:"____",
          day:"__",
        }
      });
    </script>
```

## See Also

* [Localization Support by the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/localization-globalization)
* [RTL Support by the DateInput (Demo)](https://demos.telerik.com/kendo-ui/dateinput/right-to-left-support)
* [Globalization in Kendo UI for jQuery]({% slug overview_kendoui_globalization %})
* [JavaScript API Reference of the DateInput](/api/javascript/ui/dateinput)

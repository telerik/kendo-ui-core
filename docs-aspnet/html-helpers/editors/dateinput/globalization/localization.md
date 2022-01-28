---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI DateInput for {{ site.framework }} and format the date for different culture locales."
slug: localization_dateinput_aspnetcore
position: 2
---

# Localization

The DateInput displays the date in a format depending on the selected culture (the default culture is `en-US`). 

The following example demonstrates how to format the date in the German culture:

```
    <script datasrc="@Url.Content("~/lib/kendo/js/cultures/kendo.culture.de-DE.min.js")"></script>

    <script type="text/javascript">
      kendo.culture("de-DE");
    </script>

    @{
        CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-DE");
    }

    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Value(DateTime.Today)
    )
```

To control the date format, use the `Format()` method. The specified format also will be used to parse the input.

```
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Value(DateTime.Today)
        .Format("dd-MM-yyyy")
    )
```

## See Also
* [Localization in {{ site.product }}]({% slug overview_localization_core %})
* [Server-Side API](/api/dateinput)

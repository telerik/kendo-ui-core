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

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <script datasrc="@Url.Content("~/lib/kendo/js/cultures/kendo.culture.de-DE.min.js")"></script>

    <script type="text/javascript">
      kendo.culture("de-DE");
    </script>

    @{
        CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("de-DE");
    }

    <kendo-dateinput name="dateinput" value="DateTime.Today">
    </kendo-dateinput>
```
{% endif %}

To control the date format, use the `Format()` method. The specified format also will be used to parse the input.

```HtmlHelper
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Value(DateTime.Today)
        .Format("dd-MM-yyyy")
    )
```
{% if site.core %}
```TagHelper
    <kendo-dateinput name="dateinput" value="DateTime.Today" format="dd-MM-yyyy">
    </kendo-dateinput>
```
{% endif %}

## See Also
* [Localization in {{ site.product }}]({% slug overview_localization_core %})
* [Server-Side API](/api/dateinput)

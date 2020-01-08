---
title: Overview
page_title: Globalization Overview
description: "Learn how to define the current culture in the process of globalization when working with {{ site.product }}."
previous_url: /getting-started/globalization
slug: overview_globalization_core
position: 1
---

# Globalization Overview

Globalization is the process of designing and developing an application that works in multiple cultures and languages.

It combines localization (the translation of component messages) with internationalization (their adaptation to a specific culture). Cultures require and define particular information for their number formats, week and month names, date and time formats, and so on.

## Applying Cultures

To use a culture that is different from the default `en-US` one in {{ site.product }}:

1. Copy the required culture JavaScript file from the `\js\culture\` folder of your {{ site.product }} installation to the {% if site.core %}`wwwroot/lib/kendo-ui/js/cultures/`{% else %}`~/Scripts/cultures/`{% endif %} folder of your application. This example uses the Spanish `es-ES` culture.
1. Include the corresponding culture JavaScript file after the other JavaScript product files.

{% if site.core %}
    ```Razor
        <script src="~/lib/jquery/dist/jquery.js"></script>
        <script src="~/lib/kendo-ui/js/kendo.all.min.js"></script>
        <script src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"></script>
        <script src="~/lib/kendo-ui/js/cultures/kendo.culture.es-ES.min.js"></script>
    ```
{% else %}
    ```Razor
        <script src="@Url.Content("~/Scripts/jquery.min.js")"></script>
        <script src="@Url.Content("~/Scripts/kendo.all.min.js")"></script>
        <script src="@Url.Content("~/Scripts/kendo.aspnetmvc.min.js")"></script>
        <script src="@Url.Content("~/Scripts/cultures/kendo.culture.es-ES.min.js")"></script>
    ```
{% endif %}

1. Set the current culture by calling the [`kendo.culture`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/culture) method. You have to add the script block after the culture JavaScript file. As a result, all {{ site.product }} helpers will use the `es-ES` culture for parsing and formatting dates and numbers.

        <script>
            kendo.culture("es-ES");
        </script>

## Matching Cultures

The cultures that are set on the client and on the server have to match. This ensures that dates and numbers are displayed and parsed correctly.

### Setting the Server-Side Culture

{% if site.core %}
To set the server-side culture, add the following at the beginning of the `Configure` method in the `Startup.cs` file of the application.

    var supportedCultures = new[] { new CultureInfo("es-ES") };

    app.UseRequestLocalization(new RequestLocalizationOptions
    {
        DefaultRequestCulture = new RequestCulture("es-ES"),
        SupportedCultures = supportedCultures,
        SupportedUICultures = supportedCultures
    });
{% else %}
You can set the server-side culture either globally or per request.

To set the server-side culture globally, update the `web.config` file of your {{ site.framework }} application.

    <system.web>
        <!-- snip --!>
        <globalization uiCulture="es-ES" culture="es-ES"></globalization>
        <!-- snip --!>
    </system.web>

<!-- -->
To set the server-side culture per request, override the [`Controller.Initialize`](https://msdn.microsoft.com/en-us/library/system.web.mvc.controller.initialize(v=vs.118).aspx) method to set the [`CurrentCulture`](https://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.currentculture.aspx) and [`CurrentUICulture`](https://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.currentuiculture.aspx).

    protected override void Initialize(System.Web.Routing.RequestContext requestContext)
    {
        Thread.CurrentThread.CurrentCulture =
            Thread.CurrentThread.CurrentUICulture =
                new CultureInfo(requestContext.HttpContext.Request["my-culture"]);

        base.Initialize(requestContext);
    }

{% endif %}

### Setting Matching Client-Side Cultures

To make the helpers use the same culture as the culture set on the server side:

1. Copy the required culture JavaScript files from the `\js\culture\` folder of your {{ site.product }} installation to the {% if site.core %}`wwwroot/lib/kendo-ui/js/cultures/`{% else %}`~/Scripts/cultures/`{% endif %} folder of your application.
1. Get the current culture.

    ```Razor
        @{
            var culture = System.Globalization.CultureInfo.CurrentCulture.ToString();
        }
    ```

1. Include the corresponding culture JavaScript file.

{% if site.core %}
    ```Razor
        <script src="@Url.Content("~/lib/kendo/js/cultures/kendo.culture." + culture + ".min.js")"></script>
    ```
{% else %}
    ```Razor
        <script src="@Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js")"></script>
    ```
{% endif %}

1. Set the current culture by calling the [`kendo.culture`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/culture) method. You have to add the script block after the culture JavaScript file.

    > Set the client-side culture before initializing any helpers that rely on it.

    ```Razor
        <script>
            kendo.culture("@culture");
        </script>
    ```

{% if site.mvc %}
## Using the Culture Helper

The Kendo UI culture scripts are generated based on the Windows 8 formats. If you use a different version that has different date or number formats, then data binding issues may occur. To avoid these side effects, use the `Html.Kendo().Culture()` helper which generates the culture script based on the current .NET or specified culture.

The following example demonstrates how to generate the current and specified cultures.

```Current
    @Html.Kendo().Culture()
```
```Specified
    @Html.Kendo().Culture("bg-BG")
```

The culture helper also provides the option to disable the rendering inside a script tag so that it can be included in the existing script.

The following example demonstrates how to generate the current and specified cultures in an existing script file.

```Current
    <script>
        @Html.Kendo().Culture(false)
    </script>
```
```Specified
    <script>
        @Html.Kendo().Culture("bg-BG", false)
    </script>
```
{% endif %}

## See Also

* [Overview of Localization by {{ site.product }}]({% slug overview_localization_core %})

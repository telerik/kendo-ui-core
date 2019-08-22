---
title: Overview
page_title: Globalization Overview | Telerik UI for ASP.NET Core
description: "Learn how to define the current culture in the process of globalization when working with Telerik UI for ASP.NET Core."
slug: overview_globalization_core
position: 1
---

# Globalization Overview

Globalization is the process of designing and developing an application that works in multiple cultures and languages.

It combines localization (the translation of component messages) with internationalization (their adaptation to a specific culture). Cultures require and define particular information for their number formats, week and month names, date and time formats, and so on.

## Applying Cultures

To use a culture that is different from the default `en-US` one in Telerik UI for ASP.NET Core:

1. Copy the required culture JavaScript file from the `\js\culture\` folder of your Telerik UI for ASP.NET Core installation to the `wwwroot/lib/kendo-ui/js/cultures/` folder of your application. This example uses the Spanish `es-ES` culture.
1. Include the corresponding culture JavaScript file after the other JavaScript product files.

    ```Razor
        <script src="~/lib/jquery/dist/jquery.js"></script>
        <script src="~/lib/kendo-ui/js/kendo.all.min.js"></script>
        <script src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"></script>
        <script src="~/lib/kendo-ui/js/cultures/kendo.culture.es-ES.min.js"></script>
    ```

1. Set the current culture by calling the [`kendo.culture`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/culture) method. You have to add the script block after the culture JavaScript file. As a result, all Telerik UI for ASP.NET Core helpers will use the `es-ES` culture for parsing and formatting dates and numbers.

        <script>
            kendo.culture("es-ES");
        </script>

## Matching Cultures

The cultures that are set on the client and on the server have to match. This ensures that dates and numbers are displayed and parsed correctly.

### Setting the Server-Side Culture

To set the server-side culture, add the following at the beginning of the `Configure` method in the `Startup.cs` file of the application.

    var supportedCultures = new[] { new CultureInfo("es-ES") };

    app.UseRequestLocalization(new RequestLocalizationOptions
    {
        DefaultRequestCulture = new RequestCulture("es-ES"),
        SupportedCultures = supportedCultures,
        SupportedUICultures = supportedCultures
    });

### Setting Matching Client-Side Cultures

To make the helpers use the same culture as the culture set on the server side:

1. Copy the required culture JavaScript files from the `\js\culture\` folder of your Telerik UI for ASP.NET Core installation to the `wwwroot/lib/kendo-ui/js/cultures/` folder of your application.
1. Get the current culture.

    ```Razor
        @{
            var culture = System.Globalization.CultureInfo.CurrentCulture.ToString();
        }
    ```

1. Include the corresponding culture JavaScript file.

    ```Razor
        <script src="@Url.Content("~/lib/kendo/js/cultures/kendo.culture." + culture + ".min.js")"></script>
    ```

1. Set the current culture by calling the [`kendo.culture`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/culture) method. You have to add the script block after the culture JavaScript file.

    > Set the client-side culture before initializing any helpers that rely on it.

    ```Razor
        <script>
            kendo.culture("@culture");
        </script>
    ```

## See Also

* [Overview of Localization by Telerik UI for ASP.NET Core]({% slug overview_localization_core %})

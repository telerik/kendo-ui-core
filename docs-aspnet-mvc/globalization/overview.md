---
title: Overview
page_title: Globalization Overview | Telerik UI for ASP.NET MVC
description: "Learn how to define the current culture in the process of globalization when working with Telerik UI for ASP.NET MVC."
previous_url: /globalization, /getting-started/globalization
slug: globalization_aspnetmvc
position: 1
---

# Globalization Overview

Globalization is the process of designing and developing an application that works in multiple cultures and languages.

It combines localization (the translation of component messages) with internationalization (their adaptation to a specific culture). Cultures require and define particular information for their number formats, week and month names, date and time formats, and so on.

## Applying Cultures

To use a culture that is different from the default `en-US` one in Telerik UI for ASP.NET MVC:

1. Copy the required culture JavaScript file from the `\js\culture\` directory of your Telerik UI for ASP.NET MVC installation to the `~/Scripts/cultures/` directory of your application. Use the Spanish `es-ES` culture for the example.
1. Include the corresponding culture JavaScript file after the other JavaScript product files.

      ```ASPX
          <script src="<%= Url.Content("~/Scripts/jquery.min.js") %>"></script>
          <script src="<%= Url.Content("~/Scripts/kendo.all.min.js") %>"></script>
          <script src="<%= Url.Content("~/Scripts/kendo.aspnetmvc.min.js") %>"></script>
          <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture.es-ES.min.js") %>"></script>
      ```
      ```Razor
          <script src="@Url.Content("~/Scripts/jquery.min.js")"></script>
          <script src="@Url.Content("~/Scripts/kendo.all.min.js")"></script>
          <script src="@Url.Content("~/Scripts/kendo.aspnetmvc.min.js")"></script>
          <script src="@Url.Content("~/Scripts/cultures/kendo.culture.es-ES.min.js")"></script>
      ```

1. Set the current culture by calling the [`kendo.culture`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/culture) method. You have to add the script block after the culture JavaScript file. As a result, all Telerik UI for ASP.NET MVC helpers will use the `es-ES` culture for parsing and formatting dates and numbers.

        <script>
            kendo.culture("es-ES");
        </script>

## Matching Cultures

The cultures that are set on the client and on the server have to match. This ensures that dates and numbers are displayed and parsed correctly.

### Setting the Server-Side Cultures

You can set the server-side culture either globally or per request.

To set the server-side culture globally, update the `web.config` file of your ASP.NET MVC application.

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

### Setting Matching Client-Side Cultures

To make the helpers use the same culture as the culture set on the server side:

1. Copy the required culture JavaScript files from the `\js\culture\` folder of your Telerik UI for ASP.NET MVC installation to the `~/Scripts/cultures/` folder of your application.
1. Get the current culture.

      ```ASPX
          <%
            var culture =  System.Globalization.CultureInfo.CurrentCulture.ToString();
          %>
      ```
      ```Razor
          @{
              var culture =  System.Globalization.CultureInfo.CurrentCulture.ToString();
          }
      ```

1. Include the corresponding culture JavaScript file.

      ```ASPX
          <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js") %>"></script>
      ```
      ```Razor
          <script src="@Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js")"></script>
      ```

1. Set the current culture by calling the [`kendo.culture`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/culture) method. You have to add the script block after the culture JavaScript file.

    > Set the client-side culture before initializing any helpers that rely on it.

    ```ASPX
        <script>
            kendo.culture("<%= culture %>");
        </script>
    ```
    ```Razor
        <script>
            kendo.culture("@culture");
        </script>
    ```

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

## See Also

* [Overview of Localization by Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})

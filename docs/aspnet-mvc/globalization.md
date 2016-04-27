---
title: Globalization
page_title: Globalization | Telerik UI for ASP.NET MVC
description: "Use different cultures with Telerik UI for ASP.NET MVC."
slug: globalization_aspnetmvc
position: 7
---

# Globalization

Globalization is the process of designing and developing an application that works in multiple cultures and languages. The culture defines specific information for the number formats, week and month names, date and time formats, etc.

## Apply Cultures

Below are listed the steps for you to follow when you want to make Telerik UI for ASP.NET MVC use a culture that is different from the default one, which is `en-US`.

**Step 1** Copy the required culture JavaScript file from the `\js\culture\` directory of your Telerik UI for ASP.NET MVC installation to the `~/Scripts/cultures/` directory of your application. Use the Spanish `es-ES` culture for the example.

**Step 2** Include the corresponding culture JavaScript file after the other JavaScript product files.

###### Example

```tab-ASPX

      <script src="<%= Url.Content("~/Scripts/jquery.min.js") %>"></script>
      <script src="<%= Url.Content("~/Scripts/kendo.all.min.js") %>"></script>
      <script src="<%= Url.Content("~/Scripts/kendo.aspnetmvc.min.js") %>"></script>
      <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture.es-ES.min.js") %>"></script>
```
```tab-Razor

      <script src="@Url.Content("~/Scripts/jquery.min.js")"></script>
      <script src="@Url.Content("~/Scripts/kendo.all.min.js")"></script>
      <script src="@Url.Content("~/Scripts/kendo.aspnetmvc.min.js")"></script>
      <script src="@Url.Content("~/Scripts/cultures/kendo.culture.es-ES.min.js")"></script>
```

**Step 3** Set the current culture by calling the [`kendo.culture`](/api/javascript/kendo#methods-culture) method. Note that you must add the script block after the culture JavaScript file.

###### Example

      <script>
      kendo.culture("es-ES");
      </script>

After performing these steps, all Kendo UI widgets included in the product will use the `es-ES` culture for parsing and formatting dates and numbers.

## Match Cultures

It is important to have matching cultures set on the client and on the server. This ensures that dates and numbers are displayed and parsed correctly.

### Set the Server-Side Culture

You can choose to set the server-side culture globally or per-request.

#### Global Setup

To set the server-side culture, update the `web.config` file of your ASP.NET MVC application.

###### Example

      <system.web>
          <!-- snip --!>
          <globalization uiCulture="es-ES" culture="es-ES"></globalization>
          <!-- snip --!>
      </system.web>

<!-- -->
#### Per-Request Setup

Override the [`Controller.Initialize`](https://msdn.microsoft.com/en-us/library/system.web.mvc.controller.initialize(v=vs.118).aspx) method to set the [`CurrentCulture`](https://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.currentculture.aspx) and [`CurrentUICulture`](https://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.currentuiculture.aspx).

###### Example

      protected override void Initialize(System.Web.Routing.RequestContext requestContext)
      {
          Thread.CurrentThread.CurrentCulture =
              Thread.CurrentThread.CurrentUICulture =
                  new CultureInfo(requestContext.HttpContext.Request["my-culture"]);

          base.Initialize(requestContext);
      }

### Set Matching Client-Side Cultures

Below are listed the steps for you to follow when you want to make the widgets use the same culture as the one set on the server side.

**Step 1** Copy the required culture JavaScript files from the `\js\culture\` directory of your Telerik UI for ASP.NET MVC installation to the `~/Scripts/cultures/` directory of your application.

**Step 2** Get the current culture.

###### Example

```tab-ASPX

    <%
      var culture =  System.Globalization.CultureInfo.CurrentCulture.ToString();
    %>
```
```tab-Razor
    @{
        var culture =  System.Globalization.CultureInfo.CurrentCulture.ToString();
    }
```

**Step 3** Include the corresponding culture JavaScript file.

###### Example

```tab-ASPX

    <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js") %>"></script>
```
```tab-Razor

    <script src="@Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js")"></script>
```

**Step 4** Set the current culture by calling the [`kendo.culture`](/api/javascript/kendo#methods-culture) method. Note that you must add the script block after the culture JavaScript file.

###### Example

```tab-ASPX

    <script>
        kendo.culture("<%= culture %>");
    </script>
```
```tab-Razor

    <script>
        kendo.culture("@culture");
    </script>
```

> The client-side culture must be set before any Kendo UI widgets that rely on it, are initialized.

## See Also

Other articles on Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Localization with Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})
* [Visual Basic Syntax]({% slug visualbasic_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Wrappers vs Kendo UI Widgets]({% slug wrappersvswidgets_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Visual Studio Integration]({% slug overview_visualstudio_aspnetmvc %})
* [Migration from Telerik Extensions]({% slug overview_migrationextensions_aspnetmvc %})
* [Telerik UI for ASP.NET MVC HtmlHelpers]({% slug overview_autocompletehelper_aspnetmvc %})
* [ASP.NET MVC 3]({% slug aspnetmvc3_aspnetmvc %})
* [ASP.NET MVC 4]({% slug aspnetmvc4_aspnetmvc %})
* [ASP.NET MVC 5]({% slug aspnetmvc5_aspnetmvc %})
* [ASP.NET Core MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

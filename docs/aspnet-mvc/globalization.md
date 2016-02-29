---
title: Globalization
page_title: Globalization | Telerik UI for ASP.NET MVC
description: "Use different cultures with Telerik UI for ASP.NET MVC."
slug: globalization_aspnetmvc
position: 6
---

# Globalization

Globalization is the process of designing and developing an application that works in multiple cultures and languages.
The culture defines specific information for the number formats, week and month names, date and time formats etc.

To make Telerik UI for ASP.NET MVC use a different culture than the default (which is "en-US") you should perform the following steps:

1. Copy the required culture JavaScript file from the **\js\culture\** directory of your Telerik UI for ASP.NET MVC installation
to the **~/Scripts/cultures/** directory of your application. Let's use the Spanish (es-ES) culture for the example.
1. Include the corresponding culture JavaScript file *after* the other JavaScript product files.
    - ASPX

            <script src="<%= Url.Content("~/Scripts/jquery.min.js") %>"></script>
            <script src="<%= Url.Content("~/Scripts/kendo.all.min.js") %>"></script>
            <script src="<%= Url.Content("~/Scripts/kendo.aspnetmvc.min.js") %>"></script>
            <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture.es-ES.min.js") %>"></script>
    - Razor

            <script src="@Url.Content("~/Scripts/jquery.min.js")"></script>
            <script src="@Url.Content("~/Scripts/kendo.all.min.js")"></script>
            <script src="@Url.Content("~/Scripts/kendo.aspnetmvc.min.js")"></script>
            <script src="@Url.Content("~/Scripts/cultures/kendo.culture.es-ES.min.js")"></script>
1. Set the current culture by calling the [kendo.culture](/api/javascript/kendo#methods-culture) method. The script block should come *after* the culture JavaScript file.

        <script>
        kendo.culture("es-ES");
        </script>

After performing those steps all UI widgets included in the product will use the "es-ES" culture for parsing and formatting dates and numbers.

### Use the same culture on the server and client-side

It's important to have matching culture set on the client and on the server. This will ensure that dates and numbers are displayed and parsed correctly.

#### Set the server-side culture

You can choose to set the server-side culture globally or per-request.

##### Globally
To set the server-side culture you need to update the **web.config** file of your ASP.NET MVC application:

    <system.web>
        <!-- snip --!>
        <globalization uiCulture="es-ES" culture="es-ES"></globalization>
        <!-- snip --!>
    </system.web>

##### Per-request
Override the [Controller.Initialize](https://msdn.microsoft.com/en-us/library/system.web.mvc.controller.initialize(v=vs.118).aspx) method to set the [CurrentCulture](https://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.currentculture.aspx)
and [CurrentUICulture](https://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.currentuiculture.aspx).

    protected override void Initialize(System.Web.Routing.RequestContext requestContext)
    {
        Thread.CurrentThread.CurrentCulture =
            Thread.CurrentThread.CurrentUICulture =
                new CultureInfo(requestContext.HttpContext.Request["my-culture"]);

        base.Initialize(requestContext);
    }

#### Set the client-side culture to match the one on the server

To make the widgets use the same culture as the server-side follow these steps:

1. Copy the required culture JavaScript files from the **\js\culture\** directory of your Telerik UI for ASP.NET MVC installation
to the **~/Scripts/cultures/** directory of your application.
1. Get the current culture
    - ASPX

            <%
                var culture =  System.Globalization.CultureInfo.CurrentCulture.ToString();
            %>
    - Razor

            @{
                var culture =  System.Globalization.CultureInfo.CurrentCulture.ToString();
            }
1. Include the corresponding culture JavaScript file.
    - ASPX

            <script src="<%= Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js") %>"></script>
    - Razor

            <script src="@Url.Content("~/Scripts/cultures/kendo.culture." + culture + ".min.js")"></script>
1. Set the current culture by calling the [kendo.culture](/api/javascript/kendo#methods-culture) method. The script block should come *after* the culture JavaScript file.
    - ASPX

            <script>
                kendo.culture("<%= culture %>");
            </script>
    - Razor

            <script>
                kendo.culture("@culture");
            </script>

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
* [ASP.NET MVC 6]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_muscistoretutorial_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

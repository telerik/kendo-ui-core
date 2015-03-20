---
title: Globalization
page_title: Globalization guide for Telerik UI for ASP.NET MVC
description: Globalize, internationalize a Telerik UI for ASP.NET MVC application
position: 4
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
1. Set the current culture by calling the [kendo.culture](/api/framework/kendo#methods-culture) method. The script block should come *after* the culture JavaScript file.

        <script>
        kendo.culture("es-ES");
        </script>

After performing those steps all UI widgets included in the product will use the "es-ES" culture for parsing and formatting dates and numbers.

## Set the current server-side culture

The previous tutorial showed how to set the culture client-side. To set the server-side culture you need to update the
**web.config** file of your ASP.NET MVC application:

    <system.web>
        <!-- snip --!>
        <globalization uiCulture="es-ES" culture="es-ES"></globalization>
        <!-- snip --!>
    </system.web>

This will set both the [CurrentCulture](http://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.currentculture.aspx)
and [CurrentUICulture](http://msdn.microsoft.com/en-us/library/system.globalization.cultureinfo.currentuiculture.aspx) to "es-ES".

## Use the same culture on the server and client-side

To make Telerik UI for ASP.NET MVC use the same culture as the server-side follow these steps:

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
1. Set the current culture by calling the [kendo.culture](/api/framework/kendo#methods-culture) method. The script block should come *after* the culture JavaScript file.
    - ASPX

            <script>
                kendo.culture("<%= culture %>");
            </script>
    - Razor

            <script>
                kendo.culture("@culture");
            </script>

## Localized user interface

If the `CurrentUICulture` is set (from code or **web.config**) Telerik UI for ASP.NET MVC will use localized user interface messages.

Telerik UI for ASP.NET MVC comes with localized messages for the following cultures:

- bg-BG - Bulgarian (Bulgaria)
- da-DK - Danish (Denmark)
- de-DE - German (Germany)
- es-ES - Spanish (Spain)
- en-US - English (US)
- fr-FR - French (French)
- nl-NL - Dutch (Netherlands)
- pl-PL - Polish (Poland)
- pt-BR - Portuguese (Brazil)
- pt-PT - Portuguese (Portugal)
- ro-RO - Romanian (Romania)
- ru-RU - Russian (Russia)
- sv-SE - Swedish (Sweden)
- uk-UA - Ukrainian (Ukraine)
- zh-CN - Chinese (PRC)

If the `CurrentUICulture` is not supported the default "en-US" will be used.

> The culture used for the localization messages is determined by the `CurrentUICulture` property and **not** by `CurrentCulture`.

## Changing the localization messages

Telerik UI for ASP.NET MVC uses [satellite assemblies](http://blogs.msdn.com/b/global_developer/archive/2011/07/22/introduction-to-satellite-assemblies.aspx) to support localization (user interface messages localized for a set of cultures).

To change the provided localization messages a custom version of Kendo.Mvc.dll must be built. This is required because Kendo.Mvc.dll is a strongly named assembly and its private key is not shipped as part of the Telerik UI for ASP.NET MVC distribution.

1. Open the **\src\Kendo.Mvc\Kendo.Mvc.csproj** Visual Studio project. The **\src** directory is available only with the commercial version of Telerik UI for ASP.NET MVC.
1. Locate the **Resources** directory in the solution explorer. It contains the resource files for the supported cultures.
![Resources](/aspnet-mvc/images/resources.png)
1. Open the resource file which corresponds to the target culture e.g. "Messages.es-ES.resx".
1. Edit the resource file and save it.
1. Change the solution configuration to "Release".
1. Build the project.
1. Copy **\src\Kendo.Mvc\bin\Release\Kendo.Mvc.dll** and **\src\Kendo.Mvc\bin\Release\es-ES\Kendo.Mvc.resources.dll** to your ASP.NET MVC application.
1. Update the Kendo.Mvc.dll assembly reference to the newly copied one.

Apart from building a custom version of Kendo.Mvc.dll you can specify a new value for the corresponding message in the MVC HtmlHelper configuration.

For example to change the default message for the "create" grid toolbar command you can do the following:
- ASPX

        <%:Html.Kendo().Grid<Product>()
               .Toolbar(toolbar =>
               {
                   toolbar.Create().Text("Add new product");
               })
        %>
- Razor

        @(Html.Kendo().Grid<Product>()
              .Toolbar(toolbar =>
              {
                toolbar.Create().Text("Add new product");
              })
        )

## Adding new localizations

To add a localization for a new language a custom version of Kendo.Mvc.dll must be built. This is required because Kendo.Mvc.dll is a strongly named assembly and its private key is not shipped as part of the Telerik UI for ASP.NET MVC distribution.

1. Open the **\src\Kendo.Mvc\Kendo.Mvc.csproj** Visual Studio project. The **\src** directory is available only with the commercial version of Telerik UI for ASP.NET MVC.
1. Locate the **Resources** directory in the solution explorer. It contains the resource files for the supported cultures.
![Resources](/aspnet-mvc/images/resources.png)
1. Copy **Messages.resx** and paste it. Rename the copy to **Messages.culture-code.resx** e.g. **Messages.es-MX.resx**.
1. Open the newly created resource file.
1. Edit the resource file and save it. The **Messagex.resx** file contains the English messages.
1. Change the solution configuration to "Release".
1. Build the project.
1. Copy **\src\Kendo.Mvc\bin\Release\Kendo.Mvc.dll** and **\src\Kendo.Mvc\bin\Release\es-MX\Kendo.Mvc.resources.dll** to your ASP.NET MVC application.
1. Update the Kendo.Mvc.dll assembly reference to the newly copied one.



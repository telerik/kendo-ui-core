---
title: Localization
page_title: Localization | Telerik UI for ASP.NET MVC
description: "Localize the content of a Telerik UI for ASP.NET MVC application."
slug: localization_aspnetmvc
position: 7
---

# Localization

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

### Changing the localization messages

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

### Adding new localizations

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

## See Also

Other articles on Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
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

---
title: Localization
page_title: Localization | Telerik UI for ASP.NET MVC
description: "Localize the content of a Telerik UI for ASP.NET MVC application."
slug: localization_aspnetmvc
position: 8
---

# Localization

## Defaults


If the `CurrentUICulture` is set&mdash;from code or `web.config`&mdash;Telerik UI for ASP.NET MVC will use localized user interface messages.

Telerik UI for ASP.NET MVC comes with localized messages for the cultures listed in the table below.

| Culture   | Language  | Country
|:---       |:---       |:---
|`bg-BG`    |Bulgarian  |Bulgaria
|`da-DK`    |Danish     |Denmark
|`de-DE`    |German     |Germany
|`es-ES`    |Spanish    |Spain
|`en-US`    |English    |United States of America
|`fr-FR`    |French     |France
|`nl-NL`    |Dutch      |The Netherlands
|`pl-PL`    |Polish     |Poland
|`pt-PT`    |Portuguese |Portugal
|`pt-BR`    |Portuguese |Brazil
|`ro-RO`    |Romanian   |Romania
|`ru-RU`    |Russian    |Russia
|`sv-SE`    |Swedish    |Sweden
|`uk-UA`    |Ukrainian  |Ukraine
|`zh-CN`    |Chinese    |People's Republic of China

If the `CurrentUICulture` is not supported, the default `en-US` will be used.

> **Important**
>
> The culture used for the localization messages is determined by the `CurrentUICulture` property and not by the `CurrentCulture` one.

## Configuration

### Change Localization Messages

Telerik UI for ASP.NET MVC uses [satellite assemblies](http://blogs.msdn.com/b/global_developer/archive/2011/07/22/introduction-to-satellite-assemblies.aspx) to support localization (user interface messages localized for a set of cultures).

To change the provided localization messages, a custom version of `Kendo.Mvc.dll` must be built. This is required because `Kendo.Mvc.dll` is a strongly named assembly and its private key is not shipped as part of the Telerik UI for ASP.NET MVC distribution.

Below are listed the steps for you to follow when willing to change the provided localization messages.

**Step 1** Open the `\src\Kendo.Mvc\Kendo.Mvc.csproj` Visual Studio project. The `\src` directory is available only with the commercial version of Telerik UI for ASP.NET MVC.

**Step 2** Locate the `Resources` directory in the solution explorer. It contains the resource files for the supported cultures.

**Figure 1. The `Resources` directory when changing localization messages**

![Resources](/aspnet-mvc/images/resources.png)

**Step 3** Open the resource file which corresponds to the target culture, e.g. `Messages.es-ES.resx`.

**Step 4** Edit the resource file and save it.

**Step 5** Change the solution configuration to `Release`.

**Step 6** Build the project.

**Step 7** Copy `\src\Kendo.Mvc\bin\Release\Kendo.Mvc.dll` and `\src\Kendo.Mvc\bin\Release\es-ES\Kendo.Mvc.resources.dll` to your ASP.NET MVC application.

**Step 8** Update the `Kendo.Mvc.dll` assembly reference to the newly copied one.

Apart from building a custom version of `Kendo.Mvc.dll`, you can specify a new value for the corresponding message in the MVC HtmlHelper configuration. For example, change the default message for the `create` Grid toolbar command as demonstrated below.

###### Example

```tab-ASPX

    <%:Html.Kendo().Grid<Product>()
           .Toolbar(toolbar =>
           {
               toolbar.Create().Text("Add new product");
           })
    %>
```
```tab-Razor

    @(Html.Kendo().Grid<Product>()
          .Toolbar(toolbar =>
          {
            toolbar.Create().Text("Add new product");
          })
    )
```

### Add New Localizations

To add a localization for a new language, a custom version of `Kendo.Mvc.dll` must be built. This is required because `Kendo.Mvc.dll` is a strongly named assembly and its private key is not shipped as part of the Telerik UI for ASP.NET MVC distribution.

Below are listed the steps for you to follow when you want to add new localizations.

**Step 1** Open the `\src\Kendo.Mvc\Kendo.Mvc.csproj` Visual Studio project. The `\src` directory is available only with the commercial version of Telerik UI for ASP.NET MVC.

**Step 2** Locate the `Resources` directory in the solution explorer. It contains the resource files for the supported cultures.

**Figure 2. The `Resources` directory when adding new cultures**

![Resources](/aspnet-mvc/images/resources.png)

**Step 3** Copy `Messages.resx` and paste it. Rename the copy to `Messages.culture-code.resx`, e.g. `Messages.es-MX.resx`.

**Step 4** Open the newly created resource file.

**Step 5** Edit the resource file and save it. The `Messagex.resx` file contains the English messages.

**Step 6** Change the solution configuration to `Release`.

**Step 7** Build the project.

**Step 8** Copy `\src\Kendo.Mvc\bin\Release\Kendo.Mvc.dll` and `\src\Kendo.Mvc\bin\Release\es-MX\Kendo.Mvc.resources.dll` to your ASP.NET MVC application.

**Step 9** Update the `Kendo.Mvc.dll` assembly reference to the newly copied one.

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
* [ASP.NET Core MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

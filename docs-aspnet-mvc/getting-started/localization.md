---
title: Localization
page_title: Localization | Telerik UI for ASP.NET MVC
description: "Localize the content of a Telerik UI for ASP.NET MVC application."
slug: localization_aspnetmvc
previous_url: /localization
position: 8
---

# Localization

[Localization](https://msdn.microsoft.com/en-us/library/5839we2z(v=vs.110).aspx) is the process of adapting software to meet the requirements of local markets and different languages.

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
> The culture used for the localization messages is determined by the `CurrentUICulture` and not by the `CurrentCulture` property.

## Configuration

### Change Localization Messages

Telerik UI for ASP.NET MVC uses [satellite assemblies](http://blogs.msdn.com/b/global_developer/archive/2011/07/22/introduction-to-satellite-assemblies.aspx) to support localization (user interface messages localized for a set of cultures).

To change the provided localization messages, a custom version of `Kendo.Mvc.dll` must be built. This is required because `Kendo.Mvc.dll` is a strongly named assembly and its private key is not shipped as part of the Telerik UI for ASP.NET MVC distribution.

Below are listed the steps for you to follow when willing to change the provided localization messages.

1. Open the `\src\Kendo.Mvc\Kendo.Mvc.csproj` Visual Studio project. The `\src` directory is available only with the commercial version of Telerik UI for ASP.NET MVC.

1. Locate the `Resources` directory in the solution explorer. It contains the resource files for the supported cultures.

    **Figure 1. The `Resources` directory when changing localization messages**

    ![Resources](/images/resources.png)

1. Open the resource file which corresponds to the target culture, e.g. `Messages.es-ES.resx`.

1. Edit the resource file and save it.

1. Change the solution configuration to `Release`.

1. Build the project.

1. Copy `\src\Kendo.Mvc\bin\Release\Kendo.Mvc.dll` and `\src\Kendo.Mvc\bin\Release\es-ES\Kendo.Mvc.resources.dll` to your ASP.NET MVC application.

1. Update the `Kendo.Mvc.dll` assembly reference to the newly copied one.

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

1. Open the `\src\Kendo.Mvc\Kendo.Mvc.csproj` Visual Studio project. The `\src` directory is available only with the commercial version of Telerik UI for ASP.NET MVC.

1. Locate the `Resources` directory in the solution explorer. It contains the resource files for the supported cultures.

    **Figure 2. The `Resources` directory when adding new cultures**

    ![Resources](/images/resources.png)

1. Copy `Messages.resx` and paste it. Rename the copy to `Messages.culture-code.resx`, e.g. `Messages.es-MX.resx`.

1. Open the newly created resource file.

1. Edit the resource file and save it. The `Messagex.resx` file contains the English messages.

1. Change the solution configuration to `Release`.

1. Build the project.

1. Copy `\src\Kendo.Mvc\bin\Release\Kendo.Mvc.dll` and `\src\Kendo.Mvc\bin\Release\es-MX\Kendo.Mvc.resources.dll` to your ASP.NET MVC application.

1. Update the `Kendo.Mvc.dll` assembly reference to the newly copied one.

## See Also

* [Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

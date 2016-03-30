---
title: NuGet Packages
page_title: NuGet Packages | Telerik UI for ASP.NET MVC
description: "Download and install Telerik UI for ASP.NET MVC from our NuGet feed."
slug: aspnetmvc_nuget
position: 3
---

# NuGet Packages

Telerik maintains a NuGet Feed for registered users.

[NuGet](https://www.nuget.org) is a popular .NET package manager.

Official releases, service packs and internal builds of UI for ASP.NET MVC are available for registered users.

## Use the Telerik Private NuGet Feed

To use the Telerik NuGet Feed as a Package Source, use the [NuGet CLI](http://docs.nuget.org/consume/Command-Line-Reference).

As of now, Visual Studio does not provide a UI for configuring authenticated NuGet feeds.

### Set Up NuGet Package Source

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe).
1. Open a Command Prompt and change the path to where the `nuget.exe` is downloaded.
1. Execute the command from the example below.

###### Example

```
NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" -UserName "<your login email>" -Password "<your password>"
```
This command stores a token in the `%AppData%\NuGet\NuGet.config`  file. Your original credentials cannot be obtained from this token.

### Install NuGet Packages

With the setup done, you can install packages either through the [Package Manager Console](http://docs.nuget.org/Consume/Package-Manager-Console) or through the [Package Manager Dialog](https://docs.nuget.org/consume/package-manager-dialog).

## List of Provided Packages

The NuGet Feed provides the following packages related to UI for ASP.NET MVC:

- `Telerik.UI.for.AspNet.Mvc5`&mdash;Telerik UI for ASP.NET MVC 5 Commercial.
- `Telerik.UI.for.AspNet.Mvc5.Trial`&mdash;Telerik UI for ASP.NET MVC 5 Trial.
- `Telerik.UI.for.AspNet.Mvc4`&mdash;Telerik UI for ASP.NET MVC 4 Commercial.
- `Telerik.UI.for.AspNet.Mvc4.Trial`&mdash;Telerik UI for ASP.NET MVC 4 Trial.
- `Telerik.UI.for.AspNet.Mvc3`&mdash;Telerik UI for ASP.NET MVC 3 Commercial.
- `Telerik.UI.for.AspNet.Mvc3.Trial`&mdash;Telerik UI for ASP.NET MVC 3 Trial.

The [Kendo UI Packages]({% slug kendoui_nuget_packages %}) are listed in a separate section.

> **Important**
>
> The `Kendo.Mvc`&mdash;Telerik UI for ASP.NET Core MVC&mdash;is a pre-release package that is also available.

## See Also

Other articles on getting started with UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 3 Applications](/aspnet-mvc/asp-net-mvc-3)
* [Use Telerik UI for ASP.NET MVC in MVC 4 Applications](/aspnet-mvc/asp-net-mvc-4)
* [Use Telerik UI for ASP.NET MVC in MVC 5 Applications](/aspnet-mvc/asp-net-mvc-5)
* [Use Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction)
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

Articles on Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
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

---
title: NuGet Feed
page_title: NuGet Feed | Telerik UI for ASP.NET MVC
description: "Download and install Telerik UI for ASP.NET MVC from our NuGet feed."
slug: aspnetmvc_nuget
position: 3
---

# NuGet Packages

[NuGet](https://www.nuget.org) is a popular package manager .NET.

We maintain a number of NuGet packages for UI for ASP.NET MVC.

Official releases, service packs and internal builds are available for registered users.

## Installation Instructions

In order to use the Telerik NuGet Feed as a Package Source we need to use the
[NuGet CLI](http://docs.nuget.org/consume/Command-Line-Reference).

As of now, Visual Studio does not provide an UI for configuring authenticated
NuGet feeds.

### Set-up NuGet Package Source

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe)
1. Open a Command Prompt and change the path to where nuget.exe is downloaded
1. Execute the following command

```
NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" -UserName "<your login email>" -Password "<your password>"
```
This will store a token in the `%AppData%\NuGet\NuGet.config`  file. Your original credentials can't be obtained from this token.

### Install NuGet Packages

With the set-up done you can install packages either through the
[Package Manager Console](http://docs.nuget.org/Consume/Package-Manager-Console)
or through the [Package Manager Dialog](https://docs.nuget.org/consume/package-manager-dialog).

## List of Provided Packages

The NuGet Feed provides the following packages related to UI for ASP.NET MVC:

- `Telerik.UI.for.AspNet.Mvc5` - Telerik UI for ASP.NET MVC 5 Commercial.
- `Telerik.UI.for.AspNet.Mvc5.Trial` - Telerik UI for ASP.NET MVC 5 Trial.
- `Telerik.UI.for.AspNet.Mvc4` - Telerik UI for ASP.NET MVC 4 Commercial.
- `Telerik.UI.for.AspNet.Mvc4.Trial` - Telerik UI for ASP.NET MVC 4 Trial.
- `Telerik.UI.for.AspNet.Mvc3` - Telerik UI for ASP.NET MVC 3 Commercial.
- `Telerik.UI.for.AspNet.Mvc3.Trial` - Telerik UI for ASP.NET MVC 3 Trial.

The following **pre-release** packages are also available:
- `Kendo.Mvc` - Telerik UI for ASP.NET MVC6

## See Also

Other articles on getting started with UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 3 Applications](/aspnet-mvc/asp-net-mvc-3)
* [Use Telerik UI for ASP.NET MVC in MVC 4 Applications](/aspnet-mvc/asp-net-mvc-4)
* [Use Telerik UI for ASP.NET MVC in MVC 5 Applications](/aspnet-mvc/asp-net-mvc-5)
* [Use Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction)
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

---
title: NuGet Packages
page_title: NuGet Packages | Telerik UI for ASP.NET MVC
description: "Download and install Telerik UI for ASP.NET MVC from the Telerik NuGet feed."
slug: aspnetmvc_nuget
position: 3
---

# NuGet Packages

Telerik maintains a NuGet Feed for registered users.

[NuGet](https://www.nuget.org) is a popular .NET package manager.

Official releases, service packs, and internal builds of UI for ASP.NET MVC are available for registered users.

## Telerik Private NuGet Feed

To use the Telerik NuGet Feed, set up https://nuget.telerik.com/nuget as another package source using the NuGet Package Manager or the [NuGet CLI](http://docs.nuget.org/consume/Command-Line-Reference).

### Set Up NuGet Package Source Using the NuGet Package Manager

1. Launch Visual Studio.
1. Launch the NuGet Package Manager Settings&mdash;**Tools**/**NuGet Package Manager**/**Package Manager Settings**.
1. Add the https://nuget.telerik.com/nuget feed to the **Package Sources** tab.

### Set Up NuGet Package Source Using the NuGet CLI

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe).
1. Open a Command Prompt and change the path to where the `nuget.exe` is downloaded. 
1. Execute the command from the example below. 

###### Example

```
NuGet Sources Add -Name "telerik.com" -Source https://nuget.telerik.com/nuget 
```

### Store Credentials

To gain access to the feed, provide your Telerik account credentials. To avoid the popping up of the authentication window every time you access the feed, choose to store the credentials in the NuGet configuration file. 

**Encrypted Credentials**

The command from the example below stores a token in the `%AppData%\NuGet\NuGet.config` file. Your original credentials cannot be obtained from this token.

###### Example

```
NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" ^
      -UserName "your login email" -Password "your password"
```

**Credentials in Clear Text**

The command from the example below stores the password in clear text in the `%AppData%\NuGet\NuGet.config` file. If you are unable to connect to the feed when using encrypted credentials, use this alternative approach. 

###### Example

```
NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" ^
      -UserName "your login email" -Password "your password" -StorePasswordInClearText
```

> **Important**
>
> Connecting to the feed might not work when using encrypted credentials or credentials provided through the authentication window&mdash;for example, when an old version of .net restore is used to restore packages. In such cases, consider storing the credentials in clear text.

### Install NuGet Packages

With this setup done, you can install packages either through the [Package Manager Console](http://docs.nuget.org/Consume/Package-Manager-Console) or through the [Package Manager Dialog](https://docs.nuget.org/consume/package-manager-dialog).

## List of Provided Packages

The NuGet Feed provides the following packages that are related to UI for ASP.NET MVC:

- `Telerik.UI.for.AspNet.Mvc5`&mdash;Telerik UI for ASP.NET MVC 5 Commercial.
- `Telerik.UI.for.AspNet.Mvc5.Trial`&mdash;Telerik UI for ASP.NET MVC 5 Trial.
- `Telerik.UI.for.AspNet.Mvc4`&mdash;Telerik UI for ASP.NET MVC 4 Commercial.
- `Telerik.UI.for.AspNet.Mvc4.Trial`&mdash;Telerik UI for ASP.NET MVC 4 Trial.
- `Telerik.UI.for.AspNet.Mvc3`&mdash;Telerik UI for ASP.NET MVC 3 Commercial.
- `Telerik.UI.for.AspNet.Mvc3.Trial`&mdash;Telerik UI for ASP.NET MVC 3 Trial.
- `Telerik.UI.for.AspNet.Core`&mdash;Telerik UI for ASP.NET Core Commercial.
- `Telerik.UI.for.AspNet.Core.Trial`&mdash;Telerik UI for ASP.NET Core Trial.

The [Kendo UI Packages]({% slug kendoui_nuget_packages %}) are listed in a separate section.

## See Also

Other articles on getting started with UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 3 Applications]({% slug aspnetmvc3_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 4 Applications]({% slug aspnetmvc4_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug aspnetmvc5_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in Core MVC Applications]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

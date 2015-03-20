---
title: Introduction
page_title: Introduction to Telerik UI for ASP.NET MVC 6
description: How to download, install Telerik UI for ASP.NET MVC 6 and run the sample application.
position: -1
---

# Telerik UI for ASP.NET MVC - Beta
This tutorial shows how to use Telerik UI for ASP.NET MVC in ASP.NET MVC 6 applications.

> The ASP.NET 5 Framework is still actively developed. Tooling and APIs change frequently, often requiring extensive changes.
See [Known Issues](known-issues) for up-to-date information.

# Requirements and Supported Environments

We target the stable release of the ASP.NET 5 framework. At the time of this writing this is Beta 3.

The target runtime is [CoreCLR](https://github.com/dotnet/coreclr). The full desktop CLR is also supported.

# ASP.NET on GitHub

The following repositories contain source code, instructions and issue trackers for the ASP.NET project.
These are immensely useful when you need to track down particular issues or behaviors.

- [ASP.NET Home](https://github.com/aspnet/home#install-the-net-execution-environment-dnx) on GitHub
- [ASP.NET MVC](https://github.com/aspnet/home#install-the-net-execution-environment-dnx) on GitHub

# Running the sample application

- Install the CTP 6 release of [Visual Studio 2015](https://www.visualstudio.com/en-us/downloads/visual-studio-2015-ctp-vs.aspx)
- Install the stable version of the [.NET Version Manager](https://github.com/aspnet/home#install-the-net-version-manager-dnvm (KVM))
- Issue the following commands to install the stable version of the [.NET Execution Environment](https://github.com/aspnet/home#install-the-net-execution-environment-dnx (KRE))
```
C:\> kvm upgrade -r CoreCLR
C:\> kvm upgrade -r CLR
```
- Move the project from `C:\Program Files (x86)\Telerik\UI for ASP.NET MVC Q1 2015\wrappers\aspnetmvc\Examples\VS2015` to a shorter path, e.g. `C:\Kendo`.

The default installation location is too long and will go over the 256-character path length limit. Alternatively, change the installation path during setup.

- Open the `Kendo.Mvc.Examples.kproj` project in Visual Studio.
- Wait for the packages to restore and run the application.


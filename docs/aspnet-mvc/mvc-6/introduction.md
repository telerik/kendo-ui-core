---
title: Overview
page_title: Overview | Telerik UI for ASP.NET Core MVC
description: "Download and install Telerik UI for ASP.NET Core MVC (aka MVC 6), and run the sample application."
previous_url: /aspnet-mvc/aspnetmvc-apps/mvc-6/introduction
slug: overview_aspnetmvc6_aspnetmvc
position: 1
---

# Overview of Telerik UI for ASP.NET Core MVC - RC1

This article demonstrates how to use Telerik UI for ASP.NET MVC in ASP.NET Core MVC applications.

> **Important**
>
> The ASP.NET 5 framework is still actively being developed. Tooling and APIs change frequently, often requiring extensive changes. To get updated information on this, refer to the article on [known issues]({% slug knownissues_aspnetmvc6_aspnetmvc %}).

## The Basics

### Supported Environments

Telerik UI for ASP.NET Core MVC targets the stable release of the ASP.NET 5 framework. At the time of this writing this is RC1.

The target runtime is [CoreCLR](https://github.com/dotnet/coreclr). The full desktop CLR is also supported.

### Resources

To get started, refer to the [ASP.NET 5 Documentation](http://docs.asp.net/en/latest/index.html).

The repositories below contain source code, instructions, and issue trackers for the ASP.NET project. These are immensely useful when you need to track down particular issues or behaviors.

- [ASP.NET Home](https://github.com/aspnet/home) on GitHub.
- [ASP.NET MVC](https://github.com/aspnet/Mvc) main repository.
- [ASP.NET MVC Announcements](https://github.com/aspnet/announcements/) for important changes.

## The Sample Application

### On Windows

To be able to run the sample application on Windows, make sure you provide for the requirements listed below.

- Download [Visual Studio 2015](https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx).
- Download [Microsoft ASP.NET and Web Tools 2015 (RC1)](https://www.microsoft.com/en-us/download/details.aspx?id=49959).
- Install [SQLite3](http://mislav.net/rails/install-sqlite3/).
- Download the matching release of the [Sample Application](https://github.com/telerik/ui-for-aspnet-mvc-6-demos/releases).
- Open the `Kendo.Mvc.Examples.sln` solution in Visual Studio.
- Run the application.

### On Linux

To be able to run the sample application on Linux, make sure you provide for the requirements listed below.

- For information on installing ASP.NET 5 on Linux, refer to [this article](http://docs.asp.net/en/latest/getting-started/installing-on-linux.html).
- Install [SQLite3](http://mislav.net/rails/install-sqlite3/).
- Download the matching release of the [Sample Application](https://github.com/telerik/ui-for-aspnet-mvc-6-demos/releases).
- Navigate to the `Kendo.Mvc.Examples` folder using the Terminal.
- Restore the packages using the `dnu restore` command.
- Run the application using the `dnx web` command.
- In your browser, navigate to `localhost:5000`.

### On Docker Engine

To be able to run the sample application on Docker Engine (multi-platform), make sure you provide for the requirements listed below.

- See [Install Docker Engine](https://docs.docker.com/engine/installation/) on one of the supported platforms.
- Pull the latest [Kendo offline demos image](https://hub.docker.com/r/telerik/kendo_offline_demos/).
- Run the image inside the desired container using `sudo docker run -d -p 5000:5000 --name web telerik/kendo_offline_demos:latest`.
- In your browser navigate to `localhost:5000`.

## See Also

Other articles on Telerik UI for ASP.NET MVC in ASP.NET Core MVC applications:

* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core MVC Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core MVC Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core MVC]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core MVC]({% slug taghelpers_aspnetmvc6_aspnetmvc %})

---
title: Overview
page_title: Overview | Kendo UI Sales Hub Tutorial
description: "Learn how to build the Kendo UI Sales Hub sample project by using Telerik UI for ASP.NET MVC."
previous_url: /tutorials/asp.net/saleshub/kendo-saleshub-intro
slug: overview_saleshubtutorial_aspnetmvc
position: 1
---

# Kendo UI Sales Hub Overview

This article is an overview of the Kendo UI Sales Hub sample project. The Kendo UI Music Store includes two sub-projects: the Home and the Order Sales Hub page.

**Figure 1. A screenshot of the Kendo UI Sales Hub Home page**

![kendo-saleshub-intro-home-screenshot](/aspnet-mvc/tutorial-saleshub/images/kendo-saleshub-intro-home-screenshot.png)

## Basic Concepts

The Sales Hub project is an Order Management System that demonstrates the usage of Telerik UI for ASP.NET MVC in an enterprise environment.

The goal of this sample project to is show how to use a subset of Kendo UI widgets using Telerik UI for ASP.NET MVC as well as to show how to easily implement server-side filtering for [DataSource](/api/javascript/data/datasource) requests, using the server-side components that Telerik UI for ASP.NET MVC provides.

This sample is not feature-complete and is only meant to be used as a reference for how to use Telerik UI for ASP.NET MVC.

## The Project

### View the Live Site

To view the demo of the Kendo UI Sales Hub sample project, refer to [demos.telerik.com/kendo-ui/saleshub](http://demos.telerik.com/kendo-ui/saleshub).

### Get the Source Code

Start by getting the source for the [SalesHub from GitHub](https://github.com/telerik/kendo-saleshub-demo).

> **Important**
>
> This sample project is compatible with Microsoft Visual Studio 2012, and requires MVC 4, NuGet, Telerik UI for ASP.NET MVC, and SQLExpress to run.

### Add the Extensions

> **Important**
>
> Due to licensing restrictions, **the sample project does not include the dll for the Telerik UI for ASP.NET MVC**.

If you have a license for Telerik UI for ASP.NET MVC, use the [Telerik Control Panel](http://www.telerik.com/download-trial-file.aspx?pid=972) to download and install the extensions. If you do not have a license yet, download and install the [free trial](http://www.telerik.com/download/kendo-ui-complete) for the extensions.

Once you download and install the extensions, copy `\wrappers\aspnetmvc\Binaries\Mvc3\Kendo.Mvc.dll` from the installation directory of Telerik UI for ASP.NET MVC to the `SalesHub\libs` directory.

> **Important**
>
> The standard installation directory for the extensions is `C:\Program Files (x86)\Telerik\Telerik UI for ASP.NET MVC <version>`.

### Build and Run the Application

Once you copy `Kendo.Mvc.dll` to the correct location, you should be able to build and run the application.

The first time the application launches, it creates and seeds its database. Seeding the database may take a few minutes to complete.

### View the Solution Structure

**Figure 2. The Solution Explorer structure**

![kendo-saleshub-intro-project-structure-screenshot](/aspnet-mvc/tutorial-saleshub/images/kendo-saleshub-intro-project-structure-screenshot.png)

There are three main projects in the Kendo UI Sales Hub sample application, as listed below.

1. `SalesHub.Client` This is a standard MVC project which uses the default MVC project structure with one exception. The data services, which are MVC controllers that return JSON results, are in their own namespace&mdash;`SalesHub.Client.Api`&mdash;so as to avoid confusion about which controllers return Views and which return JSON.

2. `SalesHub.Data` This project contains the Entity Framework repositories for data models.

3. `SalesHub.Core` This project contains the data models and the repository interfaces used by `SalesHub.Data`.

## See Also

The other chapters of the tutorial on the Kendo UI Music Store sample project are located at:

* [Build the Kendo UI Sales Hub Home Page]({% slug createcustomtreeview_saleshubtutorial_aspnetmvc %})
* [Build the Kendo UI Sales Hub Order Page]({% slug createeditorders_saleshubtutorial_aspnetmvc %})

---
title: Introduction
page_title: Tutorial SalesHub - Introduction
position: 1
previous_url: /tutorials/asp.net/saleshub/kendo-saleshub-intro
---

# Tutorial: SalesHub: Introduction

  - [Aims of the SalesHub sample project](#aims-of-the-saleshub-sample-project)
  - [View the live site](#view-the-live-site)
  - [Get the Source Code](#get-the-source-code)
  - [Add the Kendo UI MVC Extensions to the Project](#add-the-kendo-ui-mvc-extensions-to-the-project)
  - [Build and Run the Application](#build-and-run-the-application)
  - [Solution Structure](#solution-structure)

In this tutorial, we will review portions of the SalesHub sample project.

![kendo-saleshub-intro-home-screenshot](/aspnet-mvc/tutorial-saleshub/images/kendo-saleshub-intro-home-screenshot.png)

## Aims of the SalesHub sample project

The SalesHub is an Order Management System that demonstrates the usage of the Telerik UI for ASP.NET MVC in
an enterprise environment.

The goal of this sample project to is show how to use a subset of Kendo UI widgets using Telerik UI for ASP.NET MVC, as well as
to show how to easily implement server-side filtering for [DataSource](/api/framework/datasource) requests, using the
server-side components that the Telerik UI for ASP.NET MVC provide.

This sample is not feature-complete and is only meant to be used as a reference for how to use the Telerik UI for ASP.NET MVC.

## View the live site

The live SalesHub demo can be viewed at [demos.telerik.com/kendo-ui/saleshub](http://demos.telerik.com/kendo-ui/saleshub).

## Get the Source Code

Start by getting the source for [SalesHub from GitHub](https://github.com/telerik/kendo-saleshub-demo).
> This sample project is for **Microsoft Visual Studio 2012**, and requires MVC4, NuGet, Telerik UI for ASP.NET MVC, and SQLExpress in order to run.

## Add the Kendo UI MVC Extensions to the Project

> Due to licensing restrictions, **the sample project does not include the dll for the Telerik UI for ASP.NET MVC**.

If you have a license for the Telerik UI for ASP.NET MVC, you can use the [Telerik Control Panel](http://www.telerik.com/download-trial-file.aspx?pid=972)
to download and install the extensions. If you haven't purchased a license yet, you can download and install the 30 day [free trial](http://www.telerik.com/download/kendo-ui-complete)
for the extensions.

Once you've downloaded and installed the extensions, all that is required is for `\wrappers\aspnetmvc\Binaries\Mvc3\Kendo.Mvc.dll` to be copied from the installation
directory of the Telerik UI for ASP.NET MVC into the `SalesHub\libs` directory.

> The standard installation directory for the extensions is **`C:\Program Files (x86)\Telerik\Telerik UI for ASP.NET MVC <version>`**.

## Build and Run the Application

Once you've copied `Kendo.Mvc.dll` to the correct location, you should be able to build and run the application.

The first time the application launches, it creates and seeds its database. Seeding the database may take a few minutes to complete.

## Solution Structure

![kendo-saleshub-intro-project-structure-screenshot](/aspnet-mvc/tutorial-saleshub/images/kendo-saleshub-intro-project-structure-screenshot.png)

There are three main projects in this sample application. They are:

1. **SalesHub.Client**:

    This is a standard MVC project and uses the default MVC project structure with one exception. The data services, which
    are MVC controllers that return JSON results, are in their own namespace (`SalesHub.Client.Api`), so as to avoid confusion
    which controllers return Views and which ones return JSON.

2. **SalesHub.Data**:

    This project contains the Entity Framework repositories for data models.

3. **SalesHub.Core**:

    This project contains the data models and the repository interfaces used by SalesHub.Data.

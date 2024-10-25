---
title: Migrating from MVC to Core MVC
description: "Common issues that may occur when you migrate from Telerik UI for MVC  to Telerik UI for Core MVC"
page_title: Migrating Telerik from MVC to Core MVC
slug: migrating_from_mvc_to_core
tags: migration, mvc, upgrade
---


# Migrating from MVC to Core MVC

The MVC technology 3, 4 and 5 has been a wonderful technology for many years. It targets versions 4.x of the .NET framework and serves its purpose well for creating amazing web applications.

ASP.NET Core is the active offering of Microsoft and provides cross-platform ground for building and running .NET apps on Linux, macOS, and Windows. This is the technology that will get updates going forward. So naturally, many people will want to choose developing Core MVC web applications.

Telerik UI has well supported and developed products for each of these technologies through its [Telerik UI for ASP.NET MVC](https://demos.telerik.com/aspnet-mvc/) and [Telerik UI for ASP.NET Core](https://demos.telerik.com/aspnet-core/) libraries.

This article aims at helping you with the process of migrating from ASP.NET MVC to ASP.NET Core.

## Compatibility

The good news is that there is almost 1:1 parity between the two UI toolsets. The transition is smooth, easy, and fully feature-covered. For any minor variations, check the [section about exceptions](#exceptions) to find out where the products differ from one another.

For reference, compare the code base of the following live samples to make sure the syntax is identical:

- [Telerik UI for ASP.NET MVC Data Grid](https://demos.telerik.com/aspnet-mvc/grid/local-data-binding).
- [Telerik UI for ASP.NET Core Data Grid](https://demos.telerik.com/aspnet-core/grid/local-data-binding)

## Exceptions

There are couple of differences worth mentioning to ease your migration process.

1. The MVC Grid server-rendered templates must transfer to client-rendered templates in Core Grid. Therefore, you will now use `.HeaderTemplate()` instead of `.ClientHeaderTemplate()`.

2. Check out the [Migrate to ASP.NET Core MVC from ASP.NET Framework MVC](https://www.telerik.com/blogs/migrate-aspnet-core-mvc-aspnet-framework-mvc) blog post by Joe Guadagno to explore the common code-behind steps while migrating an app to ASP.NET Core MVC.

  Some key takeaways from this blog are:

  - **Separate the Models**–Putting your domain or data transfer objects into a separate project.
  - **Separate the Data Layer**–Getting data access methods out of the user interface (web app).
  - **Create a New Project**–Analyzing the structure differences of a project in the new technology: folders, files, and so on.
  - **Gotchas**–Possible things that may stump you during the migration process.

3. The rest are syntax sugar differences caused by the frameworks themselves. These are present only for some of the components. For instance, here is a Validation action definition of the Upload component in MVC:

  ```C#
          public ActionResult Validation_Save(IEnumerable<HttpPostedFileBase> files)
          {
          }
  ```

  The following is the equivalent implementation in Core MVC:

  ```C#
          public async Task<ActionResult> Validation_Save(IEnumerable<IFormFile> files)
          {
          }
  ```

4. The same is true for the `Startup.cs` file. Check out the [JSON serialization in Core](https://docs.telerik.com/aspnet-core/installation/json-serialization) article to see how to configure it.

5. You can check the [Migrate from ASP.NET MVC to ASP.NET Core MVC](https://learn.microsoft.com/en-us/aspnet/core/migration/mvc?view=aspnetcore-7.0) MSDN article for general points when migrating.

  Some key takeaways from this article are:

  - Install the .NET Upgrade Assistant.
  - Open Visual Studio and choose the **Upgrade** action in the **Solution Explorer** context menu.
  - Check the **Summary of Changes** before pressing **Finish**.

## Migrating from Another Technology

If you are coming from another Telerik UI toolset, refer to the following resources addressing this scenario:

- [From Web Forms to Core](https://www.telerik.com/blogs/review-of-telerik-toolsets-for-aspnet-web-forms-core)–A blog post and whitepaper, which aim to assist developers in familiarizing quickly with the overall idea of ASP.NET Web Forms and ASP.NET Core. They also outline a couple of fundamental steps for customers who’ve decided to create a new application based on ASP.NET Core, or modernize their existing Web Forms app by switching to a Core app.
- [From Web Forms to Blazor](https://www.telerik.com/blogs/review-of-telerik-toolsets-for-asp.net-web-forms-and-blazor-part-1)–A blog post series divided into three parts. These serve as a guide for developers to learn what Telerik has to offer for both technologies and how to migrate from ASP.NET AJAX to the newest .NET technology - Blazor.
- [From MVC to Blazor](https://www.telerik.com/blogs/migrating-mvc-to-blazor)–A blog post outlining how to migrate from ASP.NET MVC to Blazor and what pitfalls to look out for while doing so.

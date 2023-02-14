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

Telerik UI has well supported and developed Products for each of these technologies. This article aims to help you with the process of migrating from MVC to Core MVC if this happens to be your decision.

## Compatibility

The good news is that there is almost 1:1 parity between the two UI toolsets. The transition should be smooth, easy and fully feature covered.

For reference, you can compare the Code base of these two live samples and you will notice that the syntax is identical:

- [Grid in Telerik UI for MVC](https://demos.telerik.com/aspnet-mvc/grid/local-data-binding).
- [Grid in Telerik UI for Core MVC](https://demos.telerik.com/aspnet-core/grid/local-data-binding)

## Exceptions

There are couple of differences worth mentioning to ease your migration process.

1. MVC Grid server rendered templates should transfer to client rendered templates in Core MVC Grid. Therefore, you will now use `.HeaderTemplate()` instead of `.ClientHeaderTemplate()`.

2. We have a Blog post covering common code-behind steps:

    [Migrate to ASP.NET Core MVC from ASP.NET Framework MVC](https://www.telerik.com/blogs/migrate-aspnet-core-mvc-aspnet-framework-mvc)

3. The rest are syntax sugar differences caused by the frameworks themselves. For instance, here is a Validation action definition of the Upload component in MVC:
```C#
        public ActionResult Validation_Save(IEnumerable<HttpPostedFileBase> files)
        {
        }
```
And this is the equivalent implementation in Core MVC:
```C#
        public async Task<ActionResult> Validation_Save(IEnumerable<IFormFile> files)
        {
        }
```

4. The same is true for the **Startup.cs** file:

    [JSON serialization in Core](https://docs.telerik.com/aspnet-core/installation/json-serialization)

5. You can check this nice MSDN article for general points when migrating:

    [Migrate from ASP.NET MVC to ASP.NET Core MVC](https://learn.microsoft.com/en-us/aspnet/core/migration/mvc?view=aspnetcore-7.0)


## Migrating from Another Technology

If you are coming from another Telerik UI toolset, we have resources addressing this  situation as well:
 - [From Web Forms to Core](https://www.telerik.com/blogs/review-of-telerik-toolsets-for-aspnet-web-forms-core)
 - [From Web Forms to Blazor](https://www.telerik.com/blogs/review-of-telerik-toolsets-for-asp.net-web-forms-and-blazor-part-1)
 - [From MVC to Blazor](https://www.telerik.com/blogs/migrating-mvc-to-blazor)

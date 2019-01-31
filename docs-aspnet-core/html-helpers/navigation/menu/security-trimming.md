---
title: Security Trimming
page_title: Security Trimming | Kendo UI Menu HtmlHelper for ASP.NET Core
description: "Learn how to use Security Trimming with Kendo UI Menu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_menu_securitytrimming_aspnetcore
position: 3
---

# Security Trimming

The Kendo UI Menu widget has a built-in security trimming functionality which is enabled by default.

If the URL to which the Menu item points is not authorized, then the Menu item is hidden. Security trimming depends on the [ASP.NET MVC Authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7). Every `action` method which is decorated with the [`AuthorizeAttribute`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) checks whether the user is authorized and allows or forbids the request. For more information, refer to the documentation on [ASP.NET MVC Authorization](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx).

The Menu hides the Menu item if the [`OnAuthorization`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[`HttpUnauthorizedResult`](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx).

To use a custom `AuthorizeAttribute`, refer to [the demo on implementing custom authorization](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute).

When the Menu items are removed because of lacking permissions, a parent item may be left without any children. The following example demonstrates how to use the Menu option for removing the "orphaned" parent items.

```Razor
@(Html.Kendo().Menu()
    .Name("MainMenu")
    .SecurityTrimming(s => s.HideParent(true))
)
```

## See Also

* [JavaScript API Reference of the Menu](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Menu HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/menu/overview)
* [Menu Official Demos](http://demos.telerik.com/aspnet-core/menu/index)

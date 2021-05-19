---
title: Security Trimming
page_title: Security Trimming
description: "Use the built-in security trimming functionality of the Telerik UI Menu HtmlHelper for ASP.NET MVC."
previous_url: /helpers/navigation/menu/security-trimming
slug: securitytrimming_menu_aspnetmvc
position: 3
---

# Security Trimming

The Telerik UI Menu has a built-in security trimming functionality which is enabled by default.

If the URL to which the Menu item points is not authorized, the item is hidden.

Security trimming depends on the [ASP.NET MVC Authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7). Every `action` method which is decorated with [`AuthorizeAttribute`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) checks whether the user is authorized and allows or forbids the request. For more information, refer to the article on [ASP.NET MVC Authorization](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx).

The Menu hides an item if the [`OnAuthorization`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[`HttpUnauthorizedResult`](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx).

For more information on using a custom `AuthorizeAttribute`, refer to [this article](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute).

When the Menu items are removed because of lacking permissions, a parent item may be left without any children. For such cases, the Menu provides an option to remove the "orphaned" parent items.

    Html.Kendo().Menu()
        .Name("MainMenu")
        .SecurityTrimming(s => s.HideParent(true))

## See Also

* [Basic Usage of the Menu HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/menu)
* [MenuItemBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuItemBuilder)
* [MenuBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuBuilder)
* [Menu Server-Side API](/api/menu)

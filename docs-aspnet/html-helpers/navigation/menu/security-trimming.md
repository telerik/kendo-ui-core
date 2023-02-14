---
title: Security Trimming
page_title: Security Trimming
description: "Use the built-in security trimming functionality of the Telerik UI Menu component for {{ site.framework }}"
previous_url: /helpers/navigation/menu/security-trimming
slug: securitytrimming_menu_aspnetmvc
position: 3
---

# Security Trimming

The Telerik UI Menu has a built-in security trimming functionality which is enabled by default.

If the URL to which the Menu item points is not authorized, the item is hidden.
{% if site.mvc %}
Security trimming depends on the [ASP.NET MVC Authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7). Authorization in MVC is controlled through the [`AuthorizeAttribute`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) attribute and its various parameters. At its simplest applying the AuthorizeAttribute attribute to a controller or action limits access to the controller or action to any authenticated user. For more information, refer to the article on [ASP.NET MVC Authorization](https://docs.microsoft.com/en-us/aspnet/web-api/overview/older-versions/using-web-api-1-with-entity-framework-5/using-web-api-with-entity-framework-part-4#add-authorization).

The Menu hides an item if the [`OnAuthorization`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[`HttpUnauthorizedResult`](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx).


[This GitHub project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/menu/security-trimming) is representing the usage of the `AuthorizeAttribute`.
{% endif %}

{% if site.core %}
Security trimming depends on the [ASP.NET Core Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/introduction?view=aspnetcore-6.0). Every `action` method which is decorated with [`AuthorizeAttribute`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authorization.authorizeattribute?view=aspnetcore-6.0) checks whether the user is authorized and allows or forbids the request. 

The Menu hides an item if the [`OnAuthorization`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.filters.iauthorizationfilter.onauthorization?view=aspnetcore-6.0) method returns
[`UnauthorizedResult`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.unauthorizedresult?view=aspnetcore-6.0).

For more information, refer to the article on [ASP.NET Core Authorization](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/simple?view=aspnetcore-6.0).
{% endif %}

The security trimming functionality can be enabled through the `SecurityTrimming` property.

```HtmlHelper
    Html.Kendo().Menu()
        .Name("MainMenu")
        .SecurityTrimming(true)
```
{% if site.core %}
```TagHelper
    <kendo-menu name="menu" security-trimming="true">
    </kendo-menu>
```
[This GitHub project](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Menu/SecurityTrimming.cshtml) represents the usage of the `AuthorizeAttribute`.
{% endif %}

## See Also

{% if site.mvc %}
* [Basic Usage of the Menu HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/menu)
* [MenuItemBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuItemBuilder)
* [MenuBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuBuilder)
* [Menu Server-Side API](/api/menu)
{% endif %}

{%if site.core%}
* [Basic Usage of the Menu HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-core/menu)
* [MenuItemBuilder Server-Side API](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/MenuItemBuilder)
* [MenuBuilder Server-Side API](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/MenuBuilder)
* [Menu Server-Side API](https://docs.telerik.com/aspnet-core/api/menu)
{% endif %}

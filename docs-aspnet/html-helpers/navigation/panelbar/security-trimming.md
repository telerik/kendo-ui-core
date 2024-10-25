---
title: Security Trimming
page_title: Security Trimming - Telerik UI PanelBar HtmlHelper for ASP.NET MVC
description: "Use the built-in security trimming functionality of the Telerik UI PanelBar HtmlHelper for ASP.NET MVC."
previous_url: /helpers/navigation/panelbar/security-trimming
slug: securitytrimming_panelbarhelper_aspnetmvc
position: 4
---

# Security Trimming

The Telerik UI PanelBar has a built-in security trimming functionality which is enabled by default.

If the URL to which the PanelBar item points is not authorized, the item is hidden.

Security trimming depends on the [ASP.NET MVC Authorization](http://www.asp.net/mvc/tutorials/mvc-music-store/mvc-music-store-part-7). Every `action` method which is decorated with [`AuthorizeAttribute`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.aspx) checks whether the user is authorized and allows or forbids the request. For more information, refer to the article on [ASP.NET MVC Authorization](http://weblogs.asp.net/jgalloway/archive/2011/04/28/looking-at-how-asp-net-mvc-authorize-interacts-with-asp-net-forms-authorization.aspx).

The PanelBar hides an item if the [`OnAuthorization`](http://msdn.microsoft.com/en-us/library/system.web.mvc.authorizeattribute.onauthorization.aspx) method returns
[`HttpUnauthorizedResult`](http://msdn.microsoft.com/en-us/library/system.web.mvc.httpunauthorizedresult.aspx).

For more information on using a custom `AuthorizeAttribute`, refer to [this article](https://github.com/telerik/kendo-examples-asp-net-mvc/tree/master/kendo-menu-with-custom-authorization-attribute).

## Known Limitations

The Security Trimming functionality of the component is supported when using [Items Binding]({% slug itemsbinding_panelbarhelper_aspnetmvc %}) or [SiteMap Binding]({% slug sitemapbinding_panelbarhelper_aspnetmvc %}) and the path for an item is provided via the `Action()` overloads that accept a `Controller` name, `Action` name and/or `RouteValueDictionary` as parameters. The functionality is not supported when using [Ajax binding]({% slug htmlhelpers_panelbar_ajaxbinding_aspnetcore %}) and defining a DataUrlField.

The example below demonstrates how to configure the PanelBar component and its items, so the Security Trimming functionality works as expected:

```cshtml
    @(Html.Kendo().PanelBar()
        .Name("panelBar")
        .SecurityTrimming(true)
        .Items(data =>
        {
            data.Add().Text("About").Action("About", "Home"); // item will be visible as endpoint is accessible.
            data.Add().Text("Info").LoadContentFrom("Info", "Home"); // item will be visible as content endpoint is accessible.
            data.Add().Text("Details").Action("Details", "Home"); // item will be hidden for non-authorized users.
            data.Add().Text("Important Details").LoadContentFrom("ImportantDetails", "Home"); // item will be hidden for non-authorized users as access to content endpoint is restricted.
            data.Add().Text("Details as url").Url("~/Home/Details"); // unsupported scenario - item won't be trimmed, even though endpoint is inaccessible.
            data.Add().Text("Important Details as url").LoadContentFrom("~/Home/ImportantDetails"); // unsupported scenario - item won't be trimmed, even though content endpoint is inaccessible.
        })
    )
```
```Controller
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Info()
        {
            return PartialView();
        }

        [Authorize]
        public ActionResult Details()
        {
            return new HttpUnauthorizedResult("Denied");
        }

        [Authorize]
        public ActionResult ImportantDetails()
        {
            return PartialView();
        }
    }
```

## See Also

* [Basic Usage of the PanelBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/panelbar)
* [PanelBarBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/panelbarbuilder)
* [PanelBar Server-Side API](/api/panelbar)

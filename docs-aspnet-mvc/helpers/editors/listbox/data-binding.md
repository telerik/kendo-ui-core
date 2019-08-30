---
title: Data Binding
page_title: Data Binding | Telerik UI ListBox HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC ListBox and learn how to perform Ajax and server binding."
slug: databinding_listboxhelper_aspnetmvc
position: 2
---

# Data Binding

The ListBox enables you to perform [server binding](#server-binding) and [Ajax binding](#ajax-binding).

## Server Binding

During the server data-binding mode, the data is serialized to the client and no Ajax requests are made. The following example demonstrates how to bind the ListBox on the server when you use static data.

```Razor
   @(Html.Kendo().ListBox()
        .Name("optional")
        .Toolbar(toolbar =>
        {
            toolbar.Position(Kendo.Mvc.UI.Fluent.ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .MoveUp()
                .MoveDown()
            );
        })
        .BindTo(ViewBag.Attendees)
    )
```
```Controller
    public ActionResult Index()
    {
        ViewBag.Attendees = new List<string>
        {
            "Steven White",
            "Nancy King",
            "Nancy Davolio",
            "Robert Davolio",
            "Michael Leverling",
            "Andrew Callahan",
            "Michael Suyama"
        };
        return View();
    }
```

## Ajax Binding

During the Ajax binding the ListBox makes Ajax requests to get the data. The following example demonstrates how to bind the `DataSource` component to remote data.

> When you use complex data objects, set the `DataTextField("TextField")` and `DataValueField("ValueField")` properties to notify the ListBox of your preferred binding behavior.

    @(Html.Kendo().ListBox()
        .Name("listbox")
        .Toolbar(toolbar => toolbar.Tools(
            tools => tools
                .MoveUp()
                .MoveDown()
                .Remove()
         ))
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .DataSource(source => source
            .Read(r => r.Action("GetProducts", "ListBox"))
        )
    )

## See Also

* [Basic Usage of the ListBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listbox/index)
* [Using the API of the ListBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listbox/api)
* [Server-Side API](/api/listbox)

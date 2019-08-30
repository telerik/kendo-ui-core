---
title: Overview
page_title: ListBox Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI ListBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/listbox
slug: htmlhelpers_listbox_aspnetcore
position: 1
---

# ListBox HtmlHelper Overview

The Telerik UI ListBox HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ListBox widget.

The ListBox provides suggestions depending on the typed text and allows multiple value entries. displays a list of data that is contained in a box and allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

* [Demo page for the ListBox](https://demos.telerik.com/aspnet-core/listbox/index)

## Initializing the ListBox

The following example demonstrates how to define the ListBox by using the ListBox HtmlHelper.

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

## Functionality and Features

* [Data Binding]({% slug htmlhelpers_listbox_databinding_aspnetcore %})
* [Item templates]({% slug htmlhelpers_listbox_templates_aspnetcore %})
* [Dragging and dropping]({% slug htmlhelpers_listbox_draganddrop_aspnetcore %})
* [Selection]({% slug htmlhelpers_listbox_selection_aspnetcore %})
* [Globalization]({% slug htmlhelpers_listbox_globalization_aspnetcore %})
* [Accessibility]({% slug htmlhelpers_listbox_accessibility_aspnetcore %})

## Events

For a complete example on basic ListBox events, refer to the [demo on using the events of the ListBox](https://demos.telerik.com/aspnet-core/listbox/events).

## Referencing Existing Instances

To reference an existing  ListBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ListBox API](/api/listbox) to control its behavior.

The following example demonstrates how to access an existing ListBox instance.

      // Place the following after your ListBox for ASP.NET Core declaration.
      <script>
      $(function() {
      // The Name() of the ListBox is used to get its client-side instance.
          var listbox = $("#listbox").getKendoListBox();
      });
      </script>
## See Also

* [Basic Usage of the ListBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/index)
* [Using the API of the ListBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/api)
* [Server-Side API](/api/listbox)

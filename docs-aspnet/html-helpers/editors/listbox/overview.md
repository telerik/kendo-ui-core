---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ListBox component for {{ site.framework }}."
previous_url: /helpers/html-helpers/listbox, /helpers/editors/listbox/overview
slug: htmlhelpers_listbox_aspnetcore
position: 1
---

# {{ site.framework }} ListBox Overview

{% if site.core %}
The Telerik UI ListBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ListBox widget.
{% else %}
The Telerik UI ListBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ListBox widget.
{% endif %}

The ListBox provides suggestions depending on the typed text and allows multiple value entries. It displays a list of data that is contained in a box and allows single or multiple selection, reordering of selected items, and deleting items and features keyboard navigation as well as the dragging and dropping of items. You can also connect the ListBox with another list-box and customize the widget with the use of templates, toolbar positioning, placeholder and hint, and localization of its command buttons messages.

* [Demo page for the ListBox HtmlHelper](https://demos.telerik.com/{{ site.platform }}/listbox/index)
{% if site.core %}
* [Demo page for the ListBox TagHelper](https://demos.telerik.com/aspnet-core/listbox/tag-helper){% endif %}

## Initializing the ListBox

The following example demonstrates how to define the ListBox.

```HtmlHelper
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
{% if site.core %}
```TagHelper

        @{
            var tools = new string[] { "moveUp", "moveDown"};
        }
        <kendo-listbox name="optional" 
                       bind-to="ViewBag.Attendees">
            <toolbar position="ListBoxToolbarPosition.Right"
                     tools="tools" />
        </kendo-listbox>

```
{% endif %}
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

For a complete example on basic ListBox events, refer to the [demo on using the events of the ListBox](https://demos.telerik.com/{{ site.platform }}/listbox/events).

## Referencing Existing Instances

To reference an existing  ListBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ListBox client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox#methods) to control its behavior.

The following example demonstrates how to access an existing ListBox instance.

      // Place the following after your ListBox for {{ site.framework }} declaration.
      <script>
      $(function() {
      // The Name() of the ListBox is used to get its client-side instance.
          var listbox = $("#listbox").getKendoListBox();
      });
      </script>
## See Also

* [Basic Usage of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/index)
{% if site.core %}
* [Basic Usage of the ListBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/listbox/tag-helper)
{% endif %}
* [Using the API of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/api)
* [Server-Side API](/api/listbox)

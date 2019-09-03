---
title: Overview
page_title: Sortable Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI Sortable widget for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/sortable
slug: htmlhelpers_sortable_aspnetcore
position: 1
---

# Sortable HtmlHelper Overview

The Telerik UI Sortable HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Sortable widget.

The Sortable provides a sortable drag-and-drop functionality to elements within a list.

* [Demo page for the Sortable](https://demos.telerik.com/aspnet-core/sortable/index)

## Initializing the Sortable

Unlike most of the HtmlHelpers, the Sortable does not render HTML markup. You have to initialize the Sortable HtmlHelper for an already existing DOM element.

The following example demonstrates a basic declaration of a Sortable widget using the Sortable HtmlHelper. The widget is initialized for the `sortable-basic` element making its list items sortable.

```
      <ul id="sortable-basic">
          <li class="sortable">Papercut <span>3:04</span></li>
          <li class="sortable">One Step Closer <span>2:35</span></li>
          <li class="sortable">With You <span>3:23</span></li>
      </ul>
      @(Html.Kendo().Sortable()
          .For("#sortable-basic") // The for option of the Sortable is mandatory.
                                  // It is a jQuery selector which specifies
                                  // the already existing element for which the Sortable will be initialized.
          .HintHandler("hint") // The JavaScript function which
                               // constructs the hint element of the Sortable.
          .PlaceholderHandler("placeholder") // The JavaScript function which
                                             // constructs the placeholder element of the Sortable.
      )
      <script>
          // Define the hint handler.
          function hint(element) {
              return element.clone().addClass("hint");
          }
          // Define the placeholder handler.
          function placeholder(element) {
              return element.clone().addClass("placeholder").text("drop here");
          }
      </script>
```

## Functionality and Features

* [Hint](#disabling-the-hint)
* [Items](#disabling-and-filtering-items)

## Events

You can subscribe to all Sortable [events](/api/sortable).

### Handling Events by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```
    <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Events(events => events
            .Start("onStart")
            .Change("onChange")
        )
    )
    <script>
        function onStart(e) {
            var id = e.sender.element.attr("id");
            kendoConsole.log(id + " start: " + e.item.text());
        }

        function onChange(e) {
            var id = e.sender.element.attr("id"),
                text = e.item.text(),
                newIndex = e.newIndex,
                oldIndex = e.oldIndex;

            kendoConsole.log(id + " change: " + text + " newIndex: " + newIndex + " oldIndex: " + oldIndex + " action: " + e.action);
        }
    </script>
```

### Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    @(Html.Kendo().Sortable()
        .For("#sortable")
        .Events(events => events
            .Start(@<text>
                function() {
                    // Handle the show event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    // Handle the show event inline.
                }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Telerik UI Sortable instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once you have a reference to the widget, use the [Sortable API](http://docs.telerik.com/kendo-ui/api/javascript/ui/sortable#methods) to control its behavior.

```
    // Place the following after your Telerik UI Sortable for ASP.NET Core declaration.
    <script>
    $(function() {
        // The For() of the Sortable is used to get its client-side instance.
        var sortable = $("#container").data("kendoSortable");
    });
    </script>
```

## Events

For a complete example on basic Sortable events, refer to the [demo on using the events of the Sortable](https://demos.telerik.com/aspnet-core/sortable/events).

## See Also

* [Basic Usage of the Sortable HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/sortable/index)
* [Server-Side API](/api/sortable)

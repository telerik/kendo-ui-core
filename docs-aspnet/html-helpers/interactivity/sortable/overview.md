---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Sortable widget for {{ site.framework }}."
previous_url: /helpers/html-helpers/sortable, /helpers/interactivity/sortable/overview
slug: htmlhelpers_sortable_aspnetcore
position: 1
---

# Sortable Overview

{% if site.core %}
The Telerik UI Sortable TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Sortable widget.
{% else %}
The Telerik UI Sortable HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Sortable widget.
{% endif %}

The Sortable provides a sortable drag-and-drop functionality to elements within a list.

* [Demo page for the Sortable HtmlHelper](https://demos.telerik.com/{{ site.platform }}/sortable/index)
{% if site.core %}
* [Demo page for the Sortable TagHelper](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
{% endif %}

## Initializing the Sortable

Unlike most of the Telerik UI components, the Sortable does not render HTML markup. You have to initialize the Sortable for an already existing DOM element.

The following example demonstrates a basic declaration of a Sortable widget. The widget is initialized for the `sortable-basic` element making its list items sortable.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <ul id="sortable-basic">
          <li class="sortable">Papercut <span>3:04</span></li>
          <li class="sortable">One Step Closer <span>2:35</span></li>
          <li class="sortable">With You <span>3:23</span></li>
    </ul>
    <kendo-sortable name="sortable-basic" hint="hint"  placeholder="placeholder">
    </kendo-sortable>
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
{% endif %}

## Functionality and Features

* [Hint]({% slug hint_sortable_aspnetcore %})
* [Items]({% slug htmlhelpers_sortable_aspnetcore_items %})
* [Cursor]({% slug htmlhelpers_sortable_aspnetcore_cursor %})
* [Placeholder]({% slug htmlhelpers_sortable_aspnetcore_placeholder %})
* [Integration with other Telerik UI HTML Helpers]({% slug sortable_aspnetcore_integration_grid %})
* [Common Scenarios]({% slug htmlhelpers_sortable_aspnetcore_common_scenarios %})

## Events

You can subscribe to all Sortable [events](/api/sortable). For a complete example on basic Sortable events, refer to the [demo on using the events of the Sortable](https://demos.telerik.com/{{ site.platform }}/sortable/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
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
{% if site.core %}
```TagHelper
     <ul id="sortable">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    <kendo-sortable name="sortable" on-start="onStart" on-change="onChange">
    </kendo-sortable>
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
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
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

To reference an existing Telerik UI Sortable instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once you have a reference to the widget, use the [Sortable client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/sortable#methods) to control its behavior.

```
    // Place the following after your Telerik UI Sortable for {{ site.framework }} declaration.
    <script>
    $(function() {
        // The For() of the Sortable is used to get its client-side instance.
        var sortable = $("#container").data("kendoSortable");
    });
    </script>
```

## See Also

* [Basic Usage of the Sortable HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/sortable/index)
{% if site.core %}
* [Basic Usage of the Sortable TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/sortable/tag-helper)
{% endif %}
* [Server-Side API](/api/sortable)

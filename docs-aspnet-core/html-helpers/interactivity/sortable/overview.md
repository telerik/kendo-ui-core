---
title: Overview
page_title: Sortable | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Sortable widget for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/sortable
slug: htmlhelpers_sortable_aspnetcore
position: 1
---

# Sortable HtmlHelper Overview

The Sortable HtmlHelper extension is a server-side wrapper for the [Kendo UI Sortable](https://demos.telerik.com/kendo-ui/sortable/index) widget.

## Basic Usage

Unlike most of the HtmlHelpers, the Sortable does not render HTML markup.

> **Important**
>
> Initialize the Sortable HtmlHelper for an already existing DOM element.

The following example demonstrates a basic declaration of a Sortable widget using the Sortable HtmlHelper. The widget is initialized for the "sortable-basic" element making its list items sortable.

###### Example

```
      <ul id="sortable-basic">
          <li class="sortable">Papercut <span>3:04</span></li>
          <li class="sortable">One Step Closer <span>2:35</span></li>
          <li class="sortable">With You <span>3:23</span></li>
      </ul>
      @(Html.Kendo().Sortable()
          .For("#sortable-basic") //The for option of the Sortable is mandatory.
                                  //It is a jQuery selector which specifies
                                  //the already existing element for which the Sortable will be initialized.
          .HintHandler("hint") //The JavaScript function which
                               //constructs the Sortable's hint element.
          .PlaceholderHandler("placeholder") //The JavaScript function which
                                             //constructs the Sortable's placeholder element.
      )
      <script>
          //Define the hint handler.
          function hint(element) {
              return element.clone().addClass("hint");
          }
          //Define the placeholder handler.
          function placeholder(element) {
              return element.clone().addClass("placeholder").text("drop here");
          }
      </script>
```

## Configuration

The Sortable provides options for:

* [Disabling its hint](#disabling-the-hint)
* [Disabling and filtering its items](#disabling-and-filtering-items)
* [Creating Linked Lists](#creating-linked-lists)

### Disabling the Hint

The Sortable can operate without a hint. To disable the hint, set it to an empty function by using [`jQuery.noop](http://api.jquery.com/jQuery.noop/).

###### Example

```
    @(Html.Kendo().Sortable()
        .For("#sortable")
        .HintHandler("noHint")
    )

    <script>
        var noHint = $.noop;
    </script>
```

### Disabling and Filtering Items

To make items non-sortable, disable them by providing a selector that matches these items. As a result, the user is not able to drag the disabled, non-sortable items and change their position, but still they are valid sort targets.

###### Example

```
	@(Html.Kendo().Sortable()
    	.For("#sortable-basic")
    	.Disable(".disable")
	)
```

To prevent items both from being dragged and being sort targets, specify a filter.

###### Example

```
	@(Html.Kendo().Sortable()
    	.For("#sortable-basic")
    	.Filter(".sortable")
	)
```

### Creating Linked Lists

To enable the dragging of items between two lists, create a Sortable for each list and use the `ConnectWith` configuration in both Sortable components.

```
    @(Html.Kendo().Sortable()
        .For("#sortable-listA")
        .ConnectWith("#sortable-listB")
        .PlaceholderHandler("placeholder")
    )

    @(Html.Kendo().Sortable()
        .For("#sortable-listB")
        .ConnectWith("#sortable-listB")
        .PlaceholderHandler("placeholder")
    )

    <script>
        function placeholder(element) {
            return $("<li class='list-item' id='placeholder'>Drop Here!</li>");
        }
    </script>
```

## Event Handling

You can subscribe to all Sortable [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/sortable#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

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
                    //Handle the show event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    //Handle the show event inline.
                }
            </text>)
        )
    )
```

## Reference

### Existing Instances

To reference an existing Kendo UI Sortable instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once you have a reference to the widget, use the [Sortable API](http://docs.telerik.com/kendo-ui/api/javascript/ui/sortable#methods) to control its behavior.

###### Example

```
    //Put this after your Kendo UI Sortable for ASP.NET MVC declaration.
    <script>
    $(function() {
        //Notice that the For() of the Sortable is used to get its client-side instance.
        var sortable = $("#container").data("kendoSortable");
    });
    </script>
```

## See Also

* [ASP.NET MVC API Reference: SortableBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SortableBuilder)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Overview of the Kendo UI Sortable Widget](http://docs.telerik.com/kendo-ui/controls/interactivity/sortable/overview)
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})

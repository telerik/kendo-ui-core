---
title: Overview
page_title: Overview | Kendo UI Sortable HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Sortable widget for ASP.NET MVC."
slug: overview_sortablehelper_aspnetmvc
position: 1
---

# Sortable HtmlHelper Overview

The Sortable HtmlHelper extension is a server-side wrapper for the [Kendo UI Sortable](https://demos.telerik.com/kendo-ui/sortable/index) widget.

## Getting Started

Unlike most of the HtmlHelpers, the Sortable does not render HTML markup.

> **Important**
>
> Initialize the Sortable HtmlHelper for already existing DOM element.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Sortable.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method.

###### Example

      public ActionResult Index()
      {
          return View();
      }

**Step 3** Initialize the Sortable.

###### Example

```tab-ASPX

      <ul id="sortable-basic">
          <li class="sortable">Papercut <span>3:04</span></li>
          <li class="sortable">One Step Closer <span>2:35</span></li>
          <li class="sortable">With You <span>3:23</span></li>
      </ul>
      <%:Html.Kendo().Sortable()
          .For("#sortable-basic") //The for option of the Sortable is mandatory.
                                  //It is a jQuery selector which specifies.
                                  //the already existing element for which the Sortable will be initialized.
          .HintHandler("hint") //The JavaScript function which
                               //constructs the Sortable's hint element.
          .PlaceholderHandler("placeholder") //The JavaScript function which
                                             //constructs the Sortable's placeholder element
      %>
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
```tab-Razor

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

### Hint Disabling

The Sortable widget can operate without a hint. To disable the hint, set it to an empty function ([jQuery.noop](http://api.jquery.com/jQuery.noop/)).

###### Example

      @(Html.Kendo().Sortable()
          .For("#sortable")
          .HintHandler("noHint")
      )

      <script>
          var noHint = $.noop;
      </script>

## Event Handling

You can subscribe to all Sortable [events](/api/javascript/ui/sortable#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

      <ul id="sortable">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
      </ul>
      <%:Html.Kendo().Sortable()
          .For("#sortable")
          .Events(events => events
              .Start("onStart")
              .Change("onChange")
          )
      %>
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
```tab-Razor

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

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

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

You can reference an existing Kendo UI Sortable instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Sortable API](/api/javascript/ui/sortable#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI Sortable for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the For() of the Sortable is used to get its client-side instance.
          var sortable = $("#container").data("kendoSortable");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Sortable:

* [ASP.NET MVC API Reference: SortableBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SortableBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Sortable Widget]({% slug overview_kendoui_sortable_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

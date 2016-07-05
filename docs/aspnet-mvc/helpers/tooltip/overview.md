---
title: Overview
page_title: Overview | Kendo UI Tooltip HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Tooltip widget for ASP.NET MVC."
slug: overview_tooltiphelper_aspnetmvc
position: 1
---

# Tooltip HtmlHelper Overview

The Tooltip HtmlHelper extension is a server-side wrapper for the [Kendo UI Tooltip](https://demos.telerik.com/kendo-ui/tooltip/index) widget.

## Getting Started

### The Basics

There are several ways to define content for the Kendo UI Tooltip for ASP.NET MVC:

* Static text&mdash;Set a static text to be displayed as text.
* Function&mdash;A JavaScript function to supply the content for the Tooltip.
* Ajax&mdash;The content is to be retrieved through an Ajax request.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Tooltip.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a Tooltip.

###### Example

```tab-ASPX

         <%: Html.Kendo().Tooltip()
             .For("#container") //The for option of the Tooltip is mandatory.
                                //It is a jQuery selector which specifies the element or the container for the elements for which the Tooltip will be shown.
             .Filter("a[title]") //The jQuery selector which narrows the elements within the container for which the Tooltip will be shown.
             .Content("custom text")
         %>
```
```tab-Razor

         @(Html.Kendo().Tooltip()
             .For("#container") //The for option of the Tooltip is mandatory.
                                //It is a jQuery selector which specifies the element or the container for the elements for which the Tooltip will be shown.
             .Filter("a[title]") //The jQuery selector which narrows the elements within the container for which the Tooltip will be shown.
             .Content("custom text")
         )
```

### Load-on-Demand Content

Below are listed the steps for you to follow when configuring the Kendo UI Tooltip with a load-on-demand content.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Create an action method which renders the content.

###### Example

        public ActionResult AjaxContent()
        {
            return View();
        }

**Step 4** Add a Tooltip.

###### Example

```tab-ASPX

        <%: Html.Kendo().Tooltip()
               .For("#container") //The for option of the Tooltip is mandatory.
                                //It is a jQuery selector which specifies the element or the container for the elements for which the Tooltip will be shown.
               .LoadContentFrom("AjaxContent", "Tooltip") //Define the Action and Controller names.
        %>
```
```tab-Razor

        @(Html.Kendo().Tooltip()
               .For("#container") //The for option of the Tooltip is mandatory.
                                //It is a jQuery selector which specifies the element or the container for the elements for which the Tooltip will be shown.
               .LoadContentFrom("AjaxContent", "Tooltip") //Define the Action and Controller names.
        )
```

## Event Handling

You can subscribe to all Tooltip [events](/api/javascript/ui/tooltip#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Tooltip()
            .For("#container")
            .Events(e => e
                .Show("tooltip_show")
                .Hide("tooltip_hide")
            )
        %>
        <script>
            function tooltip_show() {
                //Handle the show event.
            }

            function tooltip_hide() {
                //Handle the hide event.
            }
        </script>
```
```tab-Razor

        @(Html.Kendo().Tooltip()
          .For("#container")
          .Events(e => e
                .Show("tooltip_show")
                .Hide("tooltip_hide")
          )
        )
        <script>
            function tooltip_show() {
                //Handle the show event.
            }

            function tooltip_hide() {
                //Handle the hide event.
            }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().Tooltip()
          .For("#container")
          .Events(e => e
              .Show(@<text>
                function() {
                    //Handle the show event inline.
                }
              </text>)
              .Hide(@<text>
                function() {
                    //Handle the hide event inline.
                }
                </text>)
          )
        )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI Tooltip instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Tooltip API](/api/javascript/ui/tooltip#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Tooltip for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the For() of the Tooltip is used to get its client-side instance.
            var tooltip = $("#container").data("kendoTooltip");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Tooltip:

* [ASP.NET MVC API Reference: TooltipBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TooltipBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Tooltip Widget]({% slug overview_kendoui_tooltip_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

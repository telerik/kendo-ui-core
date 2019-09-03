---
title: Content
page_title: Content | Telerik UI Tooltip HtmlHelper for ASP.NET MVC
description: "Define and load on demand the content of the Telerik UI Tooltip HtmlHelper for ASP.NET MVC."
slug: content_tooltiphelper_aspnetmvc
position: 2
---

# Content

The Tooltip provides options for [defining its content](#defining-the-content) and for [loading its content on demand](#loading-on-demand).  

## Defining the Content

To define the content for the Tooltip, use any of the following approaches:

* Static text&mdash;Set a static text to be displayed as text.
* Function&mdash;A JavaScript function to supply the content for the Tooltip.
* Ajax&mdash;The content is to be retrieved through an Ajax request.

## Loading on Demand

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Create an action method which renders the content.

        public ActionResult AjaxContent()
        {
            return View();
        }

1. Add a Tooltip.

    ```ASPX
        <%: Html.Kendo().Tooltip()
            .For("#container") // The for option of the Tooltip is mandatory.
                            // It is a jQuery selector which specifies the element or the container for the elements for which the Tooltip will be shown.
            .LoadContentFrom("AjaxContent", "Tooltip") // Define the Action and Controller names.
        %>
    ```
    ```Razor
        @(Html.Kendo().Tooltip()
            .For("#container") // The for option of the Tooltip is mandatory.
                            // It is a jQuery selector which specifies the element or the container for the elements for which the Tooltip will be shown.
            .LoadContentFrom("AjaxContent", "Tooltip") // Define the Action and Controller names.
        )
    ```

## See Also

* [Using the Content Template in the Tooltip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tooltip/template)
* [TooltipBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TooltipBuilder)
* [Tooltip Server-Side API](/api/tooltip)

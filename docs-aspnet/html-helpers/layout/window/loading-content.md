---
title: Loading Content
page_title: Loading Content
description: "Learn about the different ways of loading content in Telerik UI Window HtmlHelper for {{ site.framework }}."
previous_url: /helpers/layout/window/content
slug: htmlhelpers_window_loadingcontent_aspnetcore
position: 5
---

# Loading Content

You can hardcode or dynamically load the content of the Window HtmlHelper at a later stage.

## Static Content

The Window exposes a `Content()` configuration method which allows you to load predefined HTML content.

    @(Html.Kendo().Window()
        .Name("window")
        .Title("Static content")
        .Content(@<text>
                <strong>Static content</strong> of the Window.
        </text>)
    )

## Load-on-Demand Content

To configure the Window with load-on-demand content:

1. Create a new action method which renders the view.

        public IActionResult Index()
        {
            return View();
        }

1. Create an action method which renders the content.

        public IActionResult AjaxContent()
        {
            return View();
        }

1. Add a Window.

        @(Html.Kendo().Window()
            .Name("window") // The name of the Window is mandatory. It specifies the "id" attribute of the widget.
            .Title("About Alvar Aalto") // Set the title of the Window.
            .LoadContentFrom("AjaxContent", "Window") //Define the Action and Controller names.
        )

## See Also

* [Server-Side API](/api/window)

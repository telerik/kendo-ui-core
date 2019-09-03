---
title: Content
page_title: Content | Telerik UI Window HtmlHelper for ASP.NET MVC
description: "Load on demand the content of the Telerik UI Window HtmlHelper for ASP.NET MVC."
slug: content_windowhelper_aspnetmvc
position: 2
---

# Content

The Window provides options for loading its content on demand.

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

1. Add a Window.

    ```ASPX
        <% Html.Kendo().Window()
            .Name("window") // The name of the Window is mandatory. It specifies the "id" attribute of the Window.
            .Title("About Alvar Aalto") // Set the title of the Window.
            .LoadContentFrom("AjaxContent", "Window") // Define the Action and Controller names.
        %>
    ```
    ```Razor
        @(Html.Kendo().Window()
            .Name("window") // The name of the Window is mandatory. It specifies the "id" attribute of the Window.
            .Title("About Alvar Aalto") // Set the title of the Window.
            .LoadContentFrom("AjaxContent", "Window") // Define the Action and Controller names.
        )
    ```

## See Also

* [Loading Content with Ajax in the Window HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/window/ajax)
* [WindowBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/WindowBuilder)
* [Window Server-Side API](/api/window)

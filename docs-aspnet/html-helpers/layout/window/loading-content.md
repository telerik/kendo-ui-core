---
title: Loading Content
page_title: Loading Content
description: "Learn about the different ways of loading content in Telerik UI Window HtmlHelper for {{ site.framework }}."
previous_url: /helpers/layout/window/content
slug: htmlhelpers_window_loadingcontent_aspnetcore
position: 5
---

# Loading Content

You can load the Window content initially or dynamically at a later stage.

## Static Content

The Window exposes a `Content()` configuration method which allows you to load predefined HTML content. This is the most commonly preferred approach:

    @(Html.Kendo().Window()
        .Name("window")
        .Title("Static content")
        .Content(@<text>
                <strong>Static content</strong> of the Window.
        </text>)
    )

## Load-on-Demand Content

In some scenarios, it is required to configure the Window to load dynamic content. Here are the steps to achieve that:

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

1. Add a Window on the page. Its definition will contain the LoadContentFrom() setting which will point to the Content Controller Action:

        @(Html.Kendo().Window()
            .Name("window") // The name of the Window is mandatory. It specifies the "id" attribute of the widget.
            .Title("About Alvar Aalto") // Set the title of the Window.
            .LoadContentFrom("AjaxContent", "Window") //Define the Action and Controller names.
        {% if site.core %}
            // In case the window is used in a RazorPages project, supply the name of the RazorPage in the LoadContentFrom option
            // .LoadContentFrom("MyRazorPageName")
        {% endif %}
        )

You can also use another [`.LoadContentFrom()`](/api/Kendo.Mvc.UI.Fluent/WindowBuilder#loadcontentfrommicrosoftaspnetcoreroutingroutevaluedictionary) overload to pass additional details to the action method returning the Window's content:
```Razor
@(Html.Kendo().Window()
        .Name("window") 
        .Title("User Details") 
        .LoadContentFrom("UserDetails", "Window", new { userId = 10}) //Define the Action, Controller names and additional route values.
    )
```
```Controller
public IActionResult UserDetails(int userId)
{
    MyUserViewModel model = myService.GetUserDetails(userId)
    //fetch required details and pass them to the View 
    
    return View(model);
}
```

To refresh or change the Window's content on the client, once the Window has been initialized, you can use the [Client-side API of the Window](https://docs.telerik.com/kendo-ui/api/javascript/ui/window) and the [refresh method](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/refresh).
## See Also

* [Server-Side API](/api/window)

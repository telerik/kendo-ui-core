---
title: Loading Content
page_title: Loading Content
description: "Learn about the different ways of loading content in Telerik UI Window component for {{ site.framework }}."
previous_url: /helpers/layout/window/content
slug: htmlhelpers_window_loadingcontent_aspnetcore
position: 5
---

# Loading Content

You can load the Window content initially or dynamically at a later stage.

## Static Content

The Window exposes a `Content()` configuration method which allows you to load predefined HTML content. This is the most commonly preferred approach:

```HtmlHelper
    @(Html.Kendo().Window()
        .Name("window")
        .Title("Static content")
        .Content(@<text>
                <strong>Static content</strong> of the Window.
        </text>)
    )
```
{% if site.core %}
```TagHelper
    <kendo-window name="window" title="Static content">
        <content>
            <strong>Static content</strong> of the Window.
        </content>
    </kendo-window>
```
{% endif %}

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

    ```HtmlHelper
        @(Html.Kendo().Window()
            .Name("window") // The name of the Window is mandatory. It specifies the "id" attribute of the widget.
            .Title("About Alvar Aalto") // Set the title of the Window.
            .LoadContentFrom("AjaxContent", "Window") //Define the Action and Controller names.
        {% if site.core %}
            // In case the window is used in a RazorPages project, supply the name of the RazorPage in the LoadContentFrom option
            // .LoadContentFrom("MyRazorPageName")
        {% endif %}
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-window name="window" title="About Alvar Aalto" content-url="@Url.Action("AjaxContent","Window")">
        </kendo-window>

          // In case the window is used in a RazorPages project, supply the name of the RazorPage in the content-url option
          // content-url="MyRazorPageName"
    ```
    {% endif %}

You can also use another [`.LoadContentFrom()`](/api/kendo.mvc.ui.fluent/windowbuilder#loadcontentfrommicrosoftaspnetcoreroutingroutevaluedictionary) overload to pass additional details to the action method returning the Window's content:

```HtmlHelper
@(Html.Kendo().Window()
        .Name("window") 
        .Title("User Details") 
        .LoadContentFrom("UserDetails", "Window", new { userId = 10}) //Define the Action, Controller names and additional route values.
    )
```
{% if site.core %}
 ```TagHelper
<kendo-window name="window" title="User Details" content-url="@Url.Action("AjaxContent","Window",new { userId = 10 })">
</kendo-window>
 ```
{% endif %}
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

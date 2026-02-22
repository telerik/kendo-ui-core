---
title: Using iframe
page_title: Using iframe
description: "Learn how to use the Telerik UI Window component for {{ site.framework }} (MVC 6 or {{ site.framework }} MVC) with an iframe element."
components: ["window"]
slug: htmlhelpers_window_iframe_aspnetcore
position: 6
---

# Using iframe

You can force the Window to display its content in an [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) element by using the `Iframe(true)` configuration method. In this case, the Window content will be loaded into an HTML page that is embedded into the current HTML page. 

> * Loading HTML fragments (partial content) inside an `iframe` is not correct. Like standard web pages, `iframe` pages have to include a `DOCTYPE`, `html`, `head`, and `body` tags.
> * Avoid using an `iframe` on iOS devices because iOS devices do not support `iframe` scrolling and always expand to match the content.

The following example demonstrates how to access the `window` and `document` objects inside the `iframe`. To achieve this, the nested page has to belong to the same domain as the main page. The `iframe` is accessed through the `element` of the Window.

```HtmlHelper
    @(Html.Kendo().Window()
        .Name("window")
        .Title("Iframe Window")
        .Iframe(true)
        .LoadContentFrom("Content", "Home")
    )

    <script>
        $(function() {
            var windowElement = $("#window");
            var iframeDomElement = windowElement.children("iframe")[0];
            var iframeWindowObject = iframeDomElement.contentWindow;

            var iframeDocumentObject = iframeDomElement.contentDocument;
            // which is equivalent to
            // var iframeDocumentObject = iframeWindowObject.document;

            var iframejQuery = iframeWindowObject.$; // if jQuery is registered inside the iframe page, of course
        });
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-window name="window" title="Iframe Window" iframe="true" content-url="@Url.Action("Content","Home")">
    </kendo-window>

    <script>
        $(function() {
            var windowElement = $("#window");
            var iframeDomElement = windowElement.children("iframe")[0];
            var iframeWindowObject = iframeDomElement.contentWindow;

            var iframeDocumentObject = iframeDomElement.contentDocument;
            // which is equivalent to
            // var iframeDocumentObject = iframeWindowObject.document;

            var iframejQuery = iframeWindowObject.$; // if jQuery is registered inside the iframe page, of course
        });
    </script>
```
{% endif %}

## See Also

* [Server-Side API](/api/window)

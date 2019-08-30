---
title: Overview
page_title: Editor Overview | Telerik UI Editor HtmlHelper for ASP.NET MVC
description: "Learn the basics when working with the Telerik UI Editor HtmlHelper for ASP.NET MVC."
slug: overview_editorhelper_aspnetmvc
position: 1
---

# Editor HtmlHelper Overview

The Telerik UI Editor HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Editor widget.

The Editor allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface and generate widget value as an XHTML markup.

* [Demo page for the Editor](https://demos.telerik.com/aspnet-mvc/editor)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add an Editor.

    ```ASPX
        <%: Html.Kendo().Editor()
                .Name("editor") // The name of the Editor is mandatory. It specifies the "id" attribute of the Editor.
                .Value("<p>Initial value</p>") // Set the value of the Editor.
        %>
    ```
    ```Razor
        @(Html.Kendo().Editor()
                .Name("editor") // The name of the Editor is mandatory. It specifies the "id" attribute of the Editor.
                .Value("<p>Initial value</p>") // Set the value of the Editor.
        )
    ```

The value of the Editor is posted as a string and mapped to a variable with the name of the widget. By default, the posted value is HTML-encoded to circumvent the [ASP.NET request validation](http://msdn.microsoft.com/en-us/library/hh882339.aspx).

* To decode the value, use the [`HttpUtility.HtmlDecode` method](http://msdn.microsoft.com/en-us/library/7c5fyk1k.aspx).
* To avoid the encoding of the Editor, specify `Encode(false)` by using the fluent API and add the [`AllowHtml` attribute](http://msdn.microsoft.com/en-us/library/system.web.mvc.allowhtmlattribute(v=vs.118).aspx) to the model field that stores the HTML.

    [HttpPost]
    public ActionResult Save(string editor)
    {
        string value = HttpUtility.HtmlDecode(editor);

        return View();
    }

## Functionality and Features

* [Image browser]({% slug overview_imagebrowser_aspnetmvc %})
* [Import and export of documents]({% slug overview_importexportdpl_aspnetmvc %})

## Events

You can subscribe to all Editor [events](/api/editor). For a complete example on basic Editor events, refer to the [demo on using the events of the Editor](https://demos.telerik.com/aspnet-mvc/editor/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Editor()
        .Name("editor")
        .Events(e => e
            .Change("editor_change")
        )
    %>
    <script>
        function editor_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Editor()
        .Name("editor")
        .Events(e => e
            .Change("editor_change")
        )
    )
    <script>
        function editor_change() {
            // Handle the change event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
    @(Html.Kendo().Editor()
        .Name("editor")
        .Events(e => e
            .Change(@<text>
            function() {
                // Handle the change event inline.
            }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Editor instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Editor client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/editor#methods) to control its behavior.

    // Place the following after the Editor for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Editor is used to get its client-side instance.
            var editor = $("#editor").data("kendoEditor");
        });
    </script>

## See Also

* [Basic Usage of the Editor HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/editor)
* [Using the API of the Editor HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/editor/api)
* [EditorBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/EditorBuilder)
* [Editor Server-Side API](/api/editor)

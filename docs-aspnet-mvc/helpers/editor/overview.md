---
title: Overview
page_title: Overview | Kendo UI Editor HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Editor widget for ASP.NET MVC."
slug: overview_editorhelper_aspnetmvc
position: 1
---

# Editor HtmlHelper Overview

The Editor HtmlHelper extension is a server-side wrapper for the [Kendo UI Editor](https://demos.telerik.com/kendo-ui/editor/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Editor.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add an Editor.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().Editor()
                    .Name("editor") //The name of the Editor is mandatory. It specifies the "id" attribute of the widget.
                    .Value("<p>Initial value</p>") //Set the value of the Editor.
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().Editor()
                  .Name("editor") //The name of the Editor is mandatory. It specifies the "id" attribute of the widget.
                  .Value("<p>Initial value</p>") //Set the value of the Editor.
            )
    ```

### Server Value Processing

The Editor value is posted as a string and mapped to a variable with the name of the widget. Note that the posted value is HTML-encoded by default, to circumvent the [ASP.NET request validation](http://msdn.microsoft.com/en-us/library/hh882339.aspx). To decode the value, use the [`HttpUtility.HtmlDecode` method](http://msdn.microsoft.com/en-us/library/7c5fyk1k.aspx).

###### Example

        [HttpPost]
        public ActionResult Save(string editor)
        {
            string value = HttpUtility.HtmlDecode(editor);

            return View();
        }

> **Important**  
>
> You can suppress the Editor encoding by specifying `Encode(false)` via the fluent API and adding the [`AllowHtml` attribute](http://msdn.microsoft.com/en-us/library/system.web.mvc.allowhtmlattribute(v=vs.118).aspx) to the model field that stores the HTML.

## Event Handling

You can subscribe to all Editor [events](../../../kendo-ui/api/javascript/ui/editor#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().Editor()
                .Name("editor")
                .Events(e => e
                    .Change("editor_change")
                )
        %>
        <script>
            function editor_change() {
                //Handle the change event.
            }
        </script>
```
```tab-Razor

        @(Html.Kendo().Editor()
              .Name("editor")
              .Events(e => e
                    .Change("editor_change")
              )
        )
        <script>
            function editor_change() {
                //Handle the change event.
            }
        </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().Editor()
              .Name("editor")
              .Events(e => e
                  .Change(@<text>
                    function() {
                        //Handle the change event inline.
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

To reference an existing Kendo UI Editor instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Editor API](../../../kendo-ui/api/javascript/ui/editor#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Editor for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Editor is used to get its client-side instance.
            var editor = $("#editor").data("kendoEditor");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: EditorBuilder](/api/Kendo.Mvc.UI.Fluent/EditorBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Import and Export Various Documents]({% slug overview_importexportdpl_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Editor Widget](http://docs.telerik.com/kendo-ui/controls/editors/editor/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

For runnable examples on the Kendo UI Editor in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/editor/how-to/).

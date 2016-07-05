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

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add an Editor.

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

You can subscribe to all Editor [events](/api/javascript/ui/editor#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

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

You can reference an existing Kendo UI Editor instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Editor API](/api/javascript/ui/editor#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Editor for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the Editor is used to get its client-side instance.
            var editor = $("#editor").data("kendoEditor");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Editor:

* [ASP.NET MVC API Reference: EditorBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorBuilder)
* [How to Add maxlength Editor Validations in ASP.NET MVC Apps]({% slug howto_addmaxlengthvalidation_editoraspnetmvc %})
* [How to Store Images in Databases when Working with the Editor HtmlHelper]({% slug howto_storeimagesindatabases_editoraspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

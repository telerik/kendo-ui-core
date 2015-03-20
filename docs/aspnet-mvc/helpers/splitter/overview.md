---
title: Overview
page_title: Code and examples how to use Splitter HtmlHelper extension | Kendo UI documentation
description: Easy to follow steps to explore the capabilities of Splitter HtmlHelper extension for Kendo UI Splitter for ASP.NET MVC Widget.
---

# Splitter

The Splitter HtmlHelper extension is a server-side wrapper for the [Kendo UI Splitter](/api/web/splitter) widget.

## Getting Started

Here is how to configure a simple Kendo Splitter:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a simple splitter:
    - WebForms

            <%: Html.Kendo().Splitter()
                    .Name("splitter") //The name of the splitter is mandatory. It specifies the "id" attribute of the widget.
                    .Panes(panes =>
                    {
                        panes.Add().Content("Item 1"); //Add pane
                        panes.Add().Content("Item 2"); //Add pane
                    })
            %>
    - Razor

            @(Html.Kendo().Splitter()
                .Name("splitter") //The name of the splitter is mandatory. It specifies the "id" attribute of the widget.
                .Panes(panes =>
                {
                    panes.Add().Content("Item 1"); //Add pane
                    panes.Add().Content("Item 2"); //Add pane
                })
             )

## Accessing an Existing Splitter

You can reference an existing Splitter instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/splitter#methods) to control its behavior.



### Accessing an existing Splitter instance

    //Put this after your Kendo Splitter for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the splitter is used to get its client-side instance
        var splitter = $("#splitter").data("kendoSplitter");
    });
    </script>


## Handling Kendo UI Splitter events

You can subscribe to all [events](/api/web/splitter#events) exposed by Kendo UI Splitter:

### WebForms - subscribe by handler name

    <%: Html.Kendo().Splitter()
            .Name("splitter")
            .Events(e => e
                .Resize("splitter_resize")
            )
    %>
    <script>
    function splitter_resize() {
        //Handle the Resize event
    }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().Splitter()
          .Name("splitter")
          .Events(e => e
                .Resize("splitter_resize")
          )
    )
    <script>
    function splitter_resize() {
        //Handle the Resize event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().Splitter()
          .Name("splitter")
          .Events(e => e
              .Resize(@<text>
                function() {
                    //Handle the Resize event inline
                }
              </text>)
          )
    )


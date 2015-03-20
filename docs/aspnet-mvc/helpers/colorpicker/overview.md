---
title: Overview
page_title: How to use ColorPicker HtmlHelper extension | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI ColorPicker for ASP.NET MVC widget.
---

# ColorPicker

The ColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI ColorPicker](/api/web/colorpicker) widget.

## Getting Started

Here is how to configure a simple Kendo ColorPicker:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a color picker:
    - WebForms

            <%: Html.Kendo().ColorPicker()
                    .Name("colorpicker") // The name of the colorpicker is mandatory. It specifies the "id" attribute of the widget.
                    .Value("#ff0000") // Set the value of the colorpicker
            %>
    - Razor

            @(Html.Kendo().ColorPicker()
                  .Name("colorpicker") // The name of the colorpicker is mandatory. It specifies the "id" attribute of the widget.
                  .Value("#ff0000") // Set the value of the colorpicker
            )

## Accessing an Existing ColorPicker

You can reference an existing ColorPicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/colorpicker#methods) to control its behavior.


### Accessing an existing ColorPicker instance

    //Put this after your Kendo ColorPicker for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the colorpicker is used to get its client-side instance
        var colorpicker = $("#colorpicker").data("kendoColorPicker");
    });
    </script>


## Handling Kendo UI ColorPicker events

You can subscribe to all [events](/api/web/colorpicker#events) exposed by Kendo UI ColorPicker:

### WebForms - subscribe by handler name

    <%: Html.Kendo().ColorPicker()
            .Name("colorpicker")
            .Events(e => e
                .Open("colorpicker_open")
                .Close("colorpicker_close")
                .Select("colorpicker_select")
                .Change("colorpicker_change")
            )
    %>
    <script>
        function colorpicker_open() {
            // Handle the open event
        }

        function colorpicker_close() {
            // Handle the close event
        }

        function colorpicker_select() {
            // Handle the select event
        }

        function colorpicker_change() {
            // Handle the change event
        }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Events(e => e
                .Open("colorpicker_open")
                .Close("colorpicker_close")
                .Select("colorpicker_select")
                .Change("colorpicker_change")
          )
    )
    <script>
        function colorpicker_open() {
            // Handle the open event
        }

        function colorpicker_close() {
            // Handle the close event
        }

        function colorpicker_select() {
            // Handle the select event
        }

        function colorpicker_change() {
            // Handle the change event
        }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Events(e => e
              .Open(@<text>
                function() {
                    // Handle the open event inline
                }
              </text>)
              .Close(@<text>
                function() {
                    // Handle the close event inline
                }
                </text>)
              .Select(@<text>
                function() {
                    // Handle the select event inline
                }
                </text>)
              .Change(@<text>
                function() {
                    // Handle the change event inline
                }
                </text>)
          )
    )


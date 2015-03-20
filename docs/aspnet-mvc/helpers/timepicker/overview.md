---
title: Overview
page_title: User Guide for TimePicker HtmlHelper | Kendo UI documentation
description: How to add TimePicker HtmlHelper extension and handle Kendo UI TimePicker events.
---

# TimePicker

The TimePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI TimePicker](/api/web/timepicker) widget.

## Getting Started

Here is how to configure a simple Kendo TimePicker:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a timepicker:
    - WebForms

            <%: Html.Kendo().TimePicker()
                    .Name("timepicker") //The name of the timepicker is mandatory. It specifies the "id" attribute of the widget.
                    .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set min time of the timepicker
                    .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set min date of the timepicker
                    .Value(DateTime.Now) //Set the value of the timepicker
            %>
    - Razor

            @(Html.Kendo().TimePicker()
                  .Name("timepicker") //The name of the timepicker is mandatory. It specifies the "id" attribute of the widget.
                  .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set min time of the timepicker
                  .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set min date of the timepicker
                  .Value(DateTime.Now) //Set the value of the timepicker
            )

## Accessing an Existing TimePicker

You can reference an existing TimePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/timepicker#methods) to control its behavior.

### Accessing an existing TimePicker instance

    //Put this after your Kendo TimePicker for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the timepicker is used to get its client-side instance
        var timepicker = $("#timepicker").data("kendoTimePicker");
    });
    </script>

## Handling Kendo UI TimePicker events

You can subscribe to all [events](/api/web/timepicker#events) exposed by Kendo UI TimePicker:

### WebForms - subscribe by handler name

    <%: Html.Kendo().TimePicker()
            .Name("timepicker")
            .Events(e => e
                .Open("timepicker_open")
                .Close("timepicker_close")
                .Change("timepicker_change")
            )
    %>
    <script>
    function timepicker_open() {
        //Handle the open event
    }

    function timepicker_close() {
        //Handle the close event
    }

    function timepicker_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().TimePicker()
          .Name("timepicker")
          .Events(e => e
                .Open("timepicker_open")
                .Close("timepicker_close")
                .Change("timepicker_change")
          )
    )
    <script>
    function timepicker_open() {
        //Handle the open event
    }

    function timepicker_close() {
        //Handle the close event
    }

    function timepicker_change() {
        //Handle the change event
    }
    </script>

### Razor - subscribe by template delegate

    @(Html.Kendo().TimePicker()
          .Name("timepicker")
          .Events(e => e
              .Open(@<text>
                function() {
                    //Handle the open event inline
                }
              </text>)
              .Change(@<text>
                function() {
                    //Handle the change event inline
                }
                </text>)
          )
    )

## Troubleshooting

### Display [DateTimeOffset](http://msdn.microsoft.com/en-us/library/system.datetimeoffset.aspx) value in widget
The TimePicker widget supports DateTime structure. You will need to convert DateTimeOffset into DatePicker in order to show time correctly.

### Client validation fails with invalid date
By default ASP.NET MVC project uses jQuery validate framework, which does not provide support for internationalized dates.
In other words, every string which [Date.parse](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse) cannot define as valid date will be reported as invalid. As extending open source libraries is beyond of our product,
you will need to resolve this issue manually - check this [link](http://www.dotnet-programming.com/post/2011/12/14/Globalization-Validation-and-DateNumber-Formats-in-AspNet-MVC.aspx) for more information.
You can also use [Kendo Validator](http://demos.telerik.com/kendo-ui/web/validator/index.html), which supports validating internationalized dates.

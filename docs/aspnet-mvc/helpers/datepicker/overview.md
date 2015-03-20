---
title: Overview
page_title: DatePicker HtmlHelper extension | Kendo UI documentation
description: How to add DatePicker HtmlHelper extension for Kendo UI DatePicker widget and operate values, access and existing server-side wrapper.
---

# DatePicker

The DatePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI DatePicker](/api/web/datepicker) widget.

## Getting Started

Here is how to configure a simple Kendo DatePicker:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a datepicker:
    - WebForms

            <%: Html.Kendo().DatePicker()
                .Name("datepicker") //The name of the datepicker is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(1900, 1, 1)) //Set min date of the datepicker
                .Max(new DateTime(2099, 12, 31)) //Set min date of the datepicker
                .Value(DateTime.Today) //Set the value of the datepicker
            %>
    - Razor

            @(Html.Kendo().DatePicker()
                .Name("datepicker") //The name of the datepicker is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(1900, 1, 1)) //Set min date of the datepicker
                .Max(new DateTime(2099, 12, 31)) //Set min date of the datepicker
                .Value(DateTime.Today) //Set the value of the datepicker
            )

## Accessing an Existing DatePicker

You can reference an existing DatePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/datepicker#methods) to control its behavior.


### Accessing an existing DatePicker instance

    //Put this after your Kendo DatePicker for ASP.NET MVC declaration
    <script>
    $(function() {
    // Notice that the Name() of the datepicker is used to get its client-side instance
    var datepicker = $("#datepicker").data("kendoDatePicker");
    });
    </script>


### Handling Kendo UI DatePicker events

You can subscribe to all [events](/api/web/datepicker#events) exposed by Kendo UI DatePicker:



### WebForms - subscribe by handler name

    <%: Html.Kendo().DatePicker()
        .Name("datepicker")
        .Events(e => e
            .Open("datepicker_open")
            .Close("datepicker_close")
            .Change("datepicker_change")
        )
    %>
    <script>
    function datepicker_open() {
        //Handle the open event
    }

    function datepicker_close() {
        //Handle the close event
    }

    function datepicker_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().DatePicker()
      .Name("datepicker")
      .Events(e => e
            .Open("datepicker_open")
            .Close("datepicker_close")
            .Change("datepicker_change")
      )
    )
    <script>
    function datepicker_open() {
        //Handle the open event
    }

    function datepicker_close() {
        //Handle the close event
    }

    function datepicker_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().DatePicker()
      .Name("datepicker")
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
The DatePicker widget supports only DateTime structure. You will need to convert DateTimeOffset into DatePicker in order to show date and time correctly.

### Client validation fails with invalid date
By default ASP.NET MVC project uses jQuery validate framework, which does not provide support for internationalized dates.
In other words, every string which [Date.parse](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse) cannot define as valid date will be reported as invalid. As extending open source libraries is beyond of our product,
you will need to resolve this issue manually - check this [link](http://www.dotnet-programming.com/post/2011/12/14/Globalization-Validation-and-DateNumber-Formats-in-AspNet-MVC.aspx) for more information.
You can also use [Kendo Validator](http://demos.telerik.com/kendo-ui/web/validator/index.html), which supports validating internationalized dates.

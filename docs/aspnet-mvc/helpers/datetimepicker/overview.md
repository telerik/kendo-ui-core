---
title: Overview
page_title: DateTimePicker HtmlHelper extension | Kendo UI documentation
description: Configure Kendo UI DateTimePicker for ASP.NET MVC widget, add DataTimePicker HtmlHelper extension and handle events.
---

# DateTimePicker

The DateTimePicker HtmlHelper extension is a server-side wrapper for the Kendo UI DateTimePicker widget.

## Getting Started

Here is how to configure a simple Kendo DateTimePicker:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a datetimepicker:
    - WebForms

            <%: Html.Kendo().DateTimePicker()
                .Name("datetimepicker") //The name of the datetimepicker is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set min time of the datetimepicker
                .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set min date of the datetimepicker
                .Value(DateTime.Now) //Set the value of the datetimepicker
            %>
    - Razor

            (Html.Kendo().DateTimePicker()
                .Name("datetimepicker") //The name of the datetimepicker is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set min time of the datetimepicker
                .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set min date of the datetimepicker
                .Value(DateTime.Now) //Set the value of the datetimepicker
            )

## Access an Existing DateTimePicker

You can reference an existing DateTimePicker instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the API to control its behavior.

### Access an Existing DateTimePicker Instance

    //Put this after your Kendo DateTimePicker for ASP.NET MVC declaration
    <script>
    $(function() {
    // Notice that the Name() of the datetimepicker is used to get its client-side instance
    var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
    });
    </script>


## Handle DateTimePicker Events

You can subscribe to all events exposed by Kendo UI DateTimePicker:

### WebForms - Subscribe by Handler Name

    <%: Html.Kendo().DateTimePicker()
        .Name("datetimepicker")
        .Events(e => e
            .Open("datetimepicker_open")
            .Close("datetimepicker_close")
            .Change("datetimepicker_change")
        )
    %>
    <script>
    function datetimepicker_open() {
        //Handle the open event
    }

    function datetimepicker_close() {
        //Handle the close event
    }

    function datetimepicker_change() {
        //Handle the change event
    }
    </script>

### Razor - Subscribe by Handler Name

    @(Html.Kendo().DateTimePicker()
      .Name("datetimepicker")
      .Events(e => e
            .Open("datetimepicker_open")
            .Close("datetimepicker_close")
            .Change("datetimepicker_change")
      )
    )
    <script>
    function datetimepicker_open() {
        //Handle the open event
    }

    function datetimepicker_close() {
        //Handle the close event
    }

    function datetimepicker_change() {
        //Handle the change event
    }
    </script>


### Razor - Subscribe by Template Delegate

    @(Html.Kendo().DateTimePicker()
      .Name("datetimepicker")
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
The DateTimePicker widget supports only DateTime structures. You will need to convert DateTimeOffset to DateTime in order to show date and time correctly.

### Client Validation Fails with Invalid Date
By default ASP.NET MVC project uses jQuery validate framework, which does not provide support for internationalized dates.
In other words, every string which [Date.parse](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse) cannot define as valid date will be reported as invalid. As extending open source libraries is beyond of our product,
you will need to resolve this issue manually - check this [link](http://www.dotnet-programming.com/post/2011/12/14/Globalization-Validation-and-DateNumber-Formats-in-AspNet-MVC.aspx) for more information.
You can also use [Kendo Validator](http://demos.telerik.com/kendo-ui/web/validator/index.html), which supports validating internationalized dates.

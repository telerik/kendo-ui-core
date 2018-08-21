---
title: Overview
page_title: NumericTextBox | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI NumericTextBox for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/numerictextbox
slug: htmlhelpers_numerictextbox_aspnetcore
position: 1
---

# NumericTextBox HtmlHelper Overview

The NumericTextBox HtmlHelper extension is a server-side wrapper for the [Kendo UI NumericTextBox](https://demos.telerik.com/kendo-ui/numerictextbox/index) widget.

For more information on the HtmlHelper, refer to the article on the [NumericTextBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/numerictextbox/overview).

## Configuration

The following example demonstrates the basic configuration for the NumericTextBox.

###### Example

```
    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox") //The name of the NumericTextBox is mandatory. It specifies the "id" attribute of the widget.
          .Min(-100) //Set the min value of the NumericTextBox.
          .Max(100) //Set the min value of the NumericTextBox.
          .Value(10) //Set the value of the NumericTextBox.
    )
```

## Event Handling

You can subscribe to all NumericTextBox [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox#events).

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
    @(Html.Kendo().NumericTextBox()
          .Name("numerictextbox")
          .Events(e => e
                .Change("numerictextbox_change")
                .Spin("numerictextbox_spin")
          )
    )
    <script>
    function numerictextbox_spin() {
        //Handle the spin event.
    }

    function numerictextbox_change() {
        //Handle the change event.
    }
    </script>
```

## Reference

### Existing Instances

To reference an existing Kendo UI NumericTextBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [NumericTextBox API](http://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox#methods) to control its behavior.

The following example demonstrates how to access an existing NumericTextBox instance.

###### Example

      //Put this after your Kendo UI NumericTextBox for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the NumericTextBox is used to get its client-side instance.
          var numerictextbox = $("#numerictextbox").data("kendoNumericTextBox");
      });
      </script>


## See Also

* [Overview of the Kendo UI NumericTextBox Widget](http://docs.telerik.com/kendo-ui/controls/editors/numerictextbox/overview)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})

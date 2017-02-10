---
title: Overview
page_title: Overview | Kendo UI Barcode HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Barcode widget for ASP.NET MVC."
slug: overview_barcodehelper_aspnetmvc
position: 1
---

# Barcode HtmlHelper Overview

The Barcode HtmlHelper extension is a server-side wrapper for the [Kendo UI Barcode](https://demos.telerik.com/kendo-ui/barcode/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Barcode.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a Barcode.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().Barcode()
                    .Name("barcode") //The name of the Barcode is mandatory. It specifies the "id" attribute of the widget.
                    .Value("foo") //Set the value of the Barcode.
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().Barcode()
                  .Name("barcode") //The name of the Barcode is mandatory. It specifies the "id" attribute of the widget.
                  .Value("foo") //Set the value of the Barcode.
            )
    ```

1. Choose the appropriate symbology (encoding) from the available options listed [here](../../../kendo-ui/api/javascript/dataviz/ui/barcode#configuration-type). Specify it through the Encoding method which accepts an `enum` value.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().Barcode()
                    .Name("barcode")
                    .Encoding(BarcodeSymbology.EAN13) //By default, Code39 encoding is used.
                    .Value("foo")
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().Barcode()
                  .Name("barcode")
                  .Encoding(BarcodeSymbology.EAN13) //By default, Code39 encoding is used.
                  .Value("foo")
            )
    ```

## Reference

### Existing Instances

To reference an existing Kendo UI Barcode instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Barcode API](../../../kendo-ui/api/javascript/dataviz/ui/barcode#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI Barcode for ASP.NET MVC declaration.
      <script>
      $(function() {
          //Notice that the Name() of the Barcode is used to get its client-side instance.
          var barcode = $("#barcode").data("kendoBarcode");
          barcode.value("foo") //make sure you supply valid value for that encoding then the barcode will redraw automatically
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Barcode:

* [ASP.NET MVC API Reference: BarCodeBuilder](/api/Kendo.Mvc.UI.Fluent/BarcodeBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Barcode Widget](http://docs.telerik.com/kendo-ui/controls/barcodes/barcode/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

---
title: Overview
page_title: Barcode Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Barcode HtmlHelper for ASP.NET MVC."
slug: overview_barcodehelper_aspnetmvc
position: 1
---

# Barcode HtmlHelper Overview

The Telerik UI Barcode HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Barcode widget.

The Barcode is used to represent data in a machine-readable format.

* [Demo page for the Barcode](https://demos.telerik.com/aspnet-mvc/barcode/index)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a Barcode.

    ```ASPX
        <%: Html.Kendo().Barcode()
                .Name("barcode") // The name of the Barcode is mandatory. It specifies the "id" attribute of the widget.
                .Value("foo") // Set the value of the Barcode.
        %>
    ```
    ```Razor
        @(Html.Kendo().Barcode()
                .Name("barcode") // The name of the Barcode is mandatory. It specifies the "id" attribute of the widget.
                .Value("foo") // Set the value of the Barcode.
        )
    ```

1. Choose the appropriate symbology (encoding) from the [available Kendo UI for jQuery API options](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode#configuration-type). Specify it through the `Encoding` method which accepts an `enum` value.

    ```ASPX
        <%: Html.Kendo().Barcode()
                .Name("barcode")
                .Encoding(BarcodeSymbology.EAN13) // By default, Code39 encoding is used.
                .Value("123456789123")
        %>
    ```
    ```Razor
        @(Html.Kendo().Barcode()
                .Name("barcode")
                .Encoding(BarcodeSymbology.EAN13) // By default, Code39 encoding is used.
                .Value("123456789123")
        )
    ```

## Referencing Existing Instances

To reference an existing Barcode instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Barcode client-side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/barcode) to control its behavior.

    // Place the following after the declaration of the Barcode for ASP.NET MVC.
    <script>
        $(function() {
            // The Name() of the Barcode is used to get its client-side instance.
            var barcode = $("#barcode").data("kendoBarcode");
            barcode.value("foo") // Supply a valid value for that encoding. Then, the Barcode will redraw automatically.
        });
    </script>

## See Also

* [Basic Usage of the Barcode HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/barcode/index)
* [Using the API of the Barcode HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/barcode/api)
* [Server-Side API](/api/barcode)

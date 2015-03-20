---
title: Html
page_title: HTML binding in Kendo UI MVVM | Kendo UI Documentation
description: HTML binding in Kendo UI MVVM, update and set the HTML of the target DOM element by changing the View-Model value.
---

# Html binding

The `html` binding sets the html content (`innerHTML`) of the target DOM
element to a View-Model value. Changing the View-Model value via code will update the html of the target element.
If the View-Model value is not of primitive type (Text, Number or Date) the result returned by the toString JavaScript method will be used as the value.

To set the value displayed by an input, textarea or select use the [value](value) binding instead.

## Using the html binding

    <span data-bind="html: name"></span>
    <script>
    var viewModel = kendo.observable({
        name: "John Doe"
    });

    kendo.bind($("span"), viewModel);
    </script>


The output will be this (the data-bind attribute is removed for clarity):

    <span>John Doe</span>


If the View-Model value contains HTML tags those will be embedded in the final output. For example this:

    <span data-bind="html: name"></span>
    <script>
    var viewModel = kendo.observable({
        name: "<strong>John Doe</strong>"
    });

    kendo.bind($("span"), viewModel);
    </script>


will output this:


    <span><strong>John Doe</strong></span>


To display any HTML tags contained in the View-Model value use the [text](text) binding.

### Note: the html binding may not work for some elements in older versions of Internet Explorer

The `html` binding relies on the `innerHTML` DOM element property. The latter is not fully supported in older versions of Internet Explorer for all
DOM elements. For example setting the `innerHTML` of a `table` is not supported.

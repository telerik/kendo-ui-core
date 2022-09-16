---
title: Fundamentals
page_title: Fundamentals
description: "Get started with Telerik UI for ASP.NET Core and learn the basics about the helpers."
slug: fundamentals_core
previous_url: /getting-started/helper-basics/fundamentals 
position: 1
---

# Fundamentals

Telerik UI for ASP.NET Core is a set of server-side wrappers (HTML and tag helpers) that allow you to use the Kendo UI widgets in .NET Core.

For more information on the difference between helpers and widgets, refer to the [Telerik UI for ASP.NET Core introduction article]({% slug overview_aspnetmvc6_aspnetmvc %}#widgets-vs-helpers).

As of the jQuery 3.0 release, the [document-ready handlers are called asynchronously](https://api.jquery.com/ready/). As a result, regardless of whether the document is ready at the point of execution or not, the code placed outside a document-ready handler is executed before the code within the handler. This change affects the usage of the Telerik UI for ASP.NET Core components because the widgets for the MVC helpers are initialized in a document-ready handler. This means that after the jQuery 3.0 release you need to get the reference of a widget and its API calls within a document-ready handler.

## Basic Configuration

### HTML Helpers

The HTML Helper options are exposed through a [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface).

![Applying the fluent interface](../../images/fluent-interface.png)

To set an option for a helper, call the corresponding method and pass the required option value.

    @(Html.Kendo().NumericTextBox()
          .Name("name") // Set the name of the NumericTextBox.
          .Value(10) // Set the value.
          .Spinners(false) // Disable the spinners.
    )

You have to set the `Name` option of the helper. The value will be used as the `id` and `name` HTML attributes&mdash;the `name` attribute is set only for input helpers such as the DatePicker, NumericTextBox, and DropDownList. The `id` attribute is used to initialize the helper. The id (`Name`) of a helper has to meet the requirements for valid HTML `ID` attributes. It must not contain spaces and special characters and has to start with a letter.

> The `Name` options of the helpers have to be always unique in the context of the whole web page. If a partial view is loaded multiple times, each instance of this partial view has to render all helpers with unique `Name` (id) options. If this requirement is not met, the page will render duplicate element IDs and only the helper instance which occurs first in the markup will be initialized and will work properly.

![A sample server-side wrapper name](../../images/wrapper-name.png)

Alternatively, you can use the `NumericTextBoxFor` setting. All Telerik UI helpers which accept a value can be initialized with the `[WidgetName]For` method. For example, to initialize the DatePicker, use `DatePickerFor`. These methods automatically set the `Name` of the helper. In this way, `@Html.Kendo().NumericTextBoxFor(model => model.Age)` is the same as `@Html.Kendo().NumericTextBox().Name("Age").Value(Model.Age)`.

### Tag Helpers

You can configure the Tag Helpers through the predefined strongly typed attributes which also provide IntelliSense. Complex and composite properties, as well as nested configuration tags, are not supported.

![Applying the TagHelper IntelliSense](../../images/TagHelper-IntelliSense.png)

To configure an ASP.NET Core project that enables you to use a Telerik UI Tag Helper, add the `@addTagHelper` directive to your `cshtml` file. Also, you can globally add the directive in `Views/_ViewImports.cshtml`.

        @addTagHelper "*, Kendo.Mvc"

Add the desired options as attributes and set their value.

```TagHelper
    <kendo-numerictextbox name="currency" //Ensure that the attribute `name` is unique in the context of the whole web page.
        format="c" min="0" spinners="false" enable="true" max="100" value="10">
    </kendo-numerictextbox>
```

When binding a Tag Helper editor to a Model property, use the attribute `for`. It will automatically set the `name` attribute to the name of the Model property.

```TagHelperFor
    <kendo-numerictextbox for="currency" format="c" min="0" spinners="false" max="200">
    </kendo-numerictextbox>
```

## Deferred Initialization

By default, the helpers output the widget initialization script immediately after the HTML markup of the widget. This scenario may not always be desired&mdash;for example, if the script files are registered at the bottom of the page or when you nest widgets.

To defer the initialization:

1. Call the `Deferred` method of the HTML helper or enable the `deferred` option of the Tag helper. This approach suppresses the immediate rendering of the script statement.

    ```HtmlHelper
        @(Html.Kendo().NumericTextBox()
            .Name("age")
            .Deferred()
        )
    ```
    ```TagHelper
        <kendo-numerictextbox name="age" deferred="true">
        </kendo-numerictextbox>
    ```

1. Call the `DeferredScripts` method. As a result, all previously deferred initialization statements are output.

          @Html.Kendo().DeferredScripts()

  The `DeferredScripts` method accepts a Boolean parameter which determines whether script elements will be automatically rendered. This behavior is useful for rendering the deferred initialization scripts inside existing script element.

          <script>
              @Html.Kendo().DeferredScripts(false)
          </script>

1. Render the deferred initialization script of a particular helper by using the `DeferredScriptsFor` method.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
        .Name("age")
        .Deferred()
    )

    <!-- other code -->
    @Html.Kendo().DeferredScriptsFor("age")
```
```TagHelper
    <kendo-numerictextbox name="age" deferred="true">
    </kendo-numerictextbox>

    <!-- other code -->
    @Html.Kendo().DeferredScriptsFor("age")
```

You can also use the `DeferredScriptsFor` method to suppress the output of `script` elements around the initialization script.

        <script>
        @Html.Kendo().DeferredScriptsFor("age", false)
        </script>

## Referencing Client-Side Objects

You can get a reference to the client-side object that is initialized by the helper through the [`data`](http://api.jquery.com/data/) jQuery method. Use the `Name` of the widget in an `ID` jQuery selector, and obtain the reference in a `document.ready` handler which is placed or called after the widget is declared. This ensures that the widget is already initialized and the client-side object exists. After you get the object reference, use the client-side API of the widget.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
        .Name("age")
    )
```
```TagHelper
    <kendo-numerictextbox name="age" value="10">
    </kendo-numerictextbox>
```
```script
    $(function(){
        var numeric = $("#age").data("kendoNumericTextBox");
        numeric.value(10);
    });

```

If you have deferred the initialization of the widget, make sure you get its instance after calling `DeferredScripts` or `DeferredScriptsFor`.

```HtmlHelper
    @(Html.Kendo().NumericTextBox()
        .Name("age")
        .Deferred()
    )

    .....

    @Html.Kendo().DeferredScripts()
```
```TagHelper
    <kendo-numerictextbox name="age" deferred="true">
    </kendo-numerictextbox>

    .....

    @Html.Kendo().DeferredScripts()
```
```script
    $(function(){
        var numeric = $("#age").data("kendoNumericTextBox");
        numeric.value(10);
    });

```

## Using Client Templates

### HTML Helpers

By default, every Telerik UI helper renders a script element with an initialization statement. If the helper declaration is placed inside a Kendo UI template, the nested script elements will be invalid. The `ToClientTemplate` method instructs the helper to escape its own script element so that it can be nested.

    <script id="template" type="text/x-kendo-template">
        @(Html.Kendo().NumericTextBox()
              .Name("age")
              .ToClientTemplate()
        )
    </script>
    <div id="container"></div>
    <script>
        $(function () {
           var template = kendo.template($("#template").html());
           $("#container").append( template ({}) );
        })
    </script>

### Tag Helpers

Тhe .NET framework ignores any Tag Helpers which are within script tags. In order to compile them correctly, when placing a Tag Helper within a Kendo Template, set the type to `text/html` and add the `is-in-client-template="true"` attribute.

The following example demonstrates how to include Chart TagHelpers in the TileLayout TagHelper.

        <!-- container chart templates -->
        <script id="downloads-template" type="text/html">
            <kendo-chart name="downloads" is-in-client-template="true">
                <series>
                    <series-item type="ChartSeriesType.Line" data="new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }">
                    </series-item>
                </series>
            </kendo-chart>
        </script>
        <script id="devices-template" type="text/html">
            <kendo-chart name="devices" is-in-client-template="true">
                <series>
                    <series-item type="ChartSeriesType.Donut" auto-fit="true" data='new dynamic[] {
                        new {category = "Asia",value = 30.8,color = "\\#006634"},
                        new {category = "Europe",value = 69.2,color = "\\#90cc38"}}'>
                    </series-item>
                </series>
            </kendo-chart>
        </script>
        <kendo-tilelayout name="tilelayout" columns="2" resizable="true" reorderable="true">
            <containers>
                <container body-template-id="downloads-template" col-span="1" row-span="1">
                    <container-header text="Weekly Recap-Downloads" />
                </container>
                <container body-template-id="devices-template" col-span="1" row-span="1">
                    <container-header text="Devices" />
                </container>
            </containers>
        </kendo-tilelayout>

## See Also

* [JSON Serialization]({% slug jsonserialization_core %})
* [Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview)

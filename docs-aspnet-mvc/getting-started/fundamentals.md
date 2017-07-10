---
title: Fundamentals
page_title: Fundamentals | Progress Telerik UI for ASP.NET MVC
description: "Download, install, and configure Progress Telerik UI for ASP.NET MVC."
slug: fundamentals_aspnetmvc
previous_url: /fundamentals
position: 2
---

# Fundamentals

Progress Telerik UI for ASP.NET MVC is a set of server-side wrappers.

## Overview of Server-Side Wrappers

A server-side wrapper:

* Allows you to configure a [Kendo UI widgets](../../kendo-ui/introduction) via the C# or VB.NET code&mdash;to set its value, data source, etc.
* Renders the HTML and JavaScript needed to initialize a Kendo UI widget. The widget options propagate to the client-side via the widget initialization script.

**Figure 1. Server-side wrapper HTML and JavaScript output**

![Server-side wrapper outputs HTML and JavaScript](/images/wrapper-output.png)

> **Important**
>
> As of the jQuery 3.0 release, the [document-ready handlers are called asynchronously](http://demos.telerik.com/kendo-ui/). As a result, the code placed outside a document-ready handler is executed before the code within the handler, regardless of whether the document is ready at the point of execution or not. This change affects the usage of the Telerik UI for ASP.NET MVC components, because the widgets for the MVC wrappers are initialized in a document-ready handler. This means that after the jQuery 3.0 release you need to get the reference of a widget and its API calls within a document-ready handler.

## Configuration

### HtmlHelper Extension Method

The Kendo UI [HtmlHelper](http://www.asp.net/mvc/overview/older-versions-1/views/creating-custom-html-helpers-cs) exposes all Kendo UI server-side wrappers.

**Figure 2. Kendo UI HtmlHelper extension method**

![Kendo HtmlHelper extension method](/images/kendo-extension.png)

### Widget Options

The widget options are exposed through a [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface).

**Figure 3. Application of fluent interface**

![Fluent interface](/images/fluent-interface.png)

To set an option, call the corresponding method and pass the required option value.

###### Example

    @(Html.Kendo().NumericTextBox()
          .Name("name") // set the name of the NumericTextBox
          .Value(10) //set the value
          .Spinners(false) // disable the spinners
    )

### Setting the Name

You have to set the `Name` option of a Kendo UI server-side wrapper. The value will be used as the `id` and `name` HTML attributes&mdash;the `name` HTML attribute is set only for input widgets such as the DatePicker, NumericTextBox, DropDownList, etc. The `id` HTML attribute is used to initialize the Kendo UI widget.

IDs (Names) of widgets should meet the requirements for valid HTML `ID` attributes. They should not contain spaces and special characters, and should start with a letter.

**Figure 4. An example of a server-side wrapper name**

![Wrapper name](/images/wrapper-name.png)

Alternatively, use `NumericTextBoxFor`. All Kendo UI server-side wrappers which accept a value can be initialized via a `[WidgetName]For` method. For example, `DatePicker` > `DatePickerFor`. These methods set the `Name` of the server-side wrapper automatically. Thus, `@Html.Kendo().NumericTextBoxFor(model => model.Age)` is the same as `@Html.Kendo().NumericTextBox().Name("Age").Value(Model.Age)`.

> **Important**
>
> The `Name` options of the widgets always have to be unique in the context of the whole web page. If a partial view is loaded multiple times, each instance of this partial view has to render all widgets with unique `Name` options (IDs). If you fail to meet this requirement, duplicate element IDs render on the page and only the widget instance which occurs first in the HTML markup initializes and works properly.

### Deferring Initialization

The server-side wrapper outputs the Kendo UI widget initialization script right after the widget HTML markup, which may not be always desired. For example, if the script files are registered at the bottom of the page, or when nesting Kendo UI widgets. To move initialization statements, follow the steps below.

1. Call the `Deferred` method of the wrapper. This suppresses the immediate script statement rendering.

    ###### Example

            @(Html.Kendo().NumericTextBox()
                  .Name("age")
                  .Deferred()
            )

1. Call the `DeferredScripts` method. This outputs all previously deferred initialization statements.

    ###### Example

            @Html.Kendo().DeferredScripts()

1. The `DeferredScripts` method accepts a Boolean parameter, which determines whether script elements should be rendered automatically. This is useful if you want to render the deferred initialization scripts inside existing script element.

    ###### Example

        <script>
            @Html.Kendo().DeferredScripts(false)
        </script>

1. Render the deferred initialization script of a particular widget via the `DeferredScriptsFor` method.

    ###### Example

        @(Html.Kendo().NumericTextBox()
              .Name("age")
              .Deferred()
        )
        <!-- other code -->
        @Html.Kendo().DeferredScriptsFor("age")

1. The `DeferredScriptsFor` method can also suppress the output of script elements around the initialization script.

    ###### Example

        <script>
        @Html.Kendo().DeferredScriptsFor("age", false)
        </script>

### Handling Events

To subscribe to the client-side events exposed by a Kendo UI widget, use the `Events` method.

1. Specify the name of the JavaScript function which will handle the event.

    ###### Example

            @(Html.Kendo().NumericTextBox()
                  .Name("age")
                  .Events(events =>
                      events.Change("age_change") // handle the "change" event
                            .Spin("age_spin")     // handle the "spin" event
                  )
            )

1. Declare the event handlers.

    ###### Example

            <script>
            function age_change(e) {
                // handle the event
            }
            function age_spin(e) {
                // handle the event
            }
            </script>

## Customization

### Client-Side Objects

You can get a reference to the client-side object initialized by the server-side wrapper via the [`data`](http://api.jquery.com/data/) jQuery method. Use the `Name` of the widget in an `ID` jQuery selector and obtain the reference in a `document.ready` handler, which is placed or called after the widget is declared. This ensures that the widget is already initialized and the client-side object exists. After you get the object reference, use the widget's client-side API.

###### Example

    @(Html.Kendo().NumericTextBox()
        .Name("age")
    )

    <script>
    $(function(){
        var numeric = $("#age").data("kendoNumericTextBox");
        numeric.value(10);
    });
    </script>

If you have deferred the initialization of the widget, make sure you get its instance after calling `DeferredScripts` or `DeferredScriptsFor`.

###### Example

    @(Html.Kendo().NumericTextBox()
        .Name("age")
        .Deferred()
    )

    .....

    @Html.Kendo().DeferredScripts()

    <script>
    $(function(){
        var numeric = $("#age").data("kendoNumericTextBox");
        numeric.value(10);
    });
    </script>

### Client Templates

By default, every Kendo UI MVC server-side wrapper renders a script element with an initialization statement. If the wrapper declaration is placed inside a Kendo UI template, this would lead to nested script elements which are invalid. The `ToClientTemplate` method instructs the widget wrapper to escape its own script element, so that it can be nested.

###### Example

    <script id="template" type="text/x-kendo-template">
        @(Html.Kendo().NumericTextBox()
              .Name("age").ToClientTemplate()
        )
    </script>
    <div id="container"></div>
    <script>
        $(function () {
           var template = kendo.template($("#template").html());
           $("#container").append( template ({}) );
        })
    </script>

### Form Rendering

If `Html.BeginForm()` or `Ajax.BeginForm()` should be included inside a Kendo UI widget `.Content()`. The correct way to do it is to use the `.Render();` helper method and wrap the widget declaration in a non-rendering code block. For example, `@{}` instead of `@()`. Otherwise, the form is rendered outside the widget and the form fields inside the widget are not submitted as expected.

The approach is required with widgets such as the Window, TabStrip, Splitter, and PanelBar. The approach is not required if the form is placed inside a partial view, which is loaded with Ajax via `.LoadContentFrom()`, or if a plain HTML `<form>` tag is used.

###### Example

    @{Html.Kendo().TabStrip()
        .Name("TabStrip1")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Tab 1")
                .Content(@<text>
                    @using (Ajax.BeginForm("...", "..."))
                    {
                        ...
                    }
                </text>);
        }).Render();
    }

## Bundling

The bundling technique is used to combine resources and improve the loading time by reducing the number of requests to the server. Bundling is disabled in development (debug configuration) by default.

### Enabling Bundling

There are 2 ways to enable bundling in development:

* Disable debugging by setting `debug="false"` in `web.config` within the compilation element.
* Set `BundleTable.EnableOptimizations=true` within the `RegisterBundles` static method. This overrides the `"debug"` value in `web.config`.

Note that bundling can cause problems with relative paths in stylesheets. For example, the **DejaVu** font included in the common stylesheet uses such a path. The solution is to rewrite the URLs to absolute ones using the `CssRewriteUrlTransform`, as shown below.

###### Example

```csharp
bundles.Add(new StyleBundle("~/Content/kendo/css")
    .Include("~/Content/web/kendo.common.min.css", new CssRewriteUrlTransform())
    .Include("~/Content/web/kendo.rtl.min.css", new CssRewriteUrlTransform())
    .Include("~/Content/web/kendo.default.min.css", new CssRewriteUrlTransform()));
```

For more details on the topic, refer to the [Bundling and Minification article](http://www.asp.net/mvc/overview/performance/bundling-and-minification).

### CSS Bundling

The ASP.NET bundling allows multiple stylesheets to be combined on the web server, so that the browser loads them as a single file.

> **Important**
>
> Internet Explorer versions 6-9 have various limitations with regard to the amount of CSS code. The ones that must be kept in mind when using CSS bundles are:
> * A stylesheet may contain up to 4095 CSS selectors.
> * A stylesheet may be up to 250KB in size.

Note that when using CSS bundling with the Kendo UI MVC server-side wrapper stylesheets, the virtual location of the bundle must match the physical location of the Kendo UI CSS files. This is because the image URLs in the Kendo UI themes are relative and the browser searches for the theme images depending on the virtual URL.

#### Sample Scenario

Imagine the following scenario:

* The Kendo UI theme CSS file is located in `~/Content/kendo/...VERSION.../kendo.default.min.css`.
* The images for the Kendo UI Default theme are located in `~/Content/kendo/...VERSION.../Default/`.
* The images in the Kendo UI Default theme CSS code are referenced like this: `"Default/sprite.png"`.
* The preferred StyleBundle virtual URL is `~/Content/kendo/css`.

#### Incorrect Approach

The above scenario will result in the following implementation, which is incorrect.

###### Example

    bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
        "~/Content/kendo/...VERSION.../kendo.common.min.css",
        "~/Content/kendo/...VERSION.../kendo.default.min.css"));

The specified virtual bundle URL will make the browser believe that it is registering a CSS file, which is named `css` and is located in the `~/Content/kendo/` folder. As a result, when the browser sees a `"Default/sprite.png"` image in the CSS code, it will make a request to `~/Content/kendo/Default/sprite.png`, but the image is not there.

#### Correct Approaches

The following implementation is correct and the theme images will be loaded successfully.

###### Example

    bundles.Add(new StyleBundle("~/Content/kendo/...VERSION.../css").Include(
        "~/Content/kendo/...VERSION.../kendo.common.min.css",
        "~/Content/kendo/...VERSION.../kendo.default.min.css"));

The following implementation is also correct, assuming that the Kendo UI Default theme images are located in the `~/Content/kendo/Default/` folder.

###### Example

    bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
        "~/Content/kendo/kendo.common.min.css",
        "~/Content/kendo/kendo.default.min.css"));

The above explanation and requirements are applicable to all stylesheets that use relative image URLs. This is not a limitation of Kendo UI. Theoretically, CSS files can use absolute image URLs, and then the virtual bundle URL can be random, but such an implementation is suitable only for custom tailor-made stylesheets, which are intended to work in a specific application.

## See Also

* [Progress Telerik UI for ASP.NET MVC Overview]({% slug overview_aspnetmvc %})
* [Progress Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Progress Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Use Progress Telerik UI for ASP.NET MVC in MVC 3 Applications]({% slug aspnetmvc3_aspnetmvc %})
* [Use Progress Telerik UI for ASP.NET MVC in MVC 4 Applications]({% slug aspnetmvc4_aspnetmvc %})
* [Use Progress Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug aspnetmvc5_aspnetmvc %})
* [Use Progress Telerik UI for ASP.NET Core](http://docs.telerik.com/aspnet-core/introduction)
* [Use Progress Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %})
* [Progress Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

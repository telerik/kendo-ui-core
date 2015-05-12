---
title: Fundamentals
page_title: Telerik UI for ASP.NET MVC Fundamentals
description: Kendo UI server-side wrappers, configuration, fluent interface, initialization
position: -1
---
# Telerik UI for ASP.NET MVC Fundamentals

## Server-side wrappers

Telerik UI for ASP.NET MVC is a set of server-side wrappers. A server-wrapper does the following.

* Allows the developer to configure a [Kendo UI](http://docs.telerik.com/kendo-ui/introduction) widget via C# or VB.NET code - set its value, data source etc.
* Renders the HTML and JavaScript needed to initialize the Kendo UI widget. The widget options propagate to the client-side via the widget initialization script.

![Server-side wrapper outputs HTML and JavaScript](/aspnet-mvc/images/wrapper-output.png)

## Configuration

### Kendo HtmlHelper extension method

The **Kendo** [HtmlHelper](http://www.asp.net/mvc/tutorials/older-versions/views/creating-custom-html-helpers-cs) exposes all Kendo UI server wrappers.

![Kendo HtmlHelper extension method](/aspnet-mvc/images/kendo-extension.png)

### Widget options

The widget options are exposed via [fluent interface](http://en.wikipedia.org/wiki/Fluent_interface).

![Fluent interface](/aspnet-mvc/images/fluent-interface.png)

To set an option call the corresponding method and pass the required option value.

    @(Html.Kendo().NumericTextBox()
          .Name("name") // set the name of the NumericTextBox
          .Value(10) //set the value
          .Spinners(false) // disable the spinners
    )

### Name

You must set the **Name** option of a Kendo UI server wrapper. The value will be used as the `id` and `name` HTML attributes (the `name` HTML attribute is set only for input widgets e.g. DatePicker, NumericTextBox, DropDownList, etc.).
The `id` HTML attribute is used to initialize the Kendo UI widget.

![Wrapper name](/aspnet-mvc/images/wrapper-name.png)

Alternatively you can use `NumericTextBoxFor`. All Kendo UI server wrappers which accept a value can be initialized via a [WidgetName]For method e.g. DatePicker -> DatePicker**For**.
Those methods set the **Name** of the server wrapper automatically. Thus `@Html.Kendo().NumericTextBoxFor(model => model.Age)` is the same as `@Html.Kendo().NumericTextBox().Name("Age").Value(Model.Age)`.

## Deferred initialization

The server-side wrapper outputs the Kendo UI widget initialization script right after the widget HTML markup. This may not be always desired, e.g. if the script files are registered at the bottom of the page,
or when nesting Kendo UI widgets. In order to move initialization statements, you can use the following approach.

1. Call the `Deferred` method of the wrapper. This will suppress the immediate script statement rendering.

        @(Html.Kendo().NumericTextBox()
              .Name("age")
              .Deferred()
        )

2. Call the `DeferredScripts` method. This will output all previously deferred initialization statements.

        @Html.Kendo().DeferredScripts()

The `DeferredScripts` method accepts a boolean parameter, which determines whether script elements should be rendered automatically.
This is useful if you want to render the deferred initialization scripts inside existing script element.

    <script>
        @Html.Kendo().DeferredScripts(false)
    </script>

You can render the deferred initialization script of a particular widget via the `DeferredScriptsFor` method.

    @(Html.Kendo().NumericTextBox()
          .Name("age")
          .Deferred()
    )
    <!-- other code -->
    @Html.Kendo().DeferredScriptsFor("age")

The `DeferredScriptsFor` method also can suppress the output of script elements around the initialization script.

    <script>
    @Html.Kendo().DeferredScriptsFor("age", false)
    </script>

## Events

To subscribe to the client-side events exposed by a Kendo UI widget use the **Events** method.

1. Specify the name of the JavaScript function which will handle the event.

        @(Html.Kendo().NumericTextBox()
              .Name("age")
              .Events(events =>
                  events.Change("age_change") // handle the "change" event
                        .Spin("age_spin")     // handle the "spin" event
              )
        )

2. Declare the event handlers.

        <script>
        function age_change(e) {
            // handle the event
        }
        function age_spin(e) {
            // handle the event
        }
        </script>

## Client-side object

You can get a reference to the client-side object initialized by the server-side wrapper via the [data](http://api.jquery.com/data/) jQuery method.
Use the `Name` of the widget in an **ID** jQuery selector and obtain the reference in a `document.ready` handler, which is placed or called **after the widget declaration**.
This will ensure that the widget is already initialized and the client-side object exists. After you get the object reference, you can use the widget's client-side API.

    @(Html.Kendo().NumericTextBox()
        .Name("age")
    )
    
    <script>
    $(function(){
        var numeric = $("#age").data("kendoNumericTextBox");
        numeric.value(10);
    });
    </script>

If you have deferred the initialization of the widget, make sure you get its instance **after** calling `DeferredScripts` or `DeferredScriptsFor`.

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

## Client Templates

By default every Kendo UI MVC server wrapper renders a script elements with an initialization statement. If the wrapper declaration is placed inside a Kendo UI template, this would lead to nested script elements which is invalid.
The `ToClientTemplate` method instructs the widget wrapper to escape its own script element, so that it can be nested.

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

## CSS Bundling

ASP.NET bundling allows multiple stylesheets to be combined on the web server, so that the browser loads them as a single file.

> Internet Explorer versions 6-9 have various limitations with regard to the amount of CSS code. Those, which must be kept in mind when using CSS bundles are:
>
> * a stylesheet may contain up to 4095 CSS selectors;
> * a stylesheet may be up to 250KB in size

When using CSS bundling with the Kendo UI MVC server wrappers stylesheets, the **virtual location of the bundle must match the physical location of the Kendo UI CSS files**.
This is because the image URLs in the Kendo UI themes are **relative** and the browser will search for the theme images depending on the virtual URL.

Imagine the following scenario:

* The Kendo UI theme CSS file is located in `~/Content/kendo/...VERSION.../kendo.default.min.css`.
* The images for the Kendo UI Default theme are located in `~/Content/kendo/...VERSION.../Default/`
* The images in the Kendo UI Default theme CSS code are referenced like this: `"Default/sprite.png"`
* The preferred StyleBundle virtual URL is `~/Content/kendo/css`.

The above scenario will result in the following implementation, which is **incorrect**.

    bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
        "~/Content/kendo/...VERSION.../kendo.common.min.css",
        "~/Content/kendo/...VERSION.../kendo.default.min.css"));

The specified virtual bundle URL will make the browser believe that it is registering a CSS file, which is named `css` and is located in the `~/Content/kendo/` folder.
As a result, when the browser sees a `"Default/sprite.png"` image in the CSS code, it will make a request to `~/Content/kendo/Default/sprite.png`, but the image is not there.

The following implementation is **correct** and the theme images will be loaded successfully.

    bundles.Add(new StyleBundle("~/Content/kendo/...VERSION.../css").Include(
        "~/Content/kendo/...VERSION.../kendo.common.min.css",
        "~/Content/kendo/...VERSION.../kendo.default.min.css"));

The following implementation is also **correct**, assuming that the Kendo UI Default theme images are located in folder `~/Content/kendo/Default/`:

    bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
        "~/Content/kendo/kendo.common.min.css",
        "~/Content/kendo/kendo.default.min.css"));

The above explanation and requirements are applicable to all stylesheets that use relative image URLs. This is not a limitation of Kendo UI.
Theoretically, CSS files can use absolute image URLs, and then the virtual bundle URL can be random, but such an implementation is suitable only
for custom tailor-made stylesheets, which are intended to work in a specific application.
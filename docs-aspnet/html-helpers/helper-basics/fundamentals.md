---
title: Fundamentals
page_title: Fundamentals
description: "Get started with Telerik UI for ASP.NET Core and learn the basics about the helpers."
slug: fundamentals_core
previous_url: /getting-started/helper-basics/fundamentals
position: 1
---

# Fundamentals

Telerik UI for ASP.NET Core is a set of server-side wrappers (HTML and tag helpers) that allow you to use the Kendo UI components in .NET Core.

For more information on the difference between helpers and components, refer to the [Telerik UI for ASP.NET Core introduction article]({% slug overview_aspnetmvc6_aspnetmvc %}#widgets-vs-helpers).

As of the jQuery 3.0 release, the [document-ready handlers are called asynchronously](https://api.jquery.com/ready/). As a result, regardless of whether the document is ready at the point of execution or not, the code placed outside a document-ready handler is executed before the code within the handler. This change affects the usage of the Telerik UI for ASP.NET Core components because the components for the MVC helpers are initialized in a document-ready handler. This means that after the jQuery 3.0 release you need to get the reference of a component and its API calls within a document-ready handler.

## Basic Configuration

Telerik UI for ASP.NET Core provides configuration options for setting the supported [HTML Helper](#html-helpers) and [Tag Helper](#tag-helpers) components.

### HTML Helpers

The HTML Helper options are exposed through a [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface).

![{{ site.product_short }} Applying the fluent interface](../../images/fluent-interface.png)

To set an option for a helper, call the corresponding method and pass the required option value.

    @(Html.Kendo().NumericTextBox()
          .Name("name") // Set the name of the NumericTextBox.
          .Value(10) // Set the value.
          .Spinners(false) // Disable the spinners.
    )

You have to set the `Name` option of the helper. The value will be used as the `id` and `name` HTML attributes&mdash;the `name` attribute is set only for input helpers such as the DatePicker, NumericTextBox, and DropDownList. The `id` attribute is used to initialize the helper. The id (`Name`) of a helper has to meet the requirements for valid HTML `ID` attributes. It must not contain spaces and special characters and has to start with a letter.

> The `Name` options of the helpers have to be always unique in the context of the whole web page. If a partial view is loaded multiple times, each instance of this partial view has to render all helpers with unique `Name` (id) options. If this requirement is not met, the page will render duplicate element IDs and only the helper instance which occurs first in the markup will be initialized and will work properly.

![{{ site.product_short }} A sample server-side wrapper name](../../images/wrapper-name.png)

Alternatively, you can use the `NumericTextBoxFor` setting. All Telerik UI helpers which accept a value can be initialized with the `[WidgetName]For` method. For example, to initialize the DatePicker, use `DatePickerFor`. These methods automatically set the `Name` of the helper. In this way, `@Html.Kendo().NumericTextBoxFor(model => model.Age)` is the same as `@Html.Kendo().NumericTextBox().Name("Age").Value(Model.Age)`.

### Tag Helpers

You can configure the Tag Helpers through the predefined strongly typed attributes which also provide IntelliSense. Complex and composite properties, as well as nested configuration tags, are not supported.

![{{ site.product_short }} Applying the TagHelper IntelliSense](../../images/TagHelper-IntelliSense.png)

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

By default, the helpers output the initialization script of the component immediately after its HTML markup. This scenario may not always be desired&mdash;for example, if the script files are registered at the bottom of the page, or when you nest components.

To defer the initialization script, apply either of the following approaches:

 * [Defer only certain components](#deferring-specific-components)
 * [Defer all components globally](#deferring-components-globally)

### Deferring Specific Components

> Avoid deferring child components such as editors, components initialized inside client templates, or inside ([inline or external Kendo UI templates](https://docs.telerik.com/kendo-ui/framework/templates/overview)). Otherwise, the initialization script of each child component will appear outside the parent component.

To defer individual components:

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

1. Serialize the component initialization script by using any of the following methods:

* Call the `DeferredScripts` method. As a result, all previously deferred initialization statements will be output as an inline script.

          @Html.Kendo().DeferredScripts()

  The `DeferredScripts` method accepts a `Boolean` parameter which determines whether script elements will be automatically rendered. This behavior is useful for rendering the deferred initialization scripts inside the existing script element.

        <script>
            @Html.Kendo().DeferredScripts(false)
        </script>

    To render the deferred initialization script of a particular helper, use the `DeferredScriptsFor` method.

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

* Use the `DeferredScriptFile` method to serialize the deferred initialization script to a file. The method simulates loading the initialization scripts as a `JS` file through a middleware. To use this feature, enable the required settings described in the [deferring components globally section](#deferring-components-globally).
 

          @Html.Kendo().DeferredScriptFile()


### Deferring Components Globally

As of the R1 2023 SP1 release, you can configure a global option to defer the initialization scripts of all components in your application and avoid setting the deferred option for every component.

To defer components globally:

1. Enable the `DeferToScriptFiles` setting in the `AddKendo` method that registers the Kendo UI service.

 * For applications using .NET 6 or later and the [minimal hosting model](https://docs.microsoft.com/en-us/aspnet/core/migration/50-to-60?view=aspnetcore-6.0&tabs=visual-studio#new-hosting-model), the `AddKendo` method is defined in the `Program.cs` file.

	```
	var builder = WebApplication.CreateBuilder(args);

	builder.Services.AddKendo(x =>
    {
        x.DeferToScriptFiles = true;
    });
	```

 * For applications using .NET 5 or earlier, the `AddKendo` method is defined in the `ConfigureServices` method in the `Startup.cs` file.

	```
	public void ConfigureServices(IServiceCollection services)
	{
		services.AddKendo(x =>
        {
            x.DeferToScriptFiles = true;
        });
	}
	```

1. Set the `KendoDefferedScriptsMiddleware` middleware. After the compilation of the views, all scripts are stored in the memory cache. When the browser requests the dynamic `js` file, this middleware handles the request and returns the cached scripts.

    ```
        app.UseMiddleware<KendoDeferredScriptsMiddleware>();
    ```

1. Serialize the script tag into a file by adding `@(Html.Kendo().DeferredScriptFile())` after all components HtmlHelper or TagHelper declarations. Any components registered after it will not be included in the script.

    Alternatively, call the `DeferredScripts` method to format the components scripts as inline script.

    ```Serialization_to_file
        @(Html.Kendo().DeferredScriptFile())
    ```
    ```Serialization_to_inline_script
        @Html.Kendo().DeferredScripts()
    ```

## Referencing Client-Side Objects

You can get a reference to the client-side object that is initialized by the helper through the [`data`](http://api.jquery.com/data/) jQuery method. Use the `Name` of the component in an `ID` jQuery selector, and obtain the reference in a `document.ready` handler which is placed or called after the component is declared. This ensures that the component is already initialized and the client-side object exists. After you get the object reference, use the client-side API of the component.

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

If you have deferred the initialization of the component, make sure you get its instance after calling `DeferredScripts`, `DeferredScriptsFor` or `DeferredScriptFile`.

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

## See Also

* [Using Client Templates]({% slug client_templates_overview %})
* [JSON Serialization]({% slug jsonserialization_core %})
* [Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview)

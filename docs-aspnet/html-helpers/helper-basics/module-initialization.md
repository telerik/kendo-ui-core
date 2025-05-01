---
title: Module Initialization
page_title: Module Initialization
description: "Learn how to enable the module initialization of the Telerik UI for {{ site.framework }} components."
slug: module_initialization_overview
position: 4
---

# Module Initialization

As of the 2024 Q4, the {{ site.product }} components allow you to initialize them as ECMAScript modules.

ECMAScript Modules (ESM) is a type of [specification](https://tc39.es/ecma262/#sec-modules) that enables you to load JavaScript resources in a modular manner. JavaScript modules enable you to have one single file as a script reference. And use `import` and `export` statements to dynamically load all other dependencies. The specification is a proponent for writing modular code in the modern Web world. 

More information about the ECMAScript Modules peculiarities in context of the Kendo UI source code is available here:
[ECMAScript Modules]({% slug core_ecmascript_overview %})

## Initializing Components as Modules

To initialize the Telerik UI for {{ site.framework }} components as JavaScript modules, apply either of the following approaches:

 * [Initialize specific components as modules](#initializing-specific-components-as-modules)
 * [Initialize components globally as modules](#initializing-components-globally-as-modules)

### Initializing Specific Components as Modules

To initialize specific components as modules, use the `AsModule()` configuration method.

```HtmlHelper
        @(Html.Kendo().Button()
            .Name("primaryTextButton")
            .Content("Primary Button")
            .AsModule(true)
        ) 
```

{% if site.core %}
```TagHelper
        <kendo-button name="primaryTextButton" 
                      as-module="true">
            Primary Button
        </kendo-button>
```
{% endif %}

### Initializing Components Globally as Modules

To initialize components globally as modules:

{% if site.core %}

Enable the `RenderAsModule` setting in the `AddKendo` method that registers the Kendo UI service.

 * For applications using .NET 6 or later and the [minimal hosting model](https://docs.microsoft.com/en-us/aspnet/core/migration/50-to-60?view=aspnetcore-6.0&tabs=visual-studio#new-hosting-model), the `AddKendo` method is defined in the `Program.cs` file.

	```C#
	var builder = WebApplication.CreateBuilder(args);

	builder.Services.AddKendo(options =>
    {
        options.RenderAsModule = true;
    });
	```

 * For applications using .NET 5 or earlier, the `AddKendo` method is defined in the `ConfigureServices` method in the `Startup.cs` file.

	```C#
	public void ConfigureServices(IServiceCollection services)
	{
		services.AddKendo(options =>
        {
            options.RenderAsModule = true;
        });
	}
	```
{% else %}
Enable the `RenderAsModule` setting in the `KendoMvc.Setup` method that registers the Kendo UI service within the `Global.asax.cs` file:

```Razor
    KendoMvc.Setup(options =>
    {
        options.RenderAsModule = true;
    });
```
{% endif %}


## Deferring Components as Modules


To defer the initialization script of the Telerik UI for {{ site.framework }} components as JavaScript modules, apply either of the following approaches:

 * [Deferring only specific components as a module](#deferring-specific-components-as-a-module)
 * [Deferring all components globally as modules](#deferring-components-globally-as-modules)

### Deferring Specific Components as a Module

To [defer specific components](https://docs.telerik.com/{{ site.platform }}/html-helpers/helper-basics/deferred-initialization#deferring-specific-components) as a module, use the additional `renderAsModule` method argument.

> The `renderScriptTags` method argument should be explicitly set to `true`.

```HtmlHelper
    @(Html.Kendo().Button()
            .Name("primaryTextButton")
            .Content("Primary Button")
            .Deferred()
    ) 

    @(Html.Kendo().DeferredScripts(renderScriptTags: true,renderAsModule: true))
```

{% if site.core %}
```TagHelper
        <kendo-button name="primaryTextButton">
            Primary Button
        </kendo-button>

        @(Html.Kendo().DeferredScripts(renderScriptTags: true,renderAsModule: true))
```
{% endif %}

To render the deferred initialization script of a particular helper, use the `DeferredScriptsFor()` method.

```HtmlHelper
    @(Html.Kendo().Button()
          .Name("primaryTextButton")
          .Deferred()
    )

   @(Html.Kendo().DeferredScriptsFor(name: "primaryTextButton",
   renderScriptTags:true, renderAsModule: true))
```

{% if site.core %}
```TagHelper
   <kendo-button name="primaryTextButton" deferred="true">
         Primary Button
   </kendo-button>

   @(Html.Kendo().DeferredScriptsFor(name: "primaryTextButton",
   renderScriptTags:true, renderAsModule: true))
```
{% endif %}

### Deferring Components Globally as Modules

 To [defer components globally](https://docs.telerik.com/{{ site.platform }}/html-helpers/helper-basics/deferred-initialization#deferring-components-globally), use the additional `renderAsModule` method argument.

```HtmlHelper
        @(Html.Kendo().Button()
                .Name("component1")
                .Content("Component 1")
        ) 

        @(Html.Kendo().Button()
                .Name("component2")
                .Content("Component 2")
        ) 

        @(Html.Kendo().Button()
                .Name("component3")
                .Content("Component 3")
        ) 

        @(Html.Kendo().DeferredScriptFile(renderAsModule: true))
```

{% if site.core %}
```TagHelper
    <kendo-button name="component1">
        Component 1
    </kendo-button>

    <kendo-button name="component2">
        Component 2
    </kendo-button>

    <kendo-button name="component3">
        Component 3
    </kendo-button>

    @(Html.Kendo().DeferredScriptFile(renderAsModule: true))
```
{% endif %}

## Using Script Attributes

As of 2024 Q4, the {{ site.product }} components allow you to supplement attributes to the initialization script of the component. By using the `ScriptAttributes()` configuration method.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("primaryTextButton")
        .Content("Primary Button")
        .ScriptAttributes(new { type = "module" })
    ) 
```

{% if site.core %}
```TagHelper
    @{
        var scriptAttributes = new Dictionary<string, object>() 
        {
            {"type", "module"}
        };
    }

    <kendo-button name="primaryTextButton" 
                  script-attributes="@scriptAttributes">
        Primary Button
    </kendo-button>
```
{% endif %}


If both the `AsModule()` and `ScriptAttributes()` configuration methods are utilized, the `type` attribute will be predominantly taken from the `AsModule()` configuration. In cases where this behavior needs to be overriden, use the additional `overrideAttributes` boolean argument for the `ScriptAttributes()` configuration&mdash;Applicable for the HTML Helper only.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("BNT")
        .AsModule(true)
        .ScriptAttributes(new { type = "text/javascript"}, true)
    )
```

## See Also

* [Content Security Policy]({% slug troubleshooting_content_security_policy_aspnetmvc%})
{% if site.core %}
* [Declarative Initialization]({% slug declarative_initialization_overview %})
{% endif %}
* [Using Client Templates]({% slug client_templates_overview %})
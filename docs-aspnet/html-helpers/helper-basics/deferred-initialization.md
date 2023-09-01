---
title: Deferred Initialization
page_title: Deferred Initialization
description: "Learn how to defer the initialization scripts of the Telerik UI for {{ site.framework }} components."
slug: deferred_initialization_overview
position: 2
---

# Deferred Initialization

By default, the helpers output the initialization script of the component immediately after its `HTML` markup. This scenario may not always be desired&mdash;for example, if the script files are registered at the bottom of the page, when you nest components, or when the [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is enabled.

The following example illustrates how the initialization script of a [Button]({% slug htmlhelpers_button_aspnetcore %}) component is generated after its `HTML` markup:

* Button declaration

    ```HtmlHelper
        @(Html.Kendo().Button()
            .Name("primaryTextButton")
            .ThemeColor(ThemeColor.Primary)
            .Content("Primary Button")
        ) 
    ```
    {% if site.core %}
    ```TagHelper
         <kendo-button name="primaryTextButton" theme-color="ThemeColor.Primary">
            Primary Button
        </kendo-button>
    ```
    {% endif %}

* Generated HTML markup and initialization script

    ```
        <button id="primaryTextButton" name="primaryTextButton" data-role="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" type="button" role="button" aria-disabled="false" tabindex="0"><span class="k-button-text">Primary Button</span></button>
        <script>kendo.syncReady(function(){jQuery("#primaryTextButton").kendoButton({"themeColor":"primary"});});</script>
    ```

To defer the initialization script of the Telerik UI for {{ site.framework }} components in the application, apply either of the following approaches:

 * [Defer only specific components](#deferring-specific-components)
 * [Defer all components globally](#deferring-components-globally)
 * [Defer dynamically loaded components](#deferring-dynamically-loaded-components)

## Deferring Specific Components

To defer individual components:

1. Add the `Deferred()` method of the HTML helper {% if site.core %}or enable the `deferred` attribute of the Tag helper{% endif %}. This option suppresses the immediate rendering of the `<script>` tag after the `HTML` of the component.

    ```HtmlHelper
        @(Html.Kendo().NumericTextBox()
            .Name("age")
            .Deferred()
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-numerictextbox name="age" deferred="true">
        </kendo-numerictextbox>
    ```
    {% endif %}

> Avoid deferring child components such as editors, components initialized inside [client templates]({% slug client_templates_overview %}), or inside ([inline or external Kendo UI templates](https://docs.telerik.com/kendo-ui/framework/templates/overview)). Otherwise, the initialization script of each child component will appear outside the parent component.

1. Serialize the component initialization script by using any of the following methods:

* Call the `DeferredScripts` method. As a result, all previously deferred initialization statements will be output as an inline script.

          @Html.Kendo().DeferredScripts()

  The `DeferredScripts` method accepts a `Boolean` parameter which determines whether the `script` elements will be automatically rendered. This behavior is useful for rendering the deferred initialization scripts inside an existing `script` element.

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
    {% if site.core %}
    ```TagHelper
        <kendo-numerictextbox name="age" deferred="true">
        </kendo-numerictextbox>

        <!-- other code -->
        @Html.Kendo().DeferredScriptsFor("age")
    ```
    {% endif %}

    You can also use the `DeferredScriptsFor` method to suppress the `script` element that wraps the initialization script.

        <script>
            @Html.Kendo().DeferredScriptsFor("age", false)
        </script>


## Deferring Components Globally

As of the R1 2023 SP1 release, you can configure a global option to defer the initialization scripts of all components in your application and avoid setting the deferred option for every component. This method simulates loading the initialization scripts as a `JS` file through {% if site.core %}a middleware{% else %}an `HttpModule`{% endif %}.

To defer components globally:

{% if site.core %}
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

{% else %}

1. Enable the `DeferToScriptFiles` setting in the `Global.asax.cs` file.

    ```
        KendoMvc.Setup(x =>
        {
            x.DeferToScriptFiles = true;
        });
    ```

1. Configure a `HttpModule` in the `Web.config` file that returns the cached scripts when the browser request them.

    ```
    <configuration>
        ...
        <system.webServer>
            <modules>
                <add name="KendoDeferredScriptsModule" type="Kendo.Mvc.KendoDeferredScriptsModule"  />
            </modules>
        </system.webServer>
        ...
    </configuration>
    ```

1. Serialize the script tag into a file by adding `@(Html.Kendo().DeferredScriptFile())` after all components declarations. 
Any components registered after it will not be included in the script.

    Alternatively, call the `DeferredScripts` method to format the components scripts as inline script.

    ```Serialization_to_file
        @(Html.Kendo().DeferredScriptFile())
    ```
    ```Serialization_to_inline_script
        @Html.Kendo().DeferredScripts()
    ```

{% endif %}

## Deferring Dynamically Loaded Components

When deferring the components globally and calling the `DeferredScriptFile()` method, the simulated `JS` file stores the initialization scripts of the components that are defined in the currently loaded View.

The following example shows the content of the generated `JS` file when the loaded page contains only a [TabStrip]({% slug htmlhelpers_tabstrip_aspnetcore %}) component with two tabs. The content of the second tab loads from a Partial View.

```Index.cshtml
    @{
        ViewData["Title"] = "Home Page";
    }

    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Engine").Selected(true)
            .Content("Engine information");

            tabstrip.Add().Text("Dimensions & Weights")
                .LoadContentFrom(@Url.Action("Details", "Home"));
        })
    ) 
```
{% if site.core %}
```Index.cshtml_TagHelper
    @{
        ViewData["Title"] = "Home Page";
    }

    @addTagHelper *, Kendo.Mvc

    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item text="Engine" selected="true">
                <content>Engine information</content>
            </tabstrip-item>
            <tabstrip-item text="Dimensions & Weights" content-url=@Url.Action("Details", "Home")>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}
```HomeController.cs
    public class HomeController : Controller
    {
        public ActionResult Details()
        {
            return PartialView();
        }
    }
```
```Details.cshtml
    Partial View Content
```
```kendo-deferred-scripts-XXX.js
    kendo.syncReady(function() {
        jQuery("#tabstrip").kendoTabStrip({
            "contentUrls": ["", "/Home/Details"]
        });
    });
```

According to this example, if the Partial View that is returned by the `Details` Action contains Telerik UI for {{ site.framework }} components, they will not be initialized because their initialization scripts are not included in the simulated `kendo-deferred-scripts-XXX.js` file. To overcome this behavior, you need to call the `DeferredScriptFile()` method in the Partial View after all components declarations. As a result, their initialization scripts will be stored in an external `JS` file, which will load 
with the Partial View.

The following example demonstrates how to load a [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) in a TabStrip item through a Partial View when the global deferred initialization is enabled.

```Index.cshtml
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Engine").Selected(true)
            .Content("Engine information");

            tabstrip.Add().Text("Dimensions & Weights")
                .LoadContentFrom(@Url.Action("Details", "Home"));
        })
    ) 
```
{% if site.core %}
```Index.cshtml_TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item text="Engine" selected="true">
                <content>Engine information</content>
            </tabstrip-item>
            <tabstrip-item text="Dimensions & Weights" content-url=@Url.Action("Details", "Home")>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}
```HomeController.cs
    public class HomeController : Controller
    {
        public ActionResult Details()
        {
            return PartialView();
        }
    }
```
```Details.cshtml
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.OrderID);
            columns.Bound(c => c.ShipName);
            columns.Bound(c => c.OrderDate).Format("{0:MM/dd/yyyy}").Width(150);
        })
        .HtmlAttributes(new { style = "height:400px;" })
        .Scrollable()
        .Pageable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Read", "Grid"))
        )
    )

    @(Html.Kendo().DeferredScriptFile())

```
{% if site.core %}
```Details.cshtml_TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" height="400">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema>
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number"></field>
                        <field name="OrderDate" type="date"></field>
                        <field name="ShipName" type="string"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Read","Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="OrderID"/>
            <column field="ShipName"/>
            <column field="OrderDate" width="150" format="{0:MM/dd/yyyy}"/>
        </columns>
        <pageable enabled="true"/>
        <scrollable enabled="true"/>
    </kendo-grid>

    @(Html.Kendo().DeferredScriptFile())
```
{% endif %}

When the Content Security Policy (CSP) is enabled, you need to use a [nonce-source](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#unsafe_inline_script) when loading components dynamically, for example, through Partial Views, or inside Windows or Dialogs. 

The `DeferredScriptFile()` method accepts a nonce, so you can call the method with the respective nonce value. Thereby, the CSP will allow the inline `<script>` tag that loads the external script file, which contains the initialization scripts of the components from the Partial View.

> As of the R2 2023 SP1, the `DeferredScriptFile()` method supports nonce.


```PartialView
    @(Html.Kendo().DeferredScriptFile("Telerik-CSP-Example"))
```
```_Layout.cshtml
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'nonce-Telerik-CSP-Example' https://kendo.cdn.telerik.com;" />
```

The following example showcases how to load a [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) in a TabStrip item through a Partial View when the CSP is enabled.

```Index.cshtml
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Engine").Selected(true)
            .Content("Engine information");

            tabstrip.Add().Text("Dimensions & Weights")
                .LoadContentFrom(@Url.Action("Details", "Home"));
        })
    ) 
```
{% if site.core %}
```Index.cshtml_TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-tabstrip name="tabstrip">
        <items>
            <tabstrip-item text="Engine" selected="true">
                <content>Engine information</content>
            </tabstrip-item>
            <tabstrip-item text="Dimensions & Weights" content-url=@Url.Action("Details", "Home")>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}
```HomeController.cs
    public class HomeController : Controller
    {
        public ActionResult Details()
        {
            return PartialView();
        }
    }
```
```Details.cshtml
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.OrderID);
            columns.Bound(c => c.ShipName);
            columns.Bound(c => c.OrderDate).Format("{0:MM/dd/yyyy}").Width(150);
        })
        .HtmlAttributes(new { style = "height:400px;" })
        .Scrollable()
        .Pageable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Read", "Grid"))
        )
    )

    @(Html.Kendo().DeferredScriptFile("Telerik-CSP-Example"))

```
{% if site.core %}
```Details.cshtml_TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" height="400">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema>
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number"></field>
                        <field name="OrderDate" type="date"></field>
                        <field name="ShipName" type="string"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Read","Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="OrderID"/>
            <column field="ShipName"/>
            <column field="OrderDate" width="150" format="{0:MM/dd/yyyy}"/>
        </columns>
        <pageable enabled="true"/>
        <scrollable enabled="true"/>
    </kendo-grid>

    @(Html.Kendo().DeferredScriptFile("Telerik-CSP-Example"))
```
{% endif %}


## See Also

* [Content Security Policy]({% slug troubleshooting_content_security_policy_aspnetmvc%})
* [Using Client Templates]({% slug client_templates_overview %})





---
title: Content Security Policy
page_title: Content Security Policy Troubleshooting
description: "Learn more about the Content Security Policy (CSP) mode and how to work with it in Telerik UI for {{ site.framework }} controls."
components: ["general"]
slug: troubleshooting_content_security_policy_aspnetmvc
previous_url: /troubleshoot/troubleshooting-content-security-policy
position: 10
---

# Content Security Policy

[Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is a supplementary security approach which helps you prevent specific security attacks such as Cross-Site Scripting (XSS) and data-injections.

The following code shows how to turn on the strict CSP mode:

 ```HTML
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self'; script-src 'self' https://kendo.cdn.telerik.com https://code.jquery.com/; style-src 'self' https://kendo.cdn.telerik.com;" />
 ```

If the strict CSP mode is enabled, some browser features are disabled by default:

* Inline JavaScript and CSS, such as `<script></script>`, `<style></style>`, or DOM event attributes, such as `onclick`, are blocked. All JavaScript and CSS code must live in separate files that are served from the allow-listed domain.

* Dynamic code evaluation through `eval()` and string arguments for both `setTimeout` and `setInterval` are blocked.

## Telerik UI for {{ site.framework }} 2024 Q4 and Later

Starting with 2024 Q4 release, all Telerik UI for {{ site.framework }} components are CSP compliant. 

## Telerik UI for {{ site.framework }} Versions between R1 2023 and 2024 Q4

As of R1 2023 release, the Kendo UI scripts address the `unsafe-eval` directive for all components except for the [Spreadsheet](https://docs.telerik.com/kendo-ui/controls/spreadsheet/overview).

The rest of the Kendo UI components and internal mechanisms have been rewritten to discard the usage of the `eval()` and `new Function()` calls.

## Achieving CSP Compliance with the Helpers

{% if site.core %}

When Kendo UI components are initialized from HTML helpers or Tag Helpers, inline scripts are generated automatically after each component HTML markup. When the CSP is enabled, you will get the following error:
`Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com.`

{% else %}

When Kendo UI components are initialized from HTML helpers, inline scripts are generated automatically after each component HTML markup. When the CSP is enabled, you will get the following error: `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com.`

{% endif %}

To resolve the issue and prevent the components from being dependent on the `unsafe-eval` directive, use the following approaches:

 * [Deferring scripts to file](#deferring-scripts-to-file)
 {% if site.core %}
 * [Using declarative initialization](#using-declarative-initialization)
 {% endif %}
 * [Creating Content Security Policy templates](#creating-content-security-policy-templates)

### Deferring Scripts to File

{% if site.core %}

The `DeferredScriptFile` method simulates loading the initialization scripts as a `JS` file through `middleware` to ensure strict CSP compliance. You can either use the [global deferred initialization functionality]({% slug deferred_initialization_overview%}#deferring-components-globally) to configure all Telerik UI for ASP.NET Core components as deferred globally or [defer each component separately]({% slug deferred_initialization_overview%}#deferring-specific-components) by using the `Deferred` method.

{% else %}

The `DeferredScriptFile` method simulates loading the initialization scripts as a `JS` file through a `HttpModule` to ensure strict CSP compliance. You can either use the [global deferred initialization functionality]({% slug deferred_initialization_overview%}#deferring-components-globally) to configure all Telerik UI for ASP.NET MVC components as deferred globally or [defer each component separately]({% slug deferred_initialization_overview%}#deferring-specific-components) by using the `Deferred` method.

{% endif %}

{% if site.core %}
### Using Declarative Initialization

The 2024 Q3 release introduces the declarative initialization functionality that serializes the helper declaration as an MVVM configuration and initializes the component from the DOM elements on the client. When this feature is enabled, the inline initialization script, which is blocked by the CSP, is not generated after the component's HTML markup.

At this stage, only some of the components support the declarative initialization feature. For more information, refer to the [declarative initialization documentation]({% slug declarative_initialization_overview %}).

{% endif %}

### Creating Content Security Policy Templates

Most of the components support templating options, which use the [Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview), for example, [Grid templates]({% slug htmlhelpers_grid_aspnetcore_templates_overview %}), [DropDownList templates]({% slug htmlhelpers_dropdownlist_templates_aspnetcore %}), and more. To remove the `unsafe-eval` keyword from the `meta` tag of your Telerik UI for {{ site.framework }} application, you must convert the client templates of all components into CSP-compatible templates. For more information on the CSP-compatible templates, [refer to the CSP-compatible templates section]({% slug client_templates_overview %}#content-security-policy-csp-templates).

The example below demonstrates how to use the [Template component]({% slug htmlhelpers_overview_template %}) to define a CSP-compatible [client detail template of a Grid]({% slug clientdetailtemplate_grid_aspnetcore %}).

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(f => f.ProductID);
        })
        .ClientDetailTemplate(Html.Kendo().Template().AddComponent(detailGrid => detailGrid
            .Grid<CategoryViewModel>()
                .Name("grid_${data.ProductID}")
                .Columns(columns =>
                {
                    columns.Bound(c => c.ProductID);
                    columns.Bound(c => c.CategoryID);
                    columns.Bound(p => p.CategoryName);
                })
                .Scrollable()
                .Pageable()
                .HtmlAttributes(new { style = "height:300px;" })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .PageSize(5)
                    .Read(read => read.Action("CategoryDetails_Read", "Grid", new { productID = "${data.ProductID}" }))
                )
        ))
        .Pageable()
        .Scrollable()
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Products_Read", "Grid"))
        )
    )

    @Html.Kendo().DeferredScriptFile()
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @{
        var url = @Url.Action("CategoryDetails_Read", "Grid");
    }

    <kendo-grid name="grid" height="430">
        <columns>
            <column field="ProductID"/>
        </columns>
        <grid-detail-template>
            <kendo-grid name="grid_${data.ProductID}" height="300">
                <columns>
                    <column field="ProductID"/>
                    <column field="CategoryID"/>
                    <column field="CategoryName"/>
                </columns>
                <datasource type="DataSourceTagHelperType.Ajax" page-size="5">
                    <schema data="Data" total="Total" errors="Errors">
                        <model id="CategoryID">
                            <fields>
                                <field name="CategoryID" type="number" editable="false"></field>
                                <field name="CategoryName" type="string"></field>
                                <field name="ProductID" type="number"></field>
                            </fields>
                        </model>
                    </schema>
                    <transport>
                        <read url="@Html.Raw(url+"?productID=${data.ProductID}")" />
                    </transport>
                </datasource>
                <pageable enabled="true" />
                <scrollable enabled="true" />
            </kendo-grid>
        </grid-detail-template>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema data="Data" total="Total" errors="Errors">
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Products_Read","Grid")"/>
            </transport>
        </datasource>
        <pageable enabled="true"/>
        <scrollable enabled="true" />
    </kendo-grid>

    @Html.Kendo().DeferredScriptFile()
```
{% endif %}
```C# GridController.cs
    public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
    {
        return Json(productsData.ToDataSourceResult(request));
    }

    public ActionResult CategoryDetails_Read([DataSourceRequest] DataSourceRequest request, int productID)
    {
        return Json(categoriesData
            .Where(t => t.ProductID == productID)
            .ToDataSourceResult(request));
    }
```

For a runnable example, refer to the [Template component integration with Grid demo](https://demos.telerik.com/{{ site.platform }}/template/integration-grid).

The engine for the Kendo UI [inline](https://docs.telerik.com/kendo-ui/framework/templates/get-started-inline) and [external](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external) templates will remain available. However, if you are using the previous template syntax, you must include the `usafe-eval` directive into the application `meta` tag.

## Telerik UI for {{ site.framework }} Before R1 2023 SP1

The Telerik UI for {{ site.framework }} releases before the R1 2023 SP1 one does not support the strict CSP mode. Thus, in these previous versions, if the Content Security Policy (CSP) is enabled, you can set the [`script-src` policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) as follows:

1. [Defer the individual components]({% slug deferred_initialization_overview%}#deferring-specific-components):

    ```HtmlHelper
        @(Html.Kendo().PanelBar()
            .Name("IntroPanelBar")
            .Items(items =>
            {
            ...
            })
            .Deferred()
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-panelbar name="IntroPanelBar" deferred="true">
            <items>
                ...
            </items>
        </kendo-panelbar>
    ```
    {% endif %}

1. Render the initialization logic in a script using `nonce`.

    ```JS
        <script type="text/javascript" nonce="kendoInlineScript">
            @Html.Kendo().DeferredScripts(false)
        </script>
    ```

1. Extend the `meta` CSP tag to include the `unsafe-eval` keyword and the `nonce` signature for enabling the CSP mode:

    ```HTML
        <meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' 'nonce-kendoInlineScript' https://kendo.cdn.telerik.com;">
    ```

1. Add the links used in the _Layout such as for example - `kendostatic`, `jquery`, and `unpkg(jszip)`:

    ```HTML
        <meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' 'nonce-kendoInlineScript' https://cdn.kendostatic.com https://code.jquery.com https://unpkg.com/;" />
    ```

## See Also

* [Content Security Policy (CSP) Templates]({% slug client_templates_overview %}#content-security-policy-csp-templates)
* [Deferred Initialization]({% slug deferred_initialization_overview %})
{% if site.core %}
* [Declarative Initialization]({% slug declarative_initialization_overview %})
{% endif %}
* [Content Security Policy in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/troubleshoot/content-security-policy)
* [Getting Started with Content Security Policy (CSP) Templates in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/templates/get-started-csp-templates)


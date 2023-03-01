---
title: Content Security Policy
page_title: Content Security Policy Troubleshooting
description: "Learn about the issues that may occur when using the strict Content Security Policy with UI for ASP.NET Core HTML helpers and Tag Helpers."
slug: troubleshooting_content_security_policy_aspnetmvc
previous_url: /troubleshoot/troubleshooting-content-security-policy
position: 6
---

# Content Security Policy

[Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is a supplementary security approach which helps you detect and handle specific security attacks such as Cross-Site Scripting (XSS) and data-injection ones. 

If the strict CSP mode is enabled, some browser features are disabled by default:

* Inline JavaScript, such as `<script></script>`, or DOM event attributes, such as `onclick`, are blocked. All script code must reside in separate files that are served from a white-listed domain.

* Dynamic code evaluation through `eval()` and string arguments for both `setTimeout` and `setInterval` are blocked.

## (For R1 2023 SP1 and Later) Working with Telerik UI for {{ site.framework }} Components

As of R1 2023 release, the Kendo UI scripts address the `unsafe-eval` directive for all components except for the [Spreadsheet](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview). For the bigger part of its core engine, the Kendo UI for jQuery Spreadsheet uses the `Function` evaluation, and rewriting the logic of the component will lead to a great number of breaking changes.

The rest of the Kendo UI components and internal mechanisms have been completely rewritten to discard the usage of the `eval()` and `new Function()` calls.

{% if site.core %}

When Kendo UI components are initialized from HTML helpers or Tag Helpers, inline scripts are generated automatically after each component HTML markup. When the CSP is enabled, you will get the following error:
`Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com.`

{% else %}

When Kendo UI components are initialized from HTML helpers there are inline scripts that are generated automatically after each component HTML markup. When the CSP is enabled, you will get the following error: `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'unsafe-eval' 'self' https://kendo.cdn.telerik.com.`

{% endif %}

To resolve the issue and prevent the components from being dependent on the `unsafe-eval` directive, the R1 2023 SP1 release introduces the following features:

 * [Deferring scripts to file](#deferring-scripts-to-file)
 * [Creating Content Security Policy templates](#creating-content-security-policy-templates)

### Deferring Scripts to File

{% if site.core %}

The `DeferredScriptFile` method simulates loading the initialization scripts as a `JS` file through middleware to ensure strict CSP compliance. You can either use the [global deferred initialization functionality]({% slug fundamentals_core%}#deferring-components-globally) to configure all Telerik UI for ASP.NET Core components as deferred globally or [defer each component separately]({% slug fundamentals_core%}#deferring-specific-components) by using the `Deferred` method.

{% else %}

The `DeferredScriptFile` method simulates loading the initialization scripts as a `JS` file through a `HttpModule` to ensure strict CSP compliance. You can either use the [global deferred initialization functionality]({% slug fundamentals_aspnetmvc%}#deferring-components-globally) to configure all Telerik UI for ASP.NET MVC components as deferred globally or [defer each component separately]({% slug fundamentals_aspnetmvc%}#deferring-specific-components) by using the `Deferred` method.

{% endif %}

Call the method after all components declarations to serialize the deferred initialization scripts as a `JS` file.

```
    @Html.Kendo().DeferredScriptFile()

``` 

### Creating Content Security Policy Templates

Most of the components support templating options, which use the [Kendo UI Templates syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview), for example, [Grid templates]({% slug htmlhelpers_grid_aspnetcore_templates_overview %}), [DropDownList templates]({% slug htmlhelpers_dropdownlist_templates_aspnetcore %}), and more. To avoid using the [inline](https://docs.telerik.com/kendo-ui/framework/templates/get-started-inline) and [external](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external) Kendo UI templates and remove the `unsafe-eval` keyword from the `meta` tag of your Telerik UI for {{ site.framework }} application, you can define the templates in partial views and load them by using the overload of the template option that accepts {% if site.core %}`IHtmlContent`{% else %}`MvcHtmlString`{% endif %}. For more information on the CSP-Compatible templates, [refer to the Client Templates section]().

The example below demonstrates how to define a CSP-Compatible [client detail template of a Grid]({% slug clientdetailtemplate_grid_aspnetcore %}).

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().Grid<KendoGridClientHierarchy.Models.Category>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.CategoryID);
            columns.Bound(product => product.CategoryName);
        })
        .Pageable()
        .ClientDetailTemplate(await Html.PartialAsync("DetailTemplate"))
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Categories_Read", "Home"))
        )
        .Deferred()
    )

    @Html.Kendo().DeferredScriptFile()
```
{% else %}
```HtmlHelper
    @(Html.Kendo().Grid<KendoGridClientHierarchy.Models.Category>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.CategoryID);
            columns.Bound(product => product.CategoryName);
        })
        .Pageable()
        .ClientDetailTemplate(Html.Partial("DetailTemplate"))
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Categories_Read", "Home"))
        )
        .Deferred()
    )

    @Html.Kendo().DeferredScriptFile()
```
{% endif %}
```PartialView_DetailTemplate.cshtml
    @{
        Layout = null;
    }

    @(Html.Kendo().Grid<KendoGridClientHierarchy.Models.Product>()
        .Name("grid_#=CategoryID#")
        .Columns(columns =>
        {
            columns.Bound(product => product.ProductID);
            columns.Bound(product => product.ProductName);
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home", new { categoryId = "#=CategoryID#" }))
        )
        .Pageable()
    )
```

Alternatively, you can rewrite all [inline](https://docs.telerik.com/kendo-ui/framework/templates/get-started-inline) and [external](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external) templates into [CSP-compatible functional templates](https://docs.telerik.com/kendo-ui/framework/templates/get-started-csp-templates).

```HtmlHelper
    @(Html.Kendo().Grid<KendoGridClientHierarchy.Models.Category>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.CategoryName)
              .ClientTemplate("<span>Name: ${kendo.htmlEncode(CategoryName)}</span>")
        })
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid">
        <columns>
            <column field="CategoryName" template="<span>Name: ${kendo.htmlEncode(CategoryName)}</span>"></column>
        </columns>
        ...
    </kendo-grid>
```
{% endif %}

The engine for the [inline](https://docs.telerik.com/kendo-ui/framework/templates/get-started-inline) and [external](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external) templates will remain available. However, if you are using the previous template syntax, you must include the `usafe-eval` directive in the `meta` tag.

## (Prior to R1 2023 SP1) Working with Telerik UI for {{ site.framework }} Components

The Telerik UI for {{ site.framework }} releases prior to the R1 2023 SP1 one does not support the strict CSP mode. Thus, in these previous versions, if the Content Security Policy (CSP) is enabled, you could set the [`script-src` policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) as follows: 

{% if site.core %}

1. [Defer the individual components]({% slug fundamentals_core%}#deferring-specific-components):

{% else %}

1. [Defer the individual components]({% slug fundamentals_aspnetmvc%}#deferring-specific-components):

{% endif %}

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

    ```
        <script type="text/javascript" nonce="kendoInlineScript">
            @Html.Kendo().DeferredScripts(false)
        </script>
    ```

1. Extend the `meta` CSP tag to include the `unsafe-eval` keyword and the `nonce` signature for enabling the CSP mode:

    ```
        <meta http-equiv="Content-Security-Policy" content="script-src 'unsafe-eval' 'self' 'nonce-kendoInlineScript' https://kendo.cdn.telerik.com;">
    ```


## See Also

* [Content Security Policy in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/troubleshoot/content-security-policy)
* [Getting Started with Content Security Policy (CSP) Templates in Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/framework/templates/get-started-csp-templates)


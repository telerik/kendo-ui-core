---
title: Implementing Content Security Policy (CSP) with Kendo UI for ASP.NET Core
description: Configure nonce-based CSP compliance in Telerik UI for ASP.NET Core applications with global deferred initialization and popup editing.
type: how-to
page_title: Achieving CSP Compliance in UI for ASP.NET Core Applications
meta_title: Achieving CSP Compliance in UI for ASP.NET Core Applications
slug: csp-compliance-kendo-ui-aspnet-core
tags: kendo-ui, asp.net-core, csp, deferred-scripts, nonce
ticketid: 1717760
ticketed: true
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Telerik UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Progress Telerik UI for ASP.NET Core version</td>
  <td>2025.4.1321</td>
 </tr>
</table>

## Description

When you enable a strict Content Security Policy (CSP) in a .NET 8 application that uses Telerik UI for ASP.NET Core, inline component initialization scripts can be blocked by the browser.

This article demonstrates how to:

- Configure a per-request nonce and CSP header.
- Enable global deferred initialization without calling `.Deferred()` for every component.
- Load Telerik UI components from dynamically loaded Partial Views.
- Configure a CSP-compatible Grid popup editor.
- Diagnose blocked fonts, scripts, styles, and connections.

## Solution

### Configure a Per-Request Nonce

Generate a cryptographically random nonce for every request and store it in `HttpContext.Items`. The same nonce must be used in the CSP header and in the Razor views that render Telerik UI components.

The following example is an application-specific middleware configuration. Add only the external origins that your application actually uses.

```C#.skip-repl
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddKendo(options =>
{
    options.DeferToScriptFiles = true;
});

var app = builder.Build();

app.Use(async (context, next) =>
{
    var cspNonce = Convert.ToBase64String(
        System.Security.Cryptography.RandomNumberGenerator.GetBytes(16));

    context.Items["CspNonce"] = cspNonce;

    context.Response.Headers.Append(
        "Content-Security-Policy",
        "default-src 'self'; " +
        $"script-src 'self' 'nonce-{cspNonce}' https://kendo.cdn.telerik.com; " +
        $"style-src 'self' 'nonce-{cspNonce}' https://fonts.googleapis.com https://kendo.cdn.telerik.com; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "img-src 'self' data: blob:; " +
        "connect-src 'self' https://kendo.cdn.telerik.com;");

    await next();
});

app.UseMiddleware<KendoDeferredScriptsMiddleware>();
```

The CSP policy must also allow any other external resources used by the application. For example, if the application uses Google Translate, add the required Google Translate script and connection origins to the applicable directives. Do not add external origins that the application does not require.

### Enable Global Deferred Initialization

The `DeferToScriptFiles` setting defers the initialization scripts of all Telerik UI components. This avoids adding `.Deferred()` to every component.

For .NET 6 and later applications that use the minimal hosting model, configure the setting in `Program.cs`:

```C#.skip-repl
builder.Services.AddKendo(options =>
{
    options.DeferToScriptFiles = true;
});
```

Register the `KendoDeferredScriptsMiddleware` middleware in the application pipeline:

```C#.skip-repl
app.UseMiddleware<KendoDeferredScriptsMiddleware>();
```

In `_Layout.cshtml`, read the nonce stored by the middleware and pass it to `DeferredScriptFile` after the page components have been rendered:

```Razor
@{
    var cspNonce = Context.Items["CspNonce"]?.ToString();
}

@(Html.Kendo().DeferredScriptFile(cspNonce))
```

{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-button name="primaryTextButton">
    Primary Button
</kendo-button>
```
{% endif %}

The `DeferredScriptFile` call must appear after all Telerik UI component declarations that it needs to serialize. Components declared after this call are not included in the generated JavaScript file.

### Handle Dynamically Loaded Partial Views

When global deferred initialization is enabled, the generated JavaScript file contains the initialization scripts for components in the currently loaded view. Components returned later by a Partial View need their own deferred script file.

For example, an action can return a Partial View containing a Grid:

```C#.skip-repl
public IActionResult Details()
{
    return PartialView();
}
```

Render the component and the nonce-bearing deferred script file at the bottom of the Partial View:

```Razor PartialView.skip-repl
@{
    var cspNonce = Context.Items["CspNonce"]?.ToString();
}

@(Html.Kendo().Grid<OrderViewModel>()
    .Name("ordersGrid")
    .Columns(columns =>
    {
        columns.Bound(order => order.OrderID);
        columns.Bound(order => order.ShipName);
        columns.Bound(order => order.OrderDate);
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Read", "Grid"))
    )
)

@(Html.Kendo().DeferredScriptFile(cspNonce))
```

{% if site.core %}
```TagHelper PartialView.skip-repl
@addTagHelper *, Kendo.Mvc

@{
    var cspNonce = Context.Items["CspNonce"]?.ToString();
}

<kendo-grid name="ordersGrid">
    <columns>
        <column field="OrderID" />
        <column field="ShipName" />
        <column field="OrderDate" />
    </columns>
    <datasource type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("Read", "Grid")" />
        </transport>
    </datasource>
</kendo-grid>

@(Html.Kendo().DeferredScriptFile(cspNonce))
```
{% endif %}

When the Partial View is loaded through a Telerik UI content-loading feature or an application AJAX workflow, keep the `DeferredScriptFile` call in the partial response. This causes the initialization script for the dynamically loaded components to be returned with that content and allows the nonce-bearing script tag to satisfy the CSP.

### Configure a CSP-Compatible Grid Popup Editor

For Grid popup editing, use the `Template` component to define the editor content and reference it with `TemplateComponentName`.

Configure the Grid as follows:

```Razor Grid.cshtml.skip-repl
@(Html.Kendo().Grid<EmployeeViewModel>()
    .Name("employeesGrid")
    .Editable(editable => editable
        .Mode(GridEditMode.PopUp)
        .TemplateComponentName("EmployeeModel"))
    .Columns(columns =>
    {
        columns.Bound(employee => employee.Name);
        columns.Bound(employee => employee.Age);
        columns.Command(command => command.Edit());
    })
)
```

{% if site.core %}
```TagHelper Grid.cshtml.skip-repl
@addTagHelper *, Kendo.Mvc

<kendo-grid name="employeesGrid">
    <columns>
        <column field="Name" />
        <column field="Age" />
        <column width="200">
            <commands>
                <column-command name="edit" text="Edit" />
            </commands>
        </column>
    </columns>
    <editable mode="popup">
        <editable-template>
            <kendo-textbox name="Name" />
            <kendo-numerictextbox name="Age" />
        </editable-template>
    </editable>
</kendo-grid>
```
{% endif %}

Create the `EmployeeModel.cshtml` editor template in the `Views/Shared/EditorTemplates` folder:

```Razor EmployeeModel.cshtml.skip-repl
@model EmployeeViewModel

@(Html.Kendo().Template()
    .AddHtml("<input type='hidden' name='Id' />")
    .AddHtml("<div class='mb-3'>")
    .AddHtml("<label for='Name'>Name</label>")
    .AddComponent(component => component.TextBoxFor(model => model.Name))
    .AddHtml("</div>")
    .AddHtml("<div class='mb-3'>")
    .AddHtml("<label for='Age'>Age</label>")
    .AddComponent(component => component.NumericTextBoxFor(model => model.Age))
    .AddHtml("</div>")
)
```

The `Template` component avoids the legacy template syntax that depends on `unsafe-eval`. You can also define a CSP-compatible template with a client-side handler when the template content is better suited to JavaScript.

### Troubleshoot Blocked Resources

Review the browser console and network requests for the blocked resource. Add the required origin to the corresponding CSP directive:

- `script-src` for external JavaScript files.
- `style-src` for external stylesheets and nonce-bearing style elements.
- `font-src` for external font files.
- `img-src` for images, data URLs, and blob URLs.
- `connect-src` for AJAX, WebSocket, and other network connections.

The nonce in the CSP header must match the nonce passed to `DeferredScriptFile`. Do not use a client-supplied request header as the nonce unless the application has an explicitly trusted mechanism for validating and generating that value.

## See Also

- [Content Security Policy]({% slug troubleshooting_content_security_policy_aspnetmvc %})
- [Deferred Initialization]({% slug deferred_initialization_overview %})
- [Using Client Templates]({% slug client_templates_overview %}#content-security-policy-csp-templates)
- [Grid Overview]({% slug htmlhelpers_grid_aspnetcore_overview %})
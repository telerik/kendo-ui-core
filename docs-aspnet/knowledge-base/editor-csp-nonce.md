---
title: How to configure CSP for the Kendo Editor in {{ site.framework }}
description: "Configure CSP for the Kendo Editor in {{ site.framework }} with a request nonce and strict style policies."
type: how-to
page_title: Configure CSP for the Kendo Editor in {{ site.framework }}
slug: editor-csp-nonce
tags: editor, csp, nonce, style-src, asp.net
ticketid: 1717226
ticketed: true
res_type: kb
components: ["general"]
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Current</td>
 </tr>
</table>

## Description

When you use the Editor with a strict Content Security Policy (CSP), its generated style elements can violate the `style-src` directive.

The Editor uses styles in its content area iframe, placeholder, and stylesheet links. The Formatting tool also creates inline style values for its dropdown items.

This article explains how to configure a per-request nonce for the Editor and avoid `unsafe-inline` in the `style-src` directive.

## Solution

### Generate a Per-Request Nonce

Generate a cryptographically random nonce for each request. Store it in `HttpContext.Items` so the Razor view can use the same value.

The following example also enables deferred initialization. This prevents the inline component initialization scripts from violating the `script-src` directive.

{% if site.core %}
```C#
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddKendo(x =>
{
    x.DeferToScriptFiles = true;
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
        "script-src 'self'; " +
        $"style-src 'self' 'nonce-{cspNonce}'; " +
        "font-src 'self'; " +
        "img-src 'self';");

    await next();
});

app.UseMiddleware<KendoDeferredScriptsMiddleware>();
```
{% else %}
```C#
KendoMvc.Setup(x =>
{
    x.DeferToScriptFiles = true;
});
```

Register the `KendoDeferredScriptsModule` in `Web.config`, as described in [Deferred Initialization]({% slug deferred_initialization_overview %}).

Add middleware that generates the nonce and appends the CSP header before the request produces a response:

```C#
protected void Application_BeginRequest()
{
    var cspNonce = Convert.ToBase64String(
        System.Security.Cryptography.RandomNumberGenerator.GetBytes(16));

    HttpContext.Current.Items["CspNonce"] = cspNonce;

    HttpContext.Current.Response.Headers.Add(
        "Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self'; " +
        $"style-src 'self' 'nonce-{cspNonce}'; " +
        "font-src 'self'; " +
        "img-src 'self';");
}
```
{% endif %}

If your application loads Kendo UI or other resources from a CDN, add the required domains to the corresponding CSP directives.

### Configure the Editor

Read the nonce from `Context.Items` in the view and pass it to the Editor.

```HtmlHelper
@{
    var cspNonce = Context.Items["CspNonce"]?.ToString();
}

@(Html.Kendo().Editor()
    .Name("editor")
    .Nonce(cspNonce)
    .UnsafeInline(false)
)

@Html.Kendo().DeferredScriptFile()
```

{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

@{
    var cspNonce = Context.Items["CspNonce"]?.ToString();
}

<kendo-editor name="editor"
              nonce="@cspNonce"
              unsafe-inline="false">
</kendo-editor>

@Html.Kendo().DeferredScriptFile()
```
{% endif %}

Place `DeferredScriptFile()` after all Telerik UI component declarations on the page.

The `Nonce` configuration applies the nonce to the Editor's inline styles in the content area iframe, the placeholder style, and stylesheet links in the content area.

The `UnsafeInline(false)` configuration disables the decoration generated for the Formatting tool dropdown. Formatting values appear as plain text in that dropdown. The formatting still applies to the Editor content, but its decoration is not visible in the dropdown.

### Validate the Configuration

Verify that the response contains a CSP header similar to the following:

```text
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'nonce-abc123xyz'; font-src 'self'; img-src 'self';
```

The nonce in the header must match the nonce passed to the Editor.

Open the browser developer tools and confirm that the Editor works without CSP violations. Check the Editor iframe for `style` and `link` elements that contain the nonce.

JavaScript-applied styles, such as styles assigned through `.css()`, are not blocked by the `style-src` check described here. Other application-generated `<style>` elements and inline style attributes must follow the application's CSP policy.

## See Also

- [Editor Overview]({% slug htmlhelpers_editor_aspnetcore %})
- [Content Security Policy]({% slug troubleshooting_content_security_policy_aspnetmvc %})
- [Deferred Initialization]({% slug deferred_initialization_overview %})
- [EditorBuilder.Nonce API Reference](/api/kendo.mvc.ui.fluent/editorbuilder#noncesystemstring)
- [EditorBuilder.UnsafeInline API Reference](/api/kendo.mvc.ui.fluent/editorbuilder#unsafeinlinesystemboolean)
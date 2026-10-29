---
title: Resolving CSP Compatibility and Multi-Instance Issues in Kendo UI for ASP.NET MVC
description: "Explains CSP compatibility and multi-instance DeferredScriptFile issues in Kendo UI for ASP.NET MVC."
type: how-to
page_title: Handling CSP and Multi-Instance Issues in Kendo UI for ASP.NET MVC
meta_title: Handling CSP and Multi-Instance Issues in Kendo UI for ASP.NET MVC
slug: deferredscriptfile-csp-multi-instance
tags: csp, deferredscriptfile, multi-instance, asp.net mvc, nonce
ticketid: 1719560
ticketed: true
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Progress Kendo UI for ASP.NET MVC version</td>
  <td>2026.2.520</td>
 </tr>
</table>

## Description

Kendo UI for ASP.NET MVC supports strict Content Security Policy (CSP) scenarios starting with the 2024 Q4 release.

Applications that use `DeferredScriptFile()` in a scaled-out environment may encounter missing initialization scripts when different requests are routed to different application instances.

This article explains the CSP requirements and the limitation of the built-in deferred-script cache.

## Solution

### Configure CSP for Kendo UI for ASP.NET MVC

Use a strict CSP policy without `unsafe-inline` and `unsafe-eval` where your application and components support it.

```HTML.skip-repl
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' https://kendo.cdn.telerik.com https://code.jquery.com;
               style-src 'self';" />
```

The policy must also allow any external resources used by the application, such as Kendo UI scripts, fonts, images, or other services.

The `style-src 'self'` directive does not cover every component scenario. For example, the Editor generates style elements for its content-area iframe, placeholder, and stylesheet links. Configure a per-request nonce for those styles instead of adding `unsafe-inline`.

### Configure a Per-Request Nonce for the Editor

Generate a cryptographically random nonce for each request and store it in the request context.

```C#.skip-repl
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

Read the nonce from the request context and pass it to the Editor.

```HtmlHelper.skip-repl
@{
    var cspNonce = Context.Items["CspNonce"]?.ToString();
}

@(Html.Kendo().Editor()
    .Name("editor")
    .Nonce(cspNonce)
    .UnsafeInline(false)
)

@Html.Kendo().DeferredScriptFile(cspNonce)
```

The nonce in the CSP header must match the nonce passed to the Editor.

### Configure Deferred Initialization

Enable deferred script files in `Global.asax.cs`.

```C#.skip-repl
KendoMvc.Setup(settings =>
{
    settings.DeferToScriptFiles = true;
});
```

Register the deferred-scripts module in `Web.config`.

```XML.skip-repl
<configuration>
    <system.webServer>
        <modules>
            <add name="KendoDeferredScriptsModule"
                 type="Kendo.Mvc.KendoDeferredScriptsModule" />
        </modules>
    </system.webServer>
</configuration>
```

Call `DeferredScriptFile()` after all Telerik UI component declarations that must be included in the generated initialization file.

```Razor.skip-repl
@Html.Kendo().DeferredScriptFile(cspNonce)
```

### Consider Multi-Instance Deployments

`DeferredScriptFile()` generates a unique URL for the deferred initialization script. The MVC wrapper stores the generated script in `HttpRuntime.Cache`, and `KendoDeferredScriptsModule` retrieves and removes the entry when the browser requests the generated URL.

`HttpRuntime.Cache` is local to the application instance. If the page request and the generated script request are routed to different instances, the second instance may not contain the cache entry and the initialization script may be unavailable.

Use one of the following approaches:

1. Configure session affinity in the load balancer so the page request and deferred-script request reach the same instance. This is an infrastructure mitigation and does not provide distributed storage.
2. Use another CSP-compliant initialization strategy that does not depend on the process-local deferred-script cache. Do not assume that statically loading the Kendo UI library scripts also replaces the runtime-generated component initialization scripts.
3. If the application requires a shared distributed cache, treat the replacement of the built-in caching and module behavior as a custom integration. Validate the design with the product team before implementing it.

The Kendo UI for ASP.NET MVC documentation does not provide a built-in setting for redirecting `KendoDeferredScriptsModule` to a distributed cache or for pre-generating these runtime-specific initialization scripts during deployment.

## Key Points

1. Kendo UI for ASP.NET MVC supports CSP scenarios starting with the 2024 Q4 release.
2. `style-src 'self'` alone is not sufficient for every component. Components that generate styles, such as Editor, may require a per-request nonce.
3. Pass the same nonce to the CSP header and `DeferredScriptFile()` or the component that generates nonce-protected styles.
4. `DeferredScriptFile()` stores runtime-generated content in the process-local `HttpRuntime.Cache`.
5. Multi-instance deployments require session affinity or a separately validated custom integration for shared storage.

## See Also

- [Content Security Policy]({% slug troubleshooting_content_security_policy_aspnetmvc %})
- [Deferred Initialization]({% slug deferred_initialization_overview %})
- [Configure CSP for the Kendo Editor]({% slug editor-csp-nonce %})
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [Content Security Policy `style-src` Directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src)

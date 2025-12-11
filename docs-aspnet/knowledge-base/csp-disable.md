---
title: Disable Content Security Policy (CSP) in Projects
description: A guide explaining how to disable CSP in {{ site.framework }} applications created through the {{ site.product }} Visual Studio Extensions.
type: how-to
page_title: Disable CSP in Projects
slug: csp-disable
tags: aspnet, core, dotnet-core, sample, project, csp, mvc
res_type: kb
components: ["general"]
---

## Description

Content Security Policy (CSP) is a security feature designed to prevent specific types of attacks, such as Cross-Site Scripting (XSS) and data injection. [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) provides an additional layer of security by restricting the sources from which content can be loaded.

All {{ site.product }} components are CSP-compatible. For more information on enabling CSP in a {{ site.product }} application, refer to the [Content Security Policy documentation]({% slug troubleshooting_content_security_policy_aspnetmvc %}).

Starting with the 2025 Q1 release, CSP is enabled by default in [all projects created using the {{ site.product }} Visual Studio Extensions]({% slug newprojectwizards_visualstudio_aspnetcore %}). However, handling [CSP Templates](https://www.telerik.com/{{ site.platform }}/documentation/html-helpers/helper-basics/using-client-templates#content-security-policy-csp-templates) in components, such as Grid, requires specific handling.

This article provides guidance on how to disable CSP compatibility when necessary in projects created through the {{ site.product }} Visual Studio Extensions.

## Solution

To disable CSP in a {{ site.product }} application, follow these steps:

1. Open the `_Layout.cshtml` file and remove the `<meta>` tag for CSP:

    ```HTML
    <meta http-equiv="Content-Security-Policy" content="..." />
    ```

1. Remove the `@Html.Kendo().DeferredScriptFile()` line from the `_Layout.cshtml` file.

{% if site.core %}
1. In the `Program.cs` file, remove the `DeferToScriptFiles` setting in the `AddKendo` method and the `KendoDeferredScriptsMiddleware` middleware (`app.UseMiddleware<KendoDeferredScriptsMiddleware>();`):

    ```C#
    var builder = WebApplication.CreateBuilder(args);

    ...existing code...

    builder.Services.AddKendo(x =>
    {
        x.DeferToScriptFiles = true;
    });

    var app = builder.Build();

    ...existing code...

    app.UseMiddleware<KendoDeferredScriptsMiddleware>();
    ```

{% else %}
1. Open the `Global.asax.cs` file and remove the `DeferToScriptFiles` setting:

    ```C#
    KendoMvc.Setup(x =>
    {
        x.DeferToScriptFiles = true;
    });
    ```

1. Open the `Web.config` file and remove the following `HttpModule`:

    ```XML
    <configuration>
        ...existing code...
        <system.webServer>
            <modules>
                <add name="KendoDeferredScriptsModule" type="Kendo.Mvc.KendoDeferredScriptsModule" />
            </modules>
        </system.webServer>
        ...existing code...
    </configuration>
    ```
{% endif %}

Once done, run the application and open the browser console with `F12` to ensure that there are no client-side errors.

## See Also

* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
---
title: Captcha Server-side Provider
page_title: Captcha Server-side Provider
description: "Learn how to configure the server-side provider for the Telerik UI Captcha component for {{ site.framework }}."
slug: htmlhelpers_captcha_provider
position: 2
---

# The Captcha Provider

This article explains how to setup the server-side provider for the Telerik UI Captcha for {{ site.framework }}. The provider generates and validates CAPTCHAs via helper classes and methods.

## Setup

{% if site.core %}

The server-side Telerik UI Captcha provider comes with the **Telerik.Web.Captcha** NuGet package. To install the package:

1. Right-click the project and select **Manage NuGet Packages..**.
1. Make sure that the private [Telerik UI NuGet feed](https://docs.telerik.com/kendo-ui/intro/installation/nuget-install#adding-the-feed-with-nuget-package-manager) is configured.
1. Search for and install the **Telerik.Web.Captcha** NuGet package.

{% else %}

The server-side Telerik UI Captcha provider comes with the **Telerik.Web.Captcha.dll**. To include the dll in your project:

1. In your project, right-click **References**.
1. Select **Add Reference..**.
1. Click **Browse...**.
1. Navigate to the installation folder of the Telerik UI for {{ site.framework }}. The dll is located in the `~/installationFolder/captcha/net40` directory.
1. Select **Telerik.Web.Captcha.dll** and click **Add**.

{% endif %}

In the C# backend file or controller, add references to the following namespaces:

{% if site.mvc %}
```
    using System;
    using System.Drawing.Imaging;
    using System.IO;
    using System.Web.Mvc;
    using Telerik.Web.Captcha;
```
{% else %}
```
    using System.IO;
    using System.Drawing.Imaging;
    using Newtonsoft.Json;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Telerik.Web.Captcha;
```
{% endif %}


For more information about the usage and integration of the Captcha provider in an {{ site.framework }} application, see the [Validation]({% slug htmlhelpers_captcha_validation %}) article.


## See Also

* [Basic Usage of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/index)
{% if site.core %}
* [Basic Usage of the Captcha TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/captcha/tag-helper)
{% endif %}
* [Using the API of the Captcha HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/captcha/api)
* [Server-Side API](/api/captcha)

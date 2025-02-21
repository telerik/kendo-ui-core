---
title: Licensing
page_title: Licensing
description: "Learn more about how to start your trial period and use your developer license for {{ site.product }}."
slug: licensing_aspnetcore
position: 21
---

# {{ site.product }} Licensing

Progress<sup>®</sup> {{ site.product }} is available under a developer (commercial) or a trial license.

Regardless of the license version you hold, to use {{ site.product }}, you have to agree to the [End User License Agreement](https://www.telerik.com/purchase/license-agreement/kendo-ui).

You can find the license agreement in your Telerik controls installation folder under `\license-agreements\EULA.rtf`. For example, the default location for the Q4 2024 release is `C:\Program Files (x86)\Progress\{{ site.product }} 2024 Q4\license-agreements\EULA.rtf`.

## Bill of Materials and Third-Party Software Licensing

You can find a Bill of Materials (BOM) and a list of the third-party software, including open-source software, in the `\LicenseAgreements\ThirdParty\NOTICE.txt` location in your Telerik controls installation folder. For example, the default location for the Q4 2024 release is `C:\Program Files (x86)\Progress\{{ site.product }} 2024 Q4\license-agreements\third-party\NOTICE.txt`. For versions prior to R2 2018 SP1, the file is called `licenses.txt`.

## Current Licensing Mechanism

Starting with the 2025 Q1 release, {{ site.product }} requires activation through a license key (trial or commercial). To download your personal activation key and activate the {{ site.product }} components, follow [License Key Installation]({%slug installation_license_key_aspnetcore%}) steps.

An invalid license results in [errors and warnings]({%slug troubleshooting-license-key-errors%}) during build and run-time indicators such as watermarks and banners.

## License.licx in Old Product Versions

As of the Q1 2015 release, Telerik® {{ site.product_short }} uses the standard .NET licensing mechanism&mdash;if you use Telerik® {{ site.product_short }} items in design-time, Visual Studio adds a `license.licx` file to the solution. This file is used only in design-mode and is not needed for deployment explicitly. The .NET framework (`lc.exe`) will embed it in the assembly when your application is built for deployment.

The `license.licx` license file is maintained by Visual Studio and contains information about all licensed components in the application, including non-Telerik products. Having this license file is not expected to bring any performance or compilation issues and you can ignore it.

If your project build fails with errors which point to the license file, you can delete it and rebuild. Alternatively, you can clear its contents and mark it as **Read Only**.

If you are working under source control, once the file is created, it will be detected as a change by your source control system. Telerik suggests that you check in this file initially. When the file is checked out again during your work, it is up to you to decide whether to check it in, or discard the changes.

## See Also

* [Licensing FAQ]({%slug licensing-faq%})
{% if site.core %}
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
{% else %}
* [Getting Started with Telerik UI for ASP.NET MVC (Fundamentals)]({% slug fundamentals_aspnetmvc %})
{% endif %}

---
title: Licensing
page_title: Licensing
description: "Learn more about how to start your trial period and use your developer license for {{ site.product }}."
slug: licensing_aspnetcore
position: 21
---

# Licensing

Progress<sup>®</sup> {{ site.product }} is available under a developer (commercial) or a trial license.

Regardless of the license version you hold, to use {{ site.product }}, you have to agree to the End User License Agreement for [Progress Kendo UI, Progress Telerik UI for ASP.NET MVC, Progress Telerik UI for ASP.NET Core, Progress Telerik UI for JSP, and Progress Telerik UI for PHP](https://www.telerik.com/purchase/license-agreement/kendo-ui).

You can find the license agreement in your Telerik controls installation folder under `\LicenseAgreements\EULA.rtf`. For example, the default location for the R2 2018 release is `C:\Program Files (x86)\Progress\{{ site.product }} R2 2018\LicenseAgreements\EULA.rtf`.

## Bill of Materials and Third-Party Software Licensing

You can find a Bill of Materials (BOM) and a list of the third-party software, including open-source software, in the `\LicenseAgreements\ThirdParty\NOTICE.txt` location in your Telerik controls installation folder. For example, the default location for the R2 2018 SP1 release is `C:\Program Files (x86)\Progress\{{ site.product }} R2 2018\LicenseAgreements\ThirdParty\NOTICE.txt`. For versions prior to R2 2018 SP1, the file is called `licenses.txt`.

## Developer Licenses

Developer licenses come with modified DLLs which work without displaying copyright messages. If you have a Developer license for one or more of the Telerik components, only make sure that you are using the developer build when downloading the controls. These builds have the `Dev` abbreviation in their file names.

If your application is displaying a copyright message intermittently, this means that you are using a trial version of the product. Log in into your [Telerik account](www.telerik.com/account/default.aspx) and download the developer build through the **Products & Subscriptions** menu and its **Purchased Products** section. To update your project, refer to the **Upgrading the Trial License to a Production License** section for the step-by-step instructions.

For more information on the commercial terms, refer to the pricing list of the [available developer licenses which include {{ site.product }}](https://www.telerik.com/purchase.aspx).

## Trial Licenses

The free trial licenses of all Telerik products are fully functional and will work for an unlimited time but with copyright message (see below) displayed randomly on the page.

Trial licenses provide free and fully functional access to all {{ site.product }} products. While the trial version is unlimited in time, the pages will randomly display the following copyright message: "Thank you for using the Trial Version of Progress® {{ site.product }} to build more powerful applications faster. Purchase the Commercial Version now to get access to all product updates and the Telerik expert support".

## Licensing Mechanism

As of the Q1 2015 release, Telerik® {{ site.product_short }} uses the standard .NET licensing mechanism&mdash;if you use Telerik® {{ site.product_short }} items in design-time, Visual Studio adds a `license.licx` file to the solution. This file is used only in design-mode and is not needed for deployment explicitly. The .NET framework (`lc.exe`) will embed it in the assembly when your application is built for deployment.

The `license.licx` license file is maintained by Visual Studio and contains information about all licensed components in the application, including non-Telerik products. Having this license file is not expected to bring any performance or compilation issues and you can ignore it.

If your project build fails with errors which point to the license file, you can delete it and rebuild. Alternatively, you can clear its contents and mark it as **Read Only**.

If you are working under source control, once the file is created, it will be detected as a change by your source control system. Telerik suggests that you check in this file initially. When the file is checked out again during your work, it is up to you to decide whether to check it in, or discard the changes.

## See Also

{% if site.core %}
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
{% else %}
* [Getting Started with Telerik UI for ASP.NET MVC (Fundamentals)]({% slug fundamentals_aspnetmvc %})
{% endif %}

---
title: Frequently Asked Questions
page_title: Licensing Frequently Asked Questions
description: "Learn the answers to frequently asked questions about the {{ site.product }} licensing."
components: ["general"]
slug: licensing-faq
previous_url: /licensing
position: 3
---

# Frequently Asked Questions

This article lists the answers to the most frequently asked questions (FAQs) about {{ site.product }} licensing.

## What types of licenses are available for {{ site.product }}?

Progress<sup>®</sup> {{ site.product }} is available under a developer (commercial) or a trial license.

Regardless of the license version you hold, to use {{ site.product }}, you have to activate a license key and agree to the [End User License Agreement](https://www.telerik.com/purchase/license-agreement/kendo-ui).

You can find the license agreement in your Telerik controls installation folder under `\license-agreements\EULA.rtf`. For example, the default location for the Q4 2024 release is `C:\Program Files (x86)\Progress\{{ site.product }} 2024 Q4\license-agreements\EULA.rtf`.

## What is the current licensing mechanism?

Starting with the 2025 Q1 release, {{ site.product }} requires activation through a license key (trial or commercial). To download your personal activation key and activate the {{ site.product }} components, follow [License Key Installation]({%slug installation_license_key_aspnetcore%}) steps.

An invalid license results in [errors and warnings]({%slug troubleshooting-license-key-errors%}) during build and run-time indicators such as watermarks and banners.

## Does the license key expire?

Yes, the license key expires at the end of your subscription:

* For trial users, this is at the end of your 30-day trial period.
* For commercial license holders, this is when your subscription term expires.

You need to download and install a new license key after:

* Starting a new trial
* Buying a new license
* Renewing an existing license
* Upgrading an existing license

>An expired [perpetual license](https://www.telerik.com/purchase/faq/licensing-purchasing#licensing) key is valid for all {{ site.product }} versions published before the license expiration date.

## Will {{ site.product }} function with an expired license key?

This depends on the [{{ site.product }} license type (perpetual, subscription, or trial)](https://www.telerik.com/purchase/faq/licensing-purchasing#licensing):

* *Perpetual licenses* function normally with an expired license key, as long as the application is using a version that was released before the expiration date of the license.
* *Subscription licenses* function normally in already deployed applications, but you cannot rebuild and republish the app.
* *Trial licenses* function normally only within the 30-day trial period.

Scenarios that do not match the above three descriptions result in the following application behaviors:

* A popup banner appears on application startup.
* A watermark appears on {{ site.product }} components.
* [A warning message appears in the application's build log]({%slug troubleshooting-license-key-errors%}).

## I updated the {{ site.product }} version in my project and license errors appeared. Why?

The most likely cause is that the new {{ site.product }} version was released after the expiration date of your current license or license key. To fix this issue:

1. Renew your {{ site.product }} license, if necessary.
1. [Update your license key]({%slug installation_license_key_aspnetcore%}#license-key-updates)
1. For more details on problems related to the licensing and their solutions, see the [License Key Errors article]({%slug troubleshooting-license-key-errors%}).

## Can I use the same license key in multiple builds?

You can use your personal license key in multiple pipelines, builds, and environments. However, each individual developer must use their own unique personal license key.

## Do I need an Internet connection to activate the license?

No, the license validation and activation occur offline.

## Do I have to add the license key to source control?

No, do not add the `telerik-license.txt` license key file or its contents to source control.

Do not store the license key in plain text in GitHub Actions Workflow definitions. Build servers must use the [`TELERIK_LICENSE` environment variable]({%slug deployment_license_key_aspnetcore%}).

## What happens if both the environment variable and the license key file are present?

If both the `TELERIK_LICENSE` environment variable and the `telerik-license.txt` file are present, then the environment variable will be used.
To use the license key file, unset the environment variable.

## What happens if several license key files exist?

If both a global and a project-specific `telerik-license.txt` files exist, then the project-specific license key will be used.

## My team has more than one license holder. Which key do we have to use?

To activate {{ site.product }} on your development machine, use the key associated with your personal account.

To activate {{ site.product }} in a CI/CD environment, use any of the license keys in your team.

>Every developer must be assigned [their own license or seat](https://www.telerik.com/purchase/faq/licensing-purchasing) and they must use a license key that is associated with their personal Telerik account.

## Are earlier {{ site.product }} versions affected?

No, versions up to **2024.4.1112** released prior to February 2025 do not require a license key. They use an older licensing mechanism that requires [Referencing a Script Key]({%slug installation_legacy_licensing_aspnetcore%})

## What about the license.licx file in old product versions?

As of the Q1 2015 release, Telerik® {{ site.product_short }} uses the standard .NET licensing mechanism—if you use Telerik® {{ site.product_short }} items in design-time, Visual Studio adds a `license.licx` file to the solution. This file is used only in design-mode and is not needed for deployment explicitly. The .NET framework (`lc.exe`) will embed it in the assembly when your application is built for deployment.

The `license.licx` license file is maintained by Visual Studio and contains information about all licensed components in the application, including non-Telerik products. Having this license file is not expected to bring any performance or compilation issues and you can ignore it.

If your project build fails with errors which point to the license file, you can delete it and rebuild. Alternatively, you can clear its contents and mark it as **Read Only**.

If you are working under source control, once the file is created, it will be detected as a change by your source control system. Telerik suggests that you check in this file initially. When the file is checked out again during your work, it is up to you to decide whether to check it in, or discard the changes.

## Where can I find information about Bill of Materials (BOM) and third-party software licenses?

You can find a Bill of Materials (BOM) and a list of the third-party software, including open-source software, in the `\LicenseAgreements\ThirdParty\NOTICE.txt` location in your Telerik controls installation folder. For example, the default location for the Q4 2024 release is `C:\Program Files (x86)\Progress\{{ site.product }} 2024 Q4\license-agreements\third-party\NOTICE.txt`. For versions prior to R2 2018 SP1, the file is called `licenses.txt`.

## How does the new ASP.NET Core and MVC licensing model work?

Licensing is enforced through the `Telerik.Licensing` package, which uses an MSBuild task to validate that a developer has an associated dev seat by evaluating `telerik-license.txt` in `%AppData%`. In Release builds, the build task provisions the compiled deliverables with license metadata. At runtime, checks validate that the application was compiled with a valid license. Compiled binaries do not expire after license expiration.

## Why is placing the license file in %AppData% required, and how is this location discovered by MSBuild or the runtime?

The `telerik-license.txt` file in `%AppData%` is the mechanism used to provision that a developer has an associated dev seat. For developers working with ASP.NET Core or MVC, `%AppData%` is the only supported location. Environment variables or alternative locations are intended only for CI or service scenarios.

## Are there officially supported alternatives to %AppData% license placement (project-level, environment variables, CI secrets)?

Supported alternatives exist only for CI and service scenarios. Environment variables or writing the license file outside `%AppData%` are intended solely for CI builds or service provisioning, not for local developer workstations.

## Which NuGet package is required for licensing?

You need the `Telerik.Licensing` package from NuGet.org. It is a utility package used to detect Telerik products and implement build-time and runtime license validation.

## Why do the docs reference Telerik.UI.for.AspNet.Core / Telerik.UI.for.AspNet.Mvc5 packages that are not discoverable via NuGet search?

These packages are not publicly available on NuGet.org. They are currently available only from the private `nuget.telerik.com` feed.

## Should customers explicitly reference Telerik.Licensing, or should it always be resolved transitively?

In simple dependency chains (exe → UI → Telerik.Licensing), transitive resolution is sufficient. In chained scenarios (exe → class library → UI → Telerik.Licensing), the build task does not propagate automatically, so `Telerik.Licensing` must be referenced explicitly in each project in the chain. Customers may also explicitly reference it to obtain fixes or new features.

## What is the officially recommended licensing setup path today: automatic or manual?

Install `telerik-license.txt` in `%AppData%`. In dependency chains involving class libraries, add the `Telerik.Licensing` package to each project in the chain.

## What is the officially supported way to activate licensing in CI/CD pipelines?

Use secure files or secrets in the CI system. A trusted developer uploads `telerik-license.txt` as a secure file. After repository checkout and before build, the file is written to disk for the build, and removed after completion.

## Is there an official MSBuild target, CLI command, or script for pipeline licensing?

Licensing is enforced via an MSBuild task included in `Telerik.Licensing`. There is no single mandatory approach; multiple supported approaches exist depending on the environment.

## Are there validated CI/CD examples for Azure DevOps, GitHub Actions, and Jenkins?

Yes. Multiple approaches are documented for Azure DevOps and GitHub Actions. The correct approach depends on the customer’s environment and requirements. There is no single universal example.

## In which scenarios are script keys required instead of file/NuGet-based licensing?

Script keys are required when build tasks cannot be used. Examples include: MVC/AJAX and WebForms-style projects that compile C# dynamically, WinForms plugins with custom C++ compilation, CDN or script-tag usage without licensing packages, and certain library scenarios. In most application projects, `telerik-license.txt` is sufficient.

## What script-loading patterns can prevent license detection?

Using `async` or `defer` attributes, or loading the licensing script before the Kendo UI scripts, can cause the licensing script to execute too early and fail detection.

## Is there a recommended “safe minimum” script loading order for license detection?

The script key should be loaded after the Kendo UI scripts but before the first usage of Kendo components.

## Are there licensing behavior differences between pre-2023 and post-2023 builds?

Licensing behavior differs due to changes in licensing enforcement and subscription handling. Version numbers themselves are not equivalent to licensing behavior.

## How should Telerik.Licensing.Runtime assemblies be managed in MVC apps?

In projects that cannot use build tasks (such as certain MVC/AJAX or WebForms-style scenarios), script keys must be embedded manually and `Telerik.Licensing.Runtime.dll` must be referenced explicitly. In standard NuGet-based MVC projects, runtime assemblies are handled automatically.

## Next Steps

* [Set Up the Telerik NuGet Feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%})
* [Install License Key in CI/CD Environment]({%slug deployment_license_key_aspnetcore%})

## See Also

* [Troubleshoot License Key Errors]({%slug troubleshooting-license-key-errors%})
{% if site.core %}
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
{% else %}
* [Getting Started with Telerik UI for ASP.NET MVC (Fundamentals)]({% slug fundamentals_aspnetmvc %})
{% endif %}

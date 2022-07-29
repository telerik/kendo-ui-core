---
title: CI, CD, Build Server
page_title: CI, CD, Build Server
description: CI, CD, Build Server setup involving the {{ site.product }}.
slug: deployment_ci_cd_build
position: 1
---

# CI, CD, Build Server Setup

This article explains some concepts and how to troubleshoot the most common errors related to setting up the Telerik NuGet packages for automated builds, CI and CD.

Sections in this article:


* [Basics](#basics)
* [Azure DevOps Pipelines](#azure-devops-pipelines)
* [GitHub Secrets](#github-secrets)

## Basics

Often enough, you would want to set up Continuous Integration and/or Continuous Delivery (CI/CD) pipelines or builds for your project that uses the Telerik components. This is a valid scenario and the "one license per developer" license does not prevent you from doing so. The Telerik components are commercial software and as such can only be distributed through channels that are private and/or behind authentication.

There are a couple of common ways people implement CI/CD automated builds.

* You can [restore the Telerik NuGet packages]({%slug nuget_keys%}) by downloading them from the Telerik NuGet server. You can achieve this by using the more secure token-based authentication with the Telerik NuGet server. If you prefer the basic authentication with a username and password, you can use your own credentials (or the credentials of the license holder, depending on how your licenses are set up) in the `nuget.config` of the build machine/pipeline. In this case, make sure that your credentials are encrypted when you add the Telerik feed source through the CLI. Alternatively, you can copy an encrypted version from your own local config if you have one. See more on setting up the [Telerik Private NuGet feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%}).

* Creating a local folder (for example, on a shared network drive or other suitable location accessible only by your builds and team) that holds the `.nupkg` files we provide (you can download them from your telerik.com account, or from your local installation - both [automated]({%slug msi_install_aspnetmvc6_aspnetmvc%}) and from the zip archive).

You must protect your credentials and/or the Telerik packages and ensure they are used only by you and not by other developers, according to the [license-per-developer policy](https://www.telerik.com/purchase/license-agreement/kendo-ui). As long as your credentials are obfuscated/masked, they can be used by your colleagues (e.g. developers, QAs, designers, front-end devs, DBAs, etc.) for building and running a solution, provided they do not use the Telerik components to create functionality. Most importantly, you must ensure that such credentials or package sources are not available to the general public (for example, in public repositories). 


## Azure DevOps Pipelines

When using Azure pipelines, we encourage you to review the following resource on setting things up:

* [Set Up Private NuGet Feed for Azure]({%slug howto_setupprivatefeedazure_aspnetcore%})

* Sample Repo and Video Tutorial: [Telerik DevOpsExamples by LanceMcCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)

>caption There are a couple of common questions and issues:

* Obtaining credentials - see the points above for either using your own credentials, or using a shared package source.

* Telerik feed not being found - the most common reason for a problem is that the path to the `nuget.config` file is wrong (it should, by default, be at the root level).

* An `index.json not found` error can occur from many root causes. If you have successfully authenticated, this error usually means that the feed wasn't able to be searched or connected to. A common reason is an incorrect feed URL, such as including a trailing slash - Correct: `https://nuget.telerik.com/v3/index.json` and Incorrect: `https://nuget.telerik.com/v3/index.json/`.

>caption A few things to double check to ensure correct setup:

* The Service connection is using Basic Authentication and the URL is correct (`https://nuget.telerik.com/v3/index.json` exactly, no trailing slash).

* That Service Connection is selected as the credentials source.

* The credentials being used have a UI for ASP.NET Core license.

* Make sure that you use `dotnet restore` and not `nuget restore` in your pipeline step.


## GitHub Secrets

In some cases, [GitHub Secrets](https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) are used to store credentials that you would later have to consume from the `nuget.config` file in order to connect to the Telerik feed in your GitHub Actions workflows.

A way to pass them along is to mark them as environment variables. You can find an example in the [DevOpsExamples repo by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples). Here follow the two relevant extracts.

>caption Example of setting GitHub Secrets into Environment Variables for Telerik Login

````YAML
jobs:
  build:
    runs-on: windows-latest

    env:
      TELERIK_USERNAME: ${ { secrets.MyTelerikAccountUsername } }  # remove the space between the brackets
      TELERIK_PASSWORD: ${ { secrets.MyTelerikAccountPassword } }  # remove the space between the brackets

````

>tip Even though you are copying secrets into Environment Variables on the runner, Github Actions will continue to treat the values as protected string and mask the values in all output.

Finally, you need a `nuget.config` file that lists the Telerik server in the `packageSources`, as well as an accompanying `packageSourceCredentials` that uses those named environment variables for the `Username` and `ClearTextPassword` keys.

>caption Example of Using Environment Variables in NuGet.config

````XML
<packageSources>
  <clear />
  <add key="NuGet" value="https://api.nuget.org/v3/index.json" />
  <add key="TelerikFeed" value="https://nuget.telerik.com/v3/index.json" />
</packageSources>
<packageSourceCredentials>
  <TelerikFeed>
    <add key="Username" value="%TELERIK_USERNAME%" />
    <add key="ClearTextPassword" value="%TELERIK_PASSWORD%" />
  </TelerikFeed>
</packageSourceCredentials>
````

>warning GitHub does not allow secrets to be used in workflows that have been [triggered by a pull request event](https://docs.github.com/en/actions/reference/events-that-trigger-workflows). In such a case, the runner will not be able to authenticate with the Telerik NuGet server and the job will expectedly fail.



## Further Reading

You may find useful the following Microsoft articles on securing your NuGet feed setup and supply chain as general best practices:

* [Lock down your dependencies using configurable trust policies - Blog Post](https://devblogs.microsoft.com/nuget/lock-down-your-dependencies-using-configurable-trust-policies/)

* [How to Scan NuGet Packages for Security Vulnerabilities - Blog Post](https://devblogs.microsoft.com/nuget/how-to-scan-nuget-packages-for-security-vulnerabilities/)

* [Best practices for a secure software supply chain - MSDN docs](https://docs.microsoft.com/en-us/nuget/concepts/security-best-practices)

## See Also

* [Blog Post: Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
* [DevOpsExamples repo by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)
* [Setup of the Telerik Online Private NuGet Feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%})
* [NuGet Feed Troubleshooting]({%slug nuget_install_aspnetmvc6_aspnetmvc%}#troubleshooting)


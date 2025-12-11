---
title: CI, CD, Build Server
page_title: CI, CD, Build Server
description: CI, CD, Build Server setup involving the {{ site.product }}.
components: ["general"]
slug: deployment_ci_cd_build
position: 1
---

# CI, CD, Build Server Setup

This article explains some concepts and how to troubleshoot the most common errors related to setting up the Telerik NuGet packages for automated builds, CI and CD.

> To successfully set up a CI/CD environment for {{ site.framework }} apps, also refer to the article about [Telerik license keys in CI/CD]({% slug deployment_license_key_aspnetcore %}).

Sections in this article:

* [Basics](#basics)
* [Azure DevOps Pipelines](#azure-devops-pipelines)
* [GitHub Secrets](#github-secrets)
* [Docker](#docker)

## Basics

Often enough, you would want to set up Continuous Integration and/or Continuous Delivery (CI/CD) pipelines or builds for your project that uses the Telerik components. This is a valid scenario and the "one license per developer" license does not prevent you from doing so. The Telerik components are commercial software and as such can only be distributed through channels that are private and/or behind authentication.

There are a couple of common ways people implement CI/CD automated builds.

* You can [restore the Telerik NuGet packages]({%slug nuget_keys%}) by downloading them from the Telerik NuGet server using token-based authentication with a [NuGet API key](https://www.telerik.com/account/downloads/api-keys). This is the recommended secure approach for CI/CD environments. See more on setting up the [Telerik Private NuGet feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%}).

* Creating a local folder (for example, on a shared network drive or other suitable location accessible only by your builds and team) that holds the `.nupkg` files we provide (you can download them from your telerik.com account, or from your local installation - both [automated]({%slug msi_install_aspnetmvc6_aspnetmvc%}) and from the zip archive).

You must protect your credentials and/or the Telerik packages and ensure they are used only by you and not by other developers, according to the [license-per-developer policy](https://www.telerik.com/purchase/license-agreement/kendo-ui). As long as your credentials are obfuscated/masked, they can be used by your colleagues (e.g. developers, QAs, designers, front-end devs, DBAs, etc.) for building and running a solution, provided they do not use the Telerik components to create functionality. Most importantly, you must ensure that such credentials or package sources are not available to the general public (for example, in public repositories). 


## Azure DevOps Pipelines

When using Azure pipelines, we encourage you to review the following resources on setting things up:

* Blog post: [Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
* Sample Repo and Video Tutorial: [Telerik DevOpsExamples by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)

There are a couple of common questions and issues:

* Obtaining credentials&mdash;See the points above for either using your own credentials, or using a shared package source.
* Telerik feed not being found&mdash;The most common reason for a problem is that the path to the `NuGet.Config` file is wrong (it must, by default, be at the root level).
* An `index.json not found` error can occur from many root causes. If you have successfully authenticated, this error usually means that the feed was not able to be searched or connected to. A common reason is an incorrect feed URL, such as including a trailing slash&mdash;Correct: `https://nuget.telerik.com/v3/index.json` and Incorrect: `https://nuget.telerik.com/v3/index.json/`.

A few things to double check to ensure correct setup:

* The Service connection is using Basic Authentication and the URL is correct (`https://nuget.telerik.com/v3/index.json` exactly, no trailing slash).
* That Service Connection is selected as the credentials source.
* The credentials being used have a {{ site.product_short }} license.
{% if site.core %}
* Ensure that you use `dotnet restore` and not `nuget restore` in your pipeline step.
{% endif %}

## GitHub Secrets

For GitHub Actions workflows, use NuGet API keys for secure authentication with the Telerik NuGet server. See [Restoring NuGet Packages in Your CI Workflow]({% slug nuget_keys %}) for detailed instructions.

To set up API key authentication:

1. [Generate a NuGet API key](https://www.telerik.com/account/downloads/api-keys) from your Telerik account.
1. Store it as a [GitHub Actions Secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) named `TELERIK_NUGET_KEY`.
1. Use the API key in your workflow as shown in [Restoring NuGet Packages in Your CI Workflow]({% slug nuget_keys %}#using-api-keys).

>warning GitHub does not allow secrets to be used in workflows that have been [triggered by a pull request event](https://docs.github.com/en/actions/reference/events-that-trigger-workflows). In such a case, the runner will not be able to authenticate with the Telerik NuGet server and the job will expectedly fail.

## Docker

When building or restoring {{ site.framework }} apps in Docker, the crucial steps are:

1. Have a `NuGet.Config` file in the project or solution folder. The file can [define the Telerik NuGet feed]({% slug nuget_install_aspnetmvc6_aspnetmvc %}#setup-with-nugetconfig), but without the credentials.
1. Copy the `NuGet.Config` file together with the `.csproj` file(s) to the Docker image.
1. [Add](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source) or [update](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-update-source) the Telerik NuGet feed with the [stored Telerik NuGet credentials (secrets)]({% slug nuget_keys %}). When specifying the `NuGet.Config` file location, note that file names are case-sensitive on Unix systems.
1. Restore or build the app.

{% if site.core %}
The following code is the build portion of a sample `Dockerfile` that builds a .NET 8 ASP.NET Core app. The `dotnet restore` command is executed from the `src` folder of the Docker image (where the `NuGet.Config` is copied), so that the `NuGet.Config` file can be used to restore all projects in the solution.

```SH
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file to restore
COPY ["MyAspNetCoreApp/MyAspNetCoreApp.csproj", "MyAspNetCoreApp/"]

# Copy the NuGet.Config file without the Telerik credentials to /src
COPY ["NuGet.Config", "."]

# Update the Telerik NuGet source and add credentials from your secrets storage
RUN dotnet nuget update source "TelerikFeed" --username ... --password ... --configfile "./NuGet.Config" --store-password-in-clear-text

# Restore the NuGet packages for the ASP.NET Core app
RUN dotnet restore "./MyAspNetCoreApp/MyAspNetCoreApp.csproj"

# Copy the whole ASP.NET Core app
COPY . .

# Build the app
WORKDIR "/src/MyAspNetCoreApp"
RUN dotnet build "./MyAspNetCoreApp.csproj" -c Release -o /app/build
```
{% else %}
The following code is the build portion of a sample `Dockerfile` that builds a .NET Framework 4.8 ASP.NET MVC app. The `nuget.exe restore` command is executed from the `src` folder of the Docker image (where the `NuGet.Config` is copied), so that the `NuGet.Config` file can be used to restore all packages for the project. The `nuget.exe` tool must be downloaded first as it is not included in the SDK image by default.

```SH
FROM mcr.microsoft.com/dotnet/framework/sdk:4.8-windowsservercore-ltsc2019 AS build
WORKDIR /src

# Download nuget.exe (required for .NET Framework)
RUN powershell -Command "Invoke-WebRequest -Uri https://dist.nuget.org/win-x86-commandline/latest/nuget.exe -OutFile nuget.exe"

# Copy the project file to restore
COPY ["MyMvcApp/MyMvcApp.csproj", "MyMvcApp/"]
COPY ["MyMvcApp/packages.config", "MyMvcApp/"]

# Copy the NuGet.Config file without the Telerik credentials to /src
COPY ["NuGet.Config", "."]

# Update the Telerik NuGet source and add credentials from your secrets storage
RUN nuget.exe sources update -Name "TelerikFeed" -username ... -password ... -ConfigFile "./NuGet.Config" --store-password-in-clear-text

# Restore the NuGet packages for the ASP.NET MVC app
RUN nuget.exe restore "./MyMvcApp/MyMvcApp.csproj"

# Copy the whole app
COPY . .

# Build the app
WORKDIR "/src/MyMvcApp"
RUN msbuild "./MyMvcApp.csproj" /p:Configuration=Release /p:Platform="Any CPU" /p:OutputPath=C:\app\build
```
{% endif %}

## Further Reading

@[template](/_contentTemplates/issues-and-warnings.md#nuget-security-links)

## See Also

* [Install License Key in CI/CD Environment]({%slug deployment_license_key_aspnetcore%})
* [Blog Post: Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
* [DevOpsExamples repo by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)
* [Setup of the Telerik Online Private NuGet Feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%})
* [NuGet Feed Troubleshooting]({%slug troubleshooting_telerik_nuget%})


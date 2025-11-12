---
title: License Key
page_title: Setting Up Your Telerik License Key in CI/CD
description: Learn how to create and install a Telerik license key file in continuous integration and continuous delivery (CI/CD) workflows and environments.
slug: deployment_license_key_aspnetcore
position: 2
---

# Telerik License Key in CI/CD Environment

This article describes how to set up and activate your [{{ site.product }} license key]({% slug installation_license_key_aspnetcore %}) across a few popular cloud build and deployment services. You can find guidance and examples on how to set environment variables for some of the most popular CI/CD platforms.

@[template](/_contentTemplates/licensing-templates.md#ci-cd-support)

## Basics

A Telerik license key is required during application build. During application deployment, this includes all steps that:

* Build the app {% if site.core %}with `dotnet build`{% endif %}
* Run unit tests{% if site.core %}, unless the `dotnet test` command uses the `--no-build` option{% endif %}
* Publish the app{% if site.core %}, unless the `dotnet publish` command uses the `--no-build` option{% endif %}

The Telerik license activation process in CI/CD test, build, staging, and production environments involves the following steps:

1. Go to the [License Keys page](https://www.telerik.com/account/your-licenses/license-keys) in your Telerik account and download your license key.
1. Set an environment variable with either of the following names:
    * `TELERIK_LICENSE`&mdash;the value must be the Telerik license key string.
    * `TELERIK_LICENSE_PATH`&mdash;the value must be the full path to the license key file, including the license file name itself. `TELERIK_LICENSE_PATH` requires `Telerik.Licensing` version `1.4.9` and above.
1. (optional) [Fail the build and deployment](#abort-deployment-on-license-key-error) if there is an issue with the license key.

In most cases, the recommended way to provide your license key to the `Telerik.Licensing` NuGet package in CI/CD environments is to use one of the available environment variables.

> Treat the license key and the license file as secrets. Always store and retrieve them in a secure manner, according to the build platform's best practices.

## Environment Variable Length Limitations

The Telerik license key size depends on the number of licenses it includes, including renewals. Some environments may have a limit on the environment variable size, which is smaller than your Telerik license key length. Such examples include:

* Windows and Windows Server machines (up to 32,767 characters for all environment variables and much smaller limits for setting variables in the Registry or the system settings)
* [GitLab](https://docs.gitlab.com/ci/variables/) (up to 10,000 characters)

In such cases, use `TELERIK_LICENSE_PATH` or [only a license file](slug:installation_license_key_aspnetcore#manual-installation) instead of `TELERIK_LICENSE`. The `TELERIK_LICENSE_PATH` variable must point to the Telerik license file location, including the `telerik-license.txt` file name itself. The license file must be stored and provided to the deployment pipeline in a secure manner.

## Azure Pipelines

Azure Pipelines provides built-in tools to store and use secret environment variables and secure files. The recommended option with **Classic** pipelines is to [download the Telerik license file as a secure file](#use-telerik_license_path).

### Use TELERIK_LICENSE

1. Create a new [secret variable](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch#secret-variables). Also check the separate article [Set Secret Variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables).
1. Paste the contents of the license key file as a value of the secret variable.
1. Map the secret variable to a new environment variable named `TELERIK_LICENSE`.
1. Use the `TELERIK_LICENSE` environment variable in the tasks, steps, or scripts that build and publish the {{ site.framework }} app. **Classic** pipelines may need to [set an output variable to share and consume the license key in multiple steps](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-variables-scripts?view=azure-devops&tabs=bash#set-an-output-variable-for-use-in-future-jobs).

>caption Using a TELERIK_LICENSE environment variable in Azure Pipeline YAML

{% if site.core %}
```YAML
steps:

- task: DotNetCoreCLI@2
  inputs:
    command: 'build'
    # ...
  env:
    TELERIK_LICENSE: $(Secret_Telerik_License_Key)

- task: DotNetCoreCLI@2
  inputs:
    command: 'publish'
    # ...
  env:
    TELERIK_LICENSE: $(Secret_Telerik_License_Key)
```
{% else %}
```YAML
steps:

- task: VSBuild@1
  inputs:
    solution: '**/*.sln'
    platform: 'Any CPU'
    configuration: 'Release'
  env:
    TELERIK_LICENSE: $(Secret_Telerik_License_Key)

- task: VSBuild@1
  inputs:
    solution: '**/*.sln'
    msbuildArgs: '/p:DeployOnBuild=true /p:WebPublishMethod=Package /p:PackageAsSingleFile=true /p:PackageLocation="$(Build.ArtifactStagingDirectory)"'
    platform: 'Any CPU'
    configuration: 'Release'
  env:
    TELERIK_LICENSE: $(Secret_Telerik_License_Key)
```
{% endif %}

### Use TELERIK_LICENSE_PATH

1. [Add a secure file](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/secure-files) and grant any necessary permissions to use it in the pipeline.
1. [Download the secure file](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/download-secure-file-v1?view=azure-pipelines) in a task with a `name`. The secure file path is available to other tasks through the [`secureFilePath` output](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/download-secure-file-v1?view=azure-pipelines#output-variables).
1. Set the `TELERIK_LICENSE_PATH` environment variable in all tasks, steps, or scripts that build and publish the {{ site.framework }} app.

>caption Using a TELERIK_LICENSE_PATH environment variable in Azure Pipeline YAML

{% if site.core %}
```YAML
steps:

- task: DownloadSecureFile@1
  name: telerikLicense
  displayName: 'Download telerik-license.txt'
  inputs:
    secureFile: 'telerik-license.txt'

- task: DotNetCoreCLI@2
  inputs:
    command: 'build'
    # ...
  env:
    TELERIK_LICENSE_PATH: $(telerikLicense.secureFilePath)

- task: DotNetCoreCLI@2
  displayName: 'Publish'
  inputs:
    command: 'publish'
    # ...
  env:
    TELERIK_LICENSE_PATH: $(telerikLicense.secureFilePath)
```
{% else %}
```YAML
steps:

- task: DownloadSecureFile@1
  name: telerikLicense
  displayName: 'Download telerik-license.txt'
  inputs:
    secureFile: 'telerik-license.txt'

- task: VSBuild@1
  inputs:
    solution: '**/*.sln'
    platform: 'Any CPU'
    configuration: 'Release'
  env:
    TELERIK_LICENSE_PATH: $(telerikLicense.secureFilePath)

- task: VSBuild@1
  displayName: 'Publish'
  inputs:
    solution: '**/*.sln'
    msbuildArgs: '/p:DeployOnBuild=true /p:WebPublishMethod=Package /p:PackageAsSingleFile=true /p:PackageLocation="$(Build.ArtifactStagingDirectory)"'
    platform: 'Any CPU'
    configuration: 'Release'
  env:
    TELERIK_LICENSE_PATH: $(telerikLicense.secureFilePath)
```
{% endif %}

## GitHub Actions

To set up license key authentication in GitHub Actions:

1. Create a new [Repository Secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) or an [Organization Secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-an-organization).
1. Paste the contents of the license key file as a value of the GitHub secret.
1. Assign the secret to an environment variable named `TELERIK_LICENSE`.
1. Use the `TELERIK_LICENSE` environment variable in the steps, which build and publish the {{ site.framework }} app.

> In a complete CI/CD workflow, you also need to set up NuGet package restoration authentication using `TELERIK_NUGET_KEY`. See [Restoring NuGet Packages in Your CI Workflow]({% slug nuget_keys %}) for details.

>caption Using a TELERIK_LICENSE environment variable in GitHub Actions

{% if site.core %}
```YAML
- name: Build Step
  run: dotnet build -c Release
  env:
    TELERIK_NUGET_KEY: ${{ "{{ secrets.Telerik_NuGet_Key }}" }}
    TELERIK_LICENSE: ${{ "{{ secrets.Telerik_License_Key }}" }}

- name: Publish Step
  run: dotnet publish -c Release
  env:
    TELERIK_LICENSE: ${{ "{{ secrets.Telerik_License_Key }}" }}
```
{% else %}
```YAML
- name: Build Step
  run: msbuild ProjectName.sln /p:Configuration=Release /p:Platform="Any CPU"
  env:
    TELERIK_NUGET_KEY: ${{ "{{ secrets.Telerik_NuGet_Key }}" }}
    TELERIK_LICENSE: ${{ "{{ secrets.Telerik_License_Key }}" }}

- name: Publish Step
  run: msbuild ProjectName.sln /p:Configuration=Release /p:Platform="Any CPU" /p:DeployOnBuild=true /p:WebPublishMethod=Package /p:PackageAsSingleFile=true /p:PackageLocation=publish
  env:
    TELERIK_LICENSE: ${{ "{{ secrets.Telerik_License_Key }}" }}
```
{% endif %}

Also see [Using API Keys](slug:nuget_keys#using-api-keys) in the article [Restoring NuGet Packages in Your CI Workflow](slug:nuget_keys). It shows how to use the `TELERIK_NUGET_KEY` environment variable in your CI build environment.

## Docker

1. [Create a Docker build secret](https://docs.docker.com/build/building/secrets/#using-build-secrets) that holds the Telerik license key file.

    ```SH
      docker build --secret id=telerik-license-key,src=/path/to/telerik-license.txt .
    ```

1. [Mount the secret](https://docs.docker.com/build/building/secrets/#secret-mounts) and set a `TELERIK_LICENSE` [environment variable in the build container](https://docs.docker.com/build/building/secrets/#target). The environment variable is required when building and publishing the {{ site.product }} app.

    {% if site.core %}
    ```SH
    RUN --mount=type=secret,id=telerik-license-key,env=TELERIK_LICENSE \
        dotnet publish ProjectName.csproj -c Release -o /app/publish /p:UseAppHost=false
    ```
    {% else %}
    ```SH
    RUN --mount=type=secret,id=telerik-license-key,env=TELERIK_LICENSE \
      msbuild "ProjectName.csproj" /p:Configuration=Release /p:Platform="Any CPU" /p:DeployOnBuild=true /p:PublishUrl=C:\app\publish
    ```
    {% endif %}

## Abort Deployment on License Key Error

To avoid accidental [license watermarks and notifications on your live site]({% slug licensing-faq %}#will-telerik-ui-for-aspnet-core-function-with-an-expired-license-key), you can fail the application build and abort deployment when there is an issue with the license key. There are multiple ways to list the [Telerik license warning codes]({% slug troubleshooting-license-key-errors %}#error-messages) to be treated as errors:

* Add а `<TelerikLicensingStrict>` tag to the `.csproj` project file. This approach requires `Telerik.Licensing` version `1.6.5` and above.

  {% if site.core %}
  ```XML
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <TelerikLicensingStrict Condition="$(Configuration) == 'Release'">true</TelerikLicensingStrict>
  </PropertyGroup>
  ```
  {% else %}
  ```XML
  <PropertyGroup>
    <TelerikLicensingStrict Condition="$(Configuration) == 'Release'">true</TelerikLicensingStrict>
  </PropertyGroup>
  ```
  {% endif %}

* [Add a `<WarningsAsErrors>` tag](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/errors-warnings#warningsaserrors-and-warningsnotaserrors) to the `.csproj` project file:

  {% if site.core %}
  ```XML
  <PropertyGroup>
      <TargetFramework>net8.0</TargetFramework>
      <Nullable>enable</Nullable>
      <ImplicitUsings>enable</ImplicitUsings>
      <WarningsAsErrors>TKL001;TKL002;TKL003;TKL004;TKL101;TKL102;TKL103;TKL104;TKL105</WarningsAsErrors>
  </PropertyGroup>
  ```
  {% else %}
  ```XML
  <PropertyGroup>
      <WarningsAsErrors>TKL001;TKL002;TKL003;TKL004;TKL101;TKL102;TKL103;TKL104;TKL105</WarningsAsErrors>
  </PropertyGroup>
  ```
  {% endif %}

{% if site.core %}
* [Set the `-warnaserror` MSBuild switch](https://learn.microsoft.com/en-us/visualstudio/msbuild/msbuild-command-line-reference?view=vs-2022#switches) in the [`dotnet build` command](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#msbuild):

  ```SH
  dotnet build -warnaserror:"TKL001;TKL002;TKL003;TKL004;TKL101;TKL102;TKL103;TKL104;TKL105"
  ```
{% else %}
* [Set the `-warnaserror` MSBuild switch](https://learn.microsoft.com/en-us/visualstudio/msbuild/msbuild-command-line-reference?view=vs-2022#switches) in the MSBuild command:

  ```SH
  msbuild ProjectName.csproj /p:WarningsAsErrors="TKL001;TKL002;TKL003;TKL004;TKL101;TKL102;TKL103;TKL104;TKL105"
  ```
{% endif %}

## Next Steps

* [Restore Telerik NuGet Packages in CI/CD Workflows]({% slug nuget_keys %})

## See Also

* [Licensing FAQ]({%slug licensing-faq%})
* [CI, CD, Build Server]({%slug deployment_ci_cd_build%})
{% if site.core %}
* [Getting Started with {{ site.product }}]({%slug gettingstarted_aspnetmvc6_aspnetmvc%})
{% else %}
* [Getting Started with {{ site.product }}]({%slug setupwithnuget_aspnetmvc%})
{% endif %}
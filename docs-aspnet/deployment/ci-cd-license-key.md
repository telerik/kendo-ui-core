---
title: Setting Up Your License Key in CI/CD
page_title: Setting Up Your License Key in CI/CD
description: Learn how to create and install a Telerik license key file in continuous integration and continuous delivery (CI/CD) workflows and environments.
slug: deployment_license_key_aspnetcore
position: 11
---

# Setting Up Your License Key in CI/CD Environment

This article describes how to set up and activate your [{{ site.product }} license key]({%slug installation_license_key_aspnetcore%}) across a few popular CI/CD services by using environment variables.

@[template](/_contentTemplates/licensing-templates.md#ci-cd-support)

## Basics

When working with CI/CD platforms, always add the [`Telerik.Licensing` NuGet package]({%slug installation_license_key_aspnetcore%}#list-of-provided-packages) as a project dependency. This package activates the {{ site.product_short }} components at build time by using the provided license key.

The license activation process in a CI/CD environment involves the following steps:

1. Add the `Telerik.Licensing` NuGet package as a dependency to all projects that reference {{ site.product }} or Telerik Document Processing:
    ```
    <PackageReference Include="Telerik.Licensing" Version="1.*" />
    ```
1. Go to the <a href="https://www.telerik.com/account/your-licenses/license-keys" target="_blank">License Keys page</a> in your Telerik account and get your license key.
1. Set your license key value as an environment variable with a name `TELERIK_LICENSE`.

## Creating Environment Variables

The recommended way to provide your license key to the `Telerik.Licensing` NuGet package in CI/CD environment is to use environment variables. Each CI/CD platform has a different process for setting environment variables. This article lists only some of the most popular examples.

### Azure Pipelines (YAML)

1. Create a new <a href="https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch" target="_blank">user-defined variable</a> named `TELERIK_LICENSE`.
1. Paste the contents of the license key file as a value.

### Azure Pipelines (Classic)

1. Create a new <a href="https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=classic%2Cbatch" target="_blank">user-defined variable</a> named `TELERIK_LICENSE`.
1. Paste the contents of the license key file as a value.

### GitHub Actions

1. Create a new <a href="https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository" target="_blank">Repository Secret</a> or an <a href="https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-an-organization" target="_blank">Organization Secret</a>.
1. Set the name of the secret to `TELERIK_LICENSE` and paste the contents of the license file as a value.
1. After running `npm install` or `yarn`, add a build step to activate the license:
    ```YAML
    env:
        TELERIK_LICENSE: {% raw %}${{ secrets.Telerik_License_Key }}{% endraw %}
    ```

## Next Steps

* [Restore Telerik NuGet Packages in CI/CD Workflows]({%slug nuget_keys%})

## See Also

* [Licensing FAQ]({%slug licensing-faq%})
* [CI, CD, Build Server]({%slug deployment_ci_cd_build%})
{% if site.core %}
* [Getting Started with {{ site.product }}]({%slug gettingstarted_aspnetmvc6_aspnetmvc%})
{% else %}
* [Getting Started with {{ site.product }}]({%slug setupwithnuget_aspnetmvc%})
{% endif %}

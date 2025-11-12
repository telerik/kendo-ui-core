---
title: Deployment Troubleshooting
page_title: Deployment Troubleshooting
description: Troubleshooting deployment issues involving the {{ site.product_short }} suite.
slug: deployment_troubleshooting
position: 20
---

# Deployment Troubleshooting

This page provides information for common issues you may encounter while deploying applications with the {{ site.product_short }} components.

>important The machine that performs the publish build must be able to properly restore the referenced Telerik NuGet packages. For guidelines on how to use our online feed, refer to [Setting Up the Telerik NuGet Feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%}#setting-up-the-telerik-nuget-feed). See the [CI, CD, Build Server]({%slug deployment_ci_cd_build%}) article for more details on setting automation up.

@[template](/_contentTemplates/general-info.md#status-telerik-com)

## Reported Issues

At the time of writing, sometimes the following issues have been reported that pertain to the {{ site.product }} suite:

{% if site.core %}
* `Unable to find package Telerik.UI.for.AspNet.Core` is a common pitfall in build environments. See the [NuGet Troubleshooting]({% slug troubleshooting_telerik_nuget %}#unable-to-find-package) article, which also provides other NuGet-related tips.
{% else %}
* `Unable to find package Telerik.UI.for.AspNet.Mvc5` is a common pitfall in build environments. See the [NuGet Troubleshooting]({% slug troubleshooting_telerik_nuget %}#unable-to-find-package) article, which also provides other NuGet-related tips.
{% endif %}
* [License banners or watermarks](#your-deployed-application-shows-a-banner-or-a-watermark)

@[template](/_contentTemplates/licensing-templates.md#ci-cd-support)

### Your Deployed Application Shows a Banner or a Watermark

Ensure that you have set up an environment variable by following the steps from the [Use License Keys in CI/CD]({%slug deployment_license_key_aspnetcore%}) article.


## See Also

* [Blog Post: Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
* [DevOpsExamples repo by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)
* [Setup of the Telerik Online Private NuGet Feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%})
* [NuGet Feed Troubleshooting]({%slug troubleshooting_telerik_nuget%}) 
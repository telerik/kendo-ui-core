---
title: Deployment Troubleshooting
page_title: Deployment Troubleshooting
description: Troubleshooting deployment issues involving the UI for ASP.NET Core suite.
slug: deployment_troubleshooting
position: 20
---

# Deployment Troubleshooting

This page provides information for common issues you may encounter while deploying applications with the UI for ASP.NET Core components.


>important The machine that performs the publish build must be able to properly restore the referenced Telerik NuGet packages. See the [CI, CD, Build Server]({%slug deployment_ci_cd_build%}) article for more details on setting automation up.


### Trial Message

`Trial Message` - Such behavior will occur if there is a reference to the UI for ASP.NET Core Trial version left in the application. Make sure that the trial version is removed from the release build pipeline. Follow the steps described in the [Switching to a Developer License]({%slug upgrade_aspnetcore%}#switching-to-a-developer-license) article.


## See Also

* [Blog Post: Azure DevOps and Telerik NuGet Packages](https://www.telerik.com/blogs/azure-devops-and-telerik-nuget-packages)
* [DevOpsExamples repo by Lance McCarthy](https://github.com/LanceMcCarthy/DevOpsExamples)
* [Setup of the Telerik Online Private NuGet Feed]({%slug nuget_install_aspnetmvc6_aspnetmvc%})
* [NuGet Feed Troubleshooting]({%slug nuget_install_aspnetmvc6_aspnetmvc%}#troubleshooting) 
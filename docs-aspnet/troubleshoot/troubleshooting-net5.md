---
title: Upgrading to .NET 5
page_title: Upgrading to .NET 5 Troubleshooting
description: "Learn about the solutions of issues that may occur while upgrading your project to .NET 5."
slug: troubleshooting_net5
position: 4
---

# Upgrading to .NET 5

After upgarding the `TargetFramework` of the solution to `net5.0` and upgrading the `Microsoft.VisualStudio.Web.CodeGeneration.Design` reference to 5.0.0, you may get the following errors when building the solution:

`Version conflict detected for Microsoft.CodeAnalysis.CSharp.Workspaces. Install/reference Microsoft.CodeAnalysis.CSharp.Workspaces 3.7.0 directly to project MyProject to resolve this issue.`

`Version conflict detected for Microsoft.CodeAnalysis.Common. Install/reference Microsoft.CodeAnalysis.Common 3.7.0 directly to project MyProject to resolve this issue.`

Telerik.UI.for.AspNet.Core depends on version 3.3.1 or a higher version of the following packages:

    <PackageReference Include="Microsoft.CodeAnalysis" Version="3.3.1" />
    <PackageReference Include="Microsoft.CodeAnalysis.CSharp" Version="3.3.1" />

However, automatic dependencies resolution is not achieved by updating the `Microsoft.VisualStudio.Web.CodeGeneration.Design` reference to 5.0.0 and trying to restore packages.

**Solution**

Install the all-in-one NuGet package `Microsoft.CodeAnalysis` version 3.7.0 or higher and build the solution.

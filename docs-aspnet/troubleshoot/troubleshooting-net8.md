---
title: Upgrading to .NET 8
page_title: Upgrading to .NET 8 Troubleshooting
description: "Learn about the solutions of issues that may occur while upgrading your project to .NET 8."
slug: troubleshooting_net8
position: 4
---

# Upgrading to .NET 8

After upgrading the `TargetFramework` of the solution to `net8.0`, you may get the following errors when building the solution:

`Version conflict detected for Microsoft.CodeAnalysis.CSharp.Workspaces. Install/reference Microsoft.CodeAnalysis.CSharp.Workspaces (>= 4.5.0) directly to project MyProject to resolve this issue.`

`Version conflict detected for Microsoft.CodeAnalysis.Common. Install/reference Microsoft.CodeAnalysis.Common (>= 4.5.0) directly to project MyProject to resolve this issue.`

Telerik.UI.for.AspNet.Core depends on version 4.4.0 or a higher version of the following packages:

    <PackageReference Include="Microsoft.CodeAnalysis" Version="4.4.0" />


**Solution**

Install the all-in-one NuGet package `Microsoft.CodeAnalysis` version 4.5.0 or higher and build the solution.
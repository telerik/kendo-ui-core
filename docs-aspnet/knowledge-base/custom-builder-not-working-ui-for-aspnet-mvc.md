---
title: Custom Builder Doesn't Work for Latest Versions in UI for ASP.NET MVC
description: Learn why the Custom Download Builder does not support the latest UI for ASP.NET MVC versions and how to use the Kendo CLI to create custom scripts.
type: troubleshooting
page_title: Custom Download Builder Issue and Alternative for UI for ASP.NET MVC
meta_title: Custom Download Builder Issue and Alternative for UI for ASP.NET MVC
slug: custom-builder-not-working-ui-for-aspnet-mvc
tags: ui for asp.net mvc, custom download builder, kendo cli, custom scripts
ticketid: 1718654
ticketed: true
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2026.3.811</td>
 </tr>
</table>

## Description

The Custom Download Builder does not currently support the latest versions of UI for ASP.NET MVC. The tool only allows older versions to be selected, and the form does not complete when you try to use a newer version.

## Steps to Reproduce

1. Open the Custom Download Builder.
1. Select UI for ASP.NET MVC.
1. Try to select the latest product version.
1. Observe that the latest version is unavailable or that the form does not complete the custom download.

## Cause

The exact internal cause is not known at this time. At the time of this report, the online Custom Download Builder was being updated and did not support the latest UI for ASP.NET MVC versions.

## Solution

Use the Kendo CLI to create a custom Kendo UI for jQuery script bundle. UI for ASP.NET MVC uses Kendo UI for jQuery client-side resources, so the generated bundle can be used with the MVC server-side wrappers.

### Install the Kendo CLI

Install Node.js 22 or 24, then install the Kendo CLI globally:

````SH
npm i -g @progress/kendo-cli
````

Verify that the CLI is available:

````SH
kendo --version
````

### Generate a Custom Script Bundle

Create a working folder for the custom build and start the interactive builder:

````SH
mkdir custom-build
cd custom-build
kendo custom-build jquery
````

Follow the prompts to select the Kendo UI components and features required by the MVC application.

To generate a bundle for a specific version, use the `--version` option:

````SH
kendo custom-build jquery --version 2026.3.811
````

The `--version` option supports Kendo UI versions starting with 2026. If you already have a `kendo-config.json` file, reuse it without starting the interactive flow:

````SH
kendo custom-build jquery --no-interactive
````

The command generates a custom Kendo UI for jQuery bundle containing the selected components and features.

### Reference the Custom Bundle

Copy the generated bundle to the MVC application's client resources. Replace the standard `kendo.all.min.js` reference with the generated custom bundle, and load the MVC wrapper script after it.

The following example assumes that the generated file is named `kendo.custom.min.js`:

````HTML.skip-repl
<script src="~/lib/jquery/jquery.min.js"></script>
<script src="~/js/kendo.custom.min.js"></script>
<script src="~/js/kendo.aspnetmvc.min.js"></script>
````

Use compatible versions of the MVC assemblies, Kendo UI client-side resources, and theme files.

## See Also

- [Building Custom Kendo UI Scripts Locally](https://docs.telerik.com/kendo-ui/intro/installation/custom-builder-cli)
- [Using the Kendo CLI](https://docs.telerik.com/kendo-ui/intro/installation/kendo-cli)
- [UI for ASP.NET MVC Documentation](https://docs.telerik.com/aspnet-mvc/introduction)
- [UI for ASP.NET MVC Knowledge Base](https://docs.telerik.com/aspnet-mvc/knowledge-base)
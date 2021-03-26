---
title: 2018 Releases
page_title: 2018 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2018."
slug: breakingchanges_aspnetcore_2018
position: 3
---

# 2018 Releases

## Kendo UI R2 2018

As of the Kendo UI R2 2018 release, the sample application, which represents an offline version of the [Telerik UI for ASP.NET Core Demos](https://demos.telerik.com/aspnet-core), is only available for Visual Studio 2017. The Visual Studio 2015 version which contains the deprecated `project.json` base version is no longer distributed.

## Kendo UI R1 2018 SP1

To enable more complex scenarios for widget configuration and ensure the tag-naming consistency across the Telerik UI for ASP.NET Core suite, the Kendo UI R1 2018 release introduces changes in the tags of the following wrappers:

* Dialog&mdash;Previously, it was possible to nest content directly in the `<kendo-dialog>` tag. Now the content must be nested within a `<content>` tag.
* Window&mdash;Previously, it was possible to nest content directly in the `<kendo-window>` tag. Now the content must be nested within a `<content>` tag.
* Upload:
  * The `<kendo-upload-async-settings>` tag name is now changed to `<async>`.
  * The `<kendo-upload-files>` tag name is now changed to `<files>`.
  * The `<kendo-upload-file>` tag name is now changed to `<file>`.
  * The `<kendo-upload-localization-settings>` tag name is now changed to `<localization>`.
  * The `<kendo-upload-validation-settings>` tag name is now changed to `<validation>`.
* Splitter&mdash;Previously, the tag name of the pane was `<kendo-splitter-pane>`. The tag name is now changed to `<pane>`.


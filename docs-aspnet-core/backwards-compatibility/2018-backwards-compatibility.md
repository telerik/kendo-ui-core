---
title: 2018 Releases
page_title: 2018 Releases | Telerik UI for ASP.NET Core
description: "Learn about the breaking changes and backwards compatibility released by Telerik UI for ASP.NET Core in 2018."
previous_url: https://docs.telerik.com/aspnet-core/backwards-compatibility
slug: breakingchanges_aspnetcore
position: 1
---

# 2018 Releases

## Kendo UI R2 2018

### Changes from 2018 R1 SP1

As of the Kendo UI R2 2018 release, the sample application, which represents an offline version of the [Telerik UI for ASP.NET Core Demos](http://demos.telerik.com/aspnet-core), is only available for Visual Studio 2017. The Visual Studio 2015 version which contains the deprecated `project.json` base version is no longer distributed.

## Kendo UI R1 2018 SP1

### Changes from 2018 R1

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

[Telerik UI for ASP.NET Core](http://www.telerik.com/aspnet-core-ui) is a set of server-side wrappers that allows you to use the [Kendo UI widgets](https://docs.telerik.com/kendo-ui/introduction) from the server code. That is why, all important changes in the Kendo UI suite also apply to the client-side code and behavior of the Telerik UI for ASP.NET Core wrappers. For the list of all breaking changes, refer to the articles on the [Kendo UI breaking changes](https://docs.telerik.com/kendo-ui/backwards-compatibility/2017-backward-compatibility).

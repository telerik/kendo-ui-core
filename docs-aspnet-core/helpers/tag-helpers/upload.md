---
title: Upload
page_title: Upload | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Upload tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/upload
slug: taghelpers_upload_aspnetcore
---

# Upload Tag Helper Overview

The Upload tag helper helps you configure the Kendo UI Upload widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Upload by using the Upload tag helper.

> **Important**
>
> A change in the Upload's tag names has been introduced in R1 2018, in order to ensure tag naming consistency across the Telerik UI for ASP.NET Core suite. Since R1 2018 release the `<kendo-upload-async-settings>` tag name has been changed to `<async>`, `<kendo-upload-files>` to `<files>`, `<kendo-upload-file>` to `<file>`, `<kendo-upload-localization-settings>` to `<localization>`, `<kendo-upload-validation-settings>` to `<validation>`.

###### Example

        <kendo-upload drop-zone="drop-zone1" name="test">
            <async auto-upload="true" />
            <validation allowed-extensions="@Model.Extensions" />
            <files>
                <file name="dummy" size="1024" />
            </files>
        </kendo-upload>


### Configuration

The Upload tag helper configuration options are passed as attributes of the tag or attributes of the nested composite and collection properties.

###### Example

```tab-cshtml

        @(Html.Kendo().Upload()
            .Name("upload1")
            .DropZone("drop-zone1")
            .Validation(v => v.AllowedExtensions(Model.Extensions))
            .Files(f => f.Add().Name("dummy").Size(1024))
    )
```
```tab-tagHelper
        <kendo-upload drop-zone="drop-zone1" name="test">
            <async auto-upload="true" />
            <validation allowed-extensions="@Model.Extensions" />
            <files>
                <file name="dummy" size="1024" />
            </files>
        </kendo-upload>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})

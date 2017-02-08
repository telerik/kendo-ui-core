---
title: Upload
page_title: Upload | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Upload tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_upload_aspnetcore
---

# Upload Tag Helper

The Upload tag helper helps you configure the Kendo UI Upload widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Upload by using the Upload tag helper.

###### Example

        <kendo-upload drop-zone="drop-zone1" name="test">
            <kendo-upload-async-settings auto-upload="true" />
            <kendo-upload-validation-settings allowed-extensions="@Model.Extensions" />
            <kendo-upload-files>
                <kendo-upload-file name="dummy" size="1024"/>
            </kendo-upload-files>
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
            <kendo-upload-async-settings auto-upload="true" />
            <kendo-upload-validation-settings allowed-extensions="@Model.Extensions" />
            <kendo-upload-files>
                <kendo-upload-file name="dummy" size="1024"/>
            </kendo-upload-files>
        </kendo-upload>
```

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})

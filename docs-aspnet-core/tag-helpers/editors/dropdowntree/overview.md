---
title: Overview
page_title: DropDownTree | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI DropDownTree tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/dropdowntree, /aspnet-core/helpers/tag-helpers/dropdowntree
slug: taghelpers_dropdowntree_aspnetcore
position: 1
---

# DropDownTree Tag Helper Overview

The DropDownTree tag helper helps you configure the Kendo UI DropDownTree widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the DropDownTree by using the DropDownTree tag helper.

###### Example

    <kendo-dropdowntree name="dropdowntree1">
    </kendo-dropdowntree>

## Configuration

The DropDownTree tag helper configuration options are passed as attributes of the tag. You can configure the items by binding the widget to `<hierarchical-datasource>`.

```tagHelper
    <kendo-dropdowntree name="dropdowntree1" datatextfield="FullName">
        <hierarchical-datasource>
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Employees" datatype="jsonp" />
            </transport>
            <schema type="json">
                <hierarchical-model id="EmployeeId" has-children="HasEmployees">
                </hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-dropdowntree>
```
```cshtml
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Items(dropdowntree =>
        {
            dropdowntree.Add().Text("My Web Site")
                .SpriteCssClasses("folder")
                .Expanded(true)
                .Items(root =>
                {
                    root.Add().Text("images")
                        .Expanded(true)
                        .SpriteCssClasses("folder")
                        .Items(images =>
                        {
                            images.Add().Text("logo.png")
                                .SpriteCssClasses("image");
                        });

                    root.Add().Text("resources")
                        .Expanded(true)
                        .SpriteCssClasses("folder")
                        .Items(resources =>
                        {
                            resources.Add().Text("pdf")
                                .Expanded(true)
                                .SpriteCssClasses("folder")
                                .Items(pdf =>
                                {
                                    pdf.Add().Text("prices.pdf")
                                        .SpriteCssClasses("pdf");
                                });

                            resources.Add().Text("zip")
                                .SpriteCssClasses("folder");
                        });

                    root.Add().Text("about.html")
                        .SpriteCssClasses("html");

                    root.Add().Text("index.html")
                        .SpriteCssClasses("html");
                });
        })
    )
```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})

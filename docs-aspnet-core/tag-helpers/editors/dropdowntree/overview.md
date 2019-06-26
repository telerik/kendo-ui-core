---
title: Overview
page_title: DropDownTree Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI DropDownTree tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/dropdowntree, /aspnet-core/helpers/tag-helpers/dropdowntree
slug: taghelpers_dropdowntree_aspnetcore
position: 1
---

# DropDownTree Tag Helper Overview

The [DropDownTree](http://docs.telerik.com/kendo-ui/controls/editors/dropdowntree/overview) widget represents an editor of hierarchical data, rendered in a tree-like structure, which provides multiple selection option and custom nodes.

The DropDownTree tag helper extension is a server-side wrapper for the [Kendo UI DropDownTree](http://demos.telerik.com/kendo-ui/dropdowntree/index) widget and enables you to configure the Kendo UI DropDownTree widget in ASP.NET Core applications.

## Initializing the DropDownTree

The following example demonstrates how to define the DropDownTree by using the DropDownTree tag helper.

    <kendo-dropdowntree name="dropdowntree1">
    </kendo-dropdowntree>

## Basic Configuration

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

* [Basic Usage of the DropDownTree Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dropdowntree/tag-helper)
* [JavaScript API Reference of the DropDownTree](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)

---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TreeView TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/treeview, /helpers/tag-helpers/treeview
slug: taghelpers_treeview_aspnetcore
position: 1
---

# TreeView TagHelper Overview

The Telerik UI TreeView TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI TreeView widget.

The TreeView displays hierarchical data in a traditional tree structure.

* [Demo page for the TreeView](https://demos.telerik.com/aspnet-core/treeview/tag-helper)

## Initializing the TreeView

The following example demonstrates how to define the TreeView by using the TreeView TagHelper.

        <kendo-treeview name="treeView1">
        </kendo-treeview>

## Basic Configuration

The TreeView TagHelper configuration options are passed as attributes of the tag. You can configure the items by using a nested `<items>` tag and also bind the widget to `<hierarchical-datasource>`.

```tagHelper
    <kendo-treeview name="treeview2" datatextfield="FullName">
        <hierarchical-datasource>
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Employees" datatype="jsonp" />
            </transport>
            <schema type="json">
                <hierarchical-model id="EmployeeId" has-children="HasEmployees">
                </hierarchical-model>
            </schema>
        </hierarchical-datasource>
    </kendo-treeview>
```
```tagHelper-items
    <kendo-treeview name="treeView1">
        <items>
            <treeview-item text="Web Site" expanded="true" sprite-css-class="folder">
                <items>
                    <treeview-item text="images" expanded="true" sprite-css-class="folder">
                        <items>
                            <treeview-item text="logo.png" sprite-css-class="image"></treeview-item>
                        </items>
                    </treeview-item>
                    <treeview-item text="resources" expanded="true" sprite-css-class="folder">
                        <items>
                            <treeview-item text="pdf" expanded="true" sprite-css-class="folder">
                                <items>
                                    <treeview-item text="prices.pdf" sprite-css-class="pdf"></treeview-item>
                                </items>
                            </treeview-item>
                        </items>
                    </treeview-item>
                    <treeview-item text="index.html" sprite-css-class="html"></treeview-item>
                </items>
            </treeview-item>
        </items>
    </kendo-treeview>
```
```cshtml
    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Items(treeview =>
        {
            treeview.Add().Text("My Web Site")
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

* [Basic Usage of the TreeView TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/treeview/tag-helper)
* [Server-Side API](/api/treeview)

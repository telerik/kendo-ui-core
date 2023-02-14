---
title:  Overview
page_title: Data Binding
description: "Learn the basics approaches for binding the Telerik UI DropDownTree component for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_databinding_aspnetcore
position: 1
---

# Data Binding

The DropDownTree component provides support for declaratively defining its items and for local (on the server) and remote (using a `DataSource` configuration object) binding.

## Declaring DropDownTree Items

The DropDownTree allows you to declare all of its items within the helper declaration.

The following example demonstrates how to configure a DropDownTree with three levels of hierarchy.

```HtmlHelper
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Items(dropdowntree =>
        {
            dropdowntree.Add().Text("My Documents")
                .Expanded(true)
                .Items(root =>
                {
                    root.Add().Text("Kendo UI Project")
                        .Expanded(true)
                        .Items(project =>
                        {
                            project.Add().Text("about.html");
                            project.Add().Text("index.html");
                            project.Add().Text("logo.png");
                        });

                    root.Add().Text("New Web Site");
                    root.Add().Text("Reports");
                });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdowntree name="dropdowntree">
        <items>
            <dropdowntree-item expanded="true" text="My Documents">
                <items>
                    <dropdowntree-item expanded="true" text="Kendo UI Project">
                        <items>
                            <dropdowntree-item  text="about.html">
                            </dropdowntree-item>
                            <dropdowntree-item text="index.html">
                            </dropdowntree-item>
                            <dropdowntree-item text="logo.png">
                            </dropdowntree-item>
                        </items>
                    </dropdowntree-item>
                    <dropdowntree-item text="New Web Site">
                    </dropdowntree-item>
                    <dropdowntree-item text="Reports">
                    </dropdowntree-item>
                </items>
            </dropdowntree-item>
        </items>
    </kendo-dropdowntree>
```
{% endif %}
## DropDownTree Binding

The DropDownTree supports the following data-binding approaches:

* [Server binding]({% slug htmlhelpers_dropdowntree_serverbinding_aspnetcore %})
* [Ajax binding]({% slug htmlhelpers_dropdowntree_ajaxbinding_aspnetcore %})

## See Also

* [Local Data Binding by the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/local-data-binding)
* [Ajax Data Binding by the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/remote-data-binding)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
* [Server-Side API](/api/dropdowntree)

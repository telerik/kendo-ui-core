---
title:  Items Binding
page_title: Items Binding
description: "Define the items of the Telerik UI DropDownTree component for {{ site.framework }} within the helper declaration."
slug: itemsbinding_dropdowntree
position: 2
---

# Items Binding

The DropDownTree allows you to declare its items within the helper declaration. This approach is suitable for a limited number of options, because each item is defined manually in the `Items` configuration.

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

## See Also

* [Local Data Binding by the DropDownTree for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/local-data-binding)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
* [Server-Side API](/api/dropdowntree)
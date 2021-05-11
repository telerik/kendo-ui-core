---
title: Checkboxes
page_title: Checkboxes
description: "Learn about the checkboxes functionality of the Telerik UI DropDownTree HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_checkboxes_aspnetcore
position: 2
---

# Checkboxes

The checkboxes functionality in the DropDownTree provides various configuration options.

You can define the `Checkboxes` configuration option by:

* Using a Boolean value.

        @(Html.Kendo().DropDownTree()
            .Name("dropdowntree")
            .DataTextField("Name")
            .Checkboxes(true)
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("Read_DropDownTreeData", "Home")
                )
            )
        )

* Using inner (detailed) configuration options.
  * The `Name()` configuration sets the `name` attribute of the checkbox inputs. That name will be used when a form is being posted to the server.
  * The `CheckChildren()` option indicates whether checkboxes of child items will be checked when the checkbox of a parent item is checked. This option also enables tri-state checkboxes with an indeterminate state.  `CheckChildren()` is disabled automatically, if filtering is enabled. Enabling both filtering and `CheckChildren()` at the same time could lead to ambiguous scenarios. Currently this scenario is not supported by the DropDownTree.
  * The `TemplateId()` option allows you to define a script template which will be used for the rendering of the checkboxes. Similarly, the `Template()` option allows the setting of an inline string template.

        @(Html.Kendo().DropDownTree()
            .Name("dropdowntree")
            .DataTextField("Name")
            .Checkboxes(checkboxes => checkboxes
                .Name("checkedFiles")
                .CheckChildren(true)
                .TemplateId("checkbox-template")
            )
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("Read_DropDownTreeData", "Home")
                )
            )
        )

        <script type="text/kendo-template" id="checkbox-template">
            <input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />
        </script>

## See Also

* [Checkboxes in the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/checkboxes)
* [Server-Side API](/api/dropdowntree)

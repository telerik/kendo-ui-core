---
title: Checkboxes
page_title: TreeView Checkboxes | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn about the checkboxes functionality of the Kendo UI TreeView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treeview_checkboxes_aspnetcore
position: 5
---

# TreeView Checkboxes

The checkboxes functionality in the TreeView provides various configuration options.

You can define the `Checkboxes` configuration option by using either of the following approaches:

* Using a Boolean value.

    ###### Example

        @(Html.Kendo().TreeView()
            .Name("treeview")
            .DataTextField("Name")
            .Checkboxes(true)
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("Read_TreeViewData", "TreeView")
                )
            )
        )

* Using inner (detailed) configuration options.
  * The `Name()` configuration sets the `name` attribute of the checkbox inputs. That name will be used when a form is being posted to the server.
  * The `CheckChildren()` option indicates whether checkboxes of child items will be checked when the checkbox of a parent item is checked. This option also enables tri-state checkboxes with an indeterminate state.
  * The `TemplateId()` option allows you to define a script template which will be used for the rendering of the checkboxes. Similarly, the `Template()` option allows the setting of an inline string template.

    ###### Example

        @(Html.Kendo().TreeView()
            .Name("treeview")
            .DataTextField("Name")
            .Checkboxes(checkboxes => checkboxes
                .Name("checkedFiles")
                .CheckChildren(true)
                .TemplateId("checkbox-template")
            )
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("Read_TreeViewData", "TreeView")
                )
            )
        )

        <script type="text/kendo-template" id="checkbox-template">
            <input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />
        </script>

## See Also

* [Overview of TreeView HTML Helper]({% slug htmlhelpers_treeview_aspnetcore %})
* [Binding TreeView HTML Helper]({% slug htmlhelpers_treeview_binding_aspnetcore %})
* [Drag and Drop Functionality of the TreeView HTML Helper]({% slug htmlhelpers_treeview_drag_drop_aspnetcore %})
* [TreeView HTML Helper Item Properties]({% slug htmlhelpers_treeview_items_aspnetcore %})

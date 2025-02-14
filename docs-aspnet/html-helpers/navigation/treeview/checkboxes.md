---
title: Checkboxes
page_title: Checkboxes
description: "Learn about the checkboxes functionality of the Telerik UI TreeView component for {{ site.framework }}."
slug: htmlhelpers_treeview_checkboxes_aspnetcore
position: 7
---

# Checkboxes

The checkboxes functionality in the TreeView provides various configuration options.

You can define the `Checkboxes` configuration option by:

* Using a Boolean value.

    ```HtmlHelper
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
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-treeview auto-bind="true" datatextfield="Name" load-on-demand="true" name="treeview">
            <hierarchical-datasource>
                <schema>
                    <hierarchical-model id="id"></hierarchical-model>
                </schema>
                <transport>
                    <read url="@Url.Action("Read_TreeViewData", "TreeView")"/>
                </transport>
            </hierarchical-datasource>
            <checkboxes enabled="true" />
        </kendo-treeview>
    ```
    {% endif %}

* Using inner (detailed) configuration options.
  * The `Name()` configuration sets the `name` attribute of the checkbox inputs. That name will be used when a form is being posted to the server.
  * The `CheckChildren()` option indicates whether checkboxes of child items will be checked when the checkbox of a parent item is checked. This option also enables tri-state checkboxes with an indeterminate state.
  * The `TemplateId()` option allows you to define a script template which will be used for the rendering of the checkboxes. Similarly, the `Template()` option allows the setting of an inline string template.

    ```HtmlHelper
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
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-treeview auto-bind="true" datatextfield="Name" load-on-demand="true" name="treeview">
            <hierarchical-datasource>
                <schema>
                    <hierarchical-model id="id"></hierarchical-model>
                </schema>
                <transport>
                    <read url="@Url.Action("Read_TreeViewData", "TreeView")"/>
                </transport>
            </hierarchical-datasource>
            <checkboxes check-children="true" enabled="true" template-id="checkbox-template"/>
        </kendo-treeview>
        <script type="text/kendo-template" id="checkbox-template">
            <input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />
        </script>
    ```
    {% endif %}

## See Also

* [Checkboxes in the TreeView HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treeview/checkboxes)
* [Server-Side API](/api/treeview)

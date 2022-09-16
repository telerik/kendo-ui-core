---
title: Checkboxes
page_title: Checkboxes
description: "Learn about the checkboxes functionality of the Telerik UI DropDownTree component for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_checkboxes_aspnetcore
position: 3
---

# Checkboxes

The checkboxes functionality in the DropDownTree provides various configuration options.

You can define the `Checkboxes` configuration option by:

* Using a Boolean value.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
    <kendo-dropdowntree datatextfield="Name" datavaluefield="id" name="dropdowntree"  style="width: 100%">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Remote_DropDownTreeData", "Home")" />
            </transport>
        </hierarchical-datasource>
        <checkboxes enabled="true" />
    </kendo-dropdowntree>
```
{% endif %}

* Using inner (detailed) configuration options.

  * The `Name()` configuration sets the `name` attribute of the checkbox inputs. That name will be used when a form is being posted to the server.
  * The `CheckChildren()` option indicates whether checkboxes of child items will be checked when the checkbox of a parent item is checked. This option also enables tri-state checkboxes with an indeterminate state.  `CheckChildren()` is disabled automatically, if filtering is enabled. Enabling both filtering and `CheckChildren()` at the same time could lead to ambiguous scenarios. Currently this scenario is not supported by the DropDownTree.
  * The `TemplateId()` option allows you to define a script template which will be used for the rendering of the checkboxes. Similarly, the `Template()` option allows the setting of an inline string template.

```HtmlHelper
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
```
{% if site.core %}
```TagHelper
    <kendo-dropdowntree datatextfield="Name" datavaluefield="id" name="dropdowntree"  style="width: 100%">
        <hierarchical-datasource>
            <schema>
                <hierarchical-model id="id"></hierarchical-model>
            </schema>
            <transport>
                <read url="@Url.Action("Remote_DropDownTreeData", "Home")" />
            </transport>
        </hierarchical-datasource>
        <checkboxes check-children="true" template-id="checkbox-template" name="checkedFiles" enabled="true" />
    </kendo-dropdowntree>

    <script type="text/kendo-template" id="checkbox-template">
        <input type='checkbox' name='checkedFiles[#= item.id #]' value='true' />
    </script>
```
{% endif %}

## See Also

* [Checkboxes in the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/checkboxes)
* [Server-Side API](/api/dropdowntree)

---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI for {{ site.framework }} Template component."
slug: htmlhelpers_overview_template
position: 0
---

# {{ site.framework }} Template Overview

{% if site.core %}
The Telerik UI Template TagHelper and HtmlHelper for {{ site.framework }} is an integration component that can be used to customize the default appearance of the other Telerik UI for {{ site.framework }} components.
{% else %}
The Telerik UI Template HtmlHelper for {{ site.framework }} is an integration component that can be used to customize the default appearance of the other Telerik UI for {{ site.framework }} components.
{% endif %}

The Template allows you to incorporate multiple helper components into the templating options of components like [Data Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}), [ListView]({% slug htmlhelpers_listview_aspnetcore %}), [TreeList]({% slug htmlhelpers_treelist_aspnetcore %}), and others that often require complex layout templates. The created templates are [CSP-compatible]({% slug troubleshooting_content_security_policy_aspnetmvc %}). Also, each component that is defined within the Template configuration will have all the functionalities and options available in the stand-alone nested component. 

* [Demo page for the Template HtmlHelper](https://demos.telerik.com/{{ site.platform }}/template/index)
{% if site.core %}
* [Demo page for the Template TagHelper](https://demos.telerik.com/{{ site.platform }}/template/index)
{% endif %}

## Basic Configuration

The Template HtmlHelper provides the following configuration options:

* `AddComponent()` specifies the declaration of the Telerik UI helper that will be integrated into the specified component.
* `AddHtml()` adds `HTML` code to the template. It accepts a single `string` parameter.

{% if site.core %}
When using the TagHelper mode of the Template component, you can insert the component declaration and any `HTML` code within the `<{parentTagName}-{templateOption}>` tag.
{% endif %}

Since the Template is an integration component and cannot be used independently, the following example demonstrates a basic configuration of the Template inside a Grid column template option.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.OrderID);
            columns.Bound(p => p.ShipName)
            .ClientTemplate(Html.Kendo().Template()
                .AddHtml("<div class='ship-details'>")
                .AddComponent(btn => btn
                    .Button()
                    .Name("details_${data.OrderID}")
                    .Content("Details")
                    .ThemeColor(ThemeColor.Primary)
                )
                .AddHtml("</div")
            );
        })
        //Other configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <columns>
            <column field="OrderID"/>
            <column field="ShipName">
                <column-template>
                    <div class="ship-details">
                        <kendo-button name="details_${data.OrderID}" theme-color="ThemeColor.Primary">
                            Details
                        </kendo-button>
                    </div>
                </column-template>
            </column>
        </columns>
        <!--Other configuration-->
    </kendo-grid>
```
{% endif %}

## Components Integration

You can use the Template component to incorporate any Telerik UI for {{ site.framework }} component into the templating options of the following components:

| Component     | 
| :---------------- |
| [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %})              |
| [ListView]({% slug htmlhelpers_listview_aspnetcore %})          |
| [TaskBoard]({% slug htmlhelpers_taskboard_aspnetcore_overview %})         |
| [TreeList]({% slug htmlhelpers_treelist_aspnetcore %})          |
| [Notification]({% slug htmlhelpers_notification_aspnetcore %})      |
| [Popover]({% slug htmlhelpers_overview_popover %})           |
| [TileLayout]({% slug htmlhelpers_aspnet_tilelayout_overview %})        |
| [Tooltip]({% slug htmlhelpers_tooltip_aspnetcore %})           |
| [Timeline]({% slug overview_htmlhelpers_timeline_aspnetcore %})          |
| [Gantt]({% slug htmlhelpers_gantt_aspnetcore %})             |
| [Scheduler]({% slug htmlhelpers_scheduler_aspnetcore %})         |

For runnable examples, refer to the demos:

* [Integration with Grid](https://demos.telerik.com/{{ site.platform }}/template/integration-grid)
* [Integration with ListView](https://demos.telerik.com/{{ site.platform }}/template/)
* [Integration with TileLayout](https://demos.telerik.com/{{ site.platform }}/template/integration-tilelayout)
* [Integration with Scheduler](https://demos.telerik.com/{{ site.platform }}/template/integration-scheduler)

The components that support editing provide options for custom editors and editing templates. By using the Template component, you can include the desired editors and specify the editor template name through the `EditorTemplateName()` method.

The examples below show how to use the Template component to create custom editors for Inline and Popup editable Grids.

* Inline editable Grid

    ```HtmlHelper
        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ShipName).EditorTemplateComponentName("ShipNameEditor");
                columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
            })
            .ToolBar(tool => tool.Create())
            .Editable(editable => editable.Mode(GridEditMode.InLine))
            //Other configuration
        )
    ```
    ```ShipNameEditor.cshtml
        //~/Views/Shared/EditorTemplates/ShipNameEditor.cshtml
        @model object 

        @Html.Kendo().Template().AddComponent(x => x.TextAreaFor(model => model).Rows(3))

    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <columns>
                <column field="ShipName">
                    <column-editor-template>
                        <kendo-textarea name="ShipName" rows="3">
                        </kendo-textarea>
                    </column-editor-template>
                </column>
                <column width="200">
                    <commands>
                        <column-command text="Edit" name="edit"></column-command>
                        <column-command text="Delete" name="destroy"></column-command>
                    </commands>
                </column>
            </columns>
            <toolbar>
                <toolbar-button name="create"></toolbar-button> 
            </toolbar>
            <editable mode="inline"/>
            <!--Other configuration-->
        </kendo-grid>
    ```
    {% endif %}

* Popup editable Grid

    ```HtmlHelper
        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ShipName);
                columns.Bound(p => p.Freight);
                columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
            })
            .ToolBar(tool => tool.Create())
            .Editable(editable => editable.Mode(GridEditMode.PopUp).TemplateComponentName("CustomGridEditor"))
            //Other configuration
        )
    ```
    ```CustomGridEditor.cshtml
        //~/Views/Shared/EditorTemplates/CustomGridEditor.cshtml

        @model OrderViewModel

        @(Html.Kendo().Template()
            .AddHtml("<div class=\"k-edit-field\">")
            .AddComponent(tbox => tbox
                .TextAreaFor(model => model.ShipName)
                .Rows(3)
                .Label(l => l.Content("Ship name: "))
            )
            .AddHtml("</div>")
            .AddHtml("<div class=\"k-edit-field\">")
            .AddComponent(tbox => tbox
                .NumericTextBoxFor(model => model.Freight).Min(0).Max(100)
            )
            .AddHtml("</div>")
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <columns>
                <column field="ShipName"></column>
                <column field="Freight"></column>
                <column width="200">
                    <commands>
                        <column-command text="Edit" name="edit"></column-command>
                        <column-command text="Delete" name="destroy"></column-command>
                    </commands>
                </column>
            </columns>
            <toolbar>
                <toolbar-button name="create"></toolbar-button> 
            </toolbar>
            <editable mode="popup">
                <editable-template>
                    <kendo-textarea name="ShipName" rows="3">
                    </kendo-textarea>
                    <br/><br/>
                    <kendo-numerictextbox name="Freight" min="0" max="100">
                    </kendo-numerictextbox>
                </editable-template>
            </editable>
            <!--Other configuration-->
        </kendo-grid>
    ```
    {% endif %}

## Converting Existing Templates to CSP-Compatible Templates

With the help of the Template, you can convert the existing components templates ([inline]({% slug client_templates_overview %}#inline-client-templates), [external]({% slug client_templates_overview %}#external-client-templates), and [partial]({% slug client_templates_overview %}#partial-client-templates)) into CSP-compatible ones.

The following snippet demonstrates defining a template for a Grid column by using an inline client template.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ShipName).ClientTemplate("<span style='color:red;'><strong>#=ShipName#</strong></span>");
        })
        //Other configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <columns>
            <column field="ShipName" template="<span style='color:red;'><strong>#=ShipName#</strong></span>">
            </column>
        </columns>
        <!--Other configuration-->
    </kendo-grid>
```
{% endif %}

The next snippet shows the new approach for defining a CSP Grid column template through the Template component.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ShipName).ClientTemplate(Html.Kendo().Template().AddHtml("<span style='color:red;'><strong>${data.ShipName}</strong></span>"));
        })
        //Other configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <columns>
            <column field="ShipName">
                <column-template>
                    <span style="color:red;">
                        <strong>${data.ShipName}</strong>
                    </span>
                </column-template>
            </column>
        </columns>
        <!--Other configuration-->
    </kendo-grid>
```
{% endif %}

The examples that follow illustrate another scenario—converting the [TaskBoard]({% slug htmlhelpers_taskboard_aspnetcore_overview %}) templates into CSP-compatible templates.

The following snippet demonstrates the previously used approach for defining the templates in the specific scenario.

```HtmlHelper
    @(Html.Kendo().TaskBoard<CardViewModel, Resource>()
        .Name("taskBoard")
        .TemplateId("card-template")
        .Editable(editable => editable
            .HeaderTemplate("<span style='color: green;'>Custom Task editor template</span>")
        )
        //Other configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-taskboard name="taskBoard" template-id="card-template">
        <editable>
            <editable-header-template>
                <span style='color: green;'>Custom Task editor template</span>
            </editable-header-template>
        </editable>
        <!--Other configuration-->
    </kendo-taskboard>
```
{% endif %}
```card-template
    <script id="card-template" type="text/x-kendo-template">
        <div class="template-container">
            <div class="template-header" id="#= ID #" >
                <span class="template-title">#: Title #</span>
                <span class="template-menu">#=cardMenuButton#</span>
            </div>
            <p>#=Description#</p>
            <p>#:kendo.toString(new Date(Start + "Z"), "MMMM dd")#  -  #:kendo.toString(new Date(End + "Z"), "MMMM dd")#</p>
         </div>
    </script>
```

The next snippet shows how to replace the inline client TaskBoard templating options with CSP-compatible templates.

```HtmlHelper
    @(Html.Kendo().TaskBoard<CardViewModel, Resource>()
        .Name("taskBoard")
        .Template(Html.Kendo().Template()
            .AddHtml("<div class=\"template-container\"><div class=\"template-header\" id='${data.ID}'><span class=\"template-title\">${data.Title}</span><span class=\"template-menu\">${data.cardMenuButton}</span></div>")
            .AddHtml("<p>${data.Description}</p><p>${kendo.toString( new Date(data.Start + \"Z\"), \"MMMM dd\")}  -  ${kendo.toString(new Date(data.End + \"Z\") , \"MMMM dd\")}</p></div>")
         )
        .Editable(editable => editable
            .HeaderTemplate(Html.Kendo().Template().AddHtml("<span style='color: green;'>Custom Task editor template</span>"))
        )
        //Other configuration
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-taskboard name="taskBoard">
        <taskboard-template>
            <div class="template-container">
                <div class="template-header" id="${data.ID}" >
                    <span class="template-title">${data.Title}</span>
                    <span class="template-menu">${data.cardMenuButton}</span>
                </div>
                <p>${data.Description}</p>
                <p>${kendo.toString( new Date(data.Start + "Z"), "MMMM dd")}  -  ${kendo.toString(new Date(data.End + "Z") , "MMMM dd")}</p>
            </div>
        </taskboard-template>
        <editable>
            <editable-header-template>
                <span style='color: green;'>Custom Task editor template</span>
            </editable-header-template>
        </editable>
        <!--Other configuration-->
    </kendo-taskboard>
```
{% endif %}

## See Also

* [Basic Usage of the Template (Demo)](https://demos.telerik.com/{{ site.platform }}/template/index)
* [Content Security Policy]({% slug troubleshooting_content_security_policy_aspnetmvc%})
* [Knowledge Base Section](/knowledge-base)
* [Server-Side API](/api/template)

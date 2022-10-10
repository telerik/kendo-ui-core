---
title: Templates
page_title: Templates
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn how to customize its templates."
slug: htmlhelpers_taskboard_aspnetcore_templates
position: 8
---

# Templates

The TaskBoard provides full control over the rendering of columns, cards, and popup headers by using [Kendo UI templates](https://docs.telerik.com/kendo-ui/framework/templates/overview).

The TaskBoard supports the following templates:

* [Card template](#card-template)
* [Column template](#column-template)
* [Editable header template](#editable-header-template)
* [Preview pane template](#preview-pane-template)
* [Preview pane header template](#preview-pane-header-template)

For a complete example, refer to the [Templates demo of the TaskBoard](https://demos.telerik.com/{{ site.platform }}/taskboard/templates).

## Card Template

The card template controls the rendering of the cards. It is set through the `TemplateId`, or the `Template` configuration.

```HtmlHelper
    .TemplateId("card-template")
```
{% if site.core %}
```TagHelper
    template-id="card-template" 
```
{% endif %}
The following example shows a card template.

    <script id="card-template" type="text/x-kendo-template">
        <div class="template-container">
            <div class="template-header">
                <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: Title #</a></p>
            </div>
            <p>#: Description#</p>
            <p>#: kendo.toString( Start, "MMMM dd")#</p>
        </div>
    </script>

## Column Template

The column template controls the rendering of the column header. In the template context the `buttons` field provides the HTML for the buttons of the column. 

The column template is set through the `TemplateId`, or the `Template` sub-options of the `ColumnSettings` configuration.

```HtmlHelper
    .ColumnSettings(s =>
    {
        s.TemplateId("column-template");
        s.DataTextField("Text");
        s.DataStatusField("ID");
    })
```
{% if site.core %}
```TagHelper
    <column-settings datastatusfield="Status" datatextfield="Text" template-id="column-template">
	</column-settings>
```
{% endif %}

The following example shows a column template.

    <script id="column-template" type="text/x-kendo-template">
        <div class="column-template-container">
            <div>
                <img src="@Url.Content("~/Content/web/Employees/" + "#= Image #")" style="height:50px; width: 50px;">
            </div>
            <div>
                <h3>#: Text #</h3>
            </div>
        </div>
    </script>

## Editable Header Template

The editable header template controls the rendering of the header. It is set through the `HeaderTemplateId`, or the `HeaderTemplate` sub-options of the `Editable` configuration.

```HtmlHelper
    .Editable(ed => ed.HeaderTemplateId("editable-header-template"))
```

The following example shows an editable header template.

    <script id="editable-header-template" type="text/x-kendo-template">
        <div class='k-taskboard-pane-header-text'>Editing <strong>#:Title#</strong></div>
    </script>

## Preview Pane Template

The preview pane template controls the rendering of the preview pane. It is set through the `TemplateId`, or the `Template` sub-options of the `PreviewPane` configuration.

```HtmlHelper
    .PreviewPane(p =>
    {
        p.TemplateId("previewPane-content-template");
    })
```
{% if site.core %}
```TagHelper
    <preview-pane template-id="editable-header-template"></preview-pane>
```
{% endif %}

The following example shows a preview pane template.

    <script id="previewPane-content-template" type="text/x-kendo-template">
        <div class="k-taskboard-pane-content">
            <p>#: Description #</p>
            <p>#: kendo.toString(Start, "MMMM dd, h:mm tt")# - #:kendo.toString(End, "MMMM dd, h:mm tt")#</p>
        </div>
        <div class="k-taskboard-pane-actions k-action-buttons k-actions-end">
            <button class="k-button k-button-icontext" title="Delete" data-command="DeleteCardCommand" data-options="null">
                <span class="k-icon k-i-delete "></span>Delete
            </button>
            <button class="k-button k-button-icontext k-primary" title="Edit" data-command="EditCardCommand" data-options="null">
                <span class="k-icon k-i-edit"></span>Edit
            </button>
        </div>
    </script>

## Preview Pane Header Template

The preview pane header template controls the rendering of the header of the preview pane. It is set through the `HeaderTemplateId`, or the `HeaderTemplate` sub-options of the `PreviewPane` configuration.

```HtmlHelper
    .PreviewPane(p =>
    {
        p.HeaderTemplateId("previewPane-header-template");
    })
```
{% if site.core %}
```TagHelper
    <preview-pane header-template-id="previewPane-header-template"></preview-pane>
```
{% endif %}

The following example shows a preview pane header template.

    <script id="previewPane-header-template" type="text/x-kendo-template">
        <div class="k-taskboard-pane-header">
            <h3 class="k-taskboard-pane-header-text">#: Title #</h3>
            <span class="k-spacer"></span>
            <div class="k-taskboard-pane-header-actions">
                <button class="k-button k-button-icon k-flat" title="Close" data-command="ClosePaneCommand">
                    <span class="k-icon k-i-close"></span>
                </button>
            </div>
        </div>
    </script>

## See Also

* [TaskBoard Templates (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/templates)
* [JavaScript API Reference of the TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)

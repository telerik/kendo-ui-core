---
title: Label
page_title: Label
description: "Learn how to configure the label of the Telerik UI CheckBoxGroup for {{ site.framework }}."
slug: htmlhelpers_checkboxgroup_aspnetcore_label
position: 3
---

# Label

If the CheckBoxGroup is bound to an array of strings, those will be used as both value and label of the respective checkbox. If the widget is bound to array of objects, the label option could be used to specify the label content.

## Set the Label text

To customize the text of the label, use the [`label`](/api/javascript/ui/checkboxgroup/configuration/items.label) option.

```HtmlHelper
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .Items(i =>
        {
            i.Add().Label("First").Value("1");
            i.Add().Label("Second").Value("2");
            i.Add().Label("Third").Value("3");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-checkboxgroup name="checkboxgroup">
        <kendo-checkboxgroup-items>
            <kendo-checkboxgroup-item value="1" label="First">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="2" label="Second">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="3" label="Third">
            </kendo-checkboxgroup-item>
        </kendo-checkboxgroup-items>
    </kendo-checkboxgroup>
```
{% endif %}

## Configure the Label Position

The labels of all checkboxes in the CheckBoxGroup could be rendered before or after each checkbox.

```HtmlHelper
    @(Html.Kendo().CheckBoxGroup()
        .Name("checkboxgroup")
        .LabelPosition("after")
        .Items(i =>
        {
            i.Add().Label("First").Value("1");
            i.Add().Label("Second").Value("2");
            i.Add().Label("Third").Value("3");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-checkboxgroup name="checkboxgroup"
                        label-position="CheckBoxGroupLabelPosition.After">
        <kendo-checkboxgroup-items>
            <kendo-checkboxgroup-item value="1" label="First">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="2" label="Second">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="3" label="Third">
            </kendo-checkboxgroup-item>
        </kendo-checkboxgroup-items>
    </kendo-checkboxgroup>
```
{% endif %}
## See Also

* [Server-Side API](/api/checkboxgroup)

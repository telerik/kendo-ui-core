---
title: Label
page_title: Label
description: "Learn how to configure the label of the Telerik UI RadioGroup for {{ site.framework }}."
slug: htmlhelpers_radiogroup_aspnetcore_label
position: 3
---

# Label

If the RadioGroup is bound to an array of strings, those will be used as both value and label of the respective radio button. If the widget is bound to array of objects, the label option could be used to specify the label content.

## Set the Label text

To customize the text of the label, use the [`label`](/api/javascript/ui/radiogroup/configuration/items.label) option. 

```HtmlHelper
    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")
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
    <kendo-radiogroup name="radiogroup"
                      radio-name="radiogroup">
        <kendo-radiogroup-items>
            <kendo-radiogroup-item value="one" label="First">
            </kendo-radiogroup-item>
            <kendo-radiogroup-item value="two" label="Second">
            </kendo-radiogroup-item>
        </kendo-radiogroup-items>
    </kendo-radiogroup>
```
{% endif %}

## Configure the Label Position

The labels of all radio buttons in the RadioGroup could be rendered before or after the radio buttons.

```HtmlHelper
    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")
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
    <kendo-radiogroup name="radiogroup"
        radio-name="radiogroup"
        label-position="RadioGroupLabelPosition.Before"
        >
    </kendo-radiogroup>
```
{% endif %}

## See Also

* [Server-Side API](/api/radiogroup)

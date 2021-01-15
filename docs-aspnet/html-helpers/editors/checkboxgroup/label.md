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

```Razor
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

## Configure the Label Position

The labels of all checkboxes in the CheckBoxGroup could be rendered before or after each checkbox.

```Razor
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

## See Also

* [Server-Side API](/api/checkboxgroup)

---
title: Layout
page_title: Layout
description: "Learn how to configure the layout of the Telerik UI RadioGroup for {{ site.framework }}."
slug: htmlhelpers_radiogroup_aspnetcore_layout
position: 3
---

# Layout

The RadioGroup supports two types of [`layout`](/api/javascript/ui/radiogroup/configuration/layout) - "horizontal" and "vertical". By default the radio buttons are rendered vertically.

The following example shows how to set the RadioGroup layout:

```HtmlHelper
    @(Html.Kendo().RadioGroup()
        .Name("radiogroup")        
        .BindTo(new[] { "English", "German", "Italian", "Russian", "Spanish" })
        .Layout(RadioGroupLayout.Vertical)
        .Value("Italian")
    ) 
```
{% if site.core %}
```TagHelper
    @{
        var items = new List<IInputGroupItem>()
        {
            new InputGroupItemModel() { Label = "English", Enabled = true, Encoded = false, Value = "1" },
            new InputGroupItemModel() { Label = "German",  Enabled = true, Encoded = false, Value = "2" },
            new InputGroupItemModel() { Label = "Italian", Enabled = true, Encoded = false, Value = "3" },
            new InputGroupItemModel() { Label = "Russian", Enabled = true, Encoded = false, Value = "4" },
            new InputGroupItemModel() { Label = "Spanish", Enabled = true, Encoded = false, Value = "5" },     
        };
    }
    <kendo-radiogroup name="radiogroup"
                      radio-name="radiogroup" 
                      bind-to="items"
                      layout="RadioGroupLayout.Vertical"
                      value="3">
    </kendo-radiogroup>
```
{% endif %}

## See Also

* [Server-Side API](/api/radiogroup)

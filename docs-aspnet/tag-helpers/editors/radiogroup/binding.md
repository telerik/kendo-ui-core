---
title: Binding
page_title: Binding
description: "Learn how to implement data binding with Telerik UI RadioGroup TagHelper for {{ site.framework }}."
slug: taghelpers_radiogroup_binding_aspnetcore
position: 2
---

# Binding

When using the Tag helpers you can bind the radio button items by using the ['<kendo-radiogroup-items>'](#items) tag or the [bind-to()](#bindto) tag.

## Items method

The example below demonstrates how to use the `<kendo-radiogroup-items>` tag to configure the radio buttons in the RadioGroup widget.

```tagHelper
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


## BindTo method

You can configure the items in the RadioGroup widget by using the BindTo method.

1. Pass the data to the view through the view model.

        public IActionResult Index()
        {
            var itemsList = new List<RadioGroupItem>()
            {
                new RadioGroupItem()
                {
                    Label = "Yes",
                    Value = "one"
                },
                 new RadioGroupItem()
                {
                    Label = "No",
                    Value = "two"                    
                },
                  new RadioGroupItem()
                {
                    Label = "N/A",
                    Value = "three"
                }
            };

            return View(new RadioGroupViewModel() { Items = itemsList });
        }

        public class RadioGroupViewModel
        {
            public List<RadioGroupItem> Items { get; set; }
        }



1. Add the RadioGroup to the view and bind it to a property of the view model.

        @model MvcApplication1.Models.RadioGroupViewModel

        <kendo-radiogroup name="radiogroup"
                      radio-name="radiogroup"                      
                      bind-to="Model.Items">
        </kendo-radiogroup>

## See Also

* [Server-Side API](/api/radiogroup)

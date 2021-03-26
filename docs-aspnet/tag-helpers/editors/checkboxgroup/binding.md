---
title: Binding
page_title: Binding
description: "Learn how to implement data binding with Telerik UI CheckBoxGroup TagHelper for {{ site.framework }}."
slug: taghelpers_checkboxgroup_binding_aspnetcore
position: 2
---

# Binding

When using the Tag helpers you can bind the checkbox items by using the [`<kendo-checkboxgroup-items>`](#items) tag or the [bind-to()](#bindto) method.

## Items method

The example below demonstrates how to use the `<kendo-checkboxgroup-items>` tag to configure the checkboxes in the CheckBoxGroup widget.

```tagHelper
   <kendo-checkboxgroup name="checkboxgroup">
        <kendo-checkboxgroup-items>
            <kendo-checkboxgroup-item value="one" label="First">
            </kendo-checkboxgroup-item>
            <kendo-checkboxgroup-item value="two" label="Second">
            </kendo-checkboxgroup-item>
        </kendo-checkboxgroup-items>
    </kendo-checkboxgroup>
```


## BindTo method

You can configure the items in the CheckBoxGroup widget by using the BindTo method.

1. Pass the data to the view through the view model.

        public IActionResult Index()
        {
            var itemsList = new List<InputGroupItem>()
            {
                new InputGroupItem()
                {
                    Label = "Yes",
                    Value = "one"
                },
                 new InputGroupItem()
                {
                    Label = "No",
                    Value = "two"
                },
                  new InputGroupItem()
                {
                    Label = "N/A",
                    Value = "three"
                }
            };

            return View(new CheckBoxGroupViewModel() { Items = itemsList });
        }

        public class CheckBoxGroupViewModel
        {
            public List<InputGroupItem> Items { get; set; }
        }



1. Add the CheckBoxGroup to the view and bind it to a property of the view model.

        @model MvcApplication1.Models.CheckBoxGroupViewModel

        <kendo-checkboxgroup name="checkboxgroup"
                      input-name="checkboxItem"
                      bind-to="Model.Items">
        </kendo-checkboxgroup>

## See Also

* [Server-Side API](/api/checkboxgroup)

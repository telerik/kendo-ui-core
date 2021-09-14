---
title: Layout
page_title: Layout
description: "Get started with the Telerik UI Form TagHelper for {{ site.framework }} and learn about the layouts it supports."
slug: taghelpers_form_aspnetcore_layout
position: 4
---

# Layout

In addition the default layout, the Form component offers an option to use a Grid layout.

>  The Grid layout is supported only on modern browsers. Even so, not all browsers that support the Grid layout support all features.

## Grid Layout

To use this layout, configure the `grid` tag, specify the number of columns and the gutter between them. The Form supports up to 12 columns.

```Razor
    <grid  cols="2" gutter="20"/>
```

The following example shows the Form with `grid` layout set.

```Razor
    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items">
        <validatable validate-on-blur="true" validation-summary="true" />
        <grid  cols="2" gutter="20"/>
        <form-items>
            <form-item type="group">
                <item-label text="Registration Form" />
                <form-items>
                    <form-item field="TextBox">
                        <item-label text="TextBox:"/>
                        <textbox-editor placeholder="TextBox"></textbox-editor>
                    </form-item>
                    <form-item field="NumericTextBox">
                        <item-label text="NumericTextBox:" />
                        <numerictextbox-editor></numerictextbox-editor>
                    </form-item>  
                </form-items>
            </form-item>
        </form-items>
    </kendo-form>
```

## See Also

* [Layout Demo of the Form TagHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/taghelper)
* [Server-Side API](/api/form)

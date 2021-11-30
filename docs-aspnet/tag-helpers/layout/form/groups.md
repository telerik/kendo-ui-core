---
title: Groups
page_title: Groups
description: "Get started with the Telerik UI Form TagHelper for {{ site.framework }} and learn how to set up groups."
slug: taghelpers_form_aspnetcore_groups
position: 5
---

# Groups

The grouping functionality of the Form component allows you to create intuitive forms by displaying fields in logically grouped sections.

The following example shows a Form configured to display its editors in two groups.

```Razor
    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items">
        <validatable validate-on-blur="true" validation-summary="true" />
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
            <form-item type="group">
                 <form-item field="MaskedTextBox">
                        <item-label text="MaskedTextBox:" optional="true" />
                        <maskedtextbox-editor></maskedtextbox-editor>
                    </form-item>
                    <form-item field="DatePicker">
                        <item-label text="DatePicker:" optional="true" />
                    </form-item>
            </form-item>
        </form-items>
    </kendo-form>
```

> The Form does not support group nesting.

## See Also

* [Groups Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/tag-helper)
* [Server-Side API](/api/form)

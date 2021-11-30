---
title: Events
page_title: Events
description: "Get started with the Telerik UI Form TagHelper for {{ site.framework }} and learn how to set up events."
slug: taghelpers_form_aspnetcore_events
position: 5
---

# Events

You can subscribe to all events of the Form component.

The following example shows a Form configured to handle its `validate`, `submit` and `clear` events.

```Razor
    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items" on-validate-field="onFormValidateField" on-submit="onFormSubmit" on-clear="onFormClear">
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

    <script>
        function onFormValidateField(e) {
            $("#validation-success").html("");
        }

        function onFormSubmit(e) {
            e.preventDefault();
            $("#validation-success").html("<div class='k-messagebox k-messagebox-success'>Form data is valid!</div>");
        }

        function onFormClear(e) {
            $("#validation-success").html("");
        }
    </script>
```

## See Also

* [Groups Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/groups)
* [Server-Side API](/api/form)

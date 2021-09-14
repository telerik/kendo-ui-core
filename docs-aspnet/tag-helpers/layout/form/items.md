---
title: Items
page_title: Items
description: "Get started with the Telerik UI Form HtmlHelper for {{ site.framework }} and learn how to configure items."
slug: htmlhelpers_form_aspnetcore_items
position: 2
---

# Items
The `Items` configuration options allows you to customize the appearance and behavior of the Form component. The `Items` configuration maps the model fields and allows you to:

* Customize the editors.
* Customize the labels and hints of the editors.
* Group the editors.

## Configure Label

The following example shows how to set the `Label` of an item. Enabling the `Optional` setting indicates that the field is optional (not required).

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
                        <item-label optional="true" text="NumericTextBox:" />
                        <numerictextbox-editor></numerictextbox-editor>
                    </form-item>  
                </form-items>
            </form-item>
        </form-items>
    </kendo-form>
```

## Configure Hint

The following example shows how to set the `Hint` of an item. The hint is displayed below the editor of the field.

```Razor
    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items">
        <validatable validate-on-blur="true" validation-summary="true" />
        <form-items>
                <form-items>
                    <form-item field="NumericTextBox" hint="Enter numeric characters only">
                        <item-label text="NumericTextBox:" />
                        <numerictextbox-editor></numerictextbox-editor>
                    </form-item>  
                </form-items>
        </form-items>
    </kendo-form>
```

## Configure Editor

With the `Editor` option, you can explicitly configure an editor to be used for a specific field. See the [editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/form/configuration/items#itemseditor) configuration option in the client-side API documentation for a list of the supported editors.

```Razor
    <kendo-form name="exampleForm" form-data="@Model" method="POST" asp-action="Items"  >
        <validatable validate-on-blur="true" validation-summary="true" />
        <form-items>
            <form-item type="group">
                <item-label text="Registration Form" />
                <form-items>                    
                    <form-item field="TextBox" hint="">
                        <item-label optional="true" text="TextBox:"/>
                        <textbox-editor placeholder="TextBox"></textbox-editor>                       
                    </form-item>
                    <form-item field="NumericTextBox">
                        <item-label text="NumericTextBox:" />
                        <numerictextbox-editor></numerictextbox-editor>
                    </form-item>
                    <form-item field="MaskedTextBox">
                        <item-label text="MaskedTextBox:" optional="true" />
                        <maskedtextbox-editor></maskedtextbox-editor>
                    </form-item>
                    <form-item field="DatePicker">
                        <item-label text="DatePicker:" optional="true" />
                    </form-item>
                    <form-item field="DateTimePicker" title="datetimepicker" html-attributes='new Dictionary<string, object> { { "style", "width: 100%" } }'>
                        <item-label text="DateTimePicker:" optional="true" />
                        <datetimepicker-editor date-input="true" />
                    </form-item>
                    <form-item field="ComboBox">
                        <item-label text="ComboBox:" optional="true" />
                        <combobox-editor placeholder="Select..." datatextfield="ProductName" datavaluefield="ProductID"
                                         style="width: 100%" height="520">
                            <datasource server-filtering="false">
                                <transport>
                                    <read url="@Url.Action("Items_GetProducts", "Form")" />
                                </transport>
                            </datasource>
                        </combobox-editor>
                    </form-item>
                    <form-item field="RadioGroup">
                        <item-label text="RadioGroup:" />
                        <radiogroup-editor label-position="RadioGroupLabelPosition.Before" layout="RadioGroupLayout.Horizontal">
                            <kendo-radiogroup-items>
                                <kendo-radiogroup-item label="Admin" value="1" />
                                <kendo-radiogroup-item label="Manager" value="2" />
                                <kendo-radiogroup-item label="Employee" value="3" />
                            </kendo-radiogroup-items>
                        </radiogroup-editor>
                    </form-item>
                    <form-item field="CheckBoxGroup">
                        <item-label text="CheckBoxGroup:" />
                        <checkboxgroup-editor name="CheckBoxGroup" label-position="CheckBoxGroupLabelPosition.Before" layout="CheckBoxGroupLayout.Horizontal">
                            <kendo-checkboxgroup-items>
                                <kendo-checkboxgroup-item label="English" value="1" />
                                <kendo-checkboxgroup-item label="Russian" value="2" />
                                <kendo-checkboxgroup-item label="Spanish" value="3" />
                            </kendo-checkboxgroup-items>
                        </checkboxgroup-editor>
                    </form-item>
                    <form-item field="Switch">
                        <item-label text="Switch:" />
                        <switch-editor>
                            <messages checked="YES" unchecked="NO" />
                        </switch-editor>
                    </form-item>
                </form-items>
            </form-item>
        </form-items>
    </kendo-form>

```

## See Also

* [Items Demo of the Form TagHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/taghelper)
* [Server-Side API](/api/form)

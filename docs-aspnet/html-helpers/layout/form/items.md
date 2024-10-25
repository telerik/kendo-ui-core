---
title: Items
page_title: Items
description: "Get started with the Telerik UI Form component for {{ site.framework }} and learn how to configure items."
slug: htmlhelpers_form_aspnetcore_items
position: 3
---

# Items

The `Items` configuration options allows you to customize the appearance and behavior of the Form. The `Items` configuration maps the model fields and through it you can:

* customize the editors
* customize the labels and hints of the editors
* group the editors

## Configure Label

The following example shows how to set the `Label` of an item. Enabling the `Optional` setting, indicates that the field is optional (not required).

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("formExample")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Items(items =>
        {
            items.Add()
                .Field(f => f.FirstName)
                .Label(l => l.Text("First Name:"));
            items.Add()
                .Field(f => f.LastName)
                .Label(l => l.Text("Last Name:"));
            i.Add()
                .Field(f => f.DateOfBirth)
                .Label(l => l.Text("Date of Birth:").Optional(true));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-form name="exampleForm" form-data="@Model" method="POST" action="Items">
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
{% endif %}

## Default Value for Label and Title

It is possible to set the (Name Data Annotation)[https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations.displayattribute.name?view=net-7.0] of the Field directly in the Model and then it will be automatically set in the Form as the default Label and Title of the Item:

```C#
        [Display(Name = "User Name")]  
        public string FirstName { get; set; }  
```

## Configure Hint

The following example shows how to set the `Hint` of an item. The hint is displayed below the editor of the field.

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("formExample")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Items(items =>
        {
            items.Add()
                .Field(f => f.FirstName)
                .Label(l => l.Text("First Name:"));
            items.Add()
                .Field(f => f.LastName)
                .Label(l => l.Text("Last Name:"));
            items.Add()
                .Field(f => f.Password)
                .Label(l => l.Text("Password:"))
                .Hint("Hint: enter alphanumeric characters only.");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-form name="exampleForm" form-data="@Model" method="POST" action="Items">
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
{% endif %}

## Configure Editor

With the `Editor` option you can explicitly configure an editor to be used for a specific field. See the [editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/form/configuration/items#itemseditor) configuration option in the client-side API documentation, for a list of the supported editors.

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.FormItemsViewModels>()
        .Name("exampleForm")
        .HtmlAttributes(new { action = "Items", method = "POST" })
        .Items(items =>
        {
            items.AddGroup()
                .Label("Registration Form")
                .Items(i =>
                {
                    i.Add()
                        .Field(f => f.TextBox)
                        .Label(l => l.Text("TextBox:"));
                    i.Add()
                        .Field(f => f.NumericTextBox)
                        .Label(l => l.Text("NumericTextBox:"))
                        .Editor(e =>
                        {
                            e.NumericTextBox();
                        });
                    i.Add()
                        .Field(f => f.MaskedTextBox)
                        .Label(l => l.Text("MaskedTextBox:").Optional(true))
                        .Editor(e =>
                        {
                            e.MaskedTextBox();
                        });
                    i.Add()
                        .Field(f => f.DatePicker)
                        .Label(l => l.Text("DatePicker:").Optional(true));
                    i.Add()
                        .Field(f => f.DateTimePicker)
                        .Label(l => l.Text("DateTimePicker:").Optional(true))
                        .Editor(e => e.DateTimePicker()
                            .HtmlAttributes(new { style = "width: 100%", title = "datetimepicker" })
                            .DateInput()
                        );
                    i.Add()
                        .Field(f => f.ComboBox)
                        .Label(l => l.Text("ComboBox:").Optional(true))
                        .Editor(e =>
                        {
                            e.ComboBox()
                                .HtmlAttributes(new { })
                                .Placeholder("Select...")
                                .DataTextField("ProductName")
                                .DataValueField("ProductID")
                                .HtmlAttributes(new { style = "width:100%" })
                                .Height(520)
                                .DataSource(source =>
                                {
                                    source.Read(read =>
                                    {
                                        read.Action("Items_GetProducts", "Form");
                                    })
                                    .ServerFiltering(true);
                                });
                        });
                        i.Add()
                        .Field(f => f.Switch)
                        .Label(l => l.Text("Switch:"))
                        .Editor(e =>
                        {
                            e.Switch()
                                .Messages(c => c.Checked("YES").Unchecked("NO"));
                        });;

                });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-form name="exampleForm" form-data="@Model" method="POST" action="Items"  >
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
{% endif %}

## Custom Editor

You can implement custom editor by using the editor option as a function as follows:

```HtmlHelper
    @(Html.Kendo().Form<MyApplication.Models.UserViewModel>()
        .Name("formExample")
        .HtmlAttributes(new { action = "Index", method = "POST" })
        .Items(items =>
        {
            items.Add()
                .Field(f => f.Description)
                .Label(l => l.Text("Description:"))
                .EditorTemplateHandler("customTextareaEditor");
        })
    )

    <script>
    function customTextareaEditor(container, options) {
        $('<textarea class="k-textarea" data-bind="value: ' + options.field + '" name="' + options.field + '"/>')
            .appendTo(container);
    }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-form name="formExample" method="POST" action="Index">
        <form-items>
            <form-item field="Description" editor-handler="customTextareaEditor">
                <item-label text="Description:" />
            </form-item>  
        </form-items>
    </kendo-form>

    <script>
        function customTextareaEditor(container, options) {
            $('<textarea class="k-textarea" data-bind="value: ' + options.field + '" name="' + options.field + '"/>')
                .appendTo(container);
        }
    </script>
```
{% endif %}


## See Also

* [Items Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/items)
* [Server-Side API](/api/form)

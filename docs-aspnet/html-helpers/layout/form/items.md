---
title: Items
page_title: Items
description: "Get started with the Telerik UI Form HtmlHelper for {{ site.framework }} and learn how to configure items."
slug: htmlhelpers_form_aspnetcore_items
position: 2
---

# Items

The `Items` configuration options allows you to customize the appearance and behavior of the Form. The `Items` configuration maps the model fields and through it you can:

* customize the editors
* customize the labels and hints of the editors
* group the editors

## Configure Label

The following example shows how to set the `Label` of an item. Enabling the `Optional` setting, indicates that the field is optional (not required).

```Razor
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

## Configure Hint

The following example shows how to set the `Hint` of an item. The hint is displayed below the editor of the field.

```Razor
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

## Configure Editor

With the `Editor` option you can explicitly configure an editor to be used for a specific field. See the [editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/form/configuration/items#itemseditor) configuration option in the client-side API documentation, for a list of the supported editors.

```Razor
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

## Custom Editor

You can implement custom editor by using the editor option as a function as follows:

```Razor
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

## See Also

* [Items Demo of the Form HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/form/items)
* [Server-Side API](/api/form)

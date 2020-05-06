---
title: Items
page_title: Kendo UI for jQuery Form Documentation | Items | Kendo UI
description: "Get started with the Kendo UI for jQuery Form and learn how to configure items."
slug: items_form_widget
position: 2
---

# Items

The `items` configuration options allows you to customize the appearance and behavior of the Form. If it is not set, the Form will render default editors based on the data provided in its `formData` configuration. 

The following example shows the Form initialized with the `items` option not set.

```dojo
    <form id="form"></form>
  
    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    Username: "",
                    Email: "",
                    Password: "",
                    Birth: new Date(),
                    Agree: false
                }
            });
        });
    </script>
```

Setting the `items` configuration maps the model fields and allows you to: 

* customize the editors
* customize the labels and hints of the editors
* group the editors
* set validation rules for specific fields

The following example shows the Form initialized with the `items` configuration set.

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    Username: "",
                    Email: "",
                    Password: "",
                    Birth: new Date(),
                    Agree: false
                },
                items: [
                    { 
                        field: "Username", 
                        label: "Username:", 
                        validation: { required: true } 
                    },
                    { 
                        field: "Email", 
                        label: "Email", 
                        validation: { required: true, email: true }
                    },
                    { 
                        field: "Password", 
                        label: "Password:", 
                        validation: { required: true }, 
                        hint: "Hint: enter alphanumeric characters only." 
                    },
                    { 
                        field: "Birth", 
                        label: { text: "Date of birth:", optional: true } 
                    },
                    {
                        field: "JobFunction", editor: "DropDownList", label: "Job Function", validation: { required: true }, editorOptions: {
                        optionLabel: "Select job function...",
                        dataSource: [
                            { Name: "Management", Id: 1 },
                            { Name: "Finance", Id: 2 },
                            { Name: "Sales", Id: 3 }
                        ],
                        dataTextField: "Name",
                        dataValueField: "Id"
                        }
                    },
                    { 
                        field: "Agree", 
                        label: "Agree to Terms", 
                        validation: { required: true } 
                    },
                ]
            });
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Form](/api/javascript/ui/from)

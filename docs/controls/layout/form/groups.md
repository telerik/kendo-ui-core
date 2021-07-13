---
title: Groups
page_title: Kendo UI for jQuery Form Documentation | Groups
description: "Get started with the Kendo UI for jQuery Form and learn how to set up groups."
slug: groups_form_widget
position: 5
---

# Groups

The grouping functionality of the Form allows you to create more intuitive forms by displaying fields in logical grouped sections. 

The following example shows a Form configured to display its editors in two groups.

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    FirstName: "",
                    LastName: "",
                    Email: "",
                    Password: "",
                    Birth: new Date(),
                    Agree: false
                },
                items: [
                    {
                        type: "group",
                        label: "Personal Information",
                        items: [
                            { 
                                field: "FirstName", 
                                label: "First Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "LastName", 
                                label: "Last Name:", 
                                validation: { required: true } 
                            },
                            { 
                                field: "Email", 
                                label: "Email", 
                                validation: { 
                                    required: true, 
                                    email: true 
                                }
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
                            }
                        ]
                    },
                    {
                        type: "group",
                        label: "Shipping Address",
                        items: [
                            { 
                                field: "Country", editor: "DropDownList", label: "Country", validation: { required: true }, editorOptions: {
                                    optionLabel: "Select country...",
                                    dataSource: [
                                        { Name: "France", Id: 1 },
                                        { Name: "Germany", Id: 2 },
                                        { Name: "Italy", Id: 3 },
                                        { Name: "Spain", Id: 4 }
                                    ],
                                    dataTextField: "Name",
                                    dataValueField: "Id"
                                }
                            },
                            { 
                                field: "City", 
                                label: "City", 
                                validation: { required: true } 
                            },
                            { 
                                field: "AddressLine", 
                                label: "Address Line", 
                                validation: { required: true } 
                            },
                        ]
                    },
                    { 
                        field: "Agree", 
                        label: "Agree to Terms", 
                        validation: { required: true } 
                    }
                ]
            });
        });
    </script>
```

> The Form does not support group nesting.

## See Also

* [Groups in the Form (Demo)](https://demos.telerik.com/kendo-ui/form/groups)
* [JavaScript API Reference of the Form](/api/javascript/ui/form)

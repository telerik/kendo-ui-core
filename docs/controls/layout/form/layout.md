---
title: Layout
page_title: Kendo UI for jQuery Form Documentation | Layout | Kendo UI
description: "Get started with the Kendo UI for jQuery Form and learn about the layouts it supports."
slug: layout_form_widget
position: 4
---

# Layout

To configure layout, use either of the following settings:

* `flex`
* `grid`

> Grid layout is supported only on modern browsers. Even so, not all browsers that support grid layout support all features.

## Flex Layout

Flex is the default layout of the form.

The following example shows the Form with `flex` layout.

```dojo
    <form id="form"></form>
  
    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                layout: "flex",
                formData: {
                    Username: "",
                    Email: "",
                    Password: "",
                    Birth: new Date(),
                    Agree: false
                },
                items: [{
                    type: "group",
                    label: "Registration Form",
                    items: [
                        { field: "Username", label: "Username:", validation: { required: true } },
                        { field: "Email", label: "Email", validation: { required: true } },
                        { field: "Password", label: "Password:", validation: { required: true }, hint: "Hint: enter alphanumeric characters only." },
                        { field: "Birth", label: { text: "Date of birth:", optional: true } },
                        { field: "Agree", label: "Agree to Terms", validation: { required: true } },
                    ]
                }]
            });
        });
    </script>
```

## Grid Layout

To use this layout set the option to `grid`, specify the number of columns and the gutter between them. The Form supports up to 12 columns.

    layout: "grid",
    grid: {
        cols: 3,
        gutter: 10
    }

The following example shows the Form with `grid` layout set.

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
              	layout: "grid",
                grid: {
                    cols: 2,
                    gutter: 20
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
                      	layout: "grid",
                      	grid: { cols: 2, gutter: 10 },                      	
                        items: [
                            { 
                                field: "Country", 
                              	editor: "DropDownList", 
                              	label: "Country", 
                              	validation: { required: true }, 
                              	colSpan: 1,
                              	editorOptions: {
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
                                validation: { required: true },
                              	colSpan: 1,
                            },
                            { 
                                field: "AddressLine", 
                                label: "Address Line", 
                              	colSpan: 2,
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

## See Also

* [JavaScript API Reference of the Form](/api/javascript/ui/from)

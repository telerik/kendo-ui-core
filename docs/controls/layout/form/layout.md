---
title: Layout
page_title: Kendo UI for jQuery Form Documentation | Layout
description: "Get started with the Kendo UI for jQuery Form and learn about the layouts it supports."
slug: layout_form_widget
position: 4
---

# Layout

In addition the default layout, the Form offers an option to use `Grid` layout. It can be set through the `Layout` option.

> Grid layout is supported only on modern browsers. Even so, not all browsers that support grid layout support all features.

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

* [Layout of the Form (Demo)](https://demos.telerik.com/kendo-ui/form/layout)
* [JavaScript API Reference of the Form](/api/javascript/ui/form)

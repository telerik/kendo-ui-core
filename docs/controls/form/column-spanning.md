---
title: Column Spanning
page_title: Kendo UI for jQuery Form Documentation - Column Spanning
description: "Learn how to configure column spanning for responsive form layouts in the Kendo UI for jQuery Form."
slug: colspan_form_widget
position: 8
---

# Column Spanning

The Kendo UI Form provides a `colSpan` configuration option that allows you to control how form fields span across multiple columns in a grid layout. This feature is essential for creating responsive and adaptive form layouts that adjust to different screen sizes and viewport widths.

The `colSpan` option is only effective when the Form uses a grid layout (`layout: "grid"`). It works similar to the CSS Grid `grid-column-span` property, allowing fields to occupy multiple columns within the form's grid structure.

## Basic Column Spanning

You can set a fixed column span for any form field by specifying a number value for the `colSpan` property. This tells the field to span across the specified number of columns.

```dojo
    <form id="form"></form>

    <script>
        $("#form").kendoForm({
            formData: {
                FirstName: "",
                LastName: "",
                Email: "",
                Address: "",
                City: "",
                PostalCode: ""
            },
            layout: "grid",
            grid: {
                cols: 4,
                gutter: 20
            },
            items: [{
                field: "FirstName",
                label: "First Name:",
                colSpan: 2
            }, {
                field: "LastName", 
                label: "Last Name:",
                colSpan: 2
            }, {
                field: "Email",
                label: "Email:",
                colSpan: 4  // Spans across all 4 columns
            }, {
                field: "Address",
                label: "Address:",
                colSpan: 4  // Full width field
            }, {
                field: "City",
                label: "City:",
                colSpan: 2
            }, {
                field: "PostalCode",
                label: "Postal Code:",
                colSpan: 2
            }]
        });
    </script>
```

## Responsive Column Spanning

For responsive layouts, you can define different column spans for different viewport widths using an array configuration. Each array item specifies breakpoint criteria (`minWidth`, `maxWidth`) and the corresponding `value` to apply.

```dojo
    <form id="form"></form>

    <script>
        $("#form").kendoForm({
            formData: {
                FirstName: "",
                LastName: "",
                Email: "",
                Description: ""
            },
            layout: "grid",
            grid: {
                cols: 4,
                gutter: 20
            },
            items: [{
                field: "FirstName",
                label: "First Name:",
                colSpan: [{
                    maxWidth: 768,
                    value: 4  // Full width on mobile
                }, {
                    minWidth: 769,
                    value: 2  // Half width on desktop
                }]
            }, {
                field: "LastName",
                label: "Last Name:",
                colSpan: [{
                    maxWidth: 768,
                    value: 4  // Full width on mobile
                }, {
                    minWidth: 769,
                    value: 2  // Half width on desktop
                }]
            }, {
                field: "Email",
                label: "Email:",
                colSpan: 4  // Always full width
            }, {
                field: "Description",
                label: "Description:",
                colSpan: 4  // Always full width
            }]
        });
    </script>
```

## Column Spanning in Groups

The `colSpan` property can also be applied to form groups, allowing entire sections to span multiple columns within the parent form's grid layout.

```dojo
    <form id="form"></form>

    <script>
        $("#form").kendoForm({
            formData: {
                FirstName: "",
                LastName: "",
                CompanyName: "",
                Position: "",
                Email: "",
                Phone: ""
            },
            layout: "grid",
            grid: {
                cols: 2,
                gutter: 30
            },
            items: [{
                type: "group",
                label: "Personal Information",
                colSpan: 1,  // Takes half the form width
                layout: "grid",
                grid: {
                    cols: 2,
                    gutter: 15
                },
                items: [{
                    field: "FirstName",
                    label: "First Name:",
                    colSpan: 1
                }, {
                    field: "LastName",
                    label: "Last Name:",
                    colSpan: 1
                }]
            }, {
                type: "group",
                label: "Professional Information",
                colSpan: 1,  // Takes the other half
                layout: "grid",
                grid: {
                    cols: 2,
                    gutter: 15
                },
                items: [{
                    field: "CompanyName",
                    label: "Company:",
                    colSpan: 2  // Full width within this group
                }, {
                    field: "Position",
                    label: "Position:",
                    colSpan: 2  // Full width within this group
                }]
            }, {
                type: "group",
                label: "Contact Information",
                colSpan: 2,  // Spans across both columns
                layout: "grid",
                grid: {
                    cols: 2,
                    gutter: 15
                },
                items: [{
                    field: "Email",
                    label: "Email:",
                    colSpan: 1
                }, {
                    field: "Phone",
                    label: "Phone:",
                    colSpan: 1
                }]
            }]
        });
    </script>
```

## Breakpoint Configuration

When using responsive column spanning, you can define multiple breakpoints with specific criteria:

* `minWidth` - The minimum viewport width (in pixels) for which the colSpan value applies
* `maxWidth` - The maximum viewport width (in pixels) for which the colSpan value applies  
* `value` - The number of columns the field should span when the breakpoint criteria are met

### Breakpoint Example

```javascript
colSpan: [{
    maxWidth: 600,      // Mobile devices
    value: 4            // Full width
}, {
    minWidth: 601,      // Tablet devices
    maxWidth: 1024,
    value: 2            // Half width
}, {
    minWidth: 1025,     // Desktop devices
    value: 1            // Single column
}]
```

## Best Practices

When implementing column spanning in your forms, consider these recommendations:

* **Start Mobile-First**: Define responsive breakpoints starting from the smallest screen size and working up to larger viewports.

* **Use Consistent Grid Systems**: Ensure your column spans add up correctly within each row to avoid layout issues.

* **Test Across Devices**: Verify that your responsive column spans work well across different screen sizes and orientations.

* **Group Related Fields**: Use column spanning to visually group related form fields together, improving the user experience.

* **Consider Content Length**: Longer fields like descriptions or addresses typically benefit from wider column spans.

## See Also

* [Form Layout]({% slug layout_form_widget %})
* [Form Groups]({% slug groups_form_widget %})
* [Form Items]({% slug items_form_widget %})
* [JavaScript API Reference of the Form](/api/javascript/ui/form)
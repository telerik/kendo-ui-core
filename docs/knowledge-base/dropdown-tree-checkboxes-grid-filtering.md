---
title: Using DropDownTree Checkboxes with CheckAll for Grid Filtering
description: Learn how to use Kendo UI for jQuery DropDownTree checkboxes with CheckAll functionality for filtering a Kendo Grid.
type: how-to
page_title: Implementing DropDownTree Checkboxes for Grid Filtering
meta_title: Implementing DropDownTree Checkboxes for Grid Filtering
slug: dropdown-tree-checkboxes-grid-filtering
tags: dropdown-tree,kendo-ui-for-jquery,grid,filtering,checkboxes,checkall
res_type: kb
components: ["grid"]
ticketid: 1701162
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> 
Kendo UI for jQuery DropDownTree, <br/>
Kendo UI for jQuery Grid 
</td>
</tr>
<tr>
<td> Version </td>
<td> 2025.3.1002 </td>
</tr>
</tbody>
</table>

## Description

I want to use the [DropDownTree](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree) with checkboxes and CheckAll functionality to filter a Kendo UI for jQuery Grid. I need guidance on how to configure the DropDownTree as a custom filter and manually handle the filtering logic based on its selection.

This knowledge base article also answers the following questions:
- How to use Kendo UI for jQuery DropDownTree as a Grid filter?
- How to implement [checkAll](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdowntree/configuration/checkall) functionality in DropDownTree for Grid filtering?
- How to handle filtering a Grid manually based on DropDownTree value?

## Solution

To achieve this functionality, follow these steps:

1. Use the [`columns.filterable.ui`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/configuration/columns.filterable.ui) option of the Kendo Grid to implement the DropDownTree as a filter popup.
2. Replace the original filter input element with a DropDownTree container element.
3. Configure the DropDownTree with [`checkboxes`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdowntree/configuration/checkboxes) and [`checkAll`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdowntree/configuration/checkall) enabled.
4. Handle the [`change`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/dropdowntree/events/change) event of the DropDownTree to filter the Grid manually.

### Example Code

Below you will find a runnable example

```dojo
   <div class="container">
        <h1>Kendo Grid with DropDownTree Custom Filter</h1>
        <div id="grid"></div>
    </div>

    <script>
        $(document).ready(function() {
            // Sample data for the grid
            const gridData = [
                { id: 1, name: "John Doe", age: 30, department: "IT", category: "Development", subcategory: "Frontend" },
                { id: 2, name: "Jane Smith", age: 25, department: "HR", category: "Management", subcategory: "Recruitment" },
                { id: 3, name: "Bob Johnson", age: 35, department: "IT", category: "Development", subcategory: "Backend" },
                { id: 4, name: "Alice Brown", age: 28, department: "Finance", category: "Accounting", subcategory: "Payroll" },
                { id: 5, name: "Charlie Wilson", age: 32, department: "IT", category: "Support", subcategory: "Help Desk" },
                { id: 6, name: "Diana Miller", age: 29, department: "Marketing", category: "Digital", subcategory: "Social Media" },
                { id: 7, name: "Eve Davis", age: 31, department: "IT", category: "Development", subcategory: "Full Stack" },
                { id: 8, name: "Frank Garcia", age: 27, department: "Sales", category: "B2B", subcategory: "Enterprise" },
                { id: 9, name: "Grace Lee", age: 26, department: "HR", category: "Management", subcategory: "Training" },
                { id: 10, name: "Henry Moore", age: 33, department: "Finance", category: "Accounting", subcategory: "Budgeting" },
                { id: 11, name: "Isabel Chen", age: 29, department: "IT", category: "Support", subcategory: "System Admin" },
                { id: 12, name: "Jack Thompson", age: 24, department: "Marketing", category: "Digital", subcategory: "SEO" },
                { id: 13, name: "Kelly White", age: 37, department: "Sales", category: "B2B", subcategory: "Small Business" },
                { id: 14, name: "Liam Foster", age: 28, department: "IT", category: "Development", subcategory: "Backend" },
                { id: 15, name: "Maya Patel", age: 31, department: "Finance", category: "Accounting", subcategory: "Payroll" },
                { id: 16, name: "Nathan Brooks", age: 26, department: "HR", category: "Management", subcategory: "Recruitment" },
                { id: 17, name: "Olivia Rodriguez", age: 30, department: "Marketing", category: "Digital", subcategory: "Social Media" },
                { id: 18, name: "Peter Kim", age: 34, department: "IT", category: "Development", subcategory: "Frontend" },
                { id: 19, name: "Quinn Taylor", age: 25, department: "Sales", category: "B2B", subcategory: "Enterprise" },
                { id: 20, name: "Rachel Green", age: 32, department: "IT", category: "Support", subcategory: "Help Desk" },
                { id: 21, name: "Samuel Clark", age: 29, department: "Finance", category: "Accounting", subcategory: "Budgeting" },
                { id: 22, name: "Tina Martinez", age: 27, department: "HR", category: "Management", subcategory: "Training" },
                { id: 23, name: "Victor Singh", age: 35, department: "Marketing", category: "Digital", subcategory: "SEO" },
                { id: 24, name: "Wendy Adams", age: 28, department: "IT", category: "Development", subcategory: "Full Stack" },
                { id: 25, name: "Xavier Lopez", age: 33, department: "Sales", category: "B2B", subcategory: "Small Business" },
                { id: 26, name: "Yvonne Hall", age: 26, department: "Finance", category: "Accounting", subcategory: "Payroll" },
                { id: 27, name: "Zachary Turner", age: 31, department: "IT", category: "Support", subcategory: "System Admin" },
                { id: 28, name: "Amanda Scott", age: 30, department: "HR", category: "Management", subcategory: "Recruitment" }
            ];

            // Hierarchical data for DropDownTree
            const categoryData = [
                {
                    id: 1,
                    text: "IT",
                    expanded: true,
                    items: [
                        { id: 2, text: "Development", items: [
                            { id: 3, text: "Frontend" },
                            { id: 4, text: "Backend" },
                            { id: 5, text: "Full Stack" }
                        ]},
                        { id: 6, text: "Support", items: [
                            { id: 7, text: "Help Desk" },
                            { id: 8, text: "System Admin" }
                        ]}
                    ]
                },
                {
                    id: 9,
                    text: "HR",
                    expanded: true,
                    items: [
                        { id: 10, text: "Management", items: [
                            { id: 11, text: "Recruitment" },
                            { id: 12, text: "Training" }
                        ]}
                    ]
                },
                {
                    id: 13,
                    text: "Finance",
                    expanded: true,
                    items: [
                        { id: 14, text: "Accounting", items: [
                            { id: 15, text: "Payroll" },
                            { id: 16, text: "Budgeting" }
                        ]}
                    ]
                },
                {
                    id: 17,
                    text: "Marketing",
                    expanded: true,
                    items: [
                        { id: 18, text: "Digital", items: [
                            { id: 19, text: "Social Media" },
                            { id: 20, text: "SEO" }
                        ]}
                    ]
                },
                {
                    id: 21,
                    text: "Sales",
                    expanded: true,
                    items: [
                        { id: 22, text: "B2B", items: [
                            { id: 23, text: "Enterprise" },
                            { id: 24, text: "Small Business" }
                        ]}
                    ]
                }
            ];

            // Initialize the Grid
            $("#grid").kendoGrid({
                dataSource: {
                    data: gridData,
                    pageSize: 10,
                    schema: {
                        model: {
                            id: "id",
                            fields: {
                                id: { type: "number" },
                                name: { type: "string" },
                                age: { type: "number" },
                                department: { type: "string" },
                                category: { type: "string" },
                                subcategory: { type: "string" }
                            }
                        }
                    }
                },
                height: 600,
                filterable: {
                    mode: "menu"
                },
                pageable: {
                    pageSize: 10,
                    pageSizes: [5, 10, 20, 50],
                    buttonCount: 5
                },
                sortable: true,
                columns: [
                    { 
                        field: "id", 
                        title: "ID", 
                        width: "80px",
                        filterable: false
                    },
                    { 
                        field: "name", 
                        title: "Name", 
                        width: "150px"
                    },
                    { 
                        field: "age", 
                        title: "Age", 
                        width: "100px"
                    },
                    { 
                        field: "department", 
                        title: "Department", 
                        width: "120px",
                        filterable: {
                            // Custom DropDownTree filter
                            extra: false,
                            ui: function(element) {
                                
                                const grid = $("#grid").data("kendoGrid");
                                const dropDownTreeElement = $('<input />');
                                
                                // Replace the original element with a container
                                const container = $('<div></div>');
                                container.append(dropDownTreeElement);
                                element.replaceWith(container);
                                
                                // Initialize DropDownTree
                                dropDownTreeElement.kendoDropDownTree({
                                    placeholder: "Select department(s)...",
                                    dataSource: categoryData,
                                    dataTextField: "text",
                                    dataValueField: "text",
                                    loadOnDemand: false,
                                    checkboxes: {
                                        checkChildren: true
                                    },
                                    checkAll: true,
                                    autoClose: false,
                                    // Note: filter is disabled because it conflicts with checkChildren
                                    // filter: "contains",
                                    change: function(e) {
                                        // Get the selected values
                                        const selectedValues = this.value();
                                        
                                        if (selectedValues && selectedValues.length > 0) {
                                            // Create filter expression for multiple values
                                            const filters = selectedValues.map(value => ({
                                                field: "department",
                                                operator: "eq",
                                                value: value
                                            }));
                                            
                                            // Apply filter with OR logic for multiple selections
                                            const filterExpression = {
                                                logic: "or",
                                                filters: filters
                                            };
                                            
                                            // Get current filters and update department filter
                                            let currentFilter = grid.dataSource.filter();
                                            if (!currentFilter) {
                                                currentFilter = { logic: "and", filters: [] };
                                            }
                                            
                                            // Remove existing department filters
                                            currentFilter.filters = currentFilter.filters.filter(f => 
                                                !(f.field === "department" || (f.filters && f.filters.some(sf => sf.field === "department")))
                                            );
                                            
                                            // Add new department filter
                                            if (filters.length === 1) {
                                                currentFilter.filters.push(filters[0]);
                                            } else {
                                                currentFilter.filters.push(filterExpression);
                                            }
                                            
                                            // Apply the filter
                                            grid.dataSource.filter(currentFilter);
                                        } else {
                                            // Clear department filters
                                            let currentFilter = grid.dataSource.filter();
                                            if (currentFilter && currentFilter.filters) {
                                                currentFilter.filters = currentFilter.filters.filter(f => 
                                                    !(f.field === "department" || (f.filters && f.filters.some(sf => sf.field === "department")))
                                                );
                                                
                                                if (currentFilter.filters.length === 0) {
                                                    grid.dataSource.filter({});
                                                } else {
                                                    grid.dataSource.filter(currentFilter);
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    },
                    { 
                        field: "category", 
                        title: "Category", 
                        width: "120px",
                        filterable: {
                            multi: true,
                            checkAll: true
                        }
                    },
                    { 
                        field: "subcategory", 
                        title: "Subcategory", 
                        width: "150px",
                        filterable: {
                            multi: true,
                            checkAll: true
                        }
                    }
                ]
            });
        });
    </script>
```

## See Also

- [JavaScript API Reference of the DropDownTree](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)
- [JavaScript API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Grid Filter Menu Customization (Demo)](https://demos.telerik.com/kendo-ui/grid/filter-menu-customization)

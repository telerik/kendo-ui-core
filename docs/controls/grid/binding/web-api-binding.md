---
title: Web API Integration
page_title: jQuery Grid Documentation - Web API Integration
description: "Get started with the jQuery Grid by Kendo UI and learn how to integrate it with ASP.NET Core Web API for CRUD operations."
components: ["grid"]
slug: webapi_integration_kendoui_grid_widget
position: 1
---

# Web API Integration

The Kendo UI Grid for jQuery supports seamless integration with ASP.NET Core Web API for performing CRUD (Create, Read, Update, Delete) operations. This article demonstrates how to configure the Grid to communicate with a Web API backend.

You can find a [full working example](https://github.com/telerik/kendo-examples-asp-net/tree/master/grid-core-webapi-crud) of this integration in the GitHub repository link provided in Knowledge Base article below:

[Web API Integration Example](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/web-api-server-operations)

## Overview

The Grid uses its DataSource component to communicate with the server through HTTP requests. When configured with `type: "webapi"`, the DataSource automatically formats requests and processes responses according to the Web API conventions.

## Prerequisites

* ASP.NET Core Web API project
* Kendo UI for jQuery
* `Kendo.Mvc.UI` NuGet package (for DataSourceRequest handling)

## Basic Configuration

The following example demonstrates a basic Grid configuration with Web API integration:

```html
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        columns: [
            { "title": "Order ID", "width": "100px", "field": "OrderID" },
            { "title": "Ship City", "width": "200px", "field": "ShipCity" },
            { "title": "Ship Name", "width": "200px", "field": "ShipName" },
            { "title": "Order Date", "width": "200px", "field": "OrderDate", format: "{0:dd/MM/yyyy}" },
            { command: ["edit", "destroy"], "width": "150px" }
        ],
        toolbar: ["create"],
        editable: "inline",
        dataSource: {
            type: "webapi",
            transport: {
                read: {
                    url: "/api/Grid/Read"
                },
                update: {
                    url: "/api/Grid/Update"
                },
                create: {
                    url: "/api/Grid/Create"
                },
                destroy: {
                    url: "/api/Grid/Destroy"
                }
            },
            pageSize: 20,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            schema: {
                data: "Data",
                total: "Total",
                errors: "Errors",
                model: {
                    id: "OrderID",
                    fields: {
                        OrderID: { type: "number", editable: false },
                        ShipCity: { type: "string" },
                        ShipName: { type: "string" },
                        OrderDate: { type: "date" }
                    }
                }
            }
        }
    });
</script>
```

## DataSource Configuration

### Transport Configuration

The `transport` object defines the URLs for each CRUD operation:

```javascript
transport: {
    read: {
        url: "/api/Grid/Read"
    },
    update: {
        url: "/api/Grid/Update"
    },
    create: {
        url: "/api/Grid/Create"
    },
    destroy: {
        url: "/api/Grid/Destroy"
    }
}
```

* **read**: GET request to retrieve data
* **update**: PUT request to update existing records
* **create**: POST request to create new records
* **destroy**: DELETE request to remove records

### Schema Configuration

The `schema` object defines how the Grid interprets the server response:

```javascript
schema: {
    data: "Data",        // Property containing the data array
    total: "Total",      // Property containing the total record count
    errors: "Errors",    // Property containing validation errors
    model: {
        id: "OrderID",   // Unique identifier field
        fields: {
            OrderID: { type: "number", editable: false },
            ShipCity: { type: "string" },
            ShipName: { type: "string" },
            OrderDate: { type: "date" }
        }
    }
}
```

### Server Operations

Enable server-side processing for better performance with large datasets:

```javascript
serverPaging: true,      // Server handles paging
serverSorting: true,     // Server handles sorting
serverFiltering: true,   // Server handles filtering
serverGrouping: true,    // Server handles grouping
serverAggregates: true   // Server handles aggregates
```

## Server-Side Implementation

### Controller Setup

Create an API controller that inherits from `ControllerBase`:

```csharp
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;

namespace YourApp.Controllers
{
    [Route("api/[controller]")]
    public class GridController : ControllerBase
    {
        private static List<OrderViewModel> orders;

        // Read operation
        [HttpGet("Read")]
        public DataSourceResult GetOrders([DataSourceRequest] DataSourceRequest request)
        {
            if (orders == null)
            {
                // Initialize your data
                orders = GetOrdersFromDatabase();
            }

            return orders.ToDataSourceResult(request);
        }

        // Create operation
        [HttpPost("Create")]
        public IActionResult Create(OrderViewModel order)
        {
            order.OrderID = orders.Count + 1;
            orders.Add(order);

            return new ObjectResult(new DataSourceResult 
            { 
                Data = new[] { order }, 
                Total = 1 
            });
        }

        // Update operation
        [HttpPut("Update")]
        public IActionResult Update(OrderViewModel order)
        {
            var existingOrder = orders.FirstOrDefault(o => o.OrderID == order.OrderID);
            if (existingOrder != null)
            {
                existingOrder.ShipCity = order.ShipCity;
                existingOrder.ShipName = order.ShipName;
                existingOrder.OrderDate = order.OrderDate;
            }

            return new StatusCodeResult(200);
        }

        // Delete operation
        [HttpDelete("Destroy")]
        public IActionResult Destroy(OrderViewModel order)
        {
            var orderToRemove = orders.FirstOrDefault(o => o.OrderID == order.OrderID);
            if (orderToRemove != null)
            {
                orders.Remove(orderToRemove);
            }

            return new StatusCodeResult(200);
        }
    }
}
```

### DataSourceRequest Parameter

The `[DataSourceRequest]` attribute automatically binds Grid parameters (page, pageSize, sort, filter, etc.) to the `DataSourceRequest` object. Use the `ToDataSourceResult()` extension method to process these parameters:

```csharp
public DataSourceResult GetOrders([DataSourceRequest] DataSourceRequest request)
{
    return orders.ToDataSourceResult(request);
}
```

This method automatically handles:
* Paging
* Sorting
* Filtering
* Grouping
* Aggregates

### Model Definition

Define a view model class for your data:

```csharp
using System;
using System.ComponentModel.DataAnnotations;

namespace YourApp.Models
{
    public class OrderViewModel
    {
        public int OrderID { get; set; }
        
        [Required]
        public DateTime? OrderDate { get; set; }
        
        public string ShipCity { get; set; }
        
        public string ShipName { get; set; }
        
        public decimal? Freight { get; set; }
    }
}
```

## Advanced Scenarios

### Working with Complex Objects

The Grid supports complex objects like nested entities. For example, a Category property:

```javascript
columns: [
    { "title": "Order ID", "field": "OrderID" },
    { 
        "title": "Category", 
        "field": "Category", 
        editor: categoryDropDownList, 
        template: "#=Category.CategoryName#" 
    }
],
dataSource: {
    schema: {
        model: {
            fields: {
                Category: { 
                    defaultValue: {
                        CategoryID: 1, 
                        CategoryName: "En Route"
                    } 
                }
            }
        }
    }
}
```

Model definition with complex object:

```csharp
public class OrderViewModel
{
    public int OrderID { get; set; }
    public Category Category { get; set; }
}

public class Category
{
    public int CategoryID { get; set; }
    public string CategoryName { get; set; }
}
```

### Custom Editors

Define custom editors for specific fields:

```javascript
function categoryDropDownList(container, options) {
    $('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
                data: [
                    { CategoryID: 1, CategoryName: "En Route" }, 
                    { CategoryID: 2, CategoryName: "Delivered" }
                ]
            }
        });
}
```

### Error Handling

Handle validation errors by returning them in the response:

```csharp
[HttpPost("Create")]
public IActionResult Create(OrderViewModel order)
{
    if (!ModelState.IsValid)
    {
        var errors = ModelState.Values
            .SelectMany(v => v.Errors)
            .Select(e => e.ErrorMessage);
            
        return new ObjectResult(new DataSourceResult 
        { 
            Errors = string.Join(", ", errors)
        });
    }

    order.OrderID = orders.Count + 1;
    orders.Add(order);

    return new ObjectResult(new DataSourceResult 
    { 
        Data = new[] { order }, 
        Total = 1 
    });
}
```

The Grid will display errors automatically when the `Errors` property is populated.

## Request Format

### Read Request

When the Grid requests data, it sends parameters as query strings:

```
GET /api/Grid/Read?page=1&pageSize=20&sort[0][field]=OrderID&sort[0][dir]=asc
```

### Update Request

Update requests send the modified record in the request body:

```
PUT /api/Grid/Update
Content-Type: application/json

{
    "OrderID": 1,
    "ShipCity": "New York",
    "ShipName": "Updated Name",
    "OrderDate": "2024-01-15"
}
```

### Create Request

Create requests send the new record in the request body:

```
POST /api/Grid/Create
Content-Type: application/json

{
    "ShipCity": "Los Angeles",
    "ShipName": "New Order",
    "OrderDate": "2024-01-15"
}
```

### Destroy Request

Delete requests send the record to be deleted in the request body:

```
DELETE /api/Grid/Destroy
Content-Type: application/json

{
    "OrderID": 1
}
```

## Response Format

The server should return data in the following format:

```json
{
    "Data": [
        {
            "OrderID": 1,
            "ShipCity": "Seattle",
            "ShipName": "Ship Name 1",
            "OrderDate": "2024-01-15T00:00:00"
        },
        {
            "OrderID": 2,
            "ShipCity": "Portland",
            "ShipName": "Ship Name 2",
            "OrderDate": "2024-01-16T00:00:00"
        }
    ],
    "Total": 50
}
```

## Best Practices

1. **Use Server Operations**: Enable `serverPaging`, `serverSorting`, and `serverFiltering` for large datasets to improve performance.

2. **Validate Input**: Always validate data on the server side before processing:
   ```csharp
   if (!ModelState.IsValid)
   {
       return BadRequest(ModelState);
   }
   ```

3. **Handle Errors Gracefully**: Return meaningful error messages in the `Errors` property of the response.

4. **Use DTOs**: Use Data Transfer Objects (DTOs) or ViewModels instead of domain entities to control what data is exposed.

5. **Implement Proper HTTP Methods**: 
   - GET for read operations
   - POST for create operations
   - PUT for update operations
   - DELETE for destroy operations

6. **Security**: Implement proper authentication and authorization for your API endpoints:
   ```csharp
   [Authorize]
   [Route("api/[controller]")]
   public class GridController : ControllerBase
   {
       // ...
   }
   ```

7. **Async Operations**: Use async/await for database operations:
   ```csharp
   [HttpGet("Read")]
   public async Task<DataSourceResult> GetOrders([DataSourceRequest] DataSourceRequest request)
   {
       var orders = await _context.Orders.ToListAsync();
       return orders.ToDataSourceResult(request);
   }
   ```

## Troubleshooting

### Grid Shows No Data

* Verify the API endpoint URLs are correct
* Check browser console for network errors
* Ensure the response format matches the schema configuration
* Verify CORS settings if the API is on a different domain

### CRUD Operations Don't Work

* Verify HTTP methods match the operation (GET, POST, PUT, DELETE)
* Check that the `model.id` field is correctly configured
* Ensure the API returns the expected response format
* Check for JavaScript errors in the browser console

### Server-Side Processing Not Working

* Verify `ToDataSourceResult()` is called on the server
* Ensure `[DataSourceRequest]` attribute is applied to the parameter
* Check that server operation flags are set to `true` in the DataSource

## See Also

* [Grid Overview](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
* [DataSource Configuration](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
* [Server-Side Processing](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/binding/ajax-binding)

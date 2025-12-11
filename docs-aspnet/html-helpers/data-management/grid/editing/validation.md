---
title: Validation
page_title: Grid Validation
description: "Built-in validation in the {{ site.product }} Grid and how to customize the validation behavior."
components: ["grid"]
slug: htmlhelpers_grid_validation
position: 5
---

# Grid Validation

The editable Grid supports built-in validation that is enabled by default. This article describes how the Grid validation works, how to create custom validation rules, and implement server-side validation.

## Basics

By default, the Grid consumes the `DataAnnotation` attributes that are added to the model. The [`HTML5 data-*`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*) attributes are generated in the HTML markup of each editor based on the `DataAnnotation` attributes applied to the properties of the model that binds to the Grid. For more information on the supported `DataAnnotation` attributes, refer to the [general validation documentation]({% slug validation_aspnetmvc%}).

The editable Grid initializes the [Kendo UI for jQuery Validator](https://docs.telerik.com/kendo-ui/controls/validator/overview) internally to perform client-side validation based on the defined `DataAnnotation` attributes. The Validator creates [validation rules](https://www.telerik.com/kendo-jquery-ui/documentation/controls/validator/rules) based on the unobtrusive HTML attributes. 

In [all edit modes]({% slug htmlhelpers_grid_aspnetcore_editing_overview%}#edit-modes) of the Grid, the validation messages are displayed as tooltips for the invalid inputs.

## Custom Validation

You can extend the default validation rules of the Grid's Validator and perform additional client-side validations.

To implement a custom validation rule, you need to:

1. Create a custom `DataAnnotation` attribute and decorate the respective model property with the new attribute.
1. Extend the built-in validation rules of the Validator and register the new validation.

The following example shows how to implement a `CustomProductNameValidation` attribute to check whether the entered `ProductName` starts with a capital letter.

{% if site.core %}
```Model
    using System.ComponentModel.DataAnnotations;
    using System.Text.RegularExpressions;

	public class ProductViewModel
	{
		public int ProductID { get; set; }

		[Required]
		[CustomProductNameValidation(ErrorMessage = "ProductName should start with capital letter")]
		public string ProductName { get; set; }
	}

	public class CustomProductNameValidationAttribute : ValidationAttribute
	{		
		public override bool IsValid(object value)
		{
			var productName = (string)value;
			if (!string.IsNullOrEmpty(productName))
			{
				return Regex.IsMatch(productName, "^[A-Z]");
			}
			return true;
		}
	}
```
```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(o => o.ProductID);
            columns.Bound(o => o.ProductName);
            columns.Command(command => command.Edit()).Width(200);
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
	    .Scrollable()
        .DataSource(source => source
            .Ajax()
            .Model(model => model.Id(o => o.ProductID))
            .Read("Read", "Products")
            .Update("Update", "Products")
        )
    )
```
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax">
            <schema data="Data" total="Total">
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number" editable="false"></field>
                        <field name="ProductName" type="string"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Read", "Products")"/>
                <update url="@Url.Action("Update", "Products")"/>
            </transport>
        </datasource>
        <columns>
            <column field="ProductID"/>
            <column field="ProductName"/>
            <column width="200">
                <commands>
                    <column-command text="Edit" name="edit"></column-command>
                </commands>
            </column>
        </columns>
        <editable mode="inline"/>
        <pageable enabled="true"/>
        <scrollable enabled="true"/>
    </kendo-grid>
```
```JS script
    <script type="text/javascript">
        // Register custom validation rules after the Grid declaration.
        $(document).ready( function () {
            $.extend(true, kendo.ui.validator, {
                rules: {
                    productnamevalidation: function (input) {
                        if (input.is("[name=ProductName]") && input.val()) {
                            input.attr("data-productnamevalidation-msg", "Product Name should start with a capital letter");
                            return /^[A-Z]/.test(input.val());
                        }
                        return true;
                    }
                }
            });
        });
    </script>
```
{% else %}
```Model
    using System.ComponentModel.DataAnnotations;
    using System.Text.RegularExpressions;

    public class CustomValidationProductViewModel
    {
        public int ProductID { get; set; }

        [Required]
        [CustomProductNameValidation(ErrorMessage="ProductName should start with capital letter")]
        public string ProductName { get; set; }
    }

    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class CustomProductNameValidationAttribute : ValidationAttribute, IClientValidatable
    {
        public override bool IsValid(object value)
        {
            var productName = (string) value;
            if (!string.IsNullOrEmpty(productName))
	        {                
		        return Regex.IsMatch(productName, "^[A-Z]");
            }
            return true;            
        }        

        public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
        {
            yield return new ModelClientValidationRule
            {
                ErrorMessage = ErrorMessage,
                ValidationType = "productnamevalidation"
            };
        }        
    }
```
```View
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(o => o.ProductID);
            columns.Bound(o => o.ProductName);
            columns.Command(command => command.Edit()).Width(200);
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
	    .Scrollable()
        .DataSource(source => source
            .Ajax()
            .Model(model => model.Id(o => o.ProductID))
            .Read("Read", "Products")
            .Update("Update", "Products")
        )
    )

    <script type="text/javascript">
        // Register custom validation rules after the Grid declaration.
        $(document).ready( function () {
            $.extend(true, kendo.ui.validator, {
                rules: {
                    productnamevalidation: function (input, params) {
                        if (input.is("[name='ProductName']") && input.val() != "") {
                            input.attr("data-productnamevalidation-msg", "Product Name should start with capital letter");
                            return /^[A-Z]/.test(input.val());
                        }
                        return true;
                    }
                },
                messages: {
                    productnamevalidation: function (input) {
                        return input.attr("data-val-productnamevalidation");
                    }
                }
            });
        });
    </script>
```
{% endif %}

For a live example, visit the [Custom Validator in an Inline editable Grid](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom-validation).

## Handling ModelState Errors

When editing the Grid's data, server validation is often needed. 

This section demonstrates how to use the `AddModelError()` method to add model errors and display them in an [Inline]({% slug inlineediting_grid_aspnetcore%}) or [Popup]({% slug popupediting_grid_aspnetcore%}) editable Grid when invalid data is entered.

1. Within the `Update`, `Create`, or `Destroy` actions of the editable Grid, validate the received data and add the errors to the `ModelState` using the `AddModelError()` method. For example, let's check the length of the `ShipCountry` property when modifying an existing record in an [Inline editable Grid]({% slug inlineediting_grid_aspnetcore%}).

    ```C#
    public JsonResult Update([DataSourceRequest]DataSourceRequest request, OrderViewModel order)
    {
        if (order.ShipCountry.Length < 3)
        {
            ModelState.AddModelError("ShipCountry", "ShipCountry must be at least three characters long.");
        }

        if (ModelState.IsValid)
        {
            // Save the item in the database or follow with the dummy data.
            for (int i = 0; i < orders.Count; i++)
            {
                // The example uses the model Id to identify the model that needs to be updated.
                if(orders[i].OrderID == order.OrderID)
                {
                    orders[i] = order;
                    break;
                }
            }
        }

        // Return a collection with the modified data item and the ModelState that holds the custom error.
        return Json(new[] { order }.ToDataSourceResult(request, ModelState));
    }
    ```

1. Subscribe to the [`Error()`](/api/kendo.mvc.ui.fluent/datasourceeventbuilder#errorsystemstring) event of the DataSource. The event fires when the response of the DataSource request contains errors (for example, `ModelState` errors).

    ```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        ... // Additional configuration.
        .DataSource(d =>
        {
            d.Ajax()
            .Model(model =>
            {
                model.Id(product => product.OrderID);
                model.Field(product => product.OrderID).Editable(false);
            })
            .Read(read => read.Action("Read", "Grid"))
            .Update(update => update.Action("Update", "Grid"))
            .Events(events => events.Error("onError")); // Handle the Error event of the DataSource.
        })
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax" on-error="onError">
            <schema data="Data" total="Total" errors="Errors">
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number" editable="false"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Read", "Grid")"/>
                <update url="@Url.Action("Update", "Grid")"/>
            </transport>
        </datasource>
    </kendo-grid>
    ```
    {% endif %}

1. Within the `Error` event handler, to prevent the Grid from exiting edit mode when there are server-side errors, get the Grid instance and prevent its `dataBinding` event. Retrieve the received error messages from the server and display them as tooltips for the respective editors.

    ```JS Scripts
    <script>
        function onError(args) {
            var errors = args.errors;
            if (errors) {
                var grid = $("#grid").data("kendoGrid"); // Get a reference to the Grid.
                grid.one("dataBinding", function (e) { 
                    e.preventDefault(); // Prevent its "dataBinding" event.
                    $.each(errors, function (key, value) { // Loop through the received errors.
                        var message = "";
                        if ('errors' in value) {
                            $.each(value.errors, function() { // Loop through the error messages.
                                message += this + "\n";
                            });
                        }

                        // As long as the key matches the field name, validation message will be displayed as a tooltip.
                        grid.editable.element.find("[data-valmsg-for='" + key + "']").replaceWith(`<div class="k-tooltip k-tooltip-error" style="margin:0.5em">${kendo.ui.icon({ icon: 'exclamation-circle', type: 'svg' })} ${message}<div class="k-callout k-callout-n"></div></div>`).show();
                    });
                });
            }
        }
    </script>
    ```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Custom Validator Editing by the Grid for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom-validation)
* [Remote Validation by the Grid for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/editing-remote-validation)
* [Server-Side HtmlHelper API](/api/grid)
{% if site.core %}* [Server-Side TagHelper API](/api/taghelpers/grid){% endif %}
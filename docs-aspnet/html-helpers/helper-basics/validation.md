---
title: Validation
page_title: Validation
description: "Learn how to validate the {{ site.product }} editors and use the Kendo UI for jQuery Validator for client-side validation."
components: ["general"]
slug: validation_aspnetmvc
previous_url: /validation, /getting-started/validation, /getting-started/helper-basics/validation
position: 5
---

# Validation

{{ site.product }} enables you to use client-side validation by utilizing the <a href="https://docs.telerik.com/kendo-ui/controls/validator/overview" target="_blank">Kendo UI for jQuery Validator</a> or the default <a href="https://www.nuget.org/packages/jQuery.Validation" target="_blank">jQuery validation</a>.

This article covers the implementation of validation using <a href="https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-9.0" target="_blank">`DataAnnotation` attributes</a> to create validation rules based on unobtrusive HTML attributes and describes how to activate the Kendo UI Validator on the client. It also explains how to create custom validation rules, extend the built-in validation rules of the editable UI components, such as [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) and [ListView]({% slug htmlhelpers_listview_aspnetcore %}), or use the jQuery validation when using {{ site.product }} components.

## Using DataAnnotation Attributes

The {% if site.mvc %}Telerik UI HTML Helpers{% else %}Telerik UI HTML and Tag Helpers{% endif %} consume the `DataAnnotation` attributes that are added to the Model. This way, the server-side validation is performed using the `ModelState`, which is updated based on these validation rules (for example, `ModelState.IsValid`).

The {{ site.product }} editors support the following `DataAnnotation` attributes:

- `DataTypeAttribute`
- `EmailAddress`
- `MaxLengthAttribute`
- `MinLengthAttribute`
- `Range`
- `RegularExpression`
- `Required`
- `StringLength`
- `UrlAttribute`
- `ReadOnly`

The `HTML5` <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*" target="_blank">`data-*` attributes</a> are generated in the HTML markup of each editor component based on the `DataAnnotation` attributes applied to the Model properties. To enable the client-side validation, the <a href="https://docs.telerik.com/kendo-ui/controls/validator/overview" target="_blank">Kendo UI for jQuery Validator</a> must be activated on the form that contains the editor components. The Validator automatically creates <a href="https://docs.telerik.com/kendo-ui/controls/validator/rules" target="_blank">validation rules</a> based on the unobtrusive HTML attributes. Also, the Validator creates rules for the unobtrusive attributes that are generated implicitly by {{ site.framework }} for numbers and dates.

>The `ReadOnly` attribute will not generate a `data-*` attribute or create an internal validator rule, but the respective DOM input element will contain a [`readonly` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/readonly).

The following example demonstrates how to enable the Kendo UI Validator to perform client-side validation based on the applied `DataAnnotation` attributes.

1. Create a Model and set the desired `DataAnnotation` attributes.

    ```C#
        public class OrderViewModel
        {
            [HiddenInput(DisplayValue = false)]
            public int OrderID { get; set; }

            [Required]
            [Display(Name = "Customer")]
            public string CustomerID { get; set; }

            [Required]
            [StringLength(15)]
            [Display(Name = "Ship Country")]
            public string ShipCountry { get; set; }

            [Required]
            [Range(1, int.MaxValue, ErrorMessage = "Freight should be greater than 1")]
            [DataType(DataType.Currency)]
            public decimal? Freight { get; set; }

            [Required]
            [Display(Name = "Order Date")]
            public DateTime? OrderDate { get; set; }

            [ReadOnly(true)]
            public string ShipCountry { get; set; }
        }
    ```

1. Pass an instance of the Model to the View.

    {% if site.core %}
    ```C#
        public IActionResult Create()
        {
            return View(new OrderViewModel());
        }
    ```
    {% else %}
    ```C#
        public ActionResult Create()
        {
            return View(new OrderViewModel());
        }
    ```
    {% endif %}

{% if site.core %}
1. Create the editors in the View based on the Model properties and initialize the Validator on the form by setting `kendo-validator="true"` in the form's tag.

    ```HtmlHelper
        @addTagHelper *, Kendo.Mvc
        @model OrderViewModel

        <form id="exampleForm" asp-controller="Home" asp-action="Create" method="post" class="k-form k-form-vertical" kendo-validator="true">
            <fieldset>
                <legend>Order</legend>

                @Html.HiddenFor(model => model.OrderID)

                <div class="editor-label">
                    @Html.LabelFor(model => model.CustomerID)
                </div>
                <div class="editor-field">
                    @(Html.Kendo().TextBoxFor(model => model.CustomerID))
                    @Html.ValidationMessageFor(model => model.CustomerID)
                </div>
                <div class="editor-label">
                    @Html.LabelFor(model => model.ShipCountry)
                </div>
                <div class="editor-field">
                    @(Html.DropDownListFor(model => model.ShipCountry)
                        .BindTo(new List<string>() {
                            "Country A",
                            "Country B",
                            "Country C"
                        })
                    )
                    @Html.ValidationMessageFor(model => model.ShipCountry)
                </div>

                <div class="editor-label">
                    @Html.LabelFor(model => model.Freight)
                </div>
                <div class="editor-field">
                    @Html.Kendo().NumericTextBoxFor(model => model.Freight)
                    @Html.ValidationMessageFor(model => model.Freight)
                </div>

                <div class="editor-label">
                    @Html.LabelFor(model => model.OrderDate)
                </div>
                <div class="editor-field">
                    @Html.Kendo().DatePickerFor(model => model.OrderDate)
                    @Html.ValidationMessageFor(model => model.OrderDate)
                </div>
                <p>
                    @(Html.Kendo().Button()
                        .Name("submitBtn")
                        .HtmlAttributes(new { type = "submit" })
                        .Content("Submit")
                    )
                </p>
            </fieldset>
        </form>
    ```
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        @model OrderViewModel

        @{

            var countriesOptions = new List<string>() {
                "Country A",
                "Country B",
                "Country C"
            };
        }

        <form id="exampleForm" asp-controller="Home" asp-action="Create" method="post" class="k-form k-form-vertical" kendo-validator="true">
            <fieldset>
                <legend>Order</legend>

                <input type="hidden" asp-for="OrderID" />

                <div class="editor-label">
                    <label asp-for="CustomerID"></label>
                </div>
                <div class="editor-field">
                    <kendo-textbox for="CustomerID"></kendo-textbox>
                    <span asp-validation-for="CustomerID"></span>
                </div>
                <div class="editor-label">
                    <label asp-for="ShipCountry"></label>
                </div>
                <div class="editor-field">
                    <kendo-dropdownlist for="ShipCountry"
                        bind-to="countriesOptions">
                    </kendo-dropdownlist>
                    <span asp-validation-for="ShipCountry"></span>
                </div>

                <div class="editor-label">
                    <label asp-for="Freight"></label>
                </div>
                <div class="editor-field">
                    <kendo-numerictextbox for="Freight"></kendo-numerictextbox>
                    <span asp-validation-for="Freight"></span>
                </div>

                <div class="editor-label">
                    <label asp-for="OrderDate"></label>
                </div>
                <div class="editor-field">
                    <kendo-datepicker for="OrderDate"
                        date-input="true">
                    </kendo-datepicker>
                    <span asp-validation-for="OrderDate"></span>
                </div>
                <p>
                    <button class="k-button k-button-primary" type="submit">Submit</button>
                </p>
            </fieldset>
        </form>
    ```

    Alternatively, you can initialize the Validator with jQuery when the page with the form is loaded:

    ```
        @model OrderViewModel

        <form id="exampleForm" asp-controller="Home" asp-action="Create" method="post" class="k-form k-form-vertical">
            ...
        </form>

        <script>
         $(document).ready(function() {
             $("#exampleForm").kendoValidator(); // Select the form by "id" or "class" with jQuery.
         });
        </script>
    ```
{% else %}

1. Create the editors in the View based on the Model properties and initialize the Validator on the form with jQuery when the page with the form is loaded:

    ```
    @model OrderViewModel

    @using (Html.BeginForm()) {
        <fieldset>
            <legend>Order</legend>

            @Html.HiddenFor(model => model.OrderID)

            <div class="editor-label">
                @Html.LabelFor(model => model.CustomerID)
            </div>
            <div class="editor-field">
                @(Html.Kendo().TextBoxFor(model => model.CustomerID))
                @Html.ValidationMessageFor(model => model.CustomerID)
            </div>
            <div class="editor-label">
                @Html.LabelFor(model => model.ShipCountry)
            </div>
            <div class="editor-field">
                @(Html.DropDownListFor(model => model.ShipCountry)
                    .BindTo(new List<string>() {
                        "Country A",
                        "Country B",
                        "Country C"
                    })
                )
                @Html.ValidationMessageFor(model => model.ShipCountry)
            </div>

            <div class="editor-label">
                @Html.LabelFor(model => model.Freight)
            </div>
            <div class="editor-field">
                @Html.Kendo().NumericTextBoxFor(model => model.Freight)
                @Html.ValidationMessageFor(model => model.Freight)
            </div>

            <div class="editor-label">
                @Html.LabelFor(model => model.OrderDate)
            </div>
            <div class="editor-field">
                @Html.Kendo().DatePickerFor(model => model.OrderDate)
                @Html.ValidationMessageFor(model => model.OrderDate)
            </div>

            <p>
                <input type="submit" value="Save" />
            </p>
        </fieldset>
    }

    <script>
        $(function () {
            $("form").kendoValidator(); // Select the form with jQuery.
        });
    </script>
    ```
{% endif %}

For a live example, visit the [Basic Usage demo of the Validator](https://demos.telerik.com/{{ site.platform }}/validator).

## Implementing Custom Attributes

To use <a href="https://learn.microsoft.com/en-us/previous-versions/aspnet/cc668224(v=vs.100)" target="_blank">custom `DataAnnotation` attributes</a>, <a href="https://docs.telerik.com/kendo-ui/controls/validator/rules#custom-rules" target="_blank">define the custom rules</a> when initializing the Validator.

For example, you can implement a `GreaterDateAttribute` attribute to check whether the selected `ShippedDate` value is greater than the selected `OrderDate`.

{% if site.mvc %}
1. Create a `class` that inherits from the `ValidationAttribute` class and implements the `IClientValidatable` interface. Add the `IsValid` and `GetClientValidationRules` methods.

    ```C#
        [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
        public class GreaterDateAttribute : ValidationAttribute, IClientValidatable
        {
            public string EarlierDateField { get; set; }

            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                DateTime? date = value != null ? (DateTime?)value : null;
                var earlierDateValue = validationContext.ObjectType.GetProperty(EarlierDateField)
                    .GetValue(validationContext.ObjectInstance, null);
                DateTime? earlierDate = earlierDateValue != null ? (DateTime?)earlierDateValue : null;

                if (date.HasValue && earlierDate.HasValue && date <= earlierDate)
                {
                    return new ValidationResult(ErrorMessage);
                }

                return ValidationResult.Success;
            }

            public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ModelMetadata metadata, ControllerContext context)
            {
                var rule = new ModelClientValidationRule
                {
                    ErrorMessage = ErrorMessage,
                    ValidationType = "greaterdate"
                };

                rule.ValidationParameters["earlierdate"] = EarlierDateField;

                yield return rule;
            }
        }
    ```
{% else %}
1. Create a `class` that inherits from the `ValidationAttribute` class and implements the `IClientModelValidator` interface. Add the `IsValid` and `AddValidation` methods.

    ```C#
        [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
        public class GreaterDateAttribute : ValidationAttribute, IClientModelValidator
        {
            public string EarlierDateField { get; set; }

            protected override ValidationResult IsValid(object value, ValidationContext validationContext)
            {
                DateTime? date = value != null ? (DateTime?)value : null;
                var earlierDateValue = validationContext.ObjectType.GetProperty(EarlierDateField)
                    .GetValue(validationContext.ObjectInstance, null);
                DateTime? earlierDate = earlierDateValue != null ? (DateTime?)earlierDateValue : null;

                if (date.HasValue && earlierDate.HasValue && date <= earlierDate)
                {
                    return new ValidationResult(ErrorMessage);
                }

                return ValidationResult.Success;
            }

            public void AddValidation(ClientModelValidationContext context)
            {
                MergeAttribute(context.Attributes, "data-val", "true");
                var errorMessage = FormatErrorMessage(context.ModelMetadata.GetDisplayName());
                MergeAttribute(context.Attributes, "data-val-greaterdate", errorMessage);

                context.Attributes["earlierdate"] = EarlierDateField;
            }

            // Helper method
            private bool MergeAttribute(IDictionary<string, string> attributes, string key, string value)
            {
                if (attributes.ContainsKey(key))
                {
                    return false;
                }
                attributes.Add(key, value);
                return true;
            }
        }
    ```
{% endif %}
1. Decorate the `ShippedDate` property with the newly implemented attribute.

    ```C#
        public class OrderViewModel
        {
            // Omitted for brevity.

            [Display(Name = "Order Date")]
            [DataType(DataType.Date)]
            public DateTime? OrderDate { get; set; }

            [GreaterDate(EarlierDateField = "OrderDate", ErrorMessage = "Shipped date should be after Order date")]
            [DataType(DataType.Date)]
            public DateTime? ShippedDate { get; set; }
        }
    ```

1. Implement the custom Validator rule to handle all inputs with the `data-val-greaterdate` attribute.

    {% if site.core %}
    ```HtmlHelper
        @model OrderViewModel

        <form id="exampleForm" asp-controller="Home" asp-action="Create" method="post" class="k-form k-form-vertical">
            <fieldset>
                <legend>Order</legend>
                @Html.HiddenFor(model => model.OrderID)
                <div class="editor-label">
                    @Html.LabelFor(model => model.OrderDate)
                </div>
                <div class="editor-field">
                    @Html.Kendo().DatePickerFor(model => model.OrderDate)
                    @Html.ValidationMessageFor(model => model.OrderDate)
                </div>
                <div class="editor-label">
                    @Html.LabelFor(model => model.ShippedDate)
                </div>
                <div class="editor-field">
                    @Html.Kendo().DatePickerFor(model => model.ShippedDate)
                    @Html.ValidationMessageFor(model => model.ShippedDate)
                </div>
                <p>
                    @(Html.Kendo().Button()
                        .Name("submitBtn")
                        .HtmlAttributes(new { type = "submit" })
                        .Content("Submit")
                    )
                </p>
            </fieldset>
        </form>
    ```
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        @model OrderViewModel

        <form id="exampleForm" asp-controller="Home" asp-action="Create" method="post" class="k-form k-form-vertical">
            <fieldset>
                <legend>Order</legend>
                <input type="hidden" asp-for="OrderID" />
                <div class="editor-label">
                    <label asp-for="OrderDate"></label>
                </div>
                <div class="editor-field">
                    <kendo-datepicker for="OrderDate" >
                    </kendo-datepicker>
                    <span asp-validation-for="OrderDate"></span>
                </div>
                <div class="editor-label">
                    <label asp-for="ShippedDate"></label>
                </div>
                <div class="editor-field">
                    <kendo-datepicker for="ShippedDate" >
                    </kendo-datepicker>
                    <span asp-validation-for="ShippedDate"></span>
                </div>
                <p>
                    <button class="k-button k-button-primary" type="submit">Submit</button>
                </p>
            </fieldset>
        </form>
    ```
    ```JS script
        <script>
            $(function () {
                $("#exampleForm").kendoValidator({
                    rules: {
                        greaterdate: function (input) {
                            if (input.is("[data-val-greaterdate]") && input.val() != "") {
                                var date = kendo.parseDate(input.val()),
                                    earlierDate = kendo.parseDate($("[name='" + input.attr("earlierdate") + "']").val());
                                return !date || !earlierDate || earlierDate.getTime() < date.getTime();
                            }
                            return true;
                        }
                    },
                    messages: {
                        greaterdate: function (input) {
                            return input.attr("data-val-greaterdate");
                        }
                    }
                });
            });
        </script>
    ```
    {% else %}
    ```
        @model OrderViewModel

        @using (Html.BeginForm()) {
            <fieldset>
                <legend>Order</legend>

                @Html.HiddenFor(model => model.OrderID)

                <div class="editor-label">
                    @Html.LabelFor(model => model.OrderDate)
                </div>
                <div class="editor-field">
                    @Html.Kendo().DatePickerFor(model => model.OrderDate)
                    @Html.ValidationMessageFor(model => model.OrderDate)
                </div>

                <div class="editor-label">
                    @Html.LabelFor(model => model.ShippedDate)
                </div>
                <div class="editor-field">
                    @Html.Kendo().DatePickerFor(model => model.ShippedDate)
                    @Html.ValidationMessageFor(model => model.ShippedDate)
                </div>
                <p>
                    <input type="submit" value="Save" />
                </p>
            </fieldset>
        }

        <script>
            $(function () {
                $("form").kendoValidator({
                    rules: {
                        greaterdate: function (input) {
                            if (input.is("[data-val-greaterdate]") && input.val() != "") {
                                var date = kendo.parseDate(input.val()),
                                    earlierDate = kendo.parseDate($("[name='" + input.attr("data-val-greaterdate-earlierdate") + "']").val());
                                return !date || !earlierDate || earlierDate.getTime() < date.getTime();
                            }

                            return true;
                        }
                    },
                    messages: {
                        greaterdate: function (input) {
                            return input.attr("data-val-greaterdate");
                        }
                    }
                });
            });
        </script>
    ```
    {% endif %}

1. To trigger the custom serve-side validation employed from the attribute, use the `ModelState.IsValid` property.

    {% if site.core %}
    ```C#
        [HttpPost]
        public IActionResult Submit(OrderViewModel formData)
        {
            if (!ModelState.IsValid)
            {
                // Handle server-side error.
            }

            return View(model);
        }
    ```
    {% else %}
    ```C#
        [HttpPost]
        public ActionResult Submit(OrderViewModel formData)
        {
            if (!ModelState.IsValid)
            {
                // Handle server-side error.
            }

            return View(model);
        }
    ```
    {% endif %}


## Applying Custom Attributes in Editable Helpers

The editable helpers, such as the Grid and ListView, initialize the Validator internally. To specify custom rules, you have to extend the built-in validation rules of the Validator. You can also use this approach to define rules and reuse them in all Views.

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

For a live example, visit the [Custom Validator demo of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom-validation).

## Employing jQuery Validation

To use jQuery for the client-side validation of the Model, follow the steps below:

1. Add the latest version of the <a href="https://www.nuget.org/packages/jQuery.Validation" target="_blank">`jquery.validate`</a> and <a href="http://www.nuget.org/packages/Microsoft.jQuery.Unobtrusive.Validation/" target="_blank">`jquery.validate.unobtrusive`</a> packages to the project.
1. Include the scripts in the View with the editors, which must be validated based on the user input or in the `_Layout.cshtml` file.
1. After registering the scripts, override the default `ignore` setting to enable the validation of the hidden elements&mdash;for example, helpers like the DropDownList and NumericTextBox have a hidden input, which holds the value.

    {% if site.core %}
    ```HTML
        <script src="~/lib/jquery-validation/jquery.validate.min.js"></script>
        <script src="~/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js"></script>
        <script type="text/javascript">
            $.validator.setDefaults({
                ignore: ""
            });
        </script>
    ```
    {% else %}
    ```HTML
        <script src="@Url.Content("~/Scripts/jquery-validation/jquery.validate.min.js")"></script>
        <script src="@Url.Content("~/Scripts/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js")"></script>
        <script type="text/javascript">
            $.validator.setDefaults({
                ignore: ""
            });
        </script>
    ```
    {% endif %}

1. Define the Model and the editors on the View.

## See Also

* [Validating {{ site.product }} Editors (Demo)](https://demos.telerik.com/{{ site.platform }}/validator)
* [Kendo UI for jQuery Validator](https://docs.telerik.com/kendo-ui/controls/validator/overview)
{% if site.core %}
* [Telerik UI for ASP.NET Core Fundamentals]({% slug fundamentals_core %})
{% else %}
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting on Validation]({% slug troubleshooting_validation_aspnetmvc %})
{% endif %}


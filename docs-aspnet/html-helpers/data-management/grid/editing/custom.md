---
title: Custom
page_title: Custom Editing
description: "Get started with the editing functionality of the Telerik UI Grid component for {{ site.framework }} allowing you to manipulate the way the data is presented."
slug: customediting_grid_aspnetcore
position: 5
---

# Custom Editing

The Grid enables you to implement custom column editors and to specify validation rules that apply while the user edits the data.

## Implementing Custom Editors

The steps below will cover the scenario of using a NumericTextBox as a custom editor for a field in the grid.

1. The {{ site.product_short }} Visual Studio Templates come with EditorTemplates which are located in `\Views\Shared\EditorTemplates`. If such a folder is not existent, create one. 

1. Add a cshtml file to the `EditorTemplates` folder and name it `Number`. Specify the field's data type at the top.

    ```HtmlHelper
        @model int?
        
        @(Html.Kendo().NumericTextBoxFor(m => m)
            .HtmlAttributes(new { style = "width:100%" })
        )
    ```

1. In the C# class declaration decorate the needed properties with the `UIHint` data attribute.

    ```Model
        public class OrderViewModel
        {
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            [UIHint("Number")]
            public int? Freight { get; set; }
        }
    ```

For additional use-cases and information refer to the Editor Templates article of the grid:

* [Custom Editor Templates]({% slug editortemplates_grid_aspnetcore %})

## Setting Validation Rules

To define a validation rule on the client-side, extend the Kendo UI for jQuery Validator. The Validator is initialized when an item is in edit mode. For a runnable example, refer to the [demo on custom validator editing in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom-validation).

# ForeignKey Column Editor

To create an editable grid a foreign key:

1. Define a ForeignKey column in the grid.

1. Bind the column to a collection and specify the `DataValueField` and `DataTextField`.

    * Local data binding:

    ```HtmlHelper

        columns.ForeignKey(p => p.CategoryID, (System.Collections.IEnumerable)ViewData["categories"], "CategoryID", "CategoryName");

    ```
    {% if site.core %}
    ```TagHelper

        <foreign-key-column field="CategoryID" title="Category" width="150"
                    values='(System.Collections.IEnumerable)ViewData["categories"]' 
                    value-field="CategoryID" 
                    text-field="CategoryName">
        </foreign-key-column>

    ```
    {% endif %}

    * Remote data binding:

    ```HtmlHelper

        columns.ForeignKey(p => p.CategoryID, ds=> ds.Read(r => r.Action("Categories", "Grid")), "CategoryID", "CategoryName");

    ```
    {% if site.core %}
    ```TagHelper

        <foreign-key-column field="CategoryID" title="Category" width="200" value-field="CategoryID" text-field="CategoryName">
            <datasource>
                <transport>
                    <read url="/grid/categories"/>
                </transport>
            </datasource>
        </foreign-key-column>
        
    ```
    {% endif %}

1. Specify default value for the column in the model of the data source:

    ```HtmlHelper

        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model =>
            {
                model.Id(p => p.ProductID);
                model.Field(p => p.ProductID).Editable(false);
                model.Field(p => p.CategoryID).DefaultValue(1);
            })
            // other options omitted for brevity.
        )

    ```
    {% if site.core %}
    ```TagHelper

            <datasource type="DataSourceTagHelperType.Ajax">
                <schema>
                    <model id="ProductID">
                        <fields>
                            <field name="ProductID" editable="false"></field>
                            <field name="CategoryID" default-value="4"></field>
                        </fields>
                    </model>
                </schema>
            </datasource>

    ```
    {% endif %}

1. Add a cshtml file within the `/Views/Shared/EditorTemplates` folder of your project and name it `GridForeignKey`. If this folder does not exist, add it manually.

1. Set the content of the file to be a DropDownList:

    ```HtmlHelper
        @model object
                
        @(
        Html.Kendo().DropDownListFor(m => m)        
                .BindTo((SelectList)ViewData[ViewData.TemplateInfo.GetFullHtmlFieldName("") + "_Data"])
        )
    ```

For the complete examples, check out our live demos at:

* [ForeignKey with Remote Data Binding](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumn)
* [ForeignKey with Local Data Binding](https://demos.telerik.com/{{ site.platform }}/grid/foreignkeycolumnbinding)

## See Also

* [Custom Editing by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom)
* [Custom Validator Editing by the Grid HtmlHelper for {{ site.framework }}  (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/editing-custom-validation)

---
title: Local Binding
page_title: Local Binding
description: "Get started with the PivotGridV2 for {{ site.framework }} and learn how to bind it to a local data."
slug: htmlhelpers_pivotgridv2_aspnetcore_localbinding
position: 4
---

When configured for local binding, the PivotGridV2 for {{ site.framework }} will serialize the data as part of its data source and will perform all data operations on the client.

To bind the PivotGridV2 for {{ site.framework }} to local flat data:

1. Define a model class or use an existing one from your application.

        public class ProductViewModel
        {
            [ScaffoldColumn(false)]
            public int ProductID
            {
                get;
                set;
            }

            [Required]
            [Display(Name = "Product name")]
            public string ProductName
            {
                get;
                set;
            }

            [Display(Name = "Unit price")]
            [DataType(DataType.Currency)]
            [Range(0, int.MaxValue)]
            public decimal UnitPrice
            {
                get;
                set;
            }

            [Display(Name = "Units in stock")]
            [DataType("Integer")]
            [Range(0, int.MaxValue)]
            public int UnitsInStock
            {
                get;
                set;
            }

            public bool Discontinued
            {
                get;
                set;
            }

            [Display(Name = "Last supply")]
            [DataType(DataType.Date)]
            public DateTime LastSupply
            {
                get;
                set;
            }

            [DataType("Integer")]
            public int UnitsOnOrder
            {
                get;
                set;
            }

            [UIHint("ClientCategory")]
            public CategoryViewModel Category
            {
                get;
                set;
            }

            public int? CategoryID { get; set; }

            public string QuantityPerUnit { get; set; }
        }

1. In the `Index` action return an `IEnumerable` of the model type with the view.

        public ActionResult Index()
        {
            var entities = new SampleEntities();

            var result = entities.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(short),
                QuantityPerUnit = product.QuantityPerUnit,
                Discontinued = product.Discontinued,
                UnitsOnOrder = product.UnitsOnOrder.HasValue ? (int)product.UnitsOnOrder.Value : default(int),
                CategoryID = product.CategoryID,
                Category = new CategoryViewModel()
                {
                    CategoryID = product.Category.CategoryID,
                    CategoryName = product.Category.CategoryName
                },
                LastSupply = DateTime.Today
            }).ToList();

            return View(result);
        }

1. In the `Index.cshtml` view declare the model, an `IEnumerable` of the model type. Declare and configure the PivotGridV2.

    ```HtmlHelper
        @model IEnumerable<MyApplication.Models.ProductViewModel>

        @(Html.Kendo().PivotContainer()
        .Name("container")
        .ConfiguratorPosition("left")
        .Content(@<text>
            @(Html.Kendo().PivotConfiguratorV2()
                .Name("configurator")
                .Sortable()
                .Filterable())

            @(Html.Kendo().PivotGridV2<Kendo.Mvc.Examples.Models.ProductViewModel>()
                .Name("pivotgrid")
                .HtmlAttributes(new { @class = "hidden-on-narrow" })
                .Configurator("#configurator")
                .ColumnWidth(120)
                .Height(570)
                .BindTo(Model)
                .DataSource(dataSource => dataSource
                    .Custom()
                    .Schema(schema => schema
                        .Model(m => m.Field("CategoryName", typeof(string)).From("Category.CategoryName"))
                        .Cube(cube => cube
                            .Dimensions(dimensions =>
                            {
                                dimensions.Add(model => model.ProductName).Caption("All Products");
                                dimensions.Add("CategoryName").Caption("All Categories");
                                dimensions.Add(model => model.Discontinued).Caption("Discontinued");
                            })
                            .Measures(measures =>
                            {
                                measures.Add("Average").Format("{0:c}").Field(model => model.UnitPrice).AggregateName("average");
                                measures.Add("Sum").Format("{0:c}").Field(model => model.UnitPrice).AggregateName("sum");
                            })
                        ))
                    .Columns(columns =>
                    {
                        columns.Add("CategoryName").Expand(true);
                        columns.Add("ProductName");
                    })
                    .Rows(rows => rows.Add("Discontinued").Expand(true))
                    .Measures(measures => measures.Values("Sum"))
                    .Events(e => e.Error("onError"))
                )
            )

            @(Html.Kendo().PivotConfiguratorButton()
                .Name("Button")
                .Configurator("configurator")
            )

        </text>))

        <script>
            function onError(e) {
                alert("error: " + kendo.stringify(e.errors[0]));
            }
        </script>
    ```
     {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        @model IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>

        <kendo-pivotcontainer name="container" configurator-position="left">
            <kendo-pivotconfiguratorv2 name="configurator" sortable="true" filterable="true"></kendo-pivotconfiguratorv2>

            <kendo-pivotgridv2 name="pivotgrid" column-width="200" height="580" configurator="#configurator">
                <pivot-datasource data="@Model" on-error="onError">
                    <schema>
                        <model>
                            <fields>
                                <field name="CategoryName" from="Category.CategoryName"></field>
                            </fields>
                        </model>
                        <cube>
                            <dimensions>
                                <dimension name="ProductName" caption="All Products" />
                                <dimension name="CategoryName" caption="Categories" />
                                <dimension name="Discontinued" caption="Discontinued" />
                            </dimensions>
                            <measures>
                                <measure name="Average" format="{0:c}" field="UnitPrice" aggregate="average" />
                                <measure name="Sum" format="{0:c}" field="UnitPrice" aggregate="sum" />
                            </measures>
                        </cube>
                    </schema>
                    <columns>
                        <pivot-datasource-column name="CategoryName" expand="true"></pivot-datasource-column>
                        <pivot-datasource-column name="ProductName"></pivot-datasource-column>
                    </columns>
                    <rows>
                        <row name="Discontinued" expand="true"></row>
                    </rows>
                    <measures values=@(new string[] {"Sum"} )></measures>
                </pivot-datasource>
            </kendo-pivotgridv2>

            <kendo-pivotconfiguratorbutton name="button" configurator="configurator"></kendo-pivotconfiguratorbutton>
        </kendo-pivotcontainer>

        <script>
            function onError(e) {
                alert("error: " + kendo.stringify(e.errors[0]));
            }
        </script>
    ```
    {% endif %}
    

For a full example, refer to the [PivotGridV2 Local Binding demo](https://demos.telerik.com/{{ site.platform }}/pivotgridv2/local-flat-data-binding).

## Known Limitations

When the PivotGridV2 is bound to a flat data structure, the component processes the data on the client (browser) and creates a client cube representation [(configuration)](https://docs.telerik.com/kendo-ui/api/javascript/data/pivotdatasource/configuration/schema#schemacube). The PivotGridV2 relies on the processing power of the browser to project the data and produce the required categorized data output. The PivotGridV2 does not restrict the maximum amount of data that you can load into it, but there are limitations related to the browser's capability to handle the loaded dataset.

The symptoms for an overloaded browser are:
- The browser is loading extremely slowly or gets unresponsive for a long time.
- The browser is crashing when loading or updating the dimensions/measures.

If you observe any of these symptoms, this means you have hit the processing limit of the browser. To work around this issue, use a dedicated [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) solution like Microsoft [SSAS](https://technet.microsoft.com/en-us/library/ms175609(v=sql.90).aspx).

## See Also

* [OLAP Cube Fundamentals]({% slug htmlhelpers_pivotgridv2_aspnetcore_fundamentals %})
* [OLAP Cube Setup]({% slug htmlhelpers_pivotgridv2_aspnetcore_olap_cube_setup %})
* [PivotConfiguratorV2 JavaScript API Reference](/api/javascript/ui/pivotconfiguratorv2)

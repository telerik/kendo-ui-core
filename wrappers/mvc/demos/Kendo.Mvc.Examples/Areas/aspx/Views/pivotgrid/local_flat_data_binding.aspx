<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>>"%>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().PivotGrid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("pivotgrid")
    .ColumnWidth(120)
    .Height(570)
    .BindTo(Model)
    .DataSource(dataSource => dataSource
        .Ajax()
        .Schema(schema => schema
            .Model(m => m.Field("CategoryName", typeof(string)).From("Category.CategoryName"))
            .Cube(cube => cube
                .Dimensions(dimensions => {
                    dimensions.Add(model => model.ProductName).Caption("All Products");
                    dimensions.Add("CategoryName").Caption("All Categories");
                    dimensions.Add(model => model.Discontinued).Caption("Discontinued");
                })
                .Measures(measures => measures.Add("Sum").Format("{0:c}").Field(model => model.UnitPrice).Aggregate("function(value, state) { return value + state;}"))
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
 %>
<script>
    function onError(e) {
        alert("error: " + kendo.stringify(e.errors[0]));
    }
</script>
</asp:Content>

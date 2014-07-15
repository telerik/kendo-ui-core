<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>"%>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().PivotGrid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
    .Name("pivotgrid")
    .ColumnWidth(120)
    .Height(570)
    .DataSource(dataSource => dataSource
        .Ajax()
        .Transport(transport => transport.Read("Customers_Read", "PivotGrid"))
        .Schema(schema => schema
            .Cube(cube => cube
                .Dimensions(dimensions => {
                    dimensions.Add(model => model.ContactName).Caption("All Contacts");
                    dimensions.Add(model => model.CompanyName).Caption("All Companies");
                    dimensions.Add(model => model.Country).Caption("All Countries");
                    dimensions.Add(model => model.ContactTitle).Caption("All Titles");
                })
                .Measures(measures => measures.Add("Contacts Count").Field(model => model.CustomerID).Aggregate("function(value, state) { return state + 1; }"))
            ))
        .Columns(columns =>
        {
            columns.Add("Country").Expand(true);
            columns.Add("CompanyName");
        })
        .Rows(rows => rows.Add("ContactTitle").Expand(true))
        .Measures(measures => measures.Values("Contacts Count"))
    )
 %>
</asp:Content>

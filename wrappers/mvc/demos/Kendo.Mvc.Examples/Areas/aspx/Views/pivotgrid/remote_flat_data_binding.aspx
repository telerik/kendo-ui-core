<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>"%>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
<style>
    #pivotgrid
    {
        display: inline-block;
        vertical-align: top;
        width: 70%;
    }

    #configurator
    {
        display: inline-block;
        vertical-align: top;
    }
</style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().PivotConfigurator()
    .Name("configurator")
    .Height(570)
%>

<%= Html.Kendo().PivotGrid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
    .Name("pivotgrid")
    .Configurator("#configurator")
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
                .Measures(measures => measures.Add("Contacts Count").Field(model => model.CustomerID).AggregateName("count"))
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
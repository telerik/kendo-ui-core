<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
<style>
    .chart-wrapper {
        margin: 0 0 0 20px;
        width: 466px;
        height: 434px;
        background: url("<%= Url.Content("~/Content/shared/chart-wrapper-small.png") %>") transparent no-repeat 0 0;
    }
                
    .chart-wrapper .k-chart {
        height: 280px;
        padding: 37px;
        width: 390px;
    }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Units sold")
        .Series(series =>
        {
            series
                .Column(new int[] { 20, 40, 45, 30, 50 })
                .Aggregate(ChartSeriesAggregate.Sum);
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Months)
            .Categories(
                DateTime.Parse("2012/05/30"), DateTime.Parse("2012/05/31"),
                DateTime.Parse("2012/06/01"), DateTime.Parse("2012/06/02"),
                DateTime.Parse("2012/06/03")
            )
        )
    %>
</div>
</asp:Content>

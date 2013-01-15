<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%= Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
        .Name("stockChart")
        .Title("The ACME Company")
        .DataSource(ds => ds
            .Read(read => read
                .Action("_StockData", "Financial")
            )
            .ServerOperation(true)
        )
        .DateField("Date")
        .Series(series =>
        {
            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
        })
        .Navigator(nav => nav
            .DataSource(ds => ds
                .Read(read => read
                    .Action("_StockData", "Financial")
                )
            )
            .Series(series =>
            {
                series.Line(s => s.Volume);
            })
            .Select(
                DateTime.Parse("2009/02/05"),
                DateTime.Parse("2011/10/07")
            )
        )
    %>
</asp:Content>
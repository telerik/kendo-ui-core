<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.StockDataPoint>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title("Closing stock prices")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("_StockData", "Scatter_Charts"))
            .Group(group => group.Add(model => model.Symbol))
            .Sort(sort => sort.Add(model => model.Date).Ascending())
        )
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .ScatterLine().Markers(markers => markers.Size(6))
        )
        .Series(series =>
        {
            series.ScatterLine(model => model.Date, model => model.Close);
        })
        .YAxis(y => y
            .Numeric()
            .Labels(labels => labels.Format("${0}").Skip(1))
        )
        .Tooltip(tooltip => tooltip
            .Format("{0:d}, ${1}")
            .Visible(true)
        )
    %>
</div>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.StockDataPoint>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title("Stock Prices")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("_StockData", "Scatter_Charts"))
            .Group(group => group.Add(model => model.Symbol))
            .Sort(sort => sort.Add(model => model.Date).Ascending())
        )
        .Series(series => {
            series.Area(model => model.Close)
                .Name("close")
                .GroupNameTemplate("#= group.value # (#= series.name #)");
        })
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .ValueAxis(axis => axis.Numeric()
            .Labels(labels => labels
                .Format("${0}")
                .Skip(2)
                .Step(2)
            )
        )
        .CategoryAxis(axis => axis
            .Categories(model => model.Date)
            .Labels(labels => labels.Format("MMM"))
        )
    %>
</div>
</asp:Content>

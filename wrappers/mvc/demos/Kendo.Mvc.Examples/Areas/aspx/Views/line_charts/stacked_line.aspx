<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Olympic Medals won by USA")
        .Legend(legend => legend
            .Visible(false)
        )
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .Line()
            .Stack(true)
            .MissingValues(ChartLineMissingValues.Gap)
        )
        .Series(series => {
            series.Line(new double?[] { 40, 32, 34, 36, 45, 33, 34, null, 83, 36, 37, 44, 37, 35, 36, 46 }).Name("Gold Medals").Color("#f3ac32");
            series.Line(new double?[] { 19, 25, 21, 26, 28, 31, 35, null, 60, 31, 34, 32, 24, 40, 38, 29 }).Name("Silver Medals").Color("#b8b8b8");
            series.Line(new double?[] { 17, 17, 16, 28, 34, 30, 25, null, 30, 27, 37, 25, 33, 26, 36, 29 }).Name("Bronze Medals").Color("#bb6e36");
        })
        .CategoryAxis(axis => axis
            .Categories("1952", "1956", "1960", "1964", "1968", "1972", "1976", "1980", "1984", "1988", "1992", "1996", "2000", "2004", "2008", "2012")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Max(180)
            .Line(line => line.Visible(false))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= series.name #: #= value #")
        )
    %>
</div>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
<style> 
    .k-chart {
        height: 280px;
        padding: 37px;
        margin: 0 0 50px 0;
        width: 390px;
    }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header" style="width:170px;">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <input id="typeColumn" name="seriesType"
                    type="radio" value="column" checked="checked" autocomplete="off" />
            <label for="typeColumn">Columns</label>
        </li>
        <li>
            <input id="typeBar" name="seriesType"
                    type="radio" value="bar" autocomplete="off" />
            <label for="typeBar">Bars</label>
        </li>
        <li>
            <input id="typeLine" name="seriesType"
                    type="radio" value="line" autocomplete="off" />
            <label for="typeLine">Lines</label>
        </li>
        <li>
            <input id="stack" type="checkbox" autocomplete="off" checked="checked" />
            <label for="stack">Stacked</label>
        </li>
    </ul>
    <p>
        <strong>refresh()</strong> will be called on each configuration change
    </p>
</div>
<%= Html.Kendo().Chart()
    .Name("chart")
    .Title("Site Visitors Stats /thousands/")
    .Legend(legend => legend
        .Position(ChartLegendPosition.Bottom)
    )
    .SeriesDefaults(seriesDefaults => seriesDefaults
        .Column().Stack(true)
    )
    .Series(series =>
    {
        series.Column(new double[] { 56000, 63000, 74000, 91000, 117000, 138000 }).Name("Total Visits");
        series.Column(new double[] { 52000, 34000, 23000, 48000, 67000, 83000 }).Name("Unique visitors");
    })
    .CategoryAxis(axis => axis
        .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun")
        .MajorGridLines(lines => lines.Visible(false))
    )
    .ValueAxis(axis => axis
        .Numeric()
        .Line(line => line.Visible(false))
    )
    .Tooltip(tooltip => tooltip
        .Visible(true)
        .Format("{0}")
    )
%>
<script>
    $(document).ready(function() {
        $(".configuration").bind("change", refresh);
    });

    function refresh() {
        var chart = $("#chart").data("kendoChart"),
            series = chart.options.series,
            type = $("input[name=seriesType]:checked").val(),
            stack = $("#stack").prop("checked");

        for (var i = 0, length = series.length; i < length; i++) {
            series[i].stack = stack;
            series[i].type = type;
        };

        chart.refresh();
    }
</script>
</asp:Content>

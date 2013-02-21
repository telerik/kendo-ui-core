<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
<style>         
    .k-chart {
        height: 280px;
        padding: 37px;
        width: 590px;
    }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header" style="width:170px;">
    <span class="configHead">Base date unit</span>
    <ul class="options">
        <li>
            <input id="baseUnitAuto" name="baseUnit"
                    type="radio" value="" autocomplete="off" />
            <label for="baseUnitAuto">Automatic (default)</label>
        </li>
        <li>
            <input id="baseUnitYears" name="baseUnit"
                    type="radio" value="years" autocomplete="off" />
            <label for="baseUnitYears">Years</label>
        </li>
        <li>
            <input id="baseUnitMonths" name="baseUnit"
                    type="radio" value="months" autocomplete="off" />
            <label for="baseUnitMonths">Months</label>
        </li>
        <li>
            <input id="baseUnitWeeks" name="baseUnit"
                    type="radio" value="weeks" checked="checked" autocomplete="off" />
            <label for="baseUnitWeeks">Weeks</label>
        </li>
        <li>
            <input id="baseUnitDays" name="baseUnit"
                    type="radio" value="days" autocomplete="off" />
            <label for="baseUnitDays">Days</label>
        </li>
    </ul>
    <span class="configHead">Aggregate function</span>
    <ul class="options">
        <li>
            <input id="aggregateMax" name="aggregate"
                    type="radio" value="max" autocomplete="off" />
            <label for="aggregateMax">Max (default)</label>
        </li>
        <li>
            <input id="aggregateMin" name="aggregate"
                    type="radio" value="min" autocomplete="off" />
            <label for="aggregateMin">Min</label>
        </li>
        <li>
            <input id="aggregateSum" name="aggregate"
                    type="radio" value="sum" autocomplete="off" />
            <label for="aggregateSum">Sum</label>
        </li>
        <li>
            <input id="aggregateAvg" name="aggregate"
                    type="radio" value="avg" checked="checked" autocomplete="off" />
            <label for="aggregateAvg">Avg</label>
        </li>
        <li>
            <input id="aggregateCount" name="aggregate"
                    type="radio" value="count" autocomplete="off" />
            <label for="aggregateCount">Count</label>
        </li>
    </ul>
    <p>Custom aggregate functions are supported.</p>
</div>
<%= Html.Kendo().Chart()
    .Name("chart")
    .Title("Units sold")
    .Series(series =>
    {
        series
            .Line(new int[] { 30, 50, 45, 40, 35, 40, 42, 40, 35, 43, 38, 30, 48, 50, 55, 35, 30 })
            .Aggregate(ChartSeriesAggregate.Avg);
    })
    .CategoryAxis(axis => axis
        .Date()
        .BaseUnit(ChartAxisBaseUnit.Weeks)
        .Categories(
            DateTime.Parse("2011/12/20"), DateTime.Parse("2011/12/21"),
            DateTime.Parse("2011/12/22"), DateTime.Parse("2011/12/23"),
            DateTime.Parse("2011/12/24"), DateTime.Parse("2011/12/25"),
            DateTime.Parse("2011/12/26"), DateTime.Parse("2011/12/27"),
            DateTime.Parse("2011/12/28"), DateTime.Parse("2011/12/29"),
            DateTime.Parse("2011/12/30"), DateTime.Parse("2011/12/31"),
            DateTime.Parse("2012/01/01"), DateTime.Parse("2012/01/02"),
            DateTime.Parse("2012/01/03"), DateTime.Parse("2012/01/04"),
            DateTime.Parse("2012/01/05")
        )
    )
%>
<script>
    $(document).ready(function() {
        $(".configuration").bind("change", refresh);
    });

    function refresh() {
        var chart = $("#chart").data("kendoChart"),
            series = chart.options.series,
            categoryAxis = chart.options.categoryAxis,
            baseUnitInputs = $("input:radio[name=baseUnit]"),
            aggregateInputs = $("input:radio[name=aggregate]");

        for (var i = 0, length = series.length; i < length; i++) {
            series[i].aggregate = aggregateInputs.filter(":checked").val();
        }

        categoryAxis.baseUnit = baseUnitInputs.filter(":checked").val();

        chart.refresh();
    }
</script>
</asp:Content>

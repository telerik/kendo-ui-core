<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        .chart-wrapper {
            margin: auto;
            width: 466px;
            height: 434px;
            background: url("<%= Url.Content("~/Content/dataviz/shared/chart-wrapper-small.png") %>") transparent no-repeat 0 0;
        }
                
        .chart-wrapper .k-chart {
            height: 280px;
            padding: 37px;
            width: 390px;
        }
    </style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header" style="width:170px;">
    <span class="configHead">Configuration</span>
    <span class="configTitle">Pie Chart</span>
    <ul class="options">
        <li>
            <input id="labels" checked="checked" type="checkbox" autocomplete="off" />
            <label for="labels">Show labels</label>
        </li>
        <li>
            <input id="alignCircle" name="alignType" type="radio"
                    value="circle" checked="checked" autocomplete="off" />
            <label for="alignCircle">- aligned in circle</label>
        </li>
        <li>
            <input id="alignColumn" name="alignType" type="radio"
                    value="column" autocomplete="off" />
            <label for="alignColumn">- aligned in columns</label>
        </li>
    </ul>
</div>

<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Internet Users in United States")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Series(series =>
        {
            series.Pie(new dynamic[] {
                new { category = "2005", value = 67.96 },
                new { category = "2006", value = 68.93 },
                new { category = "2007", value = 75 }, 
                new { category = "2008", value = 74 }, 
                new { category = "2009", value = 78 }                 
            })
            .Labels(labels => labels
                .Visible(true)
                .Template("#= kendo.format('{0:P}', percentage)#")
            );
        })
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= kendo.format('{0:P}', percentage)#")
        )
    %>
</div>

<script>
    $(document).ready(function() {
        $(".configuration").bind("change", refresh);
    });

    function refresh() {
        var chart = $("#chart").data("kendoChart"),
            pieSeries = chart.options.series[0],
            labels = $("#labels").prop("checked"),
            alignInputs = $("input[name='alignType']"),
            alignLabels = alignInputs.filter(":checked").val();

        chart.options.transitions = false;
        pieSeries.labels.visible = labels;
        pieSeries.labels.align = alignLabels;

        alignInputs.attr("disabled", !labels);

        chart.refresh();
    }
</script>
</asp:Content>

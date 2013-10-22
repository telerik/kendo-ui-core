<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Charge current vs. charge time")
        .Legend(legend => legend
            .Visible(true)
        )
        .SeriesDefaults(seriesDefaults =>
            seriesDefaults.ScatterLine().Style(ChartScatterLineStyle.Normal)
        )
        .Series(series => {
            series.ScatterLine(new int[][] {
                    new [] {10, 10}, new [] {15, 20}, new [] {20, 25},
                    new [] {32, 40}, new [] {43, 50}, new [] {55, 60},
                    new [] {60, 70}, new [] {70, 80}, new [] {90, 100}
                })
                .Name("0.8C");
            
            series.ScatterLine(new int[][] {
                    new [] {10, 40}, new [] {17, 50}, new [] {18, 70},
                    new [] {35, 90}, new [] {47, 95}, new [] {60, 100}
                })
                .Name("1.6C");

            series.ScatterLine(new int[][] {
                    new [] {10, 70}, new [] {13, 90}, new [] {25, 100}
                })
                .Name("3.1C");
        })
        .XAxis(x => x
            .Numeric()
            .Title(title => title.Text("Time"))
            .Labels(labels => labels.Format("{0}m")).Max(90)
        )
        .YAxis(y => y
            .Numeric()
            .Title(title => title.Text("Charge"))
            .Labels(labels => labels.Format("{0}%")).Max(100)
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{1}% in {0} minutes")
        )
    %> 
</div>

<div class="configuration-horizontal">
    <div class="config-section">
        <span class="configHead">Style</span>
        <ul class="options">
            <li>
                <%=
                    Html.Kendo().DropDownList()
                        .Name("style")
                        .Items(items =>
                        {
                            items.Add().Text("Normal").Value("normal");                            
                            items.Add().Text("Smooth").Value("smooth");
                        })
                        .DataTextField("Text")
                        .DataValueField("Value")
                        .Events(events=> events.Change("onStyleChange"))
                 %>
            </li>
        </ul>
    </div>
</div>

<script>
    function onStyleChange() {
        var chart = $("#chart").data("kendoChart");
        chart.setOptions({
            seriesDefaults: {
                type: "scatterLine",
                style: this.value()
            }
        });
    }
</script>

<style scoped>
    .chart-wrapper, .chart-wrapper .k-chart {
        height: 300px;
    }
</style>

</asp:Content>

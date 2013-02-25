<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        .history {
            border-collapse: collapse;
            width: 100%;
        }
        .history td.chart {
            width: 430px;
        }
        .history .k-chart {
            height: 65px;
            width: 400px;
        }
        .history td.item {
            line-height: 65px;
            width: 20px;
            text-align: right;
            padding-bottom: 22px;
        }
        .chart-wrapper  {
            width: 450px;
            height: 350px;    
        }
    </style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div class="chart-wrapper">
        <table class="history">
            <tr>
                <td class="item">mmHg</td>
                <td class="chart">
                    <%= Html.Kendo().Chart()
                            .Name("chart-mmHg")
                            .Legend(legend => legend
                                .Visible(false)
                            )
                            .Series(series => {
                                series.Bullet(new double[][] { new double[] { 750, 762.5 }});
                            })
                            .ChartArea(chartArea => chartArea.Margin(0))
                            .CategoryAxis(axis => axis
                                .MajorGridLines(lines => lines.Visible(false))
                                .MajorTicks(lines => lines.Visible(false))
                            )
                            .ValueAxis(axis => axis
                                .Numeric()
                                .Min(715)
                                .Max(795)
                                .MinorTicks(lines => lines.Visible(true))
                                .MajorGridLines(lines => lines.Visible(false))
                                .PlotBands(bands => {
                                    bands.Add().From(715).To(752).Color("#ccc").Opacity(0.6);
                                    bands.Add().From(752).To(772).Color("#ccc").Opacity(0.3);
                                })
                            )
                            .Tooltip(tooltip => tooltip
                                .Visible(true)
                                .Shared(true)
                                .Template("Maximum: #= value.target # <br /> Average: #= value.current #")
                            )
                    %>
                </td>
            </tr>
            <tr>
                <td class="item">hPa</td>
                <td class="chart">
                    <%= Html.Kendo().Chart()
                            .Name("chart-hPa")
                            .Legend(legend => legend
                                .Visible(false)
                            )
                            .Series(series => {
                                series.Bullet(new double[][] { new double[] { 1001, 1017 }});
                            })
                            .ChartArea(chartArea => chartArea.Margin(0))
                            .CategoryAxis(axis => axis
                                .MajorGridLines(lines => lines.Visible(false))
                                .MajorTicks(lines => lines.Visible(false))
                            )
                            .ValueAxis(axis => axis
                                .Numeric()
                                .Min(955)
                                .Max(1055)
                                .MinorTicks(lines => lines.Visible(true))
                                .MajorGridLines(lines => lines.Visible(false))
                                .PlotBands(bands => {
                                    bands.Add().From(955).To(1002).Color("#ccc").Opacity(0.6);
                                    bands.Add().From(1002).To(1027).Color("#ccc").Opacity(0.3);
                                })
                            )
                            .Tooltip(tooltip => tooltip
                                .Visible(true)
                                .Shared(true)
                                .Template("Maximum: #= value.target # <br /> Average: #= value.current #")
                            )
                    %>
                </td>
            <tr>
                <td class="item">hum</td>
                <td class="chart">
                    <%= Html.Kendo().Chart()
                            .Name("chart-hum")
                            .Legend(legend => legend
                                .Visible(false)
                            )
                            .Series(series => {
                                series.Bullet(new double[][] { new double[] { 45, 60 }});
                            })
                            .ChartArea(chartArea => chartArea.Margin(0))
                            .CategoryAxis(axis => axis
                                .MajorGridLines(lines => lines.Visible(false))
                                .MajorTicks(lines => lines.Visible(false))
                            )
                            .ValueAxis(axis => axis
                                .Numeric()
                                .Min(0)
                                .Max(100)
                                .MinorTicks(lines => lines.Visible(true))
                                .MajorGridLines(lines => lines.Visible(false))
                                .PlotBands(bands => {
                                    bands.Add().From(0).To(33).Color("#ccc").Opacity(0.6);
                                    bands.Add().From(33).To(66).Color("#ccc").Opacity(0.3);
                                })
                            )
                            .Tooltip(tooltip => tooltip
                                .Visible(true)
                                .Shared(true)
                                .Template("Maximum: #= value.target # <br /> Average: #= value.current #")
                            )
                    %>
                </td>
            </tr>
            <tr>
                <td class="item">temp</td>
                <td class="chart">
                    <%= Html.Kendo().Chart()
                            .Name("chart-temp")
                            .Legend(legend => legend
                                .Visible(false)
                            )
                            .Series(series => {
                                series.Bullet(new double[][] { new double[] { 25, 22 }});
                            })
                            .ChartArea(chartArea => chartArea.Margin(0))
                            .CategoryAxis(axis => axis
                                .MajorGridLines(lines => lines.Visible(false))
                                .MajorTicks(lines => lines.Visible(false))
                            )
                            .ValueAxis(axis => axis
                                .Numeric()
                                .Min(0)
                                .Max(30)
                                .MinorTicks(lines => lines.Visible(true))
                                .MajorGridLines(lines => lines.Visible(false))
                                .PlotBands(bands => {
                                    bands.Add().From(0).To(10).Color("yellow").Opacity(0.3);
                                    bands.Add().From(10).To(20).Color("orange").Opacity(0.3);
                                    bands.Add().From(20).To(30).Color("red").Opacity(0.3);
                                })
                            )
                            .Tooltip(tooltip => tooltip
                                .Visible(true)
                                .Shared(true)
                                .Template("Maximum: #= value.target # <br /> Average: #= value.current #")
                            )
                     %>
                </td>
            </tr>
        </table>
    </div>
</asp:Content>
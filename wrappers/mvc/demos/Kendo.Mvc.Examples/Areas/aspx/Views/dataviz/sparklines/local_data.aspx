<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IList<Kendo.Mvc.Examples.Models.CompensationStats>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <table id="stats" class="stats">
        <thead>
            <tr>
                <th class="year">Year</th>
                <th class="hourly">Compensation costs</th>
                <th class="change">Annual change %</th>
                <th class="direct">Direct Pay</th>
                <th class="benefits">Benefit components</th>
            </tr>
        </thead>
        <tbody>
<%
for (var i = 0; i < Model.Count; i++) {
    var row = Model[i];
%>
        <tr class="rows">
            <td class="year"><%= row.Year %></td>
            <td class="hourly">
                <%= Html.Kendo().Sparkline()
                        .Name("bar-hourly-" + i)
                        .Type(SparklineType.Bar)
                        .Data(row.Hourly)
                        .ValueAxis(axis => axis.Numeric().Max(50))
                        .ChartArea(area => area.Background("transparent"))
                        .HtmlAttributes(new { style = "width: 130px"  })
                %>
            </td>
            <td class="change">
                <%= Html.Kendo().Sparkline()
                        .Name("bar-change-" + i)
                        .Series(series => series
                                .Bar(new double[] { row.Change }).NegativeColor("#808080")
                        )
                        .ValueAxis(axis => axis.Numeric().Min(-40).Max(40))
                        .CategoryAxis(axis => axis
                            .MajorTicks(ticks => ticks.Visible(false))
                            .Visible(true)
                        )
                        .ChartArea(area => area.Background("transparent"))
                        .HtmlAttributes(new { style = "width: 130px" })
                %>
            </td>
            <td class="direct">
                <%= Html.Kendo().Sparkline()
                        .Name("bar-direct-" + i)
                        .Type(SparklineType.Bar)
                        .Data(row.Direct)
                        .ValueAxis(axis => axis.Numeric().Max(50))
                        .ChartArea(area => area.Background("transparent"))
                        .HtmlAttributes(new { style = "width: 130px" })
                    %>
            </td>
            <td class="benefits">
                <%= Html.Kendo().Sparkline(row.Benefits)
                        .Name("bar-benefits-" + i)
                        .DataSource(ds => ds
                            .Group(g => g.Add(benefits => benefits.Type))
                        )
                        .Series(series => series
                            .Bar(benefits => benefits.Value)
                        )
                        .ValueAxis(axis => axis.Numeric().Max(10))
                        .ChartArea(area => area.Background("transparent"))
                        .HtmlAttributes(new { style = "width: 130px"  })
                    %>
            </td>
        </tr>
<%
}
%>
        </tbody>
    </table>
</div>
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        .chart-wrapper {
            padding: 10px 0;
            height: 450px;
        }
        .stats {
            border-collapse: collapse;
            line-height: 2em;
            width: 100%;
            border: 0;
            border-top: 1px solid rgba(128,128,128,.3);
            border-bottom: 1px solid rgba(128,128,128,.3);
        }
        .stats td, .stats th {
            padding: 0 10px;
        }
        .stats th {
            border-bottom: 1px solid rgba(128,128,128,.3);
            text-align: left;
        }
        .stats tr.rows {
            -moz-transition: background .6s;
            -webkit-transition: background .6s;
            transition: background .6s;
        }
        .stats tr.rows:hover {
            -moz-transition: background-color .3s;
            -webkit-transition: background-color .3s;
            transition: background-color .3s;
            background-color: rgba(128,128,128,.2);
        }
        .year {
            width: 40px;
        }
        .stats th.change, .change {
            text-align: center;
            background-color: rgba(128,128,128,.1);
        }
        .title {
            margin: 5px 0 15px;
            text-align: center;
        }
    </style>
</asp:Content>

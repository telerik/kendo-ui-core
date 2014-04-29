<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Polar area")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Series(series =>
        {
            series.PolarArea(new double[][] {
                new double[] {10, 10}, new double[] {30, 20},
                new double[] {50, 30}, new double[] {70, 20},
                new double[] {90, 10}, new double[] {90, 0},
                new double[] {230, 10}, new double[] {235, 20},
                new double[] {240, 30}, new double[] {245, 20},
                new double[] {250, 10}
            });
        })
    %>
</div>
</asp:Content>

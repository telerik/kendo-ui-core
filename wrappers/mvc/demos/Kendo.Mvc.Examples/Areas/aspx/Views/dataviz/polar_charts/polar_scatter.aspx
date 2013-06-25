<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Buck spread")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Series(series =>
        {
            series.PolarScatter(new double[][] {
                new double[] {150, 3}, new double[] {150, 3.1},
                new double[] {152, 3.2}, new double[] {152, 3.1},
                new double[] {151, 3.2}, new double[] {153, 3.3},
                new double[] {149, 3}
            })
            .Name("at 3 ft");

            series.PolarScatter(new double[][] {
                new double[] {270, 5}, new double[] {250, 7},
                new double[] {259, 4}, new double[] {270, 7},
                new double[] {265, 5}, new double[] {250, 7},
                new double[] {263, 8}, new double[] {261, 5}
            })
            .Name("at 7 ft");
        })
        .YAxis(axis => axis.Numeric()
            .Visible(false)
            .Max(10)
        )
    %>
</div>
</asp:Content>

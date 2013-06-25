<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Market Value of Major Banks")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Series(series =>
        {
            series.RadarLine(new double[] {
                    116, 165, 215, 75, 100, 49, 80,
                    116, 108, 90, 67, 76, 91, 255, 120
                })
                .Name("Market value as of 2007");

            series.RadarLine(new double[] {
                    64, 85, 97, 27, 16, 26, 35,
                    32, 26, 17, 10, 7, 19, 5
                })
                .Name("Market value as of 2009");
        })
        .CategoryAxis(axis => axis
            .Categories("Santander", "JP Morgan", "HSBC", "Credit Suisse",
                        "Goldman Sachs", "Morgan Stanley", "Societe Generale", "UBS",
                        "BNP Paribas", "Unicredit", "Credit Agricole", "Deutsche Bank",
                        "Barclays", "Citigroup", "RBS")
        )
        .ValueAxis(axis => axis
            .Numeric()
            .Labels(labels => labels.Format("${0}"))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("${0} bln")
        )
    %>
</div>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
<style>
    #chart {
        background: center no-repeat url('<%= Url.Content("~/Content/shared/world-map.png") %>')
    }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Break-up of Spain Electricity Production for 2008")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Series(series =>
        {
            series.Pie(new dynamic[] {
                new { category = "Hydro", value = 22 },
                new { category = "Solar", value = 2 },
                new { category = "Nuclear", value = 49 }, 
                new { category = "Wind", value = 27 }                
            });
        })
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}%")
        )
    %>
</div>
</asp:Content>

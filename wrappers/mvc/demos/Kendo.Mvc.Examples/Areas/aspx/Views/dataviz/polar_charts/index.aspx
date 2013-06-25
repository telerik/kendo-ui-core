<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Polar plot")
        .Series(series =>
        {
            series.PolarLine(new double[][] {
                new double[] {10, 10}, new double[] {20, 20},
                new double[] {30, 30}, new double[] {40, 40},
                new double[] {60, 50}, new double[] {80, 60},
                new double[] {100, 70}, new double[] {140, 80},
                new double[] {180, 90}, new double[] {240, 100}
            });
        })
    %>
</div>
</asp:Content>

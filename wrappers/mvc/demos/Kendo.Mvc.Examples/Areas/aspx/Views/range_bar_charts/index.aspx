<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Temperatures")
        .Series(series => {
            series.RangeColumn(new double[][] {
                new double[] {5, 11}, new double[] {5, 13}, new double[] {7, 15}, new double[] {10, 19}, new double[] {13, 23}, new double[] {17, 28},
                new double[] {20, 30}, new double[] {20, 30}, new double[] {17, 26}, new double[] {13, 22}, new double[] {9, 16}, new double[] {6, 13}
            }).Labels(labels => labels
                .Visible(true)
                .From(from => from.Template("#=value.from# °C"))
                .To(to => to.Template("#=value.to# °C")));
        })
        .CategoryAxis(axis => axis
            .Categories("Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec")
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("Avg Min Temp : #= value.from # °C <br>" +
                      "Avg Max Temp : #= value.to # °C")
        )
    %>
</div>
</asp:Content>

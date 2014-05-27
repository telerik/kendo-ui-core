<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<int>>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%=Html.Kendo().Chart()
        .Name("chart")
        .Title("Fibonacci sequence")
        .Series(series => {
            series.Column(Model);
        })
        .ValueAxis(axis => axis.Logarithmic()
            .MinorGridLines(minorGridLines => minorGridLines.Visible(true))
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
        )
    %>
</div>
</asp:Content>

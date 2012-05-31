<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.InternetUsers>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title("Internet Users")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .Series(series => {
            series.Line(model => model.Value)
                .Name("United States")
                .Labels(labels => labels.Format("{0}%").Visible(true));
        })
        .CategoryAxis(axis => axis
            .Categories(model => model.Year)
        )
        .ValueAxis(axis => axis.Numeric()
            .Labels(labels => labels.Format("{0}%"))
        )
    %>
</div>
</asp:Content>

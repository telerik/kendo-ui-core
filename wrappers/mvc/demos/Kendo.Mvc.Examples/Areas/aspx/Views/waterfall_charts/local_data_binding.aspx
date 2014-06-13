<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.CashFlowData>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title(title => title
            .Text("Cash flow")
        )
        .Legend(legend => legend
            .Visible(false)
        )
        .Series(series => series
            .Waterfall(
                model => model.Amount,
                model => model.Period,
                model => model.Summary
            )
            .ColorHandler("pointColor")
            .Labels(labels => labels
                .Visible(true).Format("C0").Position(ChartBarLabelsPosition.InsideEnd)
            )
        )
        .ValueAxis(axis => axis.Numeric()
            .Labels(labels => labels.Format("C0"))
        )
    %>
</div>
<script>
    function pointColor(point) {
        var summary = point.dataItem.Summary;
        if (summary) {
            return summary == "total" ? "#555" : "gray";
        }

        if (point.value > 0) {
            return "green";
        } else {
            return "red";
        }
    }
</script>
</asp:Content>

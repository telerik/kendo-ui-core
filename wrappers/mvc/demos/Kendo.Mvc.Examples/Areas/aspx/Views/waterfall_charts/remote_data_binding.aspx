<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
         Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.PriceData>()
        .Name("chart")
        .Title(title => title
            .Text("\"Pocket price\" waterfall")
        )
        .Legend(legend => legend
            .Visible(false)
        )
        .DataSource(ds => ds.Read(read => read.Action("_PriceData", "Waterfall_Charts")))
        .Series(series => series
            .Waterfall(
                model => model.Value,
                model => model.Name,
                model => model.Summary
            )
            .ColorHandler("pointColor")
            .Labels(labels => labels
                .Visible(true).Format("C").Position(ChartBarLabelsPosition.OutsideEnd)
            )
        )
        .ValueAxis(axis => axis.Numeric()
            .Labels(labels => labels.Format("C"))
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

<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.GrandSlam>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
            .Name("chart")
            .Title("Roger Federer Grand Slam tournament performance")
            .Legend(legend => legend
                .Position(ChartLegendPosition.Bottom)
            )
            .Series(series =>
            {
                series.Line(model => model.Win, model => model.Extremum)
                      .Notes(notes => notes.Label(label => label.Position(ChartNoteLabelPosition.Outside)).Position(ChartNotePosition.Bottom))
                      .Name("Wins");
                series.Line(model => model.Loss)
                      .Name("Losses");
            })
            .CategoryAxis(axis => axis
                .Categories(model => model.Year)
                .MajorGridLines(gridLines => gridLines.Visible(false))
            )
            .ValueAxis(axis => axis.Numeric()
                .Line(line => line.Visible(false))
            )
            .Tooltip(tooltip => tooltip.Visible(true).Template("#= series.name #: #= value #"))
    %>
</div>
</asp:Content>

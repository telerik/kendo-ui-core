<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<div class="chart-wrapper">
    <%=
        Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Series(
            srs=>srs.Funnel("Wind","Year")
                .DynamicHeight(false)
                .DynamicSlope(true)
                .Labels(lbl=>lbl.Visible(true).Template("#= category #"))
                    
        )            
        .DataSource(ds =>
            {
                ds.Read(read => read.Action("SpainElectricityProduction", "Funnel_Charts"))                
                    .Sort(sort => sort.Add(model => model.Year).Descending())
                    .ServerOperation(false);
            }
        )
        .Legend(false)
        .Title("Spain windpower electricity production (GWh)")
        .Tooltip(tt=>tt.Visible(true).Template("#= category # - #= value # GWh"))
     %>
</div>

<style scoped>
    .chart-wrapper .k-chart {
        width: 400px;
        margin: 0 auto;
    }
</style>

</asp:Content>
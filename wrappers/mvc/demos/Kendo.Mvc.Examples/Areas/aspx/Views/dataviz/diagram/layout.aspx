<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="diagram-wrapper" style="margin: auto;">
    <%= Html.Kendo().Diagram()
            .Name("diagram")
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("_DiagramTree", "Diagram")).Model(m => m.Children("Items"))
            )
            .Layout(l => l
                .Type(DiagramLayoutType.Tree)
                .Subtype(DiagramLayoutSubtype.Down)
                .HorizontalSeparation(30)
                .VerticalSeparation(20)
            )
            .ShapeDefaults(sd => sd
                .Width(50)
                .Height(50)
            )
    %>
</div>
<div class="configuration k-widget k-header" style="width:170px;">
    <label for="subtype">Layout: </label>
    <%= Html.Kendo().DropDownList()
            .Name("subtype")
            .DataTextField("Text")
            .DataValueField("Value")
            .Events(e => e.Change("subtypeChange"))
            .BindTo(new List<SelectListItem>() {
                new SelectListItem() {
                    Text = "TreeDown",
                    Value = "down"
                },
                new SelectListItem() {
                    Text = "TreeUp",
                    Value = "up"
                },
                new SelectListItem() {
                    Text = "TipoverTree",
                    Value = "tipover"
                }
            })
    %>
</div>
<script>
    function subtypeChange() {
        $("#diagram").getKendoDiagram().layout({
            subtype: this.value(),
            type: "tree",
            horizontalSeparation: 30,
            verticalSeparation: 20
        });
    }
</script>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="treeMap-wrapper" style="margin: auto;">
    <div class="demo-section k-header" style="padding: 1em;">
        <%= Html.Kendo().TreeMap()
                .Name("treeMap")
                .DataSource(dataSource => dataSource
                    .Read(read => read
                        .Action("_PopulationUSA", "TreeMap")
                    )
                    .Model(m => m.Children("Items"))
                )
                .ValueField("Value")
                .TextField("Name")
                .HtmlAttributes(new { style = "height:600px" })
        %>
        <div class="box">
            <div class="box-col">
                <h4>TreeMap rendering types</h4>
                <ul class="options">
                    <li>
                        <input id="typeSquarified" name="type"
                                    type="radio" value="squarified" checked="checked" autocomplete="off" />
                        <label for="typeSquarified">Squarified</label>
                    </li>
                    <li>
                        <input id="typeVertical" name="type"
                                    type="radio" value="vertical" autocomplete="off" />
                        <label for="typeVertical">Vertical(Slice and Dice)</label>
                    </li>
                    <li>
                        <input id="typeHorizontal" name="type"
                                    type="radio" value="horizontal" autocomplete="off" />
                        <label for="typeHorizontal">Horizontal(Slice and Dice)</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function() {
        $(".options").bind("change", refresh);
    });

    function refresh() {
        $("#treeMap").getKendoTreeMap().setOptions({
            type: $("input[name=type]:checked").val()
        });
    }
</script>
</asp:Content>

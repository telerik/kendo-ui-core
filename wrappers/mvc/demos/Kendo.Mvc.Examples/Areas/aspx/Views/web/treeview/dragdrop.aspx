<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <%= Html.Kendo().TreeView()
        .Name("treeview-left")
        .DragAndDrop(true)
        .Items(treeview =>
        {
            treeview.Add().Text("Furniture")
                .Expanded(true)
                .Items(furniture =>
                {
                    furniture.Add().Text("Tables & Chairs");
                    furniture.Add().Text("Sofas");
                    furniture.Add().Text("Occasional Furniture");
                });

            treeview.Add().Text("Decor")
                .Expanded(true)
                .Items(furniture =>
                {
                    furniture.Add().Text("Bed Linen");
                    furniture.Add().Text("Curtains & Blinds");
                    furniture.Add().Text("Carpets");
                });
        })
    %>

    <%= Html.Kendo().TreeView()
        .Name("treeview-right")
        .DragAndDrop(true)
        .Items(treeview =>
        {
            treeview.Add().Text("Storage")
                .Expanded(true)
                .Items(furniture =>
                {
                    furniture.Add().Text("Wall Shelving");
                    furniture.Add().Text("Floor Shelving");
                    furniture.Add().Text("Kids Storage");
                });

            treeview.Add().Text("Lights")
                .Expanded(true)
                .Items(furniture =>
                {
                    furniture.Add().Text("Ceiling");
                    furniture.Add().Text("Table");
                    furniture.Add().Text("Floor");
                });
        })
    %>
</div>

<style scoped>
    #treeview-left,
    #treeview-right
    {
        float: left;
        width: 220px;
    }
    .demo-section {
        width: 500px;
    }
    .demo-section:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>
</asp:Content>
<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<% using (Html.BeginForm("Animation", "TreeView", FormMethod.Post, new { @class = "configuration k-widget k-header" }))
  {%>
    <span class="configHead">Animation Settings</span>
     <ul class="options">
        <li>
            <%= Html.RadioButton("animation", "toggle") %>
            <%= Html.Label("toggle", "toggle animation") %>            
        </li>
        <li>
            <%= Html.RadioButton("animation", "expand") %>
            <%= Html.Label("expand", "expand animation") %>            
        </li>
        <li>
            <%= Html.CheckBox("opacity") %>
            <%= Html.Label("opacity", "animate opacity") %>               
        </li>
    </ul>

    <button class="k-button">Apply</button>
  <% }
%>

<div class="demo-section">
    <%:Html.Kendo().TreeView()
        .Name("treeview")
        .HtmlAttributes(new { style = "width:200px;" })
        .Animation(animation =>
        {
            animation.Expand(open =>
            {
                if (ViewBag.animation == "expand")
                {
                    open.Expand(ExpandDirection.Vertical);
                }

                if (ViewBag.animation == "slide")
                {
                    open.SlideIn(SlideDirection.Down);
                }

                if (ViewBag.opacity)
                {
                    open.Fade(FadeDirection.In);
                }
            });
        })
        .Items(treeview =>
        {
            treeview.Add().Text("Furniture")
                .Items(root =>
                {
                    root.Add().Text("Tables & Chairs");
                    root.Add().Text("Sofas");
                    root.Add().Text("Occasional Furniture");
                    root.Add().Text("Childerns Furniture");
                    root.Add().Text("Beds");
                });

            treeview.Add().Text("Decor")
                .Expanded(true)
                .Items(root =>
                {
                    root.Add().Text("Bed Linen");
                    root.Add().Text("Throws");
                    root.Add().Text("Curtains & Blinds");
                    root.Add().Text("Rugs");
                    root.Add().Text("Carpets");
                });

            treeview.Add().Text("Storage")
                .Items(root =>
                {
                    root.Add().Text("Wall Shelving");
                    root.Add().Text("Kids Storage");
                    root.Add().Text("Baskets");
                    root.Add().Text("Multimedia Storage");
                    root.Add().Text("Floor Shelving");
                    root.Add().Text("Toilet Roll Holders");
                    root.Add().Text("Storage Jars");
                    root.Add().Text("Drawers");
                    root.Add().Text("Boxes");
                });
        })
    %>
</div>

<style scoped>
    .demo-section {
        width: 200px;
    }
</style>
</asp:Content>


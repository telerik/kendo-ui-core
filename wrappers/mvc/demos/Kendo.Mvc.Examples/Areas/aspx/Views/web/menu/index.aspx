<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().Menu()
      .Name("Menu")
      .Items(items =>
      {
          items.Add()
              .Text("Products")
              .Items(children =>
               {
                   children.Add().Text("Furniture")
                           .Items(innerChildren =>
                           {
                               innerChildren.Add().Text("Tables & Chairs");
                               innerChildren.Add().Text("Sofas");
                               innerChildren.Add().Text("Occasional Furniture");
                               innerChildren.Add().Text("Childerns Furniture");
                               innerChildren.Add().Text("Beds");
                           });

                   children.Add().Text("Decor")
                           .Items(innerChildren =>
                           {
                               innerChildren.Add().Text("Bed Linen");
                               innerChildren.Add().Text("Throws");
                               innerChildren.Add().Text("Curtains & Blinds");
                               innerChildren.Add().Text("Rugs");
                               innerChildren.Add().Text("Carpets");
                           });

                   children.Add().Text("Storage")
                           .Items(innerChildren =>
                           {
                               innerChildren.Add().Text("Wall Shelving");
                               innerChildren.Add().Text("Kids Storage");
                               innerChildren.Add().Text("Baskets");
                               innerChildren.Add().Text("Multimedia Storage");
                               innerChildren.Add().Text("Floor Shelving");
                               innerChildren.Add().Text("Toilet Roll Holders");
                               innerChildren.Add().Text("Storage Jars");
                               innerChildren.Add().Text("Drawers");
                               innerChildren.Add().Text("Boxes");
                           });

                   children.Add().Text("Lights")
                           .Items(innerChildren =>
                           {
                               innerChildren.Add().Text("Ceiling");
                               innerChildren.Add().Text("Table");
                               innerChildren.Add().Text("Floor");
                               innerChildren.Add().Text("Shades");
                               innerChildren.Add().Text("Wall Lights");
                               innerChildren.Add().Text("Spotlights");
                               innerChildren.Add().Text("Push Light");
                               innerChildren.Add().Text("String Lights");
                           });
               });

          items.Add().Text("Stores")
               .Content(() => {
               %>
                    <h2>Around the Globe</h2>
                    <ol>
                        <li>United States</li>
                        <li>Europe</li>
                        <li>Canada</li>
                        <li>Australia</li>
                    </ol>
                    <img src='<%= Url.Content("~/Content/web/menu/map.png") %>' alt="Stores Around the Globe" />
                    <button class="k-button">See full list</button>
                <%
                });

          items.Add().Text("Blog");
          items.Add().Text("Company");
          items.Add().Text("Events");
          items.Add().Text("News").Enabled(false);
      })
      .Render();
    %>

<style scoped="scoped">

    #menu h2 {
        font-size: 1em;
        text-transform: uppercase;
        padding: 5px 10px;
    }
    #template img {
        margin: 5px 20px 0 0;
        float: left;
    }
    #template {
        width: 380px;
    }
    #template ol {
        float: left;
        margin: 0;
        padding: 10px 10px 0 10px;
    }
    #template:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    #template .k-button {
        float: left;
        clear: left;
        margin: 5px 0 5px 12px;
    }

</style>
</asp:Content>
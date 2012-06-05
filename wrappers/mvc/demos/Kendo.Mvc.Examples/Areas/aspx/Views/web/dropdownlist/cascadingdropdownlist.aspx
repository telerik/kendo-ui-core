<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<p>
    <label for="categories">Catergories:</label>
    <%= Html.Kendo().DropDownList()
          .Name("categories")
          .OptionLabel("Select category...")
          .DataTextField("CategoryName")
          .DataValueField("CategoryId")
          .DataSource(source => {
               source.Read(read => {
                   read.Action("GetCascadeCategories", "ComboBox");
               });
          })
    %>
</p>
<p>
    <label for="products">Products:</label>
    <%= Html.Kendo().DropDownList()
          .Name("products")
          .OptionLabel("Select product...")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .DataSource(source => {
              source.Read(read =>
              {
                  read.Action("GetCascadeProducts", "ComboBox")
                      .Data("filterProducts");
              })
              .ServerFiltering(true);
          })
          .Enable(false)
          .AutoBind(false)
          .CascadeFrom("categories")
    %>
    <script>
        function filterProducts() {
            return {
                categories: $("#categories").val()
            };
        }
    </script>
</p>
<p>
    <label for="orders">Orders:</label>
    <%= Html.Kendo().DropDownList()
          .Name("orders")
          .OptionLabel("Select order...")
          .DataTextField("ShipCity")
          .DataValueField("OrderID")
          .DataSource(source => {
              source.Read(read =>
              {
                  read.Action("GetCascadeOrders", "ComboBox")
                      .Data("filterOrders");
              })
              .ServerFiltering(true);
          })
          .Enable(false)
          .AutoBind(false)
          .CascadeFrom("products")
    %>
    <script>
        function filterOrders() {
            return {
                products: $("#filterOrders").val()
            };
        }
    </script>
</p>
</asp:Content>
<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h2>View Order Details</h2>
    <p>
        <label for="categories">Catergories:</label>
        <%= Html.Kendo().DropDownList()
              .Name("categories")
              .HtmlAttributes(new { style = "width:300px" })
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
              .HtmlAttributes(new { style = "width:300px" })
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
              .HtmlAttributes(new { style = "width:300px" })
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
</div>
<script>
    $(document).ready(function () {
        var categories = $("#categories").data("kendoDropDownList"),
            products = $("#products").data("kendoDropDownList"),
            orders = $("#orders").data("kendoDropDownList");

        $("#get").click(function () {
            var categoryInfo = "\nCategory: { id: " + categories.value() + ", name: " + categories.text() + " }",
                productInfo = "\nProduct: { id: " + products.value() + ", name: " + products.text() + " }",
                orderInfo = "\nOrder: { id: " + orders.value() + ", name: " + orders.text() + " }";

            alert("Order details:\n" + categoryInfo + productInfo + orderInfo);
        });
    });
</script>
<style scoped>
    .demo-section {
        width: 460px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 30px;
    }
    .demo-section label {
        display: inline-block;
        width: 120px;
        padding-right: 5px;
        text-align: right;
    }
    .demo-section .k-button {
        margin: 20px 0 0 125px;
    }
    .k-readonly
    {
        color: gray;
    }
</style>
</asp:Content>
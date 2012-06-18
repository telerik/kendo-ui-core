<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
    Inherits="System.Web.Mvc.ViewPage<Kendo.Mvc.Examples.Models.HeaderTemplateViewModel>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
 <%using (Html.BeginForm())
  { %>
      <% Html.Kendo().Grid(Model.Products)
            .Name("Grid")
            .Columns(columns =>
            {
                columns.Template(p =>
                { %>
                        <input name="selectedProducts" type="checkbox" title="select product" value="<%:p.ProductID %>" 
                        <% if (Model.SelectedProducts.Any(sp => sp.ProductID == p.ProductID)) { %>
                            checked="checked"
                            <% } %> />
                        <% })
                    .HeaderTemplate(() =>
                    { %>
                        <input id="selectAllProducts" type="checkbox" title="select all"
                            <% if (Model.SelectedProducts.Any()) { %>
                                checked="checked"
                            <% } %> />
                        <% })
                     .Width(50)
                     .HtmlAttributes(new { style = "text-align:center" })
                     .HeaderHtmlAttributes(new { style = "text-align:center" });
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice);
                columns.Bound(p => p.UnitsInStock);
            })
            .Pageable()
            .Render();  
        %>
        <p>
            <button class="k-button">
                Display selected products</button>
        </p>   
  <%}%>

  
<% if (Model.SelectedProducts.Any()) { %>
    <%=Html.Kendo().Grid(Model.SelectedProducts)
         .Name("SelectedProductsGrid")
         .Columns(columns =>
         {
             columns.Bound(p => p.ProductName);
             columns.Bound(p => p.UnitPrice);
             columns.Bound(p => p.UnitsInStock);
         })           
    %>
<%} %>


<script type="text/javascript">
    $(document).ready(function() {    
        $('#selectAllProducts').click(function() {                    
            $("#Grid tbody input:checkbox").attr("checked", this.checked);
        });
    });   
</script>

</asp:Content>

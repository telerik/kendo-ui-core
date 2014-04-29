<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Category>>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().Menu()
      .Name("Menu")
      .BindTo(Model, mappings => 
      {
            mappings.For<Kendo.Mvc.Examples.Models.Category>(binding => binding
                    .ItemDataBound((item, category) =>
                    {
                        item.Text = category.CategoryName;
                    })
                    .Children(category => category.Products));
            mappings.For<Kendo.Mvc.Examples.Models.Product>(binding => binding
                    .ItemDataBound((item, product) =>
                    {
                        item.Text = product.ProductName;
                    }));
      })
%>
</asp:Content>
<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="add-product">
    <div>
        <%= Html.Kendo().NumericTextBox<decimal>()
            .Name("currency")
            .Format("c")
            .Min(0)
            .Max(100)
            .Value(30)
        %>
    </div>
    <div>
        <%= Html.Kendo().NumericTextBox<double>()
            .Name("percentage")
            .Format("p0")
            .Min(0)
            .Max(0.9)
            .Step(0.01)
            .Value(0.05)
        %>
    </div>
    <div>
        <%= Html.Kendo().NumericTextBox<double>()
            .Name("custom")
            .Format("#.00 kg")
            .Value(10)
        %>
    </div>
    <div>
        <%= Html.Kendo().NumericTextBox<double>()
            .Name("numeric")
            .Placeholder("Enter numeric value")
        %>
    </div>
</div>
<style scoped>
    #add-product {
        height: 181px;
        width: 252px;
        margin: 30px auto;
        padding: 64px 0 0 143px;
        background: url('/Content/web/numerictextbox/addProduct.png') transparent no-repeat 0 0;
    }
</style>   

</asp:Content>

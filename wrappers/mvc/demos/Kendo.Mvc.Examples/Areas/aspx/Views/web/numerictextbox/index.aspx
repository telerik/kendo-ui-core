<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<p><label for="currency">Price:</label>
<%= Html.Kendo().NumericTextBox<decimal>()
    .Name("currency")
    .Format("c")
    .Min(0)
    .Max(100)
    .Value(30)
%>
</p>
<p>
<label for="percentage">Discount:</label>
<%= Html.Kendo().NumericTextBox<double>()
    .Name("percentage")
    .Format("p0")
    .Min(0)
    .Max(0.9)
    .Step(0.01)
    .Value(0.05)
%>
</p>
<p>
<label for="custom">Weight:</label>
<%= Html.Kendo().NumericTextBox<double>()
    .Name("custom")
    .Format("#.00 kg")
    .Value(10)
%>
</p>
<p>
<label for="numeric">In stock:</label>
<%= Html.Kendo().NumericTextBox<double>()
    .Name("numeric")
    .Placeholder("Enter numeric value")
%>
</p>

<style scoped="scoped">

label
{
    display:inline-block;
    width:7em;
}

</style>

</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h2>Mask Input </h2>
    <ul id="fieldlist">
        <li>
            <label for="phone_number">Phone number:</label>
            <%= Html.Kendo().MaskedTextBox()
                  .Name("phone_number")
                  .Mask("(999) 000-0000")
                  .Value("555 123 4567")
            %>
        </li>
        <li>
            <label for="credit_card">Credit Card number:</label>
            <%= Html.Kendo().MaskedTextBox()
                  .Name("credit_card")
                  .Mask("0000 0000 0000 0000")
                  .Value("1234 1234 1234 1234")
            %>
        </li>
        <li>
            <label for="ssn">Social security number:</label>
            <%= Html.Kendo().MaskedTextBox()
                  .Name("ssn")
                  .Mask("000-00-0000")
                  .Value("003-12-3456")
            %>
        </li>
        <li>
            <label for="postcode">UK postcode:</label>
            <%= Html.Kendo().MaskedTextBox()
                  .Name("postcode")
                  .Mask("L0L 0LL")
                  .Value("W1N 1AC")
            %>
        </li>
    </ul>
</div>

<style>
    .demo-section {
        width: 300px;
        margin: 35px auto 50px;
        padding: 30px;
    }

    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }

    #fieldlist
    {
        margin:0;
        padding:0;
    }

    #fieldlist li
    {
        list-style:none;
        padding:10px 0;
    }

    #fieldlist label {
        display: inline-block;
        width: 130px;
        margin-right: 5px;
        text-align: right;
    }
</style>

</asp:Content>
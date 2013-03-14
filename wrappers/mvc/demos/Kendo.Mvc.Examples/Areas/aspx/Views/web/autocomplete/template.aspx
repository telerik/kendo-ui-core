<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h2>Customers</h2>
    <%= Html.Kendo().AutoComplete()
      .Name("customers")
      .DataTextField("ContactName")
      .DataSource(source =>
      {
          source.Read(read =>
          {
              read.Action("GetCustomers", "Home");
          });
      })
      .HtmlAttributes(new { style = "width:400px" })
      .Filter("startswith")
      .Height(370)
      .MinLength(1)
      .Template("<img src=\"" + Url.Content("~/Content/web/Customers/") + "${data.CustomerID}.jpg\" alt=\"${data.CustomerID}\" />" +
                        "<dl>" +
                            "<dt>Contact:</dt><dd>${ data.ContactName }</dd>" +
                            "<dt>Company:</dt><dd>${ data.CompanyName }</dd>" +
                        "</dl>")
    %>
    <p>
        Start typing to find a customer.
    </p>
</div>

<style scoped>
    .demo-section {
        width: 400px;
        margin: 35px auto 50px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    #customers-list .k-item {
        overflow: hidden; /* clear floated images */
    }
    #customers-list img {
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        float: left;
        margin: 5px 20px 5px 0px;
    }
    #customers-list h3 {
        margin: 30px 0 10px 0;
        font-size: 2em;
    }
    #customers-list p {
        margin: 0;
    }
</style>
</asp:Content>
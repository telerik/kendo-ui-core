<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h2>Select Customers</h2>
    <%= Html.Kendo().MultiSelect()
          .Name("customers")
          .DataTextField("ContactName")
          .DataValueField("CustomerID")
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("GetCustomers", "Home");
              });
          })
          .Height(300)
          .HtmlAttributes(new { style = "width: 400px" })
          .HeaderTemplate("<div class=\"dropdown-header\">" +
                        "<span class=\"k-widget k-header\">Photo</span>" +
                        "<span class=\"k-widget k-header\">Contact info</span>" +
                    "</div>")
          .ItemTemplate("<span class=\"k-state-default\"><img src=\"" + Url.Content("~/Content/web/Customers/") + "#:data.CustomerID#.jpg\" alt=\"#:data.CustomerID#\" /></span>" +
                    "<span class=\"k-state-default\"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>")
          .TagTemplate("<img class=\"tag-image\" src=\"" + Url.Content("~/Content/web/Customers/") + "#:data.CustomerID#.jpg\" alt=\"#:data.CustomerID#\" />" +
                       "#: data.ContactName #")
    %>
</div>

<div class="demo-section">
    <h2>Information</h2>
    <p>
        Click the MultiSelect to see the customized appearance of the items.
    </p>
</div>

<script>
    $(document).ready(function() {
        var customers = $("#customers").data("kendoMultiSelect");
        customers.wrapper.attr("id", "customers-wrapper");
    });
</script>

<style>
    .dropdown-header {
        font-size: 1.2em;
    }

    .dropdown-header > span {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align: left;
        display: inline-block;
        border-style: solid;
        border-width: 0 0 1px 1px;
        padding: .3em .6em;
        width: 312px;
    }

    .dropdown-header > span:first-child {
        width: 82px;
        border-left-width: 0;
    }

    .demo-section {
        width: 400px;
        margin: 30px auto 50px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    .tag-image {
        width: auto;
        height: 18px;
        margin-right: 5px;
        vertical-align: top;
    }

    #customers-list .k-item > span{
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        border-style: solid;
        border-width: 0 0 1px 1px;
        vertical-align: top;
        min-height: 95px;
        width: 79%;
        padding: .6em 0 0 .6em;
    }

    #customers-list .k-item > span:first-child{
        width: 77px;
        border-left-width: 0;
        padding: .6em 0 0 0;
    }

    #customers-list img {
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        width: 70px;
        height: 70px;
    }

    #customers-list h3 {
        font-size: 1.6em;
        margin: 0;
        padding: 0;
    }

    #customers-list p {
        margin: 0;
        padding: 0;
    }
</style>
</asp:Content>

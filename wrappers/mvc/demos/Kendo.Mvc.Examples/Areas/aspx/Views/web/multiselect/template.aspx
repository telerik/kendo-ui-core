<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header">
    <span class="infoHead">Information</span>
    <p>
        Click the MultiSelect to see the customized appearance of the items.
    </p>
</div>

<div class="demo-section">
    <h3 class="title">Select customers</h3>
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
          .ItemTemplate("<img src=\"" + Url.Content("~/Content/web/Customers/") + "#:data.CustomerID#.jpg\" alt=\"#:data.CustomerID#\" />" +
                        "<h3>#: data.ContactName #</h3>" +
                        "<p>#: data.CompanyName #</p>")
          .TagTemplate("<img class=\"tag-image\" src=\"" + Url.Content("~/Content/web/Customers/") + "#:data.CustomerID#.jpg\" alt=\"#:data.CustomerID#\" />" +
                       "#: data.ContactName #")
    %>
</div>

<script>
    $(document).ready(function() {
        var customers = $("#customers").data("kendoMultiSelect");
        customers.wrapper.attr("id", "customers-wrapper");
    });
</script>

<style scoped>
    .demo-section {
        width: 450px;
        margin-top: 40px;
    }

    .tag-image {
        width: auto;
        height: 1.4em;
        margin-right: 3px;
    }

    #customers-wrapper .k-multiselect-wrap .k-input {
        height: 1.8em;
        line-height: 1.8em;
    }

    #customers-list .k-item {
        overflow: hidden; /* clear floated images */
    }

    #customers-list img {
        -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
        -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
        box-shadow: 0 0 2px rgba(0,0,0,.4);
        float: left;
        margin: 5px 20px 5px 5px;
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

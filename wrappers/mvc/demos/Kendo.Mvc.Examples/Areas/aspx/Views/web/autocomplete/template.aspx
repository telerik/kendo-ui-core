<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header">
    <span class="infoHead">Information</span>
    <p>
        Open the AutoComplete to see the customized appearance of the items.
    </p>
</div>

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
      .Filter("startswith")
      .Height(300)
      .Template("<img src=\"/Content/web/dropdownlist/Customers/${data.CustomerID}.jpg\" alt=\"${data.CustomerID}\" />" +
                        "<dl>" +
                            "<dt>Contact:</dt><dd>${ data.ContactName }</dd>" +
                            "<dt>Company:</dt><dd>${ data.CompanyName }</dd>" +
                        "</dl>")
%>

<script>
    $(document).ready(function() {
        var autocomplete = $("#customers").data("kendoAutoComplete");

        // set width of the drop-down list
        autocomplete.list.width(400);
    });
</script>

<style scoped>
    #customers-list .k-item {
        overflow: hidden; /* clear floated images */
    }

    #customers-list img {
        box-shadow: 0 0 4px rgba(255,255,255,.7);
        float: left;
        margin: 5px;
    }

    #customers-list dl {
        margin-left: 85px;
    }

    #customers-list dt,
    #customers-list dd {
        margin: 0;
        padding: 0;
    }

    #customers-list dt {
        font-weight: bold;
        padding-top: .5em;
    }

    #customers-list dd {
        padding-bottom: .3em;
    }
</style>
</asp:Content>
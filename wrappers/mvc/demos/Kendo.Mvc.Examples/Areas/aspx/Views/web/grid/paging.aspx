<%@ Page Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
         Inherits="System.Web.Mvc.ViewPage<Kendo.Mvc.Examples.Models.PagerViewModel>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<% Html.BeginForm();  %>
    <div class="configuration k-widget k-header" style="max-width:490px;width: 490px;float: none">
        <span class="configHead">The pager should ...</span>
        <ul class="options">
            <li><%: Html.CheckBoxFor(pager => pager.Input)%> <%: Html.LabelFor(m => m.Input, "have an input box for the page number")%></li>
            <li><%: Html.CheckBoxFor(pager => pager.Numeric)%> <%: Html.LabelFor(m => m.Numeric, "have numeric pager")%></li>
            <li><%: Html.CheckBoxFor(pager => pager.Info)%> <%: Html.LabelFor(m => m.Info, "display the current range of items")%></li>
            <li><%: Html.CheckBoxFor(pager => pager.PreviousNext)%> <%: Html.LabelFor(m => m.Info, "display the 'first', 'previous', 'next' and 'last' buttons")%></li>
            <li><%: Html.CheckBoxFor(pager => pager.Refresh)%> <%: Html.LabelFor(m => m.Refresh, "display the 'refresh' button")%></li>
            <li><%: Html.CheckBoxFor(pager => pager.PageSizes)%> <%: Html.LabelFor(m => m.PageSizes, "allow the user to change the page size")%></li>
        </ul>
        <button class="k-button" type="submit">Apply</button>
    </div>
<% Html.EndForm(); %>

<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
      .Name("Grid")
      .Columns(columns =>
      {
          columns.Bound(o => o.OrderID);
          columns.Bound(o => o.ContactName);
          columns.Bound(o => o.ShipAddress);
          columns.Bound(o => o.ShipCountry);
      })
      .Pageable(pager => pager
        .Input(Model.Input)
        .Numeric(Model.Numeric)
        .Info(Model.Info)
        .PreviousNext(Model.PreviousNext)
        .Refresh(Model.Refresh)
        .PageSizes(Model.PageSizes)
      )
      .DataSource(dataSource => dataSource
          .Ajax()
              .Read(read => read.Action("Paging_Orders", "Grid"))
      )
%>
</asp:Content>
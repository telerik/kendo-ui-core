<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Customer>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<% Html.Kendo().Grid(Model)
    .Name("Grid")
    .HtmlAttributes(new { style = "width: 750px" })
    .Columns(columns =>
    {
        columns.Bound(c => c.CustomerID).Title("Picture");
        columns.Bound(c => c.ContactName).Title("Name");
        columns.Bound(c => c.CompanyName);
        columns.Bound(c => c.Country);
        columns.Bound(c => c.Address);
        columns.Bound(c => c.Phone);
    })
    .RowTemplate(customer =>
    {
        %>
        <div class="customer-details">
                <img src='<%= Url.Content("~/Content/web/Customers/" + customer.CustomerID + ".jpg")%>'
                    alt='<%=customer.ContactName%>' />
                <h3 class="k-widget"><%=customer.ContactName%></h3>
                <dl>
                   <dt>Name:</dt><dd><%=customer.ContactName%></dd>
                   <dt>Company:</dt><dd><%=customer.CompanyName%></dd>
                   <dt>Country:</dt><dd><%=customer.Country%></dd>
                </dl>
                <dl >
                   <dt>Address:</dt><dd><%=customer.Address%></dd>
                   <dt>Phone:</dt><dd><%=customer.Phone%></dd>
                </dl>               
            </div>
        <%     
    })
    .Pageable()
    .Sortable()
    .Scrollable()
    .Render();
%>
</asp:Content>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
     <style scoped="scoped">
        .customer-details
        {
            padding:.8em .6em;
            display:inline-block;
        }
        .customer-details
        {
            display:block;
        }
        
        .customer-details:after
        {
            content:"";
            display:block;
            clear:both;
        }
        
        .customer-details dl,
        .customer-details dt,
        .customer-details dd
        {
            margin:0;
            padding:0;
        }
        
        .customer-details img,
        .customer-details h3,
        .customer-details dl        
        {
            float:left;
            clear:none;
            margin:0 14px 0 0;
        }
        .customer-details h3,
        .customer-details dl
        {
            width:200px;
            min-height:115px;
            border-width:0 1px 0 0;
            background-color:transparent;
            color:inherit;
        }
        
        .customer-details h3
        {
            width:90px;
            padding:0;
            font-size:1.5em;
            padding-right:20px;
        }
        
        .customer-details dt
        {
            font-weight:bold;
        }  
    </style>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<p>Uploaded files</p>

<% if (TempData.ContainsKey("UploadedFiles")) { %>
    <div class="t-widget t-upload">
        <ul class="t-upload-files t-reset">
    <% foreach (var attachment in (IEnumerable<string>)TempData["UploadedFiles"])
       { %>
            <li class="t-file"><span class="t-icon t-success"></span><%= attachment%></li>
    <% } %>
        </ul>
    </div>
<% } else {%>
    -- None --
<% } %>

<p><a href='<%=Url.Action("Index", "Upload") %>' class="t-button">Go back</a></p>
</asp:Content>

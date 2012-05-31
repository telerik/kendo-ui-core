<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div class="configuration k-widget k-header">
        <span class="infoHead">Information</span>
        <p>
            The Upload can be used as a drop-in replacement
            for file input elements.
        </p>
        <p>
            This "synchronous" mode does not require
            special handling on the server.
        </p>
    </div>
    <form method="post" action='<%= Url.Action("Submit") %>' style="width:45%">
        <div>
            <%= Html.Kendo().Upload()
                .Name("files")
            %>
            <p>
                <input type="submit" value="Submit" class="k-button" />
            </p>
        </div>
    </form>
</asp:Content>

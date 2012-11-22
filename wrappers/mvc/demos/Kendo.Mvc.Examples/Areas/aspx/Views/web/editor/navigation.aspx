<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().Editor()
      .Name("Editor")
      .HtmlAttributes(new { style = "width: 740px;height:250px" })
      .Value(() =>
           { %>
            &lt;p&gt;
               &lt;img src="http://www.kendoui.com/Image/kendo-logo.png" alt="Editor for ASP.NET MVC logo" style="display:block;margin-left:auto;margin-right:auto;" /&gt;
            &lt;/p&gt;
            &lt;p&gt;
                Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;
                In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
                and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows
                accessibility standards and provides API for content manipulation.
            &lt;/p&gt;
      <% })
      .Render();
%>

<ul id="keyboard-nav" class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            focuses next tool icon
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wide rightAlign">Shift</span>
            +
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            focuses previous tool icon
        </span>
    </li>
</ul>

<style scoped>
    #keyboard-nav
    {
        padding-top: 35px;
    }
</style>

</asp:Content>
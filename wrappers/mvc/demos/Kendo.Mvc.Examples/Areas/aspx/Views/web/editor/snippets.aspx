<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().Editor()
      .Name("editor")
      .HtmlAttributes(new { style = "width: 740px;height:440px" })
      .Tools(tools => tools
        .Clear()
        .Snippets(snippets => snippets
            .Add("Signature", "<p>Regards,<br /> John Doe,<br /><a href='mailto:john.doe@example.com'>john.doe@example.com</a></p>")
            .Add("Kendo online demos", " <a href='http://demos.kendoui.com'>Kendo online demos</a> ")
        )
      )
      .Value(() =>
           { %>
            Put the cursor after this text and use the "Insert HTML" tool.
      <% })
         .Render();
%>

</asp:Content>

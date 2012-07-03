<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().Editor()
      .Name("Editor")
      .HtmlAttributes(new { style = "width: 740px;height:440px" })
      .Tools(tools => tools
        .Clear()
        .FontName(items => items
            .Add("Garamond", "garamond")
            .Add("Verdana", "Verdana")
        )
        .FontSize(items => items
            .Add("12px", "12px")
            .Add("16px", "16px")
        )
        .FormatBlock(items => items
            .Add("Paragraph", "p")
            .Add("Fieldset", "fieldset")
        )
        .CustomTemplate(ct => ct.Template("<label for='templateTool' style='vertical-align:middle;'>Background:</label> <select id='templateTool'><option value=''>none</option><option value='\\#ff9'>yellow</option><option value='\\#dfd'>green</option></select>"))
        .CustomButton(cb => cb.Name("custom").ToolTip("horizontal rule").Exec("execFunction"))
      )
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
            &lt;p&gt;Features include:&lt;/p&gt;
            &lt;ul&gt;
                &lt;li&gt;Text formatting &amp; alignment&lt;/li&gt;
                &lt;li&gt;Bulleted and numbered lists&lt;/li&gt;
                &lt;li&gt;Hyperlink and image dialogs&lt;/li&gt;
                &lt;li&gt;Cross-browser support&lt;/li&gt;
                &lt;li&gt;Identical HTML output across browsers&lt;/li&gt;
                &lt;li&gt;Gracefully degrades to a &lt;code&gt;textarea&lt;/code&gt; when JavaScript is turned off&lt;/li&gt;
            &lt;/ul&gt;
            &lt;p&gt;
                Read &lt;a href="http://www.kendoui.com/documentation/introduction.aspx"&gt;more details&lt;/a&gt; or send us your
                &lt;a href="http://www.kendoui.com/forums.aspx"&gt;feedback&lt;/a&gt;!
            &lt;/p&gt;
      <% })
         .Render();
%>
<script type="text/javascript">

function execFunction(e) {
    var editor = $(this).data("kendoEditor");
    editor.exec("inserthtml", { value: "<hr />" });
}

$(document).ready(function(){
    $("#templateTool").kendoDropDownList({
        change: function(e) {
            $("#Editor").data("kendoEditor").body.style.backgroundColor = e.sender.value();
        }
    });
});

</script>
</asp:Content>
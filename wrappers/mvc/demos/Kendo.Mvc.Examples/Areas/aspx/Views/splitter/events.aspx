<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<% Html.Kendo().Splitter()
      .Name("splitter")
      .HtmlAttributes(new { style = "height: 400px;" })
      .Events(events => events
          .Collapse("collapse")
          .Resize("resize")
          .Expand("expand")
          .ContentLoad("contentLoad")
      )
      .Panes(panes =>
      {
          panes.Add()
              .HtmlAttributes(new { id = "top_pane" })
              .Size("100px")
              .Collapsible(true)
              .Content(() => { %>
                        <p>
                            Top pane
                        </p>
              <% });
    
          panes.Add()
              .HtmlAttributes(new { id = "ajax_pane" })
              .LoadContentFrom(Url.Content("~/Content/web/splitter/ajax/ajaxContent1.html"));
    
          panes.Add()
              .HtmlAttributes(new { id = "bottom_pane" })
              .Collapsible(true)
              .Size("20%")
              .Content(() => { %>
                        <p>
                           Outer splitter : bottom pane
                        </p>
               <% });
      })
      .Render();
%>

<script>
    function resize(e) {
        kendoConsole.log("Resized :: Splitter <b>#" + this.element[0].id + "</b>");
    }

    function expand(e) {
        kendoConsole.log("Expanded :: Pane <b>#" + e.pane.id + "</b> from splitter <b>#" + this.element[0].id + "</b> expanded");
    }

    function collapse(e) {
        kendoConsole.log("Collapsed :: Pane <b>#" + e.pane.id + "</b> from splitter <b>#" + this.element[0].id + "</b> collapsed");
    }

    function contentLoad(e) {
        kendoConsole.log("Content loaded in <b>#"+ e.pane.id +
            "</b> and starts with <b>" + $(e.pane).text().substr(0, 20) + "...</b>");
    }
</script>
<br/>
<div class="console"></div>
</asp:Content>
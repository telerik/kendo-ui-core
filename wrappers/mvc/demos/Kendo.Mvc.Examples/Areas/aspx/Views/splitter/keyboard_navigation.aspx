<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<% Html.Kendo().Splitter()
      .Name("vertical")
      .Orientation(SplitterOrientation.Vertical)
      .Panes(verticalPanes =>
      {
          verticalPanes.Add()
              .HtmlAttributes(new { id = "top-pane" })
              .Scrollable(false)
              .Collapsible(false)
              .Content(() => {
                %>
                <% Html.Kendo().Splitter()
                    .Name("horizontal")
                    .HtmlAttributes(new { style = "height: 100%;" })
                    .Panes(horizontalPanes =>
                    {
                        horizontalPanes.Add()
                            .HtmlAttributes(new { id = "left-pane" })
                            .Size("220px")
                            .Collapsible(true)
                            .Content(() => { %>
                                <div class="pane-content">
                                    <h3>Inner splitter / left pane</h3>
                                    <p>Resizable and collapsible.</p>
                                </div>
                            <% });
    
                        horizontalPanes.Add()
                            .HtmlAttributes(new { id = "center-pane" })
                            .Content(() => { %>
                                <div class="pane-content">
                                    <h3>Inner splitter / center pane</h3>
                                    <p>Resizable only.</p>
                                </div>
                            <% });
    
                        horizontalPanes.Add()
                            .HtmlAttributes(new { id = "right-pane" })
                            .Collapsible(true)
                            .Size("220px")
                            .Content(() => { %>
                                <div class="pane-content">
                                    <h3>Inner splitter / right pane</h3>
                                    <p>Resizable and collapsible.</p>
                                </div>
                            <% });
                    }).Render(); %>
              <% });

          verticalPanes.Add()
              .Size("100px")
              .HtmlAttributes(new { id = "bottom-pane" })
              .Resizable(false)
              .Collapsible(false)
              .Content(() => { %>
                <div class="pane-content">
                    <h3>Outer splitter / bottom pane</h3>
                    <p>Non-resizable and non-collapsible.</p>
                </div>
              <% });
      })
      .Render();
%>

<ul id="keyboard-nav" class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider">Alt</span>
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses first splitbar
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar to the left (if horizontal splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar to the right (if horizontal splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar up (if vertical splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            moves focused splitbar down (if vertical splitter)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            accepts current position of the splitbar
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">esc</span>
        </span>
        <span class="button-descr">
            returns splitbar to its initial position
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            collapses the left pane or expands the right one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            collapses the right pane or expands the left one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            collapses the upper pane or expands the lower one
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">ctrl</span>
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            collapses the lower pane or expands the upper one
        </span>
    </li>
</ul>


<script>
    //focus the widget
    $(document).on("keydown.examples", function (e) {
        if (e.altKey && e.keyCode === 87 /* w */) {
            $("#horizontal").find(".k-splitbar:first").focus();
        }
    });
</script>

<style scoped>
    #vertical {
        height: 200px;
        width: 700px;
        margin: 0 auto;
    }

    #middle-pane { background-color: rgba(60, 70, 80, 0.10); }
    #bottom-pane { background-color: rgba(60, 70, 80, 0.15); }
    #left-pane, #center-pane, #right-pane  { background-color: rgba(60, 70, 80, 0.05); }

    .pane-content {
        padding: 0 10px;
    }

    #keyboard-nav
    {
        padding-top: 35px;
    }

    ul.keyboard-legend li
    {
        margin: 5px 0 15px 5px;
    }

    div.demo-section
    {
        margin: 0px auto;
    }
</style>
</asp:Content>
<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
    Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="configuration k-widget k-header" style="z-index: 10000">
        <span class="configHead">API Functions</span>
        <ul class="options">
            <li>Show at
                <%:Html.Kendo().DropDownList()
                    .Name("selector")
                    .DataTextField("Text")
                    .DataValueField("Value")
                    .BindTo(new [] { 
                        new { Text = "Target 1", Value = 1 },
                        new { Text = "Target 2", Value = 2 }
                    })
                    .Events(events => events.Change("change"))
                %>
            </li>
        </ul>
    </div>
    <div id="tooltip">
        <div id="target1" class="k-group">
            Target 1</div>
        <div id="target2" class="k-group">
            Target 2</div>
    </div>
    <%:Html.Kendo().Tooltip()
        .For("#tooltip")
        .Filter("div")
        .Position(TooltipPosition.Right)
        .AutoHide(false)
        .ShowOn(TooltipShowOnEvent.Click)
        .Content("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
        .Width(300)        
    %>
    <script type="text/javascript">    
        function change() {
            $("#tooltip").data("kendoTooltip").show($("#target" + this.value()));
        }
    </script>
    <style scoped="scoped">
        #target1, #target2
        {
            text-align: center;
            width: 200px;
            white-space: nowrap;
            border-width: 1px;
            border-style: solid;
            padding: 2em;
            margin: 10px;
        }
    </style>
</asp:Content>

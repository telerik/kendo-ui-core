<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("switch-events")        
        .Content(() =>
        {
            %>
            <ul data-role="listview" data-style="inset" data-type="group">
                <li>General Settings
                    <ul>
                        <li>Automatic Update 
                        <%= Html.Kendo().MobileSwitch()
                                .Name("mobile-switch")
                                .Events(events => events.Change("switchChange"))
                        %>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="console"></div>
            <%
        })
        .Render();
%>

<script>
    function switchChange(e) {
        kendoConsole.log("switch value was changed to " + (e.checked ? "checked" : "unchecked"));
    }
</script>

<style scoped>
    .km-root .console {
        background-color: transparent;
        border: 0;
        margin: 1.4em 1em;
        overflow: hidden;
        height: auto;
    }
</style>

</asp:Content>

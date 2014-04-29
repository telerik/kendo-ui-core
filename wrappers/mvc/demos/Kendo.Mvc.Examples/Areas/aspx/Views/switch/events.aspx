<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("switch-events")        
        .Content(() =>
        {
            %>
            <% Html.Kendo().MobileListView().Style("inset").Type("group")
                   .Items(root => root.Add().Text("General Settings")
                       .Items(items => items.Add().Content(() => 
                       { 
                           %>
                            Automatic Update 
                            <%: Html.Kendo().MobileSwitch()
                                    .Name("mobile-switch")
                                    .Events(events => events.Change("switchChange"))
                            %>
                           <%
                       })))
                   .Render();
            %>       
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

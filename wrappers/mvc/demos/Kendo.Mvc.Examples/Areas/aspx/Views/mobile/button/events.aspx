<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("button-events")
        .Layout("examples")
        .Title("Button Events")
        .Content(() =>
        {
            %>                 
            <% Html.Kendo().MobileButton()     
                    .Name("mobile-button1")               
                    .Text("Trigger Event 1")
                    .HtmlAttributes(new { style="display: block; margin: 2em; text-align: center;" })
                    .Events(events => events.Click("logClick"))
                    .Render();
            %>            
            <% Html.Kendo().MobileButton()
                    .Name("mobile-button2")
                    .Text("Trigger Event 2")
                    .HtmlAttributes(new { style = "display: block; margin: 2em; text-align: center;" })
                    .Events(events => events.Click("logClick"))
                    .Render();
            %>            
            <% Html.Kendo().MobileButton() 
                    .Name("mobile-button3")
                    .Text("Trigger Event 3")
                    .HtmlAttributes(new { style = "display: block; margin: 2em; text-align: center;" })
                    .Events(events => events.Click("logClick"))
                    .Render();
            %>
            <div class="console"></div>           
            <%
        })
        .Render();
%>

<script>
    function logClick(e) {
        kendoConsole.log(this.element.prop("id") + " was clicked!");
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

<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("popover")        
        .Title("Tag Us!")
        .Header(() =>
        {
            Html.Kendo().MobileNavBar()                                   
            .Content((navbar) => 
                {                                
                    %>  
                    <%: Html.Kendo().MobileBackButton()
                            .Name("back-button")
                            .Align(MobileButtonAlign.Left) 
                            .HtmlAttributes(new { @class = "nav-button" })                                                
                            .Text("Back")
                    %>                                      
                    <%: navbar.ViewTitle("") %>                                
                    <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Right)                             
                            .Href("#popover-people")
                            .Text("Select people")
                            .Rel(MobileButtonRel.PopOver)
                    %>                                 
                    <%
                })
            .Render();   
        })
        .Content(() =>
        {
            %>

            <div data-role="content">
                <img src="<%= Url.Content("~/content/mobile/shared/faces.jpg")%>" />
            </div>

            <% Html.Kendo().MobilePopOver()
                    .Name("popover-people")
                    .Popup(popup => popup.Height("16em").Width("20em"))
                    .Content(() =>
                    {
                        %>
                        <% Html.Kendo().MobileView()
                               .Title("People")
                               .Header(() =>
                                {
                                    %>
                                        <% Html.Kendo().MobileNavBar()
                                                .Content((navbar) =>
                                                {
                                                    %>
                                                    <%: navbar.ViewTitle("") %>
                                                    <%: Html.Kendo().MobileButton()
                                                            .Text("Close")
                                                            .Align(MobileButtonAlign.Right)
                                                            .Events(events => events.Click("closeParentPopover"))
                                                    %>
                                                    <%
                                                })
                                                .Render();
                                        %>
                                    <%
                                })
                               .Content(() =>
                                {
                                    %>
                                    <ul data-role="listview">
                                        <li><label>Isabella Anderson<input type="checkbox"></label></li>
                                        <li><label>Josh Anderson<input type="checkbox"></label></li>
                                        <li><label>Linda Anderson<input type="checkbox"></label></li>
                                        <li><label>Oliver Anderson<input type="checkbox"></label></li>
                                        <li><label>James Williams<input type="checkbox"></label></li>
                                        <li><label>Barbara Williams<input type="checkbox"></label></li>
                                    </ul>
                                    <%
                                })
                               .Render();
                        %>
                        <%
                    })
                    .Render();
            %>    

            <% Html.Kendo().MobilePopOver()
                   .Name("popover-location")
                   .Popup(popup => popup.Width("20em").Height("10.6em"))
                   .Content(() => 
                    {
                        %>
                        <% Html.Kendo().MobileView()
                               .Content(() =>
                                {                                
                                    %>
                                    <ul data-role="listview" data-click="closeParentPopover">
                                        <li><label>Sydney, Australia <input name="location" type="radio"></label></li>
                                        <li><label>New York, USA <input name="location" type="radio"></label></li>
                                        <li><label>Miami, USA <input name="location" type="radio"></label></li>
                                    </ul>
                                    <%
                                })
                                .Render(); 
                        %>
                        <%
                    })
                   .Render();
            %>
   
            <%
        })
        .Footer(() => 
        {
            Html.Kendo().MobileNavBar()                                   
            .Content(() => 
                {                                
                    %>                                                    
                    <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Right)
                            .Href("#popover-location")
                            .Text("Select location")
                            .Rel(MobileButtonRel.PopOver)
                    %>                                 
                    <%
                })
            .Render();
        })
        .Render();
%>


<style scoped>
    .km-ios #popover .km-view-title,
    .km-ios #popover-people .km-view-title
    {
        color: #fff;
        text-shadow: 0 -1px rgba(0,0,0,.5);
    }

    .km-ios #popover .km-navbar,
    .km-root > * > #popover > .km-content
    {
        background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(255, 255, 255, 0.35)), color-stop(0.5, rgba(255, 255, 255, 0.1)), color-stop(0.5, rgba(255, 255, 255, 0)), color-stop(1, rgba(255, 255, 255, 0))) #000;
    }

    .km-ios #popover .km-navbar .km-button
    {
        background-color: #000;
    }
</style>

<script>
    function closeParentPopover(e) {

        var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');

        popover.close();
    }
</script>

</asp:Content>

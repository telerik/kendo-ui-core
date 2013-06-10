<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()        
        .Title("Photo viewer")
        .Zoom(true)       
        .Content(() =>
        {
            %>
            <div id="zoomable-explanation">
                The contents of this mobile view are zoomable using pinch/zoom gestures. <br />
                To test this, open the Kendo UI demos on a mobile device, which supports multi-touch gestures.
            </div>
            <img src="<%=Url.Content("~/content/mobile/shared/faces.jpg")%>" style="display: block" />
            <%
        })
        .Render();
%>

<style scoped>
    #zoomable-explanation {
        position: absolute;
        width: 200px;
        top: 50px;
        left: 50px;
        padding: 20px;
        background: black;
        color: white;
        border: 2px solid white;
        -webkit-border-radius: 10px;
        -webkit-opacity: 0.5;
    }
</style>

</asp:Content>

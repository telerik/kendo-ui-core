<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<%: Html.Kendo().MobileView()
        .Name("loading")
        .HtmlAttributes(new { @class = "km-insetcontent" })
        .Title("Loading Popup")
        .Layout("examples")
        .Events(events => events.Init("viewInit").Hide("viewHide"))
        .Content((obj) => 
            Html.Kendo().MobileButton()
                .Name("show")
                .Text("Show Loading Popup")
        )        
%>

<script>
    var showButton, interval, loaderElement;

    function viewInit(e) {
        showButton = $("#show").bind(kendo.support.mouseup, function () {
            showButton.stop(true, true).fadeOut();
            startLoading();
        });

        loaderElement = kendo.mobile.application.pane.loader.element.find("h1");
    }


    function hideLoader() {
        clearInterval(interval);
        kendo.mobile.application.hideLoading(); //hide loading popup
        loaderElement.removeClass("loaderHeading").text("Loading...");
    }

    function viewHide(e) {
        showButton.stop(true, true).fadeIn();
        hideLoader();
    }

    function startLoading() {
        hideLoader();
        var seconds = 5;

        loaderElement.text(seconds + " seconds left!").addClass("loaderHeading");

        kendo.mobile.application.showLoading(); //show loading popup

        interval = setInterval(function () {
            loaderElement.text(--seconds + " seconds left!"); //update text of the loading popup

            if (seconds == 0) {
                showButton.stop(true, true).fadeIn();
                hideLoader();
            }
        }, 1000);
    }
</script>

<style scoped>
    .km-ios #loading .km-content
    {
        background: transparent;
    }

    #loading .km-content
    {
        text-align: center;
    }

    #show
    {
        margin-top: 100px;
        font-size: 1.2em;
    }

    /* Example Counter */
    .km-meego h1.loaderHeading,
    .km-android h1.loaderHeading,
    .km-blackberry h1.loaderHeading
    {
        display: block;
        position: absolute;
        overflow: hidden;
        width: 1em;
        left: 50%;
        height: 1em;
        top: 50%;
        font-size: 1.2rem;
        margin: -.65em 0 0 -.5em;
    }

    .km-wp h1.loaderHeading
    {
        display: block;
    }

    .km-ios h1.loaderHeading
    {
    	font-size: 1rem;
    }
    .km-meego h1.loaderHeading,
    .km-blackberry h1.loaderHeading
    {
        font-size: 1.5rem;
    }
</style>

</asp:Content>

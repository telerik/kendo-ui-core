<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">

<div class="demo-section">
                
    <h3>PanelBar with images</h3>

    <%= Html.Kendo().PanelBar()
        .Name("panelbar-images")
        .Items(panelbar =>
        {
            panelbar.Add().Text("Baseball")
                .ImageUrl(Url.Content("~/Content/shared/icons/sports/baseball.png"))
                .Items(baseball => {
                    baseball.Add().Text("Top News")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/star.png"));
                    baseball.Add().Text("Photo Galleries")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/photo.png"));
                    baseball.Add().Text("Video Records")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/video.png"));
                    baseball.Add().Text("Radio Records")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/speaker.png"));
                });
            
            panelbar.Add().Text("Golf")
                .ImageUrl(Url.Content("~/Content/shared/icons/sports/golf.png"))
                .Items(golf => {
                    golf.Add().Text("Top News")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/star.png"));
                    golf.Add().Text("Photo Galleries")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/photo.png"));
                    golf.Add().Text("Video Records")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/video.png"));
                    golf.Add().Text("Radio Records")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/speaker.png"));
                });
            
            panelbar.Add().Text("Swimming")
                .ImageUrl(Url.Content("~/Content/shared/icons/sports/swimming.png"))
                .Items(swimming => {
                    swimming.Add().Text("Top News")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/star.png"));
                    swimming.Add().Text("Photo Galleries")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/photo.png"));
                });
            
            panelbar.Add().Text("Snowboarding")
                .ImageUrl(Url.Content("~/Content/shared/icons/sports/snowboarding.png"))
                .Items(snowboarding => {
                    snowboarding.Add().Text("Top News")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/star.png"));
                    snowboarding.Add().Text("Video Records")
                        .ImageUrl(Url.Content("~/Content/shared/icons/16/video.png"));
                });
        })
    %>

    <h3>PanelBar with sprites</h3>
    
    <%= Html.Kendo().PanelBar()
        .Name("panelbar-sprites")
        .Items(panelbar =>
        {
            panelbar.Add().Text("Brazil")
                .SpriteCssClasses("brazilFlag")
                .Items(brazil =>
                {
                    brazil.Add().Text("History")
                        .SpriteCssClasses("historyIcon");
                    brazil.Add().Text("Geography")
                        .SpriteCssClasses("geographyIcon");
                });

            panelbar.Add().Text("India")
                .SpriteCssClasses("indiaFlag")
                .Items(india =>
                {
                    india.Add().Text("History")
                        .SpriteCssClasses("historyIcon");
                    india.Add().Text("Geography")
                        .SpriteCssClasses("geographyIcon");
                });

            panelbar.Add().Text("Netherlands")
                .SpriteCssClasses("netherlandsFlag")
                .Items(netherlands =>
                {
                    netherlands.Add().Text("History")
                        .SpriteCssClasses("historyIcon");
                    netherlands.Add().Text("Geography")
                        .SpriteCssClasses("geographyIcon");
                });
        })
    %>
</div>

</div>

<style scoped>
    .k-panel
    {
        -webkit-transform: translatez(0);
    }

    .demo-section {
        width: 300px;
    }
    .demo-section h3 {
        font-weight: normal;
        padding-bottom: 10px;
    }
    #panelbar-images > .k-item > .k-link > .k-image
    {
        margin-top: 2px;
        margin-right: -5px;
    }

    #panelbar-sprites > .k-item > .k-link > .k-sprite
    {
        margin-top: 6px;
    }

    #panelbar-sprites .k-sprite {
        background-image: url("<%= Url.Content("~/Content/shared/flags.png") %>");
    }
    .brazilFlag { background-position: 0 0; }
    .indiaFlag { background-position: 0 -32px; }
    .netherlandsFlag { background-position: 0 -64px; }
    .historyIcon { background-position: 0 -96px; }
    .geographyIcon { background-position: 0 -128px; }
</style>
</asp:Content>
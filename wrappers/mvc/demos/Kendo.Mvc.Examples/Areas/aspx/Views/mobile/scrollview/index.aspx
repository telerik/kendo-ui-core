<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("scrollview-home")
        .Layout("examples")
        .Title("Photo Gallery")
        .Content(() =>
        {
            %>
            <div id="scrollview-container">
            <% 
            Html.Kendo().MobileScrollView()
                .Page(2)
                .Items(items =>
                {                                            
                    items.Add().HtmlAttributes(new { @class = "photo photo1" });
                    items.Add().HtmlAttributes(new { @class = "photo photo2" });
                    items.Add().HtmlAttributes(new { @class = "photo photo3" });
                    items.Add().HtmlAttributes(new { @class = "photo photo4" });
                    items.Add().HtmlAttributes(new { @class = "photo photo5" });
                    items.Add().HtmlAttributes(new { @class = "photo photo6" });
                    items.Add().HtmlAttributes(new { @class = "photo photo7" });
                    items.Add().HtmlAttributes(new { @class = "photo photo8" });
                    items.Add().HtmlAttributes(new { @class = "photo photo9" });
                    items.Add().HtmlAttributes(new { @class = "photo photo10" });
                })
                .FitItemPerPage(true)
                .Render();
            %>
            </div>
            <%
        })
        .Render();
%>

<style>
    #scrollview-home .photo {
        margin: 0;
        height: 220px;
        display: inline-block;
        -webkit-background-size: auto 100%;
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .km-wp #scrollview-home .photo {
        height: 15em;
    }

    .photo1 {background-image: url("../../content/mobile/cities/220/sydney.jpg");}
    .photo2 {background-image: url("../../content/mobile/cities/220/bonn.jpg");}
    .photo3 {background-image: url("../../content/mobile/cities/220/boston.jpg");}
    .photo4 {background-image: url("../../content/mobile/cities/220/cairo.jpg");}
    .photo5 {background-image: url("../../content/mobile/cities/220/cancun.jpg");}
    .photo6 {background-image: url("../../content/mobile/cities/220/cape-town.jpg");}
    .photo7 {background-image: url("../../content/mobile/cities/220/liverpool.jpg");}
    .photo8 {background-image: url("../../content/mobile/cities/220/london.jpg");}
    .photo9 {background-image: url("../../content/mobile/cities/220/melbourne.jpg");}
    .photo10 {background-image: url("../../content/mobile/cities/220/san-francisco.jpg");}

    #scrollview-container {
        margin: 60px 0 1em 0;
        padding-bottom: 20px;
        padding-top: 20px;
        background: rgba(0,0,0,.1);
        border: 1px solid rgba(0,0,0,.3);
        border-width: 1px 0;
        box-shadow: 0 1px 1px rgba(255,255,255,.3);
    }

    .km-ios #scrollview-container {
        background: url(../../content/shared/images/patterns/pattern1.png);
        box-shadow: 0 0 2px rgba(255,255,255,.5), inset 0 0 7px #000;
    }

    #scrollview-home .km-ios .km-content {
        background: #bbb;
    }
    .km-android .km-list .album-set a {
    	background-color: #277692;
    }
    .km-ios .km-list .album-set a {
    	background-color: #bbb;
    }
    .km-ios #scrollview-home .km-navbar {
        background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(255,255,255,.5)), color-stop(.06, rgba(255,255,255,.45)), color-stop(.5, rgba(255,255,255,.2)), color-stop(.5, rgba(255,255,255,.15)), color-stop(1, rgba(100,100,100,0))), url(../../content/shared/images/patterns/pattern5.png);
        background: -moz-linear-gradient(top, rgba(255,255,255,.5), rgba(255,255,255,.45) 6%, rgba(255,255,255,.2) 50%, rgba(255,255,255,.15) 50%, rgba(100,100,100,0)), url(../../content/shared/images/patterns/pattern5.png);
	}
    .km-ios #scrollview-home .km-navbar .km-button
    {
        background-color: #000;
    }
	.km-ios #scrollview-home .km-content {
        background: url(../../content/shared/images/patterns/pattern6.png);
        box-shadow: inset 0 0 30px #000;
	}

	.km-ios #scrollview-container .km-pages .km-current-page {
		background-color: #ff009c;
	}
	.km-ios #scrollview-container .km-pages {
		padding-top: 18px;
	}
    .km-ios #scrollview-home .km-view-title
    {
        color: #fff;
        text-shadow: 0 -1px rgba(0,0,0,.5);
    }
</style>

</asp:Content>

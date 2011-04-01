<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content3" ContentPlaceHolderID="TitleContent" runat="server"><%: ViewBag.PageTitle %></asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <%--<img src="../../Content/img/icons.png" alt="sprite" />--%>
    <%--<a class="p-border p-icon i-tileview" href="#">&nbsp;</a>--%>

    <h1>Nature Set <span class="by-user">by <a href="#"><em>SomeUser</em></a></span></h1>

    <ol class="paging"><li><a href="#" class="currentPage"><span>Page </span>1</a></li><li><a href="#"><span>Page </span>2</a></li><li><a href="#"><span>Page </span>3</a></li></ol>

    <ul class="floatWrap thumbs"><li class="thumb-upload"><a href="#"><span class="p-icon i-uploadphotos"></span>Upload more photos</a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li></ul>

</asp:Content>

<asp:Content ID="Content4" runat="server" ContentPlaceHolderID="PhotoContent">
    <img src="../../Content/img/photo.jpg" alt="big photo" />
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="FooterContent" runat="server">
<a href="#" class="slideshow"><span class="p-border-big p-icon i-slideshow"></span><em>Slideshow</em></a>
<ul class="floatWrap thumbs"><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#" class="currentThumb"><img src="../../Content/img/photo-thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li></ul>
<a href="#" class="uploadphotos"><span class="p-border-big p-icon i-uploadphotos"></span><em>Upload photos</em></a>
</asp:Content>
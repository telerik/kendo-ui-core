<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<html>
<head runat="server">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link href="<%: Url.Content("~/Content/Site.css") %>" rel="stylesheet" type="text/css" />
<script src="<%: Url.Content("~/Scripts/jquery-1.4.4.min.js") %>" type="text/javascript"></script>
<title>Index</title>
</head>
<body>

<div class="wrap">
<header class="floatWrap">
<h1>Aero<strong>Viewr</strong></h1>
<%--<a href="#" class="signin">Sign in</a>--%>
<%--   -- or --   --%>
<span class="signin">Signed in as <a href="#" ><em>MyUser</em></a></span>
<ul><li><a href="#" class="p-icon i-search">Search</a></li><li><a href="#" class="p-icon i-help">Help</a></li></ul>
</header>

<section class="photo">
<img src="../../Content/img/photo.jpg" alt="big photo" />
<div class="overlay"><!-- --></div>
</section>

<section class="main">
<h1>Nature Set <span class="by-user">by <a href="#"><em>SomeUser</em></a></span></h1>
<ol class="paging"><li><a href="#" class="currentPage"><span>Page </span>1</a></li><li><a href="#"><span>Page </span>2</a></li><li><a href="#"><span>Page </span>3</a></li></ol>
<ul class="floatWrap thumbs"><li class="thumb-upload"><a href="#"><span class="p-icon i-uploadphotos"></span>Upload more photos</a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li></ul>
</section>

<section class="footer">
<a href="#" class="slideshow"><span class="p-border-big p-icon i-slideshow"></span><em>Slideshow</em></a>
<ul class="floatWrap thumbs"><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#" class="currentThumb"><img src="../../Content/img/photo-thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li><li><a href="#"><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></a></li></ul>
<a href="#" class="uploadphotos"><span class="p-border-big p-icon i-uploadphotos"></span><em>Upload photos</em></a>
</section>
</div>

</body>
</html>
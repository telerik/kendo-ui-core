<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>

<%--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">--%>

<html>
<head runat="server">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link href="<%: Url.Content("~/Content/Site.css") %>" rel="stylesheet" type="text/css" />
<script src="<%: Url.Content("~/Scripts/jquery-1.4.4.min.js") %>" type="text/javascript"></script>
<title>Index</title>
<script type="text/javascript">
if (navigator.userAgent.indexOf("MSIE 8.0"))
    for(var e,l="header nav section time".split(" ");e=l.pop();document.createElement(e));
</script>
</head>
<body>

<div id="wrap">
<header class="floatWrap">
<h1>Aero<strong>Viewr</strong></h1>

<%--<a href="#" class="signin">Sign in</a>--%>
<%--   -- or --   --%>
<span class="signin">Signed in as <em>MyUser</em></span>

<ul><li id="searchWrap"><input type="text" id="search-input" /> <label for="search-input" id="search-label">search flickr</label> <button type="button" id="search-button" class="p-icon i-search" title="search">Search</button></li><li><a href="#" class="p-icon i-help" title="help">Help</a></li></ul>
</header>

<section id="photoWrap">
<img id="photo" src="../../Content/img/photo.jpg" alt="big photo" />
<div id="overlay"><!-- --></div>
</section>

<section id="main">

<div class="uploadWrap">

<!-- upload 1, 2 : START -->

<%--
<h1 class="uploadTitle"><span class="p-icon i-uploadphotos"></span> Upload photos to:</h1>

<button type="button" class="p-border-big"><span class="p-icon i-set"></span> current set</button>
<div class="p-border-big expanded" style="display:inline-block;"><span class="p-icon i-newset"></span> new set

<form action="/" class="innerHidden">
<fieldset>

<p>toggle the formExpanded CSS class to expand/collapse</p>

<label for="newset-title">Title</label>
<input id="newset-title" type="text" class="p-border-small" value="Set Title" />

<label for="newset-description">Description<span> optional</span></label>
<textarea id="newset-description" cols="20" rows="5" class="p-border-small">Set Description</textarea>

<p class="actionBottom"><input type="submit" value="Create" /></p>

</fieldset>
</form>

</div>
<button type="button" class="p-border-big"><span class="p-icon i-cancel"></span> cancel</button>

<!-- upload 1, 2 : END -->

<!-- upload 3 : START -->

<h1 class="uploadTitle"><span class="p-icon i-drag"></span> Drag &amp; drop photos to upload</h1>

<em>or</em> <button type="button" class="p-border-big"><span class="p-icon i-set"></span> browse</button>

--%>

<!-- upload 3 : END -->

<!-- tags n titles : START -->

<h1 class="setTitle titleTagsTitles">Nature Set <span class="by-user">by <a href="#"><em>you</em></a></span></h1>

<div class="p-border-big expanded formTagsTitles" style="display:inline-block;"><span class="p-icon i-tagstitles"></span> Titles, Descriptions, Tags

<form action="/" class="innerHidden">
<ul>

<li class="floatWrap">
<img id="uthumb1" class="uthumb" src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" />
<fieldset>
<label for="uthumb1-title">Title</label>
<input id="uthumb1-title" type="text" class="p-border-small" />
<label for="uthumb1-description">Description</label>
<textarea id="uthumb1-description" class="p-border-small" cols="20" rows="2"></textarea>
</fieldset>
<fieldset>
<label for="uthumb1-tags">Tags</label>
<input id="uthumb1-tags" type="text" class="p-border-small" />
<p>Color, Plane</p>
</fieldset>
</li>

<li class="floatWrap">
<img id="uthumb2" class="uthumb" src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" />
<fieldset>
<label for="uthumb2-title">Title</label>
<input id="uthumb2-title" type="text" class="p-border-small" />
<label for="uthumb2-description">Description</label>
<textarea id="uthumb2-description" class="p-border-small" cols="20" rows="2"></textarea>
</fieldset>
<fieldset>
<label for="uthumb2-tags">Tags</label>
<input id="uthumb2-tags" type="text" class="p-border-small" />
<p>Color, Plane</p>
</fieldset>
</li>

</ul>

<p class="actionBottom"><input type="submit" value="Save" /></p>

</form>

<div class="t-widget t-slider t-slider-vertical t-state-default"><div class="t-slider-wrap t-slider-buttons"><a class="t-button t-button-increase"><span title="Increase" class="t-icon t-arrow-up">Increase</span></a><a class="t-button t-button-decrease"><span title="Decrease" class="t-icon t-arrow-down">Decrease</span></a><div class="t-slider-track" style="height: 144px;"><div class="t-slider-selection" style="height: 72px;"><!-- --></div><a title="Drag" class="t-draghandle" href="javascript:void(0)" style="bottom: 66px;">Drag</a></div><input type="range" value="5" step="1" name="Slider" min="0" max="10" id="Slider" style="display: none;" /></div></div>

</div>

<!-- tags n titles : END -->

</div>

<!-- set : START -->

<%--<h1 class="setTitle">Nature Set <span class="by-user">by <a href="#"><em>SomeUser</em></a></span></h1>
<ul class="thumbViews"><li><a href="#" class="p-border p-icon i-gridview" title="grid mode">View in grid mode</a></li><li><a href="#" class="p-border p-icon i-tileview currentView" title="tile mode">View in tile mode</a></li></ul>
<ol class="paging"><li><a href="#" class="currentPage">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li></ol>
<ul class="floatWrap thumbs"><li class="thumb-upload"><a href="#"><span class="p-icon i-uploadphotos"></span>Upload more photos</a></li><li><img id="thumb1" src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></li><li><img id="thumb1" src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></li><li><img id="thumb1" src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></li><li><img id="thumb1" src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></li><li><img id="thumb1" src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /></li></ul>--%>

<!-- set : END -->

<!-- grid : START -->

<%--<h1 class="setTitle">Nature Set <span class="by-user">by <a href="#"><em>SomeUser</em></a></span></h1>

<ul class="thumbViews"><li><a href="#" class="p-border p-icon i-gridview currentView" title="grid mode">View in grid mode</a></li><li><a href="#" class="p-border p-icon i-tileview" title="tile mode">View in tile mode</a></li></ul>

<ol class="paging"><li><a href="#" class="currentPage">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li></ol>

<div id="Grid" class="t-widget t-grid">
<table cellspacing="0">
<colgroup><col style="width:87px" /><col /><col /><col style="width:8em" /><col style="width:8em" /><col style="width:8em" /><col style="width:8em" /></colgroup>
<thead class="t-grid-header"><tr><th scope="col" class="t-header"><a href="#" class="t-link">Photo</a></th><th scope="col" class="t-header"><a href="#" class="t-link">Title</a></th><th scope="col" class="t-header"><a href="#" class="t-link">Description</a></th><th scope="col" class="t-header"><a href="#" class="t-link">Author</a></th><th scope="col" class="t-header"><a href="#" class="t-link">Comments</a></th><th scope="col" class="t-header"><a href="#" class="t-link">Favorites</a></th><th scope="col" class="t-header t-last-header"><a href="#" class="t-link">Upload Date</a></th></tr></thead>
<tbody>
<tr><td><img src="http://lorempixum.com/75/75/abstract/?1" alt="thumbnail" width="75" height="75" /></td><td>Връх Мальовица (Maliovitsa Peak)</td><td>Description</td><td><a href="#">Author</a></td><td>comm</td><td>fav</td><td class="t-last">Sept 29, 2009</td></tr>
<tr class="t-alt"><td><img src="http://lorempixum.com/75/75/abstract/?2" alt="thumbnail" width="75" height="75" /></td><td>Photo Title</td><td>Description</td><td><a href="#">Author</a></td><td>comm</td><td>fav</td><td class="t-last">Sept 22, 2008</td></tr>
<tr><td><img src="http://lorempixum.com/75/75/abstract/?3" alt="thumbnail" width="75" height="75" /></td><td>Връх Мальовица (Maliovitsa Peak)</td><td>Description</td><td><a href="#">Author</a></td><td>comm</td><td>fav</td><td class="t-last">Sept 29, 2009</td></tr>
<tr class="t-alt"><td><img src="http://lorempixum.com/75/75/abstract/?4" alt="thumbnail" width="75" height="75" /></td><td>Photo Title</td><td>Description</td><td><a href="#">Author</a></td><td>comm</td><td>fav</td><td class="t-last">Sept 22, 2008</td></tr>
<tr><td><img src="http://lorempixum.com/75/75/abstract/?5" alt="thumbnail" width="75" height="75" /></td><td>Връх Мальовица (Maliovitsa Peak)</td><td>Description</td><td><a href="#">Author</a></td><td>comm</td><td>fav</td><td class="t-last">Sept 29, 2009</td></tr>
<tr class="t-alt"><td><img src="http://lorempixum.com/75/75/abstract/?6" alt="thumbnail" width="75" height="75" /></td><td>Photo Title</td><td>Description</td><td><a href="#">Author</a></td><td>comm</td><td>fav</td><td class="t-last">Sept 22, 2008</td></tr>
</tbody>
</table>
</div>--%>

<!-- grid : END -->

<!-- window : START -->

<%--<div style="top: 100px; left: 500px;" class="t-widget t-window">
    <div class="t-window-titlebar t-header">&nbsp;<span class="t-window-title">Sign In</span>
        <div class="t-window-actions t-header"><a href="#" class="t-window-action t-link"><span class="t-icon t-close">Close</span></a></div>
    </div>
    <div style="overflow: auto; width: 300px; height: 300px;" class="t-window-content t-content">
        <p>
            iframe here
        </p>
    </div>
    <div class="t-resize-handle t-resize-n" style="display: block;"></div>
    <div class="t-resize-handle t-resize-e" style="display: block;"></div>
    <div class="t-resize-handle t-resize-s" style="display: block;"></div>
    <div class="t-resize-handle t-resize-w" style="display: block;"></div>
    <div class="t-resize-handle t-resize-se" style="display: block;"></div>
    <div class="t-resize-handle t-resize-sw" style="display: block;"></div>
    <div class="t-resize-handle t-resize-ne" style="display: block;"></div>
    <div class="t-resize-handle t-resize-nw" style="display: block;"></div>
</div>--%>

<!-- window : END -->

<!-- exif : START -->

<%--<div class="p-border-big exifInfo expanded"><h2>Photo Title Here <em>by SomeUser</em></h2> <span class="p-border p-icon i-help"></span>
    <span class="p-icon i-cancel"></span>
    <dl class="innerHidden floatWrap">
        <dt>Taken on</dt><dd>some date</dd>
        <dt>Posted to Flickr</dt><dd>some date</dd>
        <dt>Description</dt><dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare ante quis elit lobortis ut semper est pharetra. Vestibulum a erat nisl, non faucibus dolor. Phasellus nec metus urna. Proin luctus, nunc nec interdum auctor, risus velit volutpat ligula, eu feugiat eros urna at est.</dd>
        <dt>Camera</dt><dd>Canon EOS 500D</dd>
        <dt>Tags</dt><dd><ul><li><a href="#">tag 1</a></li><li><a href="#">tag 2</a></li><li><a href="#">tag 3</a></li><li><a href="#">tag 4</a></li><li><a href="#">tag 5</a></li><li><a href="#">tag 6</a></li></ul></dd>
    </dl>
</div>--%>

<!-- exif : END -->

</section>

<section id="footer">
<a href="#" id="viewslideshow"><span class="p-border-big p-icon i-slideshow"></span><em>Slideshow</em></a>
<ul class="floatWrap thumbs"><li><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /><em>Some Set Title Here</em></li><li><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /><em>Some Set Title Here</em></li><li><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /><em>Some Set Title Here</em></li><li class="currentThumb"><img src="../../Content/img/photo-thumb.jpg" alt="thumbnail" width="100" height="100" /><em>Some Set Title Here</em></li><li><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /><em>Some Set Title Here</em></li><li><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /><em>Some Set Title Here</em></li><li><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /><em>Some Set Title Here</em></li><li><img src="../../Content/img/thumb.jpg" alt="thumbnail" width="100" height="100" /><em>Some Set Title Here</em></li></ul>
<a href="#" id="uploadphotos"><span class="p-border-big p-icon i-uploadphotos"></span><em>Upload photos</em></a>
<p class="bottomLink"><a href="#">Back to Slideshow</a></p>
</section>
</div>

<script type="text/javascript">

$(document).ready(function()
{
    $("#search-input").val("").one("focus", function(e){
        $("#search-label").hide();
        
        $("#search-button").css("display", "inline-block");
    })
});

</script>

</body>
</html>
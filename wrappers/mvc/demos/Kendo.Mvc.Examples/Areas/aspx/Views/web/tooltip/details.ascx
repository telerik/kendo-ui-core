<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div class="dairy-details">    
    <img src="<%:Url.Content("~/content/web/foods/200/") + ViewBag.Id %>.jpg" alt="<%:ViewBag.Title%>" />
    <h3><%: ViewBag.Title%></h3>
</div>
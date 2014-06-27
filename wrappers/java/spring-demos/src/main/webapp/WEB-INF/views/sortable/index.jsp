<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/resources/web/sortable/playlist.png"
	var="playlistBackground" />

<kendo:sortable name="#sortable-basic" hint="hint" placeholder="placeholder" cursor="url('../resources/web/sortable/grabbing.cur'), default">
	<kendo:sortable-cursorOffset top="-10" left="-230" />
</kendo:sortable>

<div id="playlist">
	<div id="playlist-title">
		<span>My Playlist</span>
	</div>
	<ul id="sortable-basic">
		<li class="sortable">Papercut <span>3:04</span></li>
		<li class="sortable">One Step Closer <span>2:35</span></li>
		<li class="sortable">With You <span>3:23</span></li>
		<li class="sortable">Points of Authority <span>3:20</span></li>
		<li class="sortable">Crawling <span>3:29</span></li>
		<li class="sortable">Runaway <span>3:03</span></li>
		<li class="sortable">By Myself <span>3:09</span></li>
		<li class="sortable">In the End <span>3:36</span></li>
		<li class="sortable">A Place for My Head <span>3:04</span></li>
		<li class="sortable">Forgotten <span>3:14</span></li>
		<li class="sortable">Cure for the Itch <span>2:37</span></li>
		<li class="sortable">Pushing Me Away <span>3:11</span></li>
	</ul>
</div>

<script>
	function hint(element) {
		return element.clone().addClass("hint");
	}

	function placeholder(element) {
		return element.clone().addClass("placeholder").text("drop here");
	}
</script>

<style>
	#example {
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	#playlist {
		margin: 30px auto;
		width: 300px;
		background-color: #f3f5f7;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, .1);
	}
	
	#playlist-title {
		height: 80px;
		background: url('${playlistBackground}') no-repeat 50% 50% #ffffff;
		border-radius: 4px 4px 0 0;
		border-bottom: 1px solid rgba(0, 0, 0, .1);
	}
	
	#playlist-title span {
		display: none;
	}
	
	#sortable-basic {
		padding: 0;
		margin: 0;
	}
	
	li.sortable {
		list-style-type: none;
		padding: 6px 8px;
		margin: 0;
		color: #666;
		font-size: 1.2em;
		cursor: url('../resources/web/sortable/grab.cur'), default;
	}
	
	li.sortable:last-child {
		border-bottom: 0;
		border-radius: 0 0 4px 4px;
	}
	
	li.sortable span {
		display: block;
		float: right;
		color: #666;
	}
	
	li.sortable:hover {
		background-color: #dceffd;
	}
	
	li.hint {
		display: block;
		width: 200px;
		background-color: #52aef7;
		color: #fff;
	}
	
	li.hint:after {
		content: "";
		display: block;
		width: 0;
		height: 0;
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
		border-left: 6px solid #52aef7;
		position: absolute;
		left: 216px;
		top: 8px;
	}
	
	li.hint:last-child {
		border-radius: 4px;
	}
	
	li.hint span {
		color: #fff;
	}
	
	li.placeholder {
		background-color: #dceffd;
		color: #52aef7;
		text-align: right;
	}
</style>

<demo:footer />
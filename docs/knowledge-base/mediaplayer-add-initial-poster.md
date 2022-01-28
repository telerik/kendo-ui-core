---
title: Add Initial Poster on Media Player
description: How to Add Initial Poster on Media Player
type: how-to
page_title: How to Add Initial Poster on Media Player | Kendo UI MediaPlayer for jQuery
slug: mediaplayer-add-initial-poster
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>MediaPlayer for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how you can a separate image as the Poster of the player.

## Solution

```dojo
  
    <div id="example">
      <div class="demo-section k-content wide" style="max-width: 925px;">
        <div id="mediaplayer" style="height:360px"></div>
        <div class="k-list-container playlist"><ul id="listView" class="k-list"></ul></div>
      </div>
      <script type="text/javascript">
$(document).ready(function () {

  $("#mediaplayer").kendoMediaPlayer({
    autoPlay: false,
  });

  $("#mediaplayer").data("kendoMediaPlayer").one("ready",function(e){
    var videoEl =  $("#mediaplayer").find("video");
    videoEl.attr("poster","https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Polar_Bear_AdF.jpg/400px-Polar_Bear_AdF.jpg");
    videoEl[0].load();
  });

  var videos = new kendo.data.DataSource({
    data: [{
      title: "Build HIPAA-Compliant Healthcare Apps Fast",
      poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Polar_Bear_AdF.jpg/400px-Polar_Bear_AdF.jpg",
      source: "https://www.w3schools.com/tags/movie.mp4"
    },
          ]
  });

  var listView = $("#listView").kendoListView({
    dataSource: videos,
    selectable: true,
    scrollable: false,
    template: kendo.template($("#template").html()),
    change: onChange,
    dataBound: onDataBound
  });

  function onChange() {
    var index = this.select().index();
    var dataItem = this.dataSource.view()[index];

    $("#mediaplayer").data("kendoMediaPlayer").media(dataItem);
  }

  function onDataBound(e) {
    this.select(this.content.children().first());
  }


});
      </script>
    
      <script type="text/x-kendo-template" id="template">
        <li class="k-item k-state-default" onmouseover="$(this).addClass('k-state-hover')"
            onmouseout="$(this).removeClass('k-state-hover')">
            <span>
                <img src="#:poster#" />
                <h5>#:title#</h5>
        </span>
        </li>
      </script>
      <style>
        .k-mediaplayer {
          float: left;
          box-sizing: border-box;
          width: 70%;
        }

        .playlist {
          float: left;
          height: 360px;
          overflow: auto;
          width: 30%;
        }
        @media(max-width: 800px)
        {
          .playlist,
          .k-mediaplayer {
            width: 100%;
          }}

        .playlist ul, .playlist li {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .playlist .k-item {
          border-bottom-style: solid;
          border-bottom-width: 1px;
          padding: 14px 15px;
        }

        .playlist .k-item:last-child {
          border-bottom-width: 0;
        }

        .playlist span {
          cursor: pointer;
          display: block;
          overflow: hidden;
          text-decoration: none;
        }

        .playlist span img {
          border: 0 none;
          display: block;
          height: 56px;
          object-fit: cover;
          width: 100px;
          float: left;
        }

        .playlist h5 {
          display: block;
          font-weight: normal;
          margin: 0;
          overflow: hidden;
          padding-left: 10px;
          text-align: left;
        }
      </style>
    </div>
      
``` 

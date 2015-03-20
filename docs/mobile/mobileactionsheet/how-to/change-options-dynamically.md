---
title: Change options dynamically
page_title: Change options dynamically
description: Change options dynamically
---

# Change options dynamically

The example below demonstrates how to change ActionSheet options dynamically on demand.

#### Example:

```html
    <div data-role="view" data-title="Inbox" id="actionsheet-view">
      <h3 id="actionResult"></h3>
      <ul data-role="listview" data-source="inbox" data-template="inboxItem" class="inboxList"></ul>

      <ul data-role="actionsheet" id="inboxActions" data-open="onOpen" data-popup='{"direction": "left"}'>
        <li><a href="#" data-action="reply">Reply</a></li>
        <li><a href="#" data-action="replyAll">Reply All</a></li>
        <li><a href="#" data-action="archive">Archive</a></li>
      </ul>
    </div>

    <script type="script/x-kendo-template" id="inboxItem">
    <h3 class="time">#: Time#</h3><h3>#: From #</h3>
    <a class="reply"
        data-role="button"
        data-rel="actionsheet"
        href="\\#inboxActions"
        data-actionsheet-context="#:ID#">Reply</a>
    <h2>#: Subject#</h2>
    <p>#: Text#</p>
    </script>

    <script>
      var inbox = [
        {
          ID: 1,
          From: "John Doe",
          Subject: "Monday meeting",
          Text: "Hi Tom, Since Monday I'll be out of office, I'm rescheduling the meeting for Tuesday.",
          Time: "07:56"
        },
        {
          ID: 2,
          From: "Sarah Connor",
          Subject: "Regarding org chart changes",
          Text: "Tom, I checked the new org chart last night and I have some reservations about it...",
          Time: "08:22"
        },
        {
          ID: 3,
          From: "Jane Parker",
          Subject: "Your Costume is ready",
          Text: "Hi mr. Sawyer, I'm sorry for the delay, your Halloween costume is ready. The bears...",
          Time: "10:14"
        },
        {
          ID: 4,
          From: "Joe Harper",
          Subject: "I'm sorry, Tom",
          Text: "Hi Tom, my aunt comes for a visit this Saturday, so I can't come back to St. Pete...",
          Time: "10:14"
        },
        {
          ID: 5,
          From: "Becky Thatcher",
          Subject: "Out tonight?",
          Text: "Honey, wanna go out tonight to grab some chicken? My weekly vouchers for cooking...",
          Time: "10:14"
        }
      ];

      function onOpen(e) {
        var list = this.element;
        var cancel = list.children("li:last");
        var person = e.target.parent().find('h3').eq(1).text();

        list.html('<li><a data-action="call">Call '+person+'</a><li>');
        list.append(cancel);
      }

      function call(e) {
        $("#actionResult").html("Calling to message #" + e.context);
      }

      function reply(e) {
        $("#actionResult").html("Replying to message #" + e.context);
      }

      function replyAll(e) {
        $("#actionResult").html("Replying to all in message #" + e.context);
      }

      function archive(e) {
        $("#actionResult").html("Archiving message #" + e.context);
      }

    </script>

    <style scoped>
      .reply {
        float: right;
      }

      .inboxList
      {
        font-size: .8em;
      }

      .km-ios #actionsheet-view .km-listview
      {
        background: url(../content/shared/images/patterns/pattern8.png);
      }

      .inboxList p,
      .inboxList h2,
      .inboxList h3
      {
        margin: 5px 2px;
      }

      .inboxList p,
      .inboxList h3
      {
        color: #777;
      }

      .inboxList h3.time
      {
        color: #369;
        float: left;
        margin-right: 10px;
      }

      #actionResult
      {
        padding: 10px;
        background: rgba(127,127,127,.5);
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        margin: 0;
      }

      .km-ios #actionsheet-view .km-navbar
      {
        background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(255, 255, 255, 0.5)), color-stop(0.06, rgba(255, 255, 255, 0.45)), color-stop(0.5, rgba(255, 255, 255, 0.2)), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(1, rgba(100, 100, 100, 0))), url(../content/shared/images/patterns/pattern7.png);
        background: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.45) 6%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(100, 100, 100, 0)), url(../content/shared/images/patterns/pattern7.png);
      }

      .km-ios #actionsheet-view .km-navbar .km-button
      {
        background-color: #4A88B5;
      }

      .km-ios #actionsheet-view .km-content .km-button {
        background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(255, 255, 255, 0.5)), color-stop(0.06, rgba(255, 255, 255, 0.45)), color-stop(0.5, rgba(255, 255, 255, 0.2)), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(1, rgba(100, 100, 100, 0))), url(../content/shared/images/patterns/pattern1.png);
        background: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.45) 6%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(100, 100, 100, 0)), url(../content/shared/images/patterns/pattern1.png);
      }
      .km-tablet .km-ios #actionsheet-view .km-view-title {
        color: #fff;
        text-shadow: 0 -1px rgba(0,0,0,.5);
      }
    </style>


    <script>
      var app = new kendo.mobile.Application(document.body);
    </script>
```

---
title: Templates
page_title: jQuery Chat Documentation - Templates
description: "Learn about the template customization options available in the Kendo UI for jQuery Chat component."
slug: templates_kendoui_chat
position: 5
---

# Chat Templates

The Kendo UI for jQuery Chat provides extensive template customization options that allow you to control the rendering of various chat elements. Templates enable you to customize the appearance and behavior of messages, file attachments, suggestions, and other UI components to match your application's design and requirements.

## Overview

The Chat component supports the following templates:

* **Message Templates**—Control how individual messages and message groups are rendered
* **File Templates**—Customize the display of file attachments within messages
* **Header Templates**—Define custom content for the chat header area
* **Suggestion Templates**—Customize suggested actions and message suggestions
* **Timestamp Templates**—Control how date and time separators are displayed

## Message Templates

### messageTemplate

The `messageTemplate` function controls the rendering of individual messages within the chat interface. This template receives comprehensive data about the message and related functionality, allowing for complete customization of message appearance including text content, timestamps, author information, and interactive elements. 


**Parameters:**
- `message` - The message object containing text, timestamp, author information, and other properties
- `replyMessage` - Referenced message data when this message is a reply
- `downloadAll` - Function to download all files in the message
- `messages` - Localized messages configuration
- `expandable` - Boolean indicating if the message can be expanded/collapsed
- `messageTimeFormat` - Format string for displaying timestamps

```dojo
    <div id="chat"></div>

    <script>
      var chat = $("#chat")
        .kendoChat({        
          messageTemplate: function (
            message,
            replyMessage,
            downloadAll,
            messages,
            expandable,
            messageTimeFormat,
          ) {
            return (
              "<div class='custom-message'>" +
              "<div class='custom-message-text'>TEXT" +
              message.text +
              "</div>" +
              "<div class='custom-message-time'>Time" +
              kendo.toString(message.timestamp, "HH:mm") +
              "</div>" +
              "</div>"
            );
          },         
          width: 400,
          height: 600,
          fileActions: [],
          authorId: 1,
          authorName: "Lora",
          dataSource: {
            data: [
              {
                id: 1,
                authorId: 1,
                authorName: "Lora",
                authorImageUrl:
                  "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                authorImageAltText: "Lora's profile picture",
                text: "Hey Emma! I just booked my trip to Japan for next month! I'm so excited but also a bit nervous since it's my first time there. Any tips?",
                timestamp: new Date(2025, 7, 20, 14, 30),
                isPinned: true,
              }
            ],
          },
          sendMessage: function (e) {
            e.message.authorId = 1;
            e.message.authorName = "Lora";
            e.message.authorImageUrl =
              "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg";
            e.message.authorImageAltText = "Lora's profile picture";
          },
        })
        .data("kendoChat");
    </script>
```

### messageGroupTemplate


**Parameters:**
- `data.author` - Author information including name, image URL, and ID
- `data.message` - The message data object

The `messageGroupTemplate` function controls how message groups are rendered when multiple consecutive messages come from the same author. Message groups help organize conversations by visually grouping messages together, reducing visual clutter and improving readability in busy chat environments. This template is particularly useful for customizing how author information is displayed, implementing conversation threading, or creating distinct visual styles for different types of message groups.

```dojo
    <style>
      .Emma {
        color: darkcyan;
        font-style: italic;
      }

      .Lora {
        color: rgb(94, 26, 123);
      }
    </style>
    <div id="chat"></div>

    <script>
      var chat = $("#chat")
        .kendoChat({
          messageGroupTemplate: function (data) {
            if (data.message.files.length > 0) {
              return (
                "<div class='custom-message-group'>" +
                "<span class='custom-author'><strong>Author: " +
                data.author.name +
                "</strong></span>" +
                "<div class='custom-message-content " +
                data.author.name +
                "'><strong>Text:</strong> " +
                data.message.text +
                "</div>" +
                "<div class='custom-files'><i>Files:</i> " +
                data.message.files.length +
                " file(s)</div>" +
                "</div>"
              );
            }
            return (
              "<div class='custom-message-group'>" +
              "<span class='custom-author'><strong>Author: " +
              data.author.name +
              "</strong></span>" +
              "<div class='custom-message-content " +
              data.author.name +
              "'><strong>Text:</strong> " +
              data.message.text +
              "</div>"
            );
            ("</div>");
          },
          width: 400,
          height: 600,
          fileActions: [],
          authorId: 1,
          authorName: "John Doe",

          dataSource: {
            data: [
              {
                id: 1,
                authorId: 1,
                authorName: "Lora",
                authorImageUrl:
                  "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                authorImageAltText: "Lora's profile picture",
                text: "Hey Emma! I just booked my trip to Japan for next month! I'm so excited but also a bit nervous since it's my first time there. Any tips?",
                timestamp: new Date(2025, 7, 20, 14, 30),
                isPinned: true,
              },
              {
                id: 4,
                authorId: 2,
                authorName: "Emma",
                authorImageUrl:
                  "https://demos.telerik.com/kendo-ui/content/web/Customers/DUMON.jpg",
                authorImageAltText: "Emma's profile picture",
                text: "Don't miss the cherry blossoms if they're still blooming! And try the street food in Osaka - it's the best!",
                timestamp: new Date(2025, 7, 20, 14, 42),
              },
              {
                id: 5,
                authorId: 1,
                authorName: "Lora",
                authorImageUrl:
                  "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                authorImageAltText: "Lora's profile picture",
                text: "Perfect! I'm definitely going during cherry blossom season. Should I book accommodations in advance, or can I find places as I go?",
                timestamp: new Date(2025, 7, 20, 14, 45),
              },
              {
                id: 6,
                authorId: 2,
                authorName: "Emma",
                authorImageUrl:
                  "https://demos.telerik.com/kendo-ui/content/web/Customers/DUMON.jpg",
                authorImageAltText: "Emma's profile picture",
                text: "Definitely book in advance, especially during cherry blossom season! It gets super busy. I recommend staying in a ryokan in Kyoto for the traditional experience. Here you will find the scheduler we have used when we were there.",
                timestamp: new Date(2025, 7, 20, 14, 48),
                files: [
                  {
                    name: "Sightseeing_schedule.pdf",
                    size: 245760,
                    extension: "pdf",
                  },
                  {
                    name: "Favourite_place.jpg",
                    size: 156000,
                    extension: "jpg",
                  },
                ],
              },
              {
                id: 7,
                authorId: 1,
                authorName: "Lora",
                authorImageUrl:
                  "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                authorImageAltText: "Lora's profile picture",
                text: "Thanks for all the advice, Emma. I'll definitely send you photos!",
                timestamp: new Date(2025, 7, 20, 14, 52),
              },
            ],
          },
          sendMessage: function (e) {
            e.message.authorId = 1;
            e.message.authorName = "Lora";
            e.message.authorImageUrl =
              "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg";
            e.message.authorImageAltText = "Lora's profile picture";
          },
        })
        .data("kendoChat");
    </script>
```

### messageReferenceTemplate

The `messageReferenceTemplate` function renders message references that are used for reply chains and pinned message indicators within the chat interface. This template displays contextual information about referenced messages, allowing users to understand the relationship between current messages and previously sent content. You can customize this template to create visually distinct reference displays, implement custom styling for different reference types (replies versus pins), or add interactive elements that allow users to navigate to the original referenced message.

**Note:** The outermost element must always have the `ref-chat-message-reference-pin-wrapper` attribute.

**Parameters:**
- `data.text` - The text content of the referenced message
- `data.files` - Array of file attachments in the referenced message
- `data.isOwnMessage` - Boolean indicating if the reference is to user's own message
- `data.isPinMessage` - Boolean indicating if this is a pinned message reference
- `data.renderCloseButton` - Boolean controlling close button display
- `data.renderFileMenuButton` - Boolean controlling file menu button display

```dojo
    <div id="chat"></div>

    <script>
      var chat = $("#chat")
        .kendoChat({
          messageReferenceTemplate: function (data) {
            return (
              "<div class='custom-reference' ref-chat-message-reference-pin-wrapper>" +
              "<span class='custom-reference-text'><strong>Message reference:</strong> " +
              data.text +
              "</span>" +
              "</div>"
            );
          },
          width: 400,
          height: 600,
          fileActions: [],
          authorId: 1,
          authorName: "John Doe",
          dataSource: {
            data: [
              {
                id: 1,
                authorId: 1,
                authorName: "Lora",
                authorImageUrl:
                  "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                authorImageAltText: "Lora's profile picture",
                text: "Hey Emma! I just booked my trip to Japan for next month! I'm so excited but also a bit nervous since it's my first time there. Any tips?",
                timestamp: new Date(2025, 7, 20, 14, 30),
                isPinned: true,
              },
            ],
          },
        })
        .data("kendoChat");
    </script>
```

## File Templates

### filesTemplate

The `filesTemplate` function customizes how file attachments are displayed within chat messages, providing complete control over the presentation and interaction of shared files. This template allows you to create custom file previews, display file metadata such as size, type, and upload date.

**Note:** The outermost element must always have the `ref-chat-file-wrapper` attribute.

**Parameters:**
- `files` - Array of file objects with properties like name, size, extension, and URL
- `downloadAll` - Function to trigger download of all files
- `messages` - Localized message strings
- `closeButton` - HTML for the close button element

```dojo
  <div id="chat"></div>
  <script type="module">
      var chat = $("#chat").kendoChat({
          filesTemplate: function(files, downloadAll, messages, closeButton) {
              return "<div class='custom-files'><i>Custom Files:</i> " + files.length + " file(s)</div>";
          },
          width: 400,
          height: 600,
          fileActions: [],
          authorId: 1,
          authorName: "John Doe",
          dataSource: {
              data: []
          },
      }).data("kendoChat");
  </script>
```

## Header Templates

### headerItems

The `headerItems` configuration allows you to define custom content for the chat header area using flexible template functions that return HTML content. Each header item can include logos, titles, navigation elements, action buttons, or any other UI components that enhance the chat experience and provide contextual information to users. 

**Header Item Types:**
- `contentItem` - Renders custom content using the template function
- `spacer` - Creates flexible space between header elements

```dojo
  <div id="chat"></div>

  <script type="module">
      var chat = $("#chat").kendoChat({

          headerItems: [{
              type: "contentItem",
              template: () => "<strong>John's chat</strong>"
          }, {
              type: "spacer"
          }, {
              type: "contentItem",
              template: () => new kendo.ui.Button("<button>", {
                  icon: "plus",
                  text: "New Chat"
              }).element[0].outerHTML
          }],
          width: 400,
          height: 500
      }).data("kendoChat");
  </script>
```

## Suggestion Templates

### suggestedActionsTemplate

The `suggestedActionsTemplate` function customizes the rendering of suggested actions that appear with specific messages, typically originating from chatbots, automated systems, or AI assistants. These suggested actions provide users with quick response options, eliminating the need to type common replies and improving conversation flow by offering contextually relevant choices.

**Parameters:**
- `suggestions` - Array of suggestion objects with text and optional additional properties

```dojo
    <div id="chat"></div>

        <script type="module">
            var chat = $("#chat").kendoChat({
                suggestedActionsTemplate: function(suggestions) {
                    let html = "<div class='custom-actions'>";
                    html += "<p class='actions-title'>Choose an option:</p>";

                    for (let i = 0; i < suggestions.length; i++) {
                        html += "<button class='custom-action-btn' data-action='" + suggestions[i].text + "'>";
                        html += "<span class='action-icon'></span>";
                        html += suggestions[i].text;
                        html += "</button>";
                    }

                    html += "</div>";
                    return html;
                },
                width: 400,
                height: 600,
                dataSource: {
                    data: [
                        {
                            id: 1,
                            authorId: 1,
                            authorName: "Lora",
                            authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                            authorImageAltText: "Lora's profile picture",
                            text: "Which country you would like to know more about?",
                            suggestedActions: [
                                { text: "Japan" },
                                { text: "Italy" },
                                { text: "Brazil" }
                            ]
                        },
                    ]
                },
            }).data("kendoChat");
            kendo.ui.icon($(".action-icon"), { icon: 'globe-outline' });
        </script>
```

### suggestionsTemplate

The `suggestionsTemplate` function customizes the rendering of message suggestions that appear below the chat input area, providing users with quick reply options and commonly used phrases. These suggestions help streamline conversations by offering pre-defined responses that users can select instead of typing, which is particularly useful for customer service scenarios or repetitive interactions. 

**Parameters:**
- `suggestions` - Array of suggestion objects with text properties

```dojo
<div id="chat"></div>
$("#chat").kendoChat({
    suggestions: [
        { text: "Yes, please" },
        { text: "No, thanks" },
        { text: "Tell me more" },
        { text: "Help" }
    ],
    suggestionsTemplate: function(suggestions) {
        let html = "<div class='custom-suggestions'>";
        html += "<span class='suggestions-label'>Quick replies:</span>";
        
        for (let i = 0; i < suggestions.length; i++) {
            html += "<button class='custom-suggestion-btn'>";
            html += "<span class='suggestion-icon'>💬</span>";
            html += suggestions[i].text;
            html += "</button>";
        }
        
        html += "</div>";
        return html;
    }
});
kendo.ui.icon($(".action-icon"), { icon: 'hand' });
```

## Timestamp Templates

### timestampTemplate

The `timestampTemplate` function controls how date and time separators are displayed between message groups, providing crucial temporal context that helps users navigate through conversation history. This template allows you to customize the appearance of time dividers that automatically appear when there are significant time gaps between messages, making it easier for users to understand when different parts of the conversation took place. 

**Parameters:**
- `data.date` - Date object representing the timestamp
- `data.message` - Current message object for context

**Return Value:**
- Return HTML string for custom timestamp display
- Return `null` or empty string to hide timestamp separators

```dojo
 <div id="chat"></div>
  <script>
   $("#chat").kendoChat({
          dataSource: {
              data: [
                  {
                      id: 1,
                      authorId: 1,
                      authorName: "Lora",
                      authorImageUrl:
                          "https://demos.telerik.com/kendo-ui/content/web/Customers/ANATR.jpg",
                      authorImageAltText: "Lora's profile picture",
                      text: "Hey Emma! I just booked my trip to Japan for next month! I'm so excited but also a bit nervous since it's my first time there. Any tips?",
                      timestamp: new Date(2025, 7, 20, 14, 30),
                      isPinned: true,
                  }
              ]
          },
          timestampTemplate: function(data) {
              const date = data.date;
              const now = new Date();
              const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

              let displayText;
              if (diffDays === 0) {
                  displayText = "Today";
              } else if (diffDays === 1) {
                  displayText = "Yesterday";
              } else if (diffDays < 7) {
                  displayText = date.toLocaleDateString('en-US', { weekday: 'long' });
              } else {
                  displayText = date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: diffDays > 365 ? 'numeric' : undefined
                  });
              }

              return "<div class='custom-timestamp'>" +
                  "<span class='timestamp-line'></span>" +
                  "<span class='timestamp-text'>" + displayText + "</span>" +
                  "<span class='timestamp-line'></span>" +
                  "</div>";
          }
      });
</script>
```


## See Also

* [Basic Usage of the Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)

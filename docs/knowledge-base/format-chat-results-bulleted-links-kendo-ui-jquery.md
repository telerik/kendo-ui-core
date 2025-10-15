---
title: Displaying Results as Bulleted Links in Kendo UI for jQuery Chat
description: Learn how to format search results as bulleted links in Kendo UI for jQuery Chat to enhance usability.
type: how-to
page_title: How to Format Chat Search Results as Bulleted Links in Kendo UI for jQuery Chat
meta_title: How to Format Chat Search Results as Bulleted Links in Kendo UI for jQuery Chat
slug: format-chat-results-bulleted-links-kendo-ui-jquery
tags: kendo ui for jquery, chat, messagetemplate, links, open-in-new-tab
res_type: kb
ticketid: 1700697
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for jQuery Chat</td>
</tr>
<tr>
<td> Version </td>
<td>2025.3.1002</td>
</tr>
</tbody>
</table>

## Description

I want to format a result returned in [Kendo UI for jQuery Chat](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat) into a bulleted list with clickable links. These links should open in a new tab when clicked.

This knowledge base article also answers the following questions:
- How can I display search results as a bulleted list in Kendo UI for jQuery Chat?
- How do I make links open in a new tab in Kendo UI for jQuery Chat?
- How can I use messageTemplate to format messages in Kendo UI for jQuery Chat?

## Solution

Use the [`messageTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/messagetemplate) configuration option to customize the display of messages in Kendo UI for jQuery Chat. This allows you to format the search results as an unordered list with clickable links that open in a new tab.

### Steps

1. Define a custom  [`messageTemplate`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat/configuration/messagetemplate) that uses HTML to format the messages.
2. Create an unordered list (`<ul>`) for displaying links.
3. Use anchor (`<a>`) elements with the `target="_blank"` attribute to ensure that the links open in a new tab.

Here’s an updated example of the code:

```dojo
  <div class="chat-container">
        <div class="chat-header">
            Kendo Chat - URL Lists Demo
        </div>
        <div id="chat"></div>
    </div>    

    <script>
        // Sample URL data with titles and descriptions
        const urlData = {
            message1: [
                {
                    title: "Kendo UI Documentation",
                    url: "https://docs.telerik.com/kendo-ui/",
                    description: "Complete documentation for Kendo UI components"
                },
                {
                    title: "Kendo UI Demos",
                    url: "https://demos.telerik.com/kendo-ui/",
                    description: "Interactive demos and examples"
                },
                {
                    title: "Kendo UI Chat API Reference",
                    url: "https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/chat",
                    description: "Detailed API documentation"
                }
            ],
        };

        // Initialize the chat
        let chatWidget;
        
        $(document).ready(function() {
            // Sample initial messages
            const initialMessages = [
                {
                    id: 1,
                    text: "Welcome to the Kendo Chat demo! I can share useful links with you.",
                    authorId: "bot",
                    authorName: "Assistant",
                    authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                    timestamp: new Date()
                }
            ];

            chatWidget = $("#chat").kendoChat({
                authorId: "user",
                authorName: "You",
                height: 500,
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
                dataSource: initialMessages,
                messageTemplate: function(message) {
                    // Check if message has URL data
                    if (message.urls && message.urls.length > 0) {
                        return renderMessageWithUrls(message);
                    }
                    
                    // Default message template
                    return `
                        <div class="k-message-text">
                            ${message.text}
                        </div>
                    `;
                }
            }).data("kendoChat");
        });

        // Function to render messages with URL lists
        function renderMessageWithUrls(message) {
            let urlListHtml = '';
            
            if (message.urls && message.urls.length > 0) {
                urlListHtml = '<ul class="url-list">';
                message.urls.forEach(function(urlItem) {
                    urlListHtml += `
                        <li>
                            <a href="${urlItem.url}" target="_blank">${urlItem.title}</a> 
                        </li>
                    `;
                });
                urlListHtml += '</ul>';
            }

            return `
                <div class="custom-message-with-urls">
                    ${message.text ? `<div class="message-text">${message.text}</div>` : ''}
                    ${urlListHtml}
                </div>
            `;
        }       
    
        // Simulate user interaction
        setTimeout(function() {
            chatWidget.postMessage({
                id: 2,
                text: "Hi! Can you share some useful links?",
                authorId: "user",
                authorName: "You",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/LONEP.jpg",
                timestamp: new Date()
            });
        }, 1000);

        setTimeout(function() {
            const message = {
                id: Date.now(),
                text: "Here are some helpful Kendo UI resources:",
                urls: urlData.message1,
                authorId: "bot",
                authorName: "Assistant",
                authorImageUrl: "https://demos.telerik.com/kendo-ui/content/web/Customers/RICSU.jpg",
                timestamp: new Date()
            };
            
            chatWidget.postMessage(message);
        }, 2000);
    </script>
  <style>     
        
        /* Custom styles for URL lists */
        .url-list {
            margin: 10px 0;
            padding: 0;
            list-style: none;
        }
        
        .url-list li {
            margin: 5px 0;
            padding: 8px 12px;
            background: #f8f9fa;
            border-radius: 4px;
            border-left: 3px solid #007acc;
            position: relative;
            padding-left: 25px;
        }
        
        .url-link {
            color: #007acc;
            text-decoration: none;
            font-weight: 500;
            cursor: pointer;
            transition: color 0.2s ease;
        }
        
        .url-link:hover {
            color: #005999;
            text-decoration: underline;
        }      
        
    </style>
```



## See Also

- [Kendo UI for jQuery Chat Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/chat/overview)
- [Kendo UI for jQuery Chat API](https://docs.telerik.com/kendo-ui/api/javascript/ui/chat/)
- [Kendo UI for jQuery Chat Quick Actions](https://www.telerik.com/kendo-jquery-ui/documentation/controls/chat/suggestions)
---

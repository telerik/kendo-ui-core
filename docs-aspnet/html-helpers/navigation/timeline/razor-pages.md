---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI Timeline component for {{ site.framework }} in a Razor Pages application."

slug: razorpages_timelinehelper_aspnetcore
position: 9

---

# Timeline in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Timeline for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Timeline component in a Razor Pages scenario.

For the complete project, refer to the [Timeline in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Timeline/TimelineBinding.cshtml).

## Getting Started

To connect the Timeline to a data set retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper
        .DataSource(dt => dt
            .Read(r=>r.Url("/Timeline/TimelineBinding?handler=Events"))
        )
    ```
    {% if site.core %}
    ```TagHelper
        <datasource>
            <transport>
                <read url="/Timeline/TimelineBinding?handler=Events" />
            </transport>
        </datasource>
    ```
    {% endif %}

1. Within the `cshtml.cs` file, add a handler method for the Read operation that returns the dataset:


    ```
        public JsonResult OnGetEvents()
        {
            return new JsonResult(Events);
        }
    ```

1. Populate the `Events` collection in the `OnGet` handler:
```C#
     public static IList<TimelineEventModel> Events;
     
      public void OnGet()

        {
            if (Events == null)
            {
                Events = new List<TimelineEventModel>();

                Events.Add(new TimelineEventModel()
                {
                    Title = "Barcelona \u0026 Tenerife",
                    Subtitle = "May 25, 2008",
                    Description = "Barcelona is an excellent place to discover world-class arts and culture. Bullfighting was officially banned several years ago, but the city remains rich with festivals and events. The sights in Barcelona are second to none. Don’t miss the architectural wonder, Casa Mila—otherwise known as La Pedrera. It’s a modernist apartment building that looks like something out of an expressionist painting. Make your way up to the roof for more architectural surprises. And if you like Casa Mila, you’ll want to see another one of Antoni Gaudi’s architectural masterpieces, Casa Batllo, which is located at the center of Barcelona.\r\nTenerife, one of the nearby Canary Islands, is the perfect escape once you’ve had your fill of the city. In Los Gigantes, life revolves around the marina.",
                    EventDate = new System.DateTime(2008, 5, 25),
                    Images = new List<TimelineEventModelImage>() {
                    new TimelineEventModelImage() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Barcelona-and-Tenerife/Arc-de-Triomf,-Barcelona,-Spain_Liliya-Karakoleva.JPG?width=500&amp;height=500" }
                },
                    Actions = new List<TimelineEventModelAction>() {
                    new TimelineEventModelAction() { text = "More info about Barcelona", url="https://en.wikipedia.org/wiki/Barcelona" }
                }
                });

                Events.Add(new TimelineEventModel()
                {
                    Title = "United States East Coast Tour 1",
                    Subtitle = "Feb 27, 2007",
                    Description = "Touring the East Coast of the United States provides a massive range of entertainment and exploration. To take things in a somewhat chronological order, best to begin your trip in the north, checking out Boston’s Freedom Trail, Fenway Park, the Statue of Liberty, and Niagara Falls. Bring your raincoat to Niagara Falls, which straddles the boarder between Canada and the United States—the majestic sight might have you feeling misty in every sense of the word.",
                    EventDate = new System.DateTime(2007, 2, 27),
                    Images = new List<TimelineEventModelImage>() {
                    new TimelineEventModelImage() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/United-States/Boston-Old-South-Church_Ivo-Igov.JPG?width=500&amp;height=500" }
                },
                    Actions = new List<TimelineEventModelAction>() {
                    new TimelineEventModelAction() { text = "More info about New York City", url="https://en.wikipedia.org/wiki/New_York_City" }
                }
                });

                Events.Add(new TimelineEventModel()
                {
                    Title = "Malta, a Country of Кnights",
                    Subtitle = "Jun 15, 2008",
                    Description = "Home of the oldest-known human structures in the world, the Maltese archipelago is best described as an open-air museum. Malta, the biggest of the seven Mediterranean islands, is the cultural center of the three largest—only three islands that are fully inhabited.  If you’re into heavy metal—swords, armor and other medieval weaponry—you’ll love the Grandmaster’s Palace.",
                    EventDate = new System.DateTime(2008, 6, 15),
                    Images = new List<TimelineEventModelImage>() {
                    new TimelineEventModelImage() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Malta/Bibliotheca-National-Library_Marie-Lan-Nguyen.JPG?width=500&amp;height=500" }
                },
                    Actions = new List<TimelineEventModelAction>() {
                    new TimelineEventModelAction() { text = "More info about Malta", url="https://en.wikipedia.org/wiki/Malta" }
                }
                });

                Events.Add(new TimelineEventModel()
                {
                    Title = "Wonders of Italy",
                    Subtitle = "Jul 6, 2008",
                    Description = "The Italian Republic is a history lover’s paradise with thousands of museums, churches and archaeological sites dating back to Roman and Greek times. Visitors will also find a hub for fashion and culture unlike anywhere else in the world. Explore Ancient history in Rome at the Colosseum and Rome’s Ruins.",
                    EventDate = new System.DateTime(2008, 7, 6),
                    Images = new List<TimelineEventModelImage>() {
                    new TimelineEventModelImage() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Italy/Basilica-di-San-Pietro-in-Vaticano2_Lilia-Karakoleva.jpg?width=500&amp;height=500" }
                },
                    Actions = new List<TimelineEventModelAction>() {
                    new TimelineEventModelAction() { text = "More info about Rome", url="https://en.wikipedia.org/wiki/Rome" }
                }
                });

                Events.Add(new TimelineEventModel()
                {
                    Title = "The Best of Western Europe",
                    Subtitle = "Aug 11, 2009",
                    Description = "Tour the best of Western Europe and take in the sights of Munich, Frankfurt, Meinz, Bruxel, Amsterdam, and Vienna along the way. Discover the amazing world of plants at Frankfurt Palmengarten, the botanical gardens in Frankfurt.",
                    EventDate = new System.DateTime(2009, 8, 11),
                    Images = new List<TimelineEventModelImage>() {
                    new TimelineEventModelImage() { src = "https://demos.telerik.com/aspnet-mvc/tripxpert/Images/Gallery/Western-Europe/Austrian-Parliament,-Vienna,-Austria_Gergana-Prokopieva.JPG?width=500&amp;height=500" }
                },
                    Actions = new List<TimelineEventModelAction>() {
                    new TimelineEventModelAction() { text = "More info about Munich", url="https://en.wikipedia.org/wiki/Munich" }
                }
                });
            }
        }
```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Timeline](https://docs.telerik.com/kendo-ui/api/javascript/ui/timeline)

* [Server-Side HtmlHelper API of the Timeline](/api/timeline)

* [Server-Side TagHelper API of the Timeline](/api/taghelpers/timeline)

* [Knowledge Base Section](/knowledge-base)
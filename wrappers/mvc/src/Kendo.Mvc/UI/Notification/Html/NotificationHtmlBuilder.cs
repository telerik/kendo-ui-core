namespace Kendo.Mvc.UI.Html
{
    using System.Web.Mvc;
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class NotificationHtmlBuilder: INotificationHtmlBuilder
    {
        public NotificationHtmlBuilder(Notification notification)
        {
            Notification = notification;
        }

        public Notification Notification
        {
            get;
            private set;
        }

        public IHtmlNode NotificationTag()
        {
            var defaultOptions = new Dictionary<string, object>();
            FluentDictionary.For(defaultOptions)
                .Add("id", Notification.Name);

            var el = new HtmlElement(Notification.Tag)
                   .Attributes(defaultOptions)
                   .Attributes(Notification.HtmlAttributes);

            return el;
        }
    }
}
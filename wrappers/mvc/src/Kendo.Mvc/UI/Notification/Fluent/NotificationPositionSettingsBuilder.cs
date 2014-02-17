using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using System.Web.Routing;
using System;

namespace Kendo.Mvc.UI.Fluent
{
    public class NotificationPositionSettingsBuilder : IHideObjectMembers
    {
        private readonly NotificationPositionSettings settings;
        private readonly ViewContext viewContext;

        public NotificationPositionSettingsBuilder(NotificationPositionSettings settings, ViewContext viewContext)
        {
            this.viewContext = viewContext;
            this.settings = settings;
        }

        /// <summary>Sets whether popup notifications should maintain their position during page scrolling.</summary>
        public NotificationPositionSettingsBuilder Pinned(bool value)
        {
            settings.Pinned = value;

            return this;
        }

        /// <summary>Sets the position of the first popup notification with regard to the viewport's bottom edge.</summary>
        public NotificationPositionSettingsBuilder Bottom(string value)
        {
            settings.Bottom = value;

            return this;
        }

        /// <summary>Sets the position of the first popup notification with regard to the viewport's bottom edge.</summary>
        public NotificationPositionSettingsBuilder Bottom(int value)
        {
            settings.Bottom = value.ToString() + "px";

            return this;
        }

        /// <summary>Sets the position of the first popup notification with regard to the viewport's left edge.</summary>
        public NotificationPositionSettingsBuilder Left(string value)
        {
            settings.Left = value;

            return this;
        }

        /// <summary>Sets the position of the first popup notification with regard to the viewport's left edge.</summary>
        public NotificationPositionSettingsBuilder Left(int value)
        {
            settings.Left = value.ToString() + "px";

            return this;
        }

        /// <summary>Sets the position of the first popup notification with regard to the viewport's right edge.</summary>
        public NotificationPositionSettingsBuilder Right(string value)
        {
            settings.Right = value;

            return this;
        }

        /// <summary>Sets the position of the first popup notification with regard to the viewport's right edge.</summary>
        public NotificationPositionSettingsBuilder Right(int value)
        {
            settings.Right = value.ToString() + "px";

            return this;
        }

        /// <summary>Sets the position of the first popup notification with regard to the viewport's top edge.</summary>
        public NotificationPositionSettingsBuilder Top(string value)
        {
            settings.Top = value;

            return this;
        }

        /// <summary>Sets the position of the first popup notification with regard to the viewport's top edge.</summary>
        public NotificationPositionSettingsBuilder Top(int value)
        {
            settings.Top = value.ToString() + "px";

            return this;
        }
    }
}
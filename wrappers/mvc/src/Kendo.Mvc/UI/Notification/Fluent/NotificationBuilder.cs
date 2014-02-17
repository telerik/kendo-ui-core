namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;

    /// <summary>Defines the fluent interface for configuring the <see cref="Notification{T}"/>component.</summary>
    public class NotificationBuilder : WidgetBuilderBase<Notification, NotificationBuilder>, IHideObjectMembers
    {
        /// <summary>Initializes a new instance of the <see cref="NotificationBuilder{T}"/>class.</summary>
        /// <param name="component">The component.</param>
        public NotificationBuilder(Notification component)
            : base(component)
        { }
        
        /// <summary>Configures the position settings of the popup notifications.</summary>
        public NotificationBuilder Position(Action<NotificationPositionSettingsBuilder> configurator)
        {
            var builder = new NotificationPositionSettingsBuilder(Component.Position, Component.ViewContext);

            configurator(builder);

            return this;
        }

        /// <summary>Sets the stacking direction when multiple notifications are displayed by a single widget instance.</summary>
        public NotificationBuilder Stacking(NotificationStackingSettings value)
        {
            Component.Stacking = value;

            return this;
        }

        /// <summary>Sets whether notifications should be hidden by clicking anywhere on their content.</summary>
        public NotificationBuilder HideOnClick(bool value)
        {
            Component.HideOnClick = value;

            return this;
        }

        /// <summary>Sets whether notifications should display a hide button (when using default templates only).</summary>
        public NotificationBuilder Button(bool value)
        {
            Component.Button = value;

            return this;
        }

        /// <summary>Sets the time in milliseconds, after which a notifications can be hidden by the user via clicking.</summary>
        public NotificationBuilder AllowHideAfter(int value)
        {
            Component.AllowHideAfter = value;

            return this;
        }

        /// <summary>Sets the time in milliseconds, after which a notifications is hidden automatically.</summary>
        public NotificationBuilder AutoHideAfter(int value)
        {
            Component.AutoHideAfter = value;

            return this;
        }

        /// <summary>Defines a CSS selector, which points to the element that will hold the notifications to be displayed.</summary>
        public NotificationBuilder AppendTo(string value)
        {
            Component.AppendTo = value;

            return this;
        }

        /// <summary>Defines the width of the notifications to be displayed.</summary>
        public NotificationBuilder Width(string value)
        {
            Component.Width = value;

            return this;
        }

        /// <summary>Defines the width of the notifications to be displayed.</summary>
        public NotificationBuilder Width(int value)
        {
            Component.Width = value.ToString() + "px";

            return this;
        }

        /// <summary>Defines the height of the notifications to be displayed.</summary>
        public NotificationBuilder Height(string value)
        {
            Component.Height = value;

            return this;
        }

        /// <summary>Defines the height of the notifications to be displayed.</summary>
        public NotificationBuilder Height(int value)
        {
            Component.Height = value.ToString() + "px";

            return this;
        }

        /// <summary>Configures the Notification templates.</summary>
        public NotificationBuilder Templates(Action<NotificationTemplateFactory> configurator)
        {
            var builder = new NotificationTemplateFactory(Component, Component.ViewContext);

            configurator(builder);

            return this;
        }

        /// <summary>
        /// Configures the animation effects of the displayed notifications.
        /// </summary>
        /// <param name="animationAction">The action that configures the animation.</param>
        public NotificationBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {
            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }

        /// <summary>Configures the client-side events.</summary>
        /// <param name="events">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Notification()
        ///            .Name("Notification")
        ///            .Events(events =>
        ///                events.Click("onClick"))
        /// %&gt;
        /// </code>
        /// </example>
        public NotificationBuilder Events(Action<NotificationEventBuilder> events)
        {
            events(new NotificationEventBuilder(Component.Events));

            return this;
        }

        /// <summary>Sets the Notification HTML tag. A SPAN tag is used by default.</summary>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Notification()
        ///            .Name("Notification")
        ///            .Tag("div")
        /// %&gt;
        /// </code>
        /// </example>
        public NotificationBuilder Tag(string tag)
        {
            Component.Tag = tag;

            return this;
        }

    }
}
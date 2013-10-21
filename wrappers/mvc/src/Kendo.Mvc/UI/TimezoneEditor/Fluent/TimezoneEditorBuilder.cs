namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="TimezoneEditor"/>.
    /// </summary>
    public class TimezoneEditorBuilder : WidgetBuilderBase<TimezoneEditor, TimezoneEditorBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="TimezoneEditorBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public TimezoneEditorBuilder(TimezoneEditor component)
            : base(component)
        {
        }

        /// <summary>
        /// The value of the TimezoneEditor. Must be valid recurrence rule.
        /// </summary>
        /// <param name="value">The value</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().TimezoneEditor()
        ///     .Name(&quot;timezoneEditor&quot;)
        ///     .Value("Etc/UTC")
        /// )
        /// </code>
        /// </example>
        public TimezoneEditorBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }

        /// <summary>
        /// Sets the events configuration of the scheduler.
        /// </summary>
        /// <param name="clientEventsAction">The lambda which configures the timezoneEditor events</param>
        /// <example>
        /// <code lang="Razor">
        ///  &lt;%= Html.Kendo().TimezoneEditor()
        ///             .Name(&quot;TimezoneEditor&quot;)
        ///             .Events(events =&gt;
        ///                 events.Change(&quot;change&quot;)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TimezoneEditorBuilder Events(Action<TimezoneEditorEventBuilder> clientEventsAction)
        {
            clientEventsAction(new TimezoneEditorEventBuilder(Component.Events));

            return this;
        }
    }
}

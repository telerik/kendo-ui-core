namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="RecurrenceEditor"/>.
    /// </summary>
    public class RecurrenceEditorBuilder : WidgetBuilderBase<RecurrenceEditor, RecurrenceEditorBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RecurrenceEditorBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public RecurrenceEditorBuilder(RecurrenceEditor component)
            : base(component)
        {
        }

        /// <summary>
        /// The current start of the RecurrenceEditor. Used to determine the start day. The minimum date available in the "Until" DatePicker.
        /// </summary>
        /// <param name="start">The start</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().RecurrenceEditor()
        ///     .Name(&quot;recurrenceEditor&quot;)
        ///     .Start(new DateTime(2013, 6, 13))
        /// )
        /// </code>
        /// </example>
        public RecurrenceEditorBuilder Start(DateTime start)
        {
            Component.Start = start;

            return this;
        }

        /// <summary>
        /// The first week day (by index) of the RecurrenceEditor. Default is 0.
        /// </summary>
        /// <param name="firstWeekDay">The firstWeekDay</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().RecurrenceEditor()
        ///     .Name(&quot;recurrenceEditor&quot;)
        ///     .FirstWeekDay(6)
        /// )
        /// </code>
        /// </example>
        public RecurrenceEditorBuilder FirstWeekDay(int firstWeekDay)
        {
            Component.FirstWeekDay = firstWeekDay;

            return this;
        }

        /// <summary>
        /// The timezone of the RecurrenceEditor.
        /// </summary>
        /// <param name="timezone">The timezone</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().RecurrenceEditor()
        ///     .Name(&quot;recurrenceEditor&quot;)
        ///     .Timezone("Etc/UTC")
        /// )
        /// </code>
        /// </example>
        public RecurrenceEditorBuilder Timezone(string timezone)
        {
            Component.Timezone = timezone;

            return this;
        }

        /// <summary>
        /// The value of the RecurrenceEditor. Must be valid recurrence rule.
        /// </summary>
        /// <param name="value">The value</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().RecurrenceEditor()
        ///     .Name(&quot;recurrenceEditor&quot;)
        ///     .Value("FREQ=WEEKLY;BYDAY=TU,TH")
        /// )
        /// </code>
        /// </example>
        public RecurrenceEditorBuilder Value(string value)
        {
            Component.Value = value;

            return this;
        }

        /// <summary>
        /// The Frequencies of the RecurrenceEditor.
        /// </summary>
        /// <param name="addFrequencyAction">The addFrequencyAction</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().RecurrenceEditor()
        ///     .Name(&quot;recurrenceEditor&quot;)
        ///     .Frequency(frequency => frequency
        ///         .Add(RecurrenceEditorFrequency.Never)
        ///         .Add(RecurrenceEditorFrequency.Daily)
        ///         .Add(RecurrenceEditorFrequency.Weekly)
        ///     )
        /// )
        /// </code>
        /// </example>
        public RecurrenceEditorBuilder Frequency(Action<RecurrenceEditorFrequencyBuilder> addFrequencyAction)
        {
            RecurrenceEditorFrequencyBuilder builder = new RecurrenceEditorFrequencyBuilder(Component);

            addFrequencyAction(builder);

            return this;
        }

        /// <summary>
        /// The IEnumerable collection of frequencies for the RecurrenceEditor.
        /// </summary>
        /// <param name="frequencies">The frequencies</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().RecurrenceEditor()
        ///     .Name(&quot;recurrenceEditor&quot;)
        ///     .Frequency(new List&lt;RecurrenceEditorFrequency&gt;() {
        ///         RecurrenceEditorFrequency.Never,
        ///         RecurrenceEditorFrequency.Daily,
        ///         RecurrenceEditorFrequency.Weekly,
        ///     }))
        /// </code>
        /// </example>
        public RecurrenceEditorBuilder Frequency(IEnumerable<RecurrenceEditorFrequency> frequencies)
        {
            foreach (var frequency in frequencies)
            {
                Component.Frequencies.Add(frequency);
            }

            return this;
        }

        /// <summary>
        /// Sets the events configuration of the scheduler.
        /// </summary>
        /// <param name="clientEventsAction">The lambda which configures the recurrenceEditor events</param>
        /// <example>
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().RecurrenceEditor()
        ///             .Name(&quot;RecurrenceEditor&quot;)
        ///             .Events(events =&gt;
        ///                 events.Change(&quot;change&quot;)
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public RecurrenceEditorBuilder Events(Action<RecurrenceEditorEventBuilder> clientEventsAction)
        {
            clientEventsAction(new RecurrenceEditorEventBuilder(Component.Events));

            return this;
        }

    }
}

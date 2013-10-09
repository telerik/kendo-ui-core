namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Creates views for the <see cref="Scheduler{TModel}" /> class.
    /// </summary>
    public class RecurrenceEditorFrequencyBuilder : IHideObjectMembers
    {
        private readonly RecurrenceEditor container;

        /// <summary>
        /// Initializes a new instance of the <see cref="RecurrenceEditorFrequencyBuilder"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public RecurrenceEditorFrequencyBuilder(RecurrenceEditor container)
        {
            this.container = container;
        }

        /// <summary>
        /// Adds RecurrenceEditorFrequency to the RecurrenceEditor.
        /// </summary>
        /// <param name="frequency">The frequency</param>
        public RecurrenceEditorFrequencyBuilder Add(RecurrenceEditorFrequency frequency)
        {
            container.Frequencies.Add(frequency);

            return this;
        }

    }
}

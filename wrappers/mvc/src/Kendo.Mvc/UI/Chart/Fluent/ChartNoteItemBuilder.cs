using System;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart note.
    /// </summary>
    public class ChartNoteItemBuilder : ChartNoteBuilder
    {
        private readonly ChartNoteItem note;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteItemBuilder" /> class.
        /// </summary>
        /// <param name="ChartNoteItem">The data labels configuration.</param>
        public ChartNoteItemBuilder(ChartNoteItem note)
            : base (note)
        {
            this.note = note;
        }

        /// <summary>
        /// Sets the note value.
        /// </summary>
        /// <param name="value">The value of the note.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(note => note
        ///                    .Items(items =>
        ///                    {
        ///                        items.Add().Value(1);
        ///                        items.Add().Value(2);
        ///                    })
        ///               )
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteItemBuilder Value(double? value)
        {
            note.Value = value;
            return this;
        }
    }
}
using System;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart note.
    /// </summary>
    public class ChartAxisNoteItemBuilder<T> : ChartNoteBuilder
        where T : struct
    {
        private readonly ChartAxisNoteItem<T> note;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisNoteItemBuilder" /> class.
        /// </summary>
        /// <param name="ChartAxisNoteItem">The data labels configuration.</param>
        public ChartAxisNoteItemBuilder(ChartAxisNoteItem<T> note)
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
        ///                    .Data(items =>
        ///                    {
        ///                        data.Add().Value(1);
        ///                        data.Add().Value(2);
        ///                    })
        ///               )
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisNoteItemBuilder<T> Value(T? value)
        {
            note.Value = value;
            return this;
        }
    }
}
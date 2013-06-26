using System;
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart note.
    /// </summary>
    public class ChartNoteBuilder
    {
        private readonly ChartNote note;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteBuilder" /> class.
        /// </summary>
        /// <param name="note">The note configuration.</param>
        public ChartNoteBuilder(ChartNote note)
        {
            this.note = note;
        }

        /// <summary>
        /// Sets the line configuration of the note
        /// </summary>
        /// <param name="configurator">The line configuration.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(note => note
        ///                     .Line(line => line.Width(2))
        ///               )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteBuilder Line(Action<ChartNoteLineBuilder> configurator)
        {
            configurator(new ChartNoteLineBuilder(note.Line));
            return this;
        }

        /// <summary>
        /// Sets the label configuration of the note
        /// </summary>
        /// <param name="configurator">The label configurator.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(note => note
        ///                    .Label(label => label.Position(ChartNoteLabelPosition.Inside))
        ///               )
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteBuilder Label(Action<ChartNoteLabelBuilder> configurator)
        {
            configurator(new ChartNoteLabelBuilder(note.Label));
            return this;
        }

        /// <summary>
        /// Sets the icon configuration of the note
        /// </summary>
        /// <param name="configurator">The icon configuration.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(note => note.Icon(icon => icon.Size(10)))
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteBuilder Icon(Action<ChartMarkersBuilder> configurator)
        {
            configurator(new ChartMarkersBuilder(note.Icon));
            return this;
        }

        /// <summary>
        /// Sets the note position.
        /// </summary>
        /// <param name="position">The note position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(note => note.Position(ChartNotePosition.Left))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteBuilder Position(ChartNotePosition? position)
        {
            note.Position = position;
            return this;
        }
    }
}
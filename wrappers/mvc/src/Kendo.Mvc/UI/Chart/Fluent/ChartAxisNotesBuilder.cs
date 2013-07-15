namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring notes of the axis.
    /// </summary>
    public class ChartAxisNotesBuilder
    {
        /// <summary>
        /// Gets or sets the axis.
        /// </summary>
        /// <value>The axis.</value>
        public ChartAxisNotes Notes
        {
            get;
            private set;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisNotesBuilder"/> class.
        /// </summary>
        /// <param name="notes">The notes.</param>
        public ChartAxisNotesBuilder(ChartAxisNotes notes)
        {
            Notes = notes;
        }

        /// <summary>
        /// Defines the items.
        /// </summary>
        /// <param name="Data">The data of the notes.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(notes => notes
        ///                    .Data(data => {
        ///                        data.Add().Value(1);
        ///                        data.Add().Value(2);
        ///                    })
        ///               )
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example> 
        /// </code>
        /// </example>
        public ChartAxisNotesBuilder Data(Action<ChartAxisNotesFactory> configurator)
        {
            var factory = new ChartAxisNotesFactory(Notes.Data);

            configurator(factory);

            return this;
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
        ///               .Note(notes => notes
        ///                     .Line(line => line.Width(2))
        ///               )
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisNotesBuilder Line(Action<ChartNoteLineBuilder> configurator)
        {
            configurator(new ChartNoteLineBuilder(Notes.Line));
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
        ///               .Note(notes => notes
        ///                    .Label(label => label.Position(ChartNoteLabelPosition.Inside))
        ///               )
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisNotesBuilder Label(Action<ChartNoteLabelBuilder> configurator)
        {
            configurator(new ChartNoteLabelBuilder(Notes.Label));
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
        ///               .Note(notes => notes.Icon(icon => icon.Size(10)))
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisNotesBuilder Icon(Action<ChartMarkersBuilder> configurator)
        {
            configurator(new ChartMarkersBuilder(Notes.Icon));
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
        ///               .Note(notes => notes.Position(ChartNotePosition.Left))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartAxisNotesBuilder Position(ChartNotePosition? position)
        {
            Notes.Position = position;
            return this;
        }
    }
}
namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Defines the fluent interface for configuring notes of the axis.
    /// </summary>
    /// <typeparam name="TAxis"></typeparam>
    /// <typeparam name="TValue"></typeparam>
    public class ChartAxisNotesBuilder<T>
        where T : struct
    {
        /// <summary>
        /// Gets or sets the axis.
        /// </summary>
        /// <value>The axis.</value>
        public ChartAxisNotes<T> Notes
        {
            get;
            private set;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisNotesBuilder{T}"/> class.
        /// </summary>
        /// <param name="axis">The axis.</param>
        public ChartAxisNotesBuilder(ChartAxisNotes<T> notes)
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
        public ChartAxisNotesBuilder<T> Data(Action<ChartAxisNotesFactory<T>> configurator)
        {
            var factory = new ChartAxisNotesFactory<T>(Notes.Data);

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
        public ChartAxisNotesBuilder<T> Line(Action<ChartNoteLineBuilder> configurator)
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
        public ChartAxisNotesBuilder<T> Label(Action<ChartNoteLabelBuilder> configurator)
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
        public ChartAxisNotesBuilder<T> Icon(Action<ChartMarkersBuilder> configurator)
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
        public ChartAxisNotesBuilder<T> Position(ChartNotePosition? position)
        {
            Notes.Position = position;
            return this;
        }
    }
}
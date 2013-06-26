namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart note line.
    /// </summary>
    public class ChartNoteLineBuilder
    {
        private readonly ChartNoteLine line;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteLineBuilder" /> class.
        /// </summary>
        /// <param name="line">The connectors configuration.</param>
        public ChartNoteLineBuilder(ChartNoteLine line)
        {
            this.line = line;
        }

        /// <summary>
        /// Sets the line width
        /// </summary>
        /// <param name="width">The line width.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bar(s => s.Sales)
        ///               .Note(note => note.Line(line => line.Width(2)))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteLineBuilder Width(int width)
        {
            line.Width = width;
            return this;
        }

        /// <summary>
        /// Sets the line color
        /// </summary>
        /// <param name="color">The line color.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bar(s => s.Sales)
        ///               .Note(note => note.Line(line => line.Color("red")))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteLineBuilder Color(string color)
        {
            line.Color = color;
            return this;
        }

        /// <summary>
        /// Sets the connectors padding
        /// </summary>
        /// <param name="padding">The connectors padding.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .Series(series => series
        ///               .Bar(s => s.Sales)
        ///               .Note(note => note.Line(line => line.Length(15)))
        ///           )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteLineBuilder Length(int length)
        {
            line.Length = length;
            return this;
        }
    }
}
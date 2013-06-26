namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart note label.
    /// </summary>
    public class ChartNoteLabelBuilder : ChartLabelsBuilderBase<ChartNoteLabelBuilder>
    {
        private readonly ChartNoteLabel label;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartNoteLabelBuilder" /> class.
        /// </summary>
        /// <param name="ChartNoteLabel">The data labels configuration.</param>
        public ChartNoteLabelBuilder(ChartNoteLabel label)
            : base(label)
        {
            this.label = label;
        }

        /// <summary>
        /// Sets the labels position
        /// </summary>
        /// <param name="position">The labels position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(note => note
        ///                    .Label(label => label
        ///                         .Position(ChartNoteLabelPosition.Inside)
        ///                    )
        ///               )
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteLabelBuilder Position(ChartNoteLabelPosition position)
        {
            label.Position = position;
            return this;
        }

        /// <summary>
        /// Sets the labels position
        /// </summary>
        /// <param name="text">The labels position.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Chart()
        ///           .Name("Chart")
        ///           .ValueAxis(a => a.Numeric()
        ///               .Note(note => note
        ///                    .Data(data =>
        ///                    {
        ///                        data.Add().Value(1).Text("A");
        ///                        data.Add().Value(2).Text("B");
        ///                    })
        ///               )
        ///            )
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>        
        public ChartNoteLabelBuilder Text(string text)
        {
            label.Text = text;
            return this;
        }
    }
}
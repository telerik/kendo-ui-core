namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the chart labels.
    /// </summary>
    public class ChartAxisLabelsBuilder : ChartLabelsBuilderBase<ChartAxisLabelsBuilder>
    {
        private readonly ChartAxisLabels labels;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisLabelsBuilder" /> class.
        /// </summary>
        /// <param name="chartLabels">The labels configuration.</param>
        public ChartAxisLabelsBuilder(ChartAxisLabels chartLabels)
            : base(chartLabels)
        {
            labels = chartLabels;
        }

        /// <summary>
        /// Renders the axis labels on the other side.
        /// </summary>
        /// <param name="mirror">A value indicating whether to render the axis labels on the other side.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .ValueAxis(axis => axis
        ///                .Numeric().Labels(labels => labels.Mirror(true))
        ///            )
        ///            .CategoryAxis(axis => axis
        ///                .Categories(s => s.DateString)
        ///                // Move the value axis to the right side
        ///                .AxisCrossingValue(5)
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartAxisLabelsBuilder Mirror(bool mirror)
        {
            labels.Mirror = mirror;

            return this;
        }

        /// <summary>
        /// Label rendering step.
        /// </summary>
        /// <param name="step">A value indicating the step at which labels are rendered.
        /// Every n-th label is rendered where n is the step.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(product => product.Name)
        ///                .Labels(labels => labels.Step(2))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartAxisLabelsBuilder Step(int step)
        {
            labels.Step = step;

            return this;
        }

        /// <summary>
        /// Label rendering skip.
        /// </summary>
        /// <param name="skip">Skips rendering the first n labels.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Chart()
        ///            .Name("Chart")
        ///            .CategoryAxis(axis => axis
        ///                .Categories(product => product.Name)
        ///                .Labels(labels => labels.Skip(2))
        ///            )
        /// %&gt;
        /// </code>
        /// </example>
        public ChartAxisLabelsBuilder Skip(int skip)
        {
            labels.Skip = skip;

            return this;
        }
    }
}
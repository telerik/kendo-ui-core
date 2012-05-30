namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the options of the chart point labels
    /// </summary>
    public class ChartPointLabels : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartPointLabels" /> class.
        /// </summary>
        public ChartPointLabels()
        {
        }

        /// <summary>
        /// Gets or sets the label position.
        /// </summary>
        /// <remarks>
        /// The default value is <see cref="ChartPointLabelsPosition.Above"/> for clustered series and
        /// <see cref="ChartPointLabelsPosition.Above"/> for stacked series.
        /// </remarks>
        public ChartPointLabelsPosition? Position
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public override IChartSerializer CreateSerializer()
        {
            return new ChartPointLabelsSerializer(this);
        }
    }
}
namespace Kendo.Mvc.UI
{
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

        public override IChartSerializer CreateSerializer()
        {
            return new ChartPointLabelsSerializer(this);
        }
    }
}
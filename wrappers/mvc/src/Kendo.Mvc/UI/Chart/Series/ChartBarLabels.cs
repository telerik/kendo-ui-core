namespace Kendo.Mvc.UI
{
    public class ChartBarLabels : ChartLabels
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBarLabels" /> class.
        /// </summary>
        public ChartBarLabels()
        {
        }

        /// <summary>
        /// Gets or sets the label position.
        /// </summary>
        /// <remarks>
        /// The default value is <see cref="ChartBarLabelsPosition.OutsideEnd"/> for clustered series and
        /// <see cref="ChartBarLabelsPosition.InsideEnd"/> for stacked series.
        /// </remarks>
        public ChartBarLabelsPosition? Position
        {
            get;
            set;
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartBarLabelsSerializer(this);
        }
    }
}
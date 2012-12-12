namespace Kendo.Mvc.UI
{
    public class ChartSeriesHighlight
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSeriesHighlight" /> class.
        /// </summary>
        public ChartSeriesHighlight()
        {
            Border = new ChartElementBorder();
            Line = new ChartLine();
        }

        /// <summary>
        /// Gets or sets the highlight opacity
        /// </summary>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the highlight opacity
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the highlight border.
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the highlight line configuration
        /// </summary>
        public ChartLine Line
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartSeriesHighlightSerializer(this);
        }
    }
}
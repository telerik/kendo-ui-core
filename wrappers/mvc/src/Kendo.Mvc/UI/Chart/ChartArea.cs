namespace Kendo.Mvc.UI
{
    public class ChartArea
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartArea" /> class.
        /// </summary>
        public ChartArea()
        {
            Margin = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the Chart area background.
        /// </summary>
        /// <value>
        /// The Chart area background.
        /// </value>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Chart area border.
        /// </summary>
        /// <value>
        /// The Chart area border.
        /// </value>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Chart area margin.
        /// </summary>
        /// <value>
        /// The Chart area margin.
        /// </value>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Chart area width.
        /// </summary>
        /// <value>
        /// The Chart area width.
        /// </value>
        public int? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the Chart area height.
        /// </summary>
        /// <value>
        /// The Chart area height.
        /// </value>
        public int? Height
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartAreaSerializer(this);
        }
    }
}
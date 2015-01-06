namespace Kendo.Mvc.UI
{
    public class ChartLegend
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLegend" /> class.
        /// </summary>
        public ChartLegend()
        {
            Margin = new ChartSpacing();
            Padding = new ChartSpacing();
            Border = new ChartElementBorder();
            Labels = new ChartLegendLabels();
        }

        /// <summary>
        /// Gets or sets the legend font.
        /// </summary>
        /// <value>
        /// Specify a font in CSS format. For example "16px Arial,Helvetica,sans-serif".
        /// </value>
        public string Font
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend labels color.
        /// </summary>
        /// <value>
        /// Specify the color of the labels.
        /// </value>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend position.
        /// </summary>
        /// <remarks>
        /// The default value is <see cref="ChartLegendPosition.Right"/>
        /// </remarks>
        public ChartLegendPosition? Position
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend X-offset from its position.
        /// </summary>
        public int? OffsetX
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend Y-offset from its position.
        /// </summary>
        public int? OffsetY
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating if the legend is visible
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend margin
        /// </summary>
        public ChartSpacing Margin
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend margin
        /// </summary>
        public ChartSpacing Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend background color
        /// </summary>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend labels
        /// </summary>
        public ChartLegendLabels Labels
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend orientation
        /// </summary>
        public ChartLegendOrientation? Orientation
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend width
        /// </summary>
        public int? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend height
        /// </summary>
        public int? Height
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the legend reverse 
        /// </summary>
        public bool? Reverse
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartLegendSerializer(this);
        }
    }
}
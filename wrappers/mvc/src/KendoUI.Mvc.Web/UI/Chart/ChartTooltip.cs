namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents the chart data point tootlip
    /// </summary>
    public class ChartTooltip
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartTooltip" /> class.
        /// </summary>
        public ChartTooltip()
        {
            Padding = new ChartSpacing();
            Border = new ChartElementBorder();
        }

        /// <summary>
        /// Gets or sets the tooltip font.
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
        /// Gets or sets a value indicating if the tooltip is visible
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tooltip margin
        /// </summary>
        public ChartSpacing Padding
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tooltip border
        /// </summary>
        public ChartElementBorder Border
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tooltip background.
        /// </summary>
        /// <value>
        /// The label background.
        /// </value>
        public string Background
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tooltip color.
        /// </summary>
        /// <value>
        /// The label color.
        /// </value>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tooltip format.
        /// </summary>
        /// <value>
        /// The label format.
        /// </value>
        public string Format
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tooltip template.
        /// </summary>
        /// <value>
        /// The tooltip template.
        /// </value>
        public string Template
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the tooltip opacity.
        /// </summary>
        /// <value>
        /// The tooltip opacity.
        /// </value>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartTooltipSerializer(this);
        }
    }
}
namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Represents chart line styling
    /// </summary>
    public class ChartLine
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLine" /> class.
        /// </summary>
        public ChartLine(int width, string color, ChartDashType dashType, bool visible)
        {
            Width = width;
            Color = color;
            Visible = visible;
            DashType = dashType;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLine" /> class.
        /// </summary>
        public ChartLine()
        {
        }

        /// <summary>
        /// Gets or sets the line width.
        /// </summary>
        public int? Width
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the line opacity.
        /// </summary>
        public double? Opacity
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the line color.
        /// </summary>
        public string Color
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the line visibility.
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the line dash type.
        /// </summary>
        public ChartDashType? DashType
        {
            get;
            set;
        }

        /// <summary>
        /// Creates a serializer
        /// </summary>
        public IChartSerializer CreateSerializer()
        {
            return new ChartLineSerializer(this);
        }
    }
}
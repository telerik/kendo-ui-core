namespace Kendo.Mvc.UI
{
    public abstract class ChartLineBase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineBase" /> class.
        /// </summary>
        public ChartLineBase(int width, string color, ChartDashType dashType, bool visible)
        {
            Width = width;
            Color = color;
            Visible = visible;
            DashType = dashType;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartLineBase" /> class.
        /// </summary>
        public ChartLineBase()
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

        public abstract IChartSerializer CreateSerializer();
    }
}
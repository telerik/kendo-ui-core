namespace Kendo.Mvc.UI
{
    public class ChartSelectionMousewheel
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSelectionMousewheel" /> class.
        /// </summary>
        public ChartSelectionMousewheel()
        {
        }

        /// <summary>
        /// Gets or sets a value that indicates
        /// if the mousewheel direction should be reversed.
        /// </summary>
        /// <value>
        /// The mousewheel reverse flag.
        /// </value>
        public bool? Reverse
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets zoom direction settings.
        /// </summary>
        /// <value>
        /// The zoom direction settings.
        /// </value>
        public ChartZoomDirection? Zoom
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartSelectionMousewheelSerializer(this);
        }
    }
}
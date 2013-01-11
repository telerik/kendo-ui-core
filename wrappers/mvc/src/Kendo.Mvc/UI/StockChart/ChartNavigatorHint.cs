namespace Kendo.Mvc.UI
{
    public class ChartNavigatorHint
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="NavigatorHint" /> class.
        /// </summary>
        public ChartNavigatorHint()
        {
        }

        /// <summary>
        /// Gets or sets the hint format.
        /// </summary>
        /// <value>
        /// The hint format.
        /// </value>
        public string Format
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the hint template.
        /// </summary>
        /// <value>
        /// The hint template.
        /// </value>
        public string Template
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets a value indicating if the hint is visible
        /// </summary>
        public bool? Visible
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartNavigatorHintSerializer(this);
        }
    }
}
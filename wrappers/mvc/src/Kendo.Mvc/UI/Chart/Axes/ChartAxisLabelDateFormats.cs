namespace Kendo.Mvc.UI
{
    public class ChartAxisLabelsDateFormats
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartAxisLabels" /> class.
        /// </summary>
        public ChartAxisLabelsDateFormats()
        {
        }

        /// <summary>
        /// Date format to use when the base date unit is <see cref="ChartAxisBaseUnit.Hours"/>.
        /// </summary>
        public string Hours
        {
            get;
            set;
        }

        /// <summary>
        /// Date format to use when the base date unit is <see cref="ChartAxisBaseUnit.Days"/>.
        /// </summary>
        public string Days
        {
            get;
            set;
        }

        /// <summary>
        /// Date format to use when the base date unit is <see cref="ChartAxisBaseUnit.Minutes"/>.
        /// </summary>
        public string Minutes
        {
            get;
            set;
        }

        /// <summary>
        /// Date format to use when the base date unit is <see cref="ChartAxisBaseUnit.Months"/>.
        /// </summary>
        public string Months
        {
            get;
            set;
        }

        /// <summary>
        /// Date format to use when the base date unit is <see cref="ChartAxisBaseUnit.Weeks"/>.
        /// </summary>
        public string Weeks
        {
            get;
            set;
        }

        /// <summary>
        /// Date format to use when the base date unit is <see cref="ChartAxisBaseUnit.Years"/>.
        /// </summary>
        public string Years
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartAxisLabelsDateFormatsSerializer(this);
        }
    }
}
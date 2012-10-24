using System;

namespace Kendo.Mvc.UI
{
    public class ChartDateSelection
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDateSelection" /> class.
        /// </summary>
        public ChartDateSelection()
        {
        }

        /// <summary>
        /// The lower boundary of the range.
        /// </summary>
        public DateTime? From
        {
            get;
            set;
        }

        /// <summary>
        /// The upper boundary of the range.
        /// </summary>
        public DateTime? To
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartDateSelectionSerializer(this);
        }
    }
}
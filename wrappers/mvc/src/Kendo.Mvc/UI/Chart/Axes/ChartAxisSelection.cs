using System;

namespace Kendo.Mvc.UI
{
    public class ChartAxisSelection
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDateSelection" /> class.
        /// </summary>
        public ChartAxisSelection()
        {
            Mousewheel = new ChartSelectionMousewheel();
        }

        /// <summary>
        /// The lower boundary of the range.
        /// </summary>
        public object From
        {
            get;
            set;
        }

        /// <summary>
        /// The upper boundary of the range.
        /// </summary>
        public object To
        {
            get;
            set;
        }

        /// <summary>
        /// Mousewheel zoom settings
        /// </summary>
        public ChartSelectionMousewheel Mousewheel
        {
            get;
            set;
        }

        public IChartSerializer CreateSerializer()
        {
            return new ChartAxisSelectionSerializer(this);
        }
    }
}
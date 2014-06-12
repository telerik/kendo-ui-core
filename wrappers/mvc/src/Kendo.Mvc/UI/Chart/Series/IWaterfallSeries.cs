using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public interface IWaterfallSeries : IBarSeries
    {
        /// <summary>
        /// Gets the model summary type member name.
        /// </summary>
        /// <value>The model summary type member name.</value>
        string SummaryMember
        {
            get;
            set;
        }
    }
}

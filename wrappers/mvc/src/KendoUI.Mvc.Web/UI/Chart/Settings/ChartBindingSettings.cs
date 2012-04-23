// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Represents the chart binding settings
    /// </summary>
    public class ChartBindingSettings : IClientSerializable
    {
        private readonly IChart chart;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartBindingSettings" /> class.
        /// </summary>
        /// <param name="chart">The chart.</param>
        public ChartBindingSettings(IChart chart)
        {
            this.chart = chart;
            Select = new RequestSettings();
        }

        /// <summary>
        /// Gets or sets a value indicating if the binding is enabled
        /// </summary>
        public bool Enabled
        {
            get;
            set;
        }

        /// <summary>
        /// The request settings for the Select operation
        /// </summary>
        public RequestSettings Select
        {
            get;
            private set;
        }

        /// <summary>
        /// Serializes the binding settings to the specified writer
        /// </summary>
        /// <param name="key">The settings key</param>
        /// <param name="writer">The writer</param>
        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled)
            {
                var readUrl = chart.UrlGenerator.Generate(chart.ViewContext.RequestContext, Select);
                writer.AppendObject(key, new
                {
                    transport = new
                    {
                        read = new
                        {
                            url = readUrl,
                            type = "POST"
                        }
                    }
                });
            }
        }
    }
}

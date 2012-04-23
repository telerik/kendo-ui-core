// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Telerik.Web.Mvc.UI;

    /// <summary>
    /// Defines the fluent interface for configuring data binding.
    /// </summary>
    public class ChartDataBindingConfigurationBuilder : IHideObjectMembers
    {
        private readonly ChartDataBindingSettings configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="ChartDataBindingConfigurationBuilder"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public ChartDataBindingConfigurationBuilder(ChartDataBindingSettings configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Use it to configure Ajax binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Chart()
        ///             .Name("Chart")
        ///             .DataBinding(dataBinding => 
        ///             {
        ///                 dataBinding.Ajax().Select("SalesData", "Chart");
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public virtual ChartBindingSettingsBuilder Ajax()
        {
            configuration.Ajax.Enabled = true;
            
            return new ChartBindingSettingsBuilder(configuration.Ajax);
        }
    }
}

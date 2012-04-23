

namespace KendoUI.Mvc.UI.Fluent
{
    using KendoUI.Mvc.UI;

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

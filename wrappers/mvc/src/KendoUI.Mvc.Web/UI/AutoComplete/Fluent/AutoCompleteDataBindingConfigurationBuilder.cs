// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="AutoCompleteDataBindingConfiguration"/> data binding.
    /// </summary>
    public class AutoCompleteDataBindingConfigurationBuilder : IHideObjectMembers
    {
        private readonly IDropDownDataBindingConfiguration configuration;

        /// <summary>
        /// Initializes a new instance of the <see cref="AutoCompleteDataBindingConfigurationBuilder"/> class.
        /// </summary>
        /// <param name="settings">The configuration.</param>
        public AutoCompleteDataBindingConfigurationBuilder(IDropDownDataBindingConfiguration configuration)
        {
            this.configuration = configuration;
        }

        /// <summary>
        /// Use it to configure Ajax binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .DataBinding(dataBinding => dataBinding
        ///                .Ajax().Select("_AjaxLoading", "TreeView")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteBindingSettingsBuilder Ajax()
        {
            configuration.Ajax.Enabled = true;

            return new AutoCompleteBindingSettingsBuilder(configuration.Ajax as AutoCompleteBindingSettings);
        }

        /// <summary>
        /// Use it to configure web service binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().ComboBox()
        ///             .Name("ComboBox")
        ///             .DataBinding(dataBinding => dataBinding
        ///                .WebService().Select("~/Models/ProductDDI.asmx/GetProducts")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public AutoCompleteWebServiceBindingSettingsBuilder WebService()
        {
            configuration.WebService.Enabled = true;

            return new AutoCompleteWebServiceBindingSettingsBuilder(configuration.WebService as AutoCompleteBindingSettings);
        }
    }
}

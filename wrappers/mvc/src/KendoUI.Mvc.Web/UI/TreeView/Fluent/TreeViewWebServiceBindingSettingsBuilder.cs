// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{

    /// <summary>
    /// Defines the fluent interface for configuring the treeview webservice.
    /// </summary>
    public class TreeViewWebServiceBindingSettingsBuilder : IHideObjectMembers
    {
        private TreeViewBindingSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreeViewWebServiceBindingSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public TreeViewWebServiceBindingSettingsBuilder(TreeViewBindingSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Specify the web service url for loading data
        /// </summary>
        /// <param name="value">The web service url</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .DataBinding(dataBinding => dataBinding
        ///                .WebService().Select("~/Models/Employees.asmx/GetEmployees")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public TreeViewWebServiceBindingSettingsBuilder Select(string webServiceUrl)
        {
            settings.Select.Url = webServiceUrl;

            return this;
        }

        /// <summary>
        /// Enables / disables web service functionality.
        /// </summary>
        /// <param name="value">Whether to enable or to disable the web service.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().TreeView()
        ///             .Name("TreeView")
        ///             .DataBinding(dataBinding => dataBinding
        ///                .Ajax().Enabled(true).Select("_AjaxLoading", "TreeView")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable ajax based on certain conditions.
        /// </remarks>
        public virtual TreeViewWebServiceBindingSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}

// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Grid{T}"/> ajax settings
    /// </summary>
    public class GridAjaxSettingsBuilder : GridRequestSettingsBuilderBase<RequestSettings, GridAjaxSettingsBuilder>, IHideObjectMembers
    {
        private readonly GridBindingSettings ajaxSettings;
        /// <summary>
        /// Initializes a new instance of the <see cref="GridAjaxSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridAjaxSettingsBuilder(GridBindingSettings settings) : base(settings.Select)
        {
            ajaxSettings = settings;
        }

        /// <summary>
        /// Enables or disables Ajax binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .Ajax(ajax => ajax.Enabled((bool)ViewData["enableAjax"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable ajax based on certain conditions.
        /// </remarks>
        public GridAjaxSettingsBuilder Enabled(bool value)
        {
            ajaxSettings.Enabled = value;
            
            return this;
        }
    }
}
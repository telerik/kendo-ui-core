// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Grid{T}.WebService"/>.
    /// </summary>
    public class GridWebServiceSettingsBuilder : IHideObjectMembers
    {
        private readonly GridBindingSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridWebServiceSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridWebServiceSettingsBuilder(GridBindingSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Sets the url of the web service which the <see cref="Grid"/> will request for data.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .WebService(webService => webService.Url("~/Models/Orders.asmx/GetOrders")))
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GridWebServiceSettingsBuilder Url(string value)
        {
            Guard.IsNotNullOrEmpty(value, "value");

            settings.Select.Url = value;

            return this;
        }

        /// <summary>
        /// Enables or disables web service binding.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .WebService(webService => webService.Enabled((bool)ViewData["enableWebServiceBinding"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable web service binding based on certain conditions.
        /// </remarks>
        public virtual GridWebServiceSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}
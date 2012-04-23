// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring <see cref="Grid{T}.ColumnContextMenu"/>
    /// </summary>
    public class GridColumnContextMenuSettingsBuilder : IHideObjectMembers
    {
        private readonly GridColumnContextMenuSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="GridColumnContextMenuSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridColumnContextMenuSettingsBuilder(GridColumnContextMenuSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables column context menu.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Grid(Model)
        ///             .Name("Grid")
        ///             .ColumnContextMenu(setting => setting.Enabled((bool)ViewData["enableColumnContextMenu"]))
        /// %&gt;
        /// </code>
        /// </example>
        /// <remarks>
        /// The Enabled method is useful when you need to enable column context menu based on certain conditions.
        /// </remarks>
        public virtual GridColumnContextMenuSettingsBuilder Enabled(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}

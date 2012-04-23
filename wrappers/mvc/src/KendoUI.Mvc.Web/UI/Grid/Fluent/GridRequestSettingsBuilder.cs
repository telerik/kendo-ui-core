// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Grid{T}.ServerBinding"/>
    /// </summary>
    public class GridRequestSettingsBuilder : GridRequestSettingsBuilderBase<RequestSettings, GridRequestSettingsBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="GridRequestSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public GridRequestSettingsBuilder(RequestSettings settings) : base(settings)
        {
        }
    }
}
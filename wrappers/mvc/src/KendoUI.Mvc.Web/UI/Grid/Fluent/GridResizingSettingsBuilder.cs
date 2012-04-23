// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    public class GridResizingSettingsBuilder : IHideObjectMembers
    {
        private readonly GridResizingSettings settings;

        public GridResizingSettingsBuilder(GridResizingSettings settings)
        {
            this.settings = settings;
        }

        public GridResizingSettingsBuilder Columns(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}

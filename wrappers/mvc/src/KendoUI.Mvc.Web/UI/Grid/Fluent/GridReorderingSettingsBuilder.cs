// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.            
namespace Telerik.Web.Mvc.UI.Fluent
{
    public class GridReorderingSettingsBuilder: IHideObjectMembers
    {
        private readonly GridReorderingSettings settings;

        public GridReorderingSettingsBuilder(GridReorderingSettings settings)
        {
            this.settings = settings;
        }

        public GridReorderingSettingsBuilder Columns(bool value)
        {
            settings.Enabled = value;

            return this;
        }
    }
}

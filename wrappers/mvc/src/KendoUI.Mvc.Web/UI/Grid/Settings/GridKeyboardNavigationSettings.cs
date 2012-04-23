// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class GridKeyboardNavigationSettings : IClientSerializable
    {
        private readonly IGrid grid;

        public GridKeyboardNavigationSettings(IGrid grid)
        {
            this.grid = grid;                        
        }

        public bool Enabled
        {
            get;
            set;
        }

        public bool EditOnTab
        {
            get;
            set;
        }

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Enabled)
            {
                if (EditOnTab)
                {
                    writer.AppendObject("keyboardNavigation", new { editOnTab = EditOnTab });
                }
                else
                {
                    writer.Append("keyboardNavigation", Enabled);
                }
            }
        }
    }
}

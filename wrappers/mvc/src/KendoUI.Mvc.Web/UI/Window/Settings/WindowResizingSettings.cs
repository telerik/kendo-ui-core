// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public class WindowResizingSettings
    {
        public WindowResizingSettings()
        {
            Enabled = false;
            MinHeight = int.MinValue;
            MinWidth = int.MinValue;
            MaxHeight = int.MinValue;
            MaxWidth = int.MinValue;
        }

        public bool Enabled { get; set; }
        public int MinWidth { get; set; }
        public int MinHeight { get; set; }
        public int MaxWidth { get; set; }
        public int MaxHeight { get; set; }
    }
}

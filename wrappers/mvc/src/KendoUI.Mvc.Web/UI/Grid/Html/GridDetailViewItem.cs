// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridDetailViewItem : GridItem
    {
        public GridItem Parent
        {
            get;
            set;
        }

        public override bool Expanded
        {
            get
            {
                return Parent.Expanded;
            }
            set
            {
                Parent.Expanded = value;
            }
        }
    }
}
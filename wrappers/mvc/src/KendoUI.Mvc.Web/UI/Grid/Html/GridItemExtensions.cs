// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    internal static class GridItemExtensions
    {
        public static void AsAlternating(this GridItem item)
        {
            if (item.Index % 2 != 0)
            {
                item.State |= GridItemStates.Alternating;
            }
        }
    }
}
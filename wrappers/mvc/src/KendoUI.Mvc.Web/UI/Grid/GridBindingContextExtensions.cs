// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using Extensions;

    public static class GridBindingContextExtensions
    {
        public static T GetGridParameter<T>(this IGridBindingContext context, string key)
        {
            return context.Controller.ValueOf<T>(context.Prefix(key));
        }
    }
}
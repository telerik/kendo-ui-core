// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    
    [Flags]
    public enum GridItemStates
    {
        Default     = 1 << 0,
        Master      = 1 << 1,
        Selected    = 1 << 2,
        Alternating = 1 << 3
    }
}

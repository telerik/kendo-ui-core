// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;

    public interface IInputComponent<T> : IViewComponent where T : struct
    {
        Nullable<T> Value { get; set; }
    }
}

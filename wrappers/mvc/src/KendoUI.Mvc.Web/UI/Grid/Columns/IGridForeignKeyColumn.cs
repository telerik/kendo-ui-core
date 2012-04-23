// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Web.Mvc;
    using System;
    using System.Collections.Generic;

    public interface IGridForeignKeyColumn : IGridBoundColumn
    {
        SelectList Data
        {
            get;
            set;
        }

        Action<IDictionary<string, object>, object> SerializeSelectList
        {
            get;
        }
    }
}

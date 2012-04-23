// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System;

    public interface ITextBox<T> where T : struct
    {
        IDictionary<string, object> InputHtmlAttributes { get; }

        Nullable<T> Value { get; set; }

        Nullable<T> MinValue { get; set; }
        
        Nullable<T> MaxValue { get; set; }
        
        T IncrementStep { get; set; }
        
        bool Spinners { get; set; }
 
        int NumberGroupSize{ get; set; }

        string NumberGroupSeparator{ get; set; }

        string EmptyMessage{ get; set; }

        string ButtonTitleUp { get; set; }

        string ButtonTitleDown { get; set; }
    }
}

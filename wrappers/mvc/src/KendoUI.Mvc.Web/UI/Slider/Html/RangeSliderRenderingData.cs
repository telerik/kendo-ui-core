// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System.Collections.Generic;

    public class RangeSliderRenderingData
    {
        public string Id
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public object MinValue
        {
            get;
            set;
        }
        public object MaxValue
        {
            get;
            set;
        }
        public object SmallStep
        {
            get;
            set;
        }
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            set;
        }
        public bool Enabled
        {
            get;
            set;
        }
        public string SelectionStart 
        { 
            get; 
            set; 
        }
        public string SelectionEnd
        {
            get;
            set;
        }
    }
}
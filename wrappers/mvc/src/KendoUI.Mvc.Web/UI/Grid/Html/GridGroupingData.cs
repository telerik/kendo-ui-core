// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    
    public class GridGroupingData
    {
        public IGridUrlBuilder UrlBuilder
        {
            get;
            set;
        }

        public IEnumerable<GroupDescriptor> GroupDescriptors
        {
            get;
            set;
        }

        public Func<string, string> GetTitle
        {
            get;
            set;
        }

        public string Hint
        {
            get;
            set;
        }

        public string SortedAscText
        {
            get;
            set;
        }

        public string SortedDescText
        {
            get;
            set;
        }

        public string UnGroupText
        {
            get;
            set;
        }
    }
}
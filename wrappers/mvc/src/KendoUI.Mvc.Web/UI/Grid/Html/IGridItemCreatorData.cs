// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    
    public interface IGridItemCreatorData
    {
        bool HasDetailView
        {
            get;
        }
        
        GridItemMode Mode 
        { 
            get; 
        }

        Func<object> CreateNewDataItem
        {
            get;
            set;
        }

        bool ShowGroupFooter
        {
            get;
            set;
        }

        int GroupsCount
        {
            get;
            set;
        }
    }
}
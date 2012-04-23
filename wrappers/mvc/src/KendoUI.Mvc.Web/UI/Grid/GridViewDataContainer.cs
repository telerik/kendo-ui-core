// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Web.Mvc;
    
    class GridViewDataContainer<T> : IViewDataContainer
        where T : class
    {
        public GridViewDataContainer(T model, ViewDataDictionary viewData)
        {
            ViewData = viewData;
            ViewData.Model = model;
        }
        
        public ViewDataDictionary ViewData
        {
            get;
            set;
        }
    }

    class GridViewDataContainer : IViewDataContainer
    {
        public ViewDataDictionary ViewData
        {
            get;
            set;
        }
    }
}

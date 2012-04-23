// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Web.Mvc;
    
    class GridActionResultAdapterFactory : IGridActionResultAdapterFactory
    {
        public IGridActionResultAdapter Create(ActionResult actionResult)
        {
            var jsonResult = actionResult as JsonResult;
            
            if (jsonResult != null)
            {
                return new GridJsonResultAdapter(jsonResult);
            }

            var viewResult = actionResult as ViewResultBase;

            if (viewResult != null)
            {
                return new GridViewResultAdapter(viewResult);
            }

            return null;
        }
    }
}

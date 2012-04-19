// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.Infrastructure
{
    using System.Web.Mvc;
    using System.Web.Routing;

    public interface IControllerContextCache
    {
        ControllerContext GetControllerContext(RequestContext requestContext, string controllerName, string areaName);
    }
}
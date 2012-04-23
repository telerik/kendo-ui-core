// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System;
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;

    public interface IControllerTypeCache
    {
        Func<IEnumerable<Assembly>> ReferencedAssemblies
        {
            get;
            set;
        }

        IList<Type> GetControllerTypes(string controllerName);

        IList<Type> GetControllerTypes(RequestContext requestContext, string controllerName);
    }
}
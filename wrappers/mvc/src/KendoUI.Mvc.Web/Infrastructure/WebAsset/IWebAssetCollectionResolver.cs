// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.Infrastructure
{
    using System.Collections.Generic;
    using KendoUI.Mvc;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI;

    public interface IWebAssetCollectionResolver
    {
        IEnumerable<string> Resolve(ResolverContext resolverContext, WebAssetCollection assets);
    }
}

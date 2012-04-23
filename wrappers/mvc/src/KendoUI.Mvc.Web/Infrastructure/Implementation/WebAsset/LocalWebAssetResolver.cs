// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Collections.Generic;
    
    internal class LocalWebAssetResolver : IWebAssetResolver
    {
        private readonly WebAsset asset;
        private readonly IWebAssetLocator locator;

        public LocalWebAssetResolver(WebAsset asset, IWebAssetLocator locator)
        {
            this.asset = asset;
            this.locator = locator;
        }

        public IEnumerable<string> Resolve(ResolverContext resolverContext)
        {
            return new[] { locator.Locate(asset.Source, asset.Version) };
        }
    }
}
// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    internal class WebAssetCollectionResolver : IWebAssetCollectionResolver
    {
        private readonly IUrlResolver urlResolver;
        private readonly IWebAssetResolverFactory resolverFactory;

        public WebAssetCollectionResolver(IUrlResolver urlResolver, IWebAssetResolverFactory resolverFactory)
        {
            this.urlResolver = urlResolver;
            this.resolverFactory = resolverFactory;
        }

        public IEnumerable<string> Resolve(ResolverContext resolverContext, WebAssetCollection assets)
        {
            var resolvedUrls = new List<string>();

            foreach (var asset in assets)
            {
                resolvedUrls.AddRange(resolverFactory.Create(asset).Resolve(resolverContext));
            }

            return resolvedUrls
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .Select((url) => urlResolver.Resolve(url));
        }
    }
}

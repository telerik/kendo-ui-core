// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Collections.Generic;
    using System.Linq;
    using Telerik.Web.Mvc.Extensions;
    
    internal class WebAssetGroupResolver : IWebAssetResolver
    {
        private readonly IWebAssetResolverFactory resolverFactory;
        private readonly WebAssetGroup group;

        public WebAssetGroupResolver(WebAssetGroup group, IWebAssetResolverFactory resolverFactory)
        {
            this.group = group;
            this.resolverFactory = resolverFactory;
        }

        public IEnumerable<string> Resolve(ResolverContext resolverContext)
        {
            group.ContentType = resolverContext.ContentType;

            if (!group.Enabled)
            {
                return new string[0];
            }

            if (group.ContentDeliveryNetworkUrl.HasValue())
            {
                return new[] { group.ContentDeliveryNetworkUrl };
            }

            group.Items.Each(asset =>
            {
                asset.Version = group.Version;
                asset.UseTelerikContentDeliveryNetwork = group.UseTelerikContentDeliveryNetwork;
            });
            
            return ResolveItems(resolverContext);
        }

        protected virtual IEnumerable<string> ResolveItems(ResolverContext resolverContext)
        {
            return group.Items
                        .SelectMany(asset =>
                        {
                            var resolver = resolverFactory.Create(asset);
                            return resolver.Resolve(resolverContext);
                        })
                        .ToArray();
        }
    }
}
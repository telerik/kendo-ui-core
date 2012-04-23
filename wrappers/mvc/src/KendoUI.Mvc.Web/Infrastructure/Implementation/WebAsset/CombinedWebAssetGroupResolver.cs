// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using Telerik.Web.Mvc.Extensions;

    internal class CombinedWebAssetGroupResolver : WebAssetGroupResolver
    {
        private readonly IWebAssetResolverFactory resolverFactory;
        private readonly IWebAssetChecker checker;
        private readonly IWebAssetGroupSerializer serializer;
        private readonly WebAssetGroup group;


        public CombinedWebAssetGroupResolver(WebAssetGroup group, IWebAssetResolverFactory resolverFactory, IWebAssetChecker checker, IWebAssetGroupSerializer serializer)
            : base(group, resolverFactory)
        {
            this.group = group;
            this.resolverFactory = resolverFactory;
            this.checker = checker;
            this.serializer = serializer;
        }

        protected override IEnumerable<string> ResolveItems(ResolverContext resolverContext)
        {
            Func<WebAsset, IEnumerable<string>> resolver = asset => Resolve(resolverContext, asset);

            var result = Filter(checker.IsAbsolute).SelectMany(resolver)
                                                   .ToList();

            if (group.UseTelerikContentDeliveryNetwork)
            {
                result.AddRange(Filter(checker.IsNative).SelectMany(resolver));
            }

            if (group.Items.Any())
            {
                string id = group.IsShared ? group.Name : HttpUtility.UrlEncode(serializer.Serialize(group));

                var compressedUrl = "{0}?{1}={2}".FormatWith(
                              resolverContext.HttpHandlerPath,
                              HttpUtility.UrlEncode(WebAssetHttpHandler.IdParameterName),
                              id
                    );

                result.Add(compressedUrl);
            }

            return result;
        }

        private IEnumerable<string> Resolve(ResolverContext resolverContext, WebAsset asset)
        {
            return resolverFactory.Create(asset)
                                  .Resolve(resolverContext);
        }

        private IEnumerable<WebAsset> Filter(Func<WebAsset, bool> predicate)
        {
            var result = group.Items
                              .Where(predicate)
                              .ToArray();

            result.Each(asset => group.Items.Remove(asset));

            return result;
        }
    }
}

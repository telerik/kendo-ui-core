namespace Kendo.Mvc.Infrastructure.Implementation
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
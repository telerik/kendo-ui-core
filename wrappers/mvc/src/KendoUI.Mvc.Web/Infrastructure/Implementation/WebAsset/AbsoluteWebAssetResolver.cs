

namespace KendoUI.Mvc.Infrastructure.Implementation
{
    using System.Collections.Generic;
    
    internal class AbsoluteWebAssetResolver : IWebAssetResolver
    {
        private readonly WebAsset asset;

        public AbsoluteWebAssetResolver(WebAsset asset)
        {
            this.asset = asset;
        }

        public IEnumerable<string> Resolve(ResolverContext resolverContext)
        {
            return new[] { asset.Source };
        }
    }
}

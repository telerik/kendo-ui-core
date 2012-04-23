

namespace KendoUI.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using KendoUI.Mvc.Extensions;

    internal class CdnWebAssetResolver : IWebAssetResolver
    {
        private WebAsset asset;

        public CdnWebAssetResolver(WebAsset asset)
        {
            this.asset = asset;
        }

        public IEnumerable<string> Resolve(ResolverContext resolverContext)
        {
            string assetFileName = asset.FileName;
            string minifiedFileName = Path.ChangeExtension(assetFileName, (assetFileName.IndexOf(".min.") == -1 ? ".min" : "") + asset.Extension);

            return new[] {
                "{0}/{1}/{2}/{3}".FormatWith(GetBaseUrl(resolverContext), 
                    GetProductName(resolverContext), 
                    WebAssetDefaultSettings.Version, 
                    minifiedFileName
                )
            };
        }

        public string GetBaseUrl(ResolverContext resolverContext)
        {
            var extension = asset.Extension;

            if (extension == ".js")
            {
                return resolverContext.IsSecureConnection ? WebAssetDefaultSettings.TelerikContentDeliveryNetworkSecureScriptUrl : WebAssetDefaultSettings.TelerikContentDeliveryNetworkScriptUrl;
            }

            if (extension == ".css")
            {
                return resolverContext.IsSecureConnection ? WebAssetDefaultSettings.TelerikContentDeliveryNetworkSecureStyleSheetUrl : WebAssetDefaultSettings.TelerikContentDeliveryNetworkStyleSheetUrl;
            }

            throw new NotSupportedException("Files with '{0}' extension are not supported by the Telerik CDN".FormatWith(extension));
        }

        public string GetProductName(ResolverContext resolverContext)
        {
            return resolverContext.SupportsCompression ? "mvcz" : "mvc";
        }
    }
}
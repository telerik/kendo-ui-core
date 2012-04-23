namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using System.Linq;
    using Xunit;
    
    public class CdnWebAssetResolverTests
    {
        private CdnWebAssetResolver resolver;
        private readonly ResolverContext resolverContext;
        
        public CdnWebAssetResolverTests()
        {
            resolverContext = new ResolverContext();
        }

        [Fact]
        public void BaseUrl_should_return_insecure_script_url_if_asset_is_script_file()
        {
            resolver = new CdnWebAssetResolver(new WebAsset("foo.js"));
            Assert.Equal(WebAssetDefaultSettings.TelerikContentDeliveryNetworkScriptUrl, resolver.GetBaseUrl(resolverContext));
        }
        
        [Fact]
        public void BaseUrl_should_return_secure_script_url_if_asset_is_script_file()
        {
            resolver = new CdnWebAssetResolver(new WebAsset("foo.js"));
            
            resolverContext.IsSecureConnection = true;

            Assert.Equal(WebAssetDefaultSettings.TelerikContentDeliveryNetworkSecureScriptUrl, resolver.GetBaseUrl(resolverContext));
        }
        
        [Fact]
        public void BaseUrl_should_return_secure_stylesheet_url_if_asset_is_css_file()
        {
            resolver = new CdnWebAssetResolver(new WebAsset("foo.css"));
            resolverContext.IsSecureConnection = true;
            Assert.Equal(WebAssetDefaultSettings.TelerikContentDeliveryNetworkSecureStyleSheetUrl, resolver.GetBaseUrl(resolverContext));
        }
        
        [Fact]
        public void BaseUrl_should_return_isecure_stylesheet_url_if_asset_is_css_file()
        {
            resolver = new CdnWebAssetResolver(new WebAsset("foo.css"));
            Assert.Equal(WebAssetDefaultSettings.TelerikContentDeliveryNetworkStyleSheetUrl, resolver.GetBaseUrl(resolverContext));
        }        
        
        [Fact]
        public void BaseUrl_should_throw_if_extension_is_not_supported()
        {
            resolver = new CdnWebAssetResolver(new WebAsset("foo.bar"));
            Assert.Throws<NotSupportedException>(() => { resolver.GetBaseUrl(resolverContext); });
        }        
        
        [Fact]
        public void Product_name_is_mvc_when_output_is_not_compressed()
        {
            resolver = new CdnWebAssetResolver(new WebAsset("foo.bar"));
            Assert.Equal("mvc", resolver.GetProductName(resolverContext));
        }        
        
        [Fact]
        public void Product_name_is_mvcz_when_output_is_compressed()
        {
            resolver = new CdnWebAssetResolver(new WebAsset("foo.bar"));
            resolverContext.SupportsCompression = true;
            Assert.Equal("mvcz", resolver.GetProductName(resolverContext));
        }

        [Fact]
        public void Should_link_to_cdn()
        {
            resolver = new CdnWebAssetResolver(new WebAsset("foo.js"));
            resolverContext.SupportsCompression = true;
            var result = resolver.Resolve(resolverContext);

            Assert.Equal(WebAssetDefaultSettings.TelerikContentDeliveryNetworkScriptUrl +
                "/mvcz/" + WebAssetDefaultSettings.Version + "/foo.min.js" , result.ElementAt(0));
        }
    }
}

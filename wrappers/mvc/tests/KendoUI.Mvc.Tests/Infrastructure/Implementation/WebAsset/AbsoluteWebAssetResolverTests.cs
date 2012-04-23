namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System.Linq;
    using Xunit;
    
    public class AbsoluteWebAssetResolverTests
    {
        private AbsoluteWebAssetResolver resolver;

        [Fact]
        public void Should_return_the_source_of_the_asset()
        {
            var asset = new WebAsset("foo");
            resolver = new AbsoluteWebAssetResolver(asset);

            Assert.Equal(asset.Source, resolver.Resolve(new ResolverContext()).ElementAt(0));
        }
    }
}

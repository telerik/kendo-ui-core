namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class WebAssetCheckerTests
    {
        private WebAssetChecker checker;
        
        public WebAssetCheckerTests()
        {
            checker = new WebAssetChecker();
        }

        [Fact]
        public void IsNative_returns_false_for_non_native_webassets()
        {
            Assert.False(checker.IsNative(new WebAsset("foo")));
        }

        [Fact]
        public void IsNative_returns_true_for_jquery()
        {
            Assert.True(checker.IsNative(new WebAsset(ScriptRegistrar.jQuery)));
        }

        [Fact]
        public void IsNative_returns_true_for_jquery_validation()
        {
            Assert.True(checker.IsNative(new WebAsset(ScriptRegistrar.jQueryValidation)));
        }

        [Fact]
        public void IsNative_returns_true_for_script_starting_with_telerik()
        {
            Assert.True(checker.IsNative(new WebAsset("telerik.foo")));
        }

        [Fact]
        public void IsNative_checks_the_file_name_only()
        {
            Assert.True(checker.IsNative(new WebAsset("~/scripts/telerik.foo")));
        }

        [Fact]
        public void IsAbsolute_returns_false_for_local_urls()
        {
            Assert.False(checker.IsAbsolute(new WebAsset("~/scripts/telerik.foo")));
        }
        
        [Fact]
        public void IsAbsolute_returns_true_for_absolute_urls()
        {
            Assert.True(checker.IsAbsolute(new WebAsset("http://www.example.com")));
        }

        [Fact]
        public void IsAbsolute_returns_true_for_protocol_less_urls()
        {
            Assert.True(checker.IsAbsolute(new WebAsset("//www.example.com")));
        }
    }
}

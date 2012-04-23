namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using Xunit;

    public class RebaseImagePathContentFilterTests
    {
        private readonly RebaseImagePathContentFilter filter;
        private readonly Mock<IVirtualPathProvider> provider;
        private readonly Mock<IUrlResolver> resolver;

        public RebaseImagePathContentFilterTests()
        {
            provider = new Mock<IVirtualPathProvider>();
            resolver = new Mock<IUrlResolver>();

            provider.Setup(p => p.GetDirectory(It.IsAny<string>())).Returns((string path) => path.Substring(0, path.LastIndexOf("/")));
            provider.Setup(p => p.CombinePaths(It.IsAny<string>(), It.IsAny<string>())).Returns((string first, string second) => first + "/" + second);

            resolver.Setup(r => r.Resolve(It.IsAny<string>())).Returns((string path) => path.Replace("~", ""));

            
            filter = new RebaseImagePathContentFilter(provider.Object, resolver.Object);
        }

        [Fact]
        public void Should_apply_to_css_content_type()
        {
            Assert.True(filter.AppliesTo("text/css"));
        }
        
        [Fact]
        public void Should_not_apply_to_other_content_type()
        {
            Assert.False(filter.AppliesTo("foo"));
        }

        [Fact]
        public void Should_rebase_relative_path_based_on_base_path()
        {
            Assert.Equal("url('/Content/Img/foo.gif')", filter.Filter("~/Content", "url(Img/foo.gif)"));
        }
        
        [Fact]
        public void Should_rebase_when_url_is_quoted()
        {
            Assert.Equal("url('/Content/Img/foo.gif')", filter.Filter("~/Content", "url(\"Img/foo.gif\")"));
        }        
        
        [Fact]
        public void Should_rebase_when_url_is_single_quoted()
        {
            Assert.Equal("url('/Content/Img/foo.gif')", filter.Filter("~/Content", "url('Img/foo.gif')"));
        }        
        
        [Fact]
        public void Should_rebase_when_base_path_contains_version()
        {
            Assert.Equal("url('/Content/1.0/Img/foo.gif')", filter.Filter("~/Content/1.0", "url('Img/foo.gif')"));
        }        
        
        [Fact]
        public void Should_ignore_absolute_url()
        {
            Assert.Equal("url('http://www.example.com/foo.gif')", filter.Filter("~/Content", "url(http://www.example.com/foo.gif)"));
        }
        
        [Fact]
        public void Should_ignore_absolute_secure_url()
        {
            Assert.Equal("url('https://www.example.com/foo.gif')", filter.Filter("~/Content", "url(https://www.example.com/foo.gif)"));
        }        
        
        [Fact]
        public void Should_ignore_data_url()
        {
            Assert.Equal("url('data:image/gif;base64,EncodedImage')", filter.Filter("~/Content", "url(data:image/gif;base64,EncodedImage)"));
        }
    }
}
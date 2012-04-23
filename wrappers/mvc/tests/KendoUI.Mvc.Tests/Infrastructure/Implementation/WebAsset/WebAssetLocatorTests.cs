// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using System;
    using System.IO;
    using Xunit;

    public class WebAssetLocatorTests
    {
        private readonly Mock<IVirtualPathProvider> provider;
        private readonly Mock<ICache> cache;
        private readonly WebAssetLocator locator;

        public WebAssetLocatorTests()
        {
            cache = new Mock<ICache>();
            cache.Setup(c => c.Get<string>(It.IsAny<string>(), It.IsAny<Func<string>>())).Returns((string key, Func<string> defaultValue) => defaultValue());
            
            provider = new Mock<IVirtualPathProvider>();
            provider.Setup(p => p.GetFile(It.IsAny<string>())).Returns((string p) => Path.GetFileName(p));
            provider.Setup(p => p.GetDirectory(It.IsAny<string>())).Returns((string p) => p.Replace("/" + Path.GetFileName(p), string.Empty));
            provider.Setup(p => p.GetExtension(It.IsAny<string>())).Returns((string p) => Path.GetExtension(p));
            provider.Setup(p => p.CombinePaths(It.IsAny<string>(), It.IsAny<string>())).Returns((string p1, string p2) => p1 + "/" + p2);
            
            locator = new WebAssetLocator(cache.Object, provider.Object, new DebugWebAssetExtensions());
        }

        [Fact]
        public void Locate_should_return_correct_path_in_debug_mode()
        {
            provider.Setup(vpp => vpp.FileExists("~/scripts/1.0/jquery-1.3.2.debug.js")).Returns(true);

            string path = locator.Locate("~/scripts/jquery-1.3.2.js", "1.0");

            Assert.Equal("~/scripts/1.0/jquery-1.3.2.debug.js", path);
        }
        
        [Fact]
        public void Locate_should_probe_all_extensions_in_debug_mode()
        {
            provider.Setup(vpp => vpp.FileExists("~/scripts/1.0/jquery-1.3.2.min.js")).Returns(true);
            provider.Setup(vpp => vpp.FileExists("~/scripts/jquery-1.3.2.js")).Returns(true);

            string path = locator.Locate("~/scripts/jquery-1.3.2.js", "1.0");

            Assert.Equal("~/scripts/1.0/jquery-1.3.2.min.js", path);
        }        
        
        [Fact]
        public void Locate_should_probe_all_extensions_in_release_mode()
        {
            provider.Setup(vpp => vpp.FileExists("~/scripts/1.0/jquery-1.3.2.min.js")).Returns(true);
            provider.Setup(vpp => vpp.FileExists("~/scripts/jquery-1.3.2.js")).Returns(true);

            string path = locator.Locate("~/scripts/jquery-1.3.2.js", "1.0");

            Assert.Equal("~/scripts/1.0/jquery-1.3.2.min.js", path);
        }

        [Fact]
        public void Locate_should_return_correct_path_in_release_mode()
        {
            provider.Setup(vpp => vpp.FileExists("~/content/1.0/site.min.css")).Returns(true);

            string path = locator.Locate("~/content/site.css", "1.0");

            Assert.Equal("~/content/1.0/site.min.css", path);
        }

        [Fact]
        public void Locate_should_return_correct_path_when_version_folder_is_missing()
        {
            provider.Setup(vpp => vpp.FileExists("~/content/site.min.css")).Returns(true);

            string path = locator.Locate("~/content/site.css", "1.0");

            Assert.Equal("~/content/site.min.css", path);
        }

        [Fact]
        public void Locate_should_return_same_path_when_file_exists()
        {
            provider.Setup(vpp => vpp.FileExists("~/content/site.css")).Returns(true);

            string path = locator.Locate("~/content/site.css", null);

            Assert.Equal("~/content/site.css", path);
        }

        [Fact]
        public void Locate_should_throw_exception_when_file_does_not_exist()
        {
            provider.Setup(vpp => vpp.FileExists("~/content/site.css")).Returns(false);

            Assert.Throws<FileNotFoundException>(() => locator.Locate("~/content/site.css", null));
        }

        [Fact]
        public void Locate_should_return_same_path_in_case_of_full_url()
        {
            Assert.Equal("http://www.example.com", locator.Locate("http://www.example.com", null));
        }
    }
}
// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using Moq;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class ImageBrowserControllerTests
    {
        private readonly EditorFileBrowserController controller;
        private readonly Mock<IDirectoryBrowser> browser;
        private readonly Mock<IDirectoryPermission> permission;
        private readonly Mock<IVirtualPathProvider> pathProvider;
        private readonly Mock<EditorFileBrowserController> controllerMock;
        private readonly IThumbnailCreator thumbnailCreator;

        public ImageBrowserControllerTests()
        {
            browser = new Mock<IDirectoryBrowser>();
            permission = new Mock<IDirectoryPermission>();
            pathProvider = new Mock<IVirtualPathProvider>();
            thumbnailCreator = new Mock<IThumbnailCreator>().Object;

            controllerMock = new Mock<EditorFileBrowserController>(browser.Object, permission.Object, pathProvider.Object, thumbnailCreator){CallBase = true};
            controllerMock.SetupGet(c => c.ContentPaths).Returns(new[]{"root"});

            var server = new Mock<HttpServerUtilityBase>();
            server.Setup(s => s.MapPath(It.IsAny<string>())).Returns((string path) => path);

            var context = new Mock<ControllerContext>();
            context.SetupGet(c => c.HttpContext.Server).Returns(server.Object);
            
            controller = controllerMock.Object;
            controller.ControllerContext = context.Object;
            
            browser.Setup(b => b.GetFiles(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(new[] { new FileEntry() });

            browser.Setup(b => b.GetDirectories(It.IsAny<string>()))
                .Returns(new[] { new DirectoryEntry() });

            permission.Setup(p => p.CanAccess(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            pathProvider.Setup(p => p.AppendTrailingSlash(It.IsAny<string>())).Returns<string>(value => value + "/");
            pathProvider.Setup(p => p.ToAbsolute(It.IsAny<string>())).Returns<string>(value => value);
            pathProvider.Setup(p => p.CombinePaths(It.IsAny<string>(), It.IsAny<string>()))
                        .Returns<string, string>((v1, v2) => v1 + v2);
        }

        [Fact]
        public void Should_return_files_for_given_path()
        {
            var result = controller.Browse("");

            var browseResult = result.Data as BrowseResult;

            browseResult.Files.Count().ShouldEqual(1);
        }

        [Fact]
        public void Should_return_directories_for_given_path()
        {
            var result = controller.Browse("");

            var browseResult = result.Data as BrowseResult;

            browseResult.Directories.Count().ShouldEqual(1);
        }

        [Fact]
        public void Should_return_path_with_trailing_slash()
        {
            const string path = "/bar";
            var result = controller.Browse(path);
            var browseResult = result.Data as BrowseResult;

            browseResult.Path.EndsWith("/").ShouldBeTrue();
        }

        [Fact]
        public void Should_return_root_path_if_no_path_is_specified()
        {
            var result = controller.Browse(null);
            var browseResult = result.Data as BrowseResult;

            browseResult.Path.ShouldEqual(controller.ContentPaths[0] + "/");
        }

        [Fact]
        public void Should_not_save_file_with_invalid_extension()
        {
            var file = new Mock<HttpPostedFileBase>();

            file.SetupGet(f => f.FileName).Returns("foo.bar");

            Assert.Throws<HttpException>(() => controller.Upload("", file.Object));
        }
        
        [Fact]
        public void Should_save_file_with_valid_extension()
        {
            var file = new Mock<HttpPostedFileBase>();

            file.SetupGet(f => f.FileName).Returns("foo.png");

            controller.Upload("", file.Object);

            file.Verify(f => f.SaveAs(It.IsAny<string>()), Times.Once());
        }

        [Fact]
        public void Browse_should_throw_HttpException_if_authorize_browse_returns_false()
        {
            controllerMock.Setup(c => c.AuthorizeBrowse(It.IsAny<string>())).Returns(false);
            Assert.Throws<HttpException>(() => controller.Browse(""));
        }
        
        [Fact]
        public void Browse_should_return_json_result_authorize_returns_true()
        {
            Assert.IsType<JsonResult>(controller.Browse(""));
        }

        [Fact]
        public void Upload_should_throw_HttpException_if_AuthorizeUpload_returns_false()
        {
            controllerMock.Setup(c => c.AuthorizeUpload(It.IsAny<string>(), It.IsAny<HttpPostedFileBase>())).Returns(false);
            
            var file = new Mock<HttpPostedFileBase>();

            file.SetupGet(f => f.FileName).Returns("foo.png");

            Assert.Throws<HttpException>(() => controller.Upload("", file.Object));
        }        
        
        [Fact]
        public void DeleteFile_should_throw_HttpException_if_AuthorizeDeleteFile_returns_false()
        {
            controllerMock.Setup(c => c.AuthorizeDeleteFile(It.IsAny<string>())).Returns(false);
            
            Assert.Throws<HttpException>(() => controller.DeleteFile(""));
        }

        [Fact]
        public void DeleteFile_returns_empty_content()
        {
            var result = controller.DeleteFile("");
            Assert.IsType<ContentResult>(result);
        }

        [Fact]
        public void DeleteDirectory_should_throw_HttpException_if_AuthorizeDeleteDirectory_returns_false()
        {
            controllerMock.Setup(c => c.AuthorizeDeleteDirectory(It.IsAny<string>())).Returns(false);

            Assert.Throws<HttpException>(() => controller.DeleteDirectory(""));
        }
        
        [Fact]
        public void DeleteDirectory_returns_empty_content()
        {
            var result = controller.DeleteDirectory("");
            Assert.IsType<ContentResult>(result);
        }

        [Fact]
        public void Thumbnail_should_throw_HttpException_if_AuthorizeThumbnail_returns_false()
        {
            controllerMock.Setup(c => c.AuthorizeThumbnail(It.IsAny<string>())).Returns(false);

            Assert.Throws<HttpException>(() => controller.Thumbnail(""));
        }
    }
}
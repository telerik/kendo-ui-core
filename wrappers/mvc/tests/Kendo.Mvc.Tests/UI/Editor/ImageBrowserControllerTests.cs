using Xunit;
using Moq;
using System.Web;
using Kendo.Mvc.Infrastructure;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI.Tests
{
    public class ImageBrowserControllerTests
    {
        private readonly EditorImageBrowserController controller;
        private readonly Mock<IDirectoryBrowser> browser;
        private readonly Mock<IDirectoryPermission> permission;
        private readonly Mock<IVirtualPathProvider> pathProvider;
        private readonly Mock<EditorImageBrowserController> controllerMock;
        private readonly IThumbnailCreator thumbnailCreator;

        public ImageBrowserControllerTests()
        {
            browser = new Mock<IDirectoryBrowser>();
            permission = new Mock<IDirectoryPermission>();
            pathProvider = new Mock<IVirtualPathProvider>();
            thumbnailCreator = new Mock<IThumbnailCreator>().Object;

            controllerMock = new Mock<EditorImageBrowserController>(browser.Object, permission.Object, pathProvider.Object, thumbnailCreator) { CallBase = true };
            controllerMock.SetupGet(c => c.ContentPath).Returns("root");

            var server = new Mock<HttpServerUtilityBase>();
            server.Setup(s => s.MapPath(It.IsAny<string>())).Returns((string path) => path);

            var context = new Mock<ControllerContext>();
            context.SetupGet(c => c.HttpContext.Server).Returns(server.Object);

            controller = controllerMock.Object;
            controller.ControllerContext = context.Object;

            browser.Setup(b => b.GetFiles(It.IsAny<string>(), It.IsAny<string>()))
                .Returns(new[] { new ImageBrowserEntry { EntryType = ImageBrowserEntryType.File } });

            browser.Setup(b => b.GetDirectories(It.IsAny<string>()))
                .Returns(new[] { new ImageBrowserEntry { EntryType = ImageBrowserEntryType.Directory } });

            permission.Setup(p => p.CanAccess(It.IsAny<string>(), It.IsAny<string>())).Returns(true);

            pathProvider.Setup(p => p.AppendTrailingSlash(It.IsAny<string>())).Returns<string>(value => value + "/");
            pathProvider.Setup(p => p.ToAbsolute(It.IsAny<string>())).Returns<string>(value => value);
            pathProvider.Setup(p => p.CombinePaths(It.IsAny<string>(), It.IsAny<string>()))
                        .Returns<string, string>((v1, v2) => v1 + v2);
        }

        [Fact]
        public void Should_return_files_for_given_path()
        {
            var result = controller.Read("");

            var browseResult = result.Data as IEnumerable<ImageBrowserEntry>;

            browseResult.Count(i => i.EntryType == ImageBrowserEntryType.File).ShouldEqual(1);
        }

        [Fact]
        public void Should_return_directories_for_given_path()
        {
            var result = controller.Read("");

            var browseResult = result.Data as IEnumerable<ImageBrowserEntry>;

            browseResult.Count(i => i.EntryType == ImageBrowserEntryType.Directory).ShouldEqual(1);
        }

        //[Fact]
        //public void Should_return_path_with_trailing_slash()
        //{
        //    const string path = "/bar";
        //    var result = controller.Read(path);
        //    var browseResult = result.Data as IEnumerable<FileBrowserEntry>;

        //    browseResult.Path.EndsWith("/").ShouldBeTrue();
        //}

        //[Fact]
        //public void Should_return_root_path_if_no_path_is_specified()
        //{
        //    var result = controller.Read(null);
        //    var browseResult = result.Data as BrowseResult;

        //    browseResult.Path.ShouldEqual(controller.ContentPaths[0] + "/");
        //}

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
            controllerMock.Setup(c => c.AuthorizeRead(It.IsAny<string>())).Returns(false);
            Assert.Throws<HttpException>(() => controller.Read(""));
        }

        [Fact]
        public void Browse_should_return_json_result_authorize_returns_true()
        {
            Assert.IsType<JsonResult>(controller.Read(""));
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
        public void Destroy_should_throw_HttpException_if_AuthorizeDeleteFile_returns_false()
        {
            controllerMock.Setup(c => c.AuthorizeDeleteFile(It.IsAny<string>())).Returns(false);

            Assert.Throws<HttpException>(() => controller.Destroy("", new ImageBrowserEntry()));
        }

        [Fact]
        public void Destroy_returns_empty_content()
        {
            var result = controller.Destroy("", new ImageBrowserEntry());
            Assert.IsType<ContentResult>(result);
        }

        [Fact]
        public void Destroy_should_throw_HttpException_if_AuthorizeDeleteDirectory_returns_false()
        {
            controllerMock.Setup(c => c.AuthorizeDeleteDirectory(It.IsAny<string>())).Returns(false);

            Assert.Throws<HttpException>(() => controller.Destroy("", new ImageBrowserEntry { EntryType = ImageBrowserEntryType.Directory }));
        }

        [Fact]
        public void DeleteDirectory_returns_empty_content()
        {
            var result = controller.Destroy("", new ImageBrowserEntry { EntryType = ImageBrowserEntryType.Directory });
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

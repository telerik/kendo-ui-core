using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Moq;
using NUnit.Framework;
using System.IO;
using System.IO.Compression;

namespace ResourceUploader.Core.Tests
{
    [TestFixture]
    public class AppendScriptsLoadedTests
    {
        [Test]
        public void Notify_scripts_loaded_is_appended()
        {
            var resource = new Mock<IResource>();
            var sourceStream = new MemoryStream(Encoding.ASCII.GetBytes("(content)"));

            resource
                .SetupGet(res => res.ContentStream)
                .Returns(sourceStream);

            resource
                .SetupGet(res => res.Type)
                .Returns(MimeType.JavaScript);

            var filter = new AppendScriptsLoaded();
            var result = filter.Filter(resource.Object);

            var resultContent = new StreamReader(result.ContentStream).ReadToEnd();

            Assert.That(resultContent, Is.EqualTo("(content)if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();"));
        }

        [Test]
        public void Non_JavaScript_resources_are_skipped()
        {
            var resource = new Mock<IResource>();
            var sourceStream = new MemoryStream();

            resource
                .SetupGet(res => res.ContentStream)
                .Returns(sourceStream);

            resource
                .SetupGet(res => res.Name)
                .Returns("test.png");

            var filter = new AppendScriptsLoaded();
            var result = filter.Filter(resource.Object);

            Assert.That(result, Is.SameAs(resource.Object));
        }

        [Test]
        public void Resource_properties_are_preserved()
        {
            var resource = new Mock<IResource>();
            var sourceStream = new MemoryStream();

            resource
                .SetupGet(res => res.ContentStream)
                .Returns(sourceStream);

            resource
                .SetupGet(res => res.Name)
                .Returns("Name");

            resource
                .SetupGet(res => res.RelativePath)
                .Returns("RelativePath");

            resource
                .SetupGet(res => res.Type)
                .Returns(MimeType.ImagePng);

            var filter = new AppendScriptsLoaded();
            var result = filter.Filter(resource.Object);

            Assert.That(result.Name, Is.EqualTo("Name"));
            Assert.That(result.RelativePath, Is.EqualTo("RelativePath"));
            Assert.That(result.Type, Is.EqualTo(MimeType.ImagePng));
        }
    }
}

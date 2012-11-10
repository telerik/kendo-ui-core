using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Moq;
using NUnit.Framework;

namespace ResourceUploader.Core.Tests
{
    [TestFixture]
    public class FileSystemResourceReaderTests
    {
        [Test]
        public void Files_filtered_by_extension()
        {
            var fileSystem = new Mock<IFileSystem>();

            var scriptFile = new Mock<IFileInfo>();
            scriptFile
                .SetupGet(file => file.Name)
                .Returns(@"C:\Scripts\jQuery.js");

            var dummyFile = new Mock<IFileInfo>();
            dummyFile
                .SetupGet(file => file.Name)
                .Returns(@"C:\Scripts\Common.js.bak");

            fileSystem
                .Setup(fs => fs.FindFiles(@"C:\Scripts"))
                .Returns(new [] { scriptFile.Object, dummyFile.Object });

            var reader = new FileSystemResourceReader(fileSystem.Object, @"C:\Scripts", new[] { ".JS" });

            var resources = reader.GetResources();

            Assert.That(resources.Count, Is.EqualTo(1));
            Assert.That(resources[0].Name, Is.EqualTo(@"C:\Scripts\jQuery.js"));
        }

        [Test]
        public void RelativePath_is_set()
        {
            var fileSystem = new Mock<IFileSystem>();

            var scriptFile = new Mock<IFileInfo>();
            scriptFile
                .SetupGet(file => file.Name)
                .Returns(@"C:\Scripts\jQuery.js");

            var dummyFile = new Mock<IFileInfo>();
            dummyFile
                .SetupGet(file => file.Name)
                .Returns(@"C:\Scripts\Common\Core.js");

            fileSystem
                .Setup(fs => fs.FindFiles(@"C:\Scripts"))
                .Returns(new[] { scriptFile.Object, dummyFile.Object });

            var reader = new FileSystemResourceReader(fileSystem.Object, @"C:\Scripts", new[] { ".JS" });

            var resources = reader.GetResources();

            Assert.That(resources[0].RelativePath, Is.EqualTo(@"jQuery.js"));
            Assert.That(resources[1].RelativePath, Is.EqualTo(@"Common\Core.js"));
        }
    }
}

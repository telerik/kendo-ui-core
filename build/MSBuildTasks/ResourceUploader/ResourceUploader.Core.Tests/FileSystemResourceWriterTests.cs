using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Moq;
using NUnit.Framework;
using System.IO;

namespace ResourceUploader.Core.Tests
{
    [TestFixture]
    public class FileSystemResourceWriterTests
    {
        [Test]
        public void Files_stored_in_OutputDirectory()
        {
            var fileSystem = new Mock<IFileSystem>();

            var resource = new Mock<IResource>();
            
            resource
                .SetupGet(res => res.RelativePath)
                .Returns(@"jQuery\jQuery.js");

            resource
                .SetupGet(res => res.ContentStream)
                .Returns(new Mock<Stream>().Object);
            
            fileSystem
                .Setup(fs => fs.OpenWrite(@"C:\Scripts\jQuery\jQuery.js"))
                .Returns(new Mock<Stream>().Object);

            var writer = new FileSystemResourceWriter(fileSystem.Object, @"C:\Scripts");

            writer.Filter(resource.Object);

            fileSystem.VerifyAll();
        }

        [Test]
        public void Content_written_in_output_stream()
        {
            var fileSystem = new Mock<IFileSystem>();

            var resource = new Mock<IResource>();

            resource
                .SetupGet(res => res.RelativePath)
                .Returns(@"jQuery\jQuery.js");

            resource
                .SetupGet(res => res.ContentStream)
                .Returns(new MemoryStream(new byte[1024]));

            var outputStream = new Mock<Stream>();

            outputStream
                .Setup(stream => stream.Write(new byte[4096], 0, 1024));

            fileSystem
                .Setup(fs => fs.OpenWrite(@"C:\Scripts\jQuery\jQuery.js"))
                .Returns(outputStream.Object);

            var writer = new FileSystemResourceWriter(fileSystem.Object, @"C:\Scripts");

            writer.Filter(resource.Object);

            outputStream.VerifyAll();
        }
    }
}

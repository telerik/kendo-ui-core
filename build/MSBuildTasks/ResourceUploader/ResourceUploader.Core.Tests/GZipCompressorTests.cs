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
    public class GZipCompressorTests
    {
        [Test]
        public void Resource_is_compressed()
        {
            var testContent = "Test static resource content";
            var resource = new Mock<IResource>();
            var sourceStream = new MemoryStream(ASCIIEncoding.ASCII.GetBytes(testContent));

            resource
                .SetupGet(res => res.ContentStream)
                .Returns(sourceStream);

            resource
                .SetupGet(res => res.Type)
                .Returns(MimeType.StyleSheet);

            var filter = new GZipCompressor();
            var result = filter.Filter(resource.Object);

            string decompressedContent;
            using (var gzStream = new GZipStream(result.ContentStream, CompressionMode.Decompress))
            {
                var buffer = new byte[1024];
                var readBytes = gzStream.Read(buffer, 0, buffer.Length);
                decompressedContent = ASCIIEncoding.ASCII.GetString(buffer, 0, readBytes);
            }

            Assert.That(decompressedContent, Is.EqualTo(testContent));
        }

        [Test]
        public void ContentEncoding_is_set()
        {
            var resource = new Mock<IResource>();
            var sourceStream = new MemoryStream();

            resource
                .SetupGet(res => res.ContentStream)
                .Returns(sourceStream);

            resource
                .SetupGet(res => res.Type)
                .Returns(MimeType.JavaScript);

            var filter = new GZipCompressor();
            var result = filter.Filter(resource.Object);

            Assert.That(result.Encoding, Is.EqualTo(ContentEncoding.GZip));
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

            var filter = new GZipCompressor();
            var result = filter.Filter(resource.Object);

            Assert.That(result.Name, Is.EqualTo("Name"));
            Assert.That(result.RelativePath, Is.EqualTo("RelativePath"));
            Assert.That(result.Type, Is.EqualTo(MimeType.ImagePng));
        }

        [Test]
        public void ImagePng_is_not_compressed()
        {
            var resource = new Mock<IResource>();

            resource
                .SetupGet(res => res.Type)
                .Returns(MimeType.ImagePng);

            var filter = new GZipCompressor();
            var result = filter.Filter(resource.Object);

            Assert.That(result.Encoding, Is.EqualTo(ContentEncoding.Unspecified));
        }

        [Test]
        public void ImageGif_is_not_compressed()
        {
            var resource = new Mock<IResource>();

            resource
                .SetupGet(res => res.Type)
                .Returns(MimeType.ImageGif);

            var filter = new GZipCompressor();
            var result = filter.Filter(resource.Object);

            Assert.That(result.Encoding, Is.EqualTo(ContentEncoding.Unspecified));
        }

        [Test]
        public void ImageJpeg_is_not_compressed()
        {
            var resource = new Mock<IResource>();

            resource
                .SetupGet(res => res.Type)
                .Returns(MimeType.ImageJpeg);

            var filter = new GZipCompressor();
            var result = filter.Filter(resource.Object);

            Assert.That(result.Encoding, Is.EqualTo(ContentEncoding.Unspecified));
        }

        [Test]
        public void ImageIco_is_not_compressed()
        {
            var resource = new Mock<IResource>();

            resource
                .SetupGet(res => res.Type)
                .Returns(MimeType.ImageIco);

            var filter = new GZipCompressor();
            var result = filter.Filter(resource.Object);

            Assert.That(result.Encoding, Is.EqualTo(ContentEncoding.Unspecified));
        }

		[Test]
		public void ImageCur_is_not_compressed()
		{
			var resource = new Mock<IResource>();

			resource
				.SetupGet(res => res.Type)
				.Returns(MimeType.ImageCur);

			var filter = new GZipCompressor();
			var result = filter.Filter(resource.Object);

			Assert.That(result.Encoding, Is.EqualTo(ContentEncoding.Unspecified));
		}
    }
}

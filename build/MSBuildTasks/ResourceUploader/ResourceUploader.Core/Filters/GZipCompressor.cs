using System.Collections.Generic;
using System.IO;
using Ionic.Zlib;

namespace ResourceUploader.Core
{
    public class GZipCompressor : IResourceFilter
    {
        private readonly HashSet<MimeType> SupportedTypes = new HashSet<MimeType> {
            MimeType.JavaScript,
            MimeType.StyleSheet,
            MimeType.Font
        };

        public IResource Filter(IResource source)
        {
            if (!SupportedTypes.Contains(source.Type))
                return source;

            var outStream = new MemoryStream();

            using (var rawStream = new MemoryStream())
            {
                source.ContentStream.CopyTo(rawStream);

                using (var gzStream = new GZipStream(outStream, CompressionMode.Compress, CompressionLevel.BestCompression, true))
                {
                    rawStream.CopyTo(gzStream);
                }
            }

            outStream.Rewind();

            return new DynamicResource(outStream, source) { Encoding = ContentEncoding.GZip };
        }
    }
}

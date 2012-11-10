using System.IO;

namespace ResourceUploader.Core
{
    public static class StreamExtensions
    {
        public static void CopyTo(this Stream source, Stream dest)
        {
            lock(source)
            lock(dest)
            {
                source.Rewind();
                dest.Rewind();

                var buffer = new byte[4096];
                int numRead;
                while ((numRead = source.Read(buffer, 0, buffer.Length)) != 0)
                {
                    dest.Write(buffer, 0, numRead);
                }

                source.Rewind();
                dest.Rewind();
            }
       }

        public static void Rewind(this Stream stream)
        {
            if (stream.CanSeek)
            {
                stream.Seek(0, SeekOrigin.Begin);
            }
        }
    }
}

using System.Collections.Generic;
using System.IO;

namespace ResourceUploader.Core
{
    public class AppendScriptsLoaded : IResourceFilter
    {
        private const string NotifyScriptsLoaded = "if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();";

        public IResource Filter(IResource source)
        {
            if (source.Type == MimeType.JavaScript)
            {
                var outStream = new MemoryStream();
                source.ContentStream.CopyTo(outStream);

                outStream.Seek(0, SeekOrigin.End);

                var writer = new StreamWriter(outStream);
                writer.Write(NotifyScriptsLoaded);
                writer.Flush();

                outStream.Seek(0, SeekOrigin.Begin);
                return new DynamicResource(outStream, source);
            }

            return source;
        }
    }
}

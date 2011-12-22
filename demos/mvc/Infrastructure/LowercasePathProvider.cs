using System;
using System.Linq;
using System.Web.Hosting;

namespace Kendo.Infrastructure
{
    public class LowercasePathProvider : VirtualPathProvider
    {
        public override bool DirectoryExists(string virtualDir)
        {
            return base.DirectoryExists(virtualDir.ToLowerInvariant());
        }

        public override bool FileExists(string virtualPath)
        {
            return base.FileExists(virtualPath.ToLowerInvariant());
        }

        public override VirtualDirectory GetDirectory(string virtualDir)
        {
            return base.GetDirectory(virtualDir.ToLowerInvariant());
        }

        public override VirtualFile GetFile(string virtualPath)
        {
            return base.GetFile(virtualPath.ToLowerInvariant());
        }
    }
}

// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.IO;
    using System.Web;
    using System.Web.Hosting;

    public class VirtualPathProviderWrapper : IVirtualPathProvider
    {
        internal static Func<VirtualPathProvider> getCurrentProvider = () => HostingEnvironment.VirtualPathProvider;

        private static VirtualPathProvider CurrentProvider
        {
            get
            {
                return getCurrentProvider();
            }
        }

        public bool DirectoryExists(string virtualPath)
        {
            return CurrentProvider.DirectoryExists(virtualPath);
        }

        public bool FileExists(string virtualPath)
        {
            return CurrentProvider.FileExists(virtualPath);
        }

        public string GetDirectory(string virtualPath)
        {
            return VirtualPathUtility.GetDirectory(virtualPath);
        }

        public string GetFile(string virtualPath)
        {
            return VirtualPathUtility.GetFileName(virtualPath);
        }

        public string GetExtension(string virtualPath)
        {
            return VirtualPathUtility.GetExtension(virtualPath);
        }

        public string CombinePaths(string basePath, string relativePath)
        {
            return VirtualPathUtility.Combine(VirtualPathUtility.AppendTrailingSlash(basePath), relativePath);
        }

        public string ReadAllText(string virtualPath)
        {
            var path = VirtualPathUtility.IsAppRelative(virtualPath) ?
                          VirtualPathUtility.ToAbsolute(virtualPath) :
                          virtualPath;

            using (Stream stream = VirtualPathProvider.OpenFile(path))
            {
                using (var sr = new StreamReader(stream))
                {
                    return sr.ReadToEnd();
                }
            }
        }

        public string ToAbsolute(string virtualPath)
        {
            return VirtualPathUtility.ToAbsolute(virtualPath);
        }

        public string AppendTrailingSlash(string virtualPath)
        {
            return VirtualPathUtility.AppendTrailingSlash(virtualPath);
        }
    }
}
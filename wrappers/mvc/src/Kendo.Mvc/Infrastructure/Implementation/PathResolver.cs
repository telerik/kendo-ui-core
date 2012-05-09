namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Web.Hosting;

    /// <summary>
    /// Class use to resolve physical path for virtual path.
    /// </summary>
    public class PathResolver : IPathResolver
    {
        /// <summary>
        /// Returns the physical path for the specified virtual path.
        /// </summary>
        /// <param name="virtualPath">The virtual path.</param>
        /// <returns></returns>
        public string Resolve(string virtualPath)
        {
            return HostingEnvironment.MapPath(virtualPath);
        }
    }
}
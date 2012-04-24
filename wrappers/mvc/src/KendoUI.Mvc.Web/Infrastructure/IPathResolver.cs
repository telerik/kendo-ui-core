namespace KendoUI.Mvc.Infrastructure
{
    /// <summary>
    /// Defines members that a class must implement in order to provide helper methods for resolving virtual path.
    /// </summary>
    public interface IPathResolver
    {
        /// <summary>
        /// Returns the physical path for the specified virtual path.
        /// </summary>
        /// <param name="virtualPath">The virtual path.</param>
        /// <returns></returns>
        string Resolve(string virtualPath);
    }
}
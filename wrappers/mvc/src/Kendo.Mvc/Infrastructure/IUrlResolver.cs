namespace Kendo.Mvc.Infrastructure
{
    public interface IUrlResolver
    {
        /// <summary>
        /// Returns the relative path for the specified virtual path.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <returns></returns>
        string Resolve(string url);
    }
}
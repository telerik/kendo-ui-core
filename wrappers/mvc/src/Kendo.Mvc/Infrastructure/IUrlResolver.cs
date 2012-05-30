namespace Kendo.Mvc.Infrastructure
{
    /// <summary>
    /// Defines members that a class must implement in order to provide helper methods for resolving relative path.
    /// </summary>
    public interface IUrlResolver
    {
        /// <summary>
        /// Returns the relative path for the specified virtual path.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings", MessageId = "0#", Justification = "Url can be string.")]
        string Resolve(string url);
    }
}
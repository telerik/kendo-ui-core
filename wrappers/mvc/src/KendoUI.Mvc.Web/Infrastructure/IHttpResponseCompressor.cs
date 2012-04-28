namespace KendoUI.Mvc.Infrastructure
{
    using System.Web;

    /// <summary>
    /// Defines members that a class must implement in order to compress the response.
    /// </summary>
    public interface IHttpResponseCompressor
    {
        /// <summary>
        /// Compresses the response.
        /// </summary>
        /// <param name="context">The context.</param>
        void Compress(HttpContextBase context);
    }
}
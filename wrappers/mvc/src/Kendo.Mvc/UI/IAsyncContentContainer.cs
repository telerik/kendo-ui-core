namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines whether one navigation item can have content loaded asynchroniously.
    /// </summary>
    public interface IAsyncContentContainer
    {
        /// <summary>
        /// Url, which will be used as a destination for the Ajax request.
        /// </summary>
        string ContentUrl
        {
            get;
            set;
        }
    }
}
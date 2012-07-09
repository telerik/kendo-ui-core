namespace Kendo.Mvc.UI
{
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
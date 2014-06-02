namespace Kendo.Mvc.UI
{
    public interface IUploadAsyncSettings
    {
        /// <summary>
        /// Defines the Save action
        /// </summary>
        INavigatable Save { get; set; }

        /// <summary>
        /// Defines the name of the form field submitted to the Save action.
        /// The default value is the Upload name.
        /// </summary>
        string SaveField { get; set; }

        /// <summary>
        /// Defines the Remove action
        /// </summary>
        INavigatable Remove { get; set; }

        /// <summary>
        /// Defines the name of the form field submitted to the Remove action.
        /// The default value is "fileNames".
        /// </summary>
        string RemoveField { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether to start the upload immediately after selecting a file
        /// </summary>
        bool? AutoUpload { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether to upload selected files in one batch (request)
        /// </summary>
        bool? Batch { get; set; }

        /// <summary>
        /// Gets or sets a value whether to send credentials as part of XHR requests
        /// </summary>
        bool? WithCredentials { get; set; }
    }
}
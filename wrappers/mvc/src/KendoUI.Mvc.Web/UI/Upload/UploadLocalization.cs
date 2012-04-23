namespace Telerik.Web.Mvc.UI
{
    using System.Globalization;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Localization strings for the Upload component
    /// </summary>
    public class UploadLocalization : ViewComponentLocalization, IClientSerializable
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UploadLocalization" /> class.
        /// </summary>
        /// <param name="localizationService">The localization service.</param>
        /// <param name="culture">The culture.</param>
        public UploadLocalization(ILocalizationService localizationService, CultureInfo culture)
        : base(localizationService, null, "UploadLocalization", culture)
        {
        }

        /// <summary>
        /// Gets the Select string.
        /// </summary>
        /// <value>The default value is "Select...".</value>
        public string Select
        {
            get { return GetValue("Select"); }
        }

        /// <summary>
        /// Gets the Cancel string.
        /// </summary>
        /// <value>The default value is "Cancel".</value>
        public string Cancel
        {
            get { return GetValue("Cancel"); }
        }

        /// <summary>
        /// Gets the Retry string.
        /// </summary>
        /// <value>The default value is "Retry".</value>
        public string Retry
        {
            get { return GetValue("Retry"); }
        }

        /// <summary>
        /// Gets the Remove string.
        /// </summary>
        /// <value>The default value is "Remove".</value>
        public string Remove
        {
            get { return GetValue("Remove"); }
        }

        /// <summary>
        /// Gets the UploadSelectedFiles string.
        /// </summary>
        /// <value>The default value is "Upload files".</value>
        public string UploadSelectedFiles
        {
            get { return GetValue("UploadSelectedFiles"); }
        }

        /// <summary>
        /// Gets the DropFilesHere string.
        /// </summary>
        /// <value>The default value is "drop files here to upload".</value>
        public string DropFilesHere
        {
            get { return GetValue("DropFilesHere"); }
        }

        /// <summary>
        /// Gets the "uploading" status string.
        /// </summary>
        /// <value>The default value is "uploading".</value>
        public string StatusUploading
        {
            get { return GetValue("StatusUploading"); }
        }

        /// <summary>
        /// Gets the "uploaded" status string.
        /// </summary>
        /// <value>The default value is "uploaded".</value>
        public string StatusUploaded
        {
            get { return GetValue("StatusUploaded"); }
        }

        /// <summary>
        /// Gets the "failed" status string.
        /// </summary>
        /// <value>The default value is "failed".</value>
        public string StatusFailed
        {
            get { return GetValue("StatusFailed"); }
        }

        /// <summary>
        /// Serializes the localization strings.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="writer">The writer.</param>
        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (!IsDefault)
            {
                writer.AppendObject(key, ToJson());
            }
        }
    }
}

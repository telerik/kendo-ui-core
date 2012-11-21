namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    
    public class UploadAsyncSettings : IUploadAsyncSettings
    {
        private readonly Upload upload;

        /// <summary>
        /// Initializes a new instance of the <see cref="UploadAsyncSettings" /> class.
        /// </summary>
        public UploadAsyncSettings(Upload uploadComponent)
        {
            upload = uploadComponent;
            Save = new RequestSettings();
            Remove = new RequestSettings();
        }
        
        /// <summary>
        /// Defines the Save action
        /// </summary>
        public INavigatable Save { get; set; }

        /// <summary>
        /// Defines the name of the form field submitted to the Save action.
        /// The default value is the Upload name.
        /// </summary>
        public string SaveField { get; set; }
        
        /// <summary>
        /// Defines the Remove action
        /// </summary>
        public INavigatable Remove { get; set; }

        /// <summary>
        /// Defines the name of the form field submitted to the Remove action.
        /// The default value is "removeField".
        /// </summary>
        public string RemoveField { get; set; }
        
        /// <summary>
        /// Gets or sets a value indicating whether to start the upload immediately after selecting a file
        /// </summary>
        /// <value>
        /// true if the upload should start immediately after selecting a file, false otherwise; true by default
        /// </value>
        public bool? AutoUpload { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether to upload selected files in one batch (request)
        /// </summary>
        public bool? Batch { get; set; }

        /// <summary>
        /// Serializes the asynchronous uploading settings to the writer.
        /// </summary>
        /// <param name="key">The serialization key.</param>
        /// <param name="options">The target dictionary.</param>
        public void SerializeTo(string key, IDictionary<string, object> options)
        {
            if (Save.HasValue())
            {
                Func<string, string> encoder = (string url) => upload.IsSelfInitialized ? HttpUtility.UrlDecode(url) : url;
                var config = new Dictionary<string, object>();

                config["saveUrl"] = encoder(Save.GenerateUrl(upload.ViewContext, upload.UrlGenerator));

                FluentDictionary.For(config)
                    .Add("saveField", SaveField, () => SaveField.HasValue())
                    .Add("removeField", RemoveField, () => RemoveField.HasValue())
                    .Add("autoUpload", AutoUpload, () => AutoUpload.HasValue)
                    .Add("batch", Batch, () => Batch.HasValue);

                if (Remove.HasValue())
                {
                    config["removeUrl"] = encoder(Remove.GenerateUrl(upload.ViewContext, upload.UrlGenerator));
                }

                options.Add(key, config);
            }
        }
    }
}

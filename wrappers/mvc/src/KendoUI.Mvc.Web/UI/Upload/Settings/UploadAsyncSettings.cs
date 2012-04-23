// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using Telerik.Web.Mvc.Extensions;
    
    /// <summary>
    /// Defines the asynchronous uploading settings
    /// </summary>
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
            AutoUpload = true;
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
        /// Gets or sets a value indicating whether to start the upload immediately after selecting a file
        /// </summary>
        /// <value>
        /// true if the upload should start immediately after selecting a file, false otherwise; true by default
        /// </value>
        public bool AutoUpload { get; set; }

        /// <summary>
        /// Serializes the asynchronous uploading settings to the writer.
        /// </summary>
        /// <param name="writer">The writer object.</param>
        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (Save.HasValue())
            {
                Func<string, string> encoder = (string url) => upload.IsSelfInitialized ? HttpUtility.UrlDecode(url) : url;
                var config = new Dictionary<string, object>();

                config["saveUrl"] = encoder(Save.GenerateUrl(upload.ViewContext, upload.UrlGenerator));

                if (SaveField.HasValue())
                {
                    config["saveField"] = SaveField;
                }

                if (Remove.HasValue())
                {
                    config["removeUrl"] = encoder(Remove.GenerateUrl(upload.ViewContext, upload.UrlGenerator));
                }

                config["autoUpload"] = AutoUpload;

                writer.AppendObject(key, config);
            }
        }
    }
}

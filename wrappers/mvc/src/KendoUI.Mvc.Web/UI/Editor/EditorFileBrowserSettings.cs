// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using Telerik.Web.Mvc.Extensions;

    public class EditorFileBrowserSettings
    {
        private readonly IScriptableComponent owner;
        
        public const string DefaultFilter = "*.png,*.gif,*.jpg,*.jpeg";

        public EditorFileBrowserSettings(IScriptableComponent owner)
        {
            this.owner = owner;
            
            Select = new RequestSettings();
            Thumbnail = new RequestSettings();
            Upload = new RequestSettings();
            DeleteFile = new RequestSettings();
            DeleteDirectory = new RequestSettings();
            CreateDirectory = new RequestSettings();
            Image = new RequestSettings();

            Filter = DefaultFilter;
        }

        public INavigatable CreateDirectory 
        { 
            get; 
            private set; 
        }

        public INavigatable Select
        {
            get;
            private set;
        }

        public INavigatable Image
        {
            get;
            private set;
        }

        public INavigatable Thumbnail
        {
            get;
            private set;
        }

        public INavigatable Upload
        {
            get;
            private set;
        }
        
        public INavigatable DeleteFile
        {
            get;
            private set;
        }
        
        public INavigatable DeleteDirectory
        {
            get;
            private set;
        }

        public string Filter
        {
            get;
            set;
        }

        public void SerializeTo(string key, IClientSideObjectWriter writer, IEditorUrlBuilder urlBuilder)
        {
            Func<string, string> encoder = url => owner.IsSelfInitialized ? HttpUtility.UrlDecode(url) : url;
            var json = new Dictionary<string, string>();

            if (Select.HasValue())
            {
                json["selectUrl"] = encoder(urlBuilder.PrepareUrl(Select));
            }

            if (Thumbnail.HasValue())
            {
                json["thumbUrl"] = encoder(urlBuilder.PrepareUrl(Thumbnail));
            }

            if (Image.HasValue())
            {
                json["imageUrl"] = encoder(urlBuilder.PrepareUrl(Image));
            }

            if (Upload.HasValue())
            {
                json["uploadUrl"] = encoder(urlBuilder.PrepareUrl(Upload));
            }            
            
            if (DeleteFile.HasValue())
            {
                json["deleteFileUrl"] = encoder(urlBuilder.PrepareUrl(DeleteFile));
            }            
            
            if (DeleteDirectory.HasValue())
            {
                json["deleteDirectoryUrl"] = encoder(urlBuilder.PrepareUrl(DeleteDirectory));
            }

            if (CreateDirectory.HasValue())
            {
                json["createDirectoryUrl"] = encoder(urlBuilder.PrepareUrl(CreateDirectory));
            }

            if (Filter.HasValue() && Filter != DefaultFilter)
            {
                json["filter"] = Filter;
            }

            writer.AppendObject(key, json);
        }
    }
}
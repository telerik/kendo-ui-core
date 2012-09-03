using Kendo.Mvc.Extensions;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    public class EditorFileBrowserSettings : JsonObject
    {
        public const string DefaultFilter = "*.png,*.gif,*.jpg,*.jpeg";

        public EditorFileBrowserSettings()
        {
            Filter = DefaultFilter;

            Read = new EditorFileBrowserOperation();
            Thumbnail = new EditorFileBrowserOperation();
            Upload = new EditorFileBrowserOperation();
            Create = new EditorFileBrowserOperation();
            Destroy = new EditorFileBrowserOperation();
            Image = new EditorFileBrowserOperation();
        }

        public string Filter
        {
            get;
            set;
        }

        public EditorFileBrowserOperation Read
        {
            get;
            set;
        }

        public EditorFileBrowserOperation Thumbnail
        {
            get;
            set;
        }

        public EditorFileBrowserOperation Upload
        {
            get;
            set;
        }

        public EditorFileBrowserOperation Create
        {
            get;
            set;
        }

        public EditorFileBrowserOperation Destroy
        {
            get;
            set;
        }

        public EditorFileBrowserOperation Image
        {
            get;
            set;
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (Filter != DefaultFilter)
            {
                json["filter"] = Filter;
            }

            var read = Read.ToJson();
            if (read.Any())
            {
                var transport = new Dictionary<string, object>();
                json["transport"] = transport;

                transport["read"] = read;

                var thumbnail = Thumbnail.ToJson();
                if (thumbnail.Any())
                {
                    transport["thumbnailUrl"] = thumbnail;
                }

                var upload = Upload.ToJson();
                if (upload.Any())
                {
                    transport["uploadUrl"] = upload;
                }

                var destroy = Destroy.ToJson();
                if (destroy.Any())
                {
                    transport["destroy"] = destroy;
                }

                var create = Create.ToJson();
                if (create.Any())
                {
                    transport["create"] = create;
                }

                var image = Image.ToJson();
                if (image.Any())
                {
                    transport["imageUrl"] = image;
                }
            }
        }
    }
}

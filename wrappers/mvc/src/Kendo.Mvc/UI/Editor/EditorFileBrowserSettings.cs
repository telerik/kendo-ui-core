using Kendo.Mvc.Extensions;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Kendo.Mvc.UI
{
    public class EditorImageBrowserSettings : JsonObject
    {
        public const string DefaultFilter = "*.png,*.gif,*.jpg,*.jpeg";
        private readonly EditorImageBrowserMessages messages;

        public EditorImageBrowserSettings(EditorImageBrowserMessages messages)
        {
            Filter = DefaultFilter;
            this.messages = messages;

            Read = new EditorImageBrowserOperation();
            Thumbnail = new EditorImageBrowserOperation();
            Upload = new EditorImageBrowserOperation();
            Create = new EditorImageBrowserOperation();
            Destroy = new EditorImageBrowserOperation();
            Image = new EditorImageBrowserOperation();
        }

        public string Filter
        {
            get;
            set;
        }

        public EditorImageBrowserOperation Read
        {
            get;
            set;
        }

        public EditorImageBrowserOperation Thumbnail
        {
            get;
            set;
        }

        public EditorImageBrowserOperation Upload
        {
            get;
            set;
        }

        public EditorImageBrowserOperation Create
        {
            get;
            set;
        }

        public EditorImageBrowserOperation Destroy
        {
            get;
            set;
        }

        public EditorImageBrowserOperation Image
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

            var messages = this.messages.ToJson();
            if (messages.Any())
            {
                json["messages"] = messages;
            }

            var read = Read.ToJson();
            if (read.Any())
            {
                var transport = new Dictionary<string, object>();
                json["transport"] = transport;

                transport["read"] = read;
                transport["type"] = "imagebrowser-aspnetmvc";

                var thumbnail = Thumbnail.ToJson();
                if (thumbnail.Any())
                {
                    transport["thumbnailUrl"] = thumbnail["url"];
                }

                var upload = Upload.ToJson();
                if (upload.Any())
                {
                    transport["uploadUrl"] = upload["url"];
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

                var image = Image.Url;
                if (image.HasValue())
                {
                    image = Regex.Replace(image, "(%20)*%7B0(%20)*", "{0", RegexOptions.IgnoreCase);
                    image = Regex.Replace(image, "(%20)*%7D(%20)*", "}", RegexOptions.IgnoreCase);
                    transport["imageUrl"] = image;
                }
            }
        }
    }
}

using Kendo.Mvc.Extensions;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace Kendo.Mvc.UI
{
    public class EditorFileBrowserSettings : JsonObject
    {
        public const string DefaultFileTypes = "*.*";
        private readonly EditorFileBrowserMessages messages;

        public EditorFileBrowserSettings(EditorFileBrowserMessages messages)
        {
            FileTypes = DefaultFileTypes;
            this.messages = messages;

            Read = new EditorFileBrowserOperation();
            Upload = new EditorFileBrowserOperation();
            Create = new EditorFileBrowserOperation();
            Destroy = new EditorFileBrowserOperation();
            File = new EditorFileBrowserOperation();
        }

        public string FileTypes
        {
            get;
            set;
        }

        public EditorFileBrowserOperation Read
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

        public EditorFileBrowserOperation File
        {
            get;
            set;
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (FileTypes != DefaultFileTypes)
            {
                json["fileTypes"] = FileTypes;
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
                transport["type"] = "filebrowser-aspnetmvc";

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

                var file = File.Url;
                if (file.HasValue())
                {
                    file = Regex.Replace(file, "(%20)*%7B0(%20)*", "{0", RegexOptions.IgnoreCase);
                    file = Regex.Replace(file, "(%20)*%7D(%20)*", "}", RegexOptions.IgnoreCase);
                    transport["fileUrl"] = file;
                }
            }
        }
    }
}

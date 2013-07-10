using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    public class UploadFile : JsonObject
    {
        private readonly string DefaultName = String.Empty;

        private const long DefaultSize = 0L;

        private readonly string DefaultExtension = String.Empty;

        public string Name { get; set; }

        public long Size { get; set; }

        public string Extension { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            FluentDictionary.For(json)
                .Add("name", Name, DefaultName)
                .Add("size", Size, DefaultSize)
                .Add("extension", Extension, DefaultExtension);
        }
    }
}

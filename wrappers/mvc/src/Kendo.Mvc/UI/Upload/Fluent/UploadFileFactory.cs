using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class UploadFileFactory : IHideObjectMembers
    {
        private readonly Upload container;

        public UploadFileFactory(Upload uploadContainer)
        {
            container = uploadContainer;
        }

        public UploadFileBuilder Add()
        {
            var file = new UploadFile();

            container.Files.Add(file);

            return new UploadFileBuilder(file);
        }
    }
}

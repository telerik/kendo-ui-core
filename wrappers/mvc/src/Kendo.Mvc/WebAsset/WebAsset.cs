namespace Kendo.Mvc
{
    using System.IO;

    public class WebAsset : IWebAsset
    {
        public WebAsset(string source)
        {
            Source = source;
        }

        public bool UseTelerikContentDeliveryNetwork
        {
            get;
            set;
        }

        public string FileName
        {
            get
            {
                return Path.GetFileName(Source);
            }
        }

        public string Version
        {
            get;
            set;
        }

        public string Source
        {
            get;
            private set;
        }

        public string Extension
        {
            get
            {
                return Path.GetExtension(Source);
            }
        }
    }
}
namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.Infrastructure;

    public class UploadMessages : JsonObject, IUploadMessages
    { 
        private const string DefaultCancel = "Cancel";

        private const string DefaultDropFilesHere = "drop files here to upload";

        private const string DefaultRemove = "Remove";

        private const string DefaultRetry = "Retry";

        private const string DefaultSelect = "Select...";

        private const string DefaultStatusFailed = "failed";

        private const string DefaultStatusUploaded = "uploaded";

        private const string DefaultStatusUploading = "uploading";

        private const string DefaultUploadSelectedFiles = "Upload files";

        private const string DefaultHeaderStatusUploading = "Uploading...";

        private const string DefaultHeaderStatusUploaded = "Done";

        public UploadMessages()
        {
            Cancel = Messages.Upload_Cancel;
            DropFilesHere = Messages.Upload_DropFilesHere;
            Remove = Messages.Upload_Remove;
            Retry = Messages.Upload_Retry;
            Select = Messages.Upload_Select;
            StatusFailed = Messages.Upload_StatusFailed;
            StatusUploaded = Messages.Upload_StatusUploaded;
            StatusUploading = Messages.Upload_StatusUploading;
            UploadSelectedFiles = Messages.Upload_UploadSelectedFiles;
            HeaderStatusUploading = Messages.Upload_HeaderStatusUploading;
            HeaderStatusUploaded = Messages.Upload_HeaderStatusUploaded;
        }

        public string Cancel { get; set; }

        public string DropFilesHere { get; set; }

        public string Remove { get; set; }

        public string Retry { get; set; }

        public string Select { get; set; }

        public string StatusFailed { get; set; }

        public string StatusUploaded { get; set; }

        public string StatusUploading { get; set; }

        public string UploadSelectedFiles { get; set; }

        public string HeaderStatusUploading { get; set; }

        public string HeaderStatusUploaded { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            FluentDictionary.For(json)
                .Add("cancel", Cancel, DefaultCancel)
                .Add("dropFilesHere", DropFilesHere, DefaultDropFilesHere)
                .Add("remove", Remove, DefaultRemove)
                .Add("retry", Retry, DefaultRetry)
                .Add("select", Select, DefaultSelect)
                .Add("statusFailed", StatusFailed, DefaultStatusFailed)
                .Add("statusUploaded", StatusUploaded, DefaultStatusUploaded)
                .Add("statusUploading", StatusUploading, DefaultStatusUploading)
                .Add("uploadSelectedFiles", UploadSelectedFiles, DefaultUploadSelectedFiles)
                .Add("headerStatusUploading", HeaderStatusUploading, DefaultHeaderStatusUploading)
                .Add("headerStatusUploaded", HeaderStatusUploaded, DefaultHeaderStatusUploaded);
        }
    }
}
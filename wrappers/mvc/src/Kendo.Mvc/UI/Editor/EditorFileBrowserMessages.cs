using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    public class EditorImageBrowserMessages : JsonObject
    {
        public EditorImageBrowserMessages()
        {
            DeleteFile = Messages.Editor_DeleteFile;
            DirectoryNotFound = Messages.Editor_DirectoryNotFound;
            EmptyFolder = Messages.Editor_EmptyFolder;
            InvalidFileType = Messages.Editor_InvalidFileType;
            OrderBy = Messages.Editor_OrderBy;
            OrderByName = Messages.Editor_OrderByName;
            OrderBySize = Messages.Editor_OrderBySize;
            OverwriteFile = Messages.Editor_OverwriteFile;
            UploadFile = Messages.Editor_UploadFile;
            DropFilesHere = Messages.Editor_DropFilesHere;
        }

        public string DeleteFile { get; set; }
        public string DirectoryNotFound { get; set; }
        public string EmptyFolder { get; set; }
        public string InvalidFileType { get; set; }
        public string OrderBy { get; set; }
        public string OrderByName { get; set; }
        public string OrderBySize { get; set; }
        public string OverwriteFile { get; set; }
        public string UploadFile { get; set; }
        public string DropFilesHere { get; set; }

        private const string DefaultDeleteFile = "Are you sure you want to delete \"{0}\"?";
        private const string DefaultDirectoryNotFound = "A directory with this name was not found.";
        private const string DefaultEmptyFolder = "Empty Folder";
        private const string DefaultInvalidFileType = "The selected file \"{0}\" is not valid. Supported file types are {1}.";
        private const string DefaultOrderBy = "Arrange by:";
        private const string DefaultOrderByName = "Name";
        private const string DefaultOrderBySize = "Size";
        private const string DefaultOverwriteFile = "'A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?";
        private const string DefaultUploadFile = "Upload";
        private const string DefaultDropFilesHere = "drop files here to upload";

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (DeleteFile != DefaultDeleteFile)
            {
                json["deleteFile"] = DeleteFile;
            }

            if (DirectoryNotFound != DefaultDirectoryNotFound)
            {
                json["directoryNotFound"] = DirectoryNotFound;
            }

            if (EmptyFolder != DefaultEmptyFolder)
            {
                json["emptyFolder"] = EmptyFolder;
            }

            if (InvalidFileType != DefaultInvalidFileType)
            {
                json["invalidFileType"] = InvalidFileType;
            }

            if (OrderBy != DefaultOrderBy)
            {
                json["orderBy"] = OrderBy;
            }

            if (OrderBySize != DefaultOrderBySize)
            {
                json["orderBySize"] = OrderBySize;
            }

            if (OrderByName != DefaultOrderByName)
            {
                json["orderByName"] = OrderByName;
            }

            if (OverwriteFile != DefaultOverwriteFile)
            {
                json["overwriteFile"] = OverwriteFile;
            }

            if (UploadFile != DefaultUploadFile)
            {
                json["uploadFile"] = UploadFile;
            }

            if (DropFilesHere != DefaultDropFilesHere)
            {
                json["dropFilesHere"] = DropFilesHere;
            }
        }        
    }
}

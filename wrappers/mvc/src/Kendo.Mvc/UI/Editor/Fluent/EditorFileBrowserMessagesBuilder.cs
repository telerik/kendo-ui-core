namespace Kendo.Mvc.UI.Fluent
{
    public class EditorFileBrowserMessagesBuilder : IHideObjectMembers
    {
        private readonly EditorFileBrowserMessages messages;

        public EditorFileBrowserMessagesBuilder(EditorFileBrowserMessages messages)
        {
            this.messages = messages;
        }

        public EditorFileBrowserMessagesBuilder DeleteFile(string message)
        {
            messages.DeleteFile = message;
            return this;
        }

        public EditorFileBrowserMessagesBuilder DirectoryNotFound(string message)
        {
            messages.DirectoryNotFound = message;
            return this;
        }

        public EditorFileBrowserMessagesBuilder EmptyFolder(string message)
        {
            messages.EmptyFolder = message;
            return this;
        }

        public EditorFileBrowserMessagesBuilder InvalidFileType(string message)
        {
            messages.InvalidFileType = message;
            return this;
        }

        public EditorFileBrowserMessagesBuilder OrderBy(string message)
        {
            messages.OrderBy = message;
            return this;
        }

        public EditorFileBrowserMessagesBuilder OrderByName(string message)
        {
            messages.OrderByName = message;
            return this;
        }

        public EditorFileBrowserMessagesBuilder OrderBySize(string message)
        {
            messages.OrderBySize = message;
            return this;
        }

        public EditorFileBrowserMessagesBuilder OverwriteFile(string message)
        {
            messages.OverwriteFile = message;
            return this;
        }

        public EditorFileBrowserMessagesBuilder UploadFile(string message)
        {
            messages.UploadFile = message;
            return this;
        }
    }
}
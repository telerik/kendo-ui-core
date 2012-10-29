namespace Kendo.Mvc.UI.Fluent
{
    public class EditorImageBrowserMessagesBuilder : IHideObjectMembers
    {
        private readonly EditorImageBrowserMessages messages;

        public EditorImageBrowserMessagesBuilder(EditorImageBrowserMessages messages)
        {
            this.messages = messages;
        }

        public EditorImageBrowserMessagesBuilder DeleteFile(string message)
        {
            messages.DeleteFile = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder DirectoryNotFound(string message)
        {
            messages.DirectoryNotFound = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder EmptyFolder(string message)
        {
            messages.EmptyFolder = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder InvalidFileType(string message)
        {
            messages.InvalidFileType = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder OrderBy(string message)
        {
            messages.OrderBy = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder OrderByName(string message)
        {
            messages.OrderByName = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder OrderBySize(string message)
        {
            messages.OrderBySize = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder OverwriteFile(string message)
        {
            messages.OverwriteFile = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder UploadFile(string message)
        {
            messages.UploadFile = message;
            return this;
        }

        public EditorImageBrowserMessagesBuilder DropFilesHere(string message)
        {
            messages.DropFilesHere = message;
            return this;
        }
    }
}
using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class EditorMessagesBuilder : IHideObjectMembers
    {
        private readonly EditorMessages messages;

        public EditorMessagesBuilder(EditorMessages messages)
        {
            this.messages = messages;
        }

        public EditorMessagesBuilder Bold(string message)
        {
            messages.Bold = message;
            return this;
        }

        public EditorMessagesBuilder Italic(string message)
        {
            messages.Italic = message;
            return this;
        }

        public EditorMessagesBuilder Underline(string message)
        {
            messages.Underline = message;
            return this;
        }

        public EditorMessagesBuilder Strikethrough(string message)
        {
            messages.Strikethrough = message;
            return this;
        }

        public EditorMessagesBuilder Superscript(string message)
        {
            messages.Superscript = message;
            return this;
        }

        public EditorMessagesBuilder Subscript(string message)
        {
            messages.Subscript = message;
            return this;
        }

        public EditorMessagesBuilder JustifyCenter(string message)
        {
            messages.JustifyCenter = message;
            return this;
        }

        public EditorMessagesBuilder JustifyLeft(string message)
        {
            messages.JustifyLeft = message;
            return this;
        }

        public EditorMessagesBuilder JustifyRight(string message)
        {
            messages.JustifyRight = message;
            return this;
        }

        public EditorMessagesBuilder JustifyFull(string message)
        {
            messages.JustifyFull = message;
            return this;
        }

        public EditorMessagesBuilder InsertOrderedList(string message)
        {
            messages.InsertOrderedList = message;
            return this;
        }

        public EditorMessagesBuilder InsertUnorderedList(string message)
        {
            messages.InsertUnorderedList = message;
            return this;
        }

        public EditorMessagesBuilder Indent(string message)
        {
            messages.Indent = message;
            return this;
        }

        public EditorMessagesBuilder Outdent(string message)
        {
            messages.Outdent = message;
            return this;
        }

        public EditorMessagesBuilder CreateLink(string message)
        {
            messages.CreateLink = message;
            return this;
        }

        public EditorMessagesBuilder Unlink(string message)
        {
            messages.Unlink = message;
            return this;
        }

        public EditorMessagesBuilder InsertImage(string message)
        {
            messages.InsertImage = message;
            return this;
        }

        public EditorMessagesBuilder InsertHtml(string message)
        {
            messages.InsertHtml = message;
            return this;
        }

        public EditorMessagesBuilder FontName(string message)
        {
            messages.FontName = message;
            return this;
        }

        public EditorMessagesBuilder FontNameInherit(string message)
        {
            messages.FontNameInherit = message;
            return this;
        }

        public EditorMessagesBuilder FontSize(string message)
        {
            messages.FontSize = message;
            return this;
        }

        public EditorMessagesBuilder FontSizeInherit(string message)
        {
            messages.FontSizeInherit = message;
            return this;
        }

        public EditorMessagesBuilder FormatBlock(string message)
        {
            messages.FormatBlock = message;
            return this;
        }

        public EditorMessagesBuilder BackColor(string message)
        {
            messages.BackColor = message;
            return this;
        }

        public EditorMessagesBuilder ForeColor(string message)
        {
            messages.ForeColor = message;
            return this;
        }

        public EditorMessagesBuilder Styles(string message)
        {
            messages.Styles = message;
            return this;
        }

        public EditorMessagesBuilder FileBrowser(Action<EditorFileBrowserMessagesBuilder> configurator)
        {
            configurator(new EditorFileBrowserMessagesBuilder(messages.FileBrowserMessages));

            return this;
        } 
    }
}
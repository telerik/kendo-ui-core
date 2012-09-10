namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Resources;

    public class EditorMessages : JsonObject
    {
        public EditorMessages()
        {
            Bold = Messages.Editor_Bold;
            Italic = Messages.Editor_Italic;
            Underline = Messages.Editor_Underline;
            Strikethrough = Messages.Editor_Strikethrough;
            Superscript = Messages.Editor_Superscript;
            Subscript = Messages.Editor_Subscript;
            JustifyCenter = Messages.Editor_JustifyCenter;
            JustifyLeft = Messages.Editor_JustifyLeft;
            JustifyRight = Messages.Editor_JustifyRight;
            JustifyFull = Messages.Editor_JustifyFull;
            InsertOrderedList = Messages.Editor_InsertOrderedList;
            InsertUnorderedList = Messages.Editor_InsertUnorderedList;
            Indent = Messages.Editor_Indent;
            Outdent = Messages.Editor_Outdent;
            CreateLink = Messages.Editor_CreateLink;
            Unlink = Messages.Editor_Unlink;
            InsertImage = Messages.Editor_InsertImage;
            InsertHtml = Messages.Editor_InsertHtml;
            FontName = Messages.Editor_FontName;
            FontNameInherit = Messages.Editor_FontNameInherit;
            FontSize = Messages.Editor_FontSize;
            FontSizeInherit = Messages.Editor_FontSizeInherit;
            FormatBlock = Messages.Editor_FormatBlock;
            Styles = Messages.Editor_Styles;

            FileBrowserMessages = new EditorFileBrowserMessages();
        }

        public string Bold { get; set; }
        public string Italic { get; set; }
        public string Underline { get; set; }
        public string Strikethrough { get; set; }
        public string Superscript { get; set; }
        public string Subscript { get; set; }
        public string JustifyCenter { get; set; }
        public string JustifyLeft { get; set; }
        public string JustifyRight { get; set; }
        public string JustifyFull { get; set; }
        public string InsertOrderedList { get; set; }
        public string InsertUnorderedList { get; set; }
        public string Indent { get; set; }
        public string Outdent { get; set; }
        public string CreateLink { get; set; }
        public string Unlink { get; set; }
        public string InsertImage { get; set; }
        public string InsertHtml { get; set; }
        public string FontName { get; set; }
        public string FontNameInherit { get; set; }
        public string FontSize { get; set; }
        public string FontSizeInherit { get; set; }
        public string FormatBlock { get; set; }
        public string Styles { get; set; }

        public EditorFileBrowserMessages FileBrowserMessages { get; set; }

        private const string DefaultBold = "Bold";
        private const string DefaultItalic = "Italic";
        private const string DefaultUnderline = "Underline";
        private const string DefaultStrikethrough = "Strikethrough";
        private const string DefaultSuperscript = "Superscript";
        private const string DefaultSubscript = "Subscript";
        private const string DefaultJustifyCenter = "Center text";
        private const string DefaultJustifyLeft = "Align text left";
        private const string DefaultJustifyRight = "Align text right";
        private const string DefaultJustifyFull = "Justify";
        private const string DefaultInsertOrderedList = "Insert ordered list";
        private const string DefaultInsertUnorderedList = "Insert unordered list";
        private const string DefaultIndent = "Indent";
        private const string DefaultOutdent = "Outdent";
        private const string DefaultCreateLink = "Insert hyperlink";
        private const string DefaultUnlink = "Remove hyperlink";
        private const string DefaultInsertImage = "Insert image";
        private const string DefaultInsertHtml = "Insert HTML";
        private const string DefaultFontName = "Select font family";
        private const string DefaultFontNameInherit = "(inherited font)";
        private const string DefaultFontSize = "Select font size";
        private const string DefaultFontSizeInherit = "(inherited size)";
        private const string DefaultFormatBlock = "Format";
        private const string DefaultStyles = "Styles";

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Bold != DefaultBold)
            {
                json["bold"] = Bold;
            }

            if (Italic != DefaultItalic)
            {
                json["italic"] = Italic;
            }

            if (Underline != DefaultUnderline)
            {
                json["underline"] = Underline;
            }

            if (Strikethrough != DefaultStrikethrough)
            {
                json["strikethrough"] = Strikethrough;
            }

            if (Superscript != DefaultSuperscript)
            {
                json["superscript"] = Superscript;
            }

            if (Subscript != DefaultSubscript)
            {
                json["subscript"] = Subscript;
            }

            if (JustifyCenter != DefaultJustifyCenter)
            {
                json["justifyCenter"] = JustifyCenter;
            }

            if (JustifyLeft != DefaultJustifyLeft)
            {
                json["justifyLeft"] = JustifyLeft;
            }

            if (JustifyRight != DefaultJustifyRight)
            {
                json["justifyRight"] = JustifyRight;
            }

            if (JustifyFull != DefaultJustifyFull)
            {
                json["justifyFull"] = JustifyFull;
            }

            if (InsertOrderedList != DefaultInsertOrderedList)
            {
                json["insertOrderedList"] = InsertOrderedList;
            }

            if (InsertUnorderedList != DefaultInsertUnorderedList)
            {
                json["insertUnorderedList"] = InsertUnorderedList;
            }

            if (Indent != DefaultIndent)
            {
                json["indent"] = Indent;
            }

            if (Indent != DefaultIndent)
            {
                json["indent"] = Indent;
            }

            if (Outdent != DefaultOutdent)
            {
                json["outdent"] = Outdent;
            }

            if (CreateLink != DefaultCreateLink)
            {
                json["createLink"] = DefaultCreateLink;
            }

            if (Unlink != DefaultUnlink)
            {
                json["unlink"] = DefaultUnlink;
            }

            if (InsertImage != DefaultInsertImage)
            {
                json["insertImage"] = InsertImage;
            }

            if (InsertHtml != DefaultInsertHtml)
            {
                json["insertHtml"] = InsertHtml;
            }

            if (FontName != DefaultFontName)
            {
                json["fontName"] = FontName;
            }

            if (FontNameInherit != DefaultFontNameInherit)
            {
                json["fontNameInherit"] = FontNameInherit;
            }

            if (FontSize != DefaultFontSize)
            {
                json["fontSize"] = FontSize;
            }

            if (FontSizeInherit != DefaultFontSizeInherit)
            {
                json["fontSizeInherit"] = FontSizeInherit;
            }

            if (FormatBlock != DefaultFormatBlock)
            {
                json["formatBlock"] = FormatBlock;
            }

            if (Styles != DefaultStyles)
            {
                json["styles"] = Styles;
            }
        }
    }
}
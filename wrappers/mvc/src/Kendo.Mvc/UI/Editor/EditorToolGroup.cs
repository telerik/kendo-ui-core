namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    
    public class EditorToolGroup
    {
        public EditorToolGroup(Editor editor)
        {
            Tools = new List<IEditorTool>();
            Editor = editor;
        }

        public Editor Editor
        {
            get;
            private set;
        }

        public EditorToolGroup(IEnumerable<IEditorTool> tools)
        {
            Tools = new List<IEditorTool>(tools);
        }

        public IList<IEditorTool> Tools
        {
            get;
            private set;
        }
    }
}

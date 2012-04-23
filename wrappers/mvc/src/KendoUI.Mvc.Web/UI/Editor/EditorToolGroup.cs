// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
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

// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    public interface IGridLocalization
    {
        string CancelChanges { get; }

        string SaveChanges { get; }

        string Select 
        { 
            get; 
        }

        string GroupHint
        {
            get;
        }
        
        string AddNew
        {
            get;
        }

        string Insert
        {
            get;
        }

        string Update
        {
            get;
        }
        
        string Edit
        {
            get;
        }
        
        string Delete
        {
            get;
        }
        
        string Cancel
        {
            get;
        }
    }
}
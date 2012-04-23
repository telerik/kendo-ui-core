// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Globalization;
    using Infrastructure;

    public class GridLocalization : ViewComponentLocalization, IClientSerializable, IGridLocalization
    {
        public GridLocalization(ILocalizationService localizationService, CultureInfo culture) 
            : base(localizationService, null, "GridLocalization", culture)
        {
        }

        public string AddNew
        {
            get { return GetValue("AddNew"); }
        }

        public string Insert
        {
            get { return GetValue("Insert"); }
        }

        public string Update
        {
            get { return GetValue("Update"); }
        }

        public string Select
        {
            get { return GetValue("Select"); }
        }

        public string Edit
        {
            get { return GetValue("Edit"); }
        }

        public string NoRecords
        {
            get { return GetValue("NoRecords"); }
        }

        public string Cancel
        {
            get { return GetValue("Cancel"); }
        }

        public string Delete
        {
            get { return GetValue("Delete"); }
        }

        public string PageOf 
        { 
            get { return GetValue("PageOf"); } 
        }

        public string Page
        {
            get { return GetValue("Page"); }
        }

        public string DisplayingItems
        {
            get { return GetValue("DisplayingItems"); }
        }

        public string GroupHint 
        { 
            get { return GetValue("GroupHint"); } 
        }

        public string Filter
        {
            get { return GetValue("Filter"); }
        }

        public string Refresh
        {
            get { return GetValue("Refresh"); }
        }

        public string SortedAsc
        {
            get { return GetValue("SortedAsc"); }
        }

        public string SortedDesc
        {
            get { return GetValue("SortedDesc"); }
        }

        public string UnGroup
        {
            get { return GetValue("UnGroup"); }
        }

        public void SerializeTo(string key, IClientSideObjectWriter writer)
        {
            if (!IsDefault)
            {
                writer.AppendObject(key, ToJson());
            }
        }

        public string CancelChanges
        {
            get
            {
                return GetValue("CancelChanges");
            }
            
        }

        public string SaveChanges
        {
            get
            {
                return GetValue("SaveChanges");
            }
        }
    }
}
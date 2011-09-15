using System;
using System.Collections.Generic;
using System.Text;

using ArtOfTest.Common.UnitTesting;
using ArtOfTest.WebAii.Core;
using ArtOfTest.WebAii.Controls.HtmlControls;
using ArtOfTest.WebAii.Controls.HtmlControls.HtmlAsserts;
using ArtOfTest.WebAii.Design;
using ArtOfTest.WebAii.Design.Execution;
using ArtOfTest.WebAii.ObjectModel;
using ArtOfTest.WebAii.Silverlight;
using ArtOfTest.WebAii.Silverlight.UI;
using Telerik.WebAii.Controls.Html;
using Telerik.WebAii.Controls.Xaml;
using TestProject2;

namespace AeroViewr
{

    //
    // You can add custom execution steps by simply
    // adding a void function and decorating it with the [CodedStep] 
    // attribute to the test method. 
    // Those steps will automatically show up in the test steps on save.
    //
    // The BaseWebAiiTest exposes all key objects that you can use
    // to access the current testcase context. [i.e. ActiveBrowser, Find ..etc]
    //
    // Data driven tests can use the Data[columnIndex] or Data["columnName"] 
    // to access data for a specific data iteration.
    //
    // Example:
    //
    // [CodedStep("MyCustom Step Description")]
    // public void MyCustomStep()
    // {
    //        // Custom code goes here
    //      ActiveBrowser.NavigateTo("http://www.google.com");
    //
    //        // Or
    //        ActiveBrowser.NavigateTo(Data["url"]);
    // }
    //
        

    public class PlayPause : BaseWebAiiTest
    {
        #region [ Dynamic Pages Reference ]

        private Pages _pages;

        /// <summary>
        /// Gets the Pages object that has references
        /// to all the elements, frames or regions
        /// in this project.
        /// </summary>
        public Pages Pages
        {
            get
            {
                if (_pages == null)
                {
                    _pages = new Pages(Manager.Current);
                }
                return _pages;
            }
        }

        #endregion

        [CodedStep(@"Wait for '7000' msec.")]
        public void PlayPause_CodedStep()
        {

            // Wait for '7000' msec.
            System.Threading.Thread.Sleep(1000);
            Pages.AeroViewr.VisionImage.AssertAttribute().Value("src", ArtOfTest.Common.StringCompareType.NotContain, savedAttr.Value);

        }

        iAttribute savedAttr = null;

        [CodedStep(@"store fires image src")]
        public void PlayPause_CodedStep1()
        {

            
            

            foreach (iAttribute attr in Pages.AeroViewr.BigPhotoImage.Attributes)
            {
                if (attr.Name == "src")
                {
                    savedAttr = attr;
                    break;
                }
            }


        }


        
        // Add your test methods here...
    }
}

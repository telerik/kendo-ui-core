using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Globalization;
using System.Windows.Forms;



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
using Telerik.WebAii.Controls.Xaml.Wpf;

namespace KendoDemosTests
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
        

    public class Globalization : BaseWebAiiTest
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

        [CodedStep(@"ASSERT_VALUE_IN_Discount_start_date:")]
        public void Globalization_CodedStep()
        {

            // Wait for '250' msec.
            System.Threading.Thread.Sleep(250);
            CultureInfo bgCulture = CultureInfo.CreateSpecificCulture("bg-BG");
            DateTime Tomorrow = DateTime.Today.AddDays(1);
            //DateTime Today = DateTime.Today;
            //String format = "d.mm.yyyy";
            //string TodayStr = Today.ToString(format);


            //Console.WriteLine(thisDate.ToString("d", culture));
            
            System.Threading.Thread.Sleep(250);
            //MessageBox.Show(Tomorrow.ToString("d", bgCulture));
            Assert.IsTrue(ArtOfTest.Common.CompareUtils.StringCompare(Pages.Globalization.StartDateText.Text, Tomorrow.ToString("d", bgCulture), ArtOfTest.Common.StringCompareType.Same));
            
            
            
        }

        [CodedStep(@"Verify textbox 'StartDateText' content 'Same' 'Fri Dec 2 11:49:59 UTC+0200 2011'.")]
        public void Globalization_CodedStep1()
        {

            // Verify textbox 'StartDateText' content 'Same' 'Fri Dec 2 11:49:59 UTC+0200 2011'.
            System.Threading.Thread.Sleep(250);
            

        }
        
        // Add your test methods here...
    }
}

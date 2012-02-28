(function () {

    /**
    * @name kendo.ui.MVVM
    * @namespace
    */

    /** @name kendo.ui.MVVM.Description
    * @section
    *  <p>
    *       Model View ViewModel (MVVM) is a design pattern which helps developers separate the Model from the View. The View-Model part of MVVM is responsible for
    *       exposing the data objects from the Model in such a way that those objects are easily consumed in the View.
    *  </p>
    *  <p>
    *       Kendo MVVM is an implementation of the MVVM pattern which is seamlessly integrated with the rest of the Kendo framework (widgets and DataSource).
    *  </p>
    *  <h3>Getting Started</h3>
    *  @exampleTitle Binding HTML View to a View-Model
    *  @example
    *  <!-- View -->
    *  <div id="view">
    *    <!-- The value of the INPUT element is bound to the "firstName" field of the View-Model.
    *    When the value changes so will the "firstName" field and vice versa.  -->
    *    <label>First Name:<input data-bind="value: firstName" /></label>
    *    <!-- The value of the INPUT element is bound to the "lastName" field of the View-Model.
    *    When the value changes so will the "lastName" field and vice versa.   -->
    *    <label>Last Name:<input data-bind="value: lastName" /></label>
    *    <!-- The click event of the BUTTON element is bound to the "displayGreeting" method of the View-Model.
    *    When the user clicks the button the "displayGreeting" method will be invoked.  -->
    *    <button data-bind="click: displayGreeting">Display Greeting</button>
    *  </div>
    *  <script>
    *    // View-Model
    *    var viewModel = {
    *       firstName: "John",
    *       lastName: "Doe",
    *       displayGreeting: function() {
    *           // Get the current values of "firstName" and "lastName"
    *           var firstName = this.get("firstName");
    *           var lastName = this.get("lastName");
    *
    *           alert("Hello, " + firstName + " " + lastName + "!!!");
    *       }
    *    };
    *    // Bind the View to the View-Model
    *    kendo.bind($("#view"), viewModel);
    *  </script>
    */
})();

import "./kendo.core.js";
import "./kendo.data.js";
import { binders, Binder, bind, unbind, notify, observable, observableHierarchy } from "./binder/index.js";

export const __meta__ = {
    id: "binder",
    name: "MVVM",
    category: "framework",
    description: "Model View ViewModel (MVVM) is a design pattern which helps developers separate the Model (the data) from the View (the UI).",
    depends: ["core", "data"],
};

const kendo = window.kendo;

kendo.unbind = unbind;
kendo.bind = bind;
kendo.data.binders = binders;
kendo.data.Binder = Binder;
kendo.notify = notify;
kendo.observable = observable;
kendo.observableHierarchy = observableHierarchy;

export default kendo;

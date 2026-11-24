import { Widget } from "./widget";
import { namespaceService } from "../services/namespace.service";
import { selectorService } from "../services/selector.service";
import { widgetRegistryService } from "../services/widget-registry.service";
import { widgetUtilsService } from "../services/widget-utils.service";
const ContainerNullObject = { bind: function () { return this; }, nullObject: true, options: {} };
export class MobileWidget extends Widget {
    static options = {
        prefix: "Mobile"
    };
    static events = [];
    constructor(element, options) {
        super(element, options);
    }
    init(element, options) {
        Widget.fn.init.call(this, element, options);
        this.element.autoApplyNS();
        this.wrapper = this.element;
        this.element.addClass("km-widget");
    }
    destroy() {
        Widget.fn.destroy.call(this);
        this.element.kendoDestroy();
    }
    view() {
        const viewElement = this.element
            .closest(selectorService.roleSelector("view splitview modalview drawer", namespaceService.ns));
        return (this.getMobileNamespace() && widgetUtilsService.widgetInstance(viewElement, this.getMobileNamespace())) || ContainerNullObject;
    }
    viewHasNativeScrolling() {
        const view = this.view();
        return view && view.options.useNativeScrolling;
    }
    container() {
        const element = this.element
            .closest(selectorService.roleSelector("view layout modalview drawer splitview", namespaceService.ns));
        return (this.getMobileNamespace() && widgetUtilsService.widgetInstance(element.eq(0), this.getMobileNamespace())) || ContainerNullObject;
    }
    getMobileNamespace() {
        return widgetRegistryService.getNamespace("mobile.ui");
    }
}
MobileWidget.applyEnumerablePrototype();
MobileWidget.applyPrototypeMembers();
export class MobileDataBoundWidget extends MobileWidget {
    static events = [];
    constructor(element, options) {
        super(element, options);
    }
    dataItems() {
        const dataSource = this.dataSource;
        if (dataSource && typeof dataSource.view === "function") {
            return dataSource.flatView();
        }
        return [];
    }
}
MobileDataBoundWidget.applyEnumerablePrototype();
MobileDataBoundWidget.applyPrototypeMembers();

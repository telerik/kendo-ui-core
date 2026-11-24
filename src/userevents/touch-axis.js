import { Class } from "../core/index.js";
import { now, support } from "./constants.js";
const OS = support.mobileOS;
const invalidZeroEvents = OS && OS.android;
function getCoordinateKey(prefix, axis) {
    return `${prefix}${axis}`;
}
export class TouchAxis extends Class {
    axis;
    location;
    client;
    screen;
    startLocation;
    velocity = 0;
    delta = 0;
    initialDelta = 0;
    timeStamp = 0;
    constructor(axis, location) {
        super();
        if (axis && location && this.init === TouchAxis.prototype.init) {
            this.init(axis, location);
        }
    }
    init(axis, location, ..._args) {
        const that = this;
        that.axis = axis;
        that._updateLocationData(location);
        that.startLocation = that.location;
        that.velocity = that.delta = 0;
        that.timeStamp = now();
    }
    move(location) {
        const that = this;
        const offset = location[getCoordinateKey("page", that.axis)];
        const timeStamp = now();
        const timeDelta = timeStamp - that.timeStamp || 1;
        if (!offset && invalidZeroEvents) {
            return;
        }
        that.delta = offset - that.location;
        that._updateLocationData(location);
        that.initialDelta = offset - that.startLocation;
        that.velocity = that.delta / timeDelta;
        that.timeStamp = timeStamp;
    }
    _updateLocationData(location) {
        const that = this;
        const axis = that.axis;
        that.location = location[getCoordinateKey("page", axis)];
        that.client = location[getCoordinateKey("client", axis)];
        that.screen = location[getCoordinateKey("screen", axis)];
    }
}
TouchAxis.applyEnumerablePrototype();
TouchAxis.applyPrototypeMembers();

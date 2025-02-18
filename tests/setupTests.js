import "@progress/kendo-theme-default/dist/default-ocean-blue.css";
import { axeRun } from "./helpers/unit/axe.js";
import { stub } from "./helpers/unit/stub.js";
import { beforeEach, vi, it, afterEach } from 'vitest';
import "./helpers/unit/jquery.mockjax.js";
import jQuery from "jquery";

const beforeEachHandler = async({ expect }) => {
    // Expand the default view before each test for easier debugging.
    $(window.parent.document).find("#tester-ui").css({
        '--viewport-width': '1200px',
        '--tester-margin-left': '0',
        '--tester-transform': 'scale(1)'
    });
    // let name = expect.getState().currentTestName; // -> we can use this approach to measure the execution of every test.
    Mocha.fixture.appendTo(document.body);
};

const afterEachHandler = async() => {
    Mocha.fixture.empty();
    vi.restoreAllMocks();
    vi.clearAllMocks();
};

window.jQuery = window.$ = jQuery;

window.Mocha = {
    fixture: window.$('<div id="mocha-fixture"></div>')
};

window.axeRunFixture = async(exclude) => {
    await axeRun(Mocha.fixture, exclude);
};

window.axeRun = axeRun;
window.stub = stub;

beforeEach(beforeEachHandler);
afterEach(afterEachHandler);
import '@progress/kendo-ui/src/kendo.data.js';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('AiTransport tests', () => {
    const AiTransport = kendo.data.AiTransport;
    let instance;
    let service;

    beforeEach(() => {
        kendo.guid = vi.fn().mockReturnValue('test-guid');
        service = { url: 'http://example.com' };

        instance = new AiTransport({ service });
    });

    afterEach(()=> {
        kendo.guid.mockClear();
    });

    it('should call requestStart and $.ajax with the setup options', () => {
        const requestStartSpy = vi.fn();

        instance.options.requestStart = requestStartSpy;

        const opts = { prompt: 'hello' };
        const data = {
            url: 'dummy-url',
            type: 'POST',
            contentType: 'application/json',
            data: '{}',
            success: instance.success.bind(instance),
            error: instance.error.bind(instance)
        };
        const setupSpy = vi.spyOn(instance, 'setup').mockReturnValue(data);

        instance.read(opts);

        expect(setupSpy).toHaveBeenCalledWith(opts);
        expect(requestStartSpy).toHaveBeenCalledWith(data);

        setupSpy.mockRestore();
    });

    it('should use service.outputGetter if provided', () => {
        const customOutputGetter = vi.fn().mockReturnValue('custom-output');

        instance.options.service.outputGetter = customOutputGetter;

        const successSpy = vi.fn();

        instance.options.success = successSpy;

        const response = { some: 'data' };
        const opts = { prompt: 'test', isRetry: false };

        instance.success(response, opts);

        expect(customOutputGetter).toHaveBeenCalledWith(response);
        expect(successSpy).toHaveBeenCalled();

        const callArg = successSpy.mock.calls[0][0];

        expect(callArg).toMatchObject({
            id: 'test-guid',
            output: 'custom-output',
            prompt: 'test',
            isRetry: false
        });
    });

    it('should use default _getResponseData when service.outputGetter is not provided', () => {
        const successSpy = vi.fn();

        instance.options.success = successSpy;

        const response = {
            messages: [
                {
                    contents: [
                        {
                            text: "default-output"
                        }
                    ]
                }
            ]
        };
        const opts = { prompt: 'default test', isRetry: true };

        instance.success(response, opts);

        expect(successSpy).toHaveBeenCalled();

        const callArg = successSpy.mock.calls[0][0];

        expect(callArg).toMatchObject({
            id: 'test-guid',
            output: 'default-output',
            prompt: 'default test',
            isRetry: true
        });
    });

    it('should call the error callback if provided', () => {
        const errorSpy = vi.fn();
        instance.options.error = errorSpy;
        const response = { error: 'error-data' };
        const newResponseObject = {
            "id": "test-guid",
            "isRetry": undefined,
            "output": "An error occurred while processing the request.",
            "prompt": undefined,
            "response": response,
        };

        instance.error(response);

        expect(errorSpy).toHaveBeenCalledWith(newResponseObject);
    });

    it('should create requestOptions correctly when service is an object', () => {
        const opts = { prompt: 'hello' };
        const data = instance.getData(opts);
        const requestOptions = instance.setup(opts);

        expect(requestOptions.url).toBe(service.url);
        expect(requestOptions.type).toBe('POST');
        expect(requestOptions.contentType).toBe('application/json');
        expect(requestOptions.data).toBe(JSON.stringify(data));
        expect(requestOptions.success).toBeInstanceOf(Function);
        expect(requestOptions.error).toBeInstanceOf(Function);
    });

    it('should create requestOptions correctly when service is a string', () => {
        instance.options.service = 'http://service.com';

        const opts = { prompt: 'test' };
        const data = instance.getData(opts);
        const requestOptions = instance.setup(opts);

        expect(requestOptions.url).toBe('http://service.com');
        expect(requestOptions.data).toBe(JSON.stringify(data));
    });

    it('should include headers in requestOptions when provided in service', () => {
        instance.options.service = {
            url: 'http://example.com',
            headers: { 'X-Test': 'true' }
        };

        const opts = { prompt: 'header test' };
        const requestOptions = instance.setup(opts);

        expect(requestOptions.headers).toEqual({ 'X-Test': 'true' });
    });

    it('should return default data when no service.data is provided', () => {
        const prompt = 'hello world';
        const opts = { prompt };
        const data = instance.getData(opts);

        expect(data).toEqual([
            {
                role: instance.messageTypes.user,
                contents: [
                    {
                        $type: "text",
                        text: prompt
                    }
                ]
            }
        ]);
    });

    it('should prepend history to the messages array if provided', () => {
        const prompt = 'new message';
        const history = [
            {
                role: 'system', contents: [
                    {
                        $type: "text",
                        text: 'old message'
                    }
                ]
            }
        ];
        const opts = { prompt, history };
        const data = instance.getData(opts);

        expect(data).toEqual([
            { role: 'system', contents: [ { $type: "text", text: 'old message' } ] },
            { role: instance.messageTypes.user, contents: [ { $type: "text", text: prompt } ] }
        ]);
    });

    it('should merge service.data object with messages', () => {
        const prompt = 'merge test';
        const opts = {
            prompt,
            service: {
                data: { foo: 'bar' }
            }
        };
        const data = instance.getData(opts);

        expect(data).toMatchObject({
            foo: 'bar',
            messages: [
                {
                    role: instance.messageTypes.user,
                    contents: [
                        {
                            $type: "text",
                            text: prompt
                        }
                    ]
                }
            ]
        });
    });

    it('should call service.data function when provided', () => {
        const prompt = 'function test';
        const isRetry = true;
        const history = [{ role: { value: 'tool' }, text: 'old' }];
        const dataFunction = vi.fn().mockReturnValue('function result');
        const opts = {
            prompt,
            isRetry,
            history,
            service: {
                data: dataFunction
            }
        };

        const data = instance.getData(opts);

        expect(dataFunction).toHaveBeenCalledWith(prompt, isRetry, history);
        expect(data).toBe('function result');
    });

    it('should return messages.contents.text if present', () => {
        const response = { messages: [{ contents: [{ text: 'response text' }] }] };

        expect(instance._getResponseData(response)).toBe('response text');
    });

    it('should return a default error message if messages.contents.text is missing', () => {
        const response = {};

        expect(instance._getResponseData(response)).toBe('An error occurred while processing the request.');
    });
});

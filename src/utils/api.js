export const createHttpClient = (baseURL = '', headers = {}) => {
    const request = async (url, method = 'GET', data = null, customHeaders = {}) => {
        const config = {
            method,
            headers: {
                ...headers,
                ...customHeaders,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`${baseURL}${url}`, config);

            if (!response.ok) {
                Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            return contentType?.includes('application/json')
                ? response.json()
                : response.text();
        } catch (error) {
            console.error('Request failed:', error);
            return error;
        }
    };

    const serializeParams = (params) => {
        if (!params) return '';
        const query = new URLSearchParams(params).toString();
        return `?${query}`;
    };

    const get = (url, params = {}, headers) => {
       return  request(`${url}${serializeParams(params)}`, 'GET', null, headers)
    }
    const post = (url, data, headers) => request(url, 'POST', data, headers)
    const put = (url, data, headers) => request(url, 'PUT', data, headers)
    const deleteMeth = (url, headers) => request(url, 'DELETE', null, headers)

    return {
        get: get,
        post,
        put,
        deleteMeth
    };
};
export const createMergePdfPayload = (urls: Array<string>) => {
    return JSON.stringify({
        name: 'merged.pdf',
        url: urls.join(',')
    });
};
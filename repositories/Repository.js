import axios from 'axios';
const baseDomain = 'https://beta.apinouthemes.com'; // API for products
export const baseAPI = 'http://api.searchmez.work/api'; // API for products
export const basePostUrl = 'https://beta.apinouthemes.com'; // API for post
export const baseStoreURL = 'https://beta.apinouthemes.com'; // API for vendor(store)
export const baseImage = 'http://dashboard.searchmez.work/searchmez/images/';
export const imageURL = 'http://images.searchmez.work/searchmez/';
export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;


export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

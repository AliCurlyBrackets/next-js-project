import customFetch from './customFetch'; // Import the custom fetch utility

// Init Pages
export const initHome = async () => {
    return await customFetch('v1/init/home');
}

export const initVideos = async () => {
    return await customFetch('v1/init/videos');
}

export const initBooks = async () => {
    return await customFetch('v1/init/books');
}

export const initMagazines = async () => {
    return await customFetch('v1/init/magazines');
}

export const initArticles = async () => {
    return await customFetch('v1/init/articles');
}

export const initPodcasts = async () => {
    return await customFetch('v1/init/podcasts');
}

export const CustomCreateComment = async (id = '', path = '', data = null) => {
    return await customFetch(`v1/${path}/${id}/comment`, {
        method: 'POST',
        body: data
    });
}

export const CustomEditLike = async (id = '', path = '') => {
    return await customFetch(`v1/${path}/${id}/like`, {
        method: 'PUT'
    });
}

export const CustomCreateRate = async (id = '', path = '', rating = 0) => {
    return await customFetch(`v1/${path}/${id}/rate`, {
        method: 'POST',
        body: { rating }
    });
}

// Search
export const getSearch = async (query = '') => {
    return await customFetch(`v1/search?${query}`);
}

// Settings
export const getSettings = async (query = '') => {
    return await customFetch(`v1/settings?${query}`);
}

export const getSetting = async (id = '') => {
    return await customFetch(`v1/settings/${id}`);
}

export const getSettingByName = async () => {
    return await customFetch(`v1/settings/by/name/socialMedia`);
}

// Categories
export const getCategories = async (query = '') => {
    return await customFetch(`v1/categories/main?${query}`);
}

export const getCategory = async (id = '') => {
    return await customFetch(`v1/categories/${id}`);
}

// Sub Categories
export const getSubCategories = async (query = '') => {
    return await customFetch(`v1/subcategories?${query}`);
}

export const getSubCategory = async (id = '') => {
    return await customFetch(`v1/subcategories/${id}`);
}

// Articles
export const getArticles = async (query = '') => {
    return await customFetch(`v1/articles?${query}`);
}

export const getArticle = async (id = '') => {
    return await customFetch(`v1/articles/${id}`);
}

// Contact Reasons
export const getContactReasons = async (query = '') => {
    return await customFetch(`v1/contact-reasons?${query}`);
}

export const getContactReason = async (id = '') => {
    return await customFetch(`v1/contact-reasons/${id}`);
}

// Wiki Articles
export const getWikiArticles = async (query = '') => {
    return await customFetch(`v1/wiki-articles?${query}`);
}

export const getWikiArticle = async (id = '') => {
    return await customFetch(`v1/wiki-articles/${id}`);
}

export const createComment = async (data = null) => {
    return await customFetch('v1/comments', {
        method: 'POST',
        body: data
    });
}

// Videos
export const getVideos = async (query = '') => {
    return await customFetch(`v1/videos?${query}`);
}

export const getVideo = async (id = '') => {
    return await customFetch(`v1/videos/${id}`);
}

export const createJoin = async (data = null) => {
    return await customFetch('v1/joins', {
        method: 'POST',
        body: data
    });
}

// Magazine
export const getMagazines = async (query = '') => {
    return await customFetch(`v1/magazines?${query}`);
}

export const getMagazine = async (id = '') => {
    return await customFetch(`v1/magazines/${id}`);
}

// Books
export const getBooks = async (query = '') => {
    return await customFetch(`v1/books?${query}`);
}

export const getBook = async (id = '') => {
    return await customFetch(`v1/books/${id}`);
}

// Countries
export const getCountries = async (query = '') => {
    return await customFetch(`v1/countries?${query}`);
}

export const createContact = async (data = null) => {
    return await customFetch('v1/contacts', {
        method: 'POST',
        body: data
    });
}

// Teams
export const getTeams = async (query = '') => {
    return await customFetch(`v1/teams?${query}`);
}

export const getTeam = async (id = '') => {
    return await customFetch(`v1/teams/${id}`);
}

export const createNewsletter = async (data = null) => {
    return await customFetch('v1/newsletters', {
        method: 'POST',
        body: data
    });
}

// Podcasts
export const getPodcasts = async (query = '') => {
    return await customFetch(`v1/podcasts?${query}`);
}

export const getPodcast = async (id = '') => {
    return await customFetch(`v1/podcasts/${id}`);
}

// Polls
export const getPolls = async (query = '') => {
    return await customFetch(`v1/polls?${query}`);
}

export const getPoll = async (id = '') => {
    return await customFetch(`v1/polls/${id}`);
}

export const createVote = async (id = '') => {
    return await customFetch(`v1/answers/${id}/vote`, {
        method: 'POST'
    });
}
import axios from 'axios';
import saveAs from 'file-saver';
import {
  ACCESS_TOKEN,
  AUTH_FORBIDDEN_ERROR,
  REFRESH_TOKEN,
} from './constants';

const Api = (baseUrl) => {

  const requester = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const interceptorFn = (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    return config;
  };

  requester.interceptors.request.use(
    interceptorFn,
    Promise.reject
  );

  requester.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { status } = error.response;
      const originalRequest = error.config;
    if (
      status === AUTH_FORBIDDEN_ERROR &&
      // eslint-disable-next-line no-underscore-dangle
      !originalRequest._retry
    ) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      await refreshToken();
      return requester(originalRequest);
    }
    throw error;
  });

  const userLogin = async function (email, password) {
    try {
      const response = await requester.post(`token/`, {
        email,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);
      return response ? response.data : null;
    } catch (error) {
      if (!error.response) {
        throw new Error('Existe un problema de conexión en este momento');
      }
      throw error.response.data;
    }
  };

  const userLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  };

  const refreshToken = async function refreshToken() {
    const ENDPOINT_URL = `token/refresh/`;
    try {
      const response = await requester.post(ENDPOINT_URL, {
        refresh: localStorage.getItem(REFRESH_TOKEN),
      });
      const { access } = response.data;
      localStorage.setItem(ACCESS_TOKEN, access);
      return Promise.resolve(access);
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      return Promise.reject(error);
    }
  }

  const getAnonymizedDoc = async function getAnonymizedDoc(
    newAnnotations,
    docId,
    deleteAnnotations
  ) {
    const ENDPOINT_URL = `act/${docId}/addAnnotations/`;
    const params = {
      newOcurrencies: newAnnotations,
      deleteOcurrencies: deleteAnnotations,
    };
    try {
      const response = await requester.post(ENDPOINT_URL, params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  const blobToFile = (theBlob, fileName) => {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  };

  const getDocAnalysis = async function getDocAnalysis(doc, docName) {
    const ENDPOINT_URL = `act/`;
    const formData = new FormData();
    const blob = await fetch(doc).then((r) => r.blob());
    const file = blobToFile(blob, docName);
    formData.append('file', file);
    try {
      const response = await requester.post(ENDPOINT_URL, formData);
      return response ? response.data : null;
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  const getSubjects = async function getSubjects() {
    const ENDPOINT_URL = `subject/`;
    try {
      const data = await requester.get(ENDPOINT_URL);
      return data.data;
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  const selectSubject =  async function selectSubject(idSubject) {
    const ENDPOINT_URL = `subject/${idSubject}/useSubject/`;
    try {
      const { data } = await requester.post(ENDPOINT_URL);
      return {
        data,
      };
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  const getEntities = async function getEntities() {
    const ENDPOINT_URL = `entity/`;
    try {
      const data = await requester.get(ENDPOINT_URL);
      return data.data;
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  const getDocToDownload = async function getDocToDownload(docId, fileName) {
    const ENDPOINT_URL = `act/${docId}/getAnonymousDocument/`;
    try {
      const response = await requester.get(ENDPOINT_URL, {
        responseType: 'blob',
      });
      saveAs(response.data, fileName);
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  const  getDocPublishedToDrive = async function getDocPublishedToDrive(docId) {
    const ENDPOINT_URL = `act/${docId}/publishDocumentInDrive/`;
    try {
      const data = await requester.post(ENDPOINT_URL);
      return data;
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  const getDocPublished = async function getDocPublished(docId) {
    const ENDPOINT_URL = `act/${docId}/publishDocument/`;
    try {
      const data = await requester.post(ENDPOINT_URL);
      return data;
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  const getApiStats = async function getApiStats(url) {
    try {
      const data = await requester.get(url);
      return data;
    } catch (error) {
      if (!error.response) {
        error.response.data.detail =
          'Existe un problema de conexión en este momento. Intente Luego.';
      }
      throw error;
    }
  }

  return {
    userLogin,
    userLogout,
    refreshToken,
    getAnonymizedDoc,
    getDocAnalysis,
    getSubjects,
    selectSubject,
    getEntities,
    getDocToDownload,
    getDocPublishedToDrive,
    getDocPublished,
    getHechoStats: () => getApiStats('/stats/hecho/'),
    getLugarStats: () => getApiStats('/stats/lugar/'),
    getEdadStats: () => getApiStats('/stats/edad/'),
  }
};

export default Api;

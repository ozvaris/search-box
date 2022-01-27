import axios from 'axios';

let tokenSource;
let prevValue;
export const fetchData = async keyword => {
  try {
    if (typeof tokenSource !== typeof undefined) {
      tokenSource.cancel(prevValue + '- Operation canceled due to new request.');
    }
    prevValue = keyword;
    // save the new request for cancellation
    tokenSource = axios.CancelToken.source();

    const API_URL = 'https://www.googleapis.com/books/v1/volumes';
    const DEBOUNCE = 1000;

    // const { data } = await axios.get(`http://www.omdbapi.com/?apikey=8f2b299d&s=${keyword}`, {
    //   cancelToken: tokenSource.token
    // });

    console.log(keyword);

    const { data } = await axios.get(API_URL, {
      params: {
        q: keyword
      },
      cancelToken: tokenSource.token
    });

    const { totalItems, items } = data;

    return {
      result: totalItems
        ? items.map((i, index) => {
            return { id: index, Title: i.volumeInfo.title };
          })
        : []
    };
  } catch (err) {
    console.log(err);
    if (axios.isCancel(err)) return { cancelPrevQuery: true };
    return [err];
  }
};

import axios from 'axios';
let prevKeyword;
let controller;
export const fetchData = (keyword, setResults, setIsLoading) => {
  try {
    if (typeof controller !== typeof undefined) {
      controller.abort();
    }

    // save the new request for controller
    controller = new AbortController();

    const API_URL = 'https://www.googleapis.com/books/v1/volumes';
    const DEBOUNCE = 100;

    // const { data } = await axios.get(`http://www.omdbapi.com/?apikey=8f2b299d&s=${keyword}`, {
    //   cancelToken: tokenSource.token
    // });

    prevKeyword = keyword;

    axios
      .get(API_URL, {
        params: {
          q: keyword
        },
        signal: controller.signal
      })
      .then(({ data }) => {
        console.log(keyword + ' search result.');
        const { totalItems, items } = data;
        setIsLoading(false);
        //googleBook api return the number of total items, in case it is 0 we need to make sure this checked ,
        // in other apis you might get different type of results where it is always array of strings and we don't have to do this check
        setResults(
          totalItems
            ? items.map((i, index) => {
                return { id: index, Title: i.volumeInfo.title };
              })
            : []
        );
      });
  } catch (err) {
    return [err];
  }
};

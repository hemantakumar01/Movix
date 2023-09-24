import { useEffect } from 'react';
import './index.scss';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiCofiguration, getGenres } from './store/homeSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import PageNotFound from '../src/pages/PageNotFound';
import Detail from '../src/pages/Detail';
import SearchResults from '../src/pages/SearchResults';
import Explore from '../src/pages/Explore';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

function App() {
  useEffect(() => {
    fetchApiConfig();
    generCall();
  }, []);

  const dispatch = useDispatch();

  const { url } = useSelector(state => state.home);

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration').then(res => {
      const url = {
        backdrop: res?.images?.base_url + 'original',
        poster: res?.images?.base_url + 'original',
        profile: res?.images?.base_url + 'original',
      };
      dispatch(getApiCofiguration(url));
    });
  };
  const generCall = async () => {
    let promise = [];
    let endpoints = ['tv', 'movie'];
    let allGenres = {};

    endpoints.forEach(url => {
      promise.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promise);
    data.map(({ genres }) => {
      return genres.map(item => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <>
      <div className="App  text-white ">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/:mediaType/:id" element={<Detail />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

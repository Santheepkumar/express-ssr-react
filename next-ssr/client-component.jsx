import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Home = ({ preloadedData }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Server Data</h2>
      <pre>{JSON.stringify(preloadedData, null, 2)}</pre>
      <Link to='/about'>Go to About Page</Link>
    </div>
  );
};

const About = ({ preloadedData }) => {
  return (
    <div>
      <h1>About Page</h1>
      <h2>Server Data</h2>
      <pre>{JSON.stringify(preloadedData, null, 2)}</pre>
      <Link to='/'>Go to Home Page</Link>
    </div>
  );
};

export async function getSSPHome() {
  return {
    name: 'Home page',
    age: '26',
    message: 'Iam from SSR',
  };
}

export async function getSSPAbout() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return {
    name: 'About us page',
    age: '26',
    message: 'Iam from SSR',
    data: data,
  };
}

export default function App() {
  const preloadedDataHome =
    typeof window !== 'undefined' ? window.__PRELOADED_DATA_HOME : null;
  const preloadedDataAbout =
    typeof window !== 'undefined' ? window.__PRELOADED_DATA_ABOUT : null;
  return (
    <Routes>
      <Route path='/' element={<Home preloadedData={preloadedDataHome} />} />
      <Route
        path='/about'
        element={<About preloadedData={preloadedDataAbout} />}
      />
    </Routes>
  );
}

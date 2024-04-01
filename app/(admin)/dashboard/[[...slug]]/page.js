// 'use client'
// import React,{useEffect, useState} from 'react';
// import { useRouter } from 'next/navigation';

import React from "react";

async function getData() {
  const res = await fetch("http://localhost:8000/api/test/try");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function TestHome({ params }) {
  const { slug } = params;
  const { data } = await getData();

  return (
    <>
      {data.map((i, idx) => {
        return <div key={idx}>ID: {i}</div>;
      })}
    </>
  );
}

export default TestHome;

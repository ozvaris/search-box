import React from 'react';

export default function ResultListComponent({ items }) {
  return (
    <ul>
      {items.map((elem, index) => (
        <li key={elem.id}>{elem.Title}</li>
      ))}
    </ul>
  );
}

import React from 'react';

function Logo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke="#101820" strokeWidth="3" fill="#FEE715" />
      <path d="M13 20l5 5 9-9" stroke="#101820" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export default Logo; 
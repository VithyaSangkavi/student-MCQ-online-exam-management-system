import React from 'react';

const Breadcrumbs = ({ links }) => {
  return (
    <div className="text-gray-600 mt-2">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-1">&gt;</span>}
          {link.url ? <a href={link.url} className="hover:text-gray-400">{link.label}</a> : <span>{link.label}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
import React from 'react';

function Footer(props) {
  const { onViewAllClick } = props;

  return (
    <footer style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#f8f8f8', borderTop: '1px solid #ccc' }}>
      <button onClick={onViewAllClick} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
        View All
      </button>
    </footer>
  );
}

export default Footer;

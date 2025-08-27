import React from 'react';

interface FooterProps {
  onViewAllClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onViewAllClick }) => {
  return (
    <footer>
      <button onClick={onViewAllClick}>View All</button>
    </footer>
  );
};

export default Footer;
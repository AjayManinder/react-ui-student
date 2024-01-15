import React, { useState } from 'react';

const Accordion = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleAccordion}>
        <span>Toggle</span>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

export default Accordion;

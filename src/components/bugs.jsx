import React, { useState } from 'react';
import BugListItem from './bugitem';
import BugEditor from './bugeditor'; // Import your BugEditor component

const BugList = ({ bugs }) => {
  const [selectedBug, setSelectedBug] = useState(null);

  const handleBugClick = (bug) => {
    setSelectedBug(bug);
  };

  const handleEditorClose = () => {
    setSelectedBug(null);
  };

  return (
    <div>
      <h2>Bug List</h2>
      {bugs.map((bug) => (
        <div key={bug.id}>
          <BugListItem bug={bug} />
          <button onClick={() => handleBugClick(bug)}>Edit Bug</button>
        </div>
      ))}
      {selectedBug && (
        <BugEditor bug={selectedBug} onClose={handleEditorClose} />
      )}
    </div>
  );
};

export default BugList;

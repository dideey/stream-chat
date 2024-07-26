<<<<<<< HEAD
import React, { useState } from 'react';
import './stories.css'; // Assuming this is your CSS file
import styled from 'styled-components'; // Import styled from styled-components
=======
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
>>>>>>> 1f6f084dc8cf9b6a30370d0de4a4890bd82dc124
import { FaPlusCircle } from 'react-icons/fa';

const StoriesContainer = styled.div`
  display: flex;
  overflow-x: scroll;
`;

const AddStory = styled.div`
  /* Styles for AddStory component */
`;

const Story = styled.div`
  /* Styles for Story component */
`;

const StoryModal = styled.div`
  /* Styles for StoryModal component */
`;

const StoryContent = styled.div`
  /* Styles for StoryContent component */
`;

const Stories = ({ stories, onAddStory }) => {
  const [selectedStory, setSelectedStory] = useState(null);

  const handleStoryClick = story => {
    setSelectedStory(story);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  return (
    <>
      <StoriesContainer>
        <AddStory onClick={onAddStory}>
          <FaPlusCircle size={40} color="#007bff" />
        </AddStory>
        {stories.map(story => (
          <Story
            key={story.id}
            isNew={story.isNew}
            style={{ backgroundImage: `url(${story.image})` }}
            onClick={() => handleStoryClick(story)}
          />
        ))}
      </StoriesContainer>
      <StoryModal style={{ display: selectedStory ? 'block' : 'none' }} onClick={handleCloseModal}>
        <StoryContent>
          {selectedStory && (
            <img
              src={selectedStory.image}
              alt="Story"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </StoryContent>
      </StoryModal>
    </>
  );
};

export default Stories;
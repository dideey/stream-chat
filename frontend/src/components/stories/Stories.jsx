import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';

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
      <StoryModal isOpen={!!selectedStory} onClick={handleCloseModal}>
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

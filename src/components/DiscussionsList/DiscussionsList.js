import React from 'react';

import DiscussionItem from './DiscussionItem.js';

const listStyle = {
  width: "100%",
  display: "flex",
  flexFlow: "column"
};

class DiscussionsList extends React.Component {
  mapDiscussionsArr() {
    return this.props.discussions.map((discussion, index) => {
      return <DiscussionItem key={index} id={discussion._id} discussion={discussion}/>
    });
  }

  render() {
    return (
      <div style={listStyle}>
        {this.mapDiscussionsArr()}
      </div>
    );
  }
}

export default DiscussionsList;

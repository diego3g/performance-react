import React, { memo } from 'react';

import CommentItem from './CommentItem';

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      <strong>Comentários ({comments.length})</strong>

      <ul>
        {comments.map(comment => 
          <CommentItem key={comment.id} comment={comment} />
        )}
      </ul>
    </div>
  );
}

export default memo(CommentList);

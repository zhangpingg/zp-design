import React, { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DragItemsProps } from '../interface';

const DragItems: FC<DragItemsProps> = (props) => {
  const { id, uniqKey, dragList, render = () => {} } = props;
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {dragList?.map((item, index: number) => {
            return (
              <Draggable
                draggableId={`${item[uniqKey]}`}
                key={item[uniqKey] + ''}
                index={index}
                isDragDisabled={item.disabled}
              >
                {(provided1, snapshot) => <>{render(item, provided1, snapshot)}</>}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DragItems;

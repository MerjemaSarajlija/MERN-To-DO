import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getItems, deleteItem, updateItem } from "../actions/itemActions";
import ItemModal from './ItemModal';
import { Button } from 'reactstrap';


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export function KanbanBoard() {
  const dispatch = useDispatch();

  function update(form, id) {
    dispatch(updateItem(form, id))
  }

  function onDeleteClick(id) {
    dispatch(deleteItem(id))
  }


  const { item } = useSelector((state) => ({
    item: state.item,
  }));

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const { items } = item;

  let toDoItems = [];
  let inProgressItems = [];
  let doneItems = [];
  const [columns, setColumns] = useState(items);
  useEffect(() => {
    items.filter(item =>
      item.phase === "to_do").map(filteredItem => {
        toDoItems.push(filteredItem);
      })

    items.filter(item =>
      item.phase === "in_progress").map(filteredItem => {
        inProgressItems.push(filteredItem);
      })

    items.filter(item =>
      item.phase === "done").map(filteredItem => {
        doneItems.push(filteredItem);
      })

    setColumns({
      ['to_do']: {
        name: "To do",
        items: toDoItems,
      },
      ['in_progress']: {
        name: "In Progress",
        items: inProgressItems,
      },
      ['done']: {
        name: "Done",
        items: doneItems,
      },
    });
  }, [items]);


  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%", marginTop: "3rem" }}>
      < ItemModal />
      <DragDropContext
        onDragEnd={(result) => {
          update({ "phase": result.destination.droppableId }, result.draggableId);
          onDragEnd(result, columns, setColumns)
        }
        }
      >
        {Object.entries(columns).map(([columnId, column], index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            key={columnId}
          >
            <h2>{column.name}</h2>
            <div style={{ margin: 8 }}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "lightgrey",
                      padding: 4,
                      width: 250,
                      minHeight: 500,
                    }}
                  >
                    {column.items.map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: 16,
                                margin: "0 0 8px 0",
                                minHeight: "50px",
                                backgroundColor: snapshot.isDragging
                                  ? "#263B4A"
                                  : "#456C86",
                                color: "white",
                                ...provided.draggableProps.style,
                              }}
                            >
                               <Button
                                className="removeBtn"
                                size="sm"
                                onClick={() => onDeleteClick(item._id)}
                              >
                                X</Button>
                              {item.name}
                             </div>
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;

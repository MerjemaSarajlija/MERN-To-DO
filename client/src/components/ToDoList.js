import React, { Component, useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable, } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';



class ToDoList extends Component {
    state = {
        columns:
        {
            [uuid()]: {
                name: 'To-do',
                items: this.props.item
            }
        }
    }

    componentDidMount() {
        this.props.getItems();
        console.log("this.props.item " + this.props.item)
    }
    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        return (
            <div className="container">
                <DragDropContext onDropEnd={result => console.log(result)}>
                    {Object.entries(this.state.columns).map(([id, column]) => {
                        return (
                            <Droppable droppableId={id}>
                                {(provided, snapshot) => {
                                    return (
                                        <div {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                padding: 4,
                                                width: 250,
                                                minHeight: '500px'
                                            }}>
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Draggable key={item._id} draggableId={item._id} index={index}>
                                                        {(provided, snapshot) => {
                                    
                                                            return (
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={provided.innerRef}
                                                                    style={{
                                                                        userSelect: 'none',
                                                                        padding: 16,
                                                                        margin: '0 0 8px 0',
                                                                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                                        width: 250,
                                                                        minHeight: '500px',
                                                                        color: 'white',
                                                                        ...provided.draggableProps.style
                                                                    }}>
                                                                    {item.name}
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        )
                    })}
                </DragDropContext>
            </div>
        );
        /*   return(
               <Container>
                 <ListGroup>
                       <TransitionGroup className = "shopping-list">
                           {items.map(({_id, name}) => (
                               <CSSTransition key = {_id} timeout={500} classNames = "fade">
                                   <ListGroupItem>
                                       <Button
                                       className = "remove-btn"
                                       color = "danger"
                                       size = "sm"
                                       onClick = {this.onDeleteClick.bind(this, _id)}
                                       >
                                       X</Button>
                                       {name}
                                   </ListGroupItem>
                               </CSSTransition>
                           ))}
                       </TransitionGroup>
                   </ListGroup>
               </Container>
           );*/
    }
}

ToDoList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})



export default connect(mapStateToProps, { getItems, deleteItem })(ToDoList);
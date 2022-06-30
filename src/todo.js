import React,{useState,useReducer} from 'react'
import {Form,Button} from 'react-bootstrap' 

const initialState =[]
const reducer = (state={items:[]},action)=>{
  switch(action.type){
    
    case "add-items":
    return [...state,action.listItem]

    case "delete-items":
    return [...state]

    case "reset-list":
    return []

    default:
    return state;
  }
}

function Todo() {
  
  const [listItem,handleUserinput] = useState('')
  const [items,dispatch]=useReducer(reducer,initialState)

  const addItem =()=>{
    dispatch({type:'add-items',listItem});
    handleUserinput('')
  }

  const editItem = (index)=>{
      const editState = items[index];
      items.splice(index,1)
      handleUserinput(editState)
    }

  const deleteItem=(index)=>{
      items.splice(index,1)
      dispatch({type:'delete-items'})
    }

  const resetList =()=>{
      handleUserinput('')
      dispatch({type:'reset-list'})
    }

  return(
    <div className='tododisplay'>
      <div>
        <Form>
          <h1>Todo List</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" className="input" value={listItem}
            onChange={(event)=>handleUserinput(event.target.value)}
            placeholder='ENTER YOUR TASKS' />
          </Form.Group>
          </Form>
          <Button variant="primary" type="submit" onClick={addItem}>
          Submit</Button>
      </div>
        <div>
          { items.length > 0 ?
            <ul>
            {items.map((item,index)=> 
            <li key={index}> {item}
            <br/><Button className='button' onClick={()=>editItem(index)}>Edit</Button>
            <Button className='button del' onClick={()=>deleteItem(index)}>Delete</Button>
            </li>)}
            </ul> : null }
        </div>
        <Button onClick={resetList}> Reset List</Button>
    </div>
  )
}

export default Todo;
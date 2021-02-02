
import Typography from '@material-ui/core/Typography';

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Button,
    Divider,
  } from '@material-ui/core'
import AddProductForm from './AddProductForm';
import ShowProducts from './ShowProducts';
const useStyles = makeStyles({
    root: {
        // minWidth: 275,
    },
    title: {
        fontSize: 20,
        height: 50,
        padding: 10,
        paddingLeft: 55,
        color: 'white'
    },
    formHeadings: {
        margin: 20,
        marginBottom: 0
    },
    formControl: {
        marginTop:'1%'
    },
    container :{
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex'
    },
    btnHolder: {
        justifyContent: 'flex-end',
        display: 'flex',
        marginRight:'30px',
        marginBottom:'30px'
      }
});

const InventoryManager = (props) => {
    const classes = useStyles();  
    const [showForm,setShowForm] = useState(false)
    const [editForm,setEditForm] = useState(false)
    const toggleForm = () => {
        setShowForm(!showForm)
    }
    const editButtonClicked = () => {
        setEditForm(!editForm)
        // alert(rows[checkedBoxes[0]].productId)
    }
    return (
        <div>
            <div style={{overflow:'hidden'}}>
           {!editForm && <Button 
             onClick={toggleForm}
            className="row"
                variant='contained' style={{backgroundColor:'#f9a825', marginBottom:'10px',float:'right'}}
            >{showForm===true?'My Products':'Add new Product'}</Button>}
            </div>
            <Divider />
            {!showForm && !editForm && <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                       Your Added Products              
            </Typography> }
             <div style={{marginTop:'30px'}}></div>
             {showForm && 
                <AddProductForm toggleForm={toggleForm} />
             }
            
            {!showForm && <ShowProducts editButtonClicked={editButtonClicked} /> }
            <div style={{marginTop:'60px'}}></div>
        </div>
       
    )
}


export default InventoryManager;

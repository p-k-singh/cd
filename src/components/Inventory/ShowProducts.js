import React, { useEffect, useState } from 'react';
import Spinner from '../UI/Spinner'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Auth,API} from 'aws-amplify'
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import EditForm from './EditForm'
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


export default function CollapsibleTable(props) {
  const classes = useRowStyles();
  const [openedPages,setOpenedPages] = useState([])
  const [checkedBoxes,setCheckedBoxes] = useState([])
  const [loading,setLoading] = useState(true)
  const [rows,setRows] = useState([])
  const [toEdit,setToEdit] = useState(false)
  useEffect(async ()=>{
    var currentUser = await Auth.currentUserInfo()
    var owner=currentUser.username
      API
      .get("GoFlexeOrderPlacement", `/inventory?type=owner&ownerId=${owner}`)
      .then(response => {
          // Add your code here
          console.log(response)
          setRows(response)
          setLoading(false)
      })
      .catch(error => {
          console.log(error);
          setLoading(false)
      });
  },[toEdit])

  
  const handleOpen = (event, idx) => {
    const selectedIndex = openedPages.indexOf(idx);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(openedPages, idx);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(openedPages.slice(1));
    } else if (selectedIndex === openedPages.length - 1) {
      newSelected = newSelected.concat(openedPages.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        openedPages.slice(0, selectedIndex),
        openedPages.slice(selectedIndex + 1),
      );
    }

    setOpenedPages(newSelected);
  };

  const handleChecked = (event, idx) => {
    const selectedIndex = checkedBoxes.indexOf(idx);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(checkedBoxes, idx);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(checkedBoxes.slice(1));
    } else if (selectedIndex === checkedBoxes.length - 1) {
      newSelected = newSelected.concat(checkedBoxes.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        checkedBoxes.slice(0, selectedIndex),
        checkedBoxes.slice(selectedIndex + 1),
      );
    }

    setCheckedBoxes(newSelected);
  };

  const isOpened = (idx) => openedPages.indexOf(idx) !== -1;
  const isChecked = (idx) => checkedBoxes.indexOf(idx)!==-1;
  
  const showEditPage = () => {
    setToEdit(!toEdit)
    props.editButtonClicked()
  }

  if(toEdit===true){
    return(
    <EditForm row={rows[checkedBoxes[0]]} editButtonClicked={showEditPage} />
    )
  }
  if(loading===true){
    return(
      <Spinner />
    )
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        {checkedBoxes.length>0 && <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            {checkedBoxes.length===1 ? <TableCell align="right">
              <IconButton onClick={()=>showEditPage()}>
              <EditIcon label='Edit' color='primary' /> 
              </IconButton>
               </TableCell> : <TableCell /> }
            {checkedBoxes.length>0 ? <TableCell align="right">
            <IconButton ><DeleteIcon color='secondary' /> </IconButton> 
              </TableCell> : <TableCell />}
          </TableRow>
        </TableHead>}
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Location </TableCell>
            <TableCell align="right">Pin Code</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,idx) => {
            const isItemOpened = isOpened(idx);
            const labelId = `enhanced-table-checkbox-${idx}`;
            return(
            <React.Fragment>
            <TableRow className={classes.root}>
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={(event) => handleOpen(event,idx)}>
                {isItemOpened ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            <Checkbox
            size='small'
            color="primary"
            checked={isChecked(idx)}
            name={idx}
            onChange={(event) => handleChecked(event,idx)}
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
            </TableCell>
            <TableCell component="th" scope="row">
              {row.productName}
            </TableCell>
            <TableCell align="right">{row.productType.label}</TableCell>
            <TableCell align="right">{row.location}</TableCell>
            <TableCell align="right">{row.pincode}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={isItemOpened} timeout="auto" unmountOnExit>
              <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                  More Details
              </Typography>
              <TableRow>
              <th>Categories: </th>
               <td> {row.categories.map((category) => category.label+' .')}</td>
               {/* //{console.log(row.features)} */}
               </TableRow>
               {row.measurable===true ? 
               <React.Fragment>
               <TableRow>
               <th>Length: </th>
               <td> {row.length}</td>
               </TableRow>
               <TableRow>
               <th>Width: </th>
               <td> {row.width} </td>
               </TableRow>
               <TableRow>
               <th>Height: </th>
               <td> {row.height} </td>
               </TableRow>
               <TableRow>
               <th>Unit Of Measurement: </th>
               <td> {row.unit.label} </td>
               </TableRow>
                </React.Fragment>
                :
                <React.Fragment>
               <TableRow>
               <th>Density: </th>
               <td> {row.density} kg per cubic meter</td>
               </TableRow>
                </React.Fragment>
               }
               {/* {row.measurable===true ?
                    <React.Fragment>
                        <TableRow>
                        <th>Length: </th>
                        <td> {row.length}</td>
                        </TableRow>
                        <TableRow>
                        <th>Width: </th>
                        <td> {row.width} </td>
                        </TableRow>
                        <TableRow>
                        <th>Height: </th>
                        <td> {row.height} </td>
                        </TableRow>
                        <TableRow>
                        <th>Unit Of Measurement: </th>
                        <td> {row.unit} </td>
                        </TableRow>
                    </React.Fragment>
                    :
                    <React.Fragment>
                      <TableRow>
                        <th>Length: </th>
                        <td> </td>
                        </TableRow>
                        <TableRow>
                        <th>Width: </th>
                        <td>  </td>
                        </TableRow>
                        <TableRow>
                        <th>Height: </th>
                        <td>  </td>
                        </TableRow>
                        <TableRow>
                        <th>Unit Of Measurement: </th>
                        <td>  </td>
                        </TableRow>
                    </React.Fragment>
               } */}
            </Box>
              </Collapse>
            </TableCell>
          </TableRow>
          </React.Fragment>
            )
          }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

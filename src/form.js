import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {TextField} from "@material-ui/core";
import {KeyboardDatePicker} from '@material-ui/pickers'
import { DatePicker } from "@material-ui/pickers";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Picker from './picker'
import TimePick from "./timepick";
import Snackbar from '@material-ui/core/Snackbar';
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

let theme = createMuiTheme()
class Form extends React.Component {
constructor(props) {
    super(props);
    this.post = this.post.bind(this);
    this.state = {
        name: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        tutor: '',
        description: '',
        videoLink: '',
        open:false,
        loading:false,


    };
}
    post(e) {
        this.setState({loading:true})
        e.preventDefault();
        axios.post('http://68.183.93.200:3006/home/newWebinar', {
            name: this.state.name,
            eventDate: this.state.eventDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            tutor: this.state.tutor,
            description: this.state.description,
            videoLink:this.state.videoLink

        },{headers: {
                'Authorization': 'Bearer ' + this.props.token,
            }
        })
            .then( (res) =>{this.setState({open:true, loading:false})}
            )
            .catch(function (error) {
                console.log(error);
            });


    }
    handleChange = arg=>(e) => {
        console.log(arg);
        this.setState({[arg]: e.target.value});
        console.log(this.state)
    };
   handleClose = () =>{
       this.setState({open:false})


   }
   dateChange = (e)=>{

       this.setState({eventDate:e})


   }
   timeChange = (e)=>{
       this.setState({startTime:e})

   }
   theme=createMuiTheme()
    render() {


       if(this.state.loading){return <CircularProgress hidden={!this.state.loading}/>}
       else{
        return (



<Paper elevation={7} style={{padding:"30px", width:"100%", marginTop:this.theme.spacing(10)}}>
  <TextField style={{width:"100%", marginBottom:"10px"}} placeholder="Name" variant="outlined" onChange={this.handleChange(['name'])}></TextField><br/>


<div style={{display:"flex", justifyContent:"space-around"}} >
    <Picker change={this.dateChange} style={{marginRight:"10px", marginBottom:"10px", marginTop:"10px"}}/>
    <TimePick change={this.timeChange} style={{margin:"10px"}}/></div>
    <TextField variant="outlined" placeholder="Tutor" style={{width:"100%", marginTop:"10px", marginBottom:"10px"}} onChange={this.handleChange(['tutor'])} ></TextField>
    <br/>
    <TextField onChange={this.handleChange(['description'])}
                multiline
               rows="4"
               variant="outlined" placeholder="Description" style={{width:"100%", marginTop:"10px", marginBottom:"10px"}}></TextField><br/>

    <Button variant={'contained'} onClick={this.post} style={{backgroundColor:"#3e64ff",color:"#ecfcff", width:"100%", marginTop:"10px"}}>Create Typeform</Button>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        style={{display:'flex', alignItems:'center', justifyContent:'center'}}
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 500,
        }}
    >
        <Fade in={this.state.open}>
            <div style={{ backgroundColor: theme.palette.background.paper,
                border: '2px solid #000',
                boxShadow: theme.shadows[5],
                padding: theme.spacing(2, 4, 3)}}>
                <h2 id="transition-modal-title">Webinar added</h2>
                <p id="transition-modal-description"></p>
            </div>
        </Fade>
    </Modal>

</Paper>




    )}}}

 export default Form;





























import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import * as API from '../api/API';
import {share} from '../actions/shareAction';
import {shareDone} from '../actions/shareAction';
import {shareEmailChange} from '../actions/shareAction';

import styles from './style.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import LogoutAvtar from 'material-ui/svg-icons/action/exit-to-app';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import DriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import DriveFolder from 'material-ui/svg-icons/file/folder-open';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import StarBlank from 'material-ui/svg-icons/toggle/star-border';
import StarShaded from 'material-ui/svg-icons/toggle/star'; 
import FileDownload from 'material-ui/svg-icons/file/file-download';
import FileDelete from 'material-ui/svg-icons/action/delete';
import Share from 'material-ui/svg-icons/social/share';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import {
  blue500,
  grey200,
  red300,
  indigo900,
  orange800,
  deepOrange300,
  pink400,
  purple500,
  green300,
  yellow50,
  fullWhite,
  grey100,


} from 'material-ui/styles/colors';
 
const customStyles = {



  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : '70%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                     : '1px solid #ccc',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '10px',
    outline                    : 'none',
    padding                    : '20px'
  }
};
 
class shareModal extends React.Component {
  
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }
 
  closeModal() {
    this.props.shareDone();
  }

  handleShare(payload) {
    API.share(payload)
    .then(res => {
        if(res.status===201){
            NotificationManager.success("Success", "Shared Successfully", 2500, true);
            this.closeModal();
        }
        else if(res.status===202){
            NotificationManager.error("Account with this email not exist", "Share Failed", 2500, true);
        }
        else{
            NotificationManager.error("Already shared with this user", "Share Failed", 2500, true);
        }
    });
  }

 
  render() {
      console.log("I an : "+this.props.shareData.isOpen);
    return (
      <div>
        <Modal
          isOpen={()=>this.props.shareData.isOpen}
          onAfterOpen={()=>this.afterOpenModal()}
          onRequestClose={()=>this.closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <MuiThemeProvider>
                <div className="row">
                    
                    <ListItem disabled={true}>
                        <div className="row">
                        
                            <div className="col-md-2">

                            {this.props.shareData.type==="folder" &&    
                                <Avatar
                                    icon={<DriveFolder />}
                                    color={blue500}
                                    backgroundColor={grey100}
                                    
                                />
                            }
                            {this.props.shareData.type==="file" &&    
                                <Avatar
                                    icon={<DriveFile />}
                                    color={blue500}
                                    backgroundColor={grey100}
                                    
                                />
                            }
                            </div>
                            <div className="col-md-8" style={{marginTop:"13px"}}>
                                {this.props.shareData.content.name}
                            </div>
                            <div className="col-md-1">
                                <IconButton iconStyle={styles.iconStyles.verySmallIcon} tooltip="Close"
                                    onClick={()=> this.closeModal()}>
                            
                                    <Cancel backgroundColor={fullWhite} color={red300}
                                        style={styles.iconStyles.verySmall} 
                                        onClick={()=> this.closeModal()}/>
                                </IconButton>
                            </div>
                        
                 
                        </div>
                        <Divider style={{marginTop:"15px"}}/>
                        <div className="row">
                            <div className="col-md-1">
                                <b><TextField value="To:" underlineShow={false}></TextField></b>
                            </div>
                            <div className="col-md-4">
                                <TextField underlineShow={false}
                                    onChange={(event)=>
                                    {event.persist();
                                    this.props.shareEmailChange(event);}}
                                />
                            </div>

                        </div>
                        <Divider style={{marginTop:"1px"}}/>
                        {this.props.shareData.email && <div className="row">
                            <center>
                                <RaisedButton label="Share" style={{marginTop:"15px"}} backgroundColor={blue500} 
                                onClick={()=> this.handleShare(this.props.shareData)}
                                />
                            </center>
                        </div>}
                    </ListItem>
                </div>
            </MuiThemeProvider>
          
          
        </Modal>
      </div>
    );
  }
}
 
function mapStateToProps(state){
    return{
        shareData:state.shareData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            share,
            shareDone,
            shareEmailChange,

        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(shareModal);
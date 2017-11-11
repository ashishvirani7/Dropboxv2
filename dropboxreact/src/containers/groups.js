import React, { Component } from 'react';
import styles from './style.css';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Groups extends React.Component{
    render(){
        
        return(
            
            <div className="row" style={styles.accountMargin}>
                <h1>Groups</h1>
                <hr style={{borderWidth:"2px" ,borderStyle:"inset"}}/>
                
                <div className="row">
                    <div className>
                    </div>
                </div>
                
            </div>
        );
    
    
    }
}



function mapStateToProps(state){
    return{
        activeUserData:state.activeUserData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            
        }
        ,dispatch);
  }
  
  export default connect(mapStateToProps,matchDispatchToProps)(Groups);
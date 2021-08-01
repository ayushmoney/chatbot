import Axios from 'axios';
import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import showNotification from './notify';
import Message from './Sections/Message';
function Chatbotnew(){

    const dispatch = useDispatch();
    const messageFromRedux = useSelector(state => state.message.messages);

    const textQuery = async (text) =>{
        let conversation ={
            who:"user",
            content:{
                text:{
                    text:text
                }
            }
        }
        dispatch(saveMessage(conversation))
        // console.log(conversation)
        const textQueryVariables = {
            text
        }
        try{
           const res = await Axios.post('/api/dialogflow/textQuery',textQueryVariables)
            const content = res.data.fulfillmentMessages[0]
            conversation ={
                who:"chatbot",
                content:content
                }
                dispatch(saveMessage(conversation))
                // console.log(conversation)
        }catch(err){
            conversation ={
                who:"chatbot",
                content:{
                    text:{
                        text:"error occured"
                    }
                }
                }
                dispatch(saveMessage(conversation))
                // console.log(conversation)
        }


    }


    const keyPress=(e)=>{
        if(e.key==='Enter'){
            if(!e.target.value)
            {
                return alert("Please enter value");
            }
            
            textQuery(e.target.value)
            e.target.value="";
        }
    }
    const renderMsg=(msg,i)=>{
        console.log('final array',msg);
        return <Message key={i} who={msg.who} text={msg.content.text.text} />
    }
    // this.state = {flag:false};
    const renderMessage=(Msg)=>{
        if(Msg){
            showNotification();
            console.log("function call");
            showNotification();
          return Msg.map((msg,i)=>{
              //console.log(i+1);
            return renderMsg(msg,i);
          })
        }
        else
        {
            return null;
        }
    }

    navigator.serviceWorker.register('./sw.js')
    function showNotification(){
        console.log('function called');
      Notification.requestPermission(function(result) {
        if (result === 'granted') {
            // this.addEventListener("visibilitychange",()=>{
                if(document.visibilityState==='hidden'){
                  navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification('Message from admin', {
                      body: 'Hey!!! Why did you left us, come back you have a new message'
                    });
                  });
                }
                else{
                    console.log("page is not hidden");
                }
            //   })
        }
      });
      return;
    }


    // if(document.visibilityState==='hidden'){
            
    //     navigator.serviceWorker.ready.then(function(registration) {
    //       registration.showNotification('Message from admin', {
    //         body: 'Hey!!! Why did you left us, come back you have a new message'
    //       });
    //     });
    //   }

    //   function showNotification(){
    //     console.log('function called');
      
    // }


    // Notification.requestPermission(function(result) {
    //     if (result === 'granted') {
    //         document.addEventListener("visibilitychange",()=>{
    //             if(document.visibilityState==='hidden'){
    //               navigator.serviceWorker.ready.then(function(registration) {
    //                 registration.showNotification('Message from admin', {
    //                   body: 'Hey!!! Why did you left us, come back you have a new message'
    //                 });
    //               });
    //             }
    //           })
    //     }
    //   });



    //   function showNotification() {
    //     console.log('function called');
    //   Notification.requestPermission(function(result) {
    //     if (result === 'granted') {
    //         console.log('function called : yes');
    //         navigator.serviceWorker.ready.then(function(registration) {
    //           registration.showNotification('Message from admin', {
    //             body: 'Buzz! Buzz!'
    //           });
    //         });
    //     }
    //   });
    // }



    // function showNotification() {
    //     console.log('function called');
    //   Notification.requestPermission(function(result) {
    //     if (result === 'granted') {
    //         console.log('function called : yes');
          
    //         navigator.serviceWorker.ready.then(function(registration) {
    //           registration.showNotification('Message from admin', {
    //             body: 'You have a new message'
    //           });
    //         });
 
    //     }
    //   });
    // }


    return(
        <div style={{
            height:550,width:700, border : '3px solid black', borderRadius:'7px'
        }}>
            <div style={{
                height:495, width:'100%',overflow:'auto',backgroundColor:'#7f99e4'
            }}>
                {
                renderMessage(messageFromRedux)
                }
                </div>
            <input style={{
                margin: 0, width: '100%', height: 50,
                borderRadius: '4px', padding: '5px', fontSize: '1rem'
            }}
            placeholder="Send a message..."
            onKeyPress={keyPress}
            type="text"
            >
            </input>
            
        </div>
    )
}

export default Chatbotnew;
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import SockJS from "sockjs-client";
import { over } from "stompjs";
import group from "./group_300.svg";
import pin from "./push_300.svg";
import "./room.sass";
import useWebSocket, { ReadyState } from 'react-use-websocket';

var stompClient = null;
const Room = ({userData}) => {
    const { slug } = useParams();
	const [data, setData] = useState();
	const [messages, setMessages] = useState();
	const [message, setMessage] = useState("");

	let msgTm;

    useEffect(() => {
		var requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};
	
		fetch(`https://geckon-api.fly.dev/api/v1/discussions/${slug}`, requestOptions)
			.then(response => response.json())
			.then(result => {
				let messages = result.messages;
				delete result.messages;
				setData(result);
				return messages;
			})
			.then(msg => {
				setMessages(msg);
				return msg;
			})
			.then(msg => msgTm = msg)
			.then(() => connect())
			.catch(error => console.log('error', error));

		return () => {
			if (stompClient){
				stompClient.disconnect();
			}
		}
    }, [slug])
    
    const connect = () => {
		let cusSockJS = new SockJS("https://geckon-api.fly.dev/geckon-websocket");
		stompClient = over(cusSockJS);
		stompClient.connect({}, onConnected, onError);
	};
    
	const onConnected = () => {
		console.log("connected");
		if (stompClient.connected){
			stompClient.subscribe(`/topic/${slug}`, onMessageReceived);
		}
	};

	function onMessageReceived(payload){
		let payloadData = JSON.parse(payload.body);
		console.log(messages);
		msgTm = [payloadData, ...msgTm]
		setMessages(msgTm);
	}

	const onError = (err) => {
		console.log("9999");
		console.log(err);
	};

	function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

	const sendMessage = () => {
		if (stompClient){
			let time = formatDate(new Date());
			let chatMessage = {
				text: message,
				date: time.replaceAll(".", "-"),
				personId: userData.id,
				personName: userData.personName,
				themeSlug: slug
			}
			stompClient.send(`/app/send`, {}, JSON.stringify(chatMessage));
		}
	}

	

	const renderMesseges = () => {
		if (messages) {
			let tmp = messages.reverse();
			return tmp.map(el => {
				const {personName, date, text, personId, id} = el;
				let ruFormatDate = new Intl.DateTimeFormat('ru').format(new Date(date));
		
				return(
					<div className="room-item" key={id}>
						<div className="room-item__img"><img src="https://sun9-58.userapi.com/impf/c834202/v834202358/267fc/VeIG15_L8sU.jpg?size=500x500&quality=96&sign=48455b39ea3dbf99fd00a06a27f1a76f&type=album" alt="profile image"/></div>
						<div className="room-item__content">
							<div className="room-item__name">
								<h4>{personName}</h4>
								<h6>{ruFormatDate}</h6>
							</div>
							<h4 className="room-item__msg">{text}</h4>
						</div>
					</div>
				)
			})
		}
	} 

	const submitHandler = (e) => {
		e.preventDefault();
		if (message != ""){
			sendMessage();
			setMessage("");
		}
	}

    return (
		(!data && !messages) ? null : 

		<div className="room main-block">
			<div className="room__wrapper">
				<div className="room__title">
					<h4>{data.name}</h4>
					<div className="room__title--buttons">
						{/* <img src={group} alt="group"/> */}
						<img src={pin} alt="pin"/>
					</div>
				</div>
				<div className="room__descr">
					<h5>{data.descr}</h5>
				</div>
				{/* <button onClick={() => sendMessage()}>Отправить</button> */}
			</div>
			<div className="room__messages">
				{renderMesseges()}
			</div>
			<form action="" onSubmit={(e) => submitHandler(e)}>
				<input className="inpt" value={message} onChange={e => setMessage(e.target.value)} type="text" placeholder="Введите ваше сообщение..."/>
			</form>
		</div>
        
    )
}

export default Room;
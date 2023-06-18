import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import SockJS from "sockjs-client";
import { over } from "stompjs";
import group from "./group_300.svg";
import pin from "./push_300.svg";
import "./room.sass";

var stompClient = null;
const Room = () => {
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
	
		fetch(`http://localhost:8080/api/v1/discussions/${slug}`, requestOptions)
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
		let cusSockJS = new SockJS("http://localhost:8080/geckon-websocket");
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
				personId: "9",
				personName: "kvarutar",
				themeSlug: slug
			}
			stompClient.send(`/app/send`, {}, JSON.stringify(chatMessage));
		}
	}

	const renderMesseges = () => {
		if (messages) {
			return messages.map(el => {
				const {personName, date, text, personId, id} = el;
				let ruFormatDate = new Intl.DateTimeFormat('ru').format(new Date(date));
		
				return(
					<div className="room-item" key={id}>
						<div className="room-item__img"><div></div></div>
						<div className="room-item__content">
							<div className="room-item__name">
								<h4>{personName}</h4>
								<h6>{ruFormatDate}</h6>
							</div>
							<h4>{text}</h4>
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

		<div className="room">
			<div className="room__wrapper">
				<div className="room__title">
					<h4>{data.name}</h4>
					<div className="room__title--buttons">
						<img src={group} alt="group"/>
						<img src={pin} alt="pin"/>
					</div>
				</div>
				<div className="room__descr">
					<h5>{data.descr}</h5>
				</div>
				<div className="room__messages">

				</div>
				<button onClick={() => sendMessage()}>Отправить</button>
			</div>
			{renderMesseges()}
			<form action="" onSubmit={(e) => submitHandler(e)}>
				<input className="inpt" value={message} onChange={e => setMessage(e.target.value)} type="text" placeholder="Введите ваше сообщение..."/>
			</form>
		</div>
        
    )
}

export default Room;
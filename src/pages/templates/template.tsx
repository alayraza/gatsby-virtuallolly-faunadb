import React, { useState } from 'react';
import Header from '../../component/Header';
import Lolly  from '../../component/Lolly';
import { gql, useMutation} from "@apollo/client";
import { checkDocument } from '@apollo/client/utilities';
import { Link } from 'gatsby';
const timeout = require('timeout-then');

const GETSpecificLolly = gql`
    mutation SpecificlolliInfo($lollyPath: String!){
        SpecificlolliInfo(lollyPath: $lollyPath){
            recipientName
            message
            senderName
            flavourTop
            flavourMiddle
            flavourBottom
            lollyPath
        }
    }
`

const Template = ({ pageContext: { flavourTop, flavourMiddle, flavourBottom, recipientName, senderName, message, lollyPath } }) => {
    const [StateflavourTop, setflavourTop] = useState(flavourTop);
    const [StateflavourMiddle, setflavourMiddle] = useState(flavourMiddle);
    const [StateflavourBottom, setflavourBottom] = useState(flavourBottom);
    const [StaterecipientName, setrecipientName] = useState(recipientName);
    const [StatesenderName, setsenderName] = useState(senderName);
    const [Statemessage, setmessage] = useState(message);
    const [StatelollyPath, setlollyPath] = useState(lollyPath);
    const [Url, setUrl] = useState("");
    
    if(message){

    }else{
        const url=location.pathname.split("/");
        const [SpecificlolliInfo] = useMutation(GETSpecificLolly);
        const Spresult = SpecificlolliInfo({
            variables : {
                lollyPath:url[url.length -1]
            }
        }).then(value => {
            if(url[url.length -1]!=Url){
                setUrl(url[url.length -1]);
                setflavourTop(value.data.SpecificlolliInfo.flavourTop)
                setflavourMiddle(value.data.SpecificlolliInfo.flavourMiddle)
                setflavourBottom(value.data.SpecificlolliInfo.flavourBottom)
                setrecipientName(value.data.SpecificlolliInfo.recipientName)
                setsenderName(value.data.SpecificlolliInfo.senderName)
                setmessage(value.data.SpecificlolliInfo.message)
                setlollyPath(value.data.SpecificlolliInfo.lollyPath)
            }
            // console.log("specific data ", value.data.SpecificlolliInfo.flavourTop);
        }).catch(function(err){
            console.log("err ", err.toString());
        });
        // console.log("data ",StateflavourTop);
    }
    return (
        <div>
            <Header />
            <div className="lollyFormDiv">
                <div>
                    <Lolly fillLollyTop={StateflavourTop} fillLollyMiddle={StateflavourMiddle} fillLollyBottom={StateflavourBottom} />
                </div>
                <div>
                    <div className="lollyFrom textalignLeft">
                        <div>
                            To : <span><i>{StaterecipientName}</i></span>               
                        </div>
                        <div>
                            Message : <span><i>{Statemessage}</i></span>
                        </div>
                        <div>
                            From : <span><i>{Statemessage}</i></span>
                        </div>
                        <br/>
                        <div> You can <Link to="/createNew"> make your own</Link>{" "}</div>
                        <div className="urlFontsize">
                            <div> Share this Url: <Link to=""> {location.origin+location.pathname}</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Template
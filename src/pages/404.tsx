import React, { useState } from "react";
import { gql, useMutation} from "@apollo/client";

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

const Page404 = ({ location }) => {
    const [Url, setUrl] = useState("");
    const [isData, setData] = useState("");
    const isBrowser = typeof location !== `undefined`;

    if(isBrowser){
        const url=location.pathname.split("/");
        const [SpecificlolliInfo] = useMutation(GETSpecificLolly);
        const Spresult = SpecificlolliInfo({
            variables : {
                lollyPath:url[url.length -1]
            }
        }).then(value => {
            if(url[url.length -1]!=Url){
                setUrl(url[url.length -1]);
            }
            setData("done");
            // console.log("specific data ", value.data.SpecificlolliInfo.flavourTop);
        }).catch(function(err){
            setData("error");
            console.log("err ", err.toString());
        });
        // console.log("data ",StateflavourTop);
    }    

  return (
    <div>
        {isData=="error"?("Page Not Found"):"loading"}
    </div>
  );
};

export default Page404;
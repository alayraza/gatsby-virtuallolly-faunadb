// import { gql, useMutation,useQuery } from "@apollo/client";
import { gql, useMutation,useQuery} from "@apollo/client";
import React, { useRef, useState } from "react"
import Header from "../component/Header"
import Lolly from "../component/Lolly"
import { navigate } from "gatsby";

const GETDATA = gql`
    {
        lolliesInfo{
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
// const GETSpecificLolly = gql`
//     mutation SpecificlolliInfo($lollyPath: String!){
//         SpecificlolliInfo(lollyPath: $lollyPath){
//             recipientName
//             message
//             senderName
//             flavourTop
//             flavourMiddle
//             flavourBottom
//             lollyPath
//         }
//     }
// `

const createLollyMutation = gql`
    mutation createLolly($recipientName: String!, $message: String!, $senderName: String!, $flavourTop: String!, $flavourMiddle: String!,$flavourBottom: String!) {
        createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, flavourTop: $flavourTop, flavourMiddle: $flavourMiddle,flavourBottom: $flavourBottom) {
            message
            lollyPath
        }
    }
`

export default function CreateNew() {
    const [color1, setColor1] = useState("#d52358");
    const [color2, setColor2] = useState("#e95946");
    const [color3, setColor3] = useState("#deaa43");
    const recipientNameRef = useRef();
    const messageRef = useRef();
    const senderRef = useRef();

    const {loading, error, data } = useQuery(GETDATA);
    console.log("loaded ",data);
    console.log("loading ",loading);
    console.log("error ",error);
    const [createLolly] = useMutation(createLollyMutation);
    // const [SpecificlolliInfo] = useMutation(GETSpecificLolly);
    // const Spresult = SpecificlolliInfo({
    //     variables : {
    //         lollyPath:"dsa"
    //     }
    // }).then(value => {
    //     console.log("specific data ", value);
    // }).catch(function(err){
    //     console.log("err ", err.toString());
    // });
    // console.log("specific data ", Spresult);

    const submitLollyForm = async () => {
        console.log("clicked");
        console.log("color 1", color1);
        console.log("sender", senderRef.current.value);
        const result = await createLolly({
            variables : {
                recipientName: recipientNameRef.current.value,
                message : messageRef.current.value,
                senderName: senderRef.current.value,
                flavourTop: color1,
                flavourMiddle: color2,
                flavourBottom: color3
            }
        });
        // await navigate(`/lolly/${result.data?.createLolly?.lollyPath}`);
        await navigate(`/templates/template/${result.data?.createLolly?.lollyPath}`);
        console.log("result form server = ",result.data.createLolly.lollyPath);
    }

  return (
    <div className="container">
      {/*data && data.hello && <div>{data.hello}</div>*/}
      <Header />

        <div className="lollyFormDiv">
            <div>
                <Lolly fillLollyTop={color1} fillLollyMiddle={color2} fillLollyBottom={color3} />
            </div>
            <div className="lollyFlavourDiv">
                <label htmlFor="flavourTop" className="colorPickerLabel">
                    <input type="color"  value={color1} className="colorPicker" name="flavourTop" id="flavourTop"
                        onChange={(e)=>{
                            setColor1(e.target.value)
                        }}
                    
                    />
                </label>
                
                <label htmlFor="flavourTop" className="colorPickerLabel">
                    <input type="color"  value={color2} className="colorPicker" name="flavourTop" id="flavourTop"
                        onChange={(e)=>{
                            setColor2(e.target.value)
                        }}
                    />
                </label>
                <label htmlFor="flavourTop" className="colorPickerLabel">
                    <input type="color"  value={color3} className="colorPicker" name="flavourTop" id="flavourTop"
                        onChange={(e)=>{
                            setColor3(e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <div className="lollyFrom">
                    <label htmlFor="recipientName">
                        To                        
                    </label>
                    <input type="text" name="recipientName" id="recipientName" ref={recipientNameRef}/>
                    <label htmlFor="recipientName">
                        Message                       
                    </label>
                    <textarea rows="15" columns="30" ref={messageRef} />
                    <label htmlFor="recipientName">
                        From                        
                    </label>
                    <input type="text" name="senderName" id="senderName" ref={senderRef}/>
                </div>
                <input type="button" value="Create" onClick={submitLollyForm} />
            </div>
        </div>
    </div>
  );
}
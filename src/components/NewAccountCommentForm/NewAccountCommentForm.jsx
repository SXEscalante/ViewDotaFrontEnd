import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const NewAccountCommentForm = ({setOpenNewCommentForm, steamAccountId}) => {
    const [text, setText] = useState('');
    const [user, token] = useAuth();

    const handleNewComment = async (e) => {
        e.preventDefault()

        const comment = {
            text,
            recipientUserId: steamAccountId
        }

        try{
            const responce = await axios.post('https://localhost:5001/api/AccountComments', comment, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (responce.status === 201) {
                setOpenNewCommentForm(false)
            }
        }catch (error){
            console.log("Error getting friends comments", error)
        }
    }

    return ( 
        <div>
            <form onSubmit={handleNewComment}>
                <input type="text" value={text || ''} onChange={(e) => setText(e.target.value)}/>
                <button type="submit">Submit</button>
                <button onClick={() => setOpenNewCommentForm(false)}>x</button>
            </form>
        </div>
    );
}
 
export default NewAccountCommentForm;
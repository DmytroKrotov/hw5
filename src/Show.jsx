import { useEffect, useReducer,useContext } from "react";
import { useState } from "react";
import User from "./User";
import "./Show.css";
import { ThemeContext } from "./App";


export default function Show(){
    const [users, dispatch]=useReducer(reducer,[]);

    const[filterUsers,setFilterUsers]=useState([]);

    const[searchString,setSearchString]=useState("");
    const[deleteUser,setDeleteUser]=useState("");
    const[createUserId,setCreateUserId]=useState("");
    const[createUserName,setCreateUserName]=useState("");
    const[updateUserId,setUpdateUserId]=useState("");
    const[updateUserName,setUpdateUserName]=useState("");

    
    
    const theme = useContext(ThemeContext);
    console.log(theme);


    useEffect(
        ()=>{
            fetch('http://localhost:3000/users')
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              dispatch({type: "read_users",payload: data});
              setFilterUsers(data);
            });

        },
        []
    )

    function reducer(state,action){
        switch(action.type){
               
                case "read_users":
                    {
                        return action.payload;   
                    }
                case "create_user":
                    {
                        return [...state,action.payload];
                    }
                case "delete_users":
                    {
                        return state.filter((user) => user.id !== action.payload)
                    }
                case "update_user":
                    {
                        return state.map((user) => {
                            if (user.id === action.payload.id) {
                              return action.payload;
                            }
                            return user;
                          }
                        )   
                    }
                default:
                    return state;
        }
    }

    function handlerSearch(e){
        setSearchString(e.target.value);

        setTimeout(()=>{
            setFilterUsers(users.filter((u)=>u.name.toLowerCase().includes(e.target.value.toLowerCase())));
        },400)
    }
    function handlerDeleteUserChange(e){
        setDeleteUser(e.target.value);
    }

    function handlerDeleteUser(e){
        e.preventDefault();
        dispatch({type: "delete_users", payload: deleteUser});
        setFilterUsers(users);
        setDeleteUser("");
    }

    function handlerCreateUserIdChange(e){
        setCreateUserId(e.target.value);
    }

    function handlerCreateUserNameChange(e){
        setCreateUserName(e.target.value);
    }

    function handlerCreateUser(e){
        e.preventDefault();
        dispatch({type: "create_user", payload: {id: createUserId, name: createUserName}});
        setFilterUsers(users);
        setCreateUserId("");
        setCreateUserName("");
    }

    function handlerUpdateUserIdChange(e){
        setUpdateUserId(e.target.value);
    }

    function handlerUpdateUserNameChange(e){
        setUpdateUserName(e.target.value);
    }

    function handlerUpdateUser(e){
        e.preventDefault();
        dispatch({type: "update_user", payload: {id: updateUserId, name: updateUserName}});
        setFilterUsers(users);
        setUpdateUserId("");
        setUpdateUserName("");
    }

    return (
        <>
        <div className={theme}>
        <form>
                <input type="text" value={deleteUser} onChange={handlerDeleteUserChange} placeholder="Deleted users id"/>
                <button onClick={handlerDeleteUser}>Delete</button>
            </form>

            <form>
                <input type="text" value={createUserId} onChange={handlerCreateUserIdChange} placeholder="Created users id"/>
                <input type="text" value={createUserName} onChange={handlerCreateUserNameChange} placeholder="Created users name"/>
                <button onClick={handlerCreateUser}>Create</button>
            </form>

            <form>
                <input type="text" value={updateUserId} onChange={handlerUpdateUserIdChange} placeholder="Update users id"/>
                <input type="text" value={updateUserName} onChange={handlerUpdateUserNameChange} placeholder="New users name"/>
                <button onClick={handlerUpdateUser}>Update</button>
            </form>

            <input type="text" value={searchString} onChange={handlerSearch} placeholder="Search user name"/>
            <ul>
                {filterUsers.map((i)=><User key={i.id} id={i.id} name={i.name}/>)}
            </ul>
        </div>
            
        </>
    )
}
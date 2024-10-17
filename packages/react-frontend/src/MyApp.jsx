// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";
function MyApp() {
        const [characters, setCharacters] = useState([]);

        function removeOneCharacter(index){
		
		fetch(`http://localhost:8000/users/${_id}`,{
			method: 'DELETE',
		})
		.then(response => {
			if (response.status === 204){
                		const updated = characters.filter((character, i) => {
                        		return i != index;
				})
				setCharacters(updated);
			}
                });
                
                }
        function updatelist(person) {
                postUser(person)
      			.then((response) => {
				if(response.status === 201){
					return response.json();
					
				}
			})
			.then((userToAdd) => {
				setCharacters([...characters, userToAdd]);
				
				
			
			})
			
      			.catch((error) => {
        			console.log(error);
      			})
        }
        function fetchUsers() {
                const promise = fetch("http://localhost:8000/users");
                return promise;
        }
	function postUser(person) {
    		return fetch("Http://localhost:8000/users", {
      		method: "POST",
      		headers: {
        		"Content-Type": "application/json",
      		},
      		body: JSON.stringify(person),
    		})
		.then(response =>{
			return response
		}) 
    		
  	};
        useEffect(() => {
                fetchUsers()
                .then((res) => res.json())
                .then((json) => setCharacters(json["users_list"]))
                .catch((error) => { console.log(error); });
        }, [] );
        return (
                <div className="container">
                        <Table
                                characterData={characters}
                                removeCharacter = {removeOneCharacter}
                        />
                <Form handleSubmit = {updatelist} />
                </div>
        );
}
export default MyApp;



import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from 'react-apollo-hooks'
import Navbar from '../components/Navbar';
import Header from  '../components/Headers'
import Input from '../components/Input'
import useForm from '../hooks/useForm';

const ADD_AUTHOR = gql `
	mutation CreateAuthor($data:CreateAuthorInput!){
		CreateAuthor(data:$data){
			_id,
			first_name
		}
	}
`

function Signup (history){
	const [sendSignUp, {error}] = useMutation(ADD_AUTHOR);
	const catchSubmit = async(fields) =>{
		if (fields.password === fields.confirm_password){
			delete fields.confirm_password;
			await sendSignUp({variables:{data:{...fields}}})
			error ? alert ("hubo un error"): history.push('/login');
			
		}else{
			alert('Los password no coinciden');
		}
	}

	const {inputs,handleInputChange,handleSubmit} = useForm(catchSubmit)

    return (
        <>
        <Navbar></Navbar>
        <Header></Header>
        <main className="container">
				<section className="row">
					<div className="col-lg-8 col-md-10 mx-auto">
						<form>
							<Input name="first_name"
							label="First Name"
							placeholder="First Name"
							type="text"
							value={''}
							onChange={handleInputChange}
							required 
							/>
							<Input name="last_name"
							label="Last Name"
							type="text"
							placeholder="Last Name"
							value={''}
							onChange={handleInputChange}
							required 
							/>
							<Input name="email"
							label="Email"
							type="email"
							placeholder="Email"
							value={''}
							onChange={handleInputChange}
							required 
							/>
							<Input name="password"
							label="Password"
							type="password"
							placeholder="password"
							value={''}
							onChange={handleInputChange}
							required 
							/>
							<Input name="confirm_password"
							label="Confirm Password"
							type="password"
							placeholder="Confirm Password"
							value={''}
							onChange={handleInputChange}
							required 
							/>

							<button type="submit" className="btn btn-primary">Send</button>

						</form>
					</div>
				</section>
			</main>
        </>
    )
}

export default Signup;
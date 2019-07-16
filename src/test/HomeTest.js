import React from 'react';
import {act} from 'react-apollo-test';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import createClient from './mockClient';
import Home from '../views/Home';
import gql from 'graphql-tag';
import Home from '../views/Home';
import { resolve } from 'path';

const ALL_POST = gql`
	query ALLPOST {
		listPosts{
			_id,
			title
		}
	}
`

const ALL_POST_MOCK = [
    {
        request: {
            query: ALL_POST
        },
        result: {
            data: {
                listPosts: [
                    { _id: "65464664", title: "Post 1" },
                    { _id: "65464665", title: "Post 2" },
                    { _id: "65464666", title: "Post 3" }
                ]
            }
        }
    }
]

const waitRequest = () => new Promise(resolve => setTimeout(resolve));

describe("<Home/>", () => {
    it("Render Works", () => {
        const client = createClient(ALL_POST_MOCK)
        const component = mount(
            <ApolloProvider client ={client}>
                <Router>
                    <Home />
                </Router>                
            </ApolloProvider>
            
            );
        expect(component).toMatchSnapShot();
    })

    it("Render Works Post", () => {
        act(() =>{

            const testRequest = async() =>{
                const client = createClient(ALL_POST_MOCK)
                await waitRequest();
                const component = mount(
                    <ApolloProvider client ={client}>
                        <Router>
                            <Home />
                        </Router>                
                    </ApolloProvider>
                    
                    );
                expect(component.find(".post-title")).toHaveLenght(3);
                //expect(component.find('h4').text()).toBe("Loading....");        
            }
            testRequest();
        })
    })
})

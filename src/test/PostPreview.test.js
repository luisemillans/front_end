import React from 'react';
import {shallow} from 'enzyme';
import PostPreview from '../components/PostPreview';
import { italic } from 'ansi-colors';

describe ("<PsotPreview/>",()=>{
    it("Simple Render Works", () =>{
        const component =shallow(<PostPreview/>);
        expect (component).toMatchSnapshot();
    })

    it("Render With props Works", () =>{
        const component = shallow(
            <PostPreview _id={"64132131"} title={"post prueba"}/>
        )

        expect (component.find('.post-title').text()).toBe("post prueba")
    });
})

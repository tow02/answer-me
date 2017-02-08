import React from 'react';
import {createRenderer} from 'react-addons-test-utils';
import TestUtils from 'react-addons-test-utils';
import chai, {expect} from 'chai'
import jsxChai from 'jsx-chai'
import {findDOMNode, render} from 'react-dom';

chai.use(jsxChai)

import Hello from '../../../client/hello';

describe('Hello', () => {
  it('works shallow style', () => {
    let renderer = TestUtils.createRenderer();
    let element = <Hello/>
    let component = TestUtils.renderIntoDocument(element)
    let h1 = findDOMNode(component).querySelectorAll('h1')
    return expect(h1[0].textContent).to.deep.equal("Hello World!")
  });

  it('does something after click', ()=>{
    let renderer = TestUtils.createRenderer();
    let element = <Hello/>
    let component = TestUtils.renderIntoDocument(element)
    
    let morebutton = component.refs.morebutton
    TestUtils.Simulate.click(morebutton)

    let datanode = findDOMNode(component.refs.data)
    return expect(datanode.textContent).to.deep.equal("1")
  })
});

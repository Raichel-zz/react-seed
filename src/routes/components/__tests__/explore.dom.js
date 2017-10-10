import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import Explore from "../explore";

test('Explore changes the text after click', () => {
  // Render an explore comp
  let test_value = "initial value";
  let onClick = (val) => {
    test_value = val;
    expect(val).toEqual('blah blah');
  };

  const explore = mount(<Explore onChange={val => onClick(val)} value={test_value}/>);
  explore.find('input').node.value = "blah blah";
  explore.find('button').simulate('click');

});
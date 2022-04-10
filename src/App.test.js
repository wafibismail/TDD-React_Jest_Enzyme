
/** render from testing library not needed; we will use shallow from enzyme instead
*///import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
import PersonList from './PersonList';

describe('App', () => {
  it("renders without crashing", () => {
    const appWrapper = shallow(<App />);
  });

  it('renders a person list', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);

    //Checks that there is only one element in the array personList;
    expect(personList).toHaveLength(1);
  });

  it('', () => {
    const appWrapper = shallow(<App />);
    const appState = appWrapper.state();
  
    expect(appState).not.toBeNull();
  });
});
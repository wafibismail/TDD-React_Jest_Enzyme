
/** render from testing library not needed; we will use shallow from enzyme instead
*///import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
import PersonList from './PersonList';

describe('App', () => {
  it("renders without crashing", () => {
    const appWrapper = shallow(<App />);
  });

  it('', () => {
    const appWrapper = shallow(<App />);
    appWrapper.find(PersonList);
  });
});
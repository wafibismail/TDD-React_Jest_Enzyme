//configure the enzyme adapter here

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

//Enzyme uses this to figure out how to connect itself to jest
configure({ adapter: new Adapter() })
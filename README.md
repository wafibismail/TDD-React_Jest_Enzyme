# TDD

## About

Another exercise assigned by my Software Engineering lecturer, now on Test-Driven Development (TDD). <br>
<br>

We were recommended few YouTube videos to base our exercises from.<br>
<br>

In my case, I picked [**TDD Live Coding - Test Driven Development Tutorial with React, Jest, and Enzyme**](https://www.youtube.com/watch?v=tX-gu6FWcsE) by **Programming Made EZ**

### Steps (cycle - do these over and over again)

- Write a failing test

- Then, write the implementation code

- Then, refactor

### Laws

- Write a failing test 

- Must not write more test than is sufficient to fail

- Must not write more production code than sufficient to make the test pass

### ZOMBIE - simple scenarios, to be handled with simple solutions

- Zero case
- One case
- Many case
- Boundary behaviour
- Interfaces
- Exceptions

### About testing

- UI tests a.k.a. End-to-end tests - slower tests
  - Database -> Json -> React -> Json->JS, etc.
  - **May start developing tests from here, move slowly downwards** - __Outside in__

- Service tests a.k.a. integration tests
  - Diff layers interacting with each other properly 

- Unit tests
  - Tiny pieces, making sure each tiny piece is working as it should be
  - **Traditionally, start from here, move upwards slowly** - __inside-out__


## About the exercise

### Tools

#### Jest
- Generic testing framework
- Comes by default with "npx create-react-app"

#### Enzyme
- Special library (gives a different interface) for working with react components
- Install manually

```
npm i -D enzyme
```

### Points - (not arranged properly, currently top-to-down = start-to-end

Start in the red phase<br>
<br>

Remember: Write a test that fails
- Start by creating a suite
  - Use describe("Thing to describe")

```JavaScript
//App.js
function App() {
  return (
    <div className="App">
    </div>
  );
}
```

```JavaScript
//App.test.js
describe('App', () => {
  it("Name of the component to test", () => {
    
  });
});
```

The test above passes
- Because we haven't created an assertion to fail

Note that labeling can come later e.g. part of refactor phase
- In the mean time, can create an **app wrapper** (see code block below)
  - containing the results of going and getting the app component
    - So we can inspect it
  - This is akin to creating an instance of a class

```JavaScript
describe('App', () => {
  it("", () => {
    const appWrapper = shallow(<App />);
  });
});
```

**shallow** from enzyme
- Forces to not load the entire child tree/branches of the component
  - Only loads the app
- The enzyme-adapter-react-16 package is required (no higher version available)
  - Since it's 2 versions lower than the installed react version, I downgraded react from 18->16


```
npm i -D enzyme-adapter-react-16
```

First red-green cycle
- All while doing these steps (getting enzyme to work), the test would fail as the environment was not already set up to be usable.
- After finally configuring enzyme to work with jest (refer to src/setupTests.js), the first red-green cycle has been completed!
- Anything to refactor? - the description for it()!

```JavaScript
describe('App', () => {
  it("renders without crashing", () => {
    const appWrapper = shallow(<App />);
  });
});
```

Test is able to re-run without failing
- (We should always run our test on changes)

Now for the next test
- meaning, going back to the red phase
  - The test below fails since there is no "PersonList" (i.e. not defined)


```JavaScript
describe('App', () => {
  it("renders without crashing", () => {
    const appWrapper = shallow(<App />);
  });

  it('', () => {
    const appWrapper = shallow(<App />);
    appWrapper.find(PersonList);
  });
});
```

That is enough for the red phase
- remember, the law "Must not write more test than is sufficient to fail"

Now for the green phase
- "Must not write more production code than sufficient to make the test pass"

```JavaScript
//Newly created Person.js in src folder
export default () => {};
```

```JavaScript
//Current App.jsimport PersonList from './PersonList';
function App() {
  return (
    <div className="App">
      <PersonList />
    </div>
  );
}
```

```JavaScript
//New import statement on top of App.test.js
import PersonList from './PersonList';
```

- Note that the test is not done yet, actually.
  - Still need to create an assertion

```JavaScript
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
});
```

Done! Test should pass (there be only one PersonList). Also included in the code above is:
- the refactor phase i.e. describe the test

On to the next implementation
- Again, starting with a test (red phase)

```JavaScript
//another test, under the same test suite
it('', () => {
  
});
```

Say we want App to contain an object for PersonList. In which case the App component has to have something called state property.

```JavaScript
//App.test.js
it('', () => {
  const appWrapper = shallow(<App />);
  const appState = appWrapper.state();
});
```

```JavaScript
//App.js, now with App converted to a class
import React, { Component } from 'react';
import PersonList from './PersonList';

class App extends Component {
  render() {
    return (
      <div className="App">
      <PersonList />
      </div>
    );
  }
}

export default App;
```

Going back to (*n*)ZOMBIEs... What if the state is null?
- We do not want null; Having a null should fail the test

```JavaScript
//App.test.js
it('', () => {
  const appWrapper = shallow(<App />);
  const appState = appWrapper.state();

  expect(appState).not.toBeNull();
});
```

It indeed does fail, to make it pass, create a state and set to an empty object

```JavaScript
class App extends Component {
  state = {}
  render() {
    return (
      <div className="App">
      <PersonList />
      </div>
    );
  }
}
```

Now that the test passes, is there any refactoring?
- Yes! Describe the test

```JavaScript
//App.test.js
it('has state', () => {
  const appWrapper = shallow(<App />);
  const appState = appWrapper.state();

  expect(appState).not.toBeNull();
});
```

And now, again, back to the red phase with a new test:

```JavaScript
it('', () => {
   
});
```

We want the PersonList to contain people, so the corresponding test:

```Javascript
it('', () => {
  const appWrapper = shallow(<App />);
  const appState = appWrapper.state();

  expect(appState.people).toBeDefined();
});
```

Adding people (empty array) to the state passes the test:

```JavaScript
state = { people: [] };
```

And that passes the test. <br>
<br>

Now for the refactor phase, what can we clean up?

```JavaScript
describe('App', () => {
  it("renders without crashing", () => {
    const appWrapper = shallow(<App />);
  });

  it('renders a person list', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);

    expect(personList).toHaveLength(1);
  });

  it('has state', () => {
    const appWrapper = shallow(<App />);
    const appState = appWrapper.state();
  
    expect(appState).not.toBeNull();
  });

  it('', () => {
    const appWrapper = shallow(<App />);
    const appState = appWrapper.state();
  
    expect(appState.people).toBeDefined();
  });
});
```

The answer?
- The redundant first line of each test
  - which can be extracted into a beforeAll state

- In addition giving the most recent test a description

```JavaScript
describe('App', () => {
  let appWrapper;
  beforeAll(() => {
    appWrapper = shallow(<App />);
  });

  it('renders a person list', () => {
    const personList = appWrapper.find(PersonList);

    //Checks that there is only one element in the array personList;
    expect(personList).toHaveLength(1);
  });

  it('has state', () => {
    const appState = appWrapper.state();
  
    expect(appState).not.toBeNull();
  });

  it('has a people property on state', () => {
    const appState = appWrapper.state();
  
    expect(appState.people).toBeDefined();
  });
});
```

Next?<bs>
<br>

We need to move the people property to PersonList for for the PersonList to be able to render whatever it needs to.<br>
<br>

We could write the code to assign people as a property. However, a test needs to be written around that too.

```JavaScript
it('', () => {
  const personList = appWrapper.find(PersonList);
    
  expect(personList.props().people).toEqual(appWrapper.state().people);
  // where props is the function that gets the people prop
  // and which is equal to the peole on state
});
```

The test fails; To make it pass:

```JavaScript
class App extends Component {
  state = { people: [] };
  render() {
    return (
      <div className="App">
        <PersonList people={this.state.people} />
      </div>
    );
  }
}
```

Refactor:

```JavaScript
it('passes people property of state to personList as prop', () => {
  const personList = appWrapper.find(PersonList);
  
  expect(personList.props().people).toEqual(appWrapper.state().people);
});
```
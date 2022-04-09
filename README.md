# TDD

## About

Another exercise assigled by my Software Engineering lecturer, now on Test-Driven Development (TDD)

### Steps (cycle - do these over and over again)

- Write a failing test

- Then, write the implementation code

- Then, refactor

### Laws

- Write a failing test 

- Must not write more test than is sufficient to compile

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

- Start in the red phase

- Remember: Write a test that fails
 - Start by creating a suite
   - Use describe("Thing to describe")

```javascript
describe('App', () => {
  it("Name of the component to test", () => {
    
  });
});
```

- The test above passes
  - Because we haven't created an assertion to fail

- Note that labeling can come later e.g. part of refactor phase
  - In the mean time, can create an **app wrapper** (see code block below)
    - containing the results of going and getting the app component
      - So we can inspect it
    - This is akin to creating an instance of a class

```javascript
describe('App', () => {
  it("", () => {
    const appWrapper = shallow(<App />)
  });
});
```

- **shallow** from enzyme
  - Forces to not load the entire child tree/branches of the component
    - Only loads the app
  - The enzyme-adapter-react-16 package is required
    - Since it's 2 versions lower than the installed react version, I downgraded react from 18->16


```
npm i -D enzyme-adapter-react-16
```
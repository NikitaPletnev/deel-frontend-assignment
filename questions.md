# React Knowledge Questions - Part 2

## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.
- **Component**: This is the base class for most React components. It doesn't perform any optimizations by default when it comes to rendering.
- **PureComponent**: This is a special type of `Component` that implements `shouldComponentUpdate()` with a shallow comparison for props and state. This means that if the props or state of the component do not change (according to shallow comparison), the component will not re-render.

Example where `PureComponent` might break your app:
- Suppose you pass a nested object or array as a prop to a `PureComponent`. If you update that nested object or array directly (mutate it) without creating a new reference, `PureComponent` will not detect the change due to the shallow comparison. This can cause the component not to re-render, even though the nested value has changed.

```jsx
class MyPureComponent extends React.PureComponent {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}

// Parent component
const data = { value: "Hello" };
<MyPureComponent data={data} />;

// Mutating the nested property without changing the reference
data.value = "World"; // This change won't trigger a re-render
```

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
- Using `Context` with `shouldComponentUpdate` might be dangerous because `Context` bypasses props and state, and delivers updates directly. If you implement `shouldComponentUpdate` in a component consuming the context, it will not take `Context` changes into account, potentially preventing your component from re-rendering when context changes. This can lead to a situation where your component does not properly react to state updates that come through context.

## 3. Describe 3 ways to pass information from a component to its PARENT.
1. **Callback Functions**: Pass a function as a prop from the parent to the child. The child can then call this function, possibly passing data as arguments.
   ```jsx
   const Parent = () => {
     const handleData = (data) => {
       console.log(data);
     };
     return <Child onSendData={handleData} />;
   };
   
   const Child = ({ onSendData }) => {
     return <button onClick={() => onSendData("Hello from Child")}>Send Data</button>;
   };
   ```

2. **Using Context**: Create a context that both the parent and child components can access, and update the context value in the child.
   ```jsx
   const DataContext = React.createContext();

   const Parent = () => {
     const [data, setData] = useState("");
     return (
       <DataContext.Provider value={{ data, setData }}>
         <Child />
       </DataContext.Provider>
     );
   };

   const Child = () => {
     const { setData } = useContext(DataContext);
     return <button onClick={() => setData("Data from Child")}>Send Data</button>;
   };
   ```

3. **Using State Lifting**: Lift the state up to the closest common parent, and pass functions to update that state down to the child.

## 4. Give 2 ways to prevent components from re-rendering.
1. **React.memo**: Wrap a functional component with `React.memo()` to prevent it from re-rendering if the props do not change.
   ```jsx
   const MyComponent = React.memo(({ prop }) => {
     return <div>{prop}</div>;
   });
   ```

2. **shouldComponentUpdate**: Use `shouldComponentUpdate` in a class component to define if the component should re-render based on a comparison of props or state.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.
- **Fragment**: A fragment is used to group multiple elements without adding an extra node to the DOM. It is useful when returning multiple elements from a component.
  ```jsx
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
  ```
- **Breaking Example**: If a fragment is used as a direct child of a table element instead of `<tbody>`, the DOM structure might become invalid.
  ```jsx
  return (
    <table>
      <>
        <tr><td>Invalid Use</td></tr>
      </>
    </table>
  );
  ```

## 6. Give 3 examples of the HOC pattern.
1. **Authentication Wrapper**: A HOC that checks if a user is authenticated before rendering the component.
   ```jsx
   const withAuth = (Component) => (props) => {
     return isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />;
   };
   ```

2. **Error Boundary**: A HOC that catches JavaScript errors and displays a fallback UI.
   ```jsx
   const withErrorBoundary = (Component) => {
     return class extends React.Component {
       state = { hasError: false };

       componentDidCatch() {
         this.setState({ hasError: true });
       }

       render() {
         return this.state.hasError ? <div>Error occurred</div> : <Component {...this.props} />;
       }
     };
   };
   ```

3. **Logging Props**: A HOC that logs the props passed to a component.
   ```jsx
   const withLogging = (Component) => (props) => {
     console.log(props);
     return <Component {...props} />;
   };
   ```

## 7. What's the difference in handling exceptions in promises, callbacks and async…await?
- **Promises**: Use `.catch()` to handle exceptions.
  ```jsx
  fetchData().then(response => console.log(response)).catch(error => console.error(error));
  ```
- **Callbacks**: Error handling is usually done by passing an error object as the first argument of the callback function.
  ```jsx
  function fetchData(callback) {
    if (error) {
      return callback(error);
    }
    callback(null, data);
  }
  ```
- **Async/Await**: Use `try...catch` to handle exceptions in a more synchronous way.
  ```jsx
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  ```

## 8. How many arguments does setState take and why is it async?
- **Arguments**: `setState` takes two arguments:
  1. **State Update**: The new state or a function to derive the new state based on the previous state.
  2. **Callback** (optional): A callback function that gets executed after the state is updated.
- **Why Async**: `setState` is asynchronous to allow React to batch multiple state updates together for performance optimization.

## 9. List the steps needed to migrate a Class to Function Component.
1. **Convert `render` Method**: Remove the `render` method, and convert its content to the return statement of the functional component.
2. **Replace `this.state` with `useState`**: Replace the state with `useState` hooks.
3. **Replace Lifecycle Methods**: Replace lifecycle methods with appropriate hooks like `useEffect`.
4. **Remove `this` References**: Remove references to `this`.

## 10. List a few ways styles can be used with components.
1. **CSS Stylesheets**: Import CSS files into the component.
2. **Inline Styles**: Use JavaScript objects to define styles directly in JSX.
3. **CSS Modules**: Use modular and scoped CSS by importing styles as objects.
4. **Styled-Components**: Use libraries like `styled-components` for defining CSS-in-JS styles.

## 11. How to render an HTML string coming from the server.
- Use the `dangerouslySetInnerHTML` attribute to render raw HTML, but be cautious as it can expose your app to XSS attacks.
  ```jsx
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  

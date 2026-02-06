# React Best Practices Guidelines

## Table of Contents

- [1. Component Structure and Design](#1-component-structure-and-design)
- [2. State Management](#2-state-management)
- [3. Functional Programming and Hooks](#3-functional-programming-and-hooks)
- [4. TypeScript](#4-typescript)
- [5. Code Organisation and Architecture](#5-code-organisation-and-architecture)
- [6. Styling and CSS](#6-styling-and-css)
- [7. Performance Optimisation](#7-performance-optimisation)
- [8. Testing and Error Handling](#8-testing-and-error-handling)
- [9. Accessibility](#9-accessibility)
- [10. Code Quality and Best Practices](#10-code-quality-and-best-practices)
- [11. Icons](#11-icons)
- [12. Continuous Learning](#12-continuous-learning)

## 1. Component Structure and Design

**Summary**: Focus on creating reusable, well-structured components. Use presentational and container components, follow SOLID principles, and leverage component composition for flexibility.

### Presentational and Container Components

- Use Presentational Components for reusable UI elements
- Use Container Components for component aggregations, business logic, and API orchestration
- Note: With hooks, the line between presentational and container components has blurred. Focus on component responsibilities rather than strict categorisation.

### Component Composition

- Remember that props are decisions made for the consumer (flexibility tradeoff)
- Children props defer decisions to the consumer, increasing flexibility

```javascript
// Flexible component using children
const Button = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

// Usage
<Button onClick={handleClick}>
  <span>Click me</span>
</Button>;
```

### SOLID Principles in React

- Single Responsibility: Each component should have one reason to change
- Open/Closed: Components should be open for extension but closed for modification
- Liskov Substitution: Subcomponents should be substitutable for their base components
- Interface Segregation: Prefer smaller, focused components over large, multi-purpose ones
- Dependency Inversion: Depend on abstractions, not concretions

Reference: [SOLID Principles in React](https://medium.com/dailyjs/applying-solid-principles-in-react-14905d9c5377)

## 2. State Management

**Summary**: Choose appropriate state management techniques based on your application's complexity. Lift state when necessary, prefer React Context for shared state, and consider Redux only for large, complex applications.

- Lift shared state up to the closest common ancestor
- Prefer React Context for shared state over Redux for most applications
- Use Redux only for very large, complex projects with global state requirements
- For actions like button clicks, prefer using state + useEffect over directly executing functions

```javascript
// Using React Context
const MyContext = React.createContext();

const ParentComponent = () => {
  const [sharedState, setSharedState] = useState(initialState);

  return (
    <MyContext.Provider value={{ sharedState, setSharedState }}>
      <ChildComponent />
    </MyContext.Provider>
  );
};

const ChildComponent = () => {
  const { sharedState, setSharedState } = useContext(MyContext);
  // Use sharedState and setSharedState
};

// Preferred way of handling actions
const [open, setOpen] = useState(true);

useEffect(() => {
  if (!open) {
    // Do something
  }
}, [open]);

// In JSX
<Button onClick={() => setOpen(false)}>Close</Button>;
```

Reference: [React Context](https://reactjs.org/docs/context.html)

## 3. Functional Programming and Hooks

**Summary**: Embrace functional programming principles and React Hooks for cleaner, more maintainable code. Prefer pure functions, minimise mutations, and leverage React's built-in hooks for state and side effects.

- Prefer functional components over class components
- Use hooks for state and side effects in functional components
- Embrace declarative programming for improved developer experience
- Minimise mutations (use `const` over `let`, avoid `Object.assign`)
- Use array functions like `map`, `reduce`, `filter` instead of loops
- Write pure functions without side effects

```javascript
// Functional component with hooks
const MyKmComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

## 4. TypeScript

**Summary**: Leverage TypeScript for improved code quality and developer experience. Use proper typing for all components and functions, avoiding `any` types when possible.

- Use TypeScript for all components and functions
- Avoid using the `any` type unless absolutely necessary
- Do not use the `React.FC` type for functional components

```typescript
// Prefer this
interface MyKmComponentProps {
  prop1: string;
  prop2: number;
}

export const MyKmComponent = ({ prop1, prop2 }: MyKmComponentProps) => {
  // Component logic
};

// Over this
export const MyKmComponent: React.FC<MyKmComponentProps> = ({
  prop1,
  prop2
}) => {
  // Component logic
};
```

## 5. Code Organisation and Architecture

**Summary**: Maintain a clear and consistent project structure. Separate core logic from UI components, and organise files in a way that promotes reusability and maintainability.

- Implement "Agnostic Core, Advocate Shell": Core capabilities in vanilla JS, React for UI
- "Functional Core, Declarative Shell": Pure functions for business logic, React for UI declaration
- Follow a consistent folder structure for components
- Use prefix `Km` to define application specific UI element (that implements application own logic)

```
KmComponentName/
  ├── ComponentName.tsx         // base component (RDS)
  ├── KmComponentName.tsx       // app component
  ├── KmComponentName.styled.tsx
  ├── KmComponentName.spec.tsx
  ├── KmComponentName.types.tsx
  ├── KmComponentName.stories.tsx
  ├── KmComponentNameUtils.ts(x)
  ├── KmComponentNameUtils.spec.ts(x)
  └── KmMockComponentNameData.ts
```

## 6. Styling and CSS

**Summary**: Adopt a consistent approach to styling. Prefer styled-components for better reusability, follow a mobile-first approach, and maintain a logical order for CSS properties.

- Prefer styled components over the `sx` prop for better reusability
- Follow a mobile-first approach (avoid `max-width` breakpoints)
- Order CSS properties according to type (layout, typography, visual, animation)
- Use the American spelling of 'color' for consistency with CSS standards
- Use the `Styled` prefix followed by the name of the component being wrapped.
- follow the convention in `code-guidelines_design-system.md` with transient props; when extending RDS props.

```javascript
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button, { ... })
```

## 7. Performance Optimisation

**Summary**: Implement performance optimisations to ensure your React application runs smoothly. Use memoization techniques, code splitting, and lazy loading to improve performance.

- Use React.memo for pure functional components to prevent unnecessary re-renders
- Optimise re-renders with useMemo and useCallback
- Implement code splitting and lazy loading for larger applications

```javascript
const MemoizedComponent = React.memo(({ prop }) => {
  // Component logic
});

const ParentComponent = () => {
  const memoizedCallback = useCallback(
    () => {
      // Callback logic
    },
    [
      /* dependencies */
    ]
  );

  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

  return <MemoizedComponent prop={memoizedValue} onClick={memoizedCallback} />;
};
```

## 8. Testing and Error Handling

**Summary**: Implement comprehensive testing and error handling strategies. Write unit and integration tests, use error boundaries, and follow defensive coding practices.

- Write unit and integration tests for components and hooks
- Use error boundaries to gracefully handle runtime errors
- Implement defensive coding practices
- Follow consistent naming conventions for test files (e.g., `KmComponentName.spec.tsx`)

```javascript
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }) => (
  <div>
    <h2>Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
);

const KmMyApp = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <KmMyComponent />
  </ErrorBoundary>
);
```

## 9. Accessibility

**Summary**: Prioritise accessibility in your React applications. Follow best practices, use appropriate ARIA attributes, and ensure your application is usable by everyone.

- Follow accessibility best practices
- Currently, use the `KmVisuallyHidden` component for screen-reader-only content \* when `RdsVisuallyHidden` component is ready to use, we can migrate to it
- Ensure proper use of ARIA attributes

```javascript
import { KmVisuallyHidden } from '@know-it/ui';

const AccessibleComponent = () => (
  <div>
    <KmVisuallyHidden label='Status: ' />
    Active
  </div>
);
```

## 10. Code Quality and Best Practices

**Summary**: Maintain high code quality through consistent formatting, naming conventions, and documentation. Use linters and formatters to enforce these standards.

- Use a linter (ESLint) and formatter (Prettier) to maintain code quality and consistency
- Follow consistent naming conventions (e.g., `onChange` for events, `handleChange` for functions)
- Use TODO comments with a consistent format (e.g., `// TODO: 2023-07-08 Update this component @refactor`)
- Keep dependencies updated and regularly audit your project for vulnerabilities

## 11. Icons

**Summary**: Use a consistent approach for icons in your application. Prefer built-in icon libraries when possible, and use custom icon components for specific needs.

- Prefer using RDS icons when available
- Only use MUI icons when necessary, especially if similar icon is already in RDS (check rule above)
- For custom icons, use the `KmCustomIcon` component

## 12. Continuous Learning

**Summary**: Stay updated with the latest React developments and JavaScript features. Regularly refactor your code to incorporate new best practices and patterns.

- Stay updated with the latest React updates and best practices
- Understand key JavaScript concepts (e.g., this, closures, promises, async/await)
- Regularly refactor and improve your codebase

Reference: [React Blog](https://reactjs.org/blog)

Remember to always refer to the [official React documentation](https://reactjs.org/docs/getting-started.html) for the most up-to-date and detailed information on React development practices.
